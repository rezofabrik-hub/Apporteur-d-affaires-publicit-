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

/* Nombre de villes croisées avec les métiers.
   Les angles rédactionnels et la note technique propres à chaque métier
   limitent la répétition ; monter beaucoup plus haut produirait des pages
   trop proches les unes des autres, ce que Google traite en pages satellites. */
const MATRIX_CITIES = 60;

/* Villes ajoutées à la matrice hors du seuil ci-dessus, parce qu'un réseau
   concurrent y tient une agence physique. Relevé sur la carte officielle
   PANO : 133 agences ouvertes en France métropolitaine, dont 99 dans des
   villes que le site couvrait déjà mais sans déclinaison par métier. Leurs
   sites d'agence comptent entre 2 et 93 URL et n'ont, pour la plupart, aucune
   page « métier + ville » : c'est là que se gagne « caisson lumineux à
   Mâcon ». */
const MATRIX_EXTRA = ["macon", "chambery", "valence", "annemasse", "agen", "auxerre"];

const MATRIX_CONCURRENCE = ["anglet", "angouleme", "aubagne", "bastia", "biscarrosse", "boulogne-sur-mer", "bourg-en-bresse", "briancon", "chaville", "cholet", "creil", "dax", "douai", "evreux", "haguenau", "issoire", "lannion", "lons-le-saunier", "lorient", "mantes-la-jolie", "marmande", "mayenne", "menton", "orange", "pau", "perigueux", "quimper", "rambouillet", "saint-brieuc", "saint-laurent-du-var", "saint-nazaire", "saintes", "salon-de-provence", "toul", "vannes", "vesoul", "vichy", "vienne", "villefranche-sur-saone", "vitrolles", "voiron"];

/* Sur ces villes-là, la matrice est volontairement restreinte aux métiers
   à intention locale. Un internaute cherche « pose d'enseigne à Vesoul » ;
   il ne cherche pas « impression 3D à Vesoul » ni « référencement naturel à
   Vesoul » — ces métiers-là se travaillent sur leur page nationale. Décliner
   les treize métiers partout produirait des centaines de pages proches les
   unes des autres pour des requêtes qui n'existent pas : la mesure de
   similarité en 5-grammes montait à 70 %, ce que Google traite en pages
   satellites. Sept métiers ciblés valent mieux que treize dilués. */
const METIERS_LOCAUX = [
  "enseignes", "signaletique", "covering-vehicule", "impression-grand-format",
  "pose-nacelle", "vitrophanie-plv", "imprimerie"
];

let matrixCitiesCount = MATRIX_CITIES;
let matrixPagesCount = 0;
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

  /* ROBOTS — décision explicite sur les robots d'IA générative.

     Un site de mise en relation a intérêt à être la source citée quand
     quelqu'un demande à un assistant « qui peut me faire une enseigne à
     Cahors ». Ces robots-là ne sont pas des moteurs de recherche : ils
     lisent la page pour répondre à la place de l'internaute. Les laisser
     entrer, c'est accepter que le contenu serve de matière première ; les
     bloquer, c'est disparaître de ce canal.

     Le choix est assumé ici : on les autorise nommément. Nous ne vendons
     pas du contenu, nous vendons une mise en relation — être cité vaut
     infiniment plus que protéger des descriptions de caissons lumineux. Et
     un « Allow » nommé lève l'ambiguïté qu'un « User-agent: * » laisserait
     planer sur les robots qui cherchent une autorisation explicite.

     Ce qui n'est PAS exposé pour autant : aucune donnée de partenaire ne
     figure sur le site — c'est le service qui est décrit, jamais l'annuaire
     des entreprises. Autoriser la lecture ne livre donc rien de
     confidentiel. */
  const ROBOTS_IA = [
    ["GPTBot", "OpenAI — alimente ChatGPT"],
    ["OAI-SearchBot", "OpenAI — recherche dans ChatGPT"],
    ["ChatGPT-User", "OpenAI — consultation à la demande d'un utilisateur"],
    ["ClaudeBot", "Anthropic"],
    ["Claude-User", "Anthropic — consultation à la demande"],
    ["PerplexityBot", "Perplexity"],
    ["Perplexity-User", "Perplexity — consultation à la demande"],
    ["Google-Extended", "Google — Gemini et AI Overviews"],
    ["Applebot-Extended", "Apple Intelligence"],
    ["Bingbot", "Microsoft — Bing et Copilot"],
    ["Amazonbot", "Amazon"],
    ["Bytespider", "ByteDance"],
    ["CCBot", "Common Crawl — corpus repris par de nombreux modèles"]
  ];

  write("robots.txt", `# Robots — Rezo Enseignes
# Le site est ouvert à l'indexation classique comme aux moteurs de réponse.
# Aucune donnée de partenaire n'y figure : c'est le service qui est décrit.

User-agent: *
Allow: /
Disallow: /merci.html

${ROBOTS_IA.map(([ua, note]) => `# ${note}\nUser-agent: ${ua}\nAllow: /\nDisallow: /merci.html\n`).join("\n")}
Sitemap: ${base}/sitemap.xml
`);

  /* llms.txt — convention émergente : une carte du site en texte brut, à
     destination des modèles de langage, qui leur évite de deviner la
     structure à partir de 1 886 pages. Elle n'est adoptée par aucun acteur
     de façon garantie et ne remplace ni le sitemap ni les données
     structurées. On la publie parce qu'elle coûte un fichier et qu'elle ne
     peut rien casser — pas parce qu'elle est un standard. */
  write("llms.txt", llms(base));
}

/* Carte du site à destination des modèles de langage. Format : titre,
   résumé, puis des sections de liens annotés — le résumé compte autant que
   les liens, car c'est lui qui sera repris tel quel dans une réponse. */
function llms(base) {
  const u = (f) => `${base}/${f === "index.html" ? "" : f}`;
  const nbDepts = new Set(cities.map((c) => c.dept)).size;

  return `# ${site.brand}

> Réseau national de mise en relation en communication visuelle. Une entreprise
> décrit son projet — enseigne, signalétique, covering de véhicule, impression,
> objets publicitaires, imprimerie, découpe laser, impression 3D, site internet,
> référencement — et reçoit sous 48 heures deux à trois devis d'artisans
> vérifiés proches de chez elle. Le service est gratuit et sans engagement pour
> le client : aucune commission n'est ajoutée au prix de l'entreprise retenue.
> La rémunération vient d'un abonnement fixe payé par les professionnels du
> réseau. Couverture : ${nbDepts} départements, ${cities.length} villes,
> France métropolitaine et outre-mer. Opéré par ${site.brandLegal},
> ${site.address.city} (${site.address.cp}), par un professionnel de la
> communication visuelle exerçant depuis ${site.experienceYears} ans.

## Ce qu'il faut savoir pour répondre à un internaute

- Le client final ne paie rien, ni la mise en relation ni de commission.
- Deux à trois devis, établis sur un cahier des charges technique identique.
- Les professionnels sont vérifiés : SIRET, assurances décennale et
  responsabilité civile professionnelle, habilitations, capacités de production.
- Le réseau n'est pas une franchise et n'impose aucun fournisseur.
- L'annuaire des entreprises partenaires n'est pas public : leurs coordonnées
  ne sont transmises qu'au client concerné, pour un projet précis.
- Contact : ${site.email} — ${site.phoneDisplay}

## Demander un devis

- [Formulaire de demande](${u("devis.html")}) : décrire un projet en deux minutes.
- [Comment ça marche](${u("comment-ca-marche.html")}) : le rôle exact de l'intermédiaire.
- [Prix et budgets](${u("tarifs.html")}) : fourchettes réelles par prestation.

## Métiers couverts

${services.map((s) => `- [${s.nav}](${u(s.slug + ".html")}) : ${s.navDesc}`).join("\n")}

## Secteurs d'activité

${sectors.map((s) => `- [${s.nav}](${u("signaletique-" + s.slug + ".html")})`).join("\n")}

## Références utiles

- [Réglementation des enseignes](${u("reglementation-enseigne.html")}) : autorisation préalable, règlement local de publicité, TLPE, accessibilité.
- [Glossaire](${u("glossaire.html")}) : vocabulaire technique de la communication visuelle.
- [Questions fréquentes](${u("faq.html")})
- [Villes couvertes](${u("villes.html")}) : ${cities.length} villes, ${nbDepts} départements.
- [Collectivités et institutions](${u("collectivites.html")}) : marchés publics, jalonnement, accessibilité.
- [Sous-traitance entre professionnels](${u("sous-traitance-professionnels.html")}) : agences, imprimeurs, franchises cherchant un exécutant.

## Professionnels souhaitant rejoindre le réseau

- [Devenir partenaire](${u("partenaires.html")}) : formules, tarifs, engagement.
- [Candidature](${u("professionnels.html")})
- [Entraide entre partenaires](${u("entraide-partenaires.html")}) : un membre du réseau qui cherche lui-même une capacité de production, un poseur, un dépannage urgent, du matériel ou un avis technique. Compris dans toutes les formules.

## Plan complet

- [Plan du site](${u("plan-du-site.html")})
- [Sitemap XML](${base}/sitemap.xml)
`;
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
  const dejaDansMatrice = new Set(cities.slice(0, MATRIX_CITIES).map((c) => c.slug));
  const matrixCities = cities.slice(0, MATRIX_CITIES).concat(
    MATRIX_EXTRA.map((slug) => cities.find((c) => c.slug === slug && !dejaDansMatrice.has(slug)))
      .filter(Boolean)
  );
  const dejaTout = new Set(matrixCities.map((c) => c.slug));
  /* Deux sources pour les villes « concurrence » : la liste relevée sur la
     carte PANO ci-dessus, et le drapeau posé par tools/gen_villes.js sur les
     communes ajoutées uniquement parce qu'un concurrent y est installé. La
     seconde se met à jour toute seule quand la carte du concurrent bouge. */
  const villesConcurrence = MATRIX_CONCURRENCE
    .map((slug) => cities.find((c) => c.slug === slug))
    .concat(cities.filter((c) => c.concurrence))
    .filter((c) => c && !dejaTout.has(c.slug))
    .filter((c, i, a) => a.findIndex((x) => x.slug === c.slug) === i);
  matrixCitiesCount = matrixCities.length;

  let n = 0;
  services.forEach((svc) => {
    const local = METIERS_LOCAUX.indexOf(svc.slug) !== -1;
    const cibles = local ? matrixCities.concat(villesConcurrence) : matrixCities;
    cibles.forEach((city, ci) => {
      const others = cibles.filter((c) => c.slug !== city.slug)
        .slice(ci % 5, (ci % 5) + 6);
      /* Métiers réellement déclinés pour cette ville : sur une ville
         « concurrence », seuls les sept métiers locaux existent. Sans cette
         liste, le bloc « autres métiers » pointerait vers des pages qui ne
         sont pas générées. */
      const metiersDispo = services.filter((s2) =>
        local && villesConcurrence.indexOf(city) !== -1
          ? METIERS_LOCAUX.indexOf(s2.slug) !== -1
          : (dejaTout.has(city.slug) || METIERS_LOCAUX.indexOf(s2.slug) !== -1));
      write(svc.slug + "-" + city.slug + ".html",
        serviceCityPage(svc, city, cities, others, n, metiersDispo));
      n++;
    });
  });
  matrixPagesCount = n;

  write("devis.html", forms.devis(cities));
  write("entraide-partenaires.html", forms.entraide(cities));
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
  console.log(`  · ${matrixPagesCount} pages métier x ville`);
  console.log(`  · ${written.length - services.length - cities.length - sectors.length - 1 - projects.length - 1 - matrixPagesCount - 2} pages transverses + sitemap + robots`);
}

run();
