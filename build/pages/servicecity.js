const T = require("../lib/tpl");
const { site, services, esc, img, heroImg } = T;
const FR = require("../lib/fr");  // accords des noms de département

/* Angles rédactionnels croisés : le couple (métier, ville) choisit l'angle,
   ce qui évite des pages jumelles tout en restant pertinent. */
const ANGLES = [
  {
    h: "Bien dimensionner votre projet %S à %V",
    p: "La première question n'est pas le budget, c'est la distance de lecture. À %V, un projet situé en cœur de ville et un projet en zone d'activité périphérique n'appellent ni les mêmes dimensions, ni les mêmes matériaux, ni le même mode d'éclairage. Un professionnel qui chiffre sans avoir vu la façade ou le véhicule chiffre à l'aveugle."
  },
  {
    h: "%S à %V : ce qui fait varier les devis",
    p: "Deux devis peuvent différer de 40 % pour un même projet à %V sans qu'aucun ne soit malhonnête : matériaux non référencés, pose comptée ou non, dépose de l'existant, reprise de façade, démarches administratives. C'est précisément pour cela que nous transmettons un cahier des charges identique à chaque professionnel consulté."
  },
  {
    h: "Trouver le bon prestataire %S à %V",
    p: "Tous les prestataires de %V ne fabriquent pas ce qu'ils vendent. Certains disposent d'un atelier, de machines et de poseurs ; d'autres sous-traitent l'intégralité au moins-disant, avec la perte de maîtrise et les délais que cela implique. Nous ne consultons que des entreprises dont l'outil de production correspond réellement au projet."
  },
  {
    h: "Délais et organisation d'un chantier %S à %V",
    p: "Sur un projet %S à %V, le délai réel se compose de trois blocs : la validation de la maquette, la fabrication, et la pose — à laquelle s'ajoutent, le cas échéant, deux à quatre mois d'instruction administrative qui courent en parallèle. Savoir cela à l'avance évite la mauvaise surprise à trois semaines d'une ouverture."
  },
  {
    h: "Réseau ouvert ou franchise : que change ce choix à %V ?",
    p: "À %V comme ailleurs, une agence franchisée vous oriente vers son propre atelier, son catalogue et ses fournisseurs référencés. Nous partons du problème inverse : votre projet d'abord, puis l'atelier dont la machine correspond. Sur un projet %S, cela évite le classique « ce n'est pas exactement ce que nous faisons, mais on peut s'en approcher »."
  },
  {
    h: "Ce qu'il faut vérifier dans un devis %S à %V",
    p: "Un devis %S à %V se lit sur quatre lignes que beaucoup omettent : la référence exacte des matériaux, la pose chiffrée ou renvoyée « en sus », la dépose de l'existant, et les démarches administratives. Un écart de 40 % entre deux propositions vient presque toujours de là, pas de la marge."
  },
  {
    h: "Durabilité : ce qui tient dans le temps à %V",
    p: "Le mauvais calcul le plus fréquent sur un projet %S à %V consiste à comparer deux devis au prix d'achat sans regarder la durée de vie. Entre un matériau d'entrée de gamme et une fabrication durable, l'écart initial se rattrape souvent en une seule refabrication évitée — et la différence de prix ne représente qu'une fraction du coût de la pose."
  },
  {
    h: "Un seul interlocuteur pour votre projet %S à %V",
    p: "Beaucoup de projets à %V mobilisent plusieurs métiers : une enseigne, le marquage du véhicule assorti, la vitrine et parfois le textile de l'équipe. Les faire traiter séparément revient à répéter quatre fois le même brief et à obtenir quatre rendus légèrement différents. Nous coordonnons l'ensemble depuis un cahier des charges unique."
  }
];

/* Précisions locales propres à chaque métier. */
const LOCAL_NOTE = {
  "enseignes": "À %V, deux points conditionnent le projet avant même le dessin : la commune dispose-t-elle d'un règlement local de publicité, et le local se trouve-t-il en secteur protégé ? La réponse détermine le type d'enseigne acceptable et un délai d'instruction de deux à quatre mois.",
  "signaletique": "Un plan de signalétique à %V commence par un relevé sur place : points de décision, flux réels, contraintes d'accessibilité. C'est cette étape, souvent sautée, qui évite la quasi-totalité des reprises après pose.",
  "covering-vehicule": "Le covering exige un atelier chauffé entre 18 et 25 °C et hors poussière. À %V, vérifiez ce point avant de commander : une pose en extérieur ou dans un local froid garantit bulles et décollements dans les mois qui suivent.",
  "impression-grand-format": "Pour un support extérieur à %V, le laminat anti-UV n'est pas une option : sans lui, une impression quadri perd ses rouges en dix-huit mois. Faites préciser le support et le laminat dans le devis.",
  "objets-publicitaires": "À %V comme ailleurs, les frais techniques — écran de sérigraphie, programme de broderie — ne sont facturés qu'une fois. La deuxième commande du même visuel coûte donc nettement moins cher : pensez-y en dimensionnant la première série.",
  "maquette-creation-graphique": "Un logo conçu pour l'écran n'est pas toujours fabricable en relief. Avant de lancer une enseigne à %V, faites vérifier que les tracés sont découpables et que le rendu tient en rétro-éclairage.",
  "pose-nacelle": "À %V, toute intervention en nacelle empiétant sur le trottoir ou la chaussée nécessite une autorisation d'occupation du domaine public, à demander dix à quinze jours à l'avance. Les poseurs du réseau s'en chargent.",
  "vitrophanie-plv": "Sur une vitrine à %V, gardez 40 à 50 % de surface réellement transparente. Un commerce dont on ne voit pas l'intérieur est perçu comme fermé — c'est l'erreur la plus fréquente et la plus coûteuse.",
  "decoupe-laser-cnc": "Peu d'ateliers de %V possèdent à la fois un laser et une fraiseuse numérique : celui qui n'a qu'une machine vous orientera vers ce qu'elle sait faire. Précisez la matière et l'épaisseur dans votre demande, c'est ce qui détermine le bon atelier.",
  "imprimerie": "Le tirage décide de tout : en dessous de 500 exemplaires, le numérique revient moins cher et part plus vite ; au-delà de 1 000, l'offset reprend l'avantage. Indiquez la quantité exacte dans votre demande à %V, c'est elle qui détermine vers quel imprimeur nous vous orientons.",
  "impression-3d": "Une pièce imprimée en 3D n'est pas un matériau d'extérieur : le PLA se déforme dès 55 °C et la résine jaunit aux UV. Dites-nous l'usage réel de la pièce à %V — décorative ou fonctionnelle, intérieure ou extérieure — c'est ce qui détermine la technologie.",
  "creation-site-internet": "Deux clauses protègent réellement, et leur absence explique la quasi-totalité des litiges : le nom de domaine déposé à votre nom, et les accès à l'hébergement remis par écrit. Faites-les figurer au devis avant de signer avec un prestataire de %V.",
  "referencement-naturel": "À %V, le levier le plus rapide et le moins cher n'est pas le site : c'est la fiche Google Business Profile, qui peut produire des appels en deux à huit semaines. Aucun prestataire sérieux ne vous garantira en revanche une première place."
};

module.exports = function serviceCityPage(svc, city, cities, sameServiceCities, index) {
  const file = svc.slug + "-" + city.slug + ".html";
  const S = svc.navShort;
  const V = city.name;
  const angle = ANGLES[index % ANGLES.length];
  const fill = (t) => t.replace(/%S/g, S.toLowerCase()).replace(/%V/g, V);
  const localNote = fill(LOCAL_NOTE[svc.slug] || "");

  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: S, url: svc.slug + ".html" },
    { name: V, url: file }
  ];

  const priceTable = (svc.sections.find((s) => s.table) || {}).table;

  const faq = [
    { q: `Combien coûte ${S.toLowerCase()} à ${V} ?`,
      a: `Les ordres de grandeur sont ceux du marché national ; ce qui varie localement, c'est surtout la pose — hauteur d'intervention, accès nacelle, occupation du domaine public. Vous trouverez le détail des fourchettes sur notre <a href="${svc.slug}.html">page ${S.toLowerCase()}</a> et dans le <a href="tarifs.html">guide des prix</a>. Pour un chiffrage réel, décrivez votre projet : vous recevrez 2 à 3 devis comparables sous 48 heures.` },
    { q: `Sous quel délai intervenez-vous à ${V} ?`,
      a: `Vous recevez vos premières propositions sous 48 heures. Ensuite, comptez 2 à 4 semaines entre la commande et la réalisation pour un projet standard, davantage si une autorisation préalable est nécessaire — l'instruction en mairie de ${V} courant alors en parallèle de la fabrication.` },
    { q: `Qui réalisera les travaux à ${V} ?`,
      a: `Des entreprises indépendantes ${FR.du(city.deptName)} (${city.dept}), sélectionnées parce que leur outil de production correspond à votre projet, et dont nous vérifions le SIRET, les assurances et les habilitations. Vous contractez directement avec celle que vous retenez ; nous n'intervenons pas dans l'exécution.` },
    { q: `Intervenez-vous autour de ${V} ?`,
      a: `Oui, dans l'ensemble de l'agglomération et du département : ${(city.neighbors || []).slice(0, 5).join(", ")} et au-delà. La proximité du prestataire est un critère de sélection prioritaire, parce qu'elle conditionne le délai de pose et la réactivité du service après-vente.` }
  ];

  const otherServices = services.filter((s) => s.slug !== svc.slug).slice(0, 4);

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg(svc.topic, (index % 3) + 1, S + " à " + V)}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">${esc(V)} · ${esc(city.dept)} ${esc(city.deptName)}</span>
    <h1>${esc(svc.navShort)} à ${esc(V)}</h1>
    <p class="lead">${esc(svc.navDesc)} à ${esc(V)} (${esc(city.cp)}) et ${esc(FR.dans(city.deptName))}.
    Décrivez votre projet : nous le confions à des professionnels vérifiés de votre secteur et vous
    recevez des devis comparables sous 48 heures. Gratuit, sans engagement.</p>
    <div class="btns">
      <a class="btn btn-primary btn-lg" href="devis.html?prestation=${encodeURIComponent(S)}&amp;ville=${encodeURIComponent(V)}">Mon devis ${esc(S.toLowerCase())} à ${esc(V)}</a>
      <a class="btn btn-ghost btn-lg" href="${svc.slug}.html">Tout savoir sur ${esc(S.toLowerCase())}</a>
    </div>
  </div>
</section>

<section class="sec-tight"><div class="wrap">${T.trustBar()}</div></section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <article class="prose">
        <h2 id="angle">${esc(fill(angle.h))}</h2>
        <p>${esc(fill(angle.p))}</p>
        ${localNote ? `<div class="note"><p><strong>Point local :</strong> ${esc(localNote)}</p></div>` : ""}

        <h2 id="prestations">Ce que nous couvrons en ${esc(S.toLowerCase())} à ${esc(V)}</h2>
        <ul class="checks">
          ${svc.sub.map((s) => `<li><strong>${esc(s.t)}</strong> — ${esc(s.d.split(".")[0])}.</li>`).join("")}
        </ul>

        <h2 id="secteurs">Où nous intervenons à ${esc(V)} et alentour</h2>
        <p>Les professionnels du réseau traitent des projets ${esc(S.toLowerCase())} dans l'ensemble
        des quartiers de ${esc(V)}, dans les zones d'activité de l'agglomération, et dans les communes
        voisines${(city.neighbors || []).length ? " — " + city.neighbors.slice(0, 6).join(", ") : ""}.
        Nous sollicitons systématiquement l'atelier ou le poseur le plus proche du chantier :
        c'est ce qui fait la différence sur le coût de déplacement et sur la réactivité du
        service après-vente.</p>
        ${(city.quartiers || []).length ? `<h3>Quartiers</h3>
        <div class="tags">${city.quartiers.map((q) => `<span class="tag">${esc(q)}</span>`).join("")}</div>` : ""}
        ${(city.zones || []).length ? `<h3 style="margin-top:1.4em">Zones d'activité</h3>
        <div class="tags">${city.zones.map((z) => `<span class="tag">${esc(z)}</span>`).join("")}</div>` : ""}

        ${priceTable ? `<h2 id="prix">Budgets indicatifs</h2>
        <div class="table-wrap"><table>
          <thead><tr>${priceTable.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${priceTable.rows.map((r) => `<tr>${r.map((c, i) => i === 0
            ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table></div>
        <p style="font-size:.86rem;color:var(--tx-3)">Fourchettes nationales indicatives. À ${esc(V)},
        c'est surtout le poste pose qui fait varier le total. Voir le <a href="tarifs.html">guide des prix</a>.</p>` : ""}
      </article>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Devis ${esc(S.toLowerCase())} à ${esc(V)}</h3>
          <p>Deux minutes pour décrire votre projet. Réponse sous 48 heures, gratuit et sans engagement.</p>
          <a class="btn btn-primary btn-block" href="devis.html?prestation=${encodeURIComponent(S)}&amp;ville=${encodeURIComponent(V)}">Demander un devis</a>
          <p style="margin-top:16px;font-size:.86rem">Ou par téléphone :<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a></p>
          <h4 style="margin-top:26px;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--tx-3)">Autres métiers à ${esc(V)}</h4>
          <ul class="link-list">
            ${otherServices.map((s) => `<li><a href="${s.slug}-${city.slug}.html">${esc(s.navShort)}</a></li>`).join("")}
            <li><a href="enseigne-signaletique-${city.slug}.html">Tous les métiers à ${esc(V)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="sec-head center"><span class="eyebrow">En images</span>
    <h2>${esc(S)} : exemples de réalisations</h2></div>
    <div class="gal">
      ${[svc.topic].concat(svc.topicAlt || []).slice(0, 2).map((tp) =>
        [1, 2, 3, 4].map((n) => `<figure>${img(tp, n, S + " à " + V + " — exemple " + n)}</figure>`).join("")
      ).join("")}
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Questions fréquentes</span>
        <h2>${esc(S)} à ${esc(V)} : vos questions</h2>
        <div style="margin-top:30px">${T.faqBlock(faq)}</div>
      </div>
      <aside>
        <div class="aside-card aside-sticky">
          <h3>${esc(S)} dans d'autres villes</h3>
          <ul class="link-list">
            ${sameServiceCities.map((c) => `<li><a href="${svc.slug}-${c.slug}.html">${esc(S)} à ${esc(c.name)}</a></li>`).join("")}
          </ul>
          <a class="btn btn-ghost btn-block btn-sm" style="margin-top:16px" href="${svc.slug}.html">Page ${esc(S.toLowerCase())}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec"><div class="wrap">${T.ctaDouble()}</div></section>

<section class="sec-tight bg-2">
  <div class="wrap">${T.keywordCloud(
    svc.keywords.slice(0, 10).map((k) => k + " " + V).concat([
      S.toLowerCase() + " " + city.deptName, S.toLowerCase() + " " + city.dept,
      "devis " + S.toLowerCase() + " " + V, "entreprise " + S.toLowerCase() + " " + V
    ]), "Recherches associées")}</div>
</section>`;

  return T.page({
    file,
    /* Métier + ville d'abord : c'est la requête tapée. Le suffixe de marque
       et la mention « 48 h » sont les premiers éléments que le calibrage
       SERP retirera si le nom du métier ou de la ville est long. */
    title: `${S} à ${V} (${city.dept}) — Devis gratuit 48 h | ${site.brand}`,
    desc: `${svc.navDesc} à ${V} (${city.cp})${(city.neighbors || []).length ? ", " + city.neighbors.slice(0, 2).join(", ") : ""}. Devis d'entreprises vérifiées sous 48 h, gratuit.`,
    ogImage: (T.pick(svc.topic, 1) || { name: "hero-1" }).name + "-lg.jpg",
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: `${S} à ${V}`, description: `${svc.navDesc} à ${V} (${city.cp}).`,
        serviceType: svc.nav,
        provider: {
          "@type": "LocalBusiness", name: `${site.brand} — ${V}`,
          url: site.domain.replace(/\/$/, "") + "/" + file,
          email: site.email, telephone: site.phoneHref, priceRange: "€€",
          address: { "@type": "PostalAddress", addressLocality: V, postalCode: city.cp,
            addressRegion: city.region, addressCountry: "FR" }
        },
        areaServed: [{ "@type": "City", name: V }]
          .concat((city.neighbors || []).slice(0, 6).map((n) => ({ "@type": "City", name: n })))
      },
      T.faqSchema(faq)
    ]
  });
};
