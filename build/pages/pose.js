const T = require("../lib/tpl");
const { site, esc, img, heroImg } = T;
const P = require("../data/partnership");
const PO = P.pose;

module.exports = function posePage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Service de pose", url: "service-pose.html" }
  ];

  const planCards = PO.plans.map((pl) => `
<div class="plan${pl.featured ? " plan-featured" : ""}">
  ${pl.badge ? `<span class="plan-badge">${esc(pl.badge)}</span>` : ""}
  <h3>${esc(pl.name)}</h3>
  ${P.launch && P.launch.active ? `<span class="plan-launch">🎁 ${esc(P.launch.badge)}</span>` : ""}
  <p class="plan-pitch">${esc(pl.pitch)}</p>
  <div class="plan-price">
    <b>${esc(pl.price)}</b><span>${esc(P.currency)} ${esc(P.priceSuffix)}</span><em>/ ${esc(pl.duration)}</em>
  </div>
  ${(() => { const d = T.launchPriceOn(pl); return d ? `
  <p class="plan-note plan-note-launch"><b>${esc(P.launchPrice.label)}</b> — soit
    ${esc(d.perMonth(pl.duration))} ${esc(P.currency)} par mois. Ce tarif passe à
    <b>${esc(d.after)} ${esc(P.currency)}</b> le ${esc(T.site.anniversary)} — mais le vôtre
    reste bloqué <b>${esc(pl.duration)}</b>.</p>` : `
  <p class="plan-note">${esc(pl.priceNote)}</p>`; })()}
  <p class="plan-audience"><strong>Pour qui :</strong> ${esc(pl.audience)}</p>
  <ul class="plan-list">
    ${pl.features.map((f) => `<li class="yes">${esc(f)}</li>`).join("")}
    ${pl.notIncluded.map((f) => `<li class="no">${esc(f)}</li>`).join("")}
  </ul>
  <a class="btn ${pl.featured ? "btn-pro" : "btn-ghost"} btn-block"
     href="professionnels.html?formule=${encodeURIComponent(pl.name)}">Choisir ${esc(pl.name)}</a>
</div>`).join("");

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("nacelle", 6, "Pose d'enseigne en nacelle élévatrice")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Service de pose</span>
    <h1>Un poseur habilité pour votre enseigne, partout en France</h1>
    <p class="lead">${esc(PO.lead)}</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="#formules">Voir les formules</a>
      <a class="btn btn-ghost btn-lg" href="#poseurs">Je suis poseur</a>
    </div>
    <div class="pill-row">
      <span class="pill">Devis sous 24 h</span>
      <span class="pill">CACES R486</span>
      <span class="pill">Habilitation électrique</span>
      <span class="pill">Décennale vérifiée</span>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec-tight bg-2"><div class="wrap">${T.launchBanner()}</div></section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="pour-qui">À qui s'adresse ce service</h2>
        <p>Beaucoup d'entreprises du secteur savent parfaitement fabriquer, imprimer ou vendre,
        mais n'ont pas d'équipe de pose — ou pas d'équipe disponible à 300 kilomètres de leur atelier.
        Refuser le chantier ou improviser avec un intérimaire non habilité sont deux mauvaises
        réponses au même problème.</p>
        <ul class="checks">
          <li><strong>Enseignistes et fabricants</strong> — vous produisez, nous posons dans les régions où vous n'avez pas d'équipe</li>
          <li><strong>Imprimeurs grand format</strong> — bâches de façade, adhésifs de vitrine, panneaux à installer chez le client</li>
          <li><strong>Agences de publicité et de communication</strong> — vous vendez la campagne, nous assurons l'installation</li>
          <li><strong>Franchises et réseaux</strong> — déploiement d'une charte sur plusieurs points de vente, avec planning coordonné</li>
          <li><strong>Fournisseurs et distributeurs</strong> — vous livrez le matériel, le client veut une pose clé en main</li>
          <li><strong>Bailleurs, promoteurs et gestionnaires</strong> — signalétique d'immeuble, dépose en fin de bail</li>
        </ul>

        <h2 id="prestations">Ce que la prestation couvre</h2>
        <div class="grid g-2" style="margin:1.6em 0">
          ${PO.prestations.map(([t, d]) => `<div class="tile">
            <h3 style="font-size:1.05rem">${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
        </div>

        <h2 id="garanties">Ce que nous vérifions avant chaque intervention</h2>
        <p>C'est le cœur du service, et c'est ce qui vous protège en tant que donneur d'ordre :
        en cas d'accident ou de dommage à la façade, votre responsabilité peut être recherchée
        si le prestataire n'était pas en règle.</p>
        <ul class="checks">
          <li><strong>CACES R486</strong> de l'opérateur, catégorie adaptée à la machine utilisée</li>
          <li><strong>Vérification générale périodique</strong> de la nacelle, semestrielle et à jour</li>
          <li><strong>Habilitation électrique</strong> pour tout raccordement</li>
          <li><strong>Responsabilité civile professionnelle</strong> et <strong>garantie décennale</strong> en cours de validité</li>
          <li><strong>Autorisation d'occupation du domaine public</strong> lorsque la nacelle empiète sur le trottoir</li>
          <li><strong>Photos d'ancrage</strong> avant habillage et procès-verbal de pose en formule annuelle</li>
        </ul>
        <div class="note"><p>Ces pièces vous sont transmises <strong>avant</strong> l'intervention,
        pas après. Un poseur qui ne peut pas les produire ne fait pas partie du réseau.</p></div>
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un chantier à poser ?</h3>
          <p>Décrivez-le : vous recevez un devis de pose sous 24 heures ouvrées, avec les
          attestations du poseur retenu.</p>
          <a class="btn btn-primary btn-block" href="devis.html?prestation=${encodeURIComponent("Pose & nacelle")}">Demander un devis de pose</a>
          <p style="margin-top:16px;font-size:.86rem">Ou par téléphone :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">À lire aussi</h4>
          <ul class="link-list">
            <li><a href="pose-nacelle.html">Le métier de la pose</a></li>
            <li><a href="partenaires.html">Devenir partenaire</a></li>
            <li><a href="reglementation-enseigne.html">Réglementation</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2" id="formules">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Abonnement pose</span>
      <h2>Un poseur disponible toute l'année, pour un budget fixe</h2>
      <p class="lead mx-auto">L'abonnement vous donne accès au réseau de poseurs et à des tarifs
      négociés. Le coût de chaque pose reste facturé par le poseur, au tarif réseau —
      l'abonnement, lui, vous garantit la disponibilité, la vérification des attestations
      et le devis sous 24 heures.</p>
    </div>
    <div class="plans">${planCards}</div>
    <p class="center" style="margin-top:26px;font-size:.87rem;color:var(--tx-3)">${esc(P.vatNote)}</p>
  </div>
</section>

${T.amortBlock("pose")}

<section class="sec dark" id="poseurs">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Vous êtes poseur</span>
        <h2>Recevez ces chantiers de pose dans votre zone</h2>
        <p class="lead">Vous avez une nacelle, un échafaudage, des CACES à jour et des véhicules
        équipés ? Ce sont précisément les chantiers que nous cherchons à confier : fabricants et
        agences nous sollicitent chaque semaine pour poser dans des régions où ils n'ont personne.</p>
        <ul class="checks">
          <li>Des chantiers de pose déjà vendus, avec le matériel fourni</li>
          <li>Attribution selon votre matériel réel : hauteur de nacelle, échafaudage, cordistes, véhicules</li>
          <li>Zone d'intervention que vous définissez vous-même</li>
          <li>Abonnement partenaire fixe, <strong>aucune commission</strong> prélevée sur vos interventions</li>
          <li>Vous facturez le donneur d'ordre en direct, à votre tarif</li>
        </ul>
        <div class="btns" style="margin-top:30px">
          <a class="btn btn-pro btn-lg" href="professionnels.html">Déclarer mon matériel</a>
          <a class="btn btn-ghost btn-lg" href="partenaires.html">Voir les formules partenaires</a>
        </div>
      </div>
      <div class="gal">
        <figure>${img("nacelle", 3, "Nacelle élévatrice sur chantier de pose")}</figure>
        <figure>${img("pose", 1, "Poseur installant une enseigne en façade")}</figure>
        <figure>${img("nacelle", 5, "Plateforme élévatrice en intervention")}</figure>
        <figure>${img("pose", 4, "Installation de signalétique par un poseur")}</figure>
      </div>
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Questions fréquentes</span>
      <h2>Service de pose : vos questions</h2>
    </div>
    ${T.faqBlock(PO.faq)}
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble("pro")}</div></section>`;

  return T.page({
    file: "service-pose.html", active: "service-pose.html",
    space: "pro",   // affiche le bandeau d'entrée de l'espace professionnels
    title: `Service de Pose d'Enseigne — Poseurs Habilités partout en France | ${site.brand}`,
    desc: "Vous fabriquez sans équipe de pose ? Nous mobilisons un poseur habilité CACES nacelle partout en France, devis sous 24 h, attestations vérifiées. Abonnement 6 ou 12 mois.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Service de pose d'enseigne et de signalétique",
        description: PO.lead,
        serviceType: "Pose, travail en hauteur et installation",
        provider: { "@type": "Organization", name: site.brand, url: site.domain },
        areaServed: { "@type": "Country", name: "France" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Formules de pose",
          itemListElement: PO.plans.map((pl) => ({
            "@type": "Offer", name: pl.name, description: pl.pitch,
            price: pl.price.replace(/\s/g, ""), priceCurrency: "EUR"
          }))
        }
      },
      T.faqSchema(PO.faq)
    ]
  });
};
