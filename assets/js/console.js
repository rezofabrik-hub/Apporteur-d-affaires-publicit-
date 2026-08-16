/* =========================================================================
   Console d'orientation — outil interne, jamais public
   -------------------------------------------------------------------------
   CE QU'ELLE FAIT, ET CE QU'ELLE NE FAIT PAS

   Elle décide QUI doit recevoir une demande. Elle ne l'envoie pas.

   Ce n'est pas une limite technique, c'est le cœur de la promesse : le site
   affirme partout que chaque demande est qualifiée par téléphone avant
   d'être transmise, et que c'est ce qui la distingue d'un contact revendu.
   Un routage entièrement automatique supprimerait précisément ce qui est
   vendu. La console fait donc le travail fastidieux — croiser une zone, un
   métier, des capacités et un tour de rôle sur des dizaines de fiches — et
   laisse l'appel à celui qui sait le passer.

   OÙ VIVENT LES DONNÉES

   Dans le navigateur, et nulle part ailleurs. Aucun serveur, aucune base,
   aucun fichier publié : le fichier partenaires ne quitte pas le poste.
   C'est la seule implémentation compatible avec l'engagement pris envers
   les partenaires — « nous ne publions aucun annuaire ». L'export JSON
   permet la sauvegarde et le passage d'un poste à l'autre ; il est à
   conserver comme un fichier client, parce que c'en est un.

   TOUR DE RÔLE

   À pertinence égale, la console propose d'abord le partenaire qui a reçu
   le moins de demandes. Sans cela, le premier inscrit d'un département
   capte tout, les autres ne renouvellent pas, et la zone se vide. Le
   compteur s'incrémente quand on marque une demande comme transmise.
   ========================================================================= */
(function () {
  "use strict";

  var CLE = "rf_partenaires_v1";
  var dernierCtx = null, derniersRes = [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var DEPTS = window.RF_CONSOLE.departements;   // { "66": {nom, region} }
  var METIERS = window.RF_CONSOLE.metiers;      // [{slug, nom}]
  var CFG = window.RF_CONFIG || {};

  /* ------------------------------------------------------------ stockage */
  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE) || "[]"); } catch (e) { return []; }
  }
  function ecrire(list) {
    localStorage.setItem(CLE, JSON.stringify(list));
    rendreListe();
    majCompteurs();
    /* Rafraîchir les résultats si une recherche est en cours, mais SANS
       repasser par l'URL : le formulaire peut avoir été ajusté à la main
       depuis, et le réinitialiser effacerait ces ajustements. */
    if (dernierCtx) chercher();
  }

  /* ----------------------------------------------------------- normalisation */
  var norm = function (s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  };

  /* Un département saisi « 6 », « 06 » ou « 6 » doit tomber sur le même. */
  function normDept(d) {
    d = String(d || "").toUpperCase().replace(/[^0-9AB]/g, "");
    if (!d) return "";
    if (/^\d$/.test(d)) return "0" + d;
    return d.slice(0, 3);
  }

  /* ------------------------------------------------------------- moteur */
  /**
   * Partenaires pertinents pour une demande, du plus au moins évident.
   * La précision de la zone prime : un partenaire dont le département est
   * explicitement couvert passe devant un régional, qui passe devant un
   * national. À pertinence égale, le tour de rôle départage.
   */
  function orienter(dept, metiers, options) {
    var o = options || {};
    var region = (DEPTS[dept] || {}).region || "";
    var out = [];

    lire().forEach(function (p) {
      if (p.actif === false) return;

      /* Zone */
      var portee = null;
      if (p.formule === "france") portee = { rang: 3, texte: "couverture nationale" };
      if (p.formule === "region" && region && norm(p.region) === norm(region)) {
        portee = { rang: 2, texte: "région " + region };
      }
      if ((p.departements || []).map(normDept).indexOf(dept) !== -1) {
        portee = { rang: 1, texte: "département " + dept + " dans sa zone" };
      }
      if (!portee) return;

      /* Métier : au moins un en commun, sauf si aucun métier n'est demandé */
      var communs = (metiers.length === 0) ? (p.metiers || [])
        : (p.metiers || []).filter(function (m) { return metiers.indexOf(m) !== -1; });
      if (metiers.length && communs.length === 0) return;

      /* Montant minimum de chantier déclaré par le partenaire */
      if (o.budget && p.mini && Number(o.budget) < Number(p.mini)) return;

      /* Capacité technique exigée (nacelle, laser…) */
      if (o.capacite && (p.capacites || []).indexOf(o.capacite) === -1) return;

      out.push({
        p: p,
        rang: portee.rang,
        portee: portee.texte,
        communs: communs,
        envois: Number(p.envois || 0)
      });
    });

    out.sort(function (a, b) {
      if (a.rang !== b.rang) return a.rang - b.rang;
      if (a.envois !== b.envois) return a.envois - b.envois;     // tour de rôle
      return b.communs.length - a.communs.length;
    });
    return out;
  }

  /* ------------------------------------------------------- e-mail prêt */
  function courriel(r, ctx) {
    var nomsMetiers = ctx.metiers.map(function (m) {
      var t = METIERS.filter(function (x) { return x.slug === m; })[0];
      return t ? t.nom : m;
    });
    var objet = "Demande " + (ctx.dept ? "[" + ctx.dept + "] " : "") +
      (nomsMetiers[0] || "communication visuelle") + (ctx.ville ? " — " + ctx.ville : "");

    var l = [];
    l.push("Bonjour " + (r.p.contact || "").split(" ")[0] + ",");
    l.push("");
    l.push("Une demande correspondant à votre zone et à vos métiers vient d'être qualifiée.");
    l.push("");
    if (ctx.ville || ctx.dept) l.push("Lieu : " + (ctx.ville || "") + (ctx.dept ? " (" + ctx.dept + ")" : ""));
    if (nomsMetiers.length) l.push("Métier : " + nomsMetiers.join(", "));
    if (ctx.budget) l.push("Ordre de budget : " + ctx.budget + " €");
    if (ctx.delai) l.push("Délai souhaité : " + ctx.delai);
    l.push("");
    l.push("Descriptif :");
    l.push(ctx.description || "[à compléter]");
    l.push("");
    l.push("Merci de me confirmer si vous la prenez, afin que je transmette vos coordonnées");
    l.push("au client. Sans retour de votre part sous 24 heures, je la proposerai à un autre");
    l.push("partenaire — je préfère vous prévenir plutôt que de vous la laisser sans réponse.");
    l.push("");
    l.push("Bien à vous,");
    l.push("");
    l.push((CFG.email || "").split("@")[0] === "" ? "" : "");
    l.push("Rezo Enseignes — " + (CFG.phone || ""));
    return { objet: objet, corps: l.join("\n") };
  }

  /* ------------------------------------------------------------- rendu */
  function ligneResultat(r, i, ctx) {
    var p = r.p;
    var mail = courriel(r, ctx);
    var lien = "mailto:" + encodeURIComponent(p.email || "") +
      "?subject=" + encodeURIComponent(mail.objet) +
      "&body=" + encodeURIComponent(mail.corps);
    return '<article class="res' + (i === 0 ? " res-top" : "") + '">' +
      '<div class="res-h">' +
        '<b>' + esc(p.nom) + '</b>' +
        '<span class="res-tag">' + esc(r.portee) + '</span>' +
        '<span class="res-tag res-tour">' + r.envois + ' demande' + (r.envois > 1 ? "s" : "") + ' reçue' + (r.envois > 1 ? "s" : "") + '</span>' +
      '</div>' +
      '<p class="res-meta">' + esc(p.contact || "") + (p.tel ? " · " + esc(p.tel) : "") +
        (p.email ? " · " + esc(p.email) : "") + '</p>' +
      '<p class="res-meta">Métiers en commun : ' + (r.communs.length ? esc(r.communs.map(nomMetier).join(", ")) : "—") + '</p>' +
      '<div class="res-act">' +
        '<a class="btn btn-pro btn-sm" href="' + lien + '">Écrire à ce partenaire</a>' +
        '<button class="btn btn-ghost btn-sm" data-copier="' + i + '">Copier le message</button>' +
        '<button class="btn btn-ghost btn-sm" data-transmis="' + esc(p.id) + '">Marquer comme transmise</button>' +
      '</div></article>';
  }

  function nomMetier(slug) {
    var t = METIERS.filter(function (x) { return x.slug === slug; })[0];
    return t ? t.nom : slug;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function chercher() {
    var dept = normDept($("#c_dept").value);
    var metiers = $$("#c_metiers input:checked").map(function (e) { return e.value; });
    var ctx = {
      dept: dept,
      ville: $("#c_ville").value.trim(),
      metiers: metiers,
      budget: $("#c_budget").value.trim(),
      delai: $("#c_delai").value,
      description: $("#c_desc").value.trim()
    };
    var res = orienter(dept, metiers, {
      budget: ctx.budget,
      capacite: $("#c_capacite").value
    });
    dernierCtx = ctx; derniersRes = res;

    var zone = DEPTS[dept];
    var entete = dept
      ? '<p class="c-zone">' + esc(dept) + (zone ? " — " + esc(zone.nom) + " · " + esc(zone.region) : "") + '</p>'
      : "";

    if (!res.length) {
      $("#c_res").innerHTML = entete +
        '<div class="c-vide"><b>Aucun partenaire ne correspond.</b>' +
        '<p>Soit la zone n\'est pas encore couverte, soit le métier demandé n\'y est pas représenté. ' +
        'Deux réponses possibles : élargir la recherche en décochant un métier, ou traiter la demande ' +
        'en direct et faire de cette zone une priorité de recrutement.</p></div>';
      return;
    }
    var alerte = res.length < 2
      ? '<div class="c-alerte">Un seul partenaire disponible sur cette zone. S\'il refuse, ' +
        'la demande reste sans réponse : zone à renforcer.</div>' : "";
    $("#c_res").innerHTML = entete + alerte +
      '<p class="c-compte">' + res.length + ' partenaire' + (res.length > 1 ? "s" : "") +
      ' pertinent' + (res.length > 1 ? "s" : "") + ', du plus évident au moins évident</p>' +
      res.slice(0, 6).map(function (r, i) { return ligneResultat(r, i, ctx); }).join("");
  }

  /* --------------------------------------------------- fiches partenaires */
  function rendreListe() {
    var list = lire();
    var el = $("#c_liste");
    if (!list.length) {
      el.innerHTML = '<p class="c-vide2">Aucun partenaire enregistré. Ajoutez le premier ci-dessous, ' +
        'ou importez un fichier exporté depuis un autre poste.</p>';
      return;
    }
    el.innerHTML = list.map(function (p) {
      return '<div class="c-fiche' + (p.actif === false ? " off" : "") + '">' +
        '<div><b>' + esc(p.nom) + '</b> <span class="res-tag">' + esc(p.formule || "") + '</span>' +
        '<br><small>' + esc((p.departements || []).join(", ") || p.region || "France") +
        ' · ' + esc((p.metiers || []).length) + ' métier(s) · ' + Number(p.envois || 0) + ' envoi(s)</small></div>' +
        '<div><button class="btn btn-ghost btn-sm" data-sup="' + esc(p.id) + '">Supprimer</button></div>' +
        '</div>';
    }).join("");
  }

  function majCompteurs() {
    var list = lire();
    $("#c_nb").textContent = list.length;
    var depts = {};
    list.forEach(function (p) { (p.departements || []).forEach(function (d) { depts[normDept(d)] = 1; }); });
    $("#c_nbdept").textContent = Object.keys(depts).length;
  }

  function ajouter(e) {
    e.preventDefault();
    var f = e.target;
    var p = {
      id: "p" + Date.now(),
      nom: f.nom.value.trim(),
      contact: f.contact.value.trim(),
      email: f.email.value.trim(),
      tel: f.tel.value.trim(),
      formule: f.formule.value,
      region: f.region.value.trim(),
      departements: f.departements.value.split(/[^0-9AB]+/i).filter(Boolean).map(normDept),
      metiers: $$("#c_form_metiers input:checked").map(function (x) { return x.value; }),
      capacites: $$("#c_form_cap input:checked").map(function (x) { return x.value; }),
      mini: Number(f.mini.value || 0),
      actif: true,
      envois: 0
    };
    if (!p.nom) return;
    var l = lire(); l.push(p); ecrire(l);
    f.reset();
    $("#c_form_msg").textContent = p.nom + " ajouté.";
    setTimeout(function () { $("#c_form_msg").textContent = ""; }, 2500);
  }

  /* ------------------------------------------------------------- actions */
  document.addEventListener("click", function (e) {
    var t = e.target;

    if (t.dataset.sup) {
      var l = lire().filter(function (p) { return p.id !== t.dataset.sup; });
      ecrire(l);
    }

    if (t.dataset.transmis) {
      var l2 = lire().map(function (p) {
        if (p.id === t.dataset.transmis) {
          p.envois = Number(p.envois || 0) + 1;
          p.dernier = new Date().toISOString().slice(0, 10);
        }
        return p;
      });
      ecrire(l2);
      t.textContent = "Comptabilisée";
      t.disabled = true;
    }

    if (t.dataset.copier !== undefined && derniersRes.length) {
      var r = derniersRes[Number(t.dataset.copier)];
      var m = courriel(r, dernierCtx);
      var txt = m.objet + "\n\n" + m.corps;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(txt).then(function () {
          t.textContent = "Copié"; setTimeout(function () { t.textContent = "Copier le message"; }, 2000);
        });
      }
    }
  });

  /* ------------------------------------------------------ import / export */
  function exporter() {
    var blob = new Blob([JSON.stringify(lire(), null, 1)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "partenaires-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importer(e) {
    var f = e.target.files[0];
    if (!f) return;
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var d = JSON.parse(fr.result);
        if (!Array.isArray(d)) throw new Error("format");
        ecrire(d);
        $("#c_io_msg").textContent = d.length + " partenaire(s) importé(s).";
      } catch (err) {
        $("#c_io_msg").textContent = "Fichier illisible : attendu un export JSON de cette console.";
      }
    };
    fr.readAsText(f);
  }

  /* Pré-remplissage depuis l'URL. C'est le cœur du parcours : l'e-mail de
     demande contient un lien vers cette page avec le département, le métier
     et le budget en paramètres. La console s'ouvre donc déjà renseignée et
     déjà classée — il ne reste qu'à valider. */
  function depuisUrl() {
    var q = new URLSearchParams(location.search);
    if (!q.toString()) return false;
    var mettre = function (id, v) { if (v && $(id)) $(id).value = v; };
    mettre("#c_dept", normDept(q.get("dept")));
    mettre("#c_ville", q.get("ville"));
    mettre("#c_budget", (q.get("budget") || "").replace(/[^0-9]/g, ""));
    mettre("#c_delai", q.get("delai"));
    mettre("#c_desc", q.get("desc"));
    var m = (q.get("metiers") || "").split(",").filter(Boolean);
    $$("#c_metiers input").forEach(function (e) { e.checked = m.indexOf(e.value) !== -1; });
    return !!q.get("dept");
  }

  /* ---------------------------------------------------------------- init */
  function init() {
    if (!$("#c_res")) return;
    $("#c_chercher").addEventListener("click", chercher);
    $("#c_ajout").addEventListener("submit", ajouter);
    $("#c_export").addEventListener("click", exporter);
    $("#c_import").addEventListener("change", importer);
    rendreListe();
    majCompteurs();
    if (depuisUrl()) chercher();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
