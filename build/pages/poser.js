/* =========================================================================
   Page « Poser » — le sommaire des trente gestes.
   -------------------------------------------------------------------------
   Elle dit d'emblée ce que la rubrique est et ce qu'elle n'est pas : des
   fiches techniques consultables librement, PAS une action de formation
   professionnelle au sens du code du travail. Cette distinction n'est pas
   de la prudence rédactionnelle, c'est ce qui détermine si une déclaration
   d'activité et une certification Qualiopi sont exigibles.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, heroImg } = T;
const { FAMILLES, POSES } = require("../data/formations");

module.exports = function poserPage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Poser", url: "poser.html" }
  ];

  const publiees = POSES.filter((p) => p.statut === "publie");

  const familleBloc = FAMILLES.map((f) => {
    const liste = POSES.filter((p) => p.famille === f.slug);
    if (!liste.length) return "";
    return `
<section class="sec${FAMILLES.indexOf(f) % 2 ? " bg-2" : ""}" id="${f.slug}">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${liste.length} pose${liste.length > 1 ? "s" : ""}</span>
      <h2>${esc(f.nom)}</h2>
      <p class="lead">${esc(f.intro)}</p>
    </div>
    <div class="grid g-3">
      ${liste.map((p) => `<a class="card card-link pose-card${p.statut === "publie" ? " pose-dispo" : ""}"
        href="pose-${p.slug}.html">
        <div class="card-body">
          <h3>${esc(p.nav)}</h3>
          <p>${esc(p.resume.slice(0, 118))}…</p>
          <p class="pose-meta">${esc(p.niveau)} · ${esc(p.duree)}${
            p.statut === "publie" ? ' · <span class="pose-ok">fiche complète</span>'
                                  : ' · <span class="pose-att">en relecture</span>'}</p>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>`;
  }).join("");

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("signaletique", 2, "Poser : le geste métier")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Le geste métier</span>
    <h1>Poser : ${POSES.length} gestes du métier, expliqués</h1>
    <p class="lead">Vingt-cinq ans d'atelier et de chantier, mis à plat pose par pose. Du collage
    d'un adhésif sur vitrine au massif béton d'un totem, avec ce qui se vérifie et ce qui ne
    s'improvise pas.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="#adhesif">Parcourir les fiches</a>
      <a class="btn btn-ghost btn-lg" href="professionnels.html">Rejoindre le réseau</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2>Ce que vous trouverez ici, et ce que vous n'y trouverez pas</h2>
        <p>Chaque fiche décrit une pose&nbsp;: quand employer la méthode, le matériel, le déroulé
        étape par étape, les erreurs qui coûtent cher, et la sécurité. Elles s'adressent à des
        professionnels et à ceux qui le deviennent.</p>
        <p><strong>Ce que vous n'y trouverez jamais&nbsp;:</strong> un volume de massif béton, une
        profondeur d'ancrage ou une section de câble donnés au jugé. Ces valeurs dépendent du
        support, de la charge, de la zone de vent et du produit employé. Quand le chiffre engage la
        sécurité, la fiche dit <em>où</em> le lire — fiche technique du fabricant, avis technique de
        la cheville, note de calcul au vent — et non ce qu'il vaut à peu près.</p>
        <p>C'est le contraire d'un tutoriel qui rassure&nbsp;: c'est un rappel que la pose engage
        une responsabilité.</p>

        <h2>Ce ne sont pas des formations au sens légal</h2>
        <p>Ces fiches se consultent seules, sans accompagnement, sans évaluation et sans
        attestation. Elles ne constituent donc pas une action de formation professionnelle, et
        elles ne sont pas finançables par un compte personnel de formation ni par un opérateur de
        compétences. Si vous cherchez une formation certifiante à la pose, plusieurs organismes
        déclarés en proposent en présentiel&nbsp;: c'est un autre métier que le nôtre, et nous le
        disons plutôt que de l'entretenir.</p>

        <h2>Pourquoi le réseau publie cela gratuitement</h2>
        <p>Parce qu'un client qui comprend ce qu'il achète discute moins le devis, et parce qu'un
        poseur qui reconnaît son métier dans ces pages est exactement le professionnel que le
        réseau cherche à accueillir. Les deux nous vont.</p>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Où en est la rubrique</h3>
          <ul class="checks checks-sm">
            <li><strong>${POSES.length} poses</strong> répertoriées, en ${FAMILLES.length} familles</li>
            <li><strong>${publiees.length} fiches</strong> relues et publiées</li>
            <li>Les autres sont rédigées et en cours de relecture</li>
            <li>Les vidéos sont tournées au fil des chantiers</li>
          </ul>
          <p class="src">Une fiche n'est publiée qu'après relecture par un professionnel&nbsp;:
          ces contenus touchent au travail en hauteur, au scellement et à l'électricité.</p>
          <a class="btn btn-pro btn-block" href="professionnels.html">Devenir partenaire</a>
        </div>
      </aside>
    </div>
  </div>
</section>
${familleBloc}

<section class="sec bg-3">
  <div class="wrap" style="text-align:center">
    <h2>Une pose que vous ne trouvez pas&nbsp;?</h2>
    <p class="lead" style="margin:0 auto 26px;max-width:60ch">La liste s'allonge au fil des
    chantiers. Dites-nous ce que vous cherchez&nbsp;: si la demande revient, la fiche se fait.</p>
    <div class="btns" style="justify-content:center">
      <a class="btn btn-primary btn-lg" href="contact.html">Proposer une pose</a>
      <a class="btn btn-ghost btn-lg" href="glossaire.html">Le glossaire du métier</a>
    </div>
  </div>
</section>`;

  return T.page({
    file: "poser.html",
    active: "poser.html",
    title: "Poser une Enseigne : " + POSES.length + " Gestes du Métier Expliqués",
    desc: "Coller un adhésif, sceller un totem, fixer un Dibond : " + POSES.length + " poses détaillées étape par étape, avec le matériel, les erreurs et la sécurité.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Les " + POSES.length + " poses du métier de l'enseigne",
        numberOfItems: POSES.length,
        itemListElement: POSES.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.nav,
          url: site.domain.replace(/\/$/, "") + "/pose-" + p.slug + ".html"
        }))
      }
    ]
  });
};
