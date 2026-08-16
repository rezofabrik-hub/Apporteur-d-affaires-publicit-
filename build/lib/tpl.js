/* =========================================================================
   Gabarits et composants HTML partagés
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const site = require("../data/site");
const services = require("../data/services");
const partnership = require("../data/partnership");

const IMG_DIR = path.join(__dirname, "..", "..", "assets", "img");
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(path.join(IMG_DIR, "manifest.json"), "utf8")); } catch (e) {}

/* ---------------------------------------------------------------- outils */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Échappe pour un attribut, en neutralisant le HTML inline du contenu. */
const attr = (s) => esc(String(s == null ? "" : s).replace(/<[^>]+>/g, ""));

const jsonld = (obj) => `<script type="application/ld+json">${
  JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

/* ------------------------------------------------- calibrage SERP (SEO)
   Google n'affiche qu'une largeur fixe de titre et de description. Au-delà,
   il tronque — ou, plus souvent, il réécrit lui-même la balise à partir du
   corps de la page, et on perd la maîtrise de ce que voit l'internaute.
   Les deux fonctions ci-dessous ramènent chaque page dans la fenêtre
   affichable en dégradant proprement, jamais au milieu d'un mot. */
const TITLE_MAX = 62;
const DESC_MAX = 158;
const BRAND_RE = new RegExp("\\s*\\|\\s*" + site.brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*$");

/** Ramène un titre sous TITLE_MAX : suffixe de marque, puis segment, puis mot. */
function seoTitle(t) {
  t = String(t || "").replace(/\s+/g, " ").trim();
  if (t.length <= TITLE_MAX) return t;

  /* 1. La marque est la première chose sacrifiable : sur une requête locale,
        « enseigne + ville » pèse infiniment plus que le nom du réseau. */
  const s = t.replace(BRAND_RE, "");
  if (s.length <= TITLE_MAX) return s;

  /* 2. Couper à la dernière césure éditoriale (— ou –) qui tient. */
  const win = s.slice(0, TITLE_MAX + 1);
  const sep = Math.max(win.lastIndexOf(" — "), win.lastIndexOf(" – "), win.lastIndexOf(" - "));
  if (sep >= 25) return s.slice(0, sep);

  /* 3. Sinon, dernier mot entier. */
  const sp = win.lastIndexOf(" ");
  return (sp >= 25 ? s.slice(0, sp) : s.slice(0, TITLE_MAX)).replace(/[,;:(—–-]+$/, "").trim();
}

/** Ramène une description sous DESC_MAX en gardant des phrases entières. */
function seoDesc(d) {
  d = String(d || "").replace(/\s+/g, " ").trim();
  if (d.length <= DESC_MAX) return d;

  /* Une description coupée net se lit mal ; on préfère perdre la dernière
     phrase entière plutôt que d'afficher des points de suspension. */
  const win = d.slice(0, DESC_MAX + 1);
  const dot = Math.max(win.lastIndexOf(". "), win.lastIndexOf("! "), win.lastIndexOf("? "));
  if (dot >= 90) return d.slice(0, dot + 1);

  const sp = win.lastIndexOf(" ");
  return (sp >= 90 ? d.slice(0, sp) : d.slice(0, DESC_MAX - 1)).replace(/[,;:(—–-]+$/, "").trim() + "…";
}

/**
 * Renvoie l'entrée image `topic` n° i (1-based, boucle si dépassement).
 */
function pick(topic, i) {
  const list = manifest[topic] || [];
  if (!list.length) return null;
  return list[(i - 1) % list.length];
}

/**
 * Balise <img> responsive avec deux tailles + chargement différé.
 * @param {string} topic  sujet du manifeste
 * @param {number} i      index dans le sujet
 * @param {string} alt    texte alternatif (obligatoire pour l'accessibilité et le SEO)
 */
function img(topic, i, alt, opts) {
  const o = opts || {};
  const e = pick(topic, i);
  if (!e) return "";
  const ratio = e.h / e.w;
  const mdW = Math.min(720, e.w);
  return `<img src="assets/img/${e.name}-md.jpg"` +
    ` srcset="assets/img/${e.name}-md.jpg ${mdW}w, assets/img/${e.name}-lg.jpg ${e.w}w"` +
    ` sizes="${o.sizes || "(max-width: 780px) 100vw, 33vw"}"` +
    ` width="${mdW}" height="${Math.round(mdW * ratio)}"` +
    ` alt="${attr(alt)}"` +
    ` loading="${o.eager ? "eager" : "lazy"}"` +
    ` decoding="async"${o.eager ? ' fetchpriority="high"' : ""}>`;
}

/** Image de fond de héros (toujours chargée en priorité). */
function heroImg(topic, i, alt) {
  const e = pick(topic, i);
  if (!e) return "";
  return `<img src="assets/img/${e.name}-lg.jpg" alt="${attr(alt)}" width="${e.w}" height="${e.h}"` +
    ` loading="eager" decoding="async" fetchpriority="high">`;
}

/* ------------------------------------------------------------- structure */
const NAV_MORE = [
  ["collectivites.html", "Collectivités & institutions", "Marchés publics, accessibilité, jalonnement"],
  ["realisations.html", "Réalisations", "Projets détaillés, contraintes et budgets"],
  ["secteurs.html", "Secteurs d'activité", "Pharmacie, CHR, santé, auto, industrie…"],
  ["villes.html", "Villes couvertes", "Nos zones d'intervention en France"],
  ["tarifs.html", "Prix et budgets", "Ce que coûte réellement chaque prestation"],
  ["glossaire.html", "Glossaire du métier", "Tout le vocabulaire de la communication visuelle"],
  ["reglementation-enseigne.html", "Réglementation", "Autorisation, RLP, TLPE, accessibilité"],
  ["comment-ca-marche.html", "Comment ça marche", "Notre rôle d'agence de mise en relation"],
  ["faq.html", "Questions fréquentes", "Les réponses aux 20 questions les plus posées"]
];

function header(active) {
  const svcLinks = services.map((s) =>
    `<a href="${s.slug}.html"><strong>${esc(s.nav)}</strong><span>${esc(s.navDesc)}</span></a>`).join("");
  const moreLinks = NAV_MORE.map(([h, t, d]) =>
    `<a href="${h}"><strong>${esc(t)}</strong><span>${esc(d)}</span></a>`).join("");
  const cur = (h) => (active === h ? ' aria-current="page"' : "");

  return `<header class="hdr">
<div class="wrap hdr-in">
  <a class="logo" href="index.html" aria-label="${attr(site.brand)} — accueil">
    <span class="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-6h4v6"/>
      </svg>
    </span>
    <span class="logo-txt">${esc(site.brand)}<small>Réseau national</small></span>
  </a>

  <nav class="nav" aria-label="Navigation principale">
    <div class="drop" data-open="false">
      <button type="button" aria-expanded="false">Nos métiers
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="drop-menu">${svcLinks}</div>
    </div>
    <a href="realisations.html"${cur("realisations.html")}>Réalisations</a>
    <a href="villes.html"${cur("villes.html")}>Villes</a>
    <a href="tarifs.html"${cur("tarifs.html")}>Tarifs</a>
    <div class="drop" data-open="false">
      <button type="button" aria-expanded="false">Ressources
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="drop-menu">${moreLinks}</div>
    </div>
    <a href="partenaires.html"${cur("partenaires.html")}>Partenaires</a>
  </nav>

  <div class="hdr-cta">
    <a class="btn btn-ghost btn-sm" href="partenaires.html">Devenir partenaire</a>
    <a class="btn btn-primary btn-sm" href="devis.html">Devis gratuit</a>
  </div>

  <button class="burger" aria-expanded="false" aria-controls="mnav" aria-label="Ouvrir le menu">
    <span></span><span></span><span></span>
  </button>
</div>

<div class="mnav" id="mnav">
  <div class="mnav-h">Nos métiers</div>
  ${services.map((s) => `<a href="${s.slug}.html">${esc(s.nav)}</a>`).join("")}
  <div class="mnav-h">Partenaires du secteur</div>
  <a href="partenaires.html">Formules et tarifs</a>
  <a href="service-pose.html">Service de pose</a>
  <a href="professionnels.html">Questionnaire d'adhésion</a>
  <div class="mnav-h">Ressources</div>
  ${NAV_MORE.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join("")}
  <div class="btns">
    <a class="btn btn-ghost" href="partenaires.html">Devenir partenaire</a>
    <a class="btn btn-primary" href="devis.html">Devis gratuit</a>
  </div>
</div>
</header>`;
}

function footer(cities) {
  const cityLinks = (cities || []).slice(0, 40)
    .map((c) => `<a href="enseigne-signaletique-${c.slug}.html">${esc(c.name)}</a>`).join(" ");

  return `<footer class="ftr">
<div class="wrap">
  <div class="ftr-top">
    <div>
      <a class="logo" href="index.html">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-6h4v6"/>
          </svg>
        </span>
        <span class="logo-txt">${esc(site.brand)}<small>Réseau national</small></span>
      </a>
      <p class="ftr-about">${esc(site.tagline)}. Nous qualifions votre projet et le confions à des professionnels
      sélectionnés près de chez vous. Service gratuit et sans engagement pour le client.</p>
      <p class="ftr-about" style="margin-top:14px">
        <strong style="color:#fff">${esc(site.brandLegal)}</strong><br>
        ${esc(site.address.street)}<br>
        ${esc(site.address.cp)} ${esc(site.address.city)}<br>
        <a data-cfg="phone" href="tel:${esc(site.phoneHref)}">${esc(site.phoneDisplay)}</a><br>
        <a data-cfg="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      </p>
    </div>

    <div>
      <h4>Nos métiers</h4>
      <ul>${services.map((s) => `<li><a href="${s.slug}.html">${esc(s.navShort)}</a></li>`).join("")}</ul>
    </div>

    <div>
      <h4>Ressources</h4>
      <ul>${NAV_MORE.map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join("")}</ul>
    </div>

    <div>
      <h4>Le réseau</h4>
      <ul>
        <li><a href="devis.html">Demander un devis</a></li>
        <li><a href="realisations.html">Réalisations</a></li>
        <li><a href="collectivites.html">Collectivités &amp; institutions</a></li>
        <li><a href="partenaires.html">Devenir partenaire</a></li>
        <li><a href="service-pose.html">Service de pose</a></li>
        <li><a href="professionnels.html">Questionnaire d'adhésion</a></li>
        <li><a href="comment-ca-marche.html">Comment ça marche</a></li>
        <li><a href="credits-photos.html">Crédits photographiques</a></li>
        <li><a href="mentions-legales.html">Mentions légales</a></li>
        <li><a href="confidentialite.html">Confidentialité</a></li>
      </ul>
    </div>
  </div>

  ${cityLinks ? `<div class="ftr-cities">
    <h4>Enseigne et signalétique par ville</h4>
    <p>${cityLinks} <a href="villes.html">Toutes les villes</a></p>
  </div>` : ""}

  <div class="ftr-bot">
    <span>© <span data-year>2026</span> ${esc(site.brandLegal)} — ${esc(site.tagline)}.</span>
    <nav aria-label="Liens légaux">
      <a href="mentions-legales.html">Mentions légales</a>
      <a href="confidentialite.html">Données personnelles</a>
      <a href="credits-photos.html">Crédits photos</a>
      <a href="plan-du-site.html">Plan du site</a>
    </nav>
  </div>
</div>
</footer>

<div class="mobile-bar">
  <a class="btn btn-ghost" data-cfg="phoneHref" data-keep-text href="tel:${esc(site.phoneHref)}">Appeler</a>
  <a class="btn btn-primary" href="devis.html">Devis gratuit</a>
</div>`;
}

/* --------------------------------------------------------------- la page */
/**
 * @param {object} o  {file,title,desc,h1,crumbs,body,schema,active,noindex}
 */
function page(o) {
  const canonical = site.domain.replace(/\/$/, "") + "/" + (o.file === "index.html" ? "" : o.file);
  const ogImg = site.domain.replace(/\/$/, "") + "/assets/img/" + (o.ogImage || "hero-1-lg.jpg");

  const schemas = (o.schema || []).map(jsonld).join("\n");

  /* Calibrage systématique : aucune page ne part en production avec un titre
     ou une description que Google réécrira. Les réseaux sociaux, eux,
     acceptent des textes plus longs — d'où le titre complet en og:title. */
  const title = seoTitle(o.title);
  const desc = seoDesc(o.desc);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${esc(canonical)}">
${o.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
<meta name="author" content="${attr(site.brand)}">
<meta name="theme-color" content="#1E3854">

<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${attr(site.brand)}">
<meta property="og:title" content="${attr(o.title)}">
<meta property="og:description" content="${attr(o.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImg)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(o.title)}">
<meta name="twitter:description" content="${attr(o.desc)}">
<meta name="twitter:image" content="${esc(ogImg)}">

<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/favicon.svg">
<link rel="stylesheet" href="assets/css/site.css">
${schemas}
</head>
<body>
<a class="skip" href="#main">Aller au contenu principal</a>
${header(o.active)}
${o.noStrip ? "" : launchBanner(true)}
<main id="main">
${o.body}
</main>
${footer(o.cities)}
<script src="assets/js/config.js"></script>
<script src="assets/js/site.js" defer></script>
</body>
</html>`;
}

/* ---------------------------------------------------------- composants */
function crumbs(items) {
  const li = items.map((it, i) => {
    const last = i === items.length - 1;
    return `<li>${last
      ? `<span aria-current="page">${esc(it.name)}</span>`
      : `<a href="${it.url}">${esc(it.name)}</a>`}</li>`;
  }).join("");
  return `<nav class="crumbs" aria-label="Fil d'Ariane"><ol>${li}</ol></nav>`;
}

function crumbSchema(items) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name,
      item: site.domain.replace(/\/$/, "") + "/" + (it.url === "index.html" ? "" : it.url)
    }))
  };
}

function faqBlock(faq) {
  if (!faq || !faq.length) return "";
  return `<div class="acc">${faq.map((f) => `<details>
  <summary>${esc(f.q)}</summary>
  <div class="acc-body"><p>${f.a}</p></div>
</details>`).join("")}</div>`;
}

function faqSchema(faq) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: String(f.a).replace(/<[^>]+>/g, "") }
    }))
  };
}

function serviceCards(list, limit) {
  return (list || services).slice(0, limit || 99).map((s, i) => `<a class="card card-link" href="${s.slug}.html">
  <div class="card-media">${img(s.topic, 1, s.nav + " — " + s.navDesc)}<span class="card-tag">${esc(s.navShort)}</span></div>
  <div class="card-body">
    <h3>${esc(s.nav)}</h3>
    <p>${esc(s.navDesc)}.</p>
    <span class="card-more">Découvrir</span>
  </div>
</a>`).join("");
}

function ctaDouble() {
  return `<div class="cta-split">
  <div class="cta-card client">
    <h3>Vous avez un projet ?</h3>
    <p>Décrivez-le en 2 minutes. Nous le qualifions et le confions à des professionnels sélectionnés
    près de chez vous. Vous recevez des propositions comparables sous 48 heures. C'est gratuit et sans engagement.</p>
    <a class="btn btn-white" href="devis.html">Demander mon devis gratuit</a>
  </div>
  <div class="cta-card pro">
    <h3>Vous êtes professionnel ?</h3>
    <p>Enseigniste, agence de publicité, imprimeur, poseur, spécialiste du covering ou de l'objet
    publicitaire : rejoignez le réseau par abonnement 6 ou 12 mois, sans droit d'entrée et
    sans commission sur vos affaires.</p>
    <a class="btn btn-white" href="partenaires.html">Voir les formules</a>
  </div>
</div>`;
}

function trustBar() {
  const ico = {
    free: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    fast: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check: '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>',
    map: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  };
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  return `<div class="trust">
  <div>${svg(ico.free)}<b>100 % gratuit</b><span>Aucun frais pour le client, aucun engagement, aucune exclusivité.</span></div>
  <div>${svg(ico.fast)}<b>Réponse sous 48 h</b><span>Votre demande est qualifiée puis transmise le jour même aux bons professionnels.</span></div>
  <div>${svg(ico.check)}<b>Professionnels vérifiés</b><span>Assurances, qualifications, capacités de production et références contrôlées.</span></div>
  <div>${svg(ico.map)}<b>Toute la France</b><span>Un réseau d'ateliers et de poseurs de proximité, métropole et outre-mer.</span></div>
</div>`;
}

/** Bandeau d'offre de lancement — masqué automatiquement si `launch.active` est faux. */
function launchBanner(compact) {
  const L = partnership.launch;
  if (!L || !L.active) return "";
  if (compact) {
    return `<div class="launch-strip"><b>${esc(L.label)}</b> ${esc(L.headline)} —
      <a href="partenaires.html#lancement">en savoir plus</a></div>`;
  }
  return `<div class="launch" id="lancement">
  <span class="launch-tag">${esc(L.label)}</span>
  <h2>${esc(L.headline)}</h2>
  <p>${esc(L.sub)}</p>
  <p style="margin-top:14px">${esc(L.detail)}</p>
  <ul>${L.conditions.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
  <div class="btns">
    <a class="btn btn-white btn-lg" href="professionnels.html">Profiter des 2 mois offerts</a>
    <a class="btn btn-ghost btn-lg" href="partenaires.html#formules">Voir les formules</a>
  </div>
</div>`;
}

function keywordCloud(words, title) {
  return `<div class="kw-block"><b>${esc(title)} :</b> ${words.map(esc).join(" · ")}.</div>`;
}

module.exports = {
  site, services, esc, attr, jsonld, img, heroImg, pick, manifest,
  page, header, footer, crumbs, crumbSchema, faqBlock, faqSchema,
  serviceCards, ctaDouble, trustBar, keywordCloud, launchBanner, partnership, NAV_MORE
};
