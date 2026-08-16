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
      var close = function () { drop.dataset.open = "false"; btn.setAttribute("aria-expanded", "false"); };
      var open  = function () { drop.dataset.open = "true";  btn.setAttribute("aria-expanded", "true"); };

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        drop.dataset.open === "true" ? close() : open();
      });
      if (window.matchMedia("(hover: hover)").matches) {
        drop.addEventListener("mouseenter", open);
        drop.addEventListener("mouseleave", close);
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

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (steps && !steps.validateCurrent()) return;

        var data = collect(form);
        backup(data);

        var endpoint = form.dataset.kind === "pro"
          ? (CFG.endpointPro || CFG.endpointClient)
          : (CFG.endpointClient || CFG.endpointPro);

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

        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (r) { done(r.ok); })
          .catch(function () { done(false); });
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
    initNav(); initCitySearch(); initForms(); initPrefill();
    initProjects(); initContacts(); initThanks(); initYear();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
