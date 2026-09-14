/* =========================================================================
   Worker Cloudflare — réception des formulaires (optionnel)
   -------------------------------------------------------------------------
   Déploiement :
     1. npm install -g wrangler && wrangler login
     2. wrangler kv namespace create LEADS
        → reportez l'id renvoyé dans worker/wrangler.jsonc
     3. wrangler secret put RESEND_API_KEY      (facultatif, pour l'e-mail)
     4. wrangler deploy --config worker/wrangler.jsonc
     5. copiez l'URL obtenue dans assets/js/config.js
        → endpointClient et endpointPro
   ========================================================================= */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS }
  });

function toText(data) {
  return Object.keys(data)
    .filter((k) => k[0] !== "_" && data[k] !== "" && data[k] != null)
    .map((k) => {
      const label = k.replace(/_/g, " ");
      const value = Array.isArray(data[k]) ? data[k].join(", ") : data[k];
      return `${label.charAt(0).toUpperCase()}${label.slice(1)} : ${value}`;
    })
    .join("\n");
}

async function sendEmail(env, subject, text) {
  if (!env.RESEND_API_KEY || !env.MAIL_TO || !env.MAIL_FROM) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [env.MAIL_TO],
      subject,
      text
    })
  });
  return r.ok;
}

/* =========================================================================
   INTÉRÊT POUR UNE VIDÉO DE POSE — /interet
   -------------------------------------------------------------------------
   Un seul bouton, « je veux voir cette pose en vidéo ». Pas de vote
   négatif, et le compteur n'est jamais renvoyé au visiteur : il sert à
   décider quelles poses filmer en premier, pas à faire de la preuve
   sociale sur un site qui n'a pas encore le trafic pour en produire.

   Le comptage est volontairement approximatif. KV n'a pas d'incrément
   atomique : deux clics dans la même seconde peuvent n'en compter qu'un.
   Pour arbitrer entre trente poses, la précision au vote près n'a aucune
   importance — ce qui compte est l'ordre de grandeur et le classement.
   ========================================================================= */
async function compterInteret(env, slug, request) {
  if (!env.LEADS) return;
  const cle = `interet:${slug}`;
  const actuel = parseInt((await env.LEADS.get(cle)) || "0", 10) || 0;
  await env.LEADS.put(cle, String(actuel + 1));

  /* Trace horodatée à part : elle permet de voir si l'intérêt est récent
     ou date d'un pic ancien, ce que le seul total ne dit pas. */
  await env.LEADS.put(
    `interet-log:${slug}:${Date.now()}:${crypto.randomUUID().slice(0, 6)}`,
    JSON.stringify({
      slug,
      date: new Date().toISOString(),
      pays: request.cf?.country || "",
      ref: request.headers.get("Referer") || ""
    }),
    { expirationTtl: 60 * 60 * 24 * 365 }
  );
}

/* Lecture du classement, pour la console interne. Protégée par un secret :
   sans lui, personne ne peut savoir ce que le site mesure. */
async function classement(env, request) {
  const url = new URL(request.url);
  if (!env.CONSOLE_TOKEN || url.searchParams.get("token") !== env.CONSOLE_TOKEN) {
    return json({ error: "Jeton absent ou invalide" }, 401);
  }
  if (!env.LEADS) return json({ error: "KV non configuré" }, 500);

  const liste = await env.LEADS.list({ prefix: "interet:" });
  const lignes = [];
  for (const k of liste.keys) {
    const slug = k.name.slice("interet:".length);
    const n = parseInt((await env.LEADS.get(k.name)) || "0", 10) || 0;
    lignes.push({ slug, votes: n });
  }
  lignes.sort((a, b) => b.votes - a.votes);

  const corr = await env.LEADS.list({ prefix: "correction:" });
  const corrections = [];
  for (const k of corr.keys.slice(0, 60)) {
    const v = await env.LEADS.get(k.name);
    if (v) corrections.push(JSON.parse(v));
  }
  corrections.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return json({ ok: true, poses: lignes, corrections });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    const chemin = new URL(request.url).pathname;

    /* Console interne : lecture seule, en GET, sous jeton. */
    if (chemin === "/classement") return classement(env, request);

    if (request.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);

    /* Intérêt pour une vidéo : réponse volontairement muette sur le total. */
    if (chemin === "/interet") {
      let d;
      try { d = await request.json(); } catch { return json({ error: "JSON invalide" }, 400); }
      if (d.website || d._gotcha) return json({ ok: true });
      const slug = String(d.slug || "").slice(0, 80).replace(/[^a-z0-9-]/g, "");
      if (!slug) return json({ error: "Pose inconnue" }, 400);
      await compterInteret(env, slug, request);
      return json({ ok: true });
    }

    /* Correction proposée sur une fiche : elle part par mail ET se range
       en KV, parce qu'une correction technique se relit à tête reposée. */
    if (chemin === "/correction") {
      let d;
      try { d = await request.json(); } catch { return json({ error: "JSON invalide" }, 400); }
      if (d.website || d._gotcha) return json({ ok: true });
      const slug = String(d.slug || "").slice(0, 80).replace(/[^a-z0-9-]/g, "");
      const texte = String(d.message || "").slice(0, 2000).trim();
      if (!texte) return json({ error: "Message vide" }, 400);
      const enr = {
        slug,
        message: texte,
        contact: String(d.contact || "").slice(0, 160),
        date: new Date().toISOString(),
        pays: request.cf?.country || ""
      };
      if (env.LEADS) {
        await env.LEADS.put(
          `correction:${Date.now()}:${crypto.randomUUID().slice(0, 6)}`,
          JSON.stringify(enr),
          { expirationTtl: 60 * 60 * 24 * 365 * 2 }
        );
      }
      await sendEmail(env, `Correction proposée — fiche ${slug}`, toText(enr));
      return json({ ok: true });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "JSON invalide" }, 400);
    }

    /* Piège à robots : un champ caché rempli = spam */
    if (data.website || data._gotcha) return json({ ok: true });

    const kind = data.siret ? "pro" : "client";
    const key = `${kind}:${Date.now()}:${crypto.randomUUID().slice(0, 8)}`;

    const record = {
      ...data,
      _kind: kind,
      _ip: request.headers.get("CF-Connecting-IP") || "",
      _country: request.cf?.country || "",
      _received: new Date().toISOString()
    };

    if (env.LEADS) {
      await env.LEADS.put(key, JSON.stringify(record), {
        expirationTtl: 60 * 60 * 24 * 365 * 2
      });
    }

    const subject =
      kind === "pro"
        ? `Candidature partenaire — ${data.entreprise || data.nom || "sans nom"}`
        : `Demande de devis — ${data.prestation || "communication visuelle"} — ${data.ville || ""}`;

    await sendEmail(env, subject, toText(record));

    return json({ ok: true, id: key });
  }
};
