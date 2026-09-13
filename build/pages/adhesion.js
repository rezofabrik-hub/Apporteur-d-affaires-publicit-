/* =========================================================================
   Page « Pourquoi adhérer »
   -------------------------------------------------------------------------
   Page de conviction, pas de tarif : elle précède la page partenaires dans
   le parcours et s'arrête juste avant le questionnaire. Toute la matière
   vient de build/data/adhesion.js — ici on ne fait que la mettre en forme.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, heroImg } = T;
const A = require("../data/adhesion");
const P = require("../data/partnership");

module.exports = function adhesionPage(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Partenaires du secteur", url: "partenaires.html" },
    { name: A.nav, url: A.slug + ".html" }
  ];

  const D = A.double;
  const sensBloc = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(D.eyebrow)}</span>
      <h2>${esc(D.titre)}</h2>
      <p class="lead">${esc(D.lead)}</p>
    </div>
    <div class="grid g-2">
      ${D.sens.map((s) => `<article class="card sens-card">
        <div class="card-body">
          <span class="sens-fleche" aria-hidden="true">${s.fleche}</span>
          <h3>${esc(s.titre)}</h3>
          <p>${esc(s.texte)}</p>
          <p class="sens-contre">${esc(s.contre)}</p>
        </div>
      </article>`).join("")}
    </div>
    <div class="note note-fort"><p>${esc(D.conclusion)}</p></div>
  </div>
</section>`;

  const Pr = A.produit;
  const produitBloc = `
<section class="sec bg-2">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <span class="eyebrow">${esc(Pr.eyebrow)}</span>
        <h2>${esc(Pr.titre)}</h2>
        <p class="lead">${esc(Pr.lead)}</p>
        <p>${esc(Pr.texte)}</p>
        <ul class="checks">${Pr.contenu.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <div class="note"><p>${esc(Pr.note)}</p></div>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>${esc(P.garantie.titre)}</h3>
          <p>${esc(P.garantie.texte)}</p>
          <ul class="checks checks-sm">${P.garantie.conditions.map((c) =>
            `<li>${esc(c)}</li>`).join("")}</ul>
          <a class="btn btn-pro btn-block" href="professionnels.html">Remplir le questionnaire</a>
        </div>
      </aside>
    </div>
  </div>
</section>`;

  const C = A.calcul;
  const calculBloc = `
<section class="sec" id="calcul">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(C.eyebrow)}</span>
      <h2>${esc(C.titre)}</h2>
      <p class="lead">${esc(C.lead)}</p>
    </div>
    <div class="split">
      <div class="table-wrap"><table class="table-calcul">
        <tbody>${C.lignes.map((l, i) => `<tr${i === C.lignes.length - 1 ? ' class="ligne-fin"' : ""}>
          <th scope="row">${esc(l[0])}</th><td>${esc(l[1])}</td></tr>`).join("")}</tbody>
      </table></div>
      <div>
        <div class="note"><p>${esc(C.note)}</p></div>
        <div class="note warn"><p>${esc(C.honnete)}</p></div>
      </div>
    </div>
  </div>
</section>`;

  const L = A.liberte;
  const liberteBloc = `
<section class="sec bg-3">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(L.eyebrow)}</span>
      <h2>${esc(L.titre)}</h2>
      <p class="lead">${esc(L.lead)}</p>
    </div>
    <div class="grid g-3">
      ${L.points.map(([t, d]) => `<div class="card"><div class="card-body">
        <h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join("")}
    </div>
  </div>
</section>`;

  const F = A.face;
  const faceBloc = `
<section class="sec" id="comparatif">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${esc(F.eyebrow)}</span>
      <h2>${esc(F.titre)}</h2>
      <p class="lead">${esc(F.lead)}</p>
    </div>
    <div class="table-wrap"><table>
      <thead><tr>${F.head.map((h, i) =>
        `<th scope="col"${i === 1 ? ' class="col-nous"' : ""}>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${F.rows.map((r) => `<tr>${r.map((c, i) => i === 0
        ? `<th scope="row">${esc(c)}</th>`
        : `<td${i === 1 ? ' class="col-nous"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <div class="note"><p>${esc(F.note)}</p></div>
  </div>
</section>`;

  const S = A.suite;
  const suiteBloc = `
<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">La marche à suivre</span>
      <h2>${esc(S.titre)}</h2>
    </div>
    <ol class="etapes">
      ${S.etapes.map(([t, d], i) => `<li>
        <span class="etape-n">${i + 1}</span>
        <div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>
      </li>`).join("")}
    </ol>
    <div class="btns" style="justify-content:center;margin-top:30px">
      <a class="btn btn-pro btn-lg" href="professionnels.html">Remplir le questionnaire</a>
      <a class="btn btn-ghost btn-lg" href="partenaires.html">Voir les formules et les tarifs</a>
    </div>
  </div>
</section>`;

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("equipe-pro", 2, A.nav)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(A.nav)}</span>
    <h1>${esc(A.h1)}</h1>
    <p class="lead">${esc(A.lead)}</p>
    <div class="btns">
      <a class="btn btn-pro btn-lg" href="professionnels.html">Remplir le questionnaire</a>
      <a class="btn btn-ghost btn-lg" href="#comparatif">Voir le comparatif</a>
    </div>
  </div>
</section>

${sensBloc}
${produitBloc}
${calculBloc}
${liberteBloc}
${faceBloc}

<section class="sec bg-2">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Les objections que l'on nous fait</span>
        <h2>Ce qu'un professionnel demande avant de signer</h2>
        <div style="margin-top:30px">${T.faqBlock(A.objections)}</div>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>${esc(P.launch.label)}</h3>
          <p>${esc(P.launch.sub)}</p>
          <ul class="checks checks-sm">${P.launch.conditions.slice(0, 4).map((c) =>
            `<li>${esc(c)}</li>`).join("")}</ul>
          <a class="btn btn-pro btn-block" href="partenaires.html">Voir les formules</a>
          <a class="btn btn-ghost btn-block" href="entraide-partenaires.html">L'entraide entre partenaires</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${suiteBloc}`;

  return T.page({
    file: A.slug + ".html",
    active: "partenaires.html",
    title: A.title + " | " + site.brand,
    desc: A.desc,
    body,
    cities,
    schema: [
      T.crumbSchema(crumbItems),
      T.faqSchema(A.objections)
    ]
  });
};
