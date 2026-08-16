const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;

/* =========================================================================
   Page pilier B2B — la sous-traitance entre professionnels.

   Le site sert jusqu'ici le commerçant qui cherche une enseigne. Or une part
   considérable du marché ne vient pas de lui : elle vient d'agences, de
   franchises, d'imprimeurs et de fabricants qui ont vendu une prestation
   qu'ils ne savent pas — ou ne peuvent pas — produire eux-mêmes. Une agence
   parisienne qui a vendu un stand de salon cherche un imprimeur 3D ; un
   enseigniste qui a signé quarante points de vente cherche des poseurs dans
   douze départements.

   Ces requêtes sont commercialement bien plus lourdes que les requêtes
   grand public, et presque personne ne les travaille : les réseaux de pose
   s'adressent aux donneurs d'ordre sans le dire, et les annuaires ne
   qualifient rien. C'est le sujet de cette page.
   ========================================================================= */

/* Les six profils qui sous-traitent réellement, avec ce qu'ils cherchent.
   Écrits du point de vue du donneur d'ordre, pas du nôtre. */
const PROFILS = [
  ["Agences de communication et de publicité",
   "Vous vendez une campagne, une identité, un événement. La fabrication et la pose ne sont pas votre métier, et sous-traiter au hasard d'une recherche Google expose votre nom sur un chantier que vous ne maîtrisez pas.",
   ["Fabricants d'enseignes et de signalétique", "Imprimeurs grand format", "Poseurs habilités", "Impression 3D et PLV volumique", "Objets publicitaires et textile"]],
  ["Enseignistes et fabricants",
   "Vous produisez en atelier, mais le chantier est à quatre cents kilomètres, ou le client demande un procédé que vous n'avez pas — découpe laser fibre, impression 3D, covering.",
   ["Poseurs dans toute la France", "Découpe laser et CNC", "Impression 3D", "Thermolaquage et finitions"]],
  ["Imprimeurs et façonniers",
   "Un client vous commande une bâche de façade, un habillage de vitrine ou un stand : il faut quelqu'un pour l'installer, et souvent des pièces que vous ne produisez pas.",
   ["Poseurs et médiapplicateurs", "Structures et supports sur mesure", "Découpe numérique", "Imprimerie offset en complément"]],
  ["Franchises et réseaux multi-sites",
   "Déployer une charte sur quarante points de vente suppose des ateliers capables de produire à l'identique et des équipes de pose coordonnées sur un planning unique.",
   ["Fabrication multi-sites à charte constante", "Coordination de déploiement", "Poseurs régionaux", "Maintenance et SAV"]],
  ["Architectes, agenceurs et scénographes",
   "Un projet d'agencement mobilise des métiers que vous ne portez pas en interne : signalétique, découpe sur mesure, volumes, éclairage d'enseigne.",
   ["Signalétique intérieure et PMR", "Découpe laser et CNC", "Impression 3D et maquettes", "Enseignes et éclairage"]],
  ["Fournisseurs, distributeurs et centrales d'achat",
   "Vous livrez du matériel, le client final attend une prestation clé en main. Il vous manque le maillon terrain.",
   ["Réseau de poseurs national", "Fabrication en marque blanche", "Logistique et déploiement"]]
];

const ETAPES = [
  ["Vous décrivez le besoin, en termes de professionnel",
   "Pas de formulaire grand public : vous parlez matériaux, épaisseurs, procédés, délais et contraintes de chantier. Nous comprenons le vocabulaire, ce qui vous évite de tout réexpliquer."],
  ["Nous identifions l'atelier dont l'outil correspond",
   "C'est là que se joue la qualité de la sous-traitance. Un laser fibre ne fait pas ce que fait une fraiseuse, un imprimeur latex ne fait pas ce que fait un UV à plat. Nous sélectionnons sur les capacités déclarées et vérifiées, pas sur la disponibilité."],
  ["Vous recevez deux ou trois propositions comparables",
   "Établies sur le même cahier des charges, donc réellement comparables. Jamais plus de trois : au-delà, les ateliers sérieux se désengagent parce qu'ils chiffrent pour rien."],
  ["Vous contractez en direct, sous votre marque",
   "Nous n'apparaissons pas devant votre client. Vous achetez au sous-traitant, vous revendez à votre prix, la relation commerciale reste entièrement la vôtre."]
];

const B2B_FAQ = [
  { q: "Puis-je sous-traiter sans que mon client sache que je sous-traite ?",
    a: "Oui, c'est même le cas le plus fréquent. Nous n'intervenons jamais devant votre client : vous contractez avec l'atelier, vous facturez sous votre marque, et rien n'oblige le sous-traitant à se manifester. Si vous souhaitez qu'il intervienne sous votre nom — véhicule neutre, tenue sans logo, remise du chantier en votre nom — précisez-le dans la demande, beaucoup de nos partenaires le pratiquent couramment." },
  { q: "Vos partenaires vont-ils me prendre mon client ?",
    a: "C'est la crainte légitime de tout donneur d'ordre, et elle mérite une réponse franche. Nous ne pouvons pas contractualiser une clause de non-sollicitation à votre place : c'est à vous de la prévoir avec l'atelier que vous retenez. Ce que nous pouvons faire, et que nous faisons, c'est retirer du réseau tout partenaire qui court-circuite un donneur d'ordre — un atelier qui gagne un client une fois et perd un apporteur régulier a fait un très mauvais calcul, et nous le lui rappelons à l'adhésion." },
  { q: "Quels métiers puis-je sous-traiter ?",
    a: "Les treize métiers du réseau : enseignes, signalétique, covering de véhicules, impression grand format, imprimerie offset et numérique, objets publicitaires et textile, création graphique, pose et nacelle, vitrophanie et PLV, découpe laser et CNC, impression 3D, création de site internet et référencement naturel. Un même projet peut en mobiliser plusieurs — nous le coordonnons depuis un cahier des charges unique." },
  { q: "Travaillez-vous en marque blanche ?",
    a: "Oui. C'est le mode le plus courant en B2B : l'atelier produit, vous livrez sous votre marque. Certains partenaires acceptent également l'expédition directe au client final avec votre bon de livraison. Précisez-le dès la demande, car tous ne le pratiquent pas et cela oriente la sélection." },
  { q: "Le service est-il payant pour le donneur d'ordre ?",
    a: "Non. La mise en relation est gratuite et sans engagement, comme pour un client final : ce sont les ateliers du réseau qui financent le service par un abonnement fixe. Aucune commission n'est ajoutée au prix du sous-traitant, donc le prix que vous obtenez est son prix." },
  { q: "Quels délais sur un dossier professionnel ?",
    a: "Vous recevez les propositions sous 48 heures ouvrées, souvent moins sur un besoin de pose. Les délais de production restent ceux du métier concerné : 2 à 4 semaines pour une enseigne, 3 à 8 jours pour de la découpe sur fichier propre, 3 à 15 jours en imprimerie selon le façonnage." },
  { q: "Pouvez-vous gérer un déploiement multi-sites ?",
    a: "Oui, c'est même là que le réseau prend tout son sens. Un déploiement sur plusieurs régions suppose des ateliers capables de produire à l'identique et des poseurs coordonnés sur un planning commun. Nous vous adressons alors des partenaires de niveau Régional ou National, seuls dimensionnés pour ce type de dossier." }
];

module.exports = function b2bPage(cities) {
  const file = "sous-traitance-professionnels.html";
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Sous-traitance entre professionnels", url: file }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("equipe-pro", 5, "Professionnels de la communication en réunion de projet")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Entre professionnels</span>
    <h1>Vous avez vendu la prestation. Nous trouvons qui la produit.</h1>
    <p class="lead">Agence de communication, enseigniste, imprimeur, franchise, agenceur : vous
    signez régulièrement des projets qui mobilisent un métier que vous n'avez pas en interne, ou
    un chantier hors de votre zone. Nous identifions <strong>l'atelier dont l'outil de production
    correspond réellement</strong>, vous recevez deux ou trois devis comparables, et vous
    contractez en direct sous votre marque.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html">Décrire mon besoin</a>
      <a class="btn btn-ghost btn-lg" href="#profils">Voir les cas d'usage</a>
    </div>
    <div class="pill-row">
      <span class="pill">13 métiers</span>
      <span class="pill">Marque blanche possible</span>
      <span class="pill">Gratuit pour le donneur d'ordre</span>
      <span class="pill">Aucune commission</span>
      <span class="pill">Réponse sous 48 h</span>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec" id="profils">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">À qui cela s'adresse</span>
      <h2>Six métiers qui sous-traitent tous les jours</h2>
      <p class="lead">La sous-traitance en communication visuelle n'a rien d'un aveu de faiblesse :
      aucune structure ne possède à la fois un laser fibre, une imprimante UV grand format, une
      imprimante 3D, un atelier de covering chauffé et des poseurs dans quatre-vingt-quinze
      départements. La question n'est pas de tout faire, c'est de savoir à qui confier le reste.</p>
    </div>
    <div class="grid g-2">
      ${PROFILS.map(([t, d, besoins]) => `<div class="tile">
        <h3 style="font-size:1.08rem">${esc(t)}</h3>
        <p>${esc(d)}</p>
        <p style="margin-top:.8em;font-size:.88rem;color:var(--tx-3)"><strong style="color:var(--tx-2)">Ce que vous y trouvez :</strong>
        ${besoins.map(esc).join(" · ")}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Comment ça se passe</span>
      <h2>Quatre étapes, sans que votre client nous voie jamais</h2>
    </div>
    <div class="steps stack" style="max-width:820px">
      ${ETAPES.map(([t, d]) => `<div class="step"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
    </div>
    <div class="note" style="max-width:820px"><p>Nous sommes un intermédiaire technique, pas un
    concurrent. Nous ne vendons rien au client final, nous ne signons aucun chantier et nous
    n'apparaissons sur aucun document commercial. Notre rémunération vient uniquement de
    l'abonnement des ateliers du réseau.</p></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Les treize métiers</span>
      <h2>Ce que vous pouvez faire produire</h2>
      <p class="lead">Un même dossier en mobilise souvent plusieurs — une enseigne, le marquage des
      véhicules assorti, la vitrine et le textile de l'équipe. Nous coordonnons l'ensemble depuis
      un cahier des charges unique plutôt que de vous laisser répéter quatre fois le même brief.</p>
    </div>
    <div class="grid g-4">
      ${services.map((s) => `<a class="card card-link" href="${s.slug}.html">
        <div class="card-media">${img(s.topic, 4, s.navShort)}<span class="card-tag">${esc(s.navShort)}</span></div>
        <div class="card-body"><h3>${esc(s.nav)}</h3><p>${esc(s.navDesc)}</p></div>
      </a>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap wrap-narrow">
    <div class="sec-head">
      <span class="eyebrow">Questions des donneurs d'ordre</span>
      <h2>Ce que nous demandent les professionnels</h2>
    </div>
    ${T.faqBlock(B2B_FAQ)}
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>

<section class="sec-tight bg-2">
  <div class="wrap">${T.keywordCloud([
    "sous-traitance communication visuelle", "sous-traitant enseigne",
    "sous-traitance signalétique", "sous-traitance impression", "marque blanche enseigne",
    "fabricant enseigne pour revendeur", "fournisseur enseigne professionnels",
    "sous-traitance pose enseigne", "sous-traitance impression 3D",
    "sous-traitance découpe laser", "prestataire pour agence de communication",
    "partenaire de production agence", "fabrication en marque blanche",
    "réseau de fabricants", "déploiement multi-sites", "coordination de chantier",
    "trouver un imprimeur grand format", "trouver un poseur d'enseigne",
    "trouver un fabricant d'enseigne", "B2B communication visuelle"
  ], "Recherches associées")}</div>
</section>`;

  return T.page({
    file,
    title: "Sous-traitance Communication Visuelle — Entre Professionnels",
    desc: "Agences, enseignistes, imprimeurs, franchises : trouvez le sous-traitant dont l'outil correspond. 13 métiers, marque blanche, devis sous 48 h, sans commission.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Sous-traitance en communication visuelle entre professionnels",
        serviceType: "Mise en relation B2B",
        areaServed: { "@type": "Country", name: "France" },
        audience: { "@type": "BusinessAudience", audienceType: "Agences, enseignistes, imprimeurs, franchises, agenceurs" },
        provider: {
          "@type": "Organization", name: site.brand,
          url: site.domain.replace(/\/$/, "") + "/",
          email: site.email, telephone: site.phoneHref
        }
      },
      T.faqSchema(B2B_FAQ)
    ]
  });
};
