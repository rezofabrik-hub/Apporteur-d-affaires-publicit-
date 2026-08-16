const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;

/* Contraintes réelles par région : elles rendent chaque page utile et différente. */
const REGION_NOTE = {
  "Occitanie": "Le sud méditerranéen cumule un ensoleillement très élevé et des vents forts (tramontane, mistral). Deux conséquences concrètes : tout visuel extérieur doit être laminé anti-UV sous peine de virer en dix-huit mois, et la prise au vent des enseignes drapeau et totems doit être calculée, pas estimée.",
  "Provence-Alpes-Côte d'Azur": "Mistral, sel marin et rayonnement solaire intense forment ici un trio exigeant. L'inox 316 s'impose pour toute visserie extérieure à proximité du littoral, et les impressions doivent être protégées par un laminat anti-UV de qualité.",
  "Île-de-France": "La densité urbaine et le poids des règlements locaux de publicité rendent le volet administratif déterminant. À Paris et en petite couronne, l'instruction des autorisations d'enseigne est stricte et les interventions en nacelle demandent presque toujours un arrêté de circulation.",
  "Auvergne-Rhône-Alpes": "Les écarts thermiques marqués et le gel affectent l'étanchéité des percements et la tenue des adhésifs. La pose se planifie hors période de gel, et les fixations doivent tolérer la dilatation différentielle des supports.",
  "Nouvelle-Aquitaine": "Humidité atlantique, pluie battante et embruns sur la façade océanique : l'étanchéité des ancrages et la qualité de la laque conditionnent la durée de vie d'une enseigne bien plus que son prix d'achat.",
  "Hauts-de-France": "Pluie fréquente, vent d'ouest soutenu et faible ensoleillement hivernal. L'éclairage prend ici une importance particulière : une enseigne non lumineuse est invisible une grande partie de la journée entre novembre et février.",
  "Grand Est": "Le gel prolongé et les cycles gel-dégel sollicitent fortement les fixations et les joints. Les poses hivernales exigent des adhésifs à basse température et une préparation de support irréprochable.",
  "Bretagne": "Vent, pluie et air salin sur tout le littoral. L'inox 316 et une laque de qualité marine ne sont pas du luxe : c'est ce qui sépare une enseigne qui tient dix ans d'une enseigne qui pique en trois.",
  "Pays de la Loire": "Climat océanique doux mais humide, avec des épisodes venteux réguliers. L'attention porte surtout sur l'étanchéité des percements et sur la qualité du traitement anticorrosion des structures.",
  "Normandie": "Humidité constante et embruns sur la côte. Les supports en acier zingué tachent les façades claires en une saison : l'inox est le seul choix durable en extérieur.",
  "Bourgogne-Franche-Comté": "Hivers froids et étés chauds : l'amplitude thermique impose des fixations tolérant la dilatation et des adhésifs polymères plutôt que monomères.",
  "Centre-Val de Loire": "Nombreux secteurs sauvegardés et abords de monuments historiques : l'avis de l'Architecte des Bâtiments de France est fréquent, et il oriente presque toujours vers des lettres découpées plutôt que vers des caissons pleins."
};

/* Rotation des angles rédactionnels pour éviter les pages jumelles. */
const ANGLES = [
  {
    h: "Ce que change une bonne enseigne dans une ville comme %V",
    p: "Le premier travail n'est pas esthétique, il est géographique. Une devanture en rue piétonne se lit à une dizaine de mètres et joue sur la finesse ; une façade en bord d'axe routier se lit à cent mètres et joue sur la hauteur de lettre et le contraste. À %V, les deux situations coexistent souvent à quelques centaines de mètres d'écart, et elles n'appellent pas du tout la même enseigne."
  },
  {
    h: "Centre-ville ou zone d'activité : deux logiques à %V",
    p: "En cœur de ville, la contrainte dominante est réglementaire : format, matériaux, éclairage et parfois couleurs sont encadrés. En périphérie, la contrainte devient concurrentielle : votre enseigne est vue en même temps que dix autres, à vitesse constante. Le budget se justifie différemment dans chaque cas, et un professionnel sérieux vous le dira avant de chiffrer."
  },
  {
    h: "Rénover ou remplacer son enseigne à %V",
    p: "Beaucoup de commerçants de %V reprennent un local déjà équipé. La question n'est alors pas « quelle enseigne ? » mais « que peut-on garder ? ». Un caisson en bon état se rénove pour 40 à 60 % du prix d'un neuf : face plexiglas remplacée, passage en LED, laque du corps reprise. Encore faut-il que quelqu'un monte vérifier les fixations avant de s'engager."
  },
  {
    h: "Déployer une identité sur plusieurs points de vente à %V",
    p: "Pour un réseau, une franchise ou une entreprise multi-sites, l'enjeu à %V est la reproductibilité : mêmes matériaux, mêmes couleurs, même rendu nocturne d'un site à l'autre. Cela suppose une charte technique — pas seulement graphique — et des ateliers capables de travailler sur gabarit commun."
  }
];

module.exports = function cityPage(city, cities, index) {
  const angle = ANGLES[index % ANGLES.length];
  const regionNote = REGION_NOTE[city.region] ||
    "Chaque territoire a ses contraintes de façade, de climat et de réglementation locale : c'est précisément ce que connaissent les professionnels de proximité du réseau.";

  const file = "enseigne-signaletique-" + city.slug + ".html";
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Villes couvertes", url: "villes.html" },
    { name: city.name, url: file }
  ];

  const heroTopic = city.pilot ? "perpignan" : (index % 2 ? "commerce" : "hero");
  const heroIdx = city.pilot ? 4 : (index % 6) + 1;

  const nearby = (city.neighbors || []).map((n) => {
    const match = cities.find((c) => c.name.toLowerCase() === n.toLowerCase());
    return match
      ? `<a class="tag" href="enseigne-signaletique-${match.slug}.html">${esc(n)}</a>`
      : `<span class="tag">${esc(n)}</span>`;
  }).join("");

  const localFaq = [
    {
      q: `Intervenez-vous dans tout ${city.name} et ses environs ?`,
      a: `Oui. Le réseau couvre ${city.name} (${city.cp}) ainsi que l'ensemble des communes voisines du département ${city.dept} — ${(city.neighbors || []).slice(0, 5).join(", ")} et au-delà. Les professionnels sollicités sont choisis pour leur proximité : c'est ce qui garantit un délai de pose court et un service après-vente réactif.`
    },
    {
      q: `Faut-il une autorisation pour poser une enseigne à ${city.name} ?`,
      a: `Dans la plupart des cas, oui : une autorisation préalable d'enseigne doit être déposée en mairie de ${city.name} dès lors que la commune dispose d'un règlement local de publicité, ou que le local se trouve aux abords d'un monument historique ou en site patrimonial remarquable. Le dossier repose sur le formulaire Cerfa n°14798 accompagné d'un plan de façade et d'une insertion photographique. Les enseignistes du réseau montent ce dossier pour vous.`
    },
    {
      q: `Combien coûte une enseigne à ${city.name} ?`,
      a: `Les ordres de grandeur sont les mêmes que sur le reste du territoire : 150 à 600 € pour un lettrage de vitrine, 900 à 2 200 € pour un caisson lumineux LED de 2 mètres, 1 800 à 6 000 € pour des lettres découpées rétro-éclairées. Ce qui varie localement, c'est la pose : hauteur d'intervention, accès nacelle et occupation du domaine public peuvent faire évoluer ce poste de 150 à plus de 1 500 €.`
    },
    {
      q: `Quel délai pour un projet à ${city.name} ?`,
      a: `Comptez 48 heures pour recevoir vos premières propositions, puis 2 à 4 semaines entre la commande et la pose pour une enseigne standard. Les projets nécessitant une autorisation préalable demandent 6 à 10 semaines, l'instruction en mairie courant en parallèle de la fabrication.`
    }
  ];

  const pilotBlock = city.pilot && city.specifics ? `
<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="specificites">Les contraintes propres à ${esc(city.name)}</h2>
        ${city.specifics.map((p) => `<p>${p}</p>`).join("\n")}
        <div class="note"><p><strong>En pratique :</strong> avant de valider une enseigne à ${esc(city.name)},
        vérifiez trois points — le local est-il en secteur protégé, la façade supporte-t-elle la prise au vent
        prévue, et la visserie est-elle prévue en inox 316 ? Ces trois questions évitent l'essentiel des
        déconvenues locales.</p></div>

        <h2 id="ou">Où nous intervenons à ${esc(city.name)}</h2>
        <p>Le réseau traite des projets dans l'ensemble des quartiers de ${esc(city.name)}, du centre ancien
        aux zones d'activité périphériques, ainsi que dans les communes de l'agglomération.</p>
        <h3>Quartiers</h3>
        <div class="tags">${(city.quartiers || []).map((q) => `<span class="tag">${esc(q)}</span>`).join("")}</div>
        <h3 style="margin-top:1.6em">Zones d'activité et pôles économiques</h3>
        <div class="tags">${(city.zones || []).map((z) => `<span class="tag">${esc(z)}</span>`).join("")}</div>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Projet à ${esc(city.name)} ?</h3>
          <p>Nous connaissons les contraintes locales : secteur sauvegardé, tramontane, air salin,
          règlement local de publicité.</p>
          <a class="btn btn-primary btn-block" href="devis.html?ville=${encodeURIComponent(city.name)}">Demander un devis</a>
        </div>
      </aside>
    </div>
  </div>
</section>` : "";

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(heroTopic, heroIdx, "Rue commerçante à " + city.name)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(city.name)} · ${esc(city.dept)} ${esc(city.deptName)}</span>
    <h1>Enseigne, signalétique et publicité à ${esc(city.name)}</h1>
    <p class="lead">Enseigne lumineuse, signalétique, covering de véhicule, impression grand format
    ou objets publicitaires à ${esc(city.name)} (${esc(city.cp)}) : décrivez votre projet, nous le confions
    à des professionnels vérifiés du ${esc(city.deptName)}. Devis comparables sous 48 heures, gratuits
    et sans engagement.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?ville=${encodeURIComponent(city.name)}">Mon devis à ${esc(city.name)}</a>
      <a class="btn btn-ghost btn-lg" href="#prestations">Nos prestations sur place</a>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">${T.trustBar()}</div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">${esc(city.region)}</span>
        <h2>${esc(angle.h.replace(/%V/g, city.name))}</h2>
        <p class="lead">${esc(angle.p.replace(/%V/g, city.name))}</p>
        <p>${esc(city.intro || `Avec environ ${city.pop} habitants, ${city.name} concentre un tissu commercial de centre-ville et des zones d'activité périphériques qui n'obéissent pas aux mêmes règles de visibilité. Le réseau y intervient sur les deux terrains.`)}</p>
        <div class="note"><p><strong>Contraintes régionales :</strong> ${esc(regionNote)}</p></div>
      </div>
      <div>
        <figure style="margin:0;border-radius:16px;overflow:hidden;border:1px solid var(--line)">
          ${img(index % 2 ? "enseigne" : "commerce", (index % 4) + 1, "Devanture commerciale à " + city.name, { sizes: "(max-width: 780px) 100vw, 45vw" })}
        </figure>
        <div class="trust" style="margin-top:12px;grid-template-columns:1fr 1fr">
          <div><b>${esc(city.dept)}</b><span>${esc(city.deptName)}</span></div>
          <div><b>${esc(city.cp)}</b><span>Code postal principal</span></div>
          <div><b>${esc(city.pop)}</b><span>habitants (environ)</span></div>
          <div><b>${esc(city.region)}</b><span>Région</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

${pilotBlock}

<section class="sec bg-2" id="prestations">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Prestations à ${esc(city.name)}</span>
      <h2>Tous les métiers de la communication visuelle, sur place</h2>
      <p class="lead">Chaque demande est orientée vers l'atelier ou le poseur dont l'équipement correspond
      au projet — fabricant d'enseignes, imprimeur grand format, poseur habilité nacelle ou graphiste.</p>
    </div>
    <div class="grid g-4">
      ${services.map((s) => `<a class="card card-link" href="${s.slug}.html">
        <div class="card-media">${img(s.topic, 2, s.navShort + " à " + city.name)}<span class="card-tag">${esc(s.navShort)}</span></div>
        <div class="card-body">
          <h3>${esc(s.navShort)} à ${esc(city.name)}</h3>
          <p>${esc(s.navDesc)}.</p>
          <span class="card-more">Découvrir</span>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>

${!city.pilot ? `<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="ou">Où nous intervenons à ${esc(city.name)}</h2>
        <p>Le réseau traite des projets dans l'ensemble des quartiers de ${esc(city.name)} et dans les
        zones d'activité de l'agglomération. Les professionnels sollicités sont choisis pour leur proximité,
        ce qui raccourcit les délais de pose et rend le service après-vente réellement praticable.</p>
        <h3>Quartiers couverts</h3>
        <div class="tags">${(city.quartiers || []).map((q) => `<span class="tag">${esc(q)}</span>`).join("")}</div>
        <h3 style="margin-top:1.6em">Zones d'activité et pôles économiques</h3>
        <div class="tags">${(city.zones || []).map((z) => `<span class="tag">${esc(z)}</span>`).join("")}</div>

        <h2 id="qui">Qui fait appel à nous à ${esc(city.name)}</h2>
        <ul class="checks">
          <li><strong>Commerces de centre-ville</strong> — devanture, enseigne drapeau, vitrophanie, chevalet</li>
          <li><strong>Zones commerciales et retail parks</strong> — caisson lumineux, totem d'entrée, jalonnement</li>
          <li><strong>Artisans et entreprises du bâtiment</strong> — marquage de véhicules, panneaux de chantier, tenues marquées</li>
          <li><strong>Professions libérales et santé</strong> — plaques gravées, totems multi-praticiens, signalétique de cabinet</li>
          <li><strong>Industrie et logistique</strong> — signalétique de sécurité, marquage au sol, identification de zones</li>
          <li><strong>Collectivités et établissements recevant du public</strong> — signalétique directionnelle, accessibilité PMR, plans d'évacuation</li>
          <li><strong>Hôtellerie et restauration</strong> — enseigne lumineuse, néon LED, menu board, terrasse</li>
        </ul>
      </article>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Devis à ${esc(city.name)}</h3>
          <p>Deux minutes pour décrire votre projet. Réponse sous 48 heures, gratuit et sans engagement.</p>
          <a class="btn btn-primary btn-block" href="devis.html?ville=${encodeURIComponent(city.name)}">Demander un devis</a>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Métiers</h4>
          <ul class="link-list">
            ${services.slice(0, 5).map((s) => `<li><a href="${s.slug}.html">${esc(s.navShort)}</a></li>`).join("")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>` : ""}

<section class="sec bg-3">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Questions fréquentes</span>
        <h2>Enseigne et signalétique à ${esc(city.name)}</h2>
        <div style="margin-top:30px">${T.faqBlock(localFaq)}</div>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>Communes voisines</h3>
          <p style="font-size:.88rem">Nous intervenons également dans l'agglomération :</p>
          <div class="tags">${nearby}</div>
          <a class="btn btn-ghost btn-block btn-sm" style="margin-top:20px" href="villes.html">Toutes les villes couvertes</a>
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
      "enseigne " + city.name, "enseigne lumineuse " + city.name, "enseigniste " + city.name,
      "signalétique " + city.name, "covering " + city.name, "marquage véhicule " + city.name,
      "impression grand format " + city.name, "objet publicitaire " + city.name,
      "totem " + city.name, "vitrophanie " + city.name, "pose enseigne " + city.name,
      "fabricant enseigne " + city.deptName, "publicité " + city.dept
    ], "Recherches associées")}
  </div>
</section>`;

  return T.page({
    file,
    title: `Enseigne & Signalétique à ${city.name} (${city.dept}) — Devis Gratuit | ${site.brand}`,
    desc: `Enseigne lumineuse, signalétique, covering et impression à ${city.name} (${city.cp}). Recevez sous 48 h des devis d'artisans vérifiés du ${city.deptName}. Gratuit et sans engagement.`,
    body,
    cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `${site.brand} — ${city.name}`,
        description: `Mise en relation avec des professionnels de l'enseigne, de la signalétique et de la publicité par l'objet à ${city.name} et dans le ${city.deptName}.`,
        url: site.domain.replace(/\/$/, "") + "/" + file,
        email: site.email, telephone: site.phoneHref, priceRange: "€€",
        address: { "@type": "PostalAddress", addressLocality: city.name,
          postalCode: city.cp, addressRegion: city.region, addressCountry: "FR" },
        areaServed: [{ "@type": "City", name: city.name }]
          .concat((city.neighbors || []).map((n) => ({ "@type": "City", name: n }))),
        makesOffer: services.map((s) => ({
          "@type": "Offer", itemOffered: { "@type": "Service", name: `${s.navShort} à ${city.name}` }
        }))
      },
      T.faqSchema(localFaq)
    ]
  });
};
