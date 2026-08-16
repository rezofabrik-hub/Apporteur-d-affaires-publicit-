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

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);

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
