const T = require("../lib/tpl");
const { site, services, esc, attr, img, heroImg } = T;
const P = require("../data/partnership");
const DEP = require("../data/departements");

/* ------------------------------------------------------------- helpers */
const id = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

function checks(name, items, opts) {
  const o = opts || {};
  return `<div class="opts">${items.map((it) => {
    const label = typeof it === "string" ? it : it.l;
    const hint = typeof it === "string" ? "" : it.h;
    const v = id(name + "_" + label);
    return `<label class="opt" for="${v}">
      <input type="${o.radio ? "radio" : "checkbox"}" id="${v}" name="${esc(name)}" value="${attr(label)}">
      <span class="opt-box" aria-hidden="true"></span>
      <span class="opt-txt">${esc(label)}${hint ? `<small>${esc(hint)}</small>` : ""}</span>
    </label>`;
  }).join("")}</div>`;
}

function capGroup(title, name, items, hint) {
  return `<fieldset style="margin-bottom:26px">
  <legend class="fieldset-legend">${esc(title)}${hint ? ` <span class="hint">— ${esc(hint)}</span>` : ""}</legend>
  ${checks(name, items)}
</fieldset>`;
}

/* ═══════════════════════════════════════════════ FORMULAIRE CLIENT */
function devis(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Demande de devis", url: "devis.html" }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("commerce", 2, "Devanture de commerce avec enseigne")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Demande de projet</span>
    <h1>Décrivez votre projet, recevez des devis comparables sous 48 h</h1>
    <p class="lead">Quatre étapes, deux minutes. Plus votre description est précise, plus les propositions
    que vous recevrez seront justes — et comparables entre elles. Service gratuit, sans engagement
    et sans exclusivité.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="split">
      <div class="form-panel">
        <form class="form" data-kind="client" novalidate>
          <div class="stepper" aria-hidden="true">
            <div class="now"><i></i><span>Votre projet</span></div>
            <div><i></i><span>Caractéristiques</span></div>
            <div><i></i><span>Lieu &amp; délai</span></div>
            <div><i></i><span>Coordonnées</span></div>
          </div>

          <!-- Étape 1 -->
          <div class="fstep active">
            <fieldset data-require-one>
              <legend class="fieldset-legend">Quelle prestation recherchez-vous ? <span class="req">*</span></legend>
              ${checks("prestation", services.map((s) => ({ l: s.navShort, h: s.navDesc })))}
              <p class="err">Sélectionnez au moins une prestation.</p>
              <p class="hint" style="margin-top:10px">Plusieurs choix possibles — par exemple une enseigne
              et le marquage du véhicule assorti.</p>
            </fieldset>

            <div class="field">
              <label for="description">Décrivez votre projet <span class="req">*</span></label>
              <span class="hint">Activité, ce que vous voulez faire, ce qui existe déjà. Écrivez simplement,
              nous traduisons en termes techniques.</span>
              <textarea id="description" name="description" required
                placeholder="Exemple : je reprends une boulangerie en centre-ville. La façade fait 6 mètres, il y a un ancien caisson lumineux hors service que je souhaite remplacer par des lettres découpées éclairées, plus une enseigne drapeau."></textarea>
              <p class="err">Merci de décrire votre projet en quelques lignes.</p>
            </div>

            <div class="field">
              <label for="type_client">Vous êtes</label>
              <select id="type_client" name="type_client">
                <option value="">— Choisir —</option>
                <option>Commerçant / point de vente</option>
                <option>Artisan / TPE</option>
                <option>Entreprise / PME</option>
                <option>Profession libérale ou santé</option>
                <option>Restaurant, bar, hôtel</option>
                <option>Industrie / logistique</option>
                <option>Collectivité ou établissement public</option>
                <option>Franchise ou réseau multi-sites</option>
                <option>Association</option>
                <option>Particulier</option>
              </select>
            </div>

            <div class="form-nav">
              <button type="button" class="btn btn-ghost" data-prev>Retour</button>
              <button type="button" class="btn btn-primary" data-next>Continuer</button>
            </div>
          </div>

          <!-- Étape 2 -->
          <div class="fstep">
            <div class="row-2">
              <div class="field">
                <label for="dimensions">Dimensions approximatives</label>
                <input type="text" id="dimensions" name="dimensions" placeholder="Ex. bandeau de 6 m × 0,80 m">
              </div>
              <div class="field">
                <label for="quantite">Quantité</label>
                <input type="text" id="quantite" name="quantite" placeholder="Ex. 1 enseigne + 3 véhicules">
              </div>
            </div>

            <fieldset>
              <legend class="fieldset-legend">Contraintes particulières</legend>
              ${checks("contraintes", [
                { l: "Pose en hauteur (au-delà de 3,5 m)", h: "Nacelle probablement nécessaire" },
                { l: "Secteur protégé / bâtiment classé", h: "Avis de l'Architecte des Bâtiments de France" },
                { l: "Local en copropriété", h: "Autorisation d'assemblée générale à prévoir" },
                { l: "Enseigne existante à déposer", h: "Dépose et reprise de façade" },
                { l: "Électricité à créer", h: "Pas d'alimentation en place" },
                { l: "Rue piétonne / accès difficile", h: "Occupation du domaine public" },
                { l: "Bord de mer / atmosphère saline", h: "Inox 316 recommandé" },
                { l: "Aucune contrainte connue", h: "" }
              ])}
            </fieldset>

            <div class="field">
              <label for="fichiers">Avez-vous un logo ou des visuels ?</label>
              <select id="fichiers" name="fichiers">
                <option value="">— Choisir —</option>
                <option>Oui, en fichier vectoriel (AI, EPS, PDF, SVG)</option>
                <option>Oui, mais uniquement en image (JPG, PNG)</option>
                <option>J'ai un logo mais je ne sais pas dans quel format</option>
                <option>Non, j'ai besoin d'une création graphique</option>
              </select>
            </div>

            <div class="field">
              <label for="budget">Ordre de budget envisagé</label>
              <span class="hint">Facultatif, mais très utile : cela évite de recevoir des propositions hors sujet.</span>
              <select id="budget" name="budget">
                <option value="">— Je ne sais pas encore —</option>
                <option>Moins de 500 €</option>
                <option>500 € à 1 500 €</option>
                <option>1 500 € à 3 000 €</option>
                <option>3 000 € à 6 000 €</option>
                <option>6 000 € à 15 000 €</option>
                <option>Plus de 15 000 €</option>
              </select>
            </div>

            <div class="form-nav">
              <button type="button" class="btn btn-ghost" data-prev>Retour</button>
              <button type="button" class="btn btn-primary" data-next>Continuer</button>
            </div>
          </div>

          <!-- Étape 3 -->
          <div class="fstep">
            <div class="row-2">
              <div class="field">
                <label for="ville">Ville du projet <span class="req">*</span></label>
                <input type="text" id="ville" name="ville" required list="villes-list" placeholder="Ex. Perpignan">
                <datalist id="villes-list">${cities.map((c) =>
                  `<option value="${attr(c.name)}" data-dept="${attr(c.dept)}" data-dept-nom="${attr(c.deptName)}">`).join("")}</datalist>
                <p class="err">Indiquez la ville où se situe le projet.</p>
              </div>
              <div class="field">
                <label for="code_postal">Code postal</label>
                <input type="text" id="code_postal" name="code_postal" inputmode="numeric" placeholder="66000">
              </div>
            </div>

            <div class="field">
              <label for="adresse">Adresse du chantier</label>
              <span class="hint">Facultatif. Utile pour évaluer l'accès et la hauteur d'intervention.</span>
              <input type="text" id="adresse" name="adresse" placeholder="Ex. 12 rue de la Loge">
            </div>

            <fieldset>
              <legend class="fieldset-legend">Quand souhaitez-vous que ce soit réalisé ?</legend>
              ${checks("delai", [
                "Le plus vite possible", "Sous 1 mois", "Sous 2 à 3 mois",
                "Dans plus de 3 mois", "Je me renseigne, pas de date fixée"
              ], { radio: true })}
            </fieldset>

            <div class="field">
              <label for="accompagnement">Souhaitez-vous être accompagné sur les démarches ?</label>
              <select id="accompagnement" name="accompagnement">
                <option value="">— Choisir —</option>
                <option>Oui, dossier d'autorisation préalable en mairie</option>
                <option>Oui, déclaration TLPE</option>
                <option>Oui, autorisation d'occupation du domaine public</option>
                <option>Oui, plusieurs de ces démarches</option>
                <option>Non, je m'en occupe</option>
                <option>Je ne sais pas ce qui est nécessaire</option>
              </select>
            </div>

            <div class="form-nav">
              <button type="button" class="btn btn-ghost" data-prev>Retour</button>
              <button type="button" class="btn btn-primary" data-next>Continuer</button>
            </div>
          </div>

          <!-- Étape 4 -->
          <div class="fstep">
            <div class="row-2">
              <div class="field">
                <label for="nom">Nom et prénom <span class="req">*</span></label>
                <input type="text" id="nom" name="nom" required autocomplete="name">
                <p class="err">Merci d'indiquer votre nom.</p>
              </div>
              <div class="field">
                <label for="entreprise">Entreprise / enseigne</label>
                <input type="text" id="entreprise" name="entreprise" autocomplete="organization">
              </div>
            </div>
            <div class="row-2">
              <div class="field">
                <label for="email">E-mail <span class="req">*</span></label>
                <input type="email" id="email" name="email" required autocomplete="email">
                <p class="err">Adresse e-mail invalide.</p>
              </div>
              <div class="field">
                <label for="telephone">Téléphone <span class="req">*</span></label>
                <input type="tel" id="telephone" name="telephone" required autocomplete="tel" placeholder="06 12 34 56 78">
                <p class="err">Merci d'indiquer un numéro pour vous rappeler.</p>
              </div>
            </div>

            <fieldset>
              <legend class="fieldset-legend">Meilleur moment pour vous joindre</legend>
              ${checks("rappel", ["Matin", "Après-midi", "Fin de journée", "Peu importe"], { radio: true })}
            </fieldset>

            <div class="field consent">
              <input type="checkbox" id="consent" name="consentement" value="oui" required>
              <label for="consent">J'accepte que mes informations soient transmises aux professionnels
              du réseau sélectionnés pour répondre à ma demande, conformément à la
              <a href="confidentialite.html">politique de confidentialité</a>. <span class="req">*</span>
              <span class="err">Cette autorisation est nécessaire pour traiter votre demande.</span></label>
            </div>

            <div class="form-status" role="status" aria-live="polite"></div>

            <div class="form-nav">
              <button type="button" class="btn btn-ghost" data-prev>Retour</button>
              <button type="submit" class="btn btn-primary btn-lg" data-submit>Envoyer ma demande</button>
            </div>
            <p class="hint" style="text-align:center">Gratuit · Sans engagement · Réponse sous 48 h ouvrées</p>
          </div>
        </form>
      </div>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Ce qui se passe ensuite</h3>
          <div class="steps stack" style="margin-top:18px">
            <div class="step"><h3 style="font-size:.98rem">Rappel sous 24 h</h3>
              <p style="font-size:.88rem">Nous précisons ensemble les points techniques.</p></div>
            <div class="step"><h3 style="font-size:.98rem">Consultation ciblée</h3>
              <p style="font-size:.88rem">Cahier des charges transmis aux bons ateliers.</p></div>
            <div class="step"><h3 style="font-size:.98rem">Vos devis</h3>
              <p style="font-size:.88rem">2 à 3 propositions comparables, sous 48 h.</p></div>
          </div>
          <hr style="margin:24px 0">
          <p style="font-size:.88rem">Vous préférez en parler ?<br>
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="font-weight:700;color:var(--signal-600)">${esc(site.phoneDisplay)}</a>
          </p>
        </div>
      </aside>
    </div>
  </div>
</section>`;

  return T.page({
    file: "devis.html", active: "devis.html",
    title: `Demande de Devis Gratuit — Enseigne, Signalétique, Covering | ${site.brand}`,
    desc: "Décrivez votre projet d'enseigne, de signalétique, de covering ou d'impression : recevez sous 48 h des devis comparables d'artisans vérifiés. Gratuit et sans engagement.",
    body, cities,
    schema: [T.crumbSchema(crumbItems)]
  });
}

/* ═══════════════════════════════════════ FORMULAIRE PROFESSIONNELS */
function pros(cities) {
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Professionnels", url: "professionnels.html" }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("atelier", 2, "Atelier de fabrication d'enseignes")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Espace professionnels</span>
    <h1>Recevez des affaires concrètes, correspondant à vos capacités réelles</h1>
    <p class="lead">Enseigniste, agence de publicité, imprimeur grand format, poseur habilité,
    spécialiste du covering ou fournisseur d'objets publicitaires : rejoignez le réseau et recevez
    des demandes qualifiées dans votre zone. <strong>Les deux premiers mois sont à 0 €</strong>, puis
    douze mois d'accès à 490 € TTC pour la première année du réseau,
    <strong>sans aucune commission</strong> sur les affaires que vous signez.</p>
    <div class="btns">
      <a class="btn btn-pro btn-lg" href="#candidature">Remplir le questionnaire</a>
      <a class="btn btn-ghost btn-lg" href="partenaires.html">Voir les formules et tarifs</a>
    </div>
  </div>
</section>

<section class="sec" id="pourquoi">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Le principe</span>
      <h2>Une agence de mise en relation, pas une place de marché anonyme</h2>
      <p class="lead">Nous ne diffusons pas votre demande à trente entreprises. Chaque projet est qualifié
      par téléphone, traduit en cahier des charges, puis confié à deux ou trois professionnels dont
      l'outil de production correspond réellement au besoin. Votre taux de transformation s'en ressent.
      <a href="partenaires.html">Voir les formules d'abonnement →</a></p>
    </div>
    <div class="grid g-3">
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></span>
        <h3>Des demandes qualifiées</h3>
        <p>Budget, délai, dimensions, contraintes de façade et attentes du client sont précisés avant
        de vous être transmis. Vous chiffrez, vous ne débroussaillez pas.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <h3>Dans votre zone réelle</h3>
        <p>Vous définissez votre rayon d'intervention. Nous ne vous enverrons pas un chantier
        à 300 km que vous refuserez.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
        <h3>Selon vos capacités déclarées</h3>
        <p>Le questionnaire ci-dessous cartographie précisément ce que vous savez faire :
        machines, habilitations, hauteur d'intervention, volumes. Nous n'envoyons que ce qui vous correspond.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
        <h3>Un budget fixe, zéro commission</h3>
        <p>Douze mois d'accès au tarif d'un semestre pour la première
            année, sans achat de contacts à l'unité.
        Aucun pourcentage n'est prélevé sur vos chantiers : chaque affaire signée vous revient
        intégralement.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg></span>
        <h3>Vous restez maître du contrat</h3>
        <p>Vous facturez le client en direct, vous fixez vos prix, vous gardez la relation.
        Nous n'intervenons pas dans l'exécution.</p>
      </div>
      <div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
        <h3>Un réseau exigeant</h3>
        <p>Assurances à jour, habilitations vérifiées, retours clients suivis. Un réseau crédible
        est un réseau qui trie — c'est aussi ce qui protège votre réputation.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Qui recherchons-nous</span>
        <h2>Les métiers que nous référençons</h2>
        <p class="lead">Nous cherchons des entreprises qui produisent, pas des intermédiaires
        qui revendent. Si vous avez un atelier, des machines, des poseurs ou une réelle expertise
        de création, vous êtes concerné.</p>
        <ul class="checks">
          <li><strong>Enseignistes fabricants</strong> — lettres découpées, caissons, néon LED, totems</li>
          <li><strong>Imprimeurs grand format</strong> — UV, latex, solvant, sublimation, découpe numérique</li>
          <li><strong>Poseurs et sociétés de pose</strong> — nacelle CACES, habilitation électrique, cordistes</li>
          <li><strong>Spécialistes du covering</strong> — total covering, flotte, dépose, films techniques</li>
          <li><strong>Ateliers de signalétique</strong> — gravure, PMR, ISO 7010, marquage au sol</li>
          <li><strong>Graphistes et studios</strong> — logo, charte, maquettes, fichiers de production</li>
          <li><strong>Fournisseurs d'objets publicitaires</strong> — sérigraphie, broderie, EPI marqués</li>
          <li><strong>Menuisiers et métalliers</strong> — structures, supports, habillages de façade</li>
        </ul>
      </div>
      <div class="showcase">
        <figure class="s-a">${img("atelier", 3, "Atelier de fabrication et machines de production", { sizes: "(max-width: 780px) 50vw, 32vw" })}</figure>
        <figure class="s-b">${img("gravure", 4, "Machine de découpe numérique en atelier", { sizes: "(max-width: 780px) 50vw, 22vw" })}</figure>
        <figure class="s-c" style="grid-column:span 6">${img("pose", 2, "Poseur installant une enseigne en façade", { sizes: "(max-width: 780px) 50vw, 25vw" })}</figure>
        <figure class="s-c" style="grid-column:span 6">${img("impression", 1, "Imprimante numérique grand format", { sizes: "(max-width: 780px) 50vw, 25vw" })}</figure>
      </div>
    </div>
  </div>
</section>

<section class="sec-tight" id="offre">
  <div class="wrap">${T.launchBanner()}</div>
</section>

<section class="sec" id="candidature">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Questionnaire de capacités</span>
      <h2>Rejoindre le réseau</h2>
      <p class="lead mx-auto">Ce questionnaire cartographie ce que votre entreprise sait réellement faire
      et avec quel matériel. Il est un peu long — c'est volontaire : nacelle, CACES, véhicules et machines
      déterminent les chantiers que nous pourrons vous confier. Comptez 7 à 10 minutes.</p>
    </div>

    <div class="form-panel form-pro" style="max-width:940px;margin-inline:auto">
      <form class="form" data-kind="pro" novalidate>
        <div class="stepper" aria-hidden="true">
          <div class="now"><i></i><span>Entreprise</span></div>
          <div><i></i><span>Contact</span></div>
          <div><i></i><span>Capacités</span></div>
          <div><i></i><span>Matériel &amp; véhicules</span></div>
          <div><i></i><span>Formule</span></div>
        </div>

        <!-- Étape 1 : entreprise -->
        <div class="fstep active">
          <div class="row-2">
            <div class="field">
              <label for="p_entreprise">Raison sociale <span class="req">*</span></label>
              <input type="text" id="p_entreprise" name="entreprise" required autocomplete="organization">
              <p class="err">Indiquez le nom de votre entreprise.</p>
            </div>
            <div class="field">
              <label for="p_siret">SIRET <span class="req">*</span></label>
              <input type="text" id="p_siret" name="siret" required inputmode="numeric" placeholder="14 chiffres">
              <p class="err">Le SIRET est nécessaire pour vérifier votre inscription.</p>
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label for="p_forme">Forme juridique</label>
              <select id="p_forme" name="forme_juridique">
                <option value="">— Choisir —</option>
                <option>Auto-entrepreneur / micro-entreprise</option>
                <option>EI / EIRL</option>
                <option>EURL</option>
                <option>SARL</option>
                <option>SAS / SASU</option>
                <option>SA</option>
                <option>SCOP / coopérative</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="field">
              <label for="p_creation">Année de création</label>
              <input type="number" id="p_creation" name="annee_creation" min="1900" max="2100" placeholder="2015">
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label for="p_effectif">Effectif</label>
              <select id="p_effectif" name="effectif">
                <option value="">— Choisir —</option>
                <option>1 personne (indépendant)</option>
                <option>2 à 5</option>
                <option>6 à 10</option>
                <option>11 à 20</option>
                <option>21 à 50</option>
                <option>Plus de 50</option>
              </select>
            </div>
            <div class="field">
              <label for="p_site">Site internet</label>
              <input type="url" id="p_site" name="site_web" placeholder="https://">
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label for="p_ville">Ville <span class="req">*</span></label>
              <input type="text" id="p_ville" name="ville" required>
              <p class="err">Indiquez la ville de votre atelier.</p>
            </div>
            <div class="field">
              <label for="p_cp">Code postal <span class="req">*</span></label>
              <input type="text" id="p_cp" name="code_postal" required inputmode="numeric">
              <p class="err">Code postal requis.</p>
            </div>
          </div>
          <div class="field" id="zone-depts">
            <label for="p_dept">Départements couverts <span class="req">*</span></label>
            <span class="hint">Les formules 6 et 12 mois couvrent <strong>trois départements de votre
            choix</strong>, pas nécessairement limitrophes : à vous de désigner ceux où se trouvent
            réellement vos clients. Nous vous signalons simplement les voisins du vôtre, à titre
            d'aide. Les formules Région et France entière couvrent un périmètre plus large, calé
            lors de l'entretien.</span>

            <select id="p_dept" name="departement_principal" required>
              <option value="">— Votre département —</option>
              ${DEP.list.map((d) => `<option value="${attr(d.code)}">${esc(d.code)} — ${esc(d.nom)}</option>`).join("")}
            </select>
            <p class="err">Indiquez le département de votre atelier.</p>

            <div id="dept-autres">
              <p class="hint" style="margin:14px 0 8px"><strong>Deux autres départements</strong>
              de votre choix <span id="dept-suggest"></span></p>
              <div class="row-2">
                <select id="p_dept2" name="departement_2">
                  <option value="">— Deuxième département —</option>
                  ${DEP.list.map((d) => `<option value="${attr(d.code + " - " + d.nom)}">${esc(d.code)} — ${esc(d.nom)}</option>`).join("")}
                </select>
                <select id="p_dept3" name="departement_3">
                  <option value="">— Troisième département —</option>
                  ${DEP.list.map((d) => `<option value="${attr(d.code + " - " + d.nom)}">${esc(d.code)} — ${esc(d.nom)}</option>`).join("")}
                </select>
              </div>
              <p class="hint" id="dept-count" style="margin-top:8px"></p>
            </div>
          </div>

          <div class="field">
            <label for="p_rayon">Rayon d'intervention habituel <span class="req">*</span></label>
            <select id="p_rayon" name="rayon" required>
              <option value="">— Choisir —</option>
              <option>Jusqu'à 30 km</option>
              <option>Jusqu'à 60 km</option>
              <option>Jusqu'à 100 km</option>
              <option>Département entier</option>
              <option>Région entière</option>
              <option>France entière</option>
              <option>France entière + outre-mer</option>
            </select>
            <p class="err">Merci d'indiquer votre zone d'intervention.</p>
          </div>
          <div class="form-nav">
            <button type="button" class="btn btn-ghost" data-prev>Retour</button>
            <button type="button" class="btn btn-pro" data-next>Continuer</button>
          </div>
        </div>

        <!-- Étape 2 : contact -->
        <div class="fstep">
          <div class="row-2">
            <div class="field">
              <label for="p_nom">Nom et prénom <span class="req">*</span></label>
              <input type="text" id="p_nom" name="nom" required autocomplete="name">
              <p class="err">Merci d'indiquer votre nom.</p>
            </div>
            <div class="field">
              <label for="p_fonction">Fonction</label>
              <input type="text" id="p_fonction" name="fonction" placeholder="Gérant, responsable commercial…">
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label for="p_email">E-mail professionnel <span class="req">*</span></label>
              <input type="email" id="p_email" name="email" required autocomplete="email">
              <p class="err">Adresse e-mail invalide.</p>
            </div>
            <div class="field">
              <label for="p_tel">Téléphone <span class="req">*</span></label>
              <input type="tel" id="p_tel" name="telephone" required autocomplete="tel">
              <p class="err">Numéro de téléphone requis.</p>
            </div>
          </div>
          <div class="field">
            <label for="p_presentation">Présentez votre entreprise en quelques lignes</label>
            <span class="hint">Spécialité, clients types, ce qui vous distingue, chantiers dont vous êtes fier.</span>
            <textarea id="p_presentation" name="presentation"
              placeholder="Exemple : atelier de 6 personnes spécialisé en enseignes lumineuses depuis 2008, fraiseuse numérique 3×2 m, cabine de thermolaquage, 2 poseurs CACES nacelle, principalement franchises et retail."></textarea>
          </div>
          <div class="form-nav">
            <button type="button" class="btn btn-ghost" data-prev>Retour</button>
            <button type="button" class="btn btn-pro" data-next>Continuer</button>
          </div>
        </div>

        <!-- Étape 3 : capacités -->
        <div class="fstep">
          <p class="lead" style="font-size:1rem">Cochez tout ce que votre entreprise <strong>réalise
          elle-même</strong>, en interne. N'incluez pas ce que vous sous-traitez systématiquement :
          c'est la précision de cette section qui détermine la qualité des affaires que vous recevrez.</p>

          <fieldset data-require-one style="margin-bottom:26px">
            <legend class="fieldset-legend">Fabrication d'enseignes <span class="req">*</span></legend>
            ${checks("cap_enseigne", [
              "Lettres découpées / lettres relief", "Lettres boîtier rétro-éclairées",
              "Caisson lumineux simple ou double face", "Néon LED / néon flexible",
              "Enseigne drapeau et potence", "Totem et mât publicitaire",
              "Enseigne de toiture / grande hauteur", "Habillage de bandeau et devanture",
              "Rénovation d'enseigne existante"
            ])}
            <p class="err">Cochez au moins une capacité, ici ou dans les rubriques suivantes.</p>
          </fieldset>

          ${capGroup("Signalétique", "cap_signaletique", [
            "Signalétique intérieure", "Signalétique directionnelle et jalonnement",
            "Plaques de porte et numérotation", "Signalétique PMR (relief et braille)",
            "Signalétique de sécurité ISO 7010", "Plans d'évacuation NF X 08-070",
            "Signalétique industrielle et logistique", "Plaques professionnelles gravées",
            "Marquage au sol intérieur", "Marquage au sol extérieur (résine)",
            "Signalétique de chantier"
          ])}

          ${capGroup("Impression et façonnage", "cap_impression", [
            "Impression UV sur rigide", "Impression latex", "Impression éco-solvant",
            "Sublimation textile", "Impression grande laize (> 2,5 m)",
            "Table de découpe à lame oscillante", "Plotter de découpe (vinyle)",
            "Laminage et plastification", "Œillets, ourlets, façonnage bâche",
            "Contrecollage sur rigide", "Impression offset / petit format"
          ])}

          ${capGroup("Covering et marquage véhicule", "cap_covering", [
            "Total covering", "Semi-covering", "Lettrage adhésif simple",
            "Marquage de flotte (série)", "Dépose et remise en état",
            "Vitres microperforées", "Films teintés et solaires",
            "Films de protection carrosserie (PPF)", "Marquage rétro-réfléchissant homologué",
            "Covering poids lourd / remorque", "Atelier chauffé dédié"
          ])}

          ${capGroup("Objets publicitaires et textile", "cap_objets", [
            "Sérigraphie textile", "Broderie machine", "Transfert numérique DTF",
            "Flex et flock découpés", "Tampographie", "Gravure laser",
            "Sublimation objets", "Vêtements de travail et EPI marqués",
            "Sourcing d'objets publicitaires", "Goodies écoresponsables",
            "Marquage sur verre et métal"
          ])}

          ${capGroup("Création graphique et PAO", "cap_creation", [
            "Création de logo", "Charte graphique complète", "Maquette d'enseigne",
            "Simulation photoréaliste sur façade", "Maquette covering sur gabarit véhicule",
            "Vectorisation de logo", "Préparation de fichiers d'impression",
            "Modélisation 3D", "Plan de jalonnement signalétique",
            "Montage de dossier Cerfa d'enseigne"
          ])}

          ${capGroup("Pose, hauteur et maintenance", "cap_pose", [
            "Pose d'enseigne en façade", "Pose de signalétique intérieure",
            "Pose d'adhésif et vitrophanie", "Travail en nacelle (PEMP)",
            "Travail sur échafaudage", "Travaux sur cordes (cordiste)",
            "Raccordement électrique", "Dépose et évacuation",
            "Maintenance et SAV d'enseignes", "Dépannage sous 48 h",
            "Intervention de nuit ou hors horaires", "Contrat d'entretien annuel"
          ])}

          ${capGroup("Découpe laser, CNC et usinage", "cap_decoupe", [
            "Découpe laser CO₂ (plexiglas, bois, textile)",
            "Découpe laser fibre (acier, inox, alu, laiton)",
            "Fraisage numérique CNC 2D", "Fraisage numérique CNC 3D",
            "Découpe jet d'eau", "Découpe plasma",
            "Table de découpe numérique (carton, PVC, alvéolaire)",
            "Gravure laser sur métal", "Gravure laser sur plexiglas et bois",
            "Gravure mécanique", "Usinage de pièces techniques",
            "Nesting et optimisation de plaque", "Prototypage et pièce unique",
            "Reprise et vectorisation de fichiers de découpe"
          ], "Procédés que vous réalisez en interne")}

          ${capGroup("Imprimerie et façonnage papier", "cap_imprimerie", [
            "Impression offset", "Impression numérique petit format",
            "Impression données variables", "Cartes de visite et papeterie",
            "Flyers, dépliants et plaquettes", "Brochures et catalogues",
            "Étiquettes et adhésifs imprimés", "Carnets autocopiants",
            "Pliage et rainage", "Piqûre à cheval", "Dos carré collé",
            "Reliure spirale ou wire-o", "Pelliculage", "Vernis sélectif",
            "Dorure à chaud et gaufrage", "Découpe à la forme",
            "Massicot et façonnage", "Mise sous pli et routage",
            "Label Imprim'Vert", "Papiers FSC ou PEFC"
          ], "Procédés d'imprimerie que vous réalisez")}

          ${capGroup("Impression 3D et prototypage", "cap_3d", [
            "Impression 3D FDM (filament)", "Impression 3D résine SLA ou DLP",
            "Frittage de poudre SLS", "MJF", "Impression 3D grand volume",
            "Impression 3D métal", "Modélisation 3D", "Scan 3D et rétro-conception",
            "Finition, ponçage et peinture de pièces imprimées",
            "Petite série (10 à 500 pièces)", "Moulage silicone"
          ], "Procédés que vous réalisez en interne")}

          ${capGroup("Web et référencement", "cap_web", [
            "Création de site vitrine", "Création de site e-commerce",
            "Refonte de site existant", "Développement sur mesure",
            "WordPress", "PrestaShop", "Shopify", "Webdesign et maquettes",
            "Hébergement et nom de domaine", "Maintenance et mises à jour",
            "Conformité RGPD et mentions légales", "Accessibilité web RGAA",
            "Audit de référencement", "Référencement local",
            "Fiche Google Business Profile", "Optimisation technique SEO",
            "Rédaction de contenu web", "Netlinking",
            "Campagnes Google Ads", "Réseaux sociaux", "Analyse et rapports"
          ], "Prestations web que vous réalisez")}

          ${capGroup("Atelier et équipement", "cap_atelier", [
            "Plieuse / cisaille", "Poste à souder alu et inox",
            "Thermoformage / plieuse plexiglas", "Cabine de peinture ou thermolaquage",
            "Menuiserie bois", "Serrurerie / métallerie",
            "Polissage et ébavurage", "Anodisation",
            "Atelier de montage électrique", "Stockage et logistique"
          ], "Machines dont vous disposez en propre")}

          <div class="form-nav">
            <button type="button" class="btn btn-ghost" data-prev>Retour</button>
            <button type="button" class="btn btn-pro" data-next>Continuer</button>
          </div>
        </div>

        <!-- Étape 4 : matériel, véhicules et habilitations -->
        <div class="fstep">
          <p class="lead" style="font-size:1rem">Cette étape est déterminante pour les chantiers de
          <strong>pose</strong> : c'est votre matériel réel — hauteur de nacelle, échafaudage, véhicules —
          qui décide des interventions que nous pouvons vous confier.</p>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Travail en hauteur — moyens dont vous disposez</legend>
            ${checks("moyens_hauteur", [
              { l: "Nacelle en propriété", h: "Vous possédez votre PEMP" },
              { l: "Nacelle en location ponctuelle", h: "Vous louez selon les chantiers" },
              { l: "Camion nacelle", h: "Bras sur porteur" },
              { l: "Nacelle araignée", h: "Accès difficile, intérieur" },
              { l: "Échafaudage", h: "Montage par vos soins" },
              { l: "Cordistes", h: "Travaux sur cordes" },
              { l: "Pas de travail en hauteur", h: "Vous ne posez pas au-delà de 3,5 m" }
            ])}
          </fieldset>

          <div class="field" data-show-if="moyens_hauteur=Nacelle en propriété">
            <label for="p_nacelle_h">Hauteur de travail maximale de votre nacelle</label>
            <select id="p_nacelle_h" name="nacelle_hauteur">
              <option value="">— Choisir —</option>
              <option>Jusqu'à 10 m</option><option>10 à 16 m</option>
              <option>16 à 22 m</option><option>22 à 30 m</option><option>Plus de 30 m</option>
            </select>
          </div>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Parc de véhicules <span class="hint">— cochez ce que vous possédez</span></legend>
            ${checks("vehicules", [
              { l: "Voiture / véhicule léger", h: "Déplacements, métrés, petits chantiers" },
              { l: "Camionnette (type Kangoo, Berlingo)", h: "Matériel et petites enseignes" },
              { l: "Fourgon (type Jumpy, Trafic)", h: "Panneaux et signalétique" },
              { l: "Grand fourgon (type Master, Sprinter)", h: "Grands formats, échafaudage" },
              { l: "Camion plateau", h: "Totems, structures, charges longues" },
              { l: "Camion nacelle", h: "Pose en hauteur autonome" },
              { l: "Camion-benne ou porte-engin", h: "Dépose et évacuation" },
              { l: "Remorque", h: "Transport de nacelle ou de matériel" },
              { l: "Atelier mobile équipé", h: "Interventions et SAV sur site" }
            ])}
          </fieldset>

          <div class="row-2">
            <div class="field">
              <label for="p_nb_vehicules">Nombre de véhicules d'intervention</label>
              <select id="p_nb_vehicules" name="nombre_vehicules">
                <option value="">— Choisir —</option>
                <option>1</option><option>2 à 3</option><option>4 à 6</option>
                <option>7 à 10</option><option>Plus de 10</option>
              </select>
            </div>
            <div class="field">
              <label for="p_equipes">Équipes de pose disponibles</label>
              <select id="p_equipes" name="equipes_pose">
                <option value="">— Choisir —</option>
                <option>Aucune (je ne pose pas)</option>
                <option>1 poseur</option>
                <option>1 binôme</option>
                <option>2 binômes</option>
                <option>3 équipes ou plus</option>
              </select>
            </div>
          </div>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Permis détenus par vos équipes</legend>
            ${checks("permis", [
              "Permis B", "Permis BE / remorque", "Permis C (poids lourd)",
              "Permis CE (semi-remorque)", "FIMO / FCO à jour"
            ])}
          </fieldset>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Habilitations et certifications à jour</legend>
            ${checks("habilitations", [
              { l: "CACES R486 catégorie A", h: "Nacelle à élévation verticale" },
              { l: "CACES R486 catégorie B", h: "Nacelle à élévation multidirectionnelle" },
              { l: "CACES R482 (engins de chantier)", h: "" },
              { l: "CACES R489 (chariots élévateurs)", h: "" },
              { l: "CACES R483 (grues mobiles)", h: "" },
              { l: "Montage d'échafaudage (R408)", h: "" },
              { l: "Habilitation électrique (B1V, BR, BC…)", h: "" },
              { l: "Formation travail en hauteur", h: "" },
              { l: "Habilitation port du harnais", h: "" },
              { l: "Cordiste (CQP / IRATA)", h: "" },
              { l: "AIPR (travaux à proximité de réseaux)", h: "" },
              { l: "SST (sauveteur secouriste du travail)", h: "" },
              { l: "Qualibat", h: "" }, { l: "RGE", h: "" },
              { l: "Certification ISO 9001", h: "" }, { l: "Imprim'Vert", h: "" },
              { l: "Aucune pour l'instant", h: "" }
            ])}
          </fieldset>

          <div class="field">
            <label for="p_zone_pose">Rayon accepté pour un chantier de pose</label>
            <span class="hint">Distinct de votre zone commerciale : beaucoup d'entreprises posent plus loin qu'elles ne vendent.</span>
            <select id="p_zone_pose" name="rayon_pose">
              <option value="">— Choisir —</option>
              <option>Je ne pose pas</option>
              <option>Jusqu'à 50 km</option>
              <option>Jusqu'à 100 km</option>
              <option>Jusqu'à 200 km</option>
              <option>Région entière</option>
              <option>France entière</option>
            </select>
          </div>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Assurances <span class="req">*</span></legend>
            ${checks("assurances", [
              "Responsabilité civile professionnelle", "Garantie décennale",
              "Assurance flotte véhicules", "Assurance matériel et machines"
            ])}
          </fieldset>

          <div class="row-2">
            <div class="field">
              <label for="p_capacite">Capacité de production mensuelle</label>
              <select id="p_capacite" name="capacite_mensuelle">
                <option value="">— Choisir —</option>
                <option>1 à 3 chantiers</option>
                <option>4 à 10 chantiers</option>
                <option>11 à 25 chantiers</option>
                <option>Plus de 25 chantiers</option>
              </select>
            </div>
            <div class="field">
              <label for="p_delai">Délai moyen entre commande et livraison</label>
              <select id="p_delai" name="delai_moyen">
                <option value="">— Choisir —</option>
                <option>Moins d'une semaine</option>
                <option>1 à 2 semaines</option>
                <option>2 à 4 semaines</option>
                <option>Plus d'un mois</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="p_sous_traitance">Que sous-traitez-vous habituellement ?</label>
            <span class="hint">Soyez transparent : cela nous aide à composer des binômes cohérents
            plutôt qu'à vous envoyer des affaires que vous devrez refuser.</span>
            <textarea id="p_sous_traitance" name="sous_traitance" style="min-height:90px"
              placeholder="Exemple : je sous-traite l'impression grand format et la pose au-delà de 12 m."></textarea>
          </div>

          <div class="form-nav">
            <button type="button" class="btn btn-ghost" data-prev>Retour</button>
            <button type="button" class="btn btn-pro" data-next>Continuer</button>
          </div>
        </div>

        <!-- Étape 5 : commercial -->
        <div class="fstep">
          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Types de clients que vous recherchez</legend>
            ${checks("clients_cibles", [
              "Commerces de proximité", "Restaurants, bars, hôtels",
              "Artisans et TPE", "PME et industrie",
              "Franchises et réseaux multi-sites", "Collectivités et marchés publics",
              "Promoteurs et bailleurs", "Professions libérales et santé",
              "Événementiel et salons", "Particuliers"
            ])}
          </fieldset>

          <div class="row-2">
            <div class="field">
              <label for="p_mini">Montant minimum de chantier accepté</label>
              <select id="p_mini" name="montant_minimum">
                <option value="">— Choisir —</option>
                <option>Pas de minimum</option>
                <option>À partir de 300 €</option>
                <option>À partir de 800 €</option>
                <option>À partir de 1 500 €</option>
                <option>À partir de 3 000 €</option>
                <option>À partir de 10 000 €</option>
              </select>
            </div>
            <div class="field">
              <label for="p_disponibilite">Disponibilité actuelle</label>
              <select id="p_disponibilite" name="disponibilite">
                <option value="">— Choisir —</option>
                <option>Immédiate, je cherche activement</option>
                <option>Bonne, quelques créneaux</option>
                <option>Chargé, mais intéressé</option>
                <option>Complet pour l'instant</option>
              </select>
            </div>
          </div>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Formule d'abonnement envisagée</legend>
            <p class="hint" style="margin-bottom:12px">Aucun engagement à ce stade : nous en reparlons
            lors de l'entretien. <a href="partenaires.html">Voir le détail des formules →</a></p>
            ${checks("formule", P.plans.filter((pl) => !pl.free || (P.launch && P.launch.active)).map((pl) => ({
              /* Le nom des abonnements porte déjà la durée : ne pas la répéter. */
              l: pl.name.includes(pl.duration) ? pl.name : pl.name + " — " + pl.duration,
              h: (pl.free ? "Gratuit" : pl.price + " " + P.currency + " " + P.priceSuffix) + " · " + pl.pitch
            })).concat(P.pose.plans.map((pl) => ({
              l: pl.name + " — " + pl.duration,
              h: pl.price + " " + P.currency + " " + P.priceSuffix + " · service de pose"
            }))).concat([{ l: "Je ne sais pas encore", h: "Vous préférez en parler d'abord" }]),
            { radio: true })}
          </fieldset>

          <div class="field">
            <label for="p_references">Références et réalisations</label>
            <span class="hint">Liens vers votre portfolio, réseaux sociaux, ou description de
            2 ou 3 chantiers représentatifs.</span>
            <textarea id="p_references" name="references" style="min-height:100px"></textarea>
          </div>

          <fieldset style="margin-bottom:26px">
            <legend class="fieldset-legend">Photos de vos chantiers</legend>
            <p class="hint" style="margin-bottom:12px">Chaque chantier photographié devient une
            <a href="realisations.html">fiche réalisation</a> publiée sur le site, qui vous cite et
            se positionne sur votre ville et votre métier. Nous rédigeons la fiche technique,
            vous validez avant publication.</p>
            ${checks("photos_chantiers", [
              { l: "Oui, je peux fournir des photos", h: "Avant/après, détails de fabrication, pose" },
              { l: "Oui, et je peux en prendre de nouvelles", h: "Sur les prochains chantiers" },
              { l: "J'ai des photos mais sans accord du client", h: "Nous publierons sans le nommer" },
              { l: "Pas pour l'instant", h: "" }
            ], { radio: true })}
          </fieldset>

          <div class="field consent">
            <input type="checkbox" id="p_consent" name="consentement" value="oui" required>
            <label for="p_consent">J'accepte que les informations transmises soient utilisées pour évaluer
            ma candidature et me proposer des affaires, conformément à la
            <a href="confidentialite.html">politique de confidentialité</a>. Je certifie exactes les
            capacités et habilitations déclarées. <span class="req">*</span>
            <span class="err">Cette autorisation est nécessaire pour traiter votre candidature.</span></label>
          </div>

          <div class="form-status" role="status" aria-live="polite"></div>

          <div class="form-nav">
            <button type="button" class="btn btn-ghost" data-prev>Retour</button>
            <button type="submit" class="btn btn-pro btn-lg" data-submit>Envoyer ma candidature</button>
          </div>
          <p class="hint" style="text-align:center">Réponse sous 48 h ouvrées · Aucune commission sur vos affaires</p>
        </div>
              </form>
        <script type="application/json" id="dept-data">${JSON.stringify(
          DEP.list.reduce((o, d) => { o[d.code] = { n: d.nom, v: d.voisins }; return o; }, {})
        )}</script>
    </div>
  </div>
</section>

<section class="sec bg-3">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Questions des professionnels</span>
      <h2>Ce que les entreprises nous demandent</h2>
    </div>
    ${T.faqBlock([
      { q: "Combien coûte l'adhésion au réseau ?", a: "490 € TTC pour douze mois en formule Proximité, tarif de lancement de la première année du réseau — 408 € HT à votre charge réelle une fois la TVA récupérée. Deux formules élargissent la zone : Rayonnement régional et Envergure nationale. Il n'y a <strong>aucune commission</strong> sur les affaires que vous signez : le chantier vous revient intégralement. Le détail figure sur la page <a href=\"partenaires.html\">partenaires</a>." },
      { q: "Combien de professionnels reçoivent la même demande ?", a: "Deux ou trois au maximum, choisis parce que leurs capacités correspondent au projet. Nous ne diffusons pas une demande à trente entreprises : c'est ce qui détruit les taux de transformation et pousse les prix vers le bas au détriment de la qualité." },
      { q: "Suis-je obligé d'accepter les affaires proposées ?", a: "Non, jamais. Vous acceptez ou déclinez au cas par cas, sans justification et sans pénalité. Nous vous demandons simplement de répondre rapidement pour que nous puissions réorienter la demande si nécessaire." },
      { q: "Qui facture le client final ?", a: "Vous, en direct. Vous fixez vos prix, vous signez votre devis, vous gardez la relation client et le service après-vente. Nous n'intervenons ni dans le contrat, ni dans l'exécution, et nous ne prélevons rien sur la facture." },
      { q: "Pourquoi le questionnaire est-il aussi détaillé ?", a: "Parce que c'est exactement ce qui fait la différence entre une demande pertinente et une perte de temps. Savoir que vous disposez d'une fraiseuse numérique de 3 mètres, d'une nacelle 16 mètres et de deux poseurs CACES nous permet de vous adresser le bon chantier du premier coup. Un annuaire généraliste ne peut pas faire ça." },
      { q: "Travaillez-vous avec des indépendants et des micro-entreprises ?", a: "Oui, à condition que les assurances soient à jour et que les capacités déclarées soient réelles. Un poseur indépendant bien équipé et réactif vaut mieux qu'une structure plus grosse mais indisponible. La taille n'est pas un critère de sélection ; la fiabilité en est un." }
    ])}
  </div>
</section>`;

  return T.page({
    file: "professionnels.html", active: "professionnels.html",
    space: "pro",   // affiche le bandeau d'entrée de l'espace professionnels
    title: `Questionnaire Partenaire — Enseignistes, Agences, Poseurs | ${site.brand}`,
    desc: "Enseigniste, agence de publicité, imprimeur, poseur nacelle, covering : 12 mois d'accès au réseau à 490 € TTC pour la première année, sans commission sur vos affaires.",
    body, cities,
    schema: [T.crumbSchema(crumbItems)]
  });
}

/* ═════════════════════════════════════════════════════════ REMERCIEMENT */
function merci(cities) {
  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("hero", 3, "Rue commerçante")}</div>
  <div class="wrap hero-in" id="thanks-msg">
    <h1>Demande transmise à notre bureau d'études</h1>
    <p class="lead">Merci. Votre projet est entre les mains de notre bureau d'études : nous
    l'analysons, puis nous vous rappelons sous 24 heures ouvrées pour préciser les points techniques
    avant de le transmettre aux professionnels concernés. Vos premières propositions arriveront
    ensuite sous 48 heures.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap-narrow center">
    <h2>En attendant, ces pages peuvent vous être utiles</h2>
    <div class="btns center" style="margin-top:26px">
      <a class="btn btn-dark" href="tarifs.html">Guide des prix</a>
      <a class="btn btn-ghost" href="reglementation-enseigne.html">Réglementation des enseignes</a>
      <a class="btn btn-ghost" href="glossaire.html">Glossaire du métier</a>
    </div>
  </div>
</section>`;
  return T.page({
    file: "merci.html", noindex: true,
    title: `Merci — votre demande est enregistrée | ${site.brand}`,
    desc: "Votre demande a bien été enregistrée. Nous vous recontactons sous 24 heures ouvrées.",
    body, cities
  });
}

/* ══════════════════════════════════ ENTRAIDE ENTRE PARTENAIRES
   Le réseau dans l'autre sens : c'est le partenaire qui demande. Même
   mécanique que les deux autres formulaires — rien de nouveau à maintenir —
   mais un `data-kind` distinct, pour que l'objet de l'e-mail reçu dise
   immédiatement s'il s'agit d'un client, d'une candidature ou d'un confrère
   qui a besoin d'un poseur dans l'heure. */
function entraide(cities) {
  const E = require("../data/entraide");
  const crumbItems = [
    { name: "Accueil", url: "index.html" },
    { name: "Partenaires du secteur", url: "partenaires.html" },
    { name: E.nav, url: E.slug + ".html" }
  ];

  const body = `
<section class="hero hero-in-page">
  <div class="hero-bg">${heroImg("atelier", 2, "Atelier de fabrication d'enseignes")}</div>
  <div class="wrap hero-in">
    ${T.crumbs(crumbItems)}
    <span class="eyebrow">Réservé aux partenaires du réseau</span>
    <h1>${esc(E.h1)}</h1>
    <p class="lead">${esc(E.lead)}</p>
    <div class="btns">
      <a class="btn btn-pro btn-lg" href="#demande">Formuler une demande</a>
      <a class="btn btn-ghost btn-lg" href="partenaires.html">Rejoindre le réseau</a>
    </div>
    <div class="pill-row">
      <span class="pill">Compris dans toutes les formules</span>
      <span class="pill">Réponse sous 24 h ouvrées</span>
      <span class="pill">Aucune commission entre partenaires</span>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Ce que vous pouvez chercher</span>
      <h2>Six besoins que le réseau sait traiter</h2>
      <p class="lead">Ils reviennent tous les mois dans le métier, et ils ne dépendent d'aucun
      client : un réseau sert à cela autant qu'à recevoir des demandes.</p>
    </div>
    <div class="grid g-3">
      ${E.motifs.map((m) => `<div class="tile">
        <span class="tile-ico" aria-hidden="true" style="background:var(--pro-100);color:var(--pro-600)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></span>
        <h3>${esc(m.titre)}</h3><p>${esc(m.texte)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap">
    <div class="grid g-halves">
      <div>
        <span class="eyebrow">Comment ça se passe</span>
        <h2>Trois étapes, et vous traitez en direct</h2>
        <div class="steps stack" style="margin-top:30px">
          ${E.etapes.map(([t, d]) => `<div class="step"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
        </div>
      </div>
      <div>
        <div class="aside-card">
          <h3>${esc(E.confidentialite.titre)}</h3>
          <p>${esc(E.confidentialite.texte)}</p>
          <ul class="checks" style="margin-top:18px">
            ${E.confidentialite.points.map((x) => `<li>${esc(x)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="demande">
  <div class="wrap">
    <div class="split">
      <div class="form-panel">
        <h2 style="margin-top:0">Formuler une demande</h2>
        <p class="lead">Deux étapes. Plus le besoin est précis, plus vite nous trouvons
        l'entreprise capable d'y répondre.</p>

        <form class="form" data-kind="entraide" novalidate>
          <div class="stepper" aria-hidden="true">
            <div class="now"><i></i><span>Votre besoin</span></div>
            <div><i></i><span>Vos coordonnées</span></div>
          </div>

          <div class="fstep active">
            <fieldset data-require-one>
              <legend class="fieldset-legend">De quoi avez-vous besoin ? <span class="req">*</span></legend>
              ${checks("motif", E.motifs.map((m) => ({ l: m.titre, h: m.texte.split(".")[0] + "." })))}
              <p class="err">Sélectionnez au moins un motif.</p>
            </fieldset>

            <div class="field">
              <label for="e_besoin">Décrivez précisément le besoin <span class="req">*</span></label>
              <span class="hint">Matière et épaisseur, dimensions, hauteur d'intervention, matériel
              attendu, volume. Écrivez comme vous le diriez à un confrère au téléphone.</span>
              <textarea id="e_besoin" name="besoin" required
                placeholder="Exemple : j'ai vendu un totem double face de 3,50 m à monter sur platine, à 160 km de mon atelier. Je fabrique, mais je n'ai personne pour poser le 14. Il faut une nacelle 16 m et un raccordement électrique."></textarea>
              <p class="err">Décrivez votre besoin en quelques lignes.</p>
            </div>

            <div class="row-2">
              <div class="field">
                <label for="e_dept">Département concerné <span class="req">*</span></label>
                <input type="text" id="e_dept" name="departement_besoin" required
                       inputmode="numeric" placeholder="Ex. 66" maxlength="3">
                <p class="err">Indiquez le département du chantier ou de la livraison.</p>
              </div>
              <div class="field">
                <label for="e_ville">Ville ou commune</label>
                <input type="text" id="e_ville" name="ville" list="villes-list" placeholder="Ex. Perpignan">
                <datalist id="villes-list">${cities.map((c) =>
                  `<option value="${attr(c.name)}" data-dept="${attr(c.dept)}" data-dept-nom="${attr(c.deptName)}">`).join("")}</datalist>
              </div>
            </div>

            <div class="row-2">
              <div class="field">
                <label for="e_delai">Délai <span class="req">*</span></label>
                <select id="e_delai" name="delai" required>
                  <option value="">— Choisir —</option>
                  <option>Dépannage urgent — sous 48 h</option>
                  <option>Cette semaine</option>
                  <option>Dans les quinze jours</option>
                  <option>Dans le mois</option>
                  <option>Pas d'urgence, je prépare</option>
                </select>
                <p class="err">Indiquez sous quel délai vous avez besoin d'une réponse.</p>
              </div>
              <div class="field">
                <label for="e_budget">Ordre de budget que vous prévoyez</label>
                <input type="text" id="e_budget" name="budget_prevu" placeholder="Ex. 450 € la journée de pose">
                <span class="hint">Facultatif, mais cela accélère beaucoup la mise en relation.</span>
              </div>
            </div>

            <div class="field">
              <label for="e_offre">À l'inverse, qu'avez-vous à proposer en ce moment ?</label>
              <span class="hint">Une machine récente, une équipe qui se libère, une période creuse,
              un secteur où vous acceptez de vous déplacer. Nous vous solliciterons en priorité.</span>
              <textarea id="e_offre" name="offre" rows="2"
                placeholder="Exemple : fraiseuse numérique 3 × 2 m installée en juin, disponible ; nacelle 18 m et équipe libre la deuxième quinzaine de septembre sur l'Aude et l'Hérault."></textarea>
            </div>

            <div class="form-nav">
              <span></span>
              <button type="button" class="btn btn-pro" data-next>Continuer</button>
            </div>
          </div>

          <div class="fstep">
            <div class="row-2">
              <div class="field">
                <label for="e_entreprise">Votre entreprise <span class="req">*</span></label>
                <input type="text" id="e_entreprise" name="entreprise" required autocomplete="organization">
                <p class="err">Indiquez le nom de votre entreprise.</p>
              </div>
              <div class="field">
                <label for="e_siret">SIRET</label>
                <input type="text" id="e_siret" name="siret" inputmode="numeric" placeholder="14 chiffres">
                <span class="hint">Facultatif si vous êtes déjà partenaire.</span>
              </div>
            </div>
            <div class="row-2">
              <div class="field">
                <label for="e_nom">Nom du contact <span class="req">*</span></label>
                <input type="text" id="e_nom" name="nom" required autocomplete="name">
                <p class="err">Indiquez votre nom.</p>
              </div>
              <div class="field">
                <label for="e_tel">Téléphone <span class="req">*</span></label>
                <input type="tel" id="e_tel" name="telephone" required autocomplete="tel">
                <p class="err">Un numéro joignable : sur une urgence, nous appelons.</p>
              </div>
            </div>
            <div class="field">
              <label for="e_email">E-mail <span class="req">*</span></label>
              <input type="email" id="e_email" name="email" required autocomplete="email">
              <p class="err">Indiquez une adresse e-mail valide.</p>
            </div>

            <label class="consent" for="e_ok">
              <input type="checkbox" id="e_ok" name="consentement" required value="Oui">
              <span class="opt-box" aria-hidden="true"></span>
              <span>J'accepte que ma demande soit transmise aux entreprises du réseau susceptibles
              d'y répondre, et que mes coordonnées soient communiquées à celle que je retiendrai.
              <a href="mentions-legales.html">Mentions légales</a>.</span>
              <p class="err">Votre accord est nécessaire pour transmettre la demande.</p>
            </label>

            <div class="form-status" role="status" aria-live="polite"></div>

            <div class="form-nav">
              <button type="button" class="btn btn-ghost" data-prev>Retour</button>
              <button type="submit" class="btn btn-pro btn-lg" data-submit>Envoyer ma demande</button>
            </div>
            <p class="hint" style="text-align:center">Réponse sous 24 h ouvrées · Aucune commission
            entre partenaires · Votre demande n'est jamais diffusée publiquement</p>
          </div>
        </form>
      </div>

      <aside>
        <div class="aside-card aside-sticky">
          <h3>Pas encore partenaire ?</h3>
          <p>L'entraide est comprise dans les trois formules, sans supplément. Elle fonctionne dès
          la première semaine, sans attendre que les demandes clients arrivent.</p>
          <a class="btn btn-pro btn-block" href="partenaires.html">Voir les formules</a>
          <p style="margin-top:18px;font-size:.86rem">Vous cherchez un exécutant sans rejoindre le
          réseau ? <a href="sous-traitance-professionnels.html">La sous-traitance entre
          professionnels</a> est ouverte à tous.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap wrap-narrow">
    <div class="sec-head">
      <span class="eyebrow">Questions fréquentes</span>
      <h2>Ce que les partenaires nous demandent</h2>
    </div>
    ${T.faqBlock(E.faq)}
  </div>
</section>`;

  return T.page({
    file: E.slug + ".html",
    active: E.slug + ".html",
    space: "pro",
    title: `${E.title} | ${site.brand}`,
    desc: E.desc,
    body, cities,
    schema: [
      T.crumbSchema(crumbItems),
      {
        "@context": "https://schema.org", "@type": "Service",
        name: "Entraide entre partenaires du réseau",
        serviceType: "Mise en relation entre professionnels de la communication visuelle",
        provider: { "@id": site.domain.replace(/\/$/, "") + "/#organization" },
        areaServed: { "@type": "Country", name: "France" },
        audience: { "@type": "BusinessAudience",
          audienceType: "Enseignistes, imprimeurs, poseurs et agences membres du réseau" }
      },
      T.faqSchema(E.faq)
    ]
  });
}

module.exports = { devis, pros, merci, entraide };
