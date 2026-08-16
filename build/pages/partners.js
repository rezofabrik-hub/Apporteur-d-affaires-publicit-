const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;
const P = require("../data/partnership");

module.exports = function partnersPage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Partenaires du secteur", url: "partenaires.html" }
  ];

  /* La formule d'essai n'a de sens que pendant le lancement : elle disparaît
     d'elle-même le jour où l'on passe `launch.active` à false. */
  const shownPlans = P.plans.filter((pl) => !pl.free || (P.launch && P.launch.active));

  /* Le prix affiché est le prix réellement pratiqué. Ce qui est annoncé, c'est
     la hausse à venir — jamais une réduction sur un tarif jamais appliqué. */
  const priceBlock = (pl) => {
    const d = pl.free ? null : T.launchPriceOn(pl);
    const price = `
  <div class="plan-price">
    <b>${esc(pl.price)}</b><span>${esc(P.currency)}${pl.free ? "" : " " + esc(P.priceSuffix)}</span>
    <em>/ ${esc(pl.duration)}</em>
  </div>`;
    if (!d) return price + `
  <p class="plan-note">${esc(pl.priceNote)}</p>`;
    return price + `
  <p class="plan-note plan-note-launch"><b>${esc(P.launchPrice.label)}</b> — soit
    ${esc(d.perMonth(pl.duration))} ${esc(P.currency)} par mois, et ${esc(d.ht)} ${esc(P.currency)}
    HT à votre charge réelle. Ce tarif passe à <b>${esc(d.after)} ${esc(P.currency)}</b>
    le ${esc(T.site.anniversary)} — mais le vôtre reste bloqué
    <b>${esc(pl.duration)}</b>.</p>`;
  };

  const planCards = shownPlans.map((pl) => `
<div class="plan${pl.featured ? " plan-featured" : ""}${pl.free ? " plan-free" : ""}">
  ${pl.badge ? `<span class="plan-badge">${esc(pl.badge)}</span>` : ""}
  <h3>${esc(pl.name)}</h3>
  <p class="plan-pitch">${esc(pl.pitch)}</p>
  ${priceBlock(pl)}
  <p class="plan-audience"><strong>Pour qui :</strong> ${esc(pl.audience)}</p>
  <ul class="plan-list">
    ${pl.features.map((f) => `<li class="yes">${esc(f)}</li>`).join("")}
    ${pl.notIncluded.map((f) => `<li class="no">${esc(f)}</li>`).join("")}
  </ul>
  <a class="btn ${pl.free || pl.featured ? "btn-pro" : "btn-ghost"} btn-block"
     href="professionnels.html?formule=${encodeURIComponent(pl.name)}">${
       pl.free ? "Commencer gratuitement" : "Choisir l'" + esc(pl.name.toLowerCase())}</a>
</div>`).join("");

  const comp = P.comparison;

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("equipe-pro", 3, "Professionnels de la communication visuelle en réunion")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Partenaires du secteur</span>
    <h1>Rejoignez le réseau et recevez du travail toute l'année</h1>
    <p class="lead">Nous sommes une <strong>agence de communication et de mise en relation</strong> :
    nous qualifions les projets des clients, puis nous les confions à de vrais professionnels —
    enseignistes, imprimeurs, poseurs, agences de publicité, spécialistes du covering et de l'objet
    publicitaire. <strong>Deux mois à 0 €</strong> pour commencer, puis un abonnement fixe de 6 ou
    12 mois — et <strong>aucune commission sur vos affaires</strong>.</p>
    <div class="btns">
      <a class="btn btn-pro btn-lg" href="#formules">Voir les formules</a>
      <a class="btn btn-ghost btn-lg" href="professionnels.html">Remplir le questionnaire</a>
    </div>
    <div class="pill-row">
      <span class="pill">${esc(site.experienceLine)}</span>
      <span class="pill">Tarif bloqué sur la durée</span>
      <span class="pill">Sans droit d'entrée</span>
      <span class="pill">Sans commission</span>
      <span class="pill">Sans reconduction tacite</span>
      <span class="pill">Vous facturez en direct</span>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">${T.launchBanner()}</div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Ce que vous obtenez</span>
      <h2>Un flux d'affaires, pas une liste de contacts revendus</h2>
      <p class="lead">La différence tient à une chose : chaque demande est qualifiée par téléphone
      et traduite en cahier des charges avant de vous parvenir, et elle n'est jamais adressée
      à plus de deux ou trois partenaires.</p>
    </div>
    <div class="grid g-3">
      ${P.benefits.map(([t, d]) => `<div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></span>
        <h3>${esc(t)}</h3><p>${esc(d)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2" id="formules">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Formules d'abonnement</span>
      <h2>Deux mois à 0 €, puis 6 ou 12 mois pour la première année</h2>
      <p class="lead mx-auto">Vous commencez sans rien payer et vous mesurez le flux réel de votre
      secteur. Vous ne choisissez la durée de votre abonnement qu'ensuite, en connaissance de cause —
      un budget de prospection fixe, sans pourcentage prélevé sur vos chantiers.</p>
      <p class="lead mx-auto"><strong>Les deux abonnements donnent exactement les mêmes avantages.</strong>
      Nous ne pratiquons pas les formules à deux vitesses, où celui qui s'engage moins longtemps
      reçoit moins de demandes. Ce qui change, c'est le tarif : l'année revient à
      <strong>890 € contre 980 € pour deux semestres</strong>, soit 90 € d'économie.</p>
    </div>
    ${T.launchPriceBanner()}
    <div class="plans">${planCards}</div>
    <p class="center" style="margin-top:26px;font-size:.87rem;color:var(--tx-3)">${esc(P.vatNote)}</p>
  </div>
</section>
${T.amortBlock('vente')}

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Comparaison</span>
      <h2>Abonnement, franchise ou achat de contacts ?</h2>
      <p class="lead">Les trois façons de faire entrer des chantiers dans une entreprise de
      communication visuelle, mises côte à côte sans complaisance.</p>
    </div>
    <div class="table-wrap"><table>
      <thead><tr>${comp.head.map((h, i) => `<th scope="col"${i === 1 ? ' style="color:var(--pro-600)"' : ""}>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${comp.rows.map((r) => `<tr>${r.map((c, i) => i === 0
        ? `<th scope="row">${esc(c)}</th>`
        : `<td${i === 1 ? ' style="font-weight:600;color:var(--pro-600)"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <div class="note"><p>Une franchise du secteur demande couramment un droit d'entrée à cinq chiffres,
    une redevance assise sur votre chiffre d'affaires, l'abandon de votre enseigne et des fournisseurs
    imposés, sur un engagement de cinq à sept ans. Notre modèle ne touche à aucun de ces points :
    vous gardez votre nom, vos fournisseurs, vos prix et votre indépendance.</p></div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Adhésion</span>
        <h2>Quatre étapes, une semaine</h2>
        <div class="steps stack" style="margin-top:34px">
          ${P.steps.map(([t, d]) => `<div class="step"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
        </div>
        <div class="btns" style="margin-top:34px">
          <a class="btn btn-pro btn-lg" href="professionnels.html">Remplir le questionnaire</a>
        </div>
      </div>
      <div class="showcase">
        <figure class="s-a">${img("atelier", 2, "Atelier de fabrication partenaire du réseau", { sizes: "(max-width: 780px) 50vw, 32vw" })}</figure>
        <figure class="s-b">${img("nacelle", 2, "Équipe de pose en nacelle élévatrice", { sizes: "(max-width: 780px) 50vw, 22vw" })}</figure>
        <figure class="s-c" style="grid-column:span 6">${img("impression", 2, "Imprimeur grand format partenaire", { sizes: "(max-width: 780px) 50vw, 25vw" })}</figure>
        <figure class="s-c" style="grid-column:span 6">${img("covering", 3, "Atelier de covering véhicule", { sizes: "(max-width: 780px) 50vw, 25vw" })}</figure>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Profils recherchés</span>
      <h2>Les entreprises que nous référençons</h2>
      <p class="lead">Nous cherchons des entreprises qui produisent ou qui posent, pas des
      intermédiaires qui revendent. Si vous avez un atelier, des machines, du matériel de hauteur
      ou des équipes terrain, vous êtes concerné.</p>
    </div>
    <div class="grid g-4">
      ${services.map((s) => `<a class="card card-link" href="${s.slug}.html">
        <div class="card-media">${img(s.topic, 3, s.navShort)}<span class="card-tag">${esc(s.navShort)}</span></div>
        <div class="card-body"><h3>${esc(s.navShort)}</h3><p>${esc(s.navDesc)}.</p>
        <span class="card-more">Le métier</span></div>
      </a>`).join("")}
    </div>
    <div class="tags" style="margin-top:26px">
      ${["Enseigniste fabricant", "Agence de publicité", "Imprimeur grand format", "Poseur nacelle",
         "Spécialiste covering", "Atelier de gravure", "Studio graphique", "Fournisseur d'objets publicitaires",
         "Sérigraphe", "Brodeur", "Métallier", "Menuisier agenceur", "Électricien enseigne",
         "Cordiste", "Loueur de nacelle", "Société de nettoyage de façade"]
        .map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Questions des partenaires</span>
      <h2>Ce que les entreprises nous demandent avant d'adhérer</h2>
    </div>
    ${T.faqBlock(P.faq)}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="cta">
      <h2>Prêt à recevoir vos premières demandes ?</h2>
      <p>Le questionnaire prend 7 à 10 minutes. Il cartographie précisément votre atelier,
      votre matériel de hauteur, votre parc de véhicules et vos habilitations — c'est cette précision
      qui déterminera la pertinence des affaires que nous vous adresserons.</p>
      <div class="btns">
        <a class="btn btn-pro btn-lg" href="professionnels.html">Remplir le questionnaire</a>
        <a class="btn btn-ghost btn-lg" data-cfg="phone" data-keep-text href="tel:${esc(site.phoneHref)}">En parler d'abord</a>
      </div>
    </div>
  </div>
</section>`;

  return T.page({
    file: "partenaires.html", active: "partenaires.html",
    space: "pro",   // affiche le bandeau d'entrée de l'espace professionnels
    title: `Devenir Partenaire — Abonnement Réseau Enseigne & Signalétique | ${site.brand}`,
    desc: "Enseigniste, agence de publicité, imprimeur, poseur nacelle : rejoignez le réseau avec un abonnement 6 ou 12 mois, sans droit d'entrée et sans commission sur vos affaires. Recevez des demandes qualifiées dans votre zone.",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Adhésion au réseau de partenaires",
        description: "Abonnement donnant accès à des demandes qualifiées en communication visuelle, sans commission sur les affaires signées.",
        provider: { "@type": "Organization", name: site.brand, url: site.domain },
        areaServed: { "@type": "Country", name: "France" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Formules partenaires",
          itemListElement: P.plans.map((pl) => ({
            "@type": "Offer", name: pl.name, description: pl.pitch,
            price: pl.price.replace(/\s/g, ""), priceCurrency: "EUR",
            eligibleDuration: { "@type": "QuantitativeValue",
              value: pl.duration.startsWith("6") ? 6 : 12, unitCode: "MON" }
          }))
        }
      },
      T.faqSchema(P.faq)
    ]
  });
};
