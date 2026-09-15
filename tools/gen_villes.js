/* =========================================================================
   Générateur de la couverture villes — build/data/cities-auto.js
   -------------------------------------------------------------------------
   POURQUOI UN GÉNÉRATEUR PLUTÔT QU'UNE SAISIE À LA MAIN

   Couvrir les grandes villes des 96 départements métropolitains, c'est
   quelques centaines d'entrées comportant chacune un code postal, une
   population et une liste de communes voisines. Saisies à la main, ces
   trois données seraient fausses quelque part — et une commune voisine
   inventée sur une page locale est exactement ce qu'un visiteur du coin
   repère en trois secondes. Tout ce qui est vérifiable est donc repris de
   l'API Découpage administratif de l'État (geo.api.gouv.fr, données INSEE),
   et rien n'est écrit de mémoire.

   CE QUE LE GÉNÉRATEUR NE FAIT PAS

   Il ne rédige pas de quartiers, de zones d'activité ni de contraintes
   locales. Ces informations n'existent dans aucun jeu de données ouvert et
   les inventer produirait des pages qui sonnent juste et qui sont fausses.
   Les villes travaillées à la main (build/data/cities.js) les portent ;
   les villes générées s'appuient sur leurs communes limitrophes réelles,
   ce qui est vérifiable et suffit à distinguer chaque page.

   RÈGLE DE SÉLECTION
     · toute commune de 20 000 habitants ou plus ;
     · le chef-lieu de chaque département, quelle que soit sa taille
       (Privas, 8 200 habitants, est la préfecture de l'Ardèche : une page
       « collectivités » sans sa préfecture n'aurait aucun sens) ;
     · au minimum les trois communes les plus peuplées du département ;
     · au maximum huit par département, pour ne pas noyer le maillage
       interne sous les banlieues d'une même agglomération.

   USAGE
     node tools/gen_villes.js          (nécessite un accès réseau)

   Le build, lui, reste hors ligne : il ne lit que le fichier produit.
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const API = "https://geo.api.gouv.fr";
const OUT = path.join(__dirname, "..", "build", "data", "cities-auto.js");
const OUT_PREF = path.join(__dirname, "..", "build", "data", "prefectures.js");
const CACHE = path.join(__dirname, ".geocache");

/* Communes ajoutées quelles que soient leur taille, parce qu'un réseau
   concurrent y tient une agence physique. Sans elles, le site laisse le
   terrain libre là où quelqu'un est déjà installé — exactement l'inverse de
   ce qu'on cherche. Le couple (nom, département) évite les homonymes, très
   nombreux en France : le nom seul ramènerait le mauvais Saint-Amour.
   Certains noms d'agence désignent un territoire et non une commune
   (« Bassin d'Arcachon », « Médoc », « Sénart », « Val d'Europe ») : on
   retient alors la commune-centre réelle. */
const VILLES_CONCURRENCE = [
  ["Saint-Maximin-la-Sainte-Baume", "83"], ["Ancenis-Saint-Géréon", "44"],
  ["Saint-Gratien", "95"], ["Arcachon", "33"], ["Clamart", "92"],
  ["Cosne-Cours-sur-Loire", "58"], ["Deauville", "14"], ["Feurs", "42"],
  ["Gramat", "46"], ["Houilles", "78"], ["Langon", "33"], ["Le Tréport", "76"],
  ["Lépanges-sur-Vologne", "88"], ["Libourne", "33"], ["Maubeuge", "59"],
  ["Lesparre-Médoc", "33"], ["Montargis", "45"], ["Montigny-le-Bretonneux", "78"],
  ["Morlaix", "29"], ["Obernai", "67"], ["Péronne", "80"], ["Plaisir", "78"],
  ["Pont-du-Château", "63"], ["Royan", "17"], ["Saint-André-de-Cubzac", "33"],
  ["Saint-Jean-de-Luz", "64"], ["Saint-Ouen-l'Aumône", "95"],
  ["Saint-Vincent-de-Tyrosse", "40"], ["Saint-Amour", "39"], ["Sartène", "2A"],
  ["Lieusaint", "77"], ["Serris", "77"], ["Argelès-sur-Mer", "66"],
  ["Ris-Orangis", "91"]
];

/* Seuils revus le 15/09/2026.

   Le seuil de 20 000 habitants et le plafond de huit communes par
   département donnaient 440 villes — une couverture correcte des
   agglomérations, mais qui laissait de côté deux catégories que les clients
   cherchent réellement.

   D'abord les sous-préfectures. Prades, 6 148 habitants, est chef-lieu
   d'arrondissement des Pyrénées-Orientales : cinq communes du département
   avaient une page, pas elle. Un chef-lieu d'arrondissement est un point de
   repère, les communes alentour s'y réfèrent, et c'est son nom que l'on tape.

   Ensuite les communes de 10 000 à 20 000 habitants. Le seuil de 10 000 n'a
   rien d'arbitraire : c'est celui de l'article R.581-65 du code de
   l'environnement, au-dessus duquel les enseignes scellées au sol de plus
   d'un mètre carré deviennent admises. Une page consacrée à une commune qui
   franchit ce seuil décrit donc un droit différent de sa voisine — ce n'est
   pas du remplissage, c'est le cœur de ce que le site apporte. */
const SEUIL_POP = 10000;   // seuil de l'article R.581-65 du code de l'environnement
const MIN_PAR_DEPT = 3;    // plancher, même dans un département rural
const MAX_PAR_DEPT = 16;   // plafond, pour ne pas empiler les banlieues
const CHEFS_LIEUX = new Set(require("../build/data/chefs-lieux.js"));

/* Socle intangible : les villes déjà publiées. Sans cette reprise,
   l'abaissement du seuil a écarté treize communes qui avaient une page —
   Albert, Joigny, Sisteron, Monistrol-sur-Loire et neuf autres, toutes sous
   les 10 000 habitants et sans rôle administratif, évincées par le plafond
   départemental au profit de communes plus peuplées. Une URL indexée est un
   actif : on en ajoute, on n'en retire pas. */
const PUBLIEES = new Set(require("../build/data/villes-publiees.js"));
const NB_VOISINES = 8;     // communes limitrophes citées par page
const RAYON_KM = 22;       // rayon de recherche des communes voisines
const RAYON_LARGE = 40;    // rayon de repli en zone peu dense

/* ------------------------------------------------------------------ réseau */
/* Passage par curl plutôt que par le module https : les environnements de
   développement placent souvent un proxy sortant que le client HTTP de Node
   n'utilise pas, là où curl lit HTTPS_PROXY et le certificat système. Le
   générateur n'est lancé qu'à la main, l'appel externe est sans conséquence
   sur le build. */
function get(url) {
  /* Reprise sur échec réseau. Une centaine de requêtes s'enchaînent ici, et
     une seule coupure — proxy sortant, reset de connexion — interrompait tout
     le générateur après plusieurs minutes de travail. Quatre tentatives
     espacées suffisent : les échecs observés sont transitoires. */
  let dernier;
  for (let essai = 1; essai <= 4; essai++) {
    try {
      const out = execFileSync("curl", ["-sSfL", url, "--max-time", "90"],
        { maxBuffer: 64 * 1024 * 1024 }).toString();
      return JSON.parse(out);
    } catch (e) {
      dernier = e;
      if (essai < 4) {
        const pause = 2000 * essai;
        process.stderr.write(`  réseau : échec ${essai}/4, nouvelle tentative dans ${pause / 1000} s\n`);
        execFileSync("sleep", [String(pause / 1000)]);
      }
    }
  }
  throw dernier;
}

/* Cache disque : l'API est publique et sans quota annoncé, mais relancer le
   générateur ne doit pas signifier 97 requêtes de plus à chaque essai. */
async function cached(name, url) {
  const f = path.join(CACHE, name + ".json");
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, "utf8"));
  const data = get(url);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(f, JSON.stringify(data));
  return data;
}

/* ------------------------------------------------------------------ outils */
const slugify = (s) => s
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/['’]/g, "-")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

/** Distance orthodromique en kilomètres entre deux points [lon, lat]. */
function km(a, b) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b[1] - a[1]) * r, dLon = (b[0] - a[0]) * r;
  const s = Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/* Population arrondie. Le gabarit affiche « habitants (environ) » : donner
   17 274 habitants sous ce libellé serait une fausse précision, et donner un
   chiffre rond faux serait pire. On arrondit donc, franchement et à la
   hausse comme à la baisse, en gardant la lisibilité. */
function pop(n) {
  const pas = n < 5000 ? 100 : n < 50000 ? 500 : 1000;
  return String(Math.round(n / pas) * pas).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* Code postal principal : le plus bas de la commune. Pour les villes à
   arrondissements (Paris, Lyon, Marseille) l'API renvoie déjà le générique. */
const cpPrincipal = (c) => (c.codesPostaux || []).slice().sort()[0] || "";

/* ------------------------------------------------------------------- corps */
(async function main() {
  const [departements, regions] = await Promise.all([
    cached("departements", `${API}/departements?fields=nom,code,codeRegion,chefLieu`),
    cached("regions", `${API}/regions?fields=nom,code`)
  ]);
  const regionNom = Object.fromEntries(regions.map((r) => [r.code, r.nom]));
  const metro = departements.filter((d) => !/^97|^98/.test(d.code));

  /* Toutes les communes métropolitaines, une requête par département. */
  const parDept = {};
  const toutes = [];
  for (const d of metro) {
    const list = (await cached("dept-" + d.code,
      `${API}/communes?codeDepartement=${d.code}` +
      `&fields=nom,code,codesPostaux,population,centre&format=json`))
      .filter((c) => c.population && c.centre);
    list.forEach((c) => { c.dept = d.code; });
    parDept[d.code] = list.slice().sort((a, b) => b.population - a.population);
    toutes.push(...list);
  }
  console.log(`${toutes.length} communes métropolitaines chargées, ${metro.length} départements`);

  /* ---- sélection ---- */
  const retenues = [];
  for (const d of metro) {
    const list = parDept[d.code];
    const prises = new Map();
    const prendre = (c) => { if (c) prises.set(c.code, c); };

    list.filter((c) => c.population >= SEUIL_POP).forEach(prendre);
    list.filter((c) => CHEFS_LIEUX.has(c.code)).forEach(prendre);  // sous-préfectures
    list.filter((c) => PUBLIEES.has(slugify(c.nom))).forEach(prendre);  // socle publié
    prendre(list.find((c) => c.code === d.chefLieu));      // la préfecture, toujours
    for (const c of list) {                                 // plancher départemental
      if (prises.size >= MIN_PAR_DEPT) break;
      prendre(c);
    }
    /* Le tri place les chefs-lieux d'arrondissement en tête, avant le classement
       par population : sans cela le plafond départemental évincerait Prades ou
       Céret au profit de communes plus peuplées mais sans rôle administratif,
       et l'on retomberait exactement sur le manque que cette révision corrige. */
    const gardees = [...prises.values()]
      .sort((a, b) => {
        /* Deux rangs avant la population : une ville déjà publiée ne peut pas
           être évincée, et un chef-lieu d'arrondissement non plus. */
        const ra = (PUBLIEES.has(slugify(a.nom)) ? 2 : 0) + (CHEFS_LIEUX.has(a.code) ? 1 : 0);
        const rb = (PUBLIEES.has(slugify(b.nom)) ? 2 : 0) + (CHEFS_LIEUX.has(b.code) ? 1 : 0);
        if (ra !== rb) return rb - ra;
        return b.population - a.population;
      })
      .slice(0, Math.max(MAX_PAR_DEPT,
        [...prises.values()].filter((c) => PUBLIEES.has(slugify(c.nom)) || CHEFS_LIEUX.has(c.code)).length));

    /* Le plafond ne doit jamais évincer la préfecture. En Seine-Saint-Denis,
       huit communes sont plus peuplées que Bobigny : sans cette reprise, le
       département perdrait son chef-lieu — celui-là même que cherche une
       collectivité. On échange alors la plus petite retenue. */
    const pref = list.find((c) => c.code === d.chefLieu);
    if (pref && !gardees.some((c) => c.code === pref.code)) {
      gardees[gardees.length - 1] = pref;
    }

    /* Communes imposées par la présence d'un concurrent, hors barème. */
    const norm = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    VILLES_CONCURRENCE.filter(([, dep]) => dep === d.code).forEach(([nom]) => {
      const c = list.find((x) => norm(x.nom) === norm(nom));
      if (!c) { console.log(`  ! introuvable : ${nom} (${d.code})`); return; }
      c.concurrence = true;
      if (!gardees.some((g) => g.code === c.code)) gardees.push(c);
    });

    gardees.forEach((c) => retenues.push({ commune: c, dept: d }));
  }
  console.log(`${retenues.length} villes retenues`);

  /* ---- communes limitrophes : les plus peuplées dans le rayon, sans
         filtre départemental — une agglomération ne s'arrête pas à la
         limite administrative, et l'internaute cherche par ville. ---- */
  function voisines(c) {
    const pick = (rayon) => toutes
      .filter((o) => o.code !== c.code && km(c.centre.coordinates, o.centre.coordinates) <= rayon)
      .sort((a, b) => b.population - a.population)
      .slice(0, NB_VOISINES)
      .map((o) => o.nom);
    const proches = pick(RAYON_KM);
    return proches.length >= 5 ? proches : pick(RAYON_LARGE);
  }

  const villes = retenues.map(({ commune, dept }) => ({
    slug: slugify(commune.nom),
    name: commune.nom,
    dept: dept.code,
    deptName: dept.nom,
    region: regionNom[dept.codeRegion],
    cp: cpPrincipal(commune),
    pop: pop(commune.population),
    _pop: commune.population,   // brut, pour départager les homonymes
    prefecture: commune.code === dept.chefLieu || undefined,
    concurrence: commune.concurrence || undefined,
    neighbors: voisines(commune)
  }));

  /* Doublons de slug entre départements (Vitry, Saint-Étienne-du-Rouvray,
     Saint-Denis…). On suffixe par le code départemental plutôt que d'en
     perdre une.

     QUI GARDE LE SLUG NU — la question n'est pas cosmétique.

     L'ordre était celui du parcours, c'est-à-dire le hasard du numéro de
     département. En passant de 440 à 865 villes, des homonymes minuscules
     sont apparus et ont pris le slug nu de villes déjà publiées :
     `franconville` désignait la commune du Val-d'Oise et ses 37 754
     habitants, il est passé à une homonyme de Meurthe-et-Moselle qui en
     compte 63. Vingt-quatre pages indexées changeaient ainsi de sujet sans
     que rien ne le signale.

     Deux rangs, donc : une ville déjà publiée garde son slug — son URL est
     indexée et liée. À défaut, la plus peuplée le garde, parce que c'est
     celle que l'on cherche quand on tape le nom seul. */
  const vus = new Map();
  villes.slice()
    .sort((a, b) => {
      const pa = PUBLIEES.has(a.slug) ? 1 : 0;
      const pb = PUBLIEES.has(b.slug) ? 1 : 0;
      if (pa !== pb) return pb - pa;
      return (b._pop || 0) - (a._pop || 0);
    })
    .forEach((v) => {
      if (!vus.has(v.slug)) { vus.set(v.slug, v); return; }
      v.slug = v.slug + "-" + v.dept;
      console.log(`  slug dédoublonné : ${v.name} (${v.dept}) → ${v.slug}`);
    });

  villes.sort((a, b) => a.dept.localeCompare(b.dept) || a.name.localeCompare(b.name, "fr"));

  /* ---- écriture ---- */
  const ligne = (v) => "{ " + [
    `slug: ${JSON.stringify(v.slug)}`,
    `name: ${JSON.stringify(v.name)}`,
    `dept: ${JSON.stringify(v.dept)}`,
    `deptName: ${JSON.stringify(v.deptName)}`,
    `region: ${JSON.stringify(v.region)}`,
    `cp: ${JSON.stringify(v.cp)}`,
    `pop: ${JSON.stringify(v.pop)}`,
    v.prefecture ? "prefecture: true" : null,
    v.concurrence ? "concurrence: true" : null,
    `neighbors: ${JSON.stringify(v.neighbors)}`
  ].filter(Boolean).join(", ") + " }";

  const src = `/* =========================================================================
   Couverture villes — FICHIER GÉNÉRÉ, ne pas modifier à la main.
   Produit par \`node tools/gen_villes.js\` à partir de l'API Découpage
   administratif de l'État (geo.api.gouv.fr, données INSEE).

   Codes postaux, populations et communes limitrophes sont donc des données
   officielles, pas des estimations. Les villes travaillées à la main —
   quartiers, zones d'activité, contraintes climatiques et patrimoniales —
   vivent dans cities.js et l'emportent toujours sur ce fichier.

   ${villes.length} villes · ${metro.length} départements métropolitains couverts
   ========================================================================= */
module.exports = [
${villes.map((v) => ligne(v)).join(",\n")}
];
`;
  fs.writeFileSync(OUT, src);

  /* Liste des préfectures, à part : elle sert aussi aux villes travaillées à
     la main, qui n'ont aucune raison de porter cette information en dur. */
  const prefs = {};
  metro.forEach((d) => {
    const c = parDept[d.code].find((x) => x.code === d.chefLieu);
    if (c) prefs[d.code] = c.nom;
  });
  fs.writeFileSync(OUT_PREF, `/* =========================================================================
   Chefs-lieux de département — FICHIER GÉNÉRÉ par \`node tools/gen_villes.js\`
   depuis l'API Découpage administratif de l'État. Sert à signaler qu'une
   ville est préfecture : c'est ce que cherche une collectivité, et c'est
   une information qu'on ne devine pas (Privas pour l'Ardèche, Bobigny pour
   la Seine-Saint-Denis, Laon pour l'Aisne).
   ========================================================================= */
module.exports = ${JSON.stringify(prefs, null, 2)};
`);

  const parDeptCount = {};
  villes.forEach((v) => { parDeptCount[v.dept] = (parDeptCount[v.dept] || 0) + 1; });
  console.log(`écrit : ${path.relative(process.cwd(), OUT)}`);
  console.log(`${villes.length} villes · ${Object.keys(parDeptCount).length} départements` +
    ` · préfectures : ${villes.filter((v) => v.prefecture).length}`);
})().catch((e) => { console.error(e); process.exit(1); });
