const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;

const FAQ = [
  { q: "Faut-il passer par un marché public pour une commande de signalétique ?", a: "Cela dépend du montant. En dessous du seuil de dispense de procédure, une simple demande de devis suffit, à condition de veiller à la bonne utilisation des deniers publics et à ne pas contracter systématiquement avec le même opérateur. Au-delà, une procédure adaptée s'impose, puis une procédure formalisée pour les montants les plus élevés. Nous adaptons la consultation à votre cadre : nous pouvons fournir de simples devis comparatifs, ou un dossier complet avec mémoire technique." },
  { q: "Vos partenaires savent-ils répondre à un marché public ?", a: "Une partie d'entre eux y répond régulièrement et dispose des pièces attendues : mémoire technique, références de marchés comparables, attestations de régularité fiscale et sociale, assurances, capacités financières. Nous orientons votre consultation vers ceux-là. Les autres restent mobilisables en dessous des seuils, ou en sous-traitance déclarée." },
  { q: "Peut-on couvrir plusieurs bâtiments avec une seule consultation ?", a: "Oui, et c'est le montage le plus efficace pour une collectivité : un accord-cadre à bons de commande avec un bordereau de prix unitaires, exécuté au fil des besoins pendant toute sa durée. Vous consultez une fois, vous commandez ensuite bâtiment par bâtiment, au prix négocié, sans relancer de procédure." },
  { q: "Comment garantir la conformité accessibilité ?", a: "Nous imposons au cahier des charges les exigences de l'arrêté du 20 avril 2017 : contraste d'au moins 70 %, hauteurs de caractères adaptées à la distance de lecture, doublage en relief et braille des informations essentielles, pose entre 0,90 m et 1,30 m, bandes d'éveil de vigilance. Les partenaires fournissent les attestations correspondantes, opposables en commission." },
  { q: "Intervenez-vous sur les bâtiments classés ou en secteur protégé ?", a: "Oui. C'est même l'un des cas où l'accompagnement compte le plus : l'avis de l'Architecte des Bâtiments de France oriente les matériaux, les fixations et parfois les couleurs. Nous cadrons ces contraintes dès la consultation pour éviter un projet retoqué après attribution." },
  { q: "Le service est-il payant pour la collectivité ?", a: "Non. La mise en relation, la rédaction du cahier des charges et la consultation ne vous sont pas facturées, et aucune commission n'est ajoutée aux prix des entreprises retenues. Notre rémunération provient de l'abonnement des professionnels du réseau." }
];

module.exports = function collectivitesPage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Collectivités & institutions", url: "collectivites.html" }
  ];

  const besoins = [
    ["Signalétique de bâtiments publics", "Mairie, CCAS, médiathèque, école, gymnase, salle des fêtes, services techniques : identification extérieure, plan d'orientation, signalétique d'étage, de service et de porte à porte-nom interchangeable."],
    ["Jalonnement communal", "Mâts et lames directionnelles, signalisation d'information locale, jalonnement des équipements publics, relais d'information service, entrées de bourg et de hameaux."],
    ["Accessibilité PMR", "Mise en conformité de l'information : relief, braille, contraste supérieur à 70 %, hauteurs réglementaires, bandes d'éveil de vigilance, repérage des parois vitrées, boucles à induction signalées."],
    ["Sécurité et évacuation", "Plans d'évacuation et d'intervention conformes NF X 08-070, balisage photoluminescent, pictogrammes ISO 7010, consignes, registres et affichage réglementaire."],
    ["Espaces publics et patrimoine", "Panneaux de règlement de parc, tables d'orientation, pupitres d'interprétation, signalétique de sentier, de cimetière, de marché et de parking."],
    ["Événementiel municipal", "Banderoles, oriflammes, bâches de tribune, fléchage de manifestation, arches d'arrivée, stands, avec pose et dépose incluses."],
    ["Parc de véhicules communal", "Marquage des véhicules techniques, de la police municipale, des minibus et du matériel roulant, dans le respect de la charte de la collectivité."],
    ["Communication institutionnelle", "Bâches de chantier et de commercialisation, panneaux de travaux, supports de concertation publique, PLV pour les accueils et les salons."]
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("signaletique", 5, "Signalétique de bâtiment public")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Collectivités &amp; institutions</span>
    <h1>Une offre globale pour les communes, intercommunalités et établissements publics</h1>
    <p class="lead">Signalétique de bâtiments, jalonnement communal, accessibilité, sécurité,
    espaces publics et événementiel : un cahier des charges unique, des entreprises qualifiées
    de votre département, et un accompagnement de la consultation jusqu'à la réception.
    <strong>${esc(site.experienceLine)}</strong> au service de votre projet.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?secteur=${encodeURIComponent("Collectivités & ERP")}">Décrire notre besoin</a>
      <a class="btn btn-ghost btn-lg" href="#marches">Marchés publics</a>
    </div>
    <div class="pill-row">
      <span class="pill">Arrêté du 20 avril 2017</span>
      <span class="pill">NF X 08-070</span>
      <span class="pill">ISO 7010</span>
      <span class="pill">Accord-cadre à bons de commande</span>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Périmètre</span>
      <h2>Tout ce qu'une collectivité a besoin de faire fabriquer</h2>
      <p class="lead">Une commune commande de la signalétique tous les ans, mais rarement deux fois
      la même chose. Regrouper ces besoins dans une consultation unique fait baisser les prix
      unitaires et supprime les procédures répétées.</p>
    </div>
    <div class="grid g-3">
      ${besoins.map(([t, d]) => `<div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></span>
        <h3>${esc(t)}</h3><p>${esc(d)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="marches">S'adapter à votre cadre de commande</h2>
        <p>La contrainte d'une collectivité n'est pas technique, elle est procédurale. Nous calibrons
        donc la consultation sur votre situation plutôt que de vous imposer un format unique.</p>
        <div class="table-wrap"><table>
          <thead><tr><th scope="col">Votre situation</th><th scope="col">Ce que nous fournissons</th></tr></thead>
          <tbody>
            <tr><th scope="row">Besoin ponctuel, faible montant</th><td>Deux à trois devis comparatifs sur cahier des charges identique</td></tr>
            <tr><th scope="row">Procédure adaptée</th><td>Cahier des charges technique, bordereau de prix unitaires, entreprises pré-qualifiées</td></tr>
            <tr><th scope="row">Procédure formalisée</th><td>Orientation vers des entreprises disposant des pièces et références attendues</td></tr>
            <tr><th scope="row">Besoins récurrents</th><td>Trame d'accord-cadre à bons de commande, exécutable au fil de l'eau</td></tr>
            <tr><th scope="row">Plusieurs bâtiments</th><td>Plan de jalonnement global et charte signalétique reproductible</td></tr>
            <tr><th scope="row">Urgence ou sinistre</th><td>Mobilisation d'un poseur habilité du département sous 48 heures</td></tr>
          </tbody>
        </table></div>
        <div class="note"><p><strong>Nous ne sommes ni candidat, ni titulaire.</strong> Nous n'entrons
        pas dans votre marché : nous préparons la consultation et vous mettons en relation avec des
        entreprises qui, elles, candidatent et contractent directement avec vous. Aucune commission
        n'est ajoutée à leurs prix.</p></div>

        <h2 id="accessibilite">L'accessibilité, premier motif de réserve</h2>
        <p>C'est le point sur lequel les collectivités se font le plus souvent reprendre en commission,
        et il se règle au cahier des charges plutôt qu'après pose. L'<strong>arrêté du 20 avril 2017</strong>
        impose des exigences mesurables que nous inscrivons systématiquement dans la consultation.</p>
        <ul class="checks">
          <li>Contraste d'au moins <strong>70 %</strong> entre le texte et son fond, et entre le support et son environnement</li>
          <li>Hauteur de caractères adaptée à la distance de lecture : 15 mm minimum en lecture rapprochée</li>
          <li>Doublage en <strong>relief</strong> et en <strong>braille abrégé</strong> des informations essentielles</li>
          <li>Pose entre <strong>0,90 m et 1,30 m</strong> pour tout élément touché à la main</li>
          <li>Bandes d'éveil de vigilance en haut de chaque volée d'escalier</li>
          <li>Repérage visuel contrasté des parois vitrées, à hauteur de vue</li>
        </ul>

        <h2 id="patrimoine">Bâtiments classés et secteurs protégés</h2>
        <p>Aux abords d'un monument historique, en site patrimonial remarquable ou en site classé,
        l'avis de l'<strong>Architecte des Bâtiments de France</strong> conditionne les matériaux, les
        fixations et parfois les couleurs. Le cadrer dès la consultation évite un projet attribué puis
        retoqué — situation coûteuse, qui oblige à relancer une procédure.</p>

        <h2 id="repartition">Répartition du travail entre nos partenaires</h2>
        <p>Un marché de collectivité mobilise rarement un seul métier. Une même opération peut réunir
        un fabricant de totems, un graveur pour les plaques braille, un imprimeur pour les plans
        d'évacuation et un poseur habilité pour la mise en œuvre en hauteur. Nous répartissons les lots
        selon les capacités réellement déclarées par chaque partenaire — machines, habilitations,
        matériel de hauteur, zone d'intervention — et nous coordonnons le planning.</p>
        <p>Pour vous, cela signifie <strong>un seul interlocuteur</strong> et un calendrier unique.
        Pour les entreprises du territoire, cela signifie l'accès à une commande publique qu'elles
        n'auraient pas eu les moyens de suivre seules.</p>
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet à cadrer ?</h3>
          <p>Décrivez votre besoin : nous revenons vers vous avec un cahier des charges et
          des entreprises qualifiées de votre département.</p>
          <a class="btn btn-primary btn-block" href="devis.html?secteur=${encodeURIComponent("Collectivités & ERP")}">Demander une consultation</a>
          <p style="margin-top:16px;font-size:.86rem">Ou directement :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a><br>
            <a data-cfg="email" href="mailto:${esc(site.email)}" style="font-weight:600">${esc(site.email)}</a></p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Références utiles</h4>
          <ul class="link-list">
            <li><a href="signaletique.html">Le métier de la signalétique</a></li>
            <li><a href="signaletique-collectivite-erp.html">Secteur collectivités &amp; ERP</a></li>
            <li><a href="reglementation-enseigne.html">Réglementation et accessibilité</a></li>
            <li><a href="tarifs.html">Guide des prix</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Qui nous consulte</span>
      <h2>Les institutions que nous accompagnons</h2>
    </div>
    <div class="grid g-3">
      ${[["Communes et intercommunalités", "Mairies, CCAS, services techniques, offices de tourisme, écoles et équipements sportifs."],
         ["Bailleurs sociaux et syndics", "Signalétique de résidence, numérotation, plans d'évacuation, information des locataires."],
         ["Établissements de santé", "Hôpitaux, EHPAD, maisons de santé : jalonnement, accessibilité, sécurité, identification des services."],
         ["Établissements scolaires", "Écoles, collèges, lycées, CFA : signalétique intérieure, sécurité, marquage de cour et gymnase."],
         ["Départements et régions", "Jalonnement d'équipements, signalétique de sites patrimoniaux, mobilier d'information."],
         ["Établissements publics et associations", "Musées, médiathèques, centres sociaux, structures d'insertion et associations d'intérêt général."]]
        .map(([t, d]) => `<div class="tile"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Questions fréquentes</span>
      <h2>Collectivités : vos questions</h2>
    </div>
    ${T.faqBlock(FAQ)}
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "collectivites.html", active: "collectivites.html",
    title: `Signalétique pour Collectivités & Institutions — Marchés Publics | ${site.brand}`,
    desc: "Communes, intercommunalités, bailleurs, hôpitaux, écoles : signalétique, jalonnement, accessibilité PMR et sécurité. Cahier des charges, entreprises qualifiées, accord-cadre. Service gratuit.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Signalétique et communication visuelle pour collectivités",
        description: "Accompagnement des communes, intercommunalités et établissements publics : cahier des charges, consultation d'entreprises qualifiées, accessibilité et sécurité.",
        provider: { "@type": "Organization", name: site.brand, url: site.domain },
        areaServed: { "@type": "Country", name: "France" },
        audience: { "@type": "Audience", audienceType: "Collectivités territoriales et établissements publics" }
      },
      T.faqSchema(FAQ)
    ]
  });
};
