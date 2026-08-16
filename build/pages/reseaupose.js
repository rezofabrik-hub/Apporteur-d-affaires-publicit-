const T = require("../lib/tpl");
const { site, esc, img, heroImg } = T;
const P = require("../data/partnership");

/* =========================================================================
   Page pilier « réseau national de poseurs ».

   Elle vise les requêtes de tête sur lesquelles se positionnent les réseaux
   de pose établis — réseau national de poseurs, trouver un poseur, poseur
   publicitaire, sous-traitance de pose, devenir poseur. Ces réseaux ont vingt
   ans d'avance en nombre d'installateurs, mais leurs sites tiennent en huit à
   quarante-quatre pages et ne publient ni prix ni page locale. C'est là que
   se trouve l'ouverture, et c'est ce que cette page exploite.

   Elle sert les deux publics d'un même sujet : le donneur d'ordre qui cherche
   un poseur, et le poseur qui cherche du chantier.
   ========================================================================= */

/* Comparatif des modèles réellement pratiqués sur le marché français. Les
   fourchettes de commission viennent des usages publiés par les plateformes
   du bâtiment ; on ne cite aucun concurrent nommément — décrire un modèle
   est utile, désigner une entreprise serait polémique et daterait vite. */
const MODELES = {
  head: ["Modèle", "Ce que paie le poseur", "Ce que paie le donneur d'ordre", "Le point de vigilance"],
  rows: [
    ["Commission sur chantier", "5 à 20 % du montant HT signé",
     "Rien de visible, la commission est dans le prix",
     "Plus vous travaillez, plus vous payez : la rentabilité baisse quand l'activité monte"],
    ["Achat de contacts à l'unité", "25 à 60 € le contact, non qualifié",
     "Rien", "Le même contact est revendu à cinq ou dix entreprises : vous payez pour vous battre"],
    ["Abonnement fixe", "Un montant connu à l'avance",
     "Rien", "Le réseau doit être réellement actif dans votre zone, sinon vous payez pour rien"],
    ["Formation puis mise en relation", "Le coût de la formation, parfois plusieurs milliers d'euros",
     "Rien", "Utile si vous débutez ; sans intérêt si vous exercez déjà depuis dix ans"],
    ["Sous-traitance encadrée", "Une marge prélevée sur votre prix de journée",
     "Un prix unique tout compris",
     "Vous perdez la relation client et vous ne fixez plus votre tarif"]
  ],
  foot: "Notre modèle est le troisième : un abonnement fixe, aucune commission sur les affaires signées, et vous facturez le client en direct au prix que vous fixez."
};

const CRITERES = [
  ["Le réseau publie-t-il ses prix ?",
   "La quasi-totalité des réseaux de pose renvoie à un devis sans jamais afficher d'ordre de grandeur. Un donneur d'ordre qui prépare un budget ne peut rien en faire, et un poseur ne sait pas sur quelle grille il sera aligné. Nos fourchettes sont publiques, métier par métier."],
  ["Vérifie-t-il réellement les attestations ?",
   "CACES R486 de l'opérateur, vérification générale périodique de la machine, habilitation électrique, responsabilité civile professionnelle et décennale. En cas d'accident ou de dommage à la façade, la responsabilité du donneur d'ordre peut être recherchée si le prestataire n'était pas en règle. Exigez ces pièces avant l'intervention, pas après."],
  ["Combien d'entreprises reçoivent la même demande ?",
   "C'est la question qui décide de votre taux de transformation. Certaines plateformes diffusent à cinq ou dix prestataires : vous chiffrez gratuitement pour rien neuf fois sur dix. Nous n'adressons jamais une demande à plus de deux ou trois partenaires."],
  ["La demande est-elle qualifiée avant d'être transmise ?",
   "Un formulaire brut renvoyé tel quel oblige le poseur à débroussailler au téléphone, souvent pour découvrir que le projet n'a ni budget ni échéance. Chaque demande que nous transmettons a été qualifiée par téléphone et traduite en cahier des charges."],
  ["Qui garde le client après le chantier ?",
   "En sous-traitance encadrée, le client appartient au réseau : le service après-vente, la reprise et la fidélisation vous échappent. Chez nous, vous contractez et facturez en direct — la relation est la vôtre."],
  ["Que se passe-t-il si votre zone est calme ?",
   "Un abonnement dans une zone sans demande est une dépense pure. Nous suivons le volume transmis à chaque partenaire et élargissons son périmètre ou ses métiers sans surcoût si le flux ne vient pas."]
];

const POSEUR_FAQ = [
  { q: "Quelle différence avec un réseau de pose classique ?",
    a: "Trois différences de fond. Nous ne prenons <strong>aucune commission</strong> sur les chantiers que vous signez : vous facturez le client en direct, au prix que vous fixez. Nous ne vous imposons ni enseigne, ni fournisseur, ni tarif de journée. Et nous ne diffusons jamais une demande à plus de deux ou trois partenaires, là où les plateformes d'achat de contacts la revendent à cinq ou dix." },
  { q: "Faut-il une formation payante pour entrer dans le réseau ?",
    a: "Non. Certains réseaux passent par un centre de formation, ce qui a du sens pour quelqu'un qui débute dans le métier. Nous nous adressons à des professionnels déjà installés : ce que nous vérifions, ce sont vos habilitations en cours de validité, vos assurances et votre matériel, pas un diplôme que nous vous aurions vendu." },
  { q: "Quel volume de chantiers puis-je espérer ?",
    a: "Cela dépend entièrement de votre zone, de vos métiers déclarés et de votre équipement. Nous ne promettons pas de volume — personne de sérieux ne le peut sur un réseau en constitution. C'est précisément pourquoi les deux premiers mois sont gratuits : vous mesurez le flux réel de votre secteur avant d'engager le moindre euro." },
  { q: "Je suis poseur indépendant, sans société d'enseignes. Puis-je adhérer ?",
    a: "Oui. Un poseur indépendant bien équipé, titulaire du CACES R486 et assuré, est exactement le profil que cherchent les fabricants et les imprimeurs sans équipe sur place. La taille n'est pas un critère ; les habilitations et la disponibilité en sont." },
  { q: "Puis-je travailler pour d'autres réseaux en parallèle ?",
    a: "Oui, sans restriction. Nous ne demandons aucune exclusivité, ni sur les réseaux concurrents, ni sur vos clients directs. Un poseur qui remplit son planning par trois canaux différents est un poseur qui dure — donc un partenaire qui renouvelle." },
  { q: "Comment sont réparties les demandes entre poseurs d'une même zone ?",
    a: "Selon vos capacités déclarées avant tout : hauteur d'intervention, type de nacelle, habilitation électrique, disponibilité pour les interventions de nuit ou en site occupé. À capacités équivalentes, la proximité du chantier tranche, puis l'alternance. Nous ne saturons pas une zone : deux à quatre partenaires par métier, pas davantage." }
];

module.exports = function reseauPosePage(cities) {
  const file = "reseau-pose-national.html";
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Réseau national de pose", url: file }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("nacelle", 4, "Poseur en nacelle installant une enseigne de façade")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Réseau national de pose</span>
    <h1>Réseau national de poseurs d'enseignes, d'adhésifs et de signalétique</h1>
    <p class="lead">Vous cherchez un poseur habilité à trois cents kilomètres de votre atelier, ou
    vous êtes poseur et vous cherchez à remplir votre planning. Cette page explique comment
    fonctionnent les réseaux de pose en France, <strong>ce qu'ils coûtent réellement</strong> à
    l'un comme à l'autre, et à quoi reconnaître celui qui vous convient.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?prestation=${encodeURIComponent("Pose & nacelle")}">Trouver un poseur</a>
      <a class="btn btn-ghost btn-lg" href="#poseurs">Je suis poseur</a>
    </div>
    <div class="pill-row">
      <span class="pill">CACES R486 vérifié</span>
      <span class="pill">Décennale contrôlée</span>
      <span class="pill">Devis sous 24 h</span>
      <span class="pill">Aucune commission</span>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Comment ça marche</span>
      <h2>Ce qu'est un réseau de pose, et à quoi il sert vraiment</h2>
      <p class="lead">Un réseau de pose résout un problème simple et très répandu : une entreprise
      sait fabriquer, imprimer ou vendre, mais n'a pas d'équipe disponible là où se trouve le
      chantier. Plutôt que de refuser l'affaire ou d'envoyer deux personnes faire six cents
      kilomètres pour une demi-journée de travail, elle confie la pose à un professionnel local.</p>
    </div>

    <div class="split">
      <article class="prose">
        <h3>Qui fait appel à un réseau de pose</h3>
        <ul class="checks">
          <li><strong>Enseignistes et fabricants</strong> — vous produisez en atelier, la pose se fait à l'autre bout de la France</li>
          <li><strong>Imprimeurs grand format</strong> — bâches de façade, adhésifs de vitrine, panneaux livrés chez le client</li>
          <li><strong>Agences de communication</strong> — vous vendez la campagne, quelqu'un doit l'installer</li>
          <li><strong>Franchises et réseaux</strong> — déploiement d'une charte sur quarante points de vente, avec un planning à tenir</li>
          <li><strong>Fournisseurs et distributeurs</strong> — le client veut une prestation clé en main, pas une palette sur le trottoir</li>
          <li><strong>Bailleurs et gestionnaires d'immeubles</strong> — signalétique de bâtiment, dépose en fin de bail</li>
        </ul>

        <h3>Ce que le poseur prend réellement en charge</h3>
        <p>La pose d'une enseigne n'est pas une manutention. Elle engage la structure de la façade,
        l'étanchéité du bâtiment et la sécurité des passants. Un poseur professionnel assure
        l'implantation et le traçage, le perçage et le chevillage adaptés au support — béton,
        brique, bardage, ossature bois n'appellent pas les mêmes fixations —, le scellement
        chimique lorsque la charge l'exige, la reprise d'étanchéité, le raccordement électrique,
        puis l'évacuation des déchets en filière agréée.</p>
        <p>S'y ajoute tout ce qui ne se voit pas : la demande d'occupation du domaine public quand
        la nacelle empiète sur le trottoir, l'arrêté de circulation le cas échéant, la
        neutralisation du stationnement, et la coordination avec les services techniques de la
        commune. C'est souvent ce volet administratif, et non la pose elle-même, qui décale un
        chantier de trois semaines.</p>

        <h3>Le coût réel d'une intervention</h3>
        <p>Les réseaux de pose ne publient pratiquement jamais leurs prix. Nous le faisons, parce
        qu'un donneur d'ordre qui prépare un devis client a besoin d'un ordre de grandeur avant
        d'appeler qui que ce soit. Le détail figure sur notre
        <a href="pose-nacelle.html">page pose et nacelle</a> : de 80 à 250 € pour un lettrage
        adhésif sur vitrine, 450 à 900 € pour une demi-journée de nacelle, 800 à 1 600 € pour une
        journée complète, auxquels s'ajoute la location de la machine si le poseur n'en possède
        pas — 250 à 600 € la journée.</p>
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un chantier à faire poser ?</h3>
          <p>Décrivez-le : vous recevez un devis sous 24 heures ouvrées, avec les attestations du
          poseur retenu jointes avant l'intervention.</p>
          <a class="btn btn-primary btn-block" href="devis.html?prestation=${encodeURIComponent("Pose & nacelle")}">Demander un devis de pose</a>
          <p style="margin-top:16px;font-size:.86rem">Ou par téléphone :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">À lire aussi</h4>
          <ul class="link-list">
            <li><a href="pose-nacelle.html">Le métier de la pose</a></li>
            <li><a href="service-pose.html">Abonnement service de pose</a></li>
            <li><a href="tarifs.html">Guide des prix</a></li>
            <li><a href="reglementation-enseigne.html">Réglementation des enseignes</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2" id="modeles">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Les modèles du marché</span>
      <h2>Cinq façons de facturer un réseau de pose</h2>
      <p class="lead">Tous les réseaux ne se rémunèrent pas de la même manière, et la différence
      change complètement l'équation pour le poseur comme pour le donneur d'ordre. Voici les
      modèles réellement pratiqués en France, décrits sans détour.</p>
    </div>
    <div class="table-wrap"><table>
      <thead><tr>${MODELES.head.map((h, i) =>
        `<th scope="col"${i === 0 ? "" : ""}>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${MODELES.rows.map((r) => `<tr>${r.map((c, i) => i === 0
        ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <div class="note"><p>${esc(MODELES.foot)}</p></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Bien choisir</span>
      <h2>Six questions à poser avant de rejoindre un réseau — ou de lui confier un chantier</h2>
      <p class="lead">Les réponses à ces six questions séparent un réseau utile d'un intermédiaire
      qui prélève sa part sans rien apporter. Posez-les à tous ceux que vous consultez, nous
      compris.</p>
    </div>
    <div class="grid g-2">
      ${CRITERES.map(([q, a]) => `<div class="tile">
        <h3 style="font-size:1.05rem">${esc(q)}</h3><p>${esc(a)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2" id="poseurs">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Vous êtes poseur</span>
      <h2>Remplir son planning sans céder de commission</h2>
      <p class="lead">Vous avez une nacelle, des CACES à jour, un véhicule aménagé et des semaines
      creuses. Le réseau vous adresse les chantiers de votre zone — enseignes, adhésifs, bâches,
      signalétique, covering — sans prélever un centime sur ce que vous facturez.</p>
    </div>
    <div class="grid g-3" style="margin-bottom:30px">
      ${P.dispatch.ladder.map(([niveau, zone, texte]) => `<div class="tile">
        <span class="plan-tier">${esc(niveau)}</span>
        <h3 style="font-size:1.02rem">${esc(zone)}</h3><p>${esc(texte)}</p>
      </div>`).join("")}
    </div>
    <div class="btns">
      <a class="btn btn-pro btn-lg" href="partenaires.html">Voir les formules et tarifs</a>
      <a class="btn btn-ghost btn-lg" href="professionnels.html">Remplir le questionnaire</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow">
    <div class="sec-head">
      <span class="eyebrow">Questions des poseurs</span>
      <h2>Ce que les poseurs nous demandent</h2>
    </div>
    ${T.faqBlock(POSEUR_FAQ)}
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>

<section class="sec-tight">
  <div class="wrap">${T.keywordCloud([
    "réseau national de poseurs", "réseau de pose", "trouver un poseur",
    "poseur d'enseigne", "poseur publicitaire", "poseur d'adhésif",
    "installateur d'enseigne", "sous-traitance pose enseigne",
    "sous-traitant poseur", "prestataire de pose", "pose multi-sites",
    "déploiement national enseigne", "devenir poseur", "poseur indépendant",
    "chantier de pose", "pose en nacelle", "CACES R486", "travail en hauteur",
    "pose de signalétique", "pose de bâche", "pose de vitrophanie",
    "dépose d'enseigne", "maintenance d'enseigne"
  ], "Recherches associées")}</div>
</section>`;

  return T.page({
    file,
    title: "Réseau National de Poseurs — Enseigne, Adhésif, Signalétique",
    desc: "Réseau national de poseurs d'enseignes, adhésifs et signalétique. Prix publiés, attestations vérifiées, aucune commission. Devis de pose sous 24 h partout en France.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Réseau national de pose d'enseignes et de signalétique",
        serviceType: "Pose et installation de communication visuelle",
        areaServed: { "@type": "Country", name: "France" },
        provider: {
          "@type": "Organization", name: site.brand,
          url: site.domain.replace(/\/$/, "") + "/",
          email: site.email, telephone: site.phoneHref
        }
      },
      T.faqSchema(POSEUR_FAQ)
    ]
  });
};
