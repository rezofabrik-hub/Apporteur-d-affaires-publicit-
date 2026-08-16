const fs = require("fs");
const path = require("path");
const T = require("../lib/tpl");
const { site, services, esc, attr, img, heroImg } = T;

/* ════════════════════════════════════════════════════════════ VILLES */
function villes(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Villes couvertes", url: "villes.html" }];
  const byRegion = {};
  cities.forEach((c) => { (byRegion[c.region] = byRegion[c.region] || []).push(c); });

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("hero", 4, "Rues commerçantes en France")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Couverture nationale</span>
    <h1>Enseigne et signalétique dans toute la France</h1>
    <p class="lead">Le réseau s'appuie sur des ateliers, des imprimeurs et des poseurs locaux.
    Trouvez votre ville ci-dessous, ou décrivez directement votre projet : nous sollicitons
    des professionnels de proximité même dans les communes non listées.</p>
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
      <h2 style="font-size:1.2rem">${esc(r)}</h2>
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
      <p class="lead">Les pages ci-dessus correspondent aux villes où le réseau est déjà solidement
      implanté. Pour toute autre commune, nous sollicitons directement des professionnels du département
      concerné : le délai de réponse reste de 48 heures.</p>
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

        ${tables}

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

function glossaire(cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Glossaire", url: "glossaire.html" }];
  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("lettres-decoupees", 1, "Lettres découpées en façade")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Référence</span>
    <h1>Glossaire de l'enseigne, de la signalétique et de l'impression</h1>
    <p class="lead">Le vocabulaire du secteur est un obstacle réel : difficile de comparer deux devis
    quand on ne sait pas ce que recouvre « adhésif coulé », « rétro-éclairage » ou « TLPE ».
    Voici les ${GLOSSARY.length} termes qui reviennent le plus souvent, expliqués simplement.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow">
    <div class="acc">
      ${GLOSSARY.map(([t, d]) => `<details>
        <summary>${esc(t)}</summary>
        <div class="acc-body"><p>${esc(d)}</p></div>
      </details>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "glossaire.html", active: "glossaire.html",
    title: `Glossaire Enseigne, Signalétique & Impression — ${GLOSSARY.length} termes | ${site.brand}`,
    desc: "Adhésif coulé, rétro-éclairage, TLPE, RLP, PMR, microperforé, thermolaquage : tout le vocabulaire de la communication visuelle expliqué simplement.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), {
      "@context": "https://schema.org", "@type": "DefinedTermSet",
      name: "Glossaire de la communication visuelle",
      hasDefinedTerm: GLOSSARY.map(([t, d]) => ({ "@type": "DefinedTerm", name: t, description: d }))
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
        <strong>abonnement fixe</strong> de six ou douze mois. Ils l'acceptent parce qu'il leur coûte
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
      { q: "Le service est-il vraiment gratuit ?", a: "Oui, totalement et sans contrepartie cachée. Vous ne payez ni la mise en relation, ni les devis, et aucune commission n'est ajoutée au prix de l'entreprise retenue. Notre rémunération provient des professionnels du réseau, sous forme d'un abonnement fixe de six ou douze mois — indépendant du montant de votre chantier." },
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
  <div class="note"><p><strong>Trois champs restent à compléter</strong> — SIRET, capital social et
  numéro de TVA intracommunautaire — signalés entre crochets ci-dessous. Ces mentions sont
  obligatoires (article 6 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans
  l'économie numérique).</p></div>

  <h2>Éditeur du site</h2>
  <p><strong>${esc(site.brandLegal)}</strong>, exploitant la marque <strong>${esc(site.brand)}</strong><br>
  Société à responsabilité limitée au capital de [montant] €<br>
  Siège social : ${esc(site.address.street)}, ${esc(site.address.cp)} ${esc(site.address.city)}<br>
  SIRET : [numéro] — RCS Perpignan [numéro]<br>
  TVA intracommunautaire : [numéro]<br>
  Téléphone : <a data-cfg="phone" href="tel:${esc(site.phoneHref)}">${esc(site.phoneDisplay)}</a><br>
  E-mail : <a data-cfg="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a><br>
  Directeur de la publication : le gérant de ${esc(site.brandLegal)}</p>

  <h2>Hébergement</h2>
  <p>GitHub, Inc. — GitHub Pages<br>
  88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis<br>
  <a href="https://github.com" rel="nofollow noopener" target="_blank">github.com</a></p>

  <h2>Activité</h2>
  <p>${esc(site.brandLegal)} exerce une activité d'apport d'affaires et de mise en relation entre des
  clients ayant un projet de communication visuelle et des professionnels indépendants
  (enseignistes, imprimeurs, poseurs, graphistes, fournisseurs d'objets publicitaires).
  ${esc(site.brandLegal)} n'assure ni la fabrication, ni la pose, ni la vente des prestations présentées :
  les contrats sont conclus directement entre le client et le professionnel retenu.</p>

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
  <p><strong>${esc(site.brandLegal)}</strong>, exploitant la marque <strong>${esc(site.brand)}</strong><br>
  ${esc(site.address.street)}, ${esc(site.address.cp)} ${esc(site.address.city)}<br>
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
  <p>Vos données sont transmises aux professionnels du réseau sélectionnés pour répondre à votre demande,
  ainsi qu'aux prestataires techniques assurant l'hébergement et l'acheminement des formulaires.
  Elles ne sont ni vendues, ni cédées, ni utilisées à des fins de prospection par des tiers.</p>

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

module.exports = { villes, tarifs, glossaire, reglementation, comment, faqPage, credits, legal, plan };
