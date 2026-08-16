/* =========================================================================
   Console d'orientation — page interne, hors index et hors sitemap
   -------------------------------------------------------------------------
   Le parcours visé : une demande arrive dans la boîte, l'e-mail contient un
   lien « Orienter cette demande » qui ouvre cette page avec le département,
   le métier et le budget déjà renseignés, et la liste des partenaires
   pertinents déjà classée. Il ne reste qu'à valider et à envoyer.

   Le fichier partenaires ne quitte jamais le navigateur : il est stocké
   localement et exportable en JSON. C'est la seule implémentation
   compatible avec l'engagement pris envers les partenaires — aucun annuaire
   publié, aucune base consultable. Le corollaire est qu'il faut penser à
   exporter : un vidage du cache du navigateur efface le fichier.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc, attr } = T;
const services = require("../data/services");
const cities = require("../data/cities");

/* Capacités techniques sur lesquelles une demande peut être filtrée. Elles
   reprennent celles du questionnaire d'adhésion : inutile d'en inventer
   d'autres, ce sont celles que le partenaire a déjà déclarées. */
const CAPACITES = [
  ["nacelle", "Nacelle / travail en hauteur"],
  ["caces", "CACES à jour"],
  ["habilitation", "Habilitation électrique"],
  ["laser", "Découpe laser"],
  ["cnc", "Fraiseuse numérique / CNC"],
  ["thermolaquage", "Thermolaquage"],
  ["grand-format", "Impression grand format"],
  ["atelier-covering", "Atelier covering chauffé"],
  ["3d", "Impression 3D"],
  ["offset", "Offset"]
];

module.exports = function consolePage() {
  /* Département → nom et région, dérivés des villes : c'est ce qui permet
     de savoir qu'une demande dans le 66 relève d'Occitanie, donc qu'un
     partenaire régional Occitanie est légitime dessus. */
  const depts = {};
  cities.forEach((c) => { if (!depts[c.dept]) depts[c.dept] = { nom: c.deptName, region: c.region }; });

  const metiers = services.map((s) => ({ slug: s.slug, nom: s.navShort }));

  const cases = (id, items, name) => `<div class="c-cases" id="${id}">${items.map(([v, l]) =>
    `<label><input type="checkbox" name="${name}" value="${attr(v)}"> ${esc(l)}</label>`).join("")}</div>`;

  const body = `
<section class="sec-tight" style="padding-top:34px">
  <div class="wrap">
    <div class="c-head">
      <div>
        <span class="eyebrow">Outil interne</span>
        <h1 style="font-size:clamp(1.6rem,3vw,2.2rem);margin:6px 0 8px">Console d'orientation</h1>
        <p style="max-width:70ch;color:var(--tx-2);margin:0">Elle décide <strong>qui</strong> doit
        recevoir une demande — elle ne l'envoie pas. La qualification par téléphone reste ce que le
        réseau vend ; la console fait seulement le travail fastidieux de croiser une zone, un métier,
        des capacités et un tour de rôle.</p>
      </div>
      <div class="c-stats">
        <div><b id="c_nb">0</b><span>partenaires</span></div>
        <div><b id="c_nbdept">0</b><span>départements couverts</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">
    <div class="c-grid">

      <div class="c-panel">
        <h2>1 · La demande</h2>
        <div class="row-2">
          <div class="field">
            <label for="c_dept">Département <span class="req">*</span></label>
            <input type="text" id="c_dept" inputmode="numeric" placeholder="66" maxlength="3">
          </div>
          <div class="field">
            <label for="c_ville">Ville</label>
            <input type="text" id="c_ville" placeholder="Perpignan">
          </div>
        </div>
        <div class="field">
          <label>Métier demandé</label>
          ${cases("c_metiers", metiers.map((m) => [m.slug, m.nom]), "m")}
        </div>
        <div class="row-2">
          <div class="field">
            <label for="c_budget">Budget annoncé (€)</label>
            <input type="text" id="c_budget" inputmode="numeric" placeholder="2500">
            <span class="hint">Écarte les partenaires dont le minimum de chantier est supérieur.</span>
          </div>
          <div class="field">
            <label for="c_capacite">Capacité exigée</label>
            <select id="c_capacite">
              <option value="">— Indifférent —</option>
              ${CAPACITES.map(([v, l]) => `<option value="${attr(v)}">${esc(l)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="field">
          <label for="c_delai">Délai souhaité</label>
          <input type="text" id="c_delai" placeholder="Avant fin septembre">
        </div>
        <div class="field">
          <label for="c_desc">Descriptif à transmettre</label>
          <textarea id="c_desc" rows="4" placeholder="Collez ici le descriptif reçu dans la demande."></textarea>
        </div>
        <button class="btn btn-pro btn-block btn-lg" id="c_chercher">Chercher les partenaires</button>
      </div>

      <div class="c-panel">
        <h2>2 · Qui peut la traiter</h2>
        <div id="c_res"><p class="c-vide2">Renseignez au moins un département, puis lancez la
        recherche. Les partenaires sont classés du plus évident au moins évident : département
        explicitement couvert d'abord, puis région, puis national — et à pertinence égale, celui
        qui a reçu le moins de demandes.</p></div>
      </div>

    </div>
  </div>
</section>

<section class="sec-tight bg-2">
  <div class="wrap">
    <div class="c-grid">

      <div class="c-panel">
        <h2>Fichier partenaires</h2>
        <div id="c_liste"></div>
        <hr>
        <h3 style="font-size:1rem">Ajouter un partenaire</h3>
        <form id="c_ajout">
          <div class="row-2">
            <div class="field"><label for="a_nom">Entreprise <span class="req">*</span></label>
              <input type="text" id="a_nom" name="nom" required></div>
            <div class="field"><label for="a_contact">Contact</label>
              <input type="text" id="a_contact" name="contact"></div>
          </div>
          <div class="row-2">
            <div class="field"><label for="a_email">E-mail</label>
              <input type="email" id="a_email" name="email"></div>
            <div class="field"><label for="a_tel">Téléphone</label>
              <input type="tel" id="a_tel" name="tel"></div>
          </div>
          <div class="row-2">
            <div class="field"><label for="a_formule">Formule</label>
              <select id="a_formule" name="formule">
                <option value="annuel">Proximité — 3 départements</option>
                <option value="region">Rayonnement régional</option>
                <option value="france">Envergure nationale</option>
              </select></div>
            <div class="field"><label for="a_mini">Minimum de chantier (€)</label>
              <input type="text" id="a_mini" name="mini" inputmode="numeric" placeholder="0"></div>
          </div>
          <div class="row-2">
            <div class="field"><label for="a_depts">Départements couverts</label>
              <input type="text" id="a_depts" name="departements" placeholder="66, 11, 34">
              <span class="hint">Formule Proximité.</span></div>
            <div class="field"><label for="a_region">Région couverte</label>
              <input type="text" id="a_region" name="region" placeholder="Occitanie">
              <span class="hint">Formule Rayonnement régional.</span></div>
          </div>
          <div class="field"><label>Métiers</label>
            ${cases("c_form_metiers", metiers.map((m) => [m.slug, m.nom]), "fm")}</div>
          <div class="field"><label>Capacités déclarées</label>
            ${cases("c_form_cap", CAPACITES, "fc")}</div>
          <button class="btn btn-pro" type="submit">Enregistrer</button>
          <span id="c_form_msg" class="c-msg"></span>
        </form>
      </div>

      <div class="c-panel">
        <h2>Sauvegarde</h2>
        <p>Le fichier partenaires ne quitte pas ce navigateur : il n'est ni publié, ni stocké sur un
        serveur. C'est ce qui rend tenable l'engagement pris envers les partenaires — aucun annuaire
        consultable.</p>
        <div class="note warn"><p><strong>Le corollaire :</strong> vider le cache de ce navigateur
        efface le fichier. Exportez-le régulièrement et conservez le JSON comme un fichier client,
        parce que c'en est un.</p></div>
        <div class="btns">
          <button class="btn btn-dark" id="c_export">Exporter en JSON</button>
          <label class="btn btn-ghost" for="c_import" style="cursor:pointer">Importer un fichier
            <input type="file" id="c_import" accept="application/json" hidden></label>
        </div>
        <p id="c_io_msg" class="c-msg"></p>

        <hr>
        <h3 style="font-size:1rem">Comment l'utiliser au quotidien</h3>
        <ol style="padding-left:1.2em;color:var(--tx-2);font-size:.94rem;line-height:1.7">
          <li>Une demande arrive dans votre boîte, le département figure déjà dans l'objet.</li>
          <li>Le message contient un lien <strong>« Orienter cette demande »</strong> : il ouvre cette
              console avec la demande chargée et les partenaires déjà classés.</li>
          <li>Vous appelez le client pour qualifier — c'est ce que le réseau vend.</li>
          <li>Vous écrivez au partenaire retenu depuis la console, puis vous marquez la demande comme
              transmise : le tour de rôle s'incrémente et le prochain client ira à un autre.</li>
        </ol>
      </div>

    </div>
  </div>
</section>

<script>window.RF_CONSOLE = ${T.jsonRaw({ departements: depts, metiers })};</script>
<script src="assets/js/console.js" defer></script>`;

  return T.page({
    file: "console.html",
    noindex: true,
    title: `Console d'orientation | ${site.brand}`,
    desc: "Outil interne d'orientation des demandes vers les partenaires du réseau.",
    body, cities: []
  });
};
