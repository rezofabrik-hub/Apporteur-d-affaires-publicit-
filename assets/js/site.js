/* =========================================================================
   Rezo Enseignes — comportements du site (sans dépendance externe)
   ========================================================================= */
(function () {
  "use strict";

  var CFG = window.RF_CONFIG || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------- *
   * 1. Navigation mobile
   * ----------------------------------------------------------------- */
  function initNav() {
    var burger = $(".burger");
    var mnav = $(".mnav");
    if (burger && mnav) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        mnav.classList.toggle("open", !open);
        document.body.style.overflow = !open ? "hidden" : "";
      });
    }

    /* Menus déroulants : survol sur pointeur fin, clic partout, clavier */
    $$(".drop").forEach(function (drop) {
      var btn = drop.querySelector("button");
      if (!btn) return;
      /* Fermeture différée. Même avec le pont CSS, un menu qui se referme à
         l'instant précis où le pointeur sort est impitoyable : il suffit de
         frôler le bord en visant un lien pour tout perdre et devoir
         recommencer. Un délai de 180 ms rend le geste tolérant sans jamais
         donner l'impression que le menu s'attarde. */
      var minuteur = null;
      var close = function () {
        clearTimeout(minuteur);
        drop.dataset.open = "false"; btn.setAttribute("aria-expanded", "false");
      };
      var closeSoon = function () {
        clearTimeout(minuteur);
        minuteur = setTimeout(close, 180);
      };
      var open  = function () {
        clearTimeout(minuteur);
        drop.dataset.open = "true";  btn.setAttribute("aria-expanded", "true");
      };

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        drop.dataset.open === "true" ? close() : open();
      });
      if (window.matchMedia("(hover: hover)").matches) {
        drop.addEventListener("mouseenter", open);
        drop.addEventListener("mouseleave", closeSoon);
      }
      drop.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
      document.addEventListener("click", function (e) { if (!drop.contains(e.target)) close(); });
    });
  }

  /* ----------------------------------------------------------------- *
   * 2. Recherche de ville (filtre instantané)
   * ----------------------------------------------------------------- */
  function initCitySearch() {
    var input = $("#city-search");
    if (!input) return;
    var chips = $$(".city-chip");
    var empty = $(".city-empty");
    var norm = function (s) {
      return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    };
    input.addEventListener("input", function () {
      var q = norm(input.value);
      var shown = 0;
      chips.forEach(function (c) {
        var hit = !q || norm(c.dataset.search || c.textContent).indexOf(q) !== -1;
        c.hidden = !hit;
        if (hit) shown++;
      });
      $$(".city-group").forEach(function (g) {
        g.hidden = !g.querySelector(".city-chip:not([hidden])");
      });
      if (empty) empty.classList.toggle("show", shown === 0);
    });
  }

  /* ----------------------------------------------------------------- *
   * 3. Formulaires multi-étapes
   * ----------------------------------------------------------------- */
  function initSteps(form) {
    var steps = $$(".fstep", form);
    if (steps.length < 2) return null;
    var stepper = $(".stepper", form);
    var marks = stepper ? $$("div", stepper) : [];
    var i = 0;

    function paint() {
      steps.forEach(function (s, n) { s.classList.toggle("active", n === i); });
      marks.forEach(function (m, n) {
        m.classList.toggle("done", n < i);
        m.classList.toggle("now", n === i);
      });
      $$("[data-prev]", form).forEach(function (b) { b.style.visibility = i === 0 ? "hidden" : "visible"; });
      $$("[data-next]", form).forEach(function (b) { b.hidden = i === steps.length - 1; });
      $$("[data-submit]", form).forEach(function (b) { b.hidden = i !== steps.length - 1; });
    }

    function valid() {
      var ok = true;
      $$("[required]", steps[i]).forEach(function (el) {
        var bad = false;
        if (el.type === "checkbox") bad = !el.checked;
        else if (el.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(el.value.trim());
        else bad = !el.value.trim();
        el.setAttribute("aria-invalid", String(bad));
        var msg = el.closest(".field, .consent") && el.closest(".field, .consent").querySelector(".err");
        if (msg) msg.classList.toggle("show", bad);
        if (bad && ok) { el.focus(); ok = false; }
      });
      /* Groupes de cases obligatoires (au moins une coche) */
      $$("fieldset[data-require-one]", steps[i]).forEach(function (fs) {
        var any = $$("input:checked", fs).length > 0;
        var msg = fs.querySelector(".err");
        if (msg) msg.classList.toggle("show", !any);
        if (!any && ok) { fs.scrollIntoView({ block: "center" }); ok = false; }
      });
      return ok;
    }

    $$("[data-next]", form).forEach(function (b) {
      b.addEventListener("click", function () {
        if (!valid()) return;
        i = Math.min(i + 1, steps.length - 1);
        paint();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    $$("[data-prev]", form).forEach(function (b) {
      b.addEventListener("click", function () {
        i = Math.max(i - 1, 0);
        paint();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    paint();
    return { validateCurrent: valid };
  }

  /* ----------------------------------------------------------------- *
   * 4. Collecte et envoi
   * ----------------------------------------------------------------- */
  function collect(form) {
    var out = {};
    new FormData(form).forEach(function (v, k) {
      if (k in out) { out[k] = [].concat(out[k], v); } else { out[k] = v; }
    });
    out._page = location.pathname.replace(/^\//, "") || "index.html";
    out._url = location.href;
    out._date = new Date().toISOString();
    return out;
  }

  function backup(data) {
    try {
      var key = CFG.storageKey || "rf_leads_backup";
      var all = JSON.parse(localStorage.getItem(key) || "[]");
      all.push(data);
      localStorage.setItem(key, JSON.stringify(all.slice(-50)));
    } catch (e) { /* stockage indisponible : sans conséquence */ }
  }

  function mailtoFallback(form, data) {
    var to = form.dataset.kind === "pro"
      ? (CFG.emailPro || CFG.email || "")
      : (CFG.email || "");
    var subject = form.dataset.kind === "pro"
      ? "Candidature partenaire — " + (data.entreprise || data.nom || "")
      : "Demande de devis — " + (data.prestation || "signalétique") + " — " + (data.ville || "");
    var lines = Object.keys(data)
      .filter(function (k) { return k[0] !== "_" && data[k] !== ""; })
      .map(function (k) {
        var label = k.replace(/_/g, " ");
        return label.charAt(0).toUpperCase() + label.slice(1) + " : " +
          (Array.isArray(data[k]) ? data[k].join(", ") : data[k]);
      });
    lines.push("", "— Envoyé depuis " + location.href);
    return "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function initForms() {
    $$("form[data-kind]").forEach(function (form) {
      var steps = initSteps(form);
      var status = $(".form-status", form);
      var submitBtn = $("[data-submit]", form);

      /* Champs conditionnels : [data-show-if="champ=valeur"] */
      function refreshConditionals() {
        $$("[data-show-if]", form).forEach(function (el) {
          var parts = el.dataset.showIf.split("=");
          var name = parts[0], want = parts[1];
          var hit = $$('[name="' + name + '"]', form).some(function (inp) {
            if (inp.type === "checkbox" || inp.type === "radio") return inp.checked && inp.value === want;
            return inp.value === want;
          });
          el.hidden = !hit;
          $$("[required]", el).forEach(function (r) { r.disabled = !hit; });
        });
      }
      form.addEventListener("change", refreshConditionals);
      refreshConditionals();

      /**
       * Département d'une demande : code sur deux caractères et libellé.
       * Le code postal prime — c'est une donnée saisie par le demandeur et
       * non un choix dans une liste. La Corse est le seul cas ambigu : 20xxx
       * ne distingue pas 2A de 2B, on ne tranche donc pas.
       */
      function deduireDepartement(form, data) {
        /* Ce que la liste de suggestion sait de la ville saisie. */
        var parVille = null;
        var liste = document.getElementById("villes-list");
        if (liste && data.ville) {
          var cible = String(data.ville).trim().toLowerCase();
          var opts = liste.getElementsByTagName("option");
          for (var i = 0; i < opts.length; i++) {
            if (String(opts[i].value).trim().toLowerCase() === cible) {
              parVille = { code: opts[i].getAttribute("data-dept") || "",
                           nom: opts[i].getAttribute("data-dept-nom") || "" };
              break;
            }
          }
        }

        var cp = String(data.code_postal || "").replace(/\D/g, "");
        if (cp.length >= 5) {
          var deb = cp.slice(0, 2);
          var r;
          if (deb === "20") r = { code: "2A/2B", nom: "Corse" };
          else if (deb === "97" || deb === "98") r = { code: cp.slice(0, 3), nom: "Outre-mer" };
          else r = { code: deb, nom: "" };
          /* Le code postal fait foi sur le numéro ; le nom du département,
             lui, ne s'en déduit pas — on le reprend de la ville quand les
             deux concordent, pour que l'e-mail reçu se lise sans décodage. */
          if (!r.nom && parVille && parVille.code === r.code) r.nom = parVille.nom;
          return r;
        }
        return parVille;
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (steps && !steps.validateCurrent()) return;

        var data = collect(form);
        backup(data);

        /* Chaîne de points de collecte, essayés dans l'ordre.
           Raison d'être : FormSubmit n'accepte une adresse qu'après un clic
           dans un e-mail de confirmation, et cet e-mail se perd — filtre
           anti-spam, onglet « Promotions », alias non encore créé. Tant que
           l'adresse principale n'est pas confirmée, l'endpoint répond 200
           avec `success: "false"` et la demande n'arrive nulle part. Une
           seconde adresse en réserve suffit à faire passer le formulaire :
           celle des deux qui est activée prend le relais, sans qu'aucune
           ligne ne soit à changer le jour où la première est confirmée. */
        var endpoints = (form.dataset.kind === "pro"
          ? [CFG.endpointPro, CFG.endpointProAlt, CFG.endpointClient]
          : [CFG.endpointClient, CFG.endpointClientAlt, CFG.endpointPro]
        ).filter(function (u, i, all) { return u && all.indexOf(u) === i; });
        var endpoint = endpoints[0];

        function done(ok) {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label || "Envoyer"; }
          if (ok) {
            form.reset();
            location.href = (CFG.thanksUrl || "merci.html") +
              "?type=" + encodeURIComponent(form.dataset.kind || "client");
          } else if (status) {
            status.className = "form-status ko show";
            status.innerHTML = 'La transmission automatique n\'a pas abouti. Votre demande a été ' +
              'conservée : <a href="' + mailtoFallback(form, data) + '">cliquez ici pour la faire ' +
              'parvenir à notre bureau d\'études</a>.';
          }
        }

        if (!endpoint) {
          /* Mode secours : e-mail pré-rempli */
          window.location.href = mailtoFallback(form, data);
          if (status) {
            status.className = "form-status ok show";
            /* Sans point de collecte configuré, la demande transite par un
               e-mail que le visiteur doit valider. On nomme la destination —
               c'est elle qui rassure — sans jamais annoncer un envoi qui n'a
               pas encore eu lieu : quelqu'un qui croit avoir terminé ferme la
               fenêtre, et la demande est perdue. */
            status.textContent = "Votre demande part vers notre bureau d'études. " +
              "Dernière étape : validez l'envoi pour qu'elle nous parvienne.";
          }
          return;
        }

        if (submitBtn) {
          submitBtn.dataset.label = submitBtn.textContent;
          submitBtn.disabled = true;
          submitBtn.textContent = "Envoi en cours…";
        }
        if (CFG.web3formsKey) data.access_key = CFG.web3formsKey;

        /* Champs de service attendus par FormSubmit. Ils commencent tous par
           un souligné et ne sont jamais affichés dans l'e-mail reçu.
           `_captcha: false` évite d'imposer un reCAPTCHA au visiteur : le
           formulaire compte déjà cinq étapes, un robot n'irait pas au bout. */
        /* Département de la demande, déduit avant l'envoi. C'est LA donnée
           d'orientation : une demande sert à être transmise au partenaire de
           la zone, et retrouver le département à la main pour chaque e-mail
           reçu est le genre de friction qui fait perdre des heures dès la
           dizaine de demandes par semaine. Le code postal fait foi ; à défaut
           on retombe sur la ville, dont la liste de suggestion porte déjà son
           département. */
        var dep = deduireDepartement(form, data);
        if (dep) { data.departement = dep.code + (dep.nom ? " — " + dep.nom : ""); }

        if (endpoints.some(function (u) { return /formsubmit\.co/.test(u); })) {
          data._subject = (form.dataset.kind === "pro"
            ? "Candidature partenaire — "
            : "Demande de devis — ")
            + (dep ? "[" + dep.code + "] " : "")
            + (data.entreprise || data.nom || "site web")
            + (data.ville ? " · " + data.ville : "");
          data._template = "table";
          data._captcha = "false";
          if (data.email) data._replyto = data.email;
        }

        /* Délai de garde global. Sans lui, un réseau qui ne répond pas — 4G
           faible, tunnel, point de collecte indisponible — laisse le visiteur
           devant « Envoi en cours… » indéfiniment : il ferme la page et la
           demande est perdue. Passé ce délai on abandonne la chaîne et on
           bascule sur le repli e-mail, qui lui aboutit toujours. */
        var deadline = Date.now() + 16000;

        function attempt(i) {
          if (i >= endpoints.length || Date.now() >= deadline) { done(false); return; }

          var ctrl = window.AbortController ? new AbortController() : null;
          var budget = Math.min(8000, Math.max(2000, deadline - Date.now()));
          var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, budget);

          fetch(endpoints[i], {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(data),
            signal: ctrl ? ctrl.signal : undefined
          })
            /* FormSubmit peut répondre 200 avec `success: false` — adresse non
               confirmée, quota atteint. Se fier au seul code HTTP enverrait le
               visiteur sur la page de remerciement alors que rien n'est parti. */
            .then(function (r) {
              return r.json().then(function (j) {
                return r.ok && (j.success === undefined || j.success === true || j.success === "true");
              }, function () { return r.ok; });
            })
            .then(function (ok) {
              clearTimeout(timer);
              if (ok) done(true); else attempt(i + 1);
            })
            .catch(function () { clearTimeout(timer); attempt(i + 1); });
        }

        attempt(0);
      });
    });
  }

  /* ----------------------------------------------------------------- *
   * 5. Coordonnées injectées depuis la configuration
   * ----------------------------------------------------------------- */
  function initContacts() {
    $$("[data-cfg]").forEach(function (el) {
      var v = CFG[el.dataset.cfg];
      if (!v) return;
      if (el.tagName === "A") {
        el.href = el.dataset.cfg.indexOf("phone") === 0 ? "tel:" + v : "mailto:" + v;
        if (!el.hasAttribute("data-keep-text")) el.textContent = v;
      } else {
        el.textContent = v;
      }
    });
  }

  /* ----------------------------------------------------------------- *
   * 6. Page de remerciement
   * ----------------------------------------------------------------- */
  function initThanks() {
    var box = $("#thanks-msg");
    if (!box) return;
    var type = new URLSearchParams(location.search).get("type");
    if (type === "pro") {
      box.innerHTML = "<h1>Candidature transmise à notre bureau d'études</h1><p class=\"lead\">Merci d'avoir rejoint le réseau. " +
        "Nous étudions votre dossier et vos capacités de production, puis nous revenons vers vous sous 48 heures " +
        "ouvrées pour valider votre référencement et vous transmettre vos premières demandes.</p>";
    }
  }


  /* ----------------------------------------------------------------- *
   * 9. Zone d'intervention : trois départements au choix
   *
   * Le partenaire désigne librement ses trois départements — ils n'ont pas à
   * être limitrophes, parce qu'un atelier vise souvent une métropole située
   * un peu plus loin plutôt que la campagne d'à côté. On se contente donc de
   * deux services : deviner son département depuis le code postal, et lui
   * rappeler quels sont ses voisins s'il veut s'en inspirer.
   * ----------------------------------------------------------------- */
  function initZoneDepts() {
    var box = $("#zone-depts");
    var raw = $("#dept-data");
    if (!box || !raw) return;

    var DEPTS;
    try { DEPTS = JSON.parse(raw.textContent); } catch (e) { return; }

    var sel = $("#p_dept", box);
    var d2 = $("#p_dept2", box);
    var d3 = $("#p_dept3", box);
    var suggest = $("#dept-suggest", box);
    var count = $("#dept-count", box);
    var cp = $("#p_cp");
    if (!sel || !d2 || !d3) return;

    /* Le code postal donne le département, sauf en Corse où 20xxx ne permet
       pas de trancher entre 2A et 2B : on laisse alors le partenaire choisir. */
    function deptFromCp(v) {
      var d = String(v || "").replace(/\D/g, "");
      if (d.length < 2) return "";
      if (d.indexOf("97") === 0 || d.indexOf("98") === 0) {
        return DEPTS[d.slice(0, 3)] ? d.slice(0, 3) : "";
      }
      var two = d.slice(0, 2);
      if (two === "20") return "";
      return DEPTS[two] ? two : "";
    }

    var codeOf = function (v) { return String(v || "").split(" - ")[0]; };

    function majSuggestion() {
      var d = DEPTS[sel.value];
      if (!suggest) return;
      if (!d || !d.v.length) { suggest.textContent = ""; return; }
      suggest.innerHTML = "— voisins du " + sel.value + " : <b>" +
        d.v.map(function (v) { return v + " " + DEPTS[v].n; }).join("</b>, <b>") + "</b>";
    }

    /* Un même département déclaré deux fois réduirait la zone sans que le
       partenaire s'en rende compte : on le signale au lieu de l'accepter. */
    function majCompteur() {
      var choisis = [sel.value, codeOf(d2.value), codeOf(d3.value)].filter(Boolean);
      var uniques = choisis.filter(function (c, i) { return choisis.indexOf(c) === i; });
      if (choisis.length !== uniques.length) {
        count.textContent = "Vous avez indiqué deux fois le même département — corrigez pour couvrir trois zones distinctes.";
        count.style.color = "var(--signal-600)";
        return;
      }
      count.style.color = "";
      count.textContent = uniques.length + " département" + (uniques.length > 1 ? "s" : "") +
        " sur 3" + (uniques.length < 3 ? " — vous pouvez en désigner encore " + (3 - uniques.length) + "." : " : votre zone est complète.");
    }

    sel.addEventListener("change", function () {
      sel.dataset.touched = "1";
      majSuggestion(); majCompteur();
    });
    d2.addEventListener("change", majCompteur);
    d3.addEventListener("change", majCompteur);

    if (cp) {
      cp.addEventListener("input", function () {
        if (sel.dataset.touched === "1") return;
        var d = deptFromCp(cp.value);
        if (d && sel.value !== d) { sel.value = d; majSuggestion(); majCompteur(); }
      });
    }

    majSuggestion();
    majCompteur();
  }

  /* ----------------------------------------------------------------- *
   * 7. Année courante
   * ----------------------------------------------------------------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ----------------------------------------------------------------- *
   * 8. Pré-remplissage depuis l'URL (devis.html?prestation=…&ville=…)
   * ----------------------------------------------------------------- */
  function initPrefill() {
    var form = $('form[data-kind="client"]');
    if (!form) return;
    var q = new URLSearchParams(location.search);

    var prestation = q.get("prestation");
    if (prestation) {
      $$('[name="prestation"]', form).forEach(function (inp) {
        if (inp.value.toLowerCase() === prestation.toLowerCase()) inp.checked = true;
      });
    }
    var ville = q.get("ville");
    if (ville) {
      var champ = $("#ville", form);
      if (champ) champ.value = ville;
    }
  }

  /* ----------------------------------------------------------------- *
   * 9. Filtre des réalisations par métier
   * ----------------------------------------------------------------- */
  function initProjects() {
    var bar = $(".proj-filters");
    if (!bar) return;
    var cards = $$(".proj");
    var empty = $(".proj-empty");
    $$("button", bar).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        $$("button", bar).forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        var shown = 0;
        cards.forEach(function (c) {
          var hit = f === "all" || c.dataset.service === f;
          c.hidden = !hit;
          if (hit) shown++;
        });
        if (empty) empty.classList.toggle("show", shown === 0);
      });
    });
  }

  function boot() {
    initNav(); initCitySearch(); initForms(); initPrefill(); initZoneDepts();
    initProjects(); initContacts(); initThanks(); initYear();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
