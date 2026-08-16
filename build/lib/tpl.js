/* =========================================================================
   Gabarits et composants HTML partagés
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const site = require("../data/site");
const services = require("../data/services");
const partnership = require("../data/partnership");
const fabrication = require("../data/fabrication");

/* -------------------------------------------------------- chiffres du site
   La surface du site — nombre de villes, de départements, de métiers, de
   secteurs — est citée dans des phrases de vente. Écrite en dur, elle est
   fausse dès la mise à jour suivante, et c'est le genre de détail qu'un
   partenaire vérifie avant de signer. On la calcule donc à partir des
   données, et `chiffres()` substitue les jetons {villes}, {departements},
   {metiers} et {secteurs} partout où ils apparaissent dans une page. */
const CHIFFRES = (() => {
  const cities = require("../data/cities");
  let secteurs = 0;
  try { secteurs = require("../data/sectors").length; } catch (e) {}
  return {
    villes: String(cities.length),
    departements: String(new Set(cities.map((c) => c.dept)).size),
    metiers: String(services.length),
    secteurs: String(secteurs)
  };
})();

const chiffres = (html) => String(html).replace(
  /\{(villes|departements|metiers|secteurs)\}/g,
  (m, k) => CHIFFRES[k] !== undefined && CHIFFRES[k] !== "0" ? CHIFFRES[k] : m
);

/* Date de génération, reprise dans `dateModified`. Le site étant régénéré
   entièrement à chaque build, c'est la seule date honnête disponible : elle
   dit quand la page a été produite, pas quand son sujet a changé. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

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
  ["reseau-pose-national.html", "Réseau national de pose", "Trouver un poseur, ou en devenir un"],
  ["sous-traitance-professionnels.html", "Sous-traitance entre pros", "Agences, imprimeurs, franchises : qui produit"],
  ["entraide-partenaires.html", "Entraide entre partenaires", "Capacité, poseur, dépannage, matériel"],
  ["creation-logo-identite-visuelle.html", "Création de logo", "Identité visuelle, déclinaisons, cession des droits"],
  ["charte-graphique.html", "Charte graphique", "Le document de référence de votre identité"],
  ["trouver-un-graphiste.html", "Trouver un graphiste", "Freelance, studio ou agence : lequel choisir"],
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
        <li><a href="conditions-generales.html">Conditions générales de vente</a></li>
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
      <a href="conditions-generales.html">CGV</a>
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

  /* Un schéma WebPage sur chaque page, systématiquement. Il porte trois
     informations qu'un moteur de réponse cherche avant de citer une source :
     de quoi parle la page, à quelle date elle a été mise à jour, et à quelle
     organisation elle appartient. Sans `dateModified`, un contenu daté n'a
     aucun moyen de prouver qu'il ne l'est pas. */
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    url: canonical,
    name: o.title,
    description: o.desc,
    inLanguage: site.lang,
    dateModified: BUILD_DATE,
    isPartOf: { "@id": site.domain.replace(/\/$/, "") + "/#website" },
    publisher: { "@id": site.domain.replace(/\/$/, "") + "/#organization" }
  };

  const schemas = [pageSchema].concat(o.schema || []).map(jsonld).join("\n");

  /* Calibrage systématique : aucune page ne part en production avec un titre
     ou une description que Google réécrira. Les réseaux sociaux, eux,
     acceptent des textes plus longs — d'où le titre complet en og:title. */
  const title = seoTitle(o.title);
  const desc = seoDesc(o.desc);
  const corps = chiffres(o.body);

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
${o.space === "pro" ? proBar() + launchBanner(true) : ""}
<main id="main">
${corps}
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

/**
 * Bloc d'appel à l'action de fin de page.
 * @param {"pro"} [space]  sur les pages de l'espace professionnels, l'ordre
 *   des deux cartes s'inverse : le visiteur y est un prestataire, pas un client.
 *
 * Sur les pages client, les deux publics ne sont plus mis sur le même plan.
 * Un commerçant venu chercher une enseigne doit voir une seule proposition —
 * décrire son projet ; le recrutement de partenaires descend d'un cran, dans
 * une bande distincte qui l'annonce comme une rubrique séparée.
 */
function ctaDouble(space) {
  const client = `<div class="cta-card client">
    <h3>Vous avez un projet de communication visuelle ?</h3>
    <p>Commerce, entreprise, artisan, profession libérale, collectivité : décrivez votre projet en
    2 minutes. Nous le qualifions et le confions à des professionnels sélectionnés près de chez vous.
    Vous recevez des propositions comparables sous 48 heures, gratuitement et sans engagement.</p>
    <a class="btn btn-white" href="devis.html">Demander mon devis gratuit</a>
  </div>`;

  if (space === "pro") {
    return `<div class="cta-split">
  <div class="cta-card pro">
    <h3>Vous voulez rejoindre le réseau ?</h3>
    <p>Enseigniste, agence de publicité, imprimeur, poseur, spécialiste du covering ou de l'objet
    publicitaire : deux mois à 0 €, puis un abonnement de 6 ou 12 mois
    sans commission sur vos affaires.</p>
    <a class="btn btn-white" href="professionnels.html">Remplir le questionnaire</a>
  </div>
  ${client}
</div>`;
  }

  return `<div class="cta-split cta-solo">${client}</div>
${proInvite()}`;
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
/* ------------------------------------------------- tarif de lancement
   On n'affiche jamais un prix barré : le tarif actuel est le prix réel, et
   c'est la hausse à venir qui est annoncée. Le prix futur vient de la formule
   elle-même (`nextPrice`) : les deux hausses n'étant pas du même ordre, un
   pourcentage global aurait été faux sur au moins l'une des deux. */
const eur = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

function launchPriceOn(plan) {
  const L = partnership.launchPrice;
  if (!L || !L.active || !plan || !plan.nextPrice) return null;
  const now = Number(String(plan.price).replace(/\s/g, ""));
  const after = Number(String(plan.nextPrice).replace(/\s/g, ""));
  if (!now || !after) return null;
  return {
    now, after: eur(after),
    rise: eur(after - now),
    pct: Math.round(((after - now) / now) * 100),
    perMonth: (d) => (now / parseInt(d, 10)).toFixed(2).replace(".", ","),
    ht: eur(now / 1.2)
  };
}

/* Bandeau posé au-dessus des cartes tarifaires. */
function launchPriceBanner() {
  const L = partnership.launchPrice;
  if (!L || !L.active) return "";
  return `<div class="disc-banner">
  <b>${esc(L.headline)}</b>
  <span>Les tarifs ci-dessous seront relevés le <strong>${esc(site.anniversary)}</strong>.
  Contrat, accès et tarif sont <strong>bloqués sur toute la durée souscrite</strong> —
  six mois ou un an selon la formule : une hausse ne touche jamais un abonnement
  en cours.</span>
</div>`;
}

/* Barre d'entrée de l'espace professionnels.
   Le site s'adresse d'abord aux entreprises qui cherchent à se rendre
   visibles ; le recrutement de prestataires est un second métier, qui doit
   se voir comme tel. Cette barre marque la frontière : à partir d'ici, le
   visiteur n'est plus un client, c'est un fournisseur potentiel. */
function proBar() {
  return `<div class="pro-bar">
  <span class="pro-bar-tag">Espace professionnels</span>
  <p>Cette rubrique s'adresse aux <b>enseignistes, imprimeurs, poseurs, agences et fournisseurs</b>
  qui veulent rejoindre le réseau. Vous cherchez une enseigne ou de la signalétique pour votre
  entreprise ? <a href="devis.html">Demandez plutôt un devis gratuit</a>.</p>
</div>`;
}

/* Invitation discrète à rejoindre le réseau, posée en bas des pages client.
   Elle ne doit jamais concurrencer la demande de devis : un commerçant venu
   chercher une enseigne n'est pas là pour s'abonner. */
function proInvite() {
  return `<aside class="pro-invite">
  <div>
    <b>Vous êtes enseigniste, imprimeur, poseur ou agence ?</b>
    <span>Le réseau recrute des professionnels dans toute la France. Rubrique séparée,
    abonnement sans commission, deux mois à 0 € pour commencer.</span>
  </div>
  <a class="btn btn-pro" href="partenaires.html">Devenir partenaire</a>
</aside>`;
}

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
    <a class="btn btn-white btn-lg" href="professionnels.html">Commencer avec 2 mois à 0 €</a>
    <a class="btn btn-ghost btn-lg" href="partenaires.html#formules">Voir les formules</a>
  </div>
</div>`;
}

/**
 * Bloc d'amortissement : à partir de quelle affaire l'abonnement est remboursé.
 * @param {"vente"|"pose"} variant  jeu de données à afficher
 */
function amortBlock(variant) {
  const A = partnership.amortissement;
  if (!A) return "";
  const V = variant === "pose" ? A.pose : A;
  const table = `<div class="table-wrap"><table class="t-amort">
  <thead><tr>${V.head.map((h, i) =>
    `<th scope="col"${i === 3 ? ' style="color:var(--pro-600)"' : ""}>${esc(h)}</th>`).join("")}</tr></thead>
  <tbody>${V.rows.map((r) => `<tr>${r.map((c, i) => i === 0
    ? `<th scope="row">${esc(c)}</th>`
    : `<td${i === 3 ? ' style="font-weight:600;color:var(--pro-600)"' : ""}>${esc(c)}</td>`
  ).join("")}</tr>`).join("")}</tbody>
</table></div>`;

  /* Le seuil chiffré n'est rappelé qu'une fois, sur la variante vente : le
     répéter sur la page pose donnerait deux encadrés identiques au visiteur
     qui consulte les deux. */
  const seuil = variant === "pose" ? "" : `
    <aside class="amort-seuil">
      <span>Seuil à couvrir</span>
      <b>${esc(A.threshold)}</b>
      <p>${esc(A.thresholdNote)}</p>
    </aside>`;

  const compare = variant === "pose" || !A.compare ? "" : `
  <ul class="amort-compare">${A.compare.map(([t, p, d]) =>
    `<li><b>${esc(t)}</b><em>${esc(p)}</em><span>${esc(d)}</span></li>`).join("")}</ul>`;

  return `
<section class="sec bg-2" id="amortissement">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(A.eyebrow)}</span>
      <h2>${esc(V.title)}</h2>
      <p class="lead">${esc(V.lead)}</p>
    </div>
    <div class="amort">${seuil}<div class="amort-main">${table}</div></div>
    <div class="note"><p>${esc(V.note)}</p></div>${compare}
  </div>
</section>`;
}

/**
 * Bloc « fabrication locale » : pourquoi un produit encombrant ne doit pas
 * traverser la France. C'est l'argument structurel du réseau — un fabricant
 * unique, aussi bon soit-il, ne peut pas le tenir.
 *
 * @param {"complet"|"national"|"court"} variant
 *   · complet  — bénéfices + tableau transport + contrepoint (pages client)
 *   · national — ajoute l'effet d'échelle multi-sites (B2B, offre nationale)
 *   · court    — un simple encadré, pour les pages déjà denses
 */
function localBlock(variant) {
  const F = fabrication;
  if (!F) return "";

  if (variant === "court") {
    return `<aside class="local-short">
  <b>${esc(F.short.title)}</b>
  <p>${esc(F.short.body)}</p>
</aside>`;
  }

  const benefits = `<div class="grid g-4">${F.benefits.map(([t, d]) =>
    `<div class="tile tile-plain"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>`;

  /* Dernière colonne mise en avant : c'est la seule valeur exacte du
     tableau, et c'est elle que le lecteur doit retenir. */
  const table = `<div class="table-wrap"><table class="t-amort">
  <thead><tr>${F.transportHead.map((h, i) =>
    `<th scope="col"${i === 3 ? ' style="color:var(--pro-600)"' : ""}>${esc(h)}</th>`).join("")}</tr></thead>
  <tbody>${F.transport.map((r) => `<tr>${r.map((c, i) => i === 0
    ? `<th scope="row">${esc(c)}</th>`
    : `<td${i === 3 ? ' style="font-weight:700;color:var(--pro-600)"' : ""}>${esc(c)}</td>`
  ).join("")}</tr>`).join("")}</tbody>
</table></div>`;

  const scale = variant !== "national" ? "" : `
    <div class="local-scale">
      <h3>${esc(F.scale.title)}</h3>
      <p>${esc(F.scale.body)}</p>
      <ul class="checks">${F.scale.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>`;

  const centralise = `
    <div class="local-fair">
      <h3>${esc(F.centralise.title)}</h3>
      <p>${esc(F.centralise.body)}</p>
      <ul class="local-arb">${F.centralise.rows.map(([q, a]) =>
        `<li><b>${esc(q)}</b><span>${esc(a)}</span></li>`).join("")}</ul>
    </div>`;

  return `
<section class="sec" id="fabrication-locale">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(F.eyebrow)}</span>
      <h2>${esc(F.title)}</h2>
      <p class="lead">${esc(F.lead)}</p>
    </div>
    ${benefits}
    <div class="local-table">
      <h3>Ce que coûte le transport que vous ne payez pas</h3>
      ${table}
      <p class="local-note">${esc(F.transportNote)}</p>
    </div>${scale}${centralise}
  </div>
</section>`;
}

function keywordCloud(words, title) {
  return `<div class="kw-block"><b>${esc(title)} :</b> ${words.map(esc).join(" · ")}.</div>`;
}

module.exports = {
  site, services, esc, attr, jsonld, img, heroImg, pick, manifest,
  page, header, footer, crumbs, crumbSchema, faqBlock, faqSchema,
  serviceCards, ctaDouble, trustBar, keywordCloud, launchBanner, amortBlock,
  proBar, proInvite, launchPriceOn, launchPriceBanner, partnership, NAV_MORE,
  localBlock, fabrication
};
