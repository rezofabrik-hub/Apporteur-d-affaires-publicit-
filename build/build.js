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

const home = require("./pages/home");
const servicePage = require("./pages/service");
const cityPage = require("./pages/city");
const forms = require("./pages/forms");
const misc = require("./pages/misc");

const ROOT = path.join(__dirname, "..");
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
      else if (["devis.html", "professionnels.html"].includes(f)) p = "0.9";
      else if (services.some((s) => s.slug + ".html" === f)) p = "0.9";
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

  write("devis.html", forms.devis(cities));
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

  const pl = misc.plan(cities, T.NAV_MORE.map(([h, t]) => [h, t]));
  write("plan-du-site.html", pl.plan);
  write("404.html", pl.notFound);

  sitemap(written.slice());

  const bytes = written.reduce((n, f) => n + fs.statSync(path.join(ROOT, f)).size, 0);
  console.log(`${written.length} fichiers générés (${(bytes / 1024).toFixed(0)} Ko de HTML)`);
  console.log(`  · 1 accueil`);
  console.log(`  · ${services.length} pages métier`);
  console.log(`  · ${cities.length} pages villes`);
  console.log(`  · ${written.length - services.length - cities.length - 3} pages transverses + sitemap + robots`);
}

run();
