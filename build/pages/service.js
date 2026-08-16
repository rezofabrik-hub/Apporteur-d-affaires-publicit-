const T = require("../lib/tpl");
const { site, services, esc, attr, img, heroImg } = T;

const slugify = (s) => s.toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function table(t) {
  return `<div class="table-wrap"><table>
<thead><tr>${t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
<tbody>${t.rows.map((r) => `<tr>${r.map((c, i) =>
    i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
</table></div>${t.foot ? `<p style="font-size:.86rem;color:var(--tx-3);margin-top:-1em">${t.foot}</p>` : ""}`;
}

module.exports = function servicePage(svc, cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Nos métiers", url: "index.html#metiers" },
    { name: svc.navShort, url: svc.slug + ".html" }
  ];

  const sectionsHtml = svc.sections.map((s) => {
    const id = slugify(s.h2);
    return `<h2 id="${id}">${esc(s.h2)}</h2>
${(s.p || []).map((p) => `<p>${p}</p>`).join("\n")}
${s.list ? `<ul class="checks">${s.list.map((l) => `<li>${l}</li>`).join("")}</ul>` : ""}
${s.table ? table(s.table) : ""}
${s.note ? `<div class="note"><p>${s.note}</p></div>` : ""}`;
  }).join("\n");

  const toc = `<nav class="toc" aria-label="Sommaire">
<h2>Sur cette page</h2>
<ol>
${svc.sections.map((s) => `<li><a href="#${slugify(s.h2)}">${esc(s.h2)}</a></li>`).join("")}
<li><a href="#prestations">Toutes nos prestations ${esc(svc.navShort.toLowerCase())}</a></li>
<li><a href="#faq">Questions fréquentes</a></li>
</ol></nav>`;

  const related = services.filter((s) => (svc.related || []).includes(s.slug));

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(svc.topic, 1, svc.h1)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(svc.eyebrow)}</span>
    <h1>${esc(svc.h1)}</h1>
    <p class="lead">${esc(svc.lead)}</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?prestation=${encodeURIComponent(svc.navShort)}">Demander un devis gratuit</a>
      <a class="btn btn-ghost btn-lg" href="#prestations">Voir les prestations</a>
    </div>
    <div class="pill-row">
      ${svc.keywords.slice(0, 8).map((k) => `<span class="pill">${esc(k)}</span>`).join("")}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        ${toc}
        ${svc.intro.map((p) => `<p class="lead" style="color:var(--tx-2)">${p}</p>`).join("")}
        ${sectionsHtml}
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet ${esc(svc.navShort.toLowerCase())} ?</h3>
          <p>Décrivez-le en deux minutes. Nous consultons pour vous les professionnels équipés
          pour ce type de travail, près de chez vous.</p>
          <a class="btn btn-primary btn-block" href="devis.html?prestation=${encodeURIComponent(svc.navShort)}">Demander un devis</a>
          <p style="margin-top:16px;font-size:.86rem">Ou par téléphone :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a>
          </p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Métiers liés</h4>
          <ul class="link-list">
            ${related.map((r) => `<li><a href="${r.slug}.html">${esc(r.navShort)}</a></li>`).join("")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2" id="prestations">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Prestations</span>
      <h2>Tout ce que couvre le réseau en ${esc(svc.navShort.toLowerCase())}</h2>
      <p class="lead">Chaque prestation ci-dessous est réalisée par des entreprises qui en ont l'outil
      de production et l'habitude — pas par un intermédiaire qui la sous-traite au moins-disant.</p>
    </div>
    <div class="grid g-3">
      ${svc.sub.map((s, i) => `<div class="tile">
        <span class="tile-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></span>
        <h3>${esc(s.t)}</h3>
        <p>${esc(s.d)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">En images</span>
      <h2>${esc(svc.navShort)} : exemples de réalisations</h2>
    </div>
    <div class="gal">
      ${[svc.topic].concat(svc.topicAlt || []).slice(0, 4).map((tp, i) =>
        [1, 2, 3].map((n) => `<figure>${img(tp, n, svc.navShort + " — exemple de réalisation " + (i * 3 + n))}</figure>`).join("")
      ).join("").slice(0, 100000)}
    </div>
  </div>
</section>

<section class="sec bg-3" id="faq">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Questions fréquentes</span>
        <h2>${esc(svc.navShort)} : vos questions</h2>
        <div style="margin-top:30px">${T.faqBlock(svc.faq)}</div>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Nos villes d'intervention</h3>
          <p style="font-size:.88rem">Le réseau couvre l'ensemble du territoire. Quelques villes où nous
          traitons régulièrement des projets ${esc(svc.navShort.toLowerCase())} :</p>
          <ul class="link-list">
            ${cities.slice(0, 8).map((c) => `<li><a href="enseigne-signaletique-${c.slug}.html">${esc(c.name)}</a></li>`).join("")}
          </ul>
          <a class="btn btn-ghost btn-block btn-sm" style="margin-top:16px" href="villes.html">Toutes les villes</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Pour aller plus loin</span>
      <h2>Les métiers qui complètent votre projet</h2>
    </div>
    <div class="grid g-4">${T.serviceCards(related)}</div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">${T.ctaDouble()}</div>
</section>

<section class="sec-tight">
  <div class="wrap">${T.keywordCloud(svc.keywords, "Mots-clés " + svc.navShort.toLowerCase())}</div>
</section>`;

  return T.page({
    file: svc.slug + ".html",
    active: svc.slug + ".html",
    title: svc.title + " | " + site.brand,
    desc: svc.desc,
    ogImage: (T.pick(svc.topic, 1) || { name: "hero-1" }).name + "-lg.jpg",
    body,
    cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: svc.nav, description: svc.desc, serviceType: svc.navShort,
        provider: { "@type": "Organization", name: site.brand, url: site.domain },
        areaServed: { "@type": "Country", name: "France" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: svc.nav,
          itemListElement: svc.sub.map((s) => ({
            "@type": "Offer", itemOffered: { "@type": "Service", name: s.t, description: s.d }
          }))
        }
      },
      T.faqSchema(svc.faq)
    ]
  });
};
