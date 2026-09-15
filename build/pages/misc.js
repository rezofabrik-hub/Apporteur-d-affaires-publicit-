const fs = require("fs");
const path = require("path");
const T = require("../lib/tpl");
const sectors = require("../data/sectors");
const { site, services, esc, attr, img, heroImg } = T;

/* ════════════════════════════════════════════════════════════ VILLES */
function villes(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Villes couvertes", url: "villes.html" }];
  const byRegion = {};
  cities.forEach((c) => { (byRegion[c.region] = byRegion[c.region] || []).push(c); });
  /* Tri alphabétique à l'intérieur de chaque région. L'ordre du tableau
     source suit l'ancienneté des pages, ce qui n'a aucun sens pour un
     visiteur qui cherche sa ville des yeux avant de taper dans le champ. */
  Object.values(byRegion).forEach((l) => l.sort((a, b) => a.name.localeCompare(b.name, "fr")));
  const nbDepts = new Set(cities.map((c) => c.dept)).size;

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("hero", 4, "Rues commerçantes en France")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Couverture nationale</span>
    <h1>Enseigne et signalétique dans toute la France</h1>
    <p class="lead"><strong>${cities.length} villes</strong> et <strong>${nbDepts} départements</strong>
    couverts, préfectures comprises. Le réseau s'appuie sur des ateliers, des imprimeurs et des
    poseurs locaux : trouvez votre ville ci-dessous, ou décrivez directement votre projet — nous
    sollicitons des professionnels de proximité même dans les communes non listées.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="city-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <label class="sr" for="city-search">Rechercher une ville</label>
      <input type="text" id="city-search" placeholder="Rechercher une ville ou un département…" autocomplete="off">
    </div>
    <p class="city-empty">Aucune ville ne correspond. Décrivez tout de même votre projet :
      <a href="devis.html">nous couvrons l'ensemble du territoire</a>.</p>

    ${Object.keys(byRegion).sort().map((r) => `<div class="city-group" style="margin-top:44px">
      <h2 style="font-size:1.2rem">${esc(r)} <span style="font-weight:500;color:var(--tx-3);font-size:.85rem">${byRegion[r].length} ville${byRegion[r].length > 1 ? "s" : ""}</span></h2>
      <div class="city-grid">
        ${byRegion[r].map((c) => `<a class="city-chip" href="enseigne-signaletique-${c.slug}.html"
          data-search="${attr(c.name + " " + c.dept + " " + c.deptName + " " + c.region + " " + c.cp)}">
          ${esc(c.name)}<small>${esc(c.dept)}</small></a>`).join("")}
      </div>
    </div>`).join("")}
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Votre ville n'est pas listée ?</span>
      <h2>Nous intervenons partout, y compris hors des grandes agglomérations</h2>
      <p class="lead">Les pages ci-dessus couvrent les préfectures et les principales villes de chaque
      département. Elles ne sont pas une limite : la France compte plus de 34 000 communes, et pour
      toutes les autres nous sollicitons directement des professionnels du département concerné.
      Le délai de réponse reste de 48 heures, à Paris comme dans un village de 400 habitants.</p>
    </div>
    ${T.ctaDouble()}
  </div>
</section>`;

  return T.page({
    file: "villes.html", active: "villes.html",
    title: `Villes Couvertes — Enseigne & Signalétique partout en France | ${site.brand}`,
    desc: "Retrouvez nos professionnels de l'enseigne, de la signalétique et du covering dans toutes les grandes villes de France. Devis gratuits sous 48 h.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), {
      "@context": "https://schema.org", "@type": "ItemList",
      name: "Villes couvertes",
      itemListElement: cities.map((c, i) => ({
        "@type": "ListItem", position: i + 1, name: `Enseigne et signalétique à ${c.name}`,
        url: site.domain.replace(/\/$/, "") + "/enseigne-signaletique-" + c.slug + ".html"
      }))
    }]
  });
}

/* ═════════════════════════════════════════════════════════════ TARIFS */
function tarifs(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Prix et budgets", url: "tarifs.html" }];

  /* ------------------------------------------------------------------------
     Budgets par secteur d'activité.

     Les tableaux ci-dessus sont rangés par technique — caisson, lettres
     relief, covering. C'est la logique du fabricant. Le client, lui, ne
     cherche pas « prix d'un caisson lumineux » mais « combien coûte une croix
     de pharmacie » ou « budget vitrine d'agence immobilière ». Les
     soixante-dix-neuf lignes écrites dans les pages secteur répondent
     exactement à cette seconde question ; elles n'avaient aucune raison de
     rester dispersées.

     Aucun balisage de prix n'est posé sur ces tableaux, et c'est délibéré :
     ce sont des ordres de grandeur constatés, pas des offres que le réseau
     vend. Déclarer des `Offer` sur des fourchettes indicatives reviendrait à
     annoncer des prix que personne ici ne pratique.
     ------------------------------------------------------------------------ */
  const secteursBudget = sectors.filter((sec) => (sec.budget || []).length);
  const tablesSecteur = secteursBudget.map((sec) => `<h3 id="budget-${sec.slug}">${esc(sec.nav)}</h3>
<div class="table-wrap"><table>
  <thead><tr><th scope="col">Prestation</th><th scope="col">Budget indicatif</th></tr></thead>
  <tbody>${sec.budget.map(([a, b]) =>
    `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody>
</table></div>
<p class="budget-lien"><a href="signaletique-${sec.slug}.html">Ce que la loi impose dans ce secteur,
et le dossier technique à réunir</a></p>`).join("\n");
  const nbLignesSecteur = secteursBudget.reduce((n, sec) => n + sec.budget.length, 0);

  /* Vingt-deux tableaux : la page n'est plus parcourable sans sommaire. On
     l'ouvre sur les deux entrées possibles — par technique, par métier —
     parce que le lecteur arrive avec l'une ou l'autre en tête. */
  const sommaire = `<nav class="toc" aria-label="Sommaire des budgets">
  <h2>Aller directement à…</h2>
  <div class="toc-cols">
    <div>
      <h3>Par technique</h3>
      <ul>${services.filter((sv) => sv.sections.some((x) => x.table))
        .map((sv) => `<li><a href="#${sv.slug}">${esc(sv.navShort)}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h3>Par secteur d'activité</h3>
      <ul>${secteursBudget.map((sec) =>
        `<li><a href="#budget-${sec.slug}">${esc(sec.nav)}</a></li>`).join("")}</ul>
    </div>
  </div>
</nav>`;
  const tables = services.filter((s) => s.sections.some((x) => x.table)).map((s) => {
    const t = s.sections.find((x) => x.table).table;
    return `<h2 id="${s.slug}">${esc(s.navShort)}</h2>
<div class="table-wrap"><table>
<thead><tr>${t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
<tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => i === 0
      ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
</table></div>
${t.foot ? `<p style="font-size:.86rem;color:var(--tx-3)">${t.foot}</p>` : ""}
<p><a href="${s.slug}.html">Tout savoir sur ${esc(s.navShort.toLowerCase())} →</a></p>`;
  }).join("\n");

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("pao", 1, "Nuancier de couleurs et épreuve d'impression")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Transparence</span>
    <h1>Combien coûte une enseigne, un covering ou une signalétique ?</h1>
    <p class="lead">Aucun site du secteur n'affiche ses prix, et c'est précisément ce qui rend les devis
    incomparables. Voici des fourchettes honnêtes, issues de projets réels, avec ce qui les fait varier.
    Elles ne remplacent pas un devis, mais elles vous évitent d'être surpris.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <div class="note"><p><strong>Comment lire ces fourchettes.</strong> Le bas de fourchette correspond
        à une réalisation simple, en matériaux standard, posée à hauteur d'homme et sans contrainte
        administrative. Le haut correspond à du sur-mesure, en matériaux durables, posé en nacelle
        et avec dossier d'autorisation. L'écart n'est pas une marge : c'est une différence de prestation.</p></div>

        <h2 id="varie">Les cinq facteurs qui font varier un devis</h2>
        <ul class="checks">
          <li><strong>La hauteur d'intervention</strong> — au-delà de 3,5 m, la nacelle et l'habilitation travail en hauteur ajoutent 400 à 1 600 € à la journée</li>
          <li><strong>La qualité des matériaux</strong> — inox 316 contre acier zingué, plexiglas coulé contre extrudé, LED de marque contre LED anonyme : rapport de 1 à 3 sur la durée de vie</li>
          <li><strong>L'accès au chantier</strong> — rue piétonne, arrêté de circulation, intervention de nuit ou en site occupé</li>
          <li><strong>Le volet administratif</strong> — dossier Cerfa, insertion photographique, suivi en mairie : 250 à 600 €</li>
          <li><strong>L'électricité</strong> — alimentation existante ou à créer, horloge astronomique, mise à la terre : 200 à 600 €</li>
        </ul>

        ${sommaire}

        ${tables}

        <h2 id="par-secteur">Budgets par secteur d'activité</h2>
        <p>Les tableaux ci-dessus sont rangés par technique, ce qui est la logique du fabricant.
        Voici la même matière rangée par métier : ${nbLignesSecteur} budgets pour
        ${secteursBudget.length} activités, parce qu'on cherche rarement « le prix d'un caisson
        lumineux » — on cherche ce que coûte une croix de pharmacie, un totem de garage ou une
        vitrine d'agence.</p>
        ${tablesSecteur}

        <h2 id="pieges">Les pièges classiques d'un devis trop bas</h2>
        <p>Un écart de 40 % entre deux devis cache presque toujours une différence de contenu, pas de marge.
        Les postes les plus souvent « oubliés » sont la dépose de l'ancienne enseigne, la reprise de façade,
        le raccordement électrique, le dossier en mairie, la nacelle et l'évacuation des déchets.</p>
        <ul class="checks">
          <li>Le film adhésif n'est pas référencé : monomère à 3 ans ou coulé à 10 ans ?</li>
          <li>Les LED n'ont pas de marque ni de garantie mentionnée</li>
          <li>La visserie extérieure n'est pas précisée en inox</li>
          <li>La pose est annoncée « en sus » sans montant</li>
          <li>Aucune mention de l'assurance décennale de l'installateur</li>
        </ul>
        <div class="note"><p><strong>Notre méthode :</strong> nous transmettons aux professionnels un
        cahier des charges identique, matériaux compris. C'est ce qui rend les propositions
        réellement comparables — et c'est ce que vous ne pouvez pas obtenir en consultant
        trois entreprises séparément.</p></div>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un chiffrage précis ?</h3>
          <p>Les fourchettes ne remplacent pas un devis. Décrivez votre projet : vous recevrez
          2 à 3 propositions chiffrées sous 48 heures.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Demander un devis gratuit</a>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Par métier</h4>
          <ul class="link-list">
            ${services.map((s) => `<li><a href="#${s.slug}">${esc(s.navShort)}</a></li>`).join("")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "tarifs.html", active: "tarifs.html",
    title: `Prix Enseigne, Covering, Signalétique — Tarifs Réels 2026 | ${site.brand}`,
    desc: "Combien coûte une enseigne lumineuse, un covering, une signalétique ou une impression grand format ? Fourchettes de prix détaillées par prestation et facteurs de variation.",
    body, cities, schema: [T.crumbSchema(crumbItems)]
  });
}

/* ══════════════════════════════════════════════════════════ GLOSSAIRE */
const GLOSSARY = [
  ["Adhésif coulé (cast)", "Film vinyle fabriqué par coulage, très fin et sans mémoire de forme. Il épouse les reliefs profonds sans se rétracter : c'est le seul film acceptable pour un covering de véhicule. Durée de vie 7 à 12 ans."],
  ["Adhésif calandré", "Film vinyle obtenu par laminage à chaud, plus épais et plus économique, mais avec une mémoire de forme qui le fait revenir en arrière sur les courbes. Réservé aux surfaces planes."],
  ["Autorisation préalable d'enseigne", "Démarche obligatoire en mairie (Cerfa n°14798) avant d'installer une enseigne dans une commune dotée d'un règlement local de publicité ou en secteur protégé. Délai d'instruction : 2 mois, 4 mois avec avis de l'Architecte des Bâtiments de France."],
  ["BAT (bon à tirer)", "Épreuve finale validée et signée par le client avant lancement en fabrication. Elle engage les deux parties sur les dimensions, les couleurs et les matériaux."],
  ["Bâche mesh", "Toile microperforée laissant passer environ 30 % de l'air. Obligatoire au-delà de 6 m² en façade ou sur échafaudage pour limiter la prise au vent."],
  ["Caisson lumineux", "Enseigne en forme de boîte, en aluminium laqué, dont la face en plexiglas diffusant est éclairée de l'intérieur par des modules LED. Simple ou double face."],
  ["CACES R486", "Certificat d'aptitude à la conduite en sécurité des plateformes élévatrices mobiles de personnel. Catégorie A pour les nacelles à élévation verticale, B pour les nacelles à élévation multidirectionnelle."],
  ["CMJN", "Cyan, magenta, jaune, noir : le mode colorimétrique de l'impression. Tout fichier destiné à l'impression doit y être converti, le RVB étant réservé aux écrans."],
  ["Covering", "Habillage total ou partiel d'un véhicule par des films adhésifs imprimés ou de couleur. On distingue le total covering, le semi-covering et le simple lettrage."],
  ["Dibond", "Nom commercial d'un panneau composite formé de deux feuilles d'aluminium encadrant une âme polyéthylène. Léger, parfaitement plan, très utilisé en signalétique extérieure."],
  ["Doming", "Résine polyuréthane transparente déposée sur un autocollant pour créer un effet bombé brillant, résistant aux rayures."],
  ["Drapeau (enseigne)", "Enseigne posée perpendiculairement à la façade, particulièrement efficace pour capter le flux piéton dans les rues étroites."],
  ["ERP", "Établissement recevant du public. Statut qui déclenche des obligations spécifiques d'accessibilité et de sécurité, dont une bonne part concerne directement la signalétique."],
  ["Flex", "Film textile thermocollant découpé puis pressé sur un vêtement. Rendu lisse et opaque, idéal pour les noms, numéros et logos en aplat."],
  ["Flock (flocage)", "Film textile thermocollant à surface veloutée, avec un léger relief. Plus doux que le flex, souvent utilisé pour les vêtements de sport."],
  ["Fond perdu", "Marge de sécurité au-delà du format fini, sur laquelle le visuel se prolonge pour éviter tout liseré blanc après coupe. 5 mm en standard, 30 mm sur un ourlet de bâche."],
  ["ISO 7010", "Norme internationale fixant les pictogrammes de sécurité — interdiction, obligation, avertissement, secours, incendie. Elle garantit une lecture identique dans tous les pays."],
  ["Laminage", "Film de protection transparent appliqué sur une impression pour la protéger des UV, des rayures et du lavage. Indispensable en extérieur."],
  ["Lettres boîtier", "Lettres en volume, constituées d'un dos, de joues et d'une face, éclairées par LED en rétro-éclairage (halo) ou en face lumineuse."],
  ["Lettres découpées", "Lettres pleines découpées dans un panneau (aluminium, inox, PVC, plexiglas) puis fixées sur la façade, avec ou sans entretoises."],
  ["Microperforé (one way vision)", "Film percé de milliers de micro-trous : le visuel est visible depuis l'extérieur, la transparence est conservée depuis l'intérieur. Le standard des vitrines et des vitres de véhicule."],
  ["Nacelle (PEMP)", "Plateforme élévatrice mobile de personnel. Équipement normal du travail en hauteur, soumis à vérification générale périodique semestrielle."],
  ["Néon LED", "Tube LED flexible imitant le néon traditionnel, sans gaz ni haute tension. Faible consommation, allumage instantané, sécurité renforcée."],
  ["Pantone", "Nuancier de référence universel qui permet de désigner une couleur de manière identique entre laque, adhésif, impression et textile."],
  ["PLV", "Publicité sur le lieu de vente : présentoirs, totems carton, stop-rayons, chevalets et tout support destiné à déclencher l'achat en magasin."],
  ["PMMA (plexiglas)", "Polyméthacrylate de méthyle. Le plexiglas coulé jaunit beaucoup moins vite que l'extrudé : à exiger pour toute face lumineuse."],
  ["PMR", "Personne à mobilité réduite. La signalétique PMR impose relief, braille, contraste supérieur à 70 % et pose entre 0,90 m et 1,30 m du sol."],
  ["PVC expansé (Forex)", "Panneau plastique alvéolaire léger et économique, facile à découper. Il se voile au soleil au-delà d'un mètre : à réserver à l'intérieur ou au provisoire."],
  ["RAL", "Nuancier européen des couleurs de laque et de peinture industrielle, utilisé pour le thermolaquage des structures d'enseignes."],
  ["RLP", "Règlement local de publicité : document communal ou intercommunal qui encadre enseignes, préenseignes et publicité. Il conditionne l'obligation d'autorisation préalable."],
  ["Rétro-éclairage", "Éclairage placé derrière la lettre ou le panneau, qui projette un halo lumineux sur la façade. Rendu haut de gamme, très prisé en centre-ville."],
  ["Sérigraphie", "Impression par passage d'encre à travers un écran ajouré. Couleurs très couvrantes et grande durabilité, mais un écran par couleur : rentable à partir de 25 à 50 pièces."],
  ["Sublimation", "Transfert d'encre passant directement à l'état gazeux pour pénétrer dans la fibre polyester. Rendu quadri sans relief ni craquelure."],
  ["Tampographie", "Report d'encre par tampon souple, capable d'imprimer sur des surfaces courbes ou irrégulières. Technique de référence pour les stylos et petits objets."],
  ["TLPE", "Taxe locale sur la publicité extérieure, due par l'exploitant du support et calculée au mètre carré. Exonération fréquente jusqu'à 7 m² cumulés. Déclaration avant le 1er mars."],
  ["Thermolaquage", "Application de peinture en poudre polymérisée au four sur une pièce métallique. Finition très résistante aux UV et à la corrosion."],
  ["Totem", "Support vertical autoportant implanté en entrée de site ou de zone d'activité, souvent lumineux et multi-enseignes."],
  ["Vectoriel", "Fichier composé de courbes mathématiques (AI, EPS, PDF, SVG) et non de pixels. Agrandissable à l'infini, il pilote directement les machines de découpe et de gravure."],
  ["Vitrophanie", "Ensemble des adhésifs appliqués sur une surface vitrée : lettrage, décor, film dépoli, microperforé, film solaire ou de sécurité."]
];

/* ---------------------------------------------------------------------------
   Glossaire fusionné.

   Les définitions écrites secteur par secteur — quatre-vingt-dix-sept termes
   absents du glossaire d'origine — vivaient cloisonnées dans leur page. Elles
   ont ici leur domicile canonique, et chaque entrée renvoie vers le ou les
   secteurs où elle prend son sens : le lecteur passe de la définition à
   l'usage, et le maillage interne y gagne autant d'entrées.

   Une seule famille de quasi-doublons méritait d'être réduite : « dépoli »,
   « film dépoli » et « vitrophanie dépolie » désignent la même chose.
   Les autres homonymies apparentes n'en sont pas — un drapeau de rayon n'est
   pas une enseigne drapeau, un registre de sécurité n'est pas un registre
   public d'accessibilité.
   --------------------------------------------------------------------------- */
const ALIAS = { "film dépoli": "dépoli", "vitrophanie dépolie": "dépoli" };

function normTerme(t) {
  return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function glossaireFusionne() {
  const index = new Map();
  const ajouter = (terme, def, secteur) => {
    const cle = normTerme(ALIAS[terme.toLowerCase()] || terme);
    if (!index.has(cle)) index.set(cle, { terme, def, secteurs: [] });
    const e = index.get(cle);
    /* On garde la définition la plus développée : à contenu égal, celle qui
       explique davantage rend plus de service sur une page de référence. */
    if (def.length > e.def.length) { e.def = def; e.terme = terme; }
    if (secteur && !e.secteurs.some((x) => x.slug === secteur.slug)) e.secteurs.push(secteur);
  };
  GLOSSARY.forEach(([t, d]) => ajouter(t, d, null));
  sectors.forEach((sec) => (sec.vocabulaire || []).forEach(([t, d]) =>
    ajouter(t, d, { slug: sec.slug, nav: sec.nav })));
  return Array.from(index.values())
    .sort((a, b) => a.terme.localeCompare(b.terme, "fr", { sensitivity: "base" }));
}

function glossaire(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Glossaire", url: "glossaire.html" }];
  const G = glossaireFusionne();
  /* Regroupement par initiale : à cent trente termes, une liste continue
     n'est plus consultable. L'index de lettres est la navigation attendue
     d'un ouvrage de référence. */
  const parLettre = {};
  G.forEach((e) => {
    const l = e.terme[0].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    (parLettre[l] = parLettre[l] || []).push(e);
  });
  const lettres = Object.keys(parLettre).sort((a, b) => a.localeCompare(b, "fr"));
  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("lettres-decoupees", 1, "Lettres découpées en façade")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Référence</span>
    <h1>Glossaire de l'enseigne, de la signalétique et de l'impression</h1>
    <p class="lead">Le vocabulaire du secteur est un obstacle réel : difficile de comparer deux devis
    quand on ne sait pas ce que recouvre « adhésif coulé », « lambrequin », « saillie » ou « TLPE ».
    Voici les ${G.length} termes du métier, expliqués simplement — et, pour la plupart, replacés
    dans le secteur où ils prennent leur sens.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow">
    <nav class="glo-index" aria-label="Index alphabétique">
      ${lettres.map((l) => `<a href="#lettre-${l}">${esc(l)}</a>`).join("")}
    </nav>
    ${lettres.map((l) => `<div class="glo-groupe" id="lettre-${l}">
      <h2>${esc(l)}</h2>
      <div class="acc">
        ${parLettre[l].map((e) => `<details>
          <summary>${esc(e.terme)}</summary>
          <div class="acc-body">
            <p>${esc(e.def)}</p>
            ${e.secteurs.length ? `<p class="glo-sec">En contexte : ${e.secteurs.map((sec) =>
              `<a href="signaletique-${sec.slug}.html#vocabulaire">${esc(sec.nav)}</a>`).join(", ")}</p>` : ""}
          </div>
        </details>`).join("")}
      </div>
    </div>`).join("")}
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "glossaire.html", active: "glossaire.html",
    title: `Glossaire Enseigne, Signalétique & Impression — ${G.length} termes | ${site.brand}`,
    desc: "Adhésif coulé, rétro-éclairage, TLPE, RLP, PMR, microperforé, thermolaquage : tout le vocabulaire de la communication visuelle expliqué simplement.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), {
      "@context": "https://schema.org", "@type": "DefinedTermSet",
      name: "Glossaire de la communication visuelle",
      /* Le jeu structuré porte la liste fusionnée, pas la seule liste
         d'origine : c'est ce balisage que lisent les moteurs et les
         assistants, et il n'aurait décrit que le tiers de la page. */
      hasDefinedTerm: G.map((e) => ({ "@type": "DefinedTerm", name: e.terme, description: e.def }))
    }]
  });
}

/* ═══════════════════════════════════════════════════ RÉGLEMENTATION */
function reglementation(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Réglementation", url: "reglementation-enseigne.html" }];
  const faq = [
    { q: "Toutes les communes exigent-elles une autorisation d'enseigne ?", a: "Non. L'autorisation préalable est obligatoire dans les communes dotées d'un règlement local de publicité, ainsi qu'aux abords des monuments historiques, en site patrimonial remarquable, en site classé ou inscrit, en parc naturel régional et dans les réserves naturelles. Ailleurs, l'installation reste soumise aux règles nationales mais sans dépôt préalable. En pratique, vérifiez toujours auprès du service urbanisme de votre mairie." },
    { q: "Quel est le délai pour obtenir l'autorisation ?", a: "Deux mois à compter du dépôt d'un dossier complet, porté à quatre mois lorsque l'avis de l'Architecte des Bâtiments de France est requis. L'absence de réponse dans ce délai vaut en principe autorisation tacite, mais il est vivement conseillé d'obtenir un écrit avant d'engager la fabrication." },
    { q: "Que risque-t-on à poser une enseigne sans autorisation ?", a: "Une mise en demeure de dépose sous quinze jours, assortie d'une astreinte journalière, et la dépose d'office aux frais de l'exploitant. Le maire et le préfet disposent tous deux de ce pouvoir de police." },
    { q: "Qui paie la TLPE ?", a: "L'exploitant du support, c'est-à-dire le commerçant ou l'entreprise dont l'activité est signalée — pas le fabricant ni le propriétaire des murs. Le tarif est voté par la commune et calculé au mètre carré, avec une exonération courante jusqu'à 7 m² de surface cumulée." },
    { q: "Une enseigne doit-elle être éteinte la nuit ?", a: "Oui dans le cas général : les enseignes lumineuses doivent être éteintes entre 1 heure et 6 heures du matin, sauf lorsque l'activité s'exerce à ces heures. Certaines communes appliquent des plages plus larges via leur règlement local. Une horloge astronomique règle le problème pour une centaine d'euros." }
  ];

  /* ----------------------------------------------------------------------
     Plaque tournante vers les treize blocs réglementaires des pages
     secteur. Sans ce routage, ces blocs n'avaient aucun lien entrant : ils
     existaient sans que rien n'y mène — exactement le défaut corrigé sur la
     matrice métier x ville.

     Le regroupement par nature d'obligation n'est pas cosmétique : c'est
     lui qui fait de cette page une référence plutôt qu'un sommaire. Un
     lecteur qui découvre que son métier figure sous « l'affichage extérieur
     des prix est obligatoire » a appris quelque chose avant même d'avoir
     cliqué. ---------------------------------------------------------------------- */
  const parFamille = {};
  sectors.filter((sec) => sec.reglementation && sec.reglementation.famille)
    .forEach((sec) => {
      const f = sec.reglementation.famille;
      (parFamille[f] = parFamille[f] || []).push(sec);
    });
  const ordreFamilles = [
    "L'affichage extérieur des prix est obligatoire",
    "Ce que vous avez le droit d'afficher",
    "La signalétique est un équipement de sécurité",
    "Un tiers décide, et cela commande le calendrier"
  ].filter((f) => parFamille[f]);
  const nbSecteurs = Object.keys(parFamille).reduce((n, f) => n + parFamille[f].length, 0);

  const secteursBloc = nbSecteurs ? `
<section class="sec bg-2" id="par-secteur">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Secteur par secteur</span>
      <h2>Ce que la loi impose, métier par métier</h2>
      <p class="lead">Les règles générales ci-dessus valent pour tout le monde. Mais ${nbSecteurs}
      activités ont en plus leurs obligations propres, et ce sont elles qui surprennent le plus :
      chacune a sa page, avec les textes applicables et leurs sources.</p>
    </div>
    ${ordreFamilles.map((f) => `<div class="fam">
      <h3>${esc(f)}</h3>
      <div class="grid g-2">
        ${parFamille[f].map((sec) => `<a class="card card-link fam-card"
          href="signaletique-${sec.slug}.html#reglementation">
          <div class="card-body">
            <h4>${esc(sec.nav)}</h4>
            <p>${esc(sec.reglementation.resume)}</p>
          </div>
        </a>`).join("")}
      </div>
    </div>`).join("")}
    <div class="note"><p>Chacune de ces pages cite les textes applicables et renvoie à leur source
    officielle. Les valeurs chiffrées locales — surface, saillie, tarif de TLPE — relèvent du
    règlement local de publicité de votre commune et se vérifient au cas par cas.</p></div>
  </div>
</section>` : "";

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("enseigne", 2, "Enseigne de commerce en façade")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Guide pratique</span>
    <h1>Réglementation des enseignes : autorisation, RLP, TLPE et accessibilité</h1>
    <p class="lead">Le volet administratif est la première cause de dépose forcée et de mauvaise surprise
    budgétaire. Voici ce qu'il faut savoir avant de commander, expliqué sans jargon juridique.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <div class="note"><p>Cette page présente le cadre général applicable en France.
        Elle ne remplace pas une consultation du règlement local de publicité de votre commune
        ni l'avis du service urbanisme, seuls opposables pour votre adresse.</p></div>

        <h2 id="cadre">Le cadre général</h2>
        <p>Les enseignes relèvent du <strong>Code de l'environnement</strong> (articles L.581-1 et suivants),
        qui distingue trois objets : l'<strong>enseigne</strong> (elle signale l'activité exercée sur place),
        la <strong>préenseigne</strong> (elle indique la proximité d'un établissement) et la
        <strong>publicité</strong> (tout le reste). Les règles diffèrent pour chacun, et c'est cette
        distinction qui détermine ce que vous avez le droit d'installer.</p>

        <h2 id="autorisation">L'autorisation préalable d'enseigne</h2>
        <p>Elle est requise dans les communes couvertes par un <strong>règlement local de publicité</strong>,
        ainsi que dans tous les secteurs protégés : abords de monuments historiques, sites patrimoniaux
        remarquables, sites classés ou inscrits, parcs naturels régionaux, réserves naturelles.</p>
        <ul class="checks">
          <li>Formulaire <strong>Cerfa n°14798</strong> déposé en mairie</li>
          <li>Plan de situation et plan de façade cotés</li>
          <li><strong>Insertion photographique</strong> : photomontage de l'enseigne sur la façade réelle</li>
          <li>Descriptif des matériaux, des couleurs et du mode d'éclairage</li>
          <li>Accord écrit du propriétaire des murs, et de la copropriété le cas échéant</li>
        </ul>
        <p>Délai d'instruction : <strong>deux mois</strong>, ou <strong>quatre mois</strong> si
        l'Architecte des Bâtiments de France doit se prononcer.</p>

        <h2 id="regles">Les règles de dimension les plus courantes</h2>
        <p>Sous réserve du règlement local, qui peut être plus strict, le cadre national prévoit notamment :</p>
        <div class="table-wrap"><table>
          <thead><tr><th scope="col">Type d'enseigne</th><th scope="col">Règle générale</th></tr></thead>
          <tbody>
            <tr><th scope="row">Enseigne sur façade</th><td>Au plus 15 % de la surface de façade, ou 25 % si la façade est inférieure à 50 m²</td></tr>
            <tr><th scope="row">Enseigne perpendiculaire (drapeau)</th><td>Ne doit pas dépasser la limite du mur ni s'avancer de plus d'un mètre au-dessus du domaine public</td></tr>
            <tr><th scope="row">Enseigne de toiture</th><td>Autorisée uniquement en lettres ou signes découpés, hauteur limitée selon celle du bâtiment</td></tr>
            <tr><th scope="row">Enseigne scellée au sol</th><td>Limitée en nombre et en surface selon la longueur de façade sur voie publique</td></tr>
            <tr><th scope="row">Enseigne lumineuse</th><td>Extinction entre 1 h et 6 h, sauf activité nocturne</td></tr>
          </tbody>
        </table></div>

        <h2 id="tlpe">La TLPE, taxe locale sur la publicité extérieure</h2>
        <p>Facultative, elle est instituée par délibération de la commune ou de l'intercommunalité.
        Elle frappe les enseignes, préenseignes et dispositifs publicitaires, au mètre carré et par face.
        Une <strong>exonération s'applique le plus souvent jusqu'à 7 m²</strong> de surface cumulée
        d'enseignes. La déclaration se dépose avant le 1er mars pour l'année en cours, et le paiement
        intervient généralement en septembre.</p>

        <h2 id="accessibilite">Accessibilité : ce qui concerne la signalétique</h2>
        <p>Pour tout établissement recevant du public, l'<strong>arrêté du 20 avril 2017</strong>
        impose des règles précises de lisibilité et de repérage.</p>
        <ul class="checks">
          <li>Contraste d'au moins <strong>70 %</strong> entre le texte et son fond</li>
          <li>Hauteur de caractères adaptée à la distance de lecture : 15 mm minimum en lecture rapprochée</li>
          <li>Informations essentielles doublées en <strong>relief</strong> et en <strong>braille</strong></li>
          <li>Pose entre <strong>0,90 m et 1,30 m</strong> pour les éléments touchés à la main</li>
          <li>Bandes d'éveil de vigilance en haut des escaliers, contraste sur première et dernière marche</li>
          <li>Repérage visuel des parois vitrées, à hauteur de vue</li>
        </ul>

        <h2 id="autres">Les autres autorisations à ne pas oublier</h2>
        <ul class="checks">
          <li><strong>Copropriété</strong> — autorisation de l'assemblée générale pour toute fixation en partie commune</li>
          <li><strong>Propriétaire des murs</strong> — accord écrit, souvent exigé au dossier</li>
          <li><strong>Occupation du domaine public</strong> — pour la nacelle, le camion et le balisage, à demander 10 à 15 jours avant</li>
          <li><strong>Déclaration préalable de travaux</strong> — si la devanture elle-même est modifiée</li>
          <li><strong>Bailleur commercial</strong> — le bail peut encadrer l'aspect de l'enseigne</li>
        </ul>

        <div class="note"><p><strong>Bonne nouvelle :</strong> les enseignistes du réseau prennent en charge
        le montage complet du dossier — Cerfa, plans, insertion photographique et suivi en mairie.
        Précisez-le dans votre demande de devis pour que ce poste soit chiffré dès le départ.</p></div>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Dossier pris en charge</h3>
          <p>Vous n'avez pas envie de monter le dossier vous-même ? C'est prévu. Indiquez-le
          simplement dans votre demande.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Demander un devis</a>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Sur cette page</h4>
          <ul class="link-list">
            <li><a href="#cadre">Le cadre général</a></li>
            <li><a href="#autorisation">Autorisation préalable</a></li>
            <li><a href="#regles">Règles de dimension</a></li>
            <li><a href="#tlpe">La TLPE</a></li>
            <li><a href="#accessibilite">Accessibilité</a></li>
            <li><a href="#autres">Autres autorisations</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${secteursBloc}
<section class="sec bg-3">
  <div class="wrap wrap-narrow">
    <div class="sec-head center"><span class="eyebrow">Questions fréquentes</span>
    <h2>Réglementation : vos questions</h2></div>
    ${T.faqBlock(faq)}
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "reglementation-enseigne.html", active: "reglementation-enseigne.html",
    title: `Réglementation Enseigne — Autorisation, RLP, TLPE, Accessibilité | ${site.brand}`,
    desc: "Autorisation préalable d'enseigne, règlement local de publicité, TLPE, règles de dimension et accessibilité PMR : le guide complet de la réglementation des enseignes en France.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), T.faqSchema(faq)]
  });
}

/* ═════════════════════════════════════════════ COMMENT ÇA MARCHE */
function comment(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Comment ça marche", url: "comment-ca-marche.html" }];
  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("equipe-pro", 2, "Réunion de travail entre professionnels")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Notre rôle</span>
    <h1>Apporteur d'affaires en communication visuelle : comment nous travaillons</h1>
    <p class="lead">Nous ne fabriquons rien et nous ne posons rien. Notre métier consiste à comprendre
    un projet, à le traduire en cahier des charges technique, et à le confier aux professionnels
    dont l'outil de production correspond réellement au besoin. Voici précisément comment.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="experience">Qui est derrière le réseau</h2>
        <p>${esc(site.experienceText)}</p>
        <p>Concrètement, cela change trois choses. Un projet mal exprimé au départ est
        <strong>rattrapé au téléphone</strong> plutôt que transmis tel quel. Un devis auquel il manque
        la dépose, le raccordement électrique ou le dossier en mairie est <strong>repéré avant</strong>
        que vous ne le signiez. Et un professionnel qui annonce des capacités qu'il n'a pas est
        <strong>identifié à la première question technique</strong>.</p>

        <h2 id="probleme">Le problème que nous résolvons</h2>
        <p>Un commerçant qui cherche une enseigne fait face à trois difficultés qui n'ont rien
        d'anecdotique. D'abord, <strong>il ne connaît pas le vocabulaire</strong> : impossible de
        distinguer un caisson d'une lettre boîtier, un film monomère d'un film coulé. Ensuite,
        <strong>les devis reçus ne sont pas comparables</strong>, chaque entreprise chiffrant sa propre
        interprétation du besoin. Enfin, <strong>il ignore les contraintes réglementaires</strong>
        jusqu'au jour où la mairie lui demande de déposer son enseigne.</p>
        <p>Consulter trois entreprises soi-même représente environ dix heures de travail, réparties sur
        trois semaines, pour aboutir à trois documents qu'on ne peut pas mettre côte à côte.</p>

        <h2 id="methode">Notre méthode, étape par étape</h2>
        <div class="steps stack" style="margin:2em 0">
          <div class="step"><h3>Qualification du besoin</h3>
            <p>Un échange téléphonique de dix à quinze minutes. Nous relevons l'activité, la façade,
            la distance de lecture, l'existence d'une enseigne à déposer, les contraintes d'accès,
            le délai et l'ordre de budget. Nous demandons souvent une photo de la façade — elle vaut
            mille explications.</p></div>
          <div class="step"><h3>Rédaction du cahier des charges</h3>
            <p>Nous traduisons en termes techniques : type d'enseigne, matériaux, mode d'éclairage,
            dimensions, type de fixation, prestations incluses (dépose, électricité, dossier mairie).
            C'est ce document, identique pour tous, qui rend les devis comparables.</p></div>
          <div class="step"><h3>Sélection des professionnels</h3>
            <p>Nous interrogeons notre base de capacités : qui possède la machine adaptée, qui a la
            nacelle à la bonne hauteur, qui intervient dans ce rayon, qui est disponible sur ce délai.
            Deux ou trois entreprises sont retenues, jamais davantage.</p></div>
          <div class="step"><h3>Réception et comparaison des offres</h3>
            <p>Les propositions vous parviennent sous 48 heures. Nous restons disponibles pour vous
            aider à les lire — notamment sur les postes qui expliquent les écarts de prix.</p></div>
          <div class="step"><h3>Vous choisissez, vous contractez en direct</h3>
            <p>Le contrat se signe entre vous et l'entreprise retenue. Nous n'intervenons pas dans
            l'exécution, et nous ne prenons aucune marge sur votre facture.</p></div>
        </div>

        <h2 id="modele">Notre modèle économique, en clair</h2>
        <p>Le service est <strong>entièrement gratuit pour le client</strong> : ni la mise en relation,
        ni les devis ne vous sont facturés, et aucune commission n'est ajoutée au prix que vous paierez
        à l'entreprise retenue.</p>
        <p>Nous sommes rémunérés par les professionnels du réseau, sous forme d'un
        <strong>abonnement annuel fixe</strong>. Ils l'acceptent parce qu'il leur coûte
        moins cher qu'une campagne de prospection, et parce qu'il remplace l'achat de contacts à
        l'unité pratiqué par les plateformes. Le détail figure sur la page
        <a href="partenaires.html">partenaires</a>.</p>
        <div class="note"><p><strong>Ce que cela implique concrètement :</strong> comme notre revenu ne
        dépend pas du montant de votre chantier, nous n'avons aucun intérêt à vous orienter vers l'offre
        la plus chère. Nous avons intérêt à ce que le projet se fasse, qu'il se passe bien, et que le
        partenaire renouvelle son abonnement — ce qu'il ne fera que si les demandes que nous lui
        transmettons se transforment.</p></div>

        <h2 id="selection">Comment nous sélectionnons les professionnels</h2>
        <ul class="checks">
          <li>Existence légale vérifiée : SIRET actif, forme juridique, ancienneté</li>
          <li>Assurances à jour : responsabilité civile professionnelle et garantie décennale</li>
          <li>Habilitations réelles : CACES R486, habilitation électrique, travail en hauteur</li>
          <li>Capacités de production déclarées puis recoupées : machines, formats, volumes</li>
          <li>Zone d'intervention réelle, pour ne pas transmettre un chantier qui sera refusé</li>
          <li>Suivi des retours clients après chaque affaire apportée</li>
        </ul>

        <h2 id="limites">Ce que nous ne faisons pas</h2>
        <p>Par honnêteté, autant le dire : nous ne fabriquons pas, nous ne posons pas, et nous ne nous
        substituons pas à l'entreprise que vous choisissez en cas de litige — c'est son assurance et
        son contrat qui s'appliquent. Nous ne garantissons pas non plus le prix le plus bas du marché :
        nous garantissons des offres comparables, émises par des entreprises réellement équipées et
        assurées pour le travail demandé.</p>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Prêt à démarrer ?</h3>
          <p>Deux minutes de formulaire, un rappel sous 24 heures, des devis sous 48 heures.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Décrire mon projet</a>
          <a class="btn btn-ghost btn-block btn-sm" style="margin-top:10px" href="professionnels.html">Je suis un professionnel</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "comment-ca-marche.html", active: "comment-ca-marche.html",
    title: `Comment ça marche — Apporteur d'affaires en communication visuelle | ${site.brand}`,
    desc: "Qualification du besoin, cahier des charges technique, sélection des professionnels, devis comparables sous 48 h : découvrez notre méthode et notre modèle économique.",
    body, cities, schema: [T.crumbSchema(crumbItems)]
  });
}

/* ═══════════════════════════════════════════════════════════════ FAQ */
function faqPage(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Questions fréquentes", url: "faq.html" }];
  const groups = [
    { t: "Le service", items: [
      { q: "Le service est-il vraiment gratuit ?", a: "Oui, totalement et sans contrepartie cachée. Vous ne payez ni la mise en relation, ni les devis, et aucune commission n'est ajoutée au prix de l'entreprise retenue. Notre rémunération provient des professionnels du réseau, sous forme d'un abonnement annuel fixe — indépendant du montant de votre chantier." },
      { q: "Suis-je engagé après avoir rempli le formulaire ?", a: "Non. Vous pouvez refuser toutes les propositions reçues, sans justification et sans frais. Aucune exclusivité ne vous est demandée : vous restez libre de consulter d'autres entreprises en parallèle." },
      { q: "Combien de devis vais-je recevoir ?", a: "Deux à trois en général, établis sur un cahier des charges identique. Nous préférons trois offres sérieuses à dix offres approximatives : au-delà, le tri devient un travail à part entière et les professionnels sérieux se désengagent." },
      { q: "En combien de temps ?", a: "Nous vous rappelons sous 24 heures ouvrées pour préciser le besoin, puis les propositions arrivent sous 48 heures. Pour un projet complexe — signalétique d'un bâtiment entier, flotte de véhicules — comptez 3 à 5 jours." }
    ]},
    { t: "Les professionnels", items: [
      { q: "Qui réalise les travaux ?", a: "Des entreprises indépendantes de votre région : enseignistes fabricants, imprimeurs grand format, poseurs habilités, graphistes, spécialistes du covering et de l'objet publicitaire. Nous vérifions leur SIRET, leurs assurances, leurs habilitations et leurs capacités de production avant tout référencement." },
      { q: "Comment sont-ils sélectionnés ?", a: "Sur trois critères cumulatifs : la conformité administrative (SIRET actif, responsabilité civile professionnelle et décennale à jour), les capacités techniques réellement disponibles en interne, et le suivi des retours clients après chaque affaire apportée." },
      { q: "Puis-je choisir un professionnel en particulier ?", a: "Oui, si vous en connaissez un dans le réseau, indiquez-le dans votre demande. À l'inverse, si vous souhaitez éviter une entreprise avec laquelle vous avez déjà travaillé, dites-le également : nous en tiendrons compte." },
      { q: "Que se passe-t-il en cas de litige ?", a: "Le contrat vous lie directement à l'entreprise retenue : ce sont ses conditions et ses assurances qui s'appliquent. Nous intervenons néanmoins en médiation, et un professionnel dont les litiges se répètent est retiré du réseau." }
    ]},
    { t: "Les projets", items: [
      { q: "Traitez-vous les petits projets ?", a: "Oui. Un lettrage de vitrine à 250 €, une plaque professionnelle ou cinquante stylos marqués sont traités comme le reste. Beaucoup de professionnels du réseau ont un seuil bas justement pour ce type de demande." },
      { q: "Et les projets multi-sites ?", a: "C'est un cas fréquent : franchises, réseaux d'agences, entreprises multi-établissements. Nous construisons une charte technique reproductible et coordonnons des ateliers locaux pour un déploiement homogène, avec un planning par site." },
      { q: "Pouvez-vous m'aider si je ne sais pas ce que je veux ?", a: "C'est même le cas le plus courant. Décrivez votre activité et votre façade, joignez une photo : nous vous proposons deux ou trois directions possibles avec leurs ordres de budget avant de lancer la moindre consultation." },
      { q: "Travaillez-vous avec les collectivités ?", a: "Oui, sur la signalétique directionnelle, l'accessibilité PMR, la signalétique de bâtiments publics et le mobilier d'information. Nous orientons vers des entreprises habituées aux marchés publics et à leurs exigences documentaires." }
    ]},
    { t: "Zone et couverture", items: [
      { q: "Intervenez-vous dans ma ville ?", a: "Le réseau couvre l'ensemble du territoire, métropole et outre-mer. Les pages « villes » correspondent aux agglomérations où il est déjà solidement implanté. Pour toute autre commune, nous sollicitons directement des professionnels du département concerné." },
      { q: "Le professionnel sera-t-il proche de chez moi ?", a: "C'est un critère de sélection prioritaire. Un poseur situé à 30 km intervient plus vite, coûte moins cher en déplacement et rend le service après-vente réellement praticable — ce qui compte énormément pour une enseigne lumineuse." },
      { q: "Puis-je faire fabriquer loin et poser près ?", a: "Oui, c'est un montage courant pour les pièces très spécifiques : fabrication dans un atelier spécialisé, pose par une équipe locale. Nous coordonnons les deux et veillons à la cohérence des responsabilités entre fabricant et poseur." }
    ]},
    { t: "Autorisations et réglementation", items: [
      { q: "Faut-il une autorisation pour poser une enseigne ?", a: "L'autorisation est délivrée par le maire, qui en a la compétence exclusive depuis janvier 2024. Elle est obligatoire dans les communes dotées d'un règlement local de publicité, ainsi qu'aux abords des monuments historiques, en site patrimonial remarquable, en site classé ou inscrit, en parc naturel régional et en réserve naturelle. Ailleurs, les règles nationales s'appliquent sans dépôt préalable — mais vérifiez toujours auprès du service urbanisme, car un RLP peut avoir été adopté récemment." },
      { q: "L'autorisation d'enseigne me permet-elle de refaire ma façade ?", a: "Non, et c'est le malentendu le plus fréquent — il arrête des chantiers. L'autorisation d'enseigne ne couvre que l'enseigne. Repeindre la devanture, changer la vitrine, poser un store banne relèvent d'une déclaration préalable distincte, au titre du code de l'urbanisme. Deux dossiers, deux instructions, souvent le même service mais jamais la même décision." },
      { q: "Qui dépose le dossier en mairie ?", a: "C'est à convenir, et cela doit figurer au devis. Beaucoup d'enseignistes prennent en charge la constitution et le dépôt dans le cadre de leur prestation ; d'autres fournissent les pièces techniques et vous laissent déposer. Ce point revient dans le cahier des charges que nous transmettons, précisément parce qu'il se règle mal après coup." },
      { q: "Mon enseigne doit-elle être éteinte la nuit ?", a: "Oui dans le cas général : l'arrêté du 27 décembre 2018 impose l'extinction des enseignes lumineuses entre 1 heure et 6 heures du matin, et il s'applique à toutes les enseignes depuis le 1er janvier 2020. Les activités s'exerçant à ces heures en sont dispensées — c'est notamment le cas d'une pharmacie qui assure la garde. En pratique, une horloge astronomique règle le problème pour une centaine d'euros, et elle évite de compter sur quelqu'un pour actionner un interrupteur chaque soir." },
      { q: "Qu'est-ce que la TLPE et qui la paie ?", a: "La taxe locale sur la publicité extérieure est due par l'exploitant du support — le commerçant dont l'activité est signalée, pas le fabricant ni le propriétaire des murs. Elle est instituée par délibération de la commune, son tarif dépend de la strate de population, et elle se calcule sur la surface cumulée de tous vos supports. C'est ce dernier point qui surprend : bandeau, enseigne drapeau, caisson et chevalet permanent s'additionnent, et un support de plus peut faire franchir le seuil d'exonération." },
      { q: "Je suis aux abords d'un monument historique, est-ce bloquant ?", a: "Non, mais cela ajoute un avis et du délai. L'accord de l'architecte des Bâtiments de France est requis, et le dessin se négocie plutôt qu'il ne s'impose : matériaux, couleurs, mode d'éclairage, saillie. Comptez quatre mois d'instruction au lieu de deux. Un professionnel habitué aux secteurs protégés fait gagner un temps considérable, parce qu'il propose d'emblée ce qui passe." },
      { q: "Que risque-t-on à poser sans autorisation ?", a: "Une mise en demeure de dépose sous quinze jours, assortie d'une astreinte journalière, puis la dépose d'office aux frais de l'exploitant. Le maire et le préfet disposent tous deux de ce pouvoir de police. Le coût réel n'est pas l'amende : c'est de payer deux fois l'enseigne, et de rester sans signalisation entre les deux." },
      { q: "Mon métier a-t-il des obligations particulières ?", a: "Très probablement. Treize secteurs ont des obligations propres à leur activité, et elles sont souvent ignorées : affichage extérieur des prix obligatoire chez le garagiste, le restaurateur, le coiffeur et l'agent immobilier ; mentions limitativement autorisées sur la plaque d'un médecin ou la croix d'une pharmacie ; interdiction du parrainage par l'alcool en enceinte sportive. Chaque secteur a sa page, avec les textes et leurs sources." }
    ]},
    { t: "Prix, devis et paiement", items: [
      { q: "Comment comparer deux devis d'enseigne ?", a: "Trois postes expliquent presque tout l'écart. D'abord la technique réelle : des lettres boîtier, des lettres relief et un caisson à face plexiglas n'ont ni le même prix ni la même durée de vie. Ensuite l'éclairage : LED de marque avec alimentation accessible, ou premier prix qu'il faudra ouvrir la façade pour remplacer. Enfin ce qui est inclus : dépose de l'ancienne enseigne, dossier en mairie, raccordement électrique, nacelle. Un devis moins cher qui exclut ces trois postes ne l'est pas." },
      { q: "Le devis inclut-il la pose et la dépose ?", a: "Cela varie, et c'est précisément ce qu'il faut faire préciser. La dépose de l'ancienne enseigne, la reprise du support après dépose, la location d'une nacelle et l'éventuelle autorisation d'occupation du trottoir sont des postes réels. Nous demandons qu'ils soient détaillés dans les propositions que vous recevez, ligne par ligne." },
      { q: "Faut-il verser un acompte ?", a: "C'est l'usage dans ce métier, parce que la fabrication est faite sur mesure et ne se revend pas : un acompte de 30 à 50 % à la commande est courant. Il doit figurer au devis avec les conditions de règlement du solde. Méfiez-vous d'un paiement intégral demandé avant fabrication, qui n'a pas de justification sur un chantier de cette nature." },
      { q: "Y a-t-il des aides possibles ?", a: "Selon les cas, oui. Certaines communes et intercommunalités subventionnent la rénovation des devantures commerciales en centre-ville, parfois dans le cadre d'une opération collective de modernisation. Les montants et les conditions varient beaucoup : renseignez-vous auprès de votre mairie ou de votre chambre de commerce avant d'engager les travaux, car une aide accordée après coup est rare." },
      { q: "Combien de temps un devis reste-t-il valable ?", a: "Un mois en général. Mais si votre décision passe par une assemblée générale de copropriété ou par un conseil municipal, demandez une validité plus longue dès le départ : une offre à trente jours présentée six semaines plus tard est caduque au moment du vote. Nous signalons cette contrainte aux professionnels quand la demande vient d'une copropriété ou d'une collectivité." }
    ]},
    { t: "Délais et déroulement", items: [
      { q: "Combien de temps entre la commande et la pose ?", a: "Pour une enseigne de commerce courante, comptez trois à six semaines : une à deux pour le bon à tirer et les validations, deux à trois pour la fabrication, et la pose selon les disponibilités de nacelle. Si une autorisation est nécessaire, ajoutez le délai d'instruction — deux mois, quatre avec l'avis de l'architecte des Bâtiments de France. C'est l'administratif qui commande le calendrier, pas l'atelier." },
      { q: "Puis-je faire poser avant d'avoir l'autorisation ?", a: "C'est déconseillé, et le risque est financier autant que juridique. Une enseigne posée sans autorisation peut faire l'objet d'une mise en demeure de dépose sous astreinte. Sur une ouverture de commerce, la solution habituelle est un habillage provisoire — vitrophanie, bâche — le temps que le dossier aboutisse." },
      { q: "Qu'est-ce qu'un bon à tirer, et pourquoi est-ce important ?", a: "C'est le document par lequel vous validez le visuel définitif : texte, dimensions, couleurs, implantation. À partir de votre signature, la fabrication est lancée et une erreur validée reste à votre charge. Relisez-le comme un contrat : orthographe, numéro de téléphone, dimensions en centimètres, et surtout la référence de couleur — un vert « à peu près » n'existe pas, il y a une référence Pantone ou RAL." },
      { q: "Que se passe-t-il si la pose est retardée ?", a: "Les délais figurent au devis et engagent l'entreprise. Les causes de retard les plus fréquentes sont extérieures à l'atelier : instruction administrative plus longue que prévu, intempéries qui interdisent une pose en hauteur, indisponibilité de nacelle en pleine saison. Un professionnel sérieux vous prévient dès qu'il le sait, plutôt que le jour prévu." }
    ]},
    { t: "Après la pose", items: [
      { q: "Quelle garantie sur une enseigne lumineuse ?", a: "Deux ans sur les LED et l'alimentation est un standard de marché, parfois cinq selon les fabricants. Vérifiez surtout ce que couvre la garantie : la fourniture du composant seulement, ou également la main-d'œuvre et la nacelle nécessaires pour y accéder. Sur une enseigne en hauteur, l'accès coûte souvent plus cher que la pièce." },
      { q: "Que faire quand une lettre ne s'allume plus ?", a: "N'attendez pas : une enseigne partiellement éteinte fait plus de mal qu'une enseigne éteinte. L'origine est le plus souvent l'alimentation ou un module LED, rarement l'ensemble. C'est aussi un argument de conception — une alimentation placée en façade, accessible sans démonter le caisson, transforme une intervention d'une demi-journée en une intervention d'une heure." },
      { q: "À quelle fréquence entretenir une enseigne ?", a: "Un nettoyage annuel suffit dans la plupart des cas, deux en bord de mer où le sel attaque les fixations et ternit les faces. Profitez-en pour faire vérifier les fixations et l'étanchéité des passages de câbles : c'est l'eau qui tue les enseignes lumineuses, pas les LED." },
      { q: "Combien de temps dure un covering de véhicule ?", a: "Cinq à sept ans pour un film coulé de qualité, deux à trois pour un calandré d'entrée de gamme. L'écart tient au film, pas à la pose. L'exposition compte beaucoup : un utilitaire qui dort dehors plein sud vieillit deux fois plus vite qu'un véhicule remisé. La dépose, elle, doit rester possible sans abîmer la peinture — c'est un point à vérifier si le véhicule est en location longue durée." },
      { q: "Que devient l'ancienne enseigne ?", a: "Sa dépose et son évacuation sont un poste du devis, pas un service gratuit. Les enseignes lumineuses contiennent des composants électriques et électroniques qui relèvent d'une filière de traitement dédiée. Un professionnel doit pouvoir vous dire ce qu'il en fait — et si vous quittez un réseau, la dépose des signes de la marque est souvent contractuellement à votre charge, sous un délai bref." }
    ]}
  ];
  const all = groups.flatMap((g) => g.items);

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("signaletique", 3, "Signalétique directionnelle")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Aide</span>
    <h1>Questions fréquentes</h1>
    <p class="lead">Tout ce que l'on nous demande sur le fonctionnement du réseau, la sélection
    des professionnels, les délais et la couverture géographique.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow">
    ${groups.map((g) => `<h2 style="margin-top:2em">${esc(g.t)}</h2>${T.faqBlock(g.items)}`).join("")}
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "faq.html", active: "faq.html",
    title: `Questions Fréquentes — Devis Enseigne & Signalétique | ${site.brand}`,
    desc: "Gratuité, délais, sélection des professionnels, projets multi-sites, couverture géographique : les réponses aux questions les plus posées.",
    body, cities, schema: [T.crumbSchema(crumbItems), T.faqSchema(all)]
  });
}

/* ═══════════════════════════════════════════════════ CRÉDITS PHOTOS */
function credits(cities) {
  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "assets", "credits.json"), "utf8"));
  } catch (e) {}

  const rows = list.map((c) => `<tr>
    <th scope="row" style="font-weight:500">${esc(c.title || "Photographie")}</th>
    <td>${c.creator_url ? `<a href="${esc(c.creator_url)}" rel="nofollow noopener" target="_blank">${esc(c.creator)}</a>` : esc(c.creator)}</td>
    <td>${c.license_url ? `<a href="${esc(c.license_url)}" rel="nofollow noopener" target="_blank">${esc(c.license)}</a>` : esc(c.license)}</td>
    <td>${c.source_url ? `<a href="${esc(c.source_url)}" rel="nofollow noopener" target="_blank">${esc(c.provider || "source")}</a>` : esc(c.provider)}</td>
  </tr>`).join("");

  const body = `
<section class="hero hero-in-page">
  <div class="wrap hero-in">
    ${T.crumbs([{ name: "Accueil", url: "index.html" }, { name: "Crédits photos", url: "credits-photos.html" }])}
    <h1>Crédits photographiques</h1>
    <p class="lead">Toutes les photographies de ce site sont publiées sous licence libre
    (CC0, domaine public, CC BY ou CC BY-SA) et utilisables à des fins commerciales.
    Elles ont fait l'objet d'un recadrage et d'un étalonnage colorimétrique.
    ${list.length} visuels sont référencés ci-dessous avec leur auteur et leur licence.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="note"><p><strong>Remplacer ces images par vos propres réalisations</strong> est vivement
    recommandé dès que possible : rien ne convertit mieux qu'une photo de chantier réel.
    Déposez vos fichiers dans <code>assets/img/</code> en conservant les mêmes noms, ou modifiez
    <code>build/lib/tpl.js</code>.</p></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th scope="col">Photographie</th><th scope="col">Auteur</th><th scope="col">Licence</th><th scope="col">Source</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>
</section>`;

  return T.page({
    file: "credits-photos.html",
    title: `Crédits photographiques | ${site.brand}`,
    desc: "Auteurs, licences et sources des photographies libres de droit utilisées sur ce site.",
    body, cities
  });
}

/* ═══════════════════════════════════════════════════════════ LÉGAL */
function legal(cities) {
  const L = site.legal;
  const mentions = T.page({
    file: "mentions-legales.html",
    title: `Mentions légales | ${site.brand}`,
    desc: "Mentions légales du site : éditeur, hébergeur, propriété intellectuelle et responsabilité.",
    cities,
    body: `
<section class="hero hero-in-page"><div class="wrap hero-in">
  ${T.crumbs([{ name: "Accueil", url: "index.html" }, { name: "Mentions légales", url: "mentions-legales.html" }])}
  <h1>Mentions légales</h1>
</div></section>
<section class="sec"><div class="wrap wrap-narrow"><article class="prose">
  <div class="note"><p><strong>Un champ reste à compléter</strong> : le montant du capital social,
  signalé entre crochets ci-dessous. Il ne figure pas dans les données ouvertes du répertoire des
  entreprises ; il se relève sur les statuts ou sur l'extrait Kbis. Les autres mentions exigées par
  l'article 6 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique sont
  renseignées.</p></div>

  <h2>Éditeur du site</h2>
  <p><strong>${esc(L.denomination)}</strong>, ${esc(L.forme)} au capital de ${esc(L.capital)} euros,
  exploitant la marque <strong>${esc(site.brand)}</strong><br>
  Siège social : ${esc(L.siege)}<br>
  SIREN : ${esc(L.siren)} — SIRET du siège : ${esc(L.siret)}<br>
  RCS : ${esc(L.rcs)}<br>
  TVA intracommunautaire : ${esc(L.tva)}<br>
  Code APE : ${esc(L.naf)}<br>
  Téléphone : <a data-cfg="phone" href="tel:${esc(site.phoneHref)}">${esc(site.phoneDisplay)}</a><br>
  E-mail : <a data-cfg="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
  <p><strong>Directeur de la publication</strong> : ${esc(L.dirigeant)}, gérant de
  ${esc(L.denomination)}.</p>

  <h2>Hébergement</h2>
  <p>Le site est hébergé sur GitHub Pages.<br>
  <strong>GitHub, Inc.</strong><br>
  88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis<br>
  <a href="https://support.github.com" rel="nofollow noopener" target="_blank">support.github.com</a>
  — <a href="https://github.com" rel="nofollow noopener" target="_blank">github.com</a></p>

  <h2>Activité exercée</h2>
  <p>${esc(site.brandLegal)} exerce, à travers ce site, une activité d'apport d'affaires et de mise en
  relation entre des clients ayant un projet de communication visuelle et des professionnels
  indépendants (enseignistes, imprimeurs, poseurs, graphistes, fournisseurs d'objets publicitaires).</p>
  <p><strong>${esc(site.brandLegal)} n'assure ni la fabrication, ni la pose, ni la vente des prestations
  présentées.</strong> Les contrats sont conclus directement entre le client et le professionnel
  retenu, qui en assume seul l'exécution, les garanties et les assurances. ${esc(site.brandLegal)}
  n'est ni mandataire, ni commissionnaire, ni agent commercial d'aucune des parties.</p>

  <h2>Absence de vente aux consommateurs</h2>
  <p>La mise en relation est gratuite pour le client : aucun contrat de vente ou de prestation n'est
  conclu entre ${esc(site.brandLegal)} et le visiteur du site. La seule prestation facturée par
  ${esc(site.brandLegal)} est l'abonnement souscrit par des professionnels, régi par les
  <a href="conditions-generales.html">conditions générales de vente</a> et conclu entre
  professionnels.</p>
  <p>Aucun dispositif de médiation de la consommation n'est donc requis au titre de l'article
  L.616-1 du code de la consommation pour l'activité exercée sur ce site. La plateforme européenne
  de règlement en ligne des litiges, à laquelle renvoyaient jusqu'alors de nombreux sites
  marchands, a par ailleurs définitivement fermé le 20 juillet 2025.</p>

  <h2>Contenus pédagogiques</h2>
  <p>Les fiches publiées dans la rubrique <a href="formation.html">formation</a> sont une
  documentation technique mise à disposition gratuitement. Elles ne constituent ni une action de
  formation au sens de l'article L.6313-1 du code du travail, ni une prestation vendue, et
  ${esc(site.brandLegal)} n'est pas déclaré organisme de formation. Elles ne dispensent pas de
  respecter les notices des fabricants, les règles de l'art et la réglementation applicable au
  chantier.</p>

  <h2>Propriété intellectuelle</h2>
  <p>La structure du site, ses textes et son identité visuelle sont protégés par le droit d'auteur.
  Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
  Les photographies sont publiées sous licence libre : voir la page
  <a href="credits-photos.html">crédits photographiques</a>.</p>

  <h2>Responsabilité</h2>
  <p>Les informations techniques, réglementaires et tarifaires publiées sur ce site sont fournies
  à titre indicatif et ne sauraient engager la responsabilité de l'éditeur. Elles ne remplacent ni un
  devis, ni la consultation du règlement local de publicité applicable à votre adresse, ni l'avis
  du service urbanisme de votre commune.</p>

  <h2>Liens hypertextes</h2>
  <p>Le site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur leur
  contenu et décline toute responsabilité à leur égard.</p>

  <h2>Droit applicable</h2>
  <p>Le présent site est soumis au droit français. Tout litige relève de la compétence des tribunaux
  français, sous réserve des règles impératives applicables aux consommateurs.</p>
</article></div></section>`
  });

  const conf = T.page({
    file: "confidentialite.html",
    title: `Politique de confidentialité — Données personnelles | ${site.brand}`,
    desc: "Traitement des données personnelles, finalités, destinataires, durée de conservation et exercice de vos droits conformément au RGPD.",
    cities,
    body: `
<section class="hero hero-in-page"><div class="wrap hero-in">
  ${T.crumbs([{ name: "Accueil", url: "index.html" }, { name: "Confidentialité", url: "confidentialite.html" }])}
  <h1>Politique de confidentialité</h1>
  <p class="lead">Comment nous traitons vos données personnelles, à qui elles sont transmises,
  combien de temps elles sont conservées et comment exercer vos droits.</p>
</div></section>
<section class="sec"><div class="wrap wrap-narrow"><article class="prose">
  <h2>Responsable du traitement</h2>
  <p><strong>${esc(L.denomination)}</strong>, ${esc(L.forme)} exploitant la marque
  <strong>${esc(site.brand)}</strong><br>
  ${esc(L.siege)}<br>
  SIREN ${esc(L.siren)}<br>
  Téléphone : <a data-cfg="phone" href="tel:${esc(site.phoneHref)}">${esc(site.phoneDisplay)}</a><br>
  E-mail : <a data-cfg="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>

  <h2>Données collectées</h2>
  <ul class="checks">
    <li><strong>Formulaire de demande de devis</strong> — nom, entreprise, e-mail, téléphone, ville, code postal, adresse du chantier, description du projet, budget envisagé, délai souhaité</li>
    <li><strong>Formulaire professionnel</strong> — raison sociale, SIRET, forme juridique, effectif, coordonnées du contact, capacités de production, habilitations, assurances, références</li>
  </ul>

  <h2>Finalités et base légale</h2>
  <p>Les données du formulaire client sont traitées pour vous mettre en relation avec des professionnels
  et vous transmettre des devis — traitement fondé sur votre <strong>consentement</strong> et sur
  l'exécution de mesures précontractuelles prises à votre demande. Les données du formulaire
  professionnel sont traitées pour évaluer votre candidature et vous adresser des affaires —
  traitement fondé sur votre consentement et sur l'<strong>intérêt légitime</strong> à constituer
  un réseau de partenaires qualifiés.</p>

  <h2>Destinataires</h2>
  <p>Vos données sont transmises aux professionnels du réseau sélectionnés pour répondre à votre
  demande. Elles ne sont ni vendues, ni louées, ni utilisées à des fins de prospection par des tiers.
  Aucun annuaire des partenaires n'est publié et le fichier des partenaires n'est pas
  commercialisé.</p>

  <h2>Sous-traitants et transferts hors Union européenne</h2>
  <p>Deux prestataires techniques interviennent, tous deux établis aux États-Unis :</p>
  <ul class="checks">
    <li><strong>GitHub, Inc.</strong> — hébergement des pages du site. Le site est statique :
        GitHub ne reçoit aucune donnée de formulaire, seulement les données techniques inhérentes à
        toute consultation d'une page (adresse IP, date et heure, page demandée).</li>
    <li><strong>FormSubmit</strong> — acheminement des formulaires vers la messagerie du responsable
        de traitement. Les informations que vous saisissez dans un formulaire transitent par ce
        service avant de nous parvenir.</li>
  </ul>
  <p>Ces transferts hors de l'Union européenne sont nécessaires à l'exécution des mesures
  précontractuelles prises à votre demande, au sens de l'article 49.1.b du règlement général sur la
  protection des données. Si vous préférez ne pas utiliser les formulaires, vous pouvez nous
  contacter directement par téléphone ou par courriel : les coordonnées figurent ci-dessus, et
  votre demande sera traitée de la même manière.</p>

  <h2>Durée de conservation</h2>
  <ul class="checks">
    <li>Demandes de devis sans suite : <strong>3 ans</strong> à compter du dernier contact</li>
    <li>Projets concrétisés : durée de la relation commerciale, puis archivage légal</li>
    <li>Candidatures professionnelles non retenues : <strong>2 ans</strong></li>
  </ul>

  <h2>Vos droits</h2>
  <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et
  de portabilité, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer,
  écrivez à <a data-cfg="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>.
  Vous pouvez également introduire une réclamation auprès de la CNIL
  (<a href="https://www.cnil.fr" rel="nofollow noopener" target="_blank">www.cnil.fr</a>).</p>

  <h2>Cookies et mesure d'audience</h2>
  <p>Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Seul un stockage local du navigateur
  est utilisé pour conserver temporairement une sauvegarde de votre formulaire en cas d'échec d'envoi ;
  il reste sur votre appareil et ne nous est jamais transmis automatiquement.</p>

  <h2>Sécurité</h2>
  <p>Les échanges avec le site sont chiffrés (HTTPS). L'accès aux demandes est restreint aux personnes
  habilitées et aux professionnels destinataires de votre projet.</p>

  <h2>Changement de responsable du traitement</h2>
  <p>L'activité de mise en relation exploitée sous la marque ${esc(site.brand)} est susceptible
  d'être transmise à une autre société. Dans cette hypothèse, les traitements décrits ici seraient
  repris par cette société, aux mêmes finalités et dans les mêmes conditions. Vous en seriez informé
  par tout moyen avant la reprise, et vous conserveriez la faculté de vous y opposer et d'obtenir
  l'effacement de vos données dans les conditions rappelées ci-dessus.</p>

  <h2>Mise à jour</h2>
  <p>La présente politique peut être modifiée pour tenir compte d'une évolution du site ou de la
  réglementation. Version en vigueur au ${esc(new Date().toISOString().slice(0, 10))}.</p>
</article></div></section>`
  });

  return { mentions, conf };
}

/* ═════════════════════════════════════════════════ PLAN DU SITE / 404 */
function plan(cities, extraPages, sectors) {
  const body = `
<section class="hero hero-in-page"><div class="wrap hero-in">
  ${T.crumbs([{ name: "Accueil", url: "index.html" }, { name: "Plan du site", url: "plan-du-site.html" }])}
  <h1>Plan du site</h1>
  <p class="lead">L'ensemble des pages publiées, regroupées par thématique.</p>
</div></section>
<section class="sec"><div class="wrap">
  <div class="grid g-3">
    <div><h2 style="font-size:1.1rem">Nos métiers</h2><ul class="link-list">
      ${services.map((s) => `<li><a href="${s.slug}.html">${esc(s.nav)}</a></li>`).join("")}
    </ul></div>
    <div><h2 style="font-size:1.1rem">Ressources</h2><ul class="link-list">
      ${extraPages.map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join("")}
    </ul></div>
    <div><h2 style="font-size:1.1rem">Le réseau</h2><ul class="link-list">
      <li><a href="devis.html">Demander un devis</a></li>
      <li><a href="partenaires.html">Devenir partenaire</a></li>
      <li><a href="service-pose.html">Service de pose</a></li>
      <li><a href="professionnels.html">Questionnaire d'adhésion</a></li>
      <li><a href="credits-photos.html">Crédits photos</a></li>
      <li><a href="mentions-legales.html">Mentions légales</a></li>
      <li><a href="confidentialite.html">Confidentialité</a></li>
    </ul></div>
  </div>
  <h2 style="margin-top:3em;font-size:1.1rem">Secteurs d'activité</h2>
  <div class="city-grid">
    ${(sectors || []).map((s) => `<a class="city-chip" href="signaletique-${s.slug}.html">${esc(s.nav)}</a>`).join("")}
  </div>

  <h2 style="margin-top:3em;font-size:1.1rem">Villes couvertes</h2>
  <div class="city-grid">
    ${cities.map((c) => `<a class="city-chip" href="enseigne-signaletique-${c.slug}.html">${esc(c.name)}<small>${esc(c.dept)}</small></a>`).join("")}
  </div>
</div></section>`;

  const notFound = T.page({
    file: "404.html", noindex: true,
    title: `Page introuvable | ${site.brand}`,
    desc: "Cette page n'existe pas ou a été déplacée.",
    cities,
    body: `<section class="hero hero-in-page"><div class="wrap hero-in">
      <span class="eyebrow">Erreur 404</span>
      <h1>Cette page n'existe pas</h1>
      <p class="lead">Le lien est peut-être erroné ou la page a été déplacée.
      Voici par où reprendre.</p>
      <div class="btns">
        <a class="btn btn-primary btn-lg" href="index.html">Retour à l'accueil</a>
        <a class="btn btn-ghost btn-lg" href="plan-du-site.html">Plan du site</a>
      </div>
    </div></section>`
  });

  return {
    plan: T.page({
      file: "plan-du-site.html",
      title: `Plan du site | ${site.brand}`,
      desc: "Toutes les pages du site : métiers, villes couvertes, ressources et informations légales.",
      body, cities
    }),
    notFound
  };
}

/* ═════════════════════════════════════════════ CONDITIONS DE VENTE
   Rédigées pour un abonnement vendu entre professionnels. Deux partis pris
   assumés, parce qu'ils protègent autant l'acheteur que le vendeur :

   · l'engagement est présenté comme une OBLIGATION DE MOYENS. Aucun réseau
     ne peut garantir un volume de demandes — l'écrire noir sur blanc évite
     le litige que produit inévitablement la promesse inverse ;
   · les pénalités de retard entre professionnels sont mentionnées, parce
     que le code de commerce l'impose et que leur absence prive le vendeur
     de tout recours simple.

   Ce texte est un socle sérieux, pas un document validé par un avocat. Il
   est explicitement signalé comme tel en tête de page : faire relire des
   CGV avant d'encaisser le premier euro coûte quelques centaines d'euros et
   évite d'en perdre plusieurs milliers. */
function cgv(cities) {
  const A = site.address;
  const L = site.legal;
  return T.page({
    file: "conditions-generales.html",
    title: `Conditions générales de vente | ${site.brand}`,
    desc: "Conditions générales de vente de l'abonnement partenaire : objet, durée, prix, paiement, obligations réciproques et résiliation.",
    cities,
    body: `
<section class="hero hero-in-page"><div class="wrap hero-in">
  ${T.crumbs([{ name: "Accueil", url: "index.html" }, { name: "Conditions générales de vente", url: "conditions-generales.html" }])}
  <h1>Conditions générales de vente</h1>
  <p class="lead">Abonnement partenaire — contrat conclu entre professionnels.</p>
</div></section>

<section class="sec"><div class="wrap wrap-narrow"><article class="prose">

  <div class="note"><p><strong>Document à faire valider avant le premier encaissement.</strong>
  Ce texte couvre les clauses attendues d'un abonnement vendu entre professionnels, mais il n'a pas
  été relu par un avocat. Une relecture par un conseil ou par un expert-comptable, avant la première
  facture, reste vivement recommandée. Seul le montant du capital social, entre crochets à
  l'article 1, demeure à compléter.</p></div>

  <h2>1. Identification du prestataire</h2>
  <p>${esc(L.denomination)}, exploitant la marque ${esc(site.brand)}, ${esc(L.forme)} au capital de
  ${esc(L.capital)} euros, dont le siège est situé ${esc(L.siege)}, immatriculée au registre du
  commerce et des sociétés sous le numéro ${esc(L.rcs)}, SIRET ${esc(L.siret)}, numéro de TVA
  intracommunautaire ${esc(L.tva)}, représentée par son gérant ${esc(L.dirigeant)}.</p>
  <p>Téléphone : ${esc(site.phoneDisplay)} — Courriel : ${esc(site.emailPro)}</p>
  <p>Ci-après « le prestataire ». Le site ${esc(site.domain.replace(/^https?:\/\//, ""))} et la
  marque ${esc(site.brand)} sont exploités par ${esc(L.denomination)}.</p>

  <h2>2. Objet et champ d'application</h2>
  <p>Les présentes conditions régissent la souscription, par une entreprise professionnelle
  ci-après « le Partenaire », d'un abonnement au réseau de mise en relation exploité par
  ${esc(site.brandLegal)}. Elles constituent, conformément à l'article L.441-1 du code de commerce,
  le socle unique de la négociation commerciale et sont communiquées à tout professionnel qui en
  fait la demande.</p>
  <p>Toute souscription emporte acceptation sans réserve des présentes. Elles prévalent sur les
  conditions d'achat du Partenaire, sauf accord écrit contraire.</p>
  <p><strong>Ce que les présentes ne régissent pas.</strong> Elles ne s'appliquent ni au contrat
  conclu entre le Partenaire et son client, qui relève des conditions propres au Partenaire, ni à la
  mise en relation elle-même, qui est gratuite pour le client, ni aux fiches techniques publiées
  dans la rubrique <a href="formation.html">formation</a>, qui sont une documentation mise à
  disposition gratuitement et ne font l'objet d'aucune vente.</p>

  <h2>3. Nature de la prestation</h2>
  <p>Le prestataire qualifie les demandes émanant de clients finals et les transmet aux partenaires
  dont les capacités déclarées, la zone d'intervention et les habilitations correspondent au projet.
  Il n'intervient ni dans la négociation, ni dans le contrat, ni dans l'exécution des travaux, qui
  relèvent exclusivement du Partenaire et de son client.</p>
  <p><strong>Le prestataire est tenu d'une obligation de moyens et non de résultat.</strong> Le
  nombre, la nature et le montant des demandes transmises dépendent de l'activité réelle du marché
  sur la zone souscrite : ils ne peuvent faire l'objet d'aucune garantie, et aucun volume minimal
  n'est promis. Cette réalité est la raison pour laquelle une formule d'essai gratuite est proposée
  préalablement à tout engagement payant.</p>

  <h2>3 bis. Indépendance des parties — absence de mandat</h2>
  <p>Les parties sont et demeurent des entreprises juridiquement et économiquement indépendantes.
  Les présentes ne créent entre elles ni société, ni groupement, ni franchise, ni contrat de travail,
  ni lien de subordination.</p>
  <p><strong>Le prestataire n'est pas l'agent commercial du Partenaire.</strong> Il ne dispose
  d'aucun pouvoir de négocier, d'aménager ou de conclure un contrat au nom et pour le compte du
  Partenaire, ne reçoit de lui aucun mandat à cet effet, et ne perçoit aucune rémunération assise
  sur les affaires conclues. Son intervention se limite à la présentation d'un client, à charge
  pour le Partenaire de négocier et de conclure seul.</p>
  <p>Réciproquement, le Partenaire ne représente pas le prestataire, ne prend aucun engagement en
  son nom et ne peut se prévaloir du réseau autrement que comme partenaire référencé.</p>
  <p>Aucune exclusivité n'est consentie de part et d'autre : le prestataire demeure libre de
  référencer d'autres professionnels, y compris sur la même zone et le même métier dans les limites
  de densité annoncées, et le Partenaire demeure libre de prospecter par tout autre moyen.</p>

  <h2>4. Conditions d'adhésion</h2>
  <p>L'adhésion est subordonnée à la vérification du dossier : SIRET actif, assurance de
  responsabilité civile professionnelle et, le cas échéant, assurance décennale en cours de
  validité, habilitations déclarées, cohérence des capacités de production annoncées. Le prestataire
  se réserve le droit de refuser une adhésion sans avoir à motiver sa décision, notamment lorsque la
  densité de partenaires sur une zone et un métier donnés est déjà atteinte.</p>

  <h2>5. Formules, durée et prise d'effet</h2>
  <p>Les formules, leurs périmètres et leurs tarifs figurent sur la page
  <a href="partenaires.html">partenaires</a>. L'abonnement est souscrit pour une durée ferme de douze mois. Il prend effet à l'ouverture de l'accès, notifiée par
  courriel, et non à la date de règlement.</p>
  <p><strong>L'abonnement ne fait l'objet d'aucune reconduction tacite.</strong> Il prend fin de
  plein droit à son terme, sans formalité ni préavis. Le prestataire recontacte le Partenaire avant
  l'échéance ; la poursuite de la relation suppose une nouvelle souscription expresse.</p>
  <p><strong>Tarif de lancement et renouvellement.</strong> Le tarif de lancement s'applique à la
  première année d'adhésion, et à elle seule. Le prix convenu à la souscription est ferme pour
  toute la durée des douze mois souscrits : aucune revalorisation intervenue en cours de période
  n'est opposable au Partenaire. Toute nouvelle souscription postérieure au terme est conclue au
  tarif du réseau en vigueur à cette date, communiqué au Partenaire avant l'échéance en même temps
  que le relevé des demandes qui lui ont été transmises.</p>

  <h2>5 bis. Garantie de montée en charge</h2>
  <p>Le référencement d'un site nouveau met plusieurs mois à produire son plein effet, ce dont le
  prestataire informe le Partenaire avant toute souscription. En conséquence, si aucune demande n'a
  été transmise au Partenaire dans les trois mois suivant l'ouverture de son accès, celui-ci est
  prolongé de six mois sans frais supplémentaires. Cette prolongation est constatée par le
  prestataire sur le relevé des demandes transmises, sans réclamation à formuler par le Partenaire.
  Elle suppose que les capacités déclarées et la zone d'intervention aient été renseignées et
  tenues à jour.</p>

  <h2>6. Prix, taxes et facturation</h2>
  <p>Les prix sont indiqués en euros toutes taxes comprises, TVA française au taux en vigueur
  incluse. Une facture conforme est adressée au Partenaire pour chaque règlement ; le reçu émis par
  le prestataire de paiement ne constitue pas une facture.</p>
  <p>Aucune commission n'est prélevée sur les affaires signées par le Partenaire, qu'elles
  proviennent d'une demande transmise par le réseau ou d'un échange avec un autre partenaire. La
  rémunération du prestataire est exclusivement constituée de l'abonnement.</p>
  <p>Le tarif convenu à la souscription est celui applicable pour toute la période souscrite. Une
  évolution tarifaire ne peut concerner qu'une souscription ultérieure, que le Partenaire reste
  libre de refuser.</p>

  <h2>7. Modalités de paiement</h2>
  <p>Le règlement s'effectue par carte bancaire, au moyen d'un lien de paiement sécurisé, ou par
  virement. Le paiement est exigible à la souscription, en une fois pour la période retenue. Aucun
  mandat de prélèvement n'est mis en place.</p>
  <p>Conformément aux articles L.441-10 et D.441-5 du code de commerce, tout retard de paiement
  entraîne de plein droit, sans mise en demeure préalable, l'application de pénalités calculées au
  taux d'intérêt appliqué par la Banque centrale européenne à son opération de refinancement la plus
  récente, majoré de dix points de pourcentage, ainsi qu'une indemnité forfaitaire pour frais de
  recouvrement de quarante euros. Lorsque les frais de recouvrement exposés sont supérieurs à ce
  montant forfaitaire, une indemnisation complémentaire peut être réclamée sur justificatifs.</p>

  <h2>8. Droit de rétractation</h2>
  <p>Le contrat étant conclu entre professionnels et l'objet de l'abonnement — la recherche de
  clients pour l'activité exercée — entrant dans le champ de l'activité principale du Partenaire,
  le droit de rétractation prévu au code de la consommation n'est pas applicable. Il est rappelé qu'une garantie de montée en charge est prévue à l'article 5 bis.</p>

  <h2>9. Obligations du Partenaire</h2>
  <ul class="checks">
    <li>Maintenir en vigueur pendant toute la durée de l'abonnement les assurances et habilitations
        déclarées, et signaler sans délai toute modification.</li>
    <li>Traiter les demandes transmises avec diligence, et informer le prestataire lorsqu'il ne
        souhaite pas ou ne peut pas y donner suite.</li>
    <li>Tenir à jour ses capacités réelles, sa zone d'intervention et ses disponibilités.</li>
    <li>N'utiliser le label et les éléments d'identité du réseau que pendant la durée de
        l'abonnement, et cesser tout usage à son terme.</li>
    <li>Traiter en direct et sous sa seule responsabilité la relation contractuelle avec le client
        qui lui est présenté.</li>
  </ul>

  <h2>10. Obligations du prestataire</h2>
  <ul class="checks">
    <li>Qualifier les demandes avant transmission et ne les adresser qu'à un nombre restreint de
        partenaires, tel qu'indiqué sur la page partenaires.</li>
    <li>Ne pas publier d'annuaire des partenaires et ne communiquer les coordonnées du Partenaire
        qu'au client concerné par un projet précis.</li>
    <li>Ne pas saturer une zone au-delà de la densité annoncée pour un même métier.</li>
    <li>Restituer, avant l'échéance, le relevé des demandes transmises au Partenaire.</li>
    <li>Maintenir une assurance de responsabilité civile professionnelle couvrant son activité de
        mise en relation, et en justifier sur demande écrite du Partenaire.</li>
  </ul>

  <h2>11. Sous-traitance entre partenaires</h2>
  <p>Le réseau permet à un Partenaire de faire appel à un autre Partenaire pour exécuter tout ou
  partie d'un chantier, notamment la pose hors de sa zone d'intervention. Le prestataire présente
  l'un à l'autre et transmet les attestations déclarées ; il ne fait rien de plus.</p>
  <p><strong>Le prestataire n'est jamais partie au contrat de sous-traitance ainsi conclu.</strong>
  Celui-ci lie exclusivement les deux Partenaires, qui en fixent seuls le prix, le périmètre, le
  calendrier et les conditions de règlement.</p>
  <p>Le Partenaire qui a contracté avec le client final a la qualité d'entrepreneur principal. Il
  lui appartient, à ce titre et sous sa seule responsabilité, de satisfaire aux obligations de la
  loi n°75-1334 du 31 décembre 1975 relative à la sous-traitance — notamment, pour les marchés de
  travaux privés, de fournir à son sous-traitant, avant la conclusion du contrat ou le commencement
  des travaux, <strong>une caution personnelle et solidaire d'un établissement agréé ou une
  délégation de paiement du maître de l'ouvrage, à peine de nullité du contrat de
  sous-traitance</strong> (article 14 de ladite loi).</p>
  <p>Le Partenaire sous-traitant maintient en vigueur ses assurances et habilitations et en remet
  les attestations avant toute intervention.</p>
  <p>Le prestataire ne garantit ni l'exécution des travaux, ni les délais, ni la qualité des
  ouvrages, ni le règlement du sous-traitant par l'entrepreneur principal. Tout différend né d'une
  sous-traitance se règle entre les Partenaires concernés. Le prestataire peut toutefois retirer du
  réseau le Partenaire dont les manquements se répètent, dans les conditions de l'article 15.</p>

  <h2>12. Non-sollicitation de la clientèle</h2>
  <p>Le Partenaire qui intervient comme sous-traitant, ou à qui un client est présenté par un autre
  Partenaire, <strong>s'interdit de démarcher ce client, directement ou par personne interposée,
  pendant l'exécution de la mission et pendant vingt-quatre mois à compter de son achèvement</strong>.
  L'interdiction s'étend aux sociétés que ce client contrôle ou qui le contrôlent, et couvre toute
  prestation relevant du champ du présent contrat.</p>
  <p>Elle ne s'applique pas lorsque le client était déjà le sien avant l'intervention, ce qu'il lui
  appartient d'établir par un écrit antérieur, ni lorsque le Partenaire qui l'a présenté y renonce
  par écrit.</p>
  <p>La présente stipulation constitue une clause pénale au sens de l'article 1231-5 du code civil.
  Son inexécution ouvre droit, au profit du Partenaire évincé, à une indemnité forfaitaire égale au
  montant hors taxes de l'affaire détournée, sans préjudice de la réparation d'un préjudice
  supérieur. Elle entraîne en outre le retrait du réseau, sans remboursement du temps
  d'abonnement restant à courir.</p>
  <p>Le prestataire n'est pas partie à cette obligation, qui lie les Partenaires entre eux ; il en
  constate le manquement et prononce le retrait du réseau.</p>

  <h2>13. Confidentialité</h2>
  <p>Chaque partie s'engage à ne pas divulguer les informations d'ordre commercial, technique ou
  tarifaire portées à sa connaissance à l'occasion du présent contrat. Le prestataire ne publie ni
  ne commercialise le fichier de ses partenaires.</p>

  <h2>14. Données personnelles</h2>
  <p>Les traitements mis en œuvre, leurs finalités, leurs durées de conservation et les modalités
  d'exercice des droits sont décrits dans la <a href="confidentialite.html">politique de
  confidentialité</a>. Les données transmises au titre d'une demande sont communiquées aux seuls
  partenaires sollicités pour ce projet.</p>

  <h2>15. Suspension et résiliation</h2>
  <p>Le prestataire peut suspendre l'accès, après mise en demeure restée sans effet pendant quinze
  jours, en cas de manquement grave du Partenaire, notamment la caducité d'une assurance
  obligatoire, une déclaration de capacités manifestement inexacte ou des manquements répétés envers
  les clients présentés. Le Partenaire peut résilier à tout moment ; l'abonnement étant souscrit pour
  une durée ferme, la résiliation anticipée n'ouvre pas droit à remboursement, sauf manquement
  imputable au prestataire.</p>

  <h2>16. Responsabilité</h2>
  <p>Le prestataire n'est pas partie au contrat conclu entre le Partenaire et son client. Il ne
  peut être tenu responsable de l'exécution des travaux, des délais, de la qualité des ouvrages, des
  sinistres, ni du défaut de paiement du client. Sa responsabilité, toutes causes confondues, ne
  peut excéder le montant de l'abonnement effectivement réglé au titre de la période en cours.</p>

  <h2>17. Force majeure</h2>
  <p>Aucune partie ne peut être tenue responsable d'un manquement résultant d'un événement de force
  majeure au sens de l'article 1218 du code civil.</p>

  <h2>18. Cession du contrat et transmission de l'activité</h2>
  <p>Le prestataire peut céder le présent contrat, ainsi que l'ensemble des droits et obligations
  qui en découlent, à toute société qu'il contrôle, qui le contrôle, ou à laquelle il transmet
  l'activité de mise en relation exploitée sous la marque ${esc(site.brand)}, y compris par voie de
  cession de fonds, d'apport partiel d'actif, de fusion ou de scission.</p>
  <p>Conformément à l'article 1216 du code civil, <strong>le Partenaire donne dès à présent son
  accord à cette cession</strong>. Elle lui est notifiée par écrit au moins trente jours avant sa
  prise d'effet. Les conditions, le périmètre et le tarif de l'abonnement en cours demeurent
  inchangés jusqu'à son terme, et le cédant n'est libéré qu'autant que le cessionnaire reprend
  l'intégralité des engagements souscrits envers le Partenaire.</p>
  <p>Si le Partenaire ne souhaite pas poursuivre avec le cessionnaire, il peut résilier l'abonnement
  par écrit dans les trente jours suivant la notification ; il est alors remboursé au prorata de la
  période non courue.</p>
  <p>Le Partenaire ne peut céder son abonnement, qui est conclu en considération de la personne, de
  ses capacités déclarées et de ses habilitations, sans l'accord écrit préalable du prestataire.</p>

  <h2>19. Réclamations</h2>
  <p>Toute réclamation relative à l'exécution des présentes est adressée par écrit à
  ${esc(site.emailPro)} ou au siège du prestataire. Une réponse est apportée dans un délai de
  quinze jours ouvrés à compter de la réception.</p>

  <h2>20. Modification des conditions générales</h2>
  <p>Le prestataire peut faire évoluer les présentes conditions. <strong>La version applicable à un
  abonnement est celle en vigueur au jour de sa souscription</strong>, et elle le reste pour toute
  la durée souscrite. Une version modifiée n'est opposable qu'aux souscriptions postérieures à sa
  mise en ligne. La date de version figure en fin de page.</p>

  <h2>21. Preuve</h2>
  <p>Les échanges électroniques, les formulaires transmis et les journaux de connexion conservés par
  le prestataire constituent entre les parties un mode de preuve admissible des souscriptions, des
  demandes transmises et des notifications, au sens des articles 1366 et 1368 du code civil.</p>

  <h2>22. Nullité partielle et tolérance</h2>
  <p>Si une stipulation des présentes est jugée nulle ou inapplicable, les autres conservent leur
  plein effet et les parties lui substituent une stipulation valable d'effet économique équivalent.
  Le fait pour l'une des parties de ne pas se prévaloir d'un manquement ne vaut pas renonciation à
  s'en prévaloir ultérieurement.</p>

  <h2>23. Droit applicable et différends</h2>
  <p>Les présentes sont soumises au droit français. En cas de différend, les parties s'efforcent de
  trouver une solution amiable. À défaut d'accord, le litige relève de la compétence exclusive du
  tribunal de commerce de Perpignan, y compris en cas de pluralité de défendeurs ou d'appel en
  garantie.</p>

  <p style="margin-top:2.4em;font-size:.9rem;color:var(--tx-3)">Version en vigueur au
  ${esc(new Date().toISOString().slice(0, 10))}.</p>

</article></div></section>`
  });
}

module.exports = { villes, tarifs, glossaire, reglementation, comment, faqPage, credits, legal, cgv, plan };
