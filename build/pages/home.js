const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;

const FAQ = [
  { q: "Le service est-il vraiment gratuit pour le client ?", a: "Oui, totalement. Vous ne payez rien pour être mis en relation, ni pour recevoir des devis. Notre rémunération vient des professionnels du réseau, sous forme d'apport d'affaires, uniquement lorsqu'un projet se concrétise. Vous restez libre de ne donner suite à aucune proposition." },
  { q: "Combien de devis vais-je recevoir ?", a: "En général deux à trois propositions, établies sur le même cahier des charges pour être réellement comparables. Nous préférons trois devis sérieux à dix devis approximatifs : au-delà, le tri devient un travail à part entière et les professionnels se désengagent." },
  { q: "Qui réalise réellement les travaux ?", a: "Des entreprises indépendantes de votre région : enseignistes fabricants, imprimeurs grand format, poseurs habilités au travail en hauteur, graphistes et spécialistes de l'objet publicitaire. Nous vérifions leurs assurances, leurs qualifications et leurs capacités de production avant tout référencement." },
  { q: "Intervenez-vous partout en France ?", a: "Oui, en métropole comme en outre-mer. Le réseau s'est constitué depuis Perpignan et les Pyrénées-Orientales, puis s'est étendu aux grandes agglomérations. Lorsqu'une zone est encore peu couverte, nous sollicitons directement des professionnels locaux pour votre projet." },
  { q: "En quoi est-ce différent d'une franchise d'enseignes ?", a: "Une franchise vous oriente vers son propre point de vente, avec son catalogue et ses fournisseurs imposés. Nous sommes un réseau ouvert d'entreprises indépendantes : selon votre projet, nous consultons un fabricant d'enseignes lumineuses, un imprimeur ou un poseur spécialisé — celui dont l'outil de production correspond réellement à votre besoin." },
  { q: "Que se passe-t-il après ma demande ?", a: "Nous vous rappelons pour préciser le besoin — dimensions, contraintes de façade, délais, budget. Nous rédigeons ensuite un cahier des charges clair et le transmettons aux professionnels adaptés. Vous recevez leurs propositions directement, et vous traitez ensuite en direct avec celui que vous choisissez." }
];

module.exports = function home(cities) {
  const pilot = cities.find((c) => c.pilot) || cities[0];

  const body = `
<section class="hero">
  <div class="hero-bg">${heroImg("hero", 2, "Rue commerçante avec enseignes et devantures de magasins")}</div>
  <div class="wrap hero-in">
    <span class="hero-badge"><b>Nouveau</b> Réseau national d'artisans de la communication visuelle</span>
    <h1>Votre enseigne, votre signalétique et votre publicité, confiées aux bons professionnels</h1>
    <p class="lead">${esc(site.baseline)} Décrivez votre projet en deux minutes : nous le qualifions,
    puis nous le confions à des enseignistes, imprimeurs et poseurs sélectionnés près de chez vous.
    Vous recevez des propositions comparables sous 48 heures — gratuitement et sans engagement.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html">Décrire mon projet</a>
      <a class="btn btn-ghost btn-lg" href="professionnels.html">Je suis un professionnel</a>
    </div>
    <div class="hero-stats">
      ${site.stats.map((s) => `<div><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">${T.trustBar()}</div>
</section>

<section class="sec bg-2" id="metiers">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Nos métiers</span>
      <h2>Toute la communication visuelle, d'un seul point d'entrée</h2>
      <p class="lead">De la première maquette à la pose en nacelle, huit familles de métiers couvrent
      l'intégralité de vos besoins de visibilité. Un seul interlocuteur, des spécialistes pour chaque étape.</p>
    </div>
    <div class="grid g-4">${T.serviceCards()}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Comment ça marche</span>
        <h2>Trois étapes, aucune perte de temps</h2>
        <p class="lead" style="margin-bottom:38px">Consulter trois entreprises soi-même prend en moyenne
        une dizaine d'heures et aboutit à des devis incomparables. Nous faisons ce travail pour vous,
        avec un cahier des charges unique.</p>
        <div class="steps stack">
          <div class="step">
            <h3>Vous décrivez votre projet</h3>
            <p>Un formulaire de deux minutes, ou un appel. Nature du besoin, ville, contraintes de façade,
            délai souhaité, ordre de budget. Aucun jargon requis : nous traduisons.</p>
          </div>
          <div class="step">
            <h3>Nous qualifions et transmettons</h3>
            <p>Nous rédigeons un cahier des charges technique — matériaux, dimensions, mode d'éclairage,
            contraintes réglementaires — et le confions aux professionnels dont les capacités correspondent
            réellement à votre projet.</p>
          </div>
          <div class="step">
            <h3>Vous comparez et choisissez</h3>
            <p>Deux à trois propositions établies sur la même base arrivent sous 48 heures.
            Vous traitez ensuite en direct avec l'entreprise retenue, sans intermédiaire dans le contrat.</p>
          </div>
        </div>
        <div class="btns" style="margin-top:34px">
          <a class="btn btn-dark" href="comment-ca-marche.html">En savoir plus sur notre rôle</a>
        </div>
      </div>
      <div class="showcase">
        <figure class="s-a">${img("atelier", 1, "Atelier de fabrication d'enseignes et de signalétique", { sizes: "(max-width: 780px) 50vw, 32vw" })}</figure>
        <figure class="s-b">${img("maquette", 1, "Graphiste préparant la maquette d'une enseigne", { sizes: "(max-width: 780px) 50vw, 22vw" })}</figure>
        <figure class="s-c" style="grid-column:span 5">${img("nacelle", 4, "Pose d'enseigne en nacelle élévatrice", { sizes: "(max-width: 780px) 50vw, 22vw" })}</figure>
        <figure class="s-c" style="grid-column:span 7">${img("covering", 2, "Utilitaire habillé en covering publicitaire", { sizes: "(max-width: 780px) 50vw, 32vw" })}</figure>
      </div>
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Notre différence</span>
      <h2>Un réseau ouvert d'artisans, pas une franchise</h2>
      <p class="lead">Les réseaux franchisés du secteur vous orientent vers leur propre point de vente,
      avec son catalogue et ses fournisseurs. Notre modèle est inverse : nous partons de votre projet,
      puis nous cherchons l'atelier dont l'outil de production lui correspond.</p>
    </div>
    <div class="grid g-3">
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/><circle cx="12" cy="12" r="10"/></svg></span>
        <h3>Le bon atelier, pas le seul disponible</h3>
        <p>Une enseigne lumineuse sur mesure, un covering de flotte et un plan de signalétique d'hôpital
        ne se fabriquent pas dans le même atelier. Nous orientons vers l'outil de production adapté.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg></span>
        <h3>Des devis réellement comparables</h3>
        <p>Même cahier des charges, mêmes matériaux demandés, mêmes prestations incluses.
        C'est la seule façon de savoir si un écart de prix cache un écart de qualité.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span>
        <h3>Des professionnels vérifiés</h3>
        <p>Assurance décennale et responsabilité civile professionnelle à jour, CACES nacelle,
        habilitation électrique, capacités de production déclarées et contrôlées.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <h3>Des artisans de proximité</h3>
        <p>Un poseur à 30 km intervient plus vite et moins cher qu'un prestataire national.
        Pour le SAV d'une enseigne lumineuse, cette proximité change tout.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4M16 4v4"/></svg></span>
        <h3>Le volet administratif pris en charge</h3>
        <p>Autorisation préalable d'enseigne, dossier Cerfa, insertion photographique, déclaration TLPE,
        occupation du domaine public : c'est prévu dès le devis, pas découvert en cours de route.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
        <h3>Gratuit, sans exclusivité</h3>
        <p>Vous ne payez rien, vous ne signez rien avec nous, et vous restez libre de refuser
        l'intégralité des propositions reçues.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Couverture nationale</span>
        <h2>De ${esc(pilot.name)} à toute la France</h2>
        <p class="lead">Le réseau s'est constitué à ${esc(pilot.name)} et dans les ${esc(pilot.deptName)},
        où nous connaissons les contraintes de terrain : secteur patrimonial, tramontane, atmosphère saline,
        règlement local de publicité. Il couvre aujourd'hui l'ensemble des grandes agglomérations françaises,
        avec la même exigence de proximité.</p>
        <ul class="checks">
          <li>Un interlocuteur unique, où que soit votre point de vente</li>
          <li>Des ateliers locaux pour la fabrication, la pose et le service après-vente</li>
          <li>Le déploiement multi-sites d'une même charte, à l'identique</li>
          <li>La connaissance des règlements locaux de publicité, commune par commune</li>
        </ul>
        <div class="btns" style="margin-top:26px">
          <a class="btn btn-dark" href="villes.html">Voir toutes les villes couvertes</a>
          <a class="btn btn-ghost" href="enseigne-signaletique-${esc(pilot.slug)}.html">Enseigne à ${esc(pilot.name)}</a>
        </div>
      </div>
      <div>
        <figure style="margin:0;border-radius:16px;overflow:hidden">
          ${img("perpignan", 6, "Le Castillet à Perpignan, Pyrénées-Orientales", { sizes: "(max-width: 780px) 100vw, 45vw" })}
        </figure>
        <div class="city-grid" style="margin-top:12px">
          ${cities.slice(1, 9).map((c) => `<a class="city-chip" href="enseigne-signaletique-${c.slug}.html">${esc(c.name)}<small>${esc(c.dept)}</small></a>`).join("")}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Réalisations types</span>
      <h2>Ce que le réseau produit au quotidien</h2>
      <p class="lead mx-auto">Enseignes lumineuses, habillages de vitrine, marquage de flotte, signalétique
      d'établissement, stands et objets publicitaires : un aperçu des familles de projets traités.</p>
    </div>
    <div class="gal">
      <figure>${img("enseigne-lumineuse", 1, "Enseigne lumineuse de commerce en néon")}</figure>
      <figure>${img("covering", 5, "Véhicule utilitaire en covering publicitaire intégral")}</figure>
      <figure>${img("signaletique", 2, "Signalétique directionnelle extérieure sur mât")}</figure>
      <figure>${img("stand", 4, "Stand de salon avec mur d'images textile rétro-éclairé")}</figure>
      <figure>${img("vitrophanie", 2, "Vitrine de commerce habillée en vitrophanie")}</figure>
      <figure>${img("gravure", 2, "Découpe numérique de lettres sur machine à commande numérique")}</figure>
      <figure>${img("impression-banderole", 2, "Banderole publicitaire imprimée grand format")}</figure>
      <figure>${img("totem", 2, "Totem d'entreprise en entrée de zone d'activité")}</figure>
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Questions fréquentes</span>
        <h2>Ce que l'on nous demande le plus souvent</h2>
        <div style="margin-top:30px">${T.faqBlock(FAQ)}</div>
        <p style="margin-top:26px"><a class="btn btn-ghost" href="faq.html">Toutes les questions fréquentes</a></p>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet en tête ?</h3>
          <p>Deux minutes suffisent pour décrire votre besoin. Nous vous rappelons pour préciser
          les points techniques, puis nous lançons la consultation.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Demander un devis gratuit</a>
          <p style="margin-top:18px;font-size:.86rem">Ou par téléphone :<br>
          <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">${T.ctaDouble()}</div>
</section>

<section class="sec-tight bg-2">
  <div class="wrap">
    ${T.keywordCloud([
      "enseigne lumineuse", "enseigne magasin", "fabricant d'enseigne", "enseigniste",
      "lettres découpées", "caisson lumineux", "néon LED", "totem publicitaire",
      "signalétique intérieure", "signalétique extérieure", "signalétique directionnelle",
      "plaque professionnelle", "signalétique PMR", "panneau de sécurité",
      "covering véhicule", "total covering", "marquage utilitaire", "lettrage adhésif",
      "impression grand format", "bâche publicitaire", "banderole", "roll-up", "kakémono",
      "vitrophanie", "film dépoli", "micro-perforé", "PLV", "stand de salon",
      "objet publicitaire", "goodies", "textile floqué", "broderie", "vêtement de travail",
      "création de logo", "charte graphique", "maquette d'enseigne", "simulation façade",
      "pose d'enseigne", "travail en hauteur", "nacelle CACES", "maintenance d'enseigne",
      "autorisation préalable d'enseigne", "TLPE", "règlement local de publicité"
    ], "Nos domaines d'intervention")}
  </div>
</section>`;

  return T.page({
    file: "index.html",
    active: "index.html",
    title: `${site.brand} — Enseigne, Signalétique & Publicité par l'Objet partout en France`,
    desc: "Enseigne lumineuse, signalétique, covering véhicule, impression grand format, objets publicitaires : décrivez votre projet et recevez sous 48 h des devis d'artisans vérifiés près de chez vous. Gratuit et sans engagement.",
    body,
    cities,
    schema: [
      {
        "@context": "https://schema.org", "@type": "Organization",
        "@id": site.domain + "/#organization",
        name: site.brand, legalName: site.brandLegal,
        url: site.domain, description: site.tagline,
        email: site.email, telephone: site.phoneHref,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.cp,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country
        },
        areaServed: { "@type": "Country", name: "France" },
        knowsAbout: services.map((s) => s.nav)
      },
      {
        "@context": "https://schema.org", "@type": "WebSite",
        "@id": site.domain + "/#website",
        url: site.domain, name: site.brand, inLanguage: "fr-FR",
        publisher: { "@id": site.domain + "/#organization" }
      },
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Mise en relation en communication visuelle",
        serviceType: "Apport d'affaires — enseigne, signalétique et publicité par l'objet",
        provider: { "@id": site.domain + "/#organization" },
        areaServed: { "@type": "Country", name: "France" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR",
          description: "Mise en relation gratuite et sans engagement pour le client." },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Métiers de la communication visuelle",
          itemListElement: services.map((s) => ({
            "@type": "Offer", itemOffered: { "@type": "Service", name: s.nav, description: s.navDesc }
          }))
        }
      },
      T.faqSchema(FAQ)
    ]
  });
};
