const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;

module.exports = function sectorPage(sec, cities) {
  const file = "signaletique-" + sec.slug + ".html";
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Secteurs d'activité", url: "secteurs.html" },
    { name: sec.nav, url: file }
  ];
  const svc = services.filter((s) => (sec.services || []).includes(s.slug));

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(sec.topic, 2, sec.h1)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Secteur · ${esc(sec.nav)}</span>
    <h1>${esc(sec.h1)}</h1>
    <p class="lead">${esc(sec.lead)}</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?secteur=${encodeURIComponent(sec.nav)}">Demander un devis gratuit</a>
      <a class="btn btn-ghost btn-lg" href="#besoins">Vos besoins types</a>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec" id="besoins">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Besoins types</span>
      <h2>Ce dont votre activité a réellement besoin</h2>
      <p class="lead">Six familles de supports couvrent l'essentiel des projets de ce secteur.
      Vous n'avez pas besoin de tout, mais vous avez besoin que l'ensemble soit cohérent.</p>
    </div>
    <div class="grid g-3">
      ${sec.besoins.map(([t, d]) => `<div class="tile">
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
        <h2 id="specificites">Les points réglementaires et techniques à connaître</h2>
        ${sec.specifics.map((p) => `<p>${p}</p>`).join("\n")}

        <h2 id="budget">Budgets indicatifs</h2>
        <div class="table-wrap"><table>
          <thead><tr><th scope="col">Prestation</th><th scope="col">Budget indicatif</th></tr></thead>
          <tbody>${sec.budget.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody>
        </table></div>
        <p style="font-size:.86rem;color:var(--tx-3)">Fourchettes hors pose et hors démarches administratives,
        données à titre indicatif. Voir le <a href="tarifs.html">guide des prix complet</a>.</p>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet dans ce secteur ?</h3>
          <p>Nous orientons votre demande vers des professionnels qui connaissent déjà vos contraintes
          métier — c'est ce qui évite les allers-retours.</p>
          <a class="btn btn-primary btn-block" href="devis.html?secteur=${encodeURIComponent(sec.nav)}">Demander un devis</a>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Métiers concernés</h4>
          <ul class="link-list">
            ${svc.map((s) => `<li><a href="${s.slug}.html">${esc(s.navShort)}</a></li>`).join("")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Métiers mobilisés</span>
    <h2>Les savoir-faire que nous consultons pour vous</h2></div>
    <div class="grid g-4">${T.serviceCards(svc)}</div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Questions fréquentes</span>
        <h2>${esc(sec.nav)} : vos questions</h2>
        <div style="margin-top:30px">${T.faqBlock(sec.faq)}</div>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Partout en France</h3>
          <p style="font-size:.88rem">Nous traitons ce type de projet dans l'ensemble des villes couvertes :</p>
          <ul class="link-list">
            ${cities.slice(0, 8).map((c) => `<li><a href="enseigne-signaletique-${c.slug}.html">${esc(c.name)}</a></li>`).join("")}
          </ul>
          <a class="btn btn-ghost btn-block btn-sm" style="margin-top:16px" href="villes.html">Les 119 villes couvertes</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file,
    title: sec.title + " | " + site.brand,
    desc: sec.desc,
    ogImage: (T.pick(sec.topic, 2) || { name: "hero-1" }).name + "-lg.jpg",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: sec.h1, description: sec.desc,
        serviceType: "Communication visuelle — " + sec.nav,
        provider: { "@type": "Organization", name: site.brand, url: site.domain },
        areaServed: { "@type": "Country", name: "France" },
        audience: { "@type": "BusinessAudience", name: sec.nav }
      },
      T.faqSchema(sec.faq)
    ]
  });
};

/* --------------------------------------------------------- page sommaire */
module.exports.index = function sectorsIndex(sectors, cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Secteurs d'activité", url: "secteurs.html" }];
  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("commerce", 4, "Commerces et activités en France")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Par métier de client</span>
    <h1>Votre secteur d'activité a ses propres contraintes</h1>
    <p class="lead">Une croix de pharmacie, un totem de concession et un plan d'évacuation d'entrepôt
    n'obéissent pas aux mêmes règles. Retrouvez ci-dessous les besoins, les obligations et les budgets
    propres à votre activité.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="grid g-3">
      ${sectors.map((s, i) => {
        const tps = [s.topic].concat(s.topicAlt || []);
        return `<a class="card card-link" href="signaletique-${s.slug}.html">
        <div class="card-media">${img(tps[i % tps.length], (i % 4) + 1, s.nav)}<span class="card-tag">${esc(s.nav)}</span></div>
        <div class="card-body">
          <h3>${esc(s.h1)}</h3>
          <p>${esc(s.lead.slice(0, 150))}…</p>
          <span class="card-more">Voir le secteur</span>
        </div>
      </a>`;
      }).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "secteurs.html", active: "secteurs.html",
    title: `Secteurs d'Activité — Enseigne & Signalétique par Métier | ${site.brand}`,
    desc: "Pharmacie, restaurant, cabinet médical, garage, salon, agence immobilière, BTP, industrie, commerce, collectivité, franchise, club sportif : les besoins et obligations propres à chaque secteur.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), {
      "@context": "https://schema.org", "@type": "ItemList",
      name: "Secteurs d'activité couverts",
      itemListElement: sectors.map((s, i) => ({
        "@type": "ListItem", position: i + 1, name: s.h1,
        url: site.domain.replace(/\/$/, "") + "/signaletique-" + s.slug + ".html"
      }))
    }]
  });
};
