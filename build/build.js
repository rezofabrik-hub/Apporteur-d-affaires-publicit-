#!/usr/bin/env node
/* =========================================================================
   Générateur du site — `node build/build.js`
   Écrit les fichiers HTML à la racine du dépôt, plus sitemap.xml et robots.txt.
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const T = require("../build/lib/tpl");
const site = require("./data/site");
const services = require("./data/services");
const cities = require("./data/cities");
const sectors = require("./data/sectors");
const projects = require("./data/projects");

const home = require("./pages/home");
const servicePage = require("./pages/service");
const cityPage = require("./pages/city");
const forms = require("./pages/forms");
const misc = require("./pages/misc");
const sectorPage = require("./pages/sector");
const serviceCityPage = require("./pages/servicecity");
const partnersPage = require("./pages/partners");
const posePage = require("./pages/pose");
const projectPage = require("./pages/project");
const collectivitesPage = require("./pages/collectivites");
const reseauPosePage = require("./pages/reseaupose");
const b2bPage = require("./pages/b2b");

const ROOT = path.join(__dirname, "..");

/* Nombre de villes croisées avec les 8 métiers.
   Les 8 angles rédactionnels et la note technique propre à chaque métier
   limitent la répétition ; monter beaucoup plus haut produirait des pages
   trop proches les unes des autres, ce que Google traite en pages satellites. */
const MATRIX_CITIES = 60;
const written = [];

function write(file, html) {
  fs.writeFileSync(path.join(ROOT, file), html, "utf8");
  written.push(file);
}

/* --------------------------------------------------------------- favicon */
function favicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#FF5A1F"/>
<path d="M12 52h40M20 52V24l12-9 12 9v28M28 52V38h8v14" fill="none" stroke="#fff"
 stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  fs.writeFileSync(path.join(ROOT, "assets", "img", "favicon.svg"), svg, "utf8");
}

/* --------------------------------------------------------------- sitemap */
function sitemap(pages) {
  const base = site.domain.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const url = (f, p) => `  <url>
    <loc>${base}/${f === "index.html" ? "" : f}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${f === "index.html" ? "weekly" : "monthly"}</changefreq>
    <priority>${p}</priority>
  </url>`;
  const body = pages
    .filter((f) => !["404.html", "merci.html"].includes(f))
    .map((f) => {
      let p = "0.6";
      if (f === "index.html") p = "1.0";
      else if (["devis.html", "professionnels.html", "partenaires.html", "service-pose.html", "collectivites.html", "reseau-pose-national.html", "sous-traitance-professionnels.html"].includes(f)) p = "0.9";
      else if (services.some((s) => s.slug + ".html" === f)) p = "0.9";
      else if (["secteurs.html", "villes.html", "realisations.html"].includes(f)) p = "0.85";
      else if (f.startsWith("realisation-")) p = "0.75";
      else if (services.some((s) => f.startsWith(s.slug + "-"))) p = "0.8";
      else if (f.startsWith("signaletique-") && sectors.some((x) => "signaletique-" + x.slug + ".html" === f)) p = "0.8";
      else if (f.startsWith("enseigne-signaletique-")) p = "0.7";
      else if (["mentions-legales.html", "confidentialite.html", "credits-photos.html", "plan-du-site.html"].includes(f)) p = "0.3";
      return url(f, p);
    }).join("\n");

  write("sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body + "\n</urlset>\n");

  write("robots.txt", `User-agent: *
Allow: /
Disallow: /merci.html

Sitemap: ${base}/sitemap.xml
`);
}

/* ------------------------------------------------------------------ run */
function run() {
  favicon();

  write("index.html", home(cities));

  services.forEach((s) => write(s.slug + ".html", servicePage(s, cities)));
  cities.forEach((c, i) => write("enseigne-signaletique-" + c.slug + ".html", cityPage(c, cities, i)));

  /* Réalisations */
  write("realisations.html", projectPage.index(projects, cities));
  projects.forEach((pr) => write("realisation-" + pr.slug + ".html", projectPage(pr, cities, projects)));

  /* Secteurs d'activité */
  write("secteurs.html", sectorPage.index(sectors, cities));
  sectors.forEach((sec) => write("signaletique-" + sec.slug + ".html", sectorPage(sec, cities)));

  /* Matrice métier x ville : les requêtes locales qui convertissent */
  const matrixCities = cities.slice(0, MATRIX_CITIES);
  let n = 0;
  services.forEach((svc) => {
    matrixCities.forEach((city, ci) => {
      const others = matrixCities.filter((c) => c.slug !== city.slug)
        .slice(ci % 5, (ci % 5) + 6);
      write(svc.slug + "-" + city.slug + ".html",
        serviceCityPage(svc, city, cities, others, n));
      n++;
    });
  });

  write("devis.html", forms.devis(cities));
  write("collectivites.html", collectivitesPage(cities));
  write("partenaires.html", partnersPage(cities));
  write("service-pose.html", posePage(cities));
  write("reseau-pose-national.html", reseauPosePage(cities));
  write("sous-traitance-professionnels.html", b2bPage(cities));
  write("professionnels.html", forms.pros(cities));
  write("merci.html", forms.merci(cities));

  write("villes.html", misc.villes(cities));
  write("tarifs.html", misc.tarifs(cities));
  write("glossaire.html", misc.glossaire(cities));
  write("reglementation-enseigne.html", misc.reglementation(cities));
  write("comment-ca-marche.html", misc.comment(cities));
  write("faq.html", misc.faqPage(cities));
  write("credits-photos.html", misc.credits(cities));

  const lg = misc.legal(cities);
  write("mentions-legales.html", lg.mentions);
  write("confidentialite.html", lg.conf);

  const pl = misc.plan(cities, T.NAV_MORE.map(([h, t]) => [h, t]), sectors);
  write("plan-du-site.html", pl.plan);
  write("404.html", pl.notFound);

  sitemap(written.slice());

  /* Suppression des pages devenues obsolètes.
     Sans cela, retirer une ville ou un métier laisse d'anciens fichiers sur le
     disque : ils restent servis, sortent du sitemap et portent un contenu périmé
     (ancien nom de marque, anciennes URL). Toutes les pages HTML de la racine
     étant générées, celles qui ne viennent pas d'être écrites sont orphelines. */
  const keep = new Set(written);
  const orphans = fs.readdirSync(ROOT)
    .filter((f) => f.endsWith(".html") && !keep.has(f));
  orphans.forEach((f) => fs.unlinkSync(path.join(ROOT, f)));
  if (orphans.length) {
    console.log(`  · ${orphans.length} page(s) obsolète(s) supprimée(s) : ${orphans.slice(0, 5).join(", ")}${orphans.length > 5 ? "…" : ""}`);
  }

  const bytes = written.reduce((n, f) => n + fs.statSync(path.join(ROOT, f)).size, 0);
  console.log(`${written.length} fichiers générés (${(bytes / 1024).toFixed(0)} Ko de HTML)`);
  console.log(`  · 1 accueil`);
  console.log(`  · ${services.length} pages métier`);
  console.log(`  · ${cities.length} pages villes`);
  console.log(`  · ${sectors.length + 1} pages secteurs`);
  console.log(`  · ${projects.length + 1} pages réalisations`);
  console.log(`  · ${services.length * MATRIX_CITIES} pages métier x ville`);
  console.log(`  · ${written.length - services.length - cities.length - sectors.length - 1 - projects.length - 1 - services.length * MATRIX_CITIES - 2} pages transverses + sitemap + robots`);
}

run();
