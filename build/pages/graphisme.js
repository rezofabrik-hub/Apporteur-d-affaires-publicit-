/* =========================================================================
   Pages graphisme — logo, charte graphique, choix d'un graphiste
   -------------------------------------------------------------------------
   Un seul gabarit pour les trois : elles partagent la structure (blocs
   argumentés, grille de budget, questions fréquentes, renvois croisés) et
   se distinguent par leur contenu, qui vit dans build/data/graphisme.js.

   Ces pages ne sont pas déclinées par ville. C'est délibéré : un logo se
   conçoit à distance, « création de logo à Vesoul » n'est pas une requête,
   et fabriquer des centaines de variantes locales sur un métier sans
   ancrage local produirait exactement les pages satellites que le reste du
   site s'applique à éviter.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, img, heroImg } = T;
const PAGES = require("../data/graphisme");

function page(p, cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Maquette & création graphique", url: "maquette-creation-graphique.html" },
    { name: p.nav, url: p.slug + ".html" }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(p.topic, 2, p.nav)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(p.nav)}</span>
    <h1>${esc(p.h1)}</h1>
    <p class="lead">${esc(p.lead)}</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html">Décrire mon projet</a>
      <a class="btn btn-ghost btn-lg" href="#budget">Voir les budgets</a>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        ${p.blocs.map((b, i) => `
        <h2 id="b${i + 1}">${esc(b.titre)}</h2>
        <p>${esc(b.texte)}</p>
        <ul class="checks">${b.liste.map((x) => `<li>${x}</li>`).join("")}</ul>`).join("\n")}

        <h2 id="budget">${esc(p.budget.head[0] === "Profil" ? "Ce que coûte un graphiste" : "Budgets indicatifs")}</h2>
        <div class="table-wrap"><table>
          <thead><tr>${p.budget.head.map((h, i) =>
            `<th scope="col"${i === 1 ? ' style="color:var(--signal-600)"' : ""}>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${p.budget.rows.map((r) => `<tr>${r.map((c, i) => i === 0
            ? `<th scope="row">${esc(c)}</th>`
            : `<td${i === 1 ? ' style="font-weight:600"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table></div>
        <div class="note"><p>${esc(p.budget.note)}</p></div>
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet en tête ?</h3>
          <p>Décrivez votre besoin en deux minutes. Nous transmettons le même brief à deux ou trois
          professionnels vérifiés, et vous recevez des propositions réellement comparables.</p>
          <a class="btn btn-primary btn-block" href="devis.html">Demander un devis gratuit</a>
          <p style="margin-top:18px;font-size:.86rem">Ou par téléphone :<br>
          <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
          <h3 style="margin-top:26px;font-size:1rem">À lire aussi</h3>
          <ul class="link-list">
            ${p.liens.map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join("")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Pour aller plus loin</span>
      <h2>Les autres volets du métier</h2>
    </div>
    <div class="grid g-3">
      ${p.liens.map(([h, t, d]) => `<a class="card card-link" href="${h}">
        <div class="card-body"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>
      </a>`).join("")}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow">
    <div class="sec-head">
      <span class="eyebrow">Questions fréquentes</span>
      <h2>Ce que l'on nous demande le plus souvent</h2>
    </div>
    ${T.faqBlock(p.faq)}
  </div>
</section>

<section class="sec bg-2"><div class="wrap">${T.ctaDouble()}</div></section>

<section class="sec-tight">
  <div class="wrap">${T.keywordCloud(p.keywords, "Recherches associées")}</div>
</section>`;

  return T.page({
    file: p.slug + ".html",
    active: p.slug + ".html",
    title: `${p.title} | ${site.brand}`,
    desc: p.desc,
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: p.nav,
        serviceType: p.h1,
        description: p.desc,
        provider: { "@id": site.domain.replace(/\/$/, "") + "/#organization" },
        areaServed: { "@type": "Country", name: "France" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR",
          description: "Mise en relation gratuite et sans engagement pour le client." }
      },
      T.faqSchema(p.faq)
    ]
  });
}

module.exports = { PAGES, page };
