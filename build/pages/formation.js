/* =========================================================================
   Page « Formation » — le sommaire des trente gestes.
   -------------------------------------------------------------------------
   ATTENTION AU NOM DE LA RUBRIQUE.

   Elle s'appelle « Formation » par choix commercial, et le mot crée chez
   un artisan une attente précise : une attestation, et un financement par
   son opérateur de compétences ou son compte personnel de formation. Or
   rien de cela n'existe ici tant qu'il n'y a ni parcours pédagogique, ni
   évaluation, ni déclaration d'activité.

   C'est pourquoi la page dit noir sur blanc, et haut dans le document, ce
   qu'elle est et ce qu'elle n'est pas. Ce n'est pas de la prudence
   rédactionnelle : c'est ce qui évite qu'un acheteur se estime trompé, et
   c'est ce qui distingue un contenu librement consultable d'une action de
   formation professionnelle au sens du code du travail.

   Le jour où une offre payante sera lancée, cette page devra être relue
   intégralement : la vente d'un contenu numérique ouvre un droit de
   rétractation de quatorze jours, auquel on ne peut renoncer que par
   accord exprès ET reconnaissance expresse de la perte de ce droit
   (art. L221-28 du code de la consommation).
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, heroImg } = T;
const { FAMILLES, POSES } = require("../data/formations");

module.exports = function formationPage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Formation", url: "formation.html" }
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
    <span class="eyebrow">Formation à la pose</span>
    <h1>${POSES.length} gestes du métier de la pose, expliqués</h1>
    <p class="lead">Vingt-cinq ans d'atelier et de chantier, mis à plat pose par pose. Du collage
    d'un adhésif sur vitrine au massif béton d'un totem, avec ce qui se vérifie et ce qui ne
    s'improvise pas.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="#adhesif">Parcourir les fiches</a>
      <a class="btn btn-ghost btn-lg" href="#ce-que-c-est">Ce que c'est exactement</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose" id="ce-que-c-est">
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

        <h2 id="cadre">Ni attestation, ni financement&nbsp;: disons-le tout de suite</h2>
        <p>Cette rubrique s'appelle «&nbsp;Formation&nbsp;» parce que c'est de cela qu'il s'agit au
        sens courant du mot&nbsp;: apprendre un geste. Mais le mot a un sens juridique précis en
        France, et nous préférons lever l'ambiguïté avant que vous ne perdiez votre temps.</p>
        <p>Ces fiches se consultent seules, sans accompagnement, sans évaluation et sans
        attestation. Elles ne constituent donc <strong>pas une action de formation professionnelle</strong>
        au sens du code du travail, et par conséquent&nbsp;:</p>
        <ul class="checks checks-warn">
          <li>elles ne donnent lieu à <strong>aucune attestation</strong> ni certification&nbsp;;</li>
          <li>elles ne sont <strong>pas finançables</strong> par un compte personnel de formation,
          par un opérateur de compétences ni par aucun fonds public&nbsp;;</li>
          <li>le réseau n'est pas un organisme de formation déclaré, et n'en revendique pas le
          statut.</li>
        </ul>
        <p>Si c'est une formation certifiante et finançable que vous cherchez, plusieurs organismes
        déclarés en proposent en présentiel, certains spécialisés dans l'adhésif et le covering.
        C'est un autre métier que le nôtre&nbsp;: nous le disons plutôt que de l'entretenir.</p>

        <h2>Pourquoi c'est gratuit, et ce qui viendra ensuite</h2>
        <p>Gratuit parce qu'un client qui comprend ce qu'il achète discute moins le devis, et
        parce qu'un poseur qui reconnaît son métier dans ces pages est exactement le professionnel
        que le réseau cherche à accueillir. Les deux nous vont.</p>
        <p>Une offre complète est à l'étude&nbsp;: les trente poses filmées en atelier et sur
        chantier, accessibles ensemble. <strong>Elle n'est pas encore en vente</strong>, et nous
        n'ouvrirons pas de préinscription tant que les vidéos ne seront pas tournées. Les fiches
        écrites, elles, resteront consultables librement.</p>
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
          <div class="note"><p><strong>Rien n'est en vente.</strong> Les fiches écrites sont et
          resteront d'accès libre. Une offre vidéo viendra plus tard, séparément de l'abonnement
          partenaire.</p></div>
          <a class="btn btn-ghost btn-block" href="#cadre">Le cadre juridique</a>
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
    file: "formation.html",
    active: "formation.html",
    title: "Formation à la Pose d'Enseigne — " + POSES.length + " Gestes Expliqués",
    desc: "Coller un adhésif, sceller un totem, fixer un Dibond : " + POSES.length + " poses détaillées étape par étape, avec le matériel, les erreurs et la sécurité. Accès libre.",
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
