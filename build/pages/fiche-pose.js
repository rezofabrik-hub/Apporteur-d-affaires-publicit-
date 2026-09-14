/* =========================================================================
   Pages « Poser » — une fiche par geste métier.
   -------------------------------------------------------------------------
   Deux règles de fabrication qui ne se négocient pas :

   1. Une fiche en « brouillon » sort en noindex et hors sitemap. Ces
      contenus décrivent des travaux en hauteur, des scellements qui
      portent des charges et des raccordements électriques : ils passent
      par la relecture d'un professionnel avant d'être publiés sous la
      responsabilité du réseau. Le build ne décide pas de cela.

   2. Aucun balisage VideoObject n'est émis tant qu'aucune vidéo n'existe.
      Déclarer une vidéo absente est une fausse déclaration à Google, et
      c'est sanctionné. Le champ « video » reste vide jusqu'au tournage.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, heroImg } = T;
const { FAMILLES, POSES } = require("../data/formations");

const famille = (slug) => FAMILLES.find((f) => f.slug === slug) || FAMILLES[0];

/* Le vivier photo suit la famille de pose : une signalétique d'hôtel en
   image d'un massif béton n'aide personne, et se remarque. */
const VIVIER = {
  adhesif: "vitrophanie",
  facade: "enseigne-lumineuse",
  sol: "totem",
  panneau: "signaletique",
  vehicule: "covering",
  interieur: "signaletique-int",
  entretien: "nacelle"
};

module.exports = function fichePosePage(pose, cities) {
  const fam = famille(pose.famille);
  const file = "poser-" + pose.slug.replace(/^poser-|^coller-|^fixer-|^deposer-|^entretenir-|^scellement-|^covering-|^adhesif-/, "") + ".html";
  const nom = "pose-" + pose.slug + ".html";

  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Formation", url: "formation.html" },
    { name: fam.nom, url: "formation.html#" + fam.slug },
    { name: pose.nav, url: nom }
  ];

  const brouillon = pose.statut !== "publie";

  const avert = brouillon ? `
<div class="wrap" style="padding-top:18px">
  <div class="note warn"><p><strong>Fiche en relecture.</strong> Ce contenu est rédigé mais n'a pas
  encore été validé par un professionnel du réseau. Il n'est pas référencé et ne doit pas servir de
  référence technique en l'état.</p></div>
</div>` : "";

  const liste = (titre, tableau, cls) => (tableau && tableau.length) ? `
<div class="pose-bloc">
  <h2>${esc(titre)}</h2>
  <ul class="${cls}">${tableau.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
</div>` : "";

  const etapesBloc = `
<div class="pose-bloc">
  <h2>Le déroulé, étape par étape</h2>
  <ol class="etapes">
    ${pose.etapes.map(([t, d], i) => `<li>
      <span class="etape-n">${i + 1}</span>
      <div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>
    </li>`).join("")}
  </ol>
</div>`;

  /* L'emplacement de la vidéo est réservé mais rien n'est déclaré tant
     qu'elle n'existe pas. */
  const videoBloc = pose.video ? `
<div class="pose-video">
  <video controls preload="metadata" poster="${esc(pose.video.poster || "")}" width="1280" height="720">
    <source src="${esc(pose.video.src)}" type="video/mp4">
  </video>
</div>` : `
<div class="pose-video pose-video-vide">
  <p><strong>Vidéo en préparation.</strong> Cette pose sera filmée en atelier et sur chantier.
  Le texte ci-dessous est complet et se suffit à lui-même.</p>
</div>`;

  const secuBloc = `
<div class="pose-bloc pose-secu">
  <h2>Sécurité</h2>
  <ul class="checks checks-danger">${pose.securite.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  <div class="note warn"><p><strong>Ce qu'il faut vérifier, et qu'aucun tutoriel ne remplace.</strong>
  ${esc(pose.verifier)}</p></div>
</div>`;

  /* Deux retours demandés au lecteur, et un seul clic chacun.

     Le premier ne demande PAS si la fiche est bonne mais si la pose
     intéresse en vidéo : c'est la question à laquelle il faudra répondre
     pour décider quelles poses filmer, et elle n'expose aucun jugement
     négatif sur du contenu de sécurité. Le compteur reste privé — un
     « 2 personnes intéressées » affiché sur un site jeune est une
     contre-preuve, pas une preuve sociale.

     Le second vaut plus que tout le reste : un poseur de trente ans de
     métier qui corrige une fiche est exactement le professionnel que le
     réseau cherche, et il vient de se signaler tout seul. */
  const retourBloc = `
<div class="pose-bloc pose-retour">
  <div class="retour-video">
    <h2>Vous aimeriez voir cette pose en vidéo&nbsp;?</h2>
    <p>Les trente poses ne seront pas toutes filmées d'un coup. Un clic ici nous dit par
    lesquelles commencer.</p>
    <button type="button" class="btn btn-primary js-interet" data-slug="${esc(pose.slug)}">
      Oui, ça m'intéresse
    </button>
    <p class="retour-merci" hidden role="status">Noté, merci. C'est compté pour cette pose.</p>
  </div>

  <details class="retour-corr">
    <summary>Un point manque, ou vous paraît faux&nbsp;?</summary>
    <p>Vous faites ce métier&nbsp;? Dites-le en une ligne, on corrige. C'est comme ça que ces
    fiches deviennent justes.</p>
    <form class="js-correction" data-slug="${esc(pose.slug)}">
      <label for="corr-${esc(pose.slug)}">Ce qui ne va pas</label>
      <textarea id="corr-${esc(pose.slug)}" name="message" rows="4" required
        placeholder="Par exemple : à l'étape 4, l'ordre n'est pas celui-là quand le support est…"></textarea>
      <label for="ctc-${esc(pose.slug)}">Votre e-mail ou téléphone <span class="retour-opt">(facultatif)</span></label>
      <input id="ctc-${esc(pose.slug)}" name="contact" type="text" autocomplete="off"
        placeholder="Pour qu'on puisse vous répondre">
      <input type="text" name="website" tabindex="-1" autocomplete="off" class="piege" aria-hidden="true">
      <button type="submit" class="btn btn-ghost">Envoyer la correction</button>
      <p class="retour-merci" hidden role="status">Reçu, merci. C'est relu à la main.</p>
    </form>
  </details>
</div>`;

  const autres = POSES.filter((p) => p.famille === pose.famille && p.slug !== pose.slug).slice(0, 5);
  const autresBloc = autres.length ? `
<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(fam.nom)}</span>
      <h2>Les autres poses de la même famille</h2>
    </div>
    <div class="grid g-3">
      ${autres.map((p) => `<a class="card card-link" href="pose-${p.slug}.html">
        <div class="card-body">
          <h3>${esc(p.nav)}</h3>
          <p>${esc(p.resume.slice(0, 110))}…</p>
          <p class="pose-meta">${esc(p.niveau)} · ${esc(p.duree)}</p>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>` : "";

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(VIVIER[pose.famille] || "pose", 3, pose.nav)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(fam.nom)}</span>
    <h1>${esc(pose.h1)}</h1>
    <p class="lead">${esc(pose.resume)}</p>
    <div class="pose-tags">
      <span class="tag tag-plein">${esc(pose.niveau)}</span>
      <span class="tag">${esc(pose.duree)}</span>
      <span class="tag">${pose.acces === "reseau" ? "Réservé aux partenaires" : "Accès libre"}</span>
    </div>
  </div>
</section>
${avert}

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        ${videoBloc}
        <div class="pose-bloc">
          <h2>Quand employer cette méthode</h2>
          <p>${esc(pose.quand)}</p>
        </div>
        ${liste("Le matériel", pose.materiel, "checks")}
        ${etapesBloc}
        ${liste("Les erreurs qui coûtent cher", pose.erreurs, "checks checks-warn")}
        ${secuBloc}
        <div class="pose-bloc">
          <h2>Questions fréquentes</h2>
          ${T.faqBlock(pose.faq)}
        </div>
        ${retourBloc}
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Vous préférez confier la pose&nbsp;?</h3>
          <p>Le réseau sollicite un professionnel équipé et assuré près de chez vous. Devis sous
          48 h, gratuit et sans engagement.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Demander un devis</a>
        </div>
        <div class="aside-card" style="margin-top:16px">
          <h3>Vous êtes poseur&nbsp;?</h3>
          <p>Ces fiches sont écrites pour vous. Le réseau apporte des chantiers là où vous
          intervenez déjà, sans commission sur vos affaires.</p>
          <a class="btn btn-pro btn-block" href="professionnels.html">Rejoindre le réseau</a>
        </div>
      </aside>
    </div>
  </div>
</section>
${autresBloc}`;

  const schema = [
    T.crumbSchema(crumbItems),
    T.faqSchema(pose.faq),
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: pose.h1,
      description: pose.resume,
      totalTime: pose.duree,
      tool: pose.materiel.map((x) => ({ "@type": "HowToTool", name: x.split(" (")[0] })),
      step: pose.etapes.map(([t, d], i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: t,
        text: d
      }))
    }
  ];
  /* VideoObject seulement si la vidéo existe réellement. */
  if (pose.video) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: pose.h1,
      description: pose.resume,
      contentUrl: site.domain.replace(/\/$/, "") + "/" + pose.video.src,
      thumbnailUrl: site.domain.replace(/\/$/, "") + "/" + pose.video.poster,
      uploadDate: pose.video.date
    });
  }

  return T.page({
    file: nom,
    active: "formation.html",
    title: pose.title + " | " + site.brand,
    desc: pose.desc,
    body, cities, schema,
    noindex: brouillon
  });
};

module.exports.fichier = (pose) => "pose-" + pose.slug + ".html";
