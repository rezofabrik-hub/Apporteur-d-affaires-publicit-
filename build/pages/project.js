const T = require("../lib/tpl");
const { site, services, esc, attr, img, heroImg } = T;

const INFO_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

const ILLUS_NOTE = `<div class="illus-note">${INFO_SVG}<span><strong>Projet type.</strong>
Cette fiche décrit un cas représentatif des chantiers que le réseau traite, avec ses contraintes
techniques et ses solutions réelles. Les photographies qui l'illustrent sont des images libres de
droit, et non des clichés de ce chantier précis. Les réalisations de nos partenaires remplacent
progressivement ces exemples au fur et à mesure de leur publication.</span></div>`;

/* ------------------------------------------------------------- fiche projet */
module.exports = function projectPage(pr, cities, projects) {
  const file = "realisation-" + pr.slug + ".html";
  const svc = services.find((s) => s.slug === pr.service);
  const city = cities.find((c) => c.slug === pr.city);
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Réalisations", url: "realisations.html" },
    { name: pr.title, url: file }
  ];

  const related = projects.filter((p) =>
    p.slug !== pr.slug && (p.service === pr.service || p.city === pr.city)).slice(0, 4);

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(pr.topic, pr.imgs[0], pr.title)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(svc ? svc.navShort : "Réalisation")} · ${esc(city ? city.name : "France")}</span>
    <h1>${esc(pr.title)}</h1>
    <p class="lead">${esc(pr.context)}</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?prestation=${encodeURIComponent(svc ? svc.navShort : "")}&amp;ville=${encodeURIComponent(city ? city.name : "")}">Un projet similaire ? Demander un devis</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <dl class="proj-facts">
          <div><dt>Métier</dt><dd>${esc(svc ? svc.navShort : "—")}</dd></div>
          <div><dt>Ville</dt><dd>${esc(city ? city.name : "—")}${city ? " (" + esc(city.dept) + ")" : ""}</dd></div>
          <div><dt>Budget</dt><dd>${esc(pr.budget)}</dd></div>
          <div><dt>Délai</dt><dd>${esc(pr.duration)}</dd></div>
        </dl>

        ${pr.illustration === false ? "" : ILLUS_NOTE}

        <h2 id="contexte">Le contexte</h2>
        <p>${esc(pr.context)}</p>

        <h2 id="contrainte">La contrainte principale</h2>
        <p>${esc(pr.challenge)}</p>

        <h2 id="solution">La solution retenue</h2>
        <p>${esc(pr.solution)}</p>

        <div class="table-wrap"><table>
          <thead><tr><th scope="col">Caractéristique</th><th scope="col">Détail</th></tr></thead>
          <tbody>${pr.facts.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody>
        </table></div>

        <h2 id="resultat">Le résultat</h2>
        <p>${esc(pr.result)}</p>

        <h2 id="images">En images</h2>
        <div class="gal">
          ${pr.imgs.map((n, i) => `<figure>${img(pr.topic, n, pr.title + " — vue " + (i + 1))}</figure>`).join("")}
        </div>
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Un projet comparable ?</h3>
          <p>Décrivez-le en deux minutes. Nous le confions à des professionnels équipés pour ce type
          de chantier, près de chez vous.</p>
          <a class="btn btn-primary btn-block" href="devis.html?prestation=${encodeURIComponent(svc ? svc.navShort : "")}">Demander un devis</a>
          <p style="margin-top:16px;font-size:.86rem">Ou par téléphone :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">À voir aussi</h4>
          <ul class="link-list">
            ${svc ? `<li><a href="${svc.slug}.html">${esc(svc.navShort)}</a></li>` : ""}
            ${city ? `<li><a href="enseigne-signaletique-${city.slug}.html">Nos projets à ${esc(city.name)}</a></li>` : ""}
            ${svc && city ? `<li><a href="${svc.slug}-${city.slug}.html">${esc(svc.navShort)} à ${esc(city.name)}</a></li>` : ""}
            <li><a href="tarifs.html">Guide des prix</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${related.length ? `<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Dans le même esprit</span>
    <h2>D'autres projets du réseau</h2></div>
    <div class="grid g-4">
      ${related.map((p) => {
        const s2 = services.find((x) => x.slug === p.service);
        const c2 = cities.find((x) => x.slug === p.city);
        return `<a class="card card-link" href="realisation-${p.slug}.html">
          <div class="card-media">${img(p.topic, p.imgs[0], p.title)}<span class="card-tag">${esc(s2 ? s2.navShort : "")}</span></div>
          <div class="card-body"><h3>${esc(p.title)}</h3>
          <p>${esc(c2 ? c2.name : "")} · ${esc(p.budget)}</p>
          <span class="card-more">Voir</span></div></a>`;
      }).join("")}
    </div>
  </div>
</section>` : ""}

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file,
    title: `${pr.title} — ${city ? city.name : "France"} | ${site.brand}`,
    desc: `${pr.title} à ${city ? city.name : "France"} : contexte, contrainte technique, solution retenue et budget (${pr.budget}). Un projet comparable ? Devis gratuit sous 48 h.`,
    ogImage: (T.pick(pr.topic, pr.imgs[0]) || { name: "hero-1" }).name + "-lg.jpg",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "CreativeWork",
        name: pr.title, abstract: pr.context, text: pr.solution,
        dateCreated: pr.year,
        about: svc ? svc.nav : "Communication visuelle",
        locationCreated: city ? { "@type": "Place", name: city.name,
          address: { "@type": "PostalAddress", addressLocality: city.name,
            postalCode: city.cp, addressCountry: "FR" } } : undefined,
        creator: { "@type": "Organization", name: site.brand, url: site.domain }
      }
    ]
  });
};

/* --------------------------------------------------------------- sommaire */
module.exports.index = function projectsIndex(projects, cities) {
  const crumbItems = [{ name: "Accueil", url: "index.html" }, { name: "Réalisations", url: "realisations.html" }];
  const usedServices = services.filter((s) => projects.some((p) => p.service === s.slug));

  const cards = projects.map((p) => {
    const s2 = services.find((x) => x.slug === p.service);
    const c2 = cities.find((x) => x.slug === p.city);
    return `<a class="card card-link proj" href="realisation-${p.slug}.html"
      data-service="${attr(p.service)}" data-city="${attr(p.city)}">
      <div class="card-media">${img(p.topic, p.imgs[0], p.title)}<span class="card-tag">${esc(s2 ? s2.navShort : "")}</span></div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.challenge.slice(0, 120))}…</p>
        <div class="proj-meta">
          <span>📍 ${esc(c2 ? c2.name : "")}</span>
          <span>💶 ${esc(p.budget)}</span>
          <span>⏱ ${esc(p.duration)}</span>
        </div>
        <span class="card-more">Voir le projet</span>
      </div>
    </a>`;
  }).join("");

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("gravure", 2, "Fabrication d'enseigne en atelier")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Réalisations</span>
    <h1>Des projets détaillés, contraintes et budgets compris</h1>
    <p class="lead">Chaque fiche décrit un chantier de bout en bout : le contexte, la contrainte
    technique qui a orienté les choix, la solution retenue et le budget réel. C'est ce qui vous permet
    de situer votre propre projet avant même de demander un devis.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="illus-note" style="margin-bottom:30px">${INFO_SVG}<span><strong>Le réseau démarre.</strong>
    Les fiches ci-dessous sont des <strong>projets types</strong> : les contraintes techniques, les
    solutions et les budgets sont ceux du métier, mais les photographies sont des images libres de
    droit et non des clichés de ces chantiers. Elles sont remplacées au fur et à mesure par les
    réalisations photographiées de nos partenaires. Nous préférons le dire que le laisser croire.</span></div>

    <div class="proj-filters" role="group" aria-label="Filtrer par métier">
      <button type="button" data-filter="all" aria-pressed="true">Tous les projets</button>
      ${usedServices.map((s) => `<button type="button" data-filter="${attr(s.slug)}" aria-pressed="false">${esc(s.navShort)}</button>`).join("")}
    </div>
    <p class="proj-empty">Aucun projet dans cette catégorie pour l'instant.
      <a href="devis.html">Décrivez le vôtre</a> — il pourrait être le premier.</p>

    <div class="grid g-3" id="proj-grid">${cards}</div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Partenaires</span>
        <h2>Vos chantiers ont leur place ici</h2>
        <p class="lead">Chaque réalisation publiée est une page indexée qui travaille pour vous
        et pour le réseau. Nos partenaires nous transmettent leurs photos de chantier ; nous rédigeons
        la fiche, la publions et vous créditons.</p>
        <ul class="checks">
          <li>Votre entreprise citée et liée depuis la fiche</li>
          <li>Une page de plus positionnée sur votre ville et votre métier</li>
          <li>Rédaction technique prise en charge par nos soins</li>
          <li>Vous validez avant publication</li>
        </ul>
        <div class="btns" style="margin-top:26px">
          <a class="btn btn-pro btn-lg" href="partenaires.html">Rejoindre le réseau</a>
        </div>
      </div>
      <div class="gal">
        <figure>${img("atelier", 1, "Atelier de fabrication")}</figure>
        <figure>${img("nacelle", 4, "Pose en nacelle")}</figure>
        <figure>${img("gravure", 1, "Découpe numérique")}</figure>
        <figure>${img("impression", 2, "Impression grand format")}</figure>
      </div>
    </div>
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>`;

  return T.page({
    file: "realisations.html", active: "realisations.html",
    title: `Réalisations — Enseignes, Signalétique, Covering | ${site.brand}`,
    desc: "Projets détaillés du réseau : contexte, contrainte technique, solution retenue et budget réel, par métier et par ville. Situez votre projet avant de demander un devis.",
    body, cities,
    schema: [T.crumbSchema(crumbItems), {
      "@context": "https://schema.org", "@type": "ItemList",
      name: "Réalisations du réseau",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem", position: i + 1, name: p.title,
        url: site.domain.replace(/\/$/, "") + "/realisation-" + p.slug + ".html"
      }))
    }]
  });
};
