/* =========================================================================
   Page de paiement — privée, transmise après validation du dossier
   -------------------------------------------------------------------------
   Elle n'est référencée nulle part : ni dans la navigation, ni au sitemap,
   et elle porte un `noindex`. Son adresse se communique par e-mail à un
   partenaire dont le dossier a été vérifié.

   Ce n'est pas de la sécurité — une URL n'est pas un mot de passe, et
   quiconque la reçoit peut la partager. C'est un choix de parcours : le
   paiement vient après la vérification, et un bouton « payer » en accès
   libre ferait entrer des entreprises non contrôlées qu'il faudrait
   rembourser. Rien de confidentiel ne figure sur cette page ; le pire qui
   puisse arriver est qu'une entreprise non vérifiée paie, auquel cas le
   règlement se rembourse en un clic depuis Stripe.
   ========================================================================= */
const T = require("../lib/tpl");
const { site, esc } = T;
const P = require("../data/partnership");

module.exports = function paiementPage(cities) {
  const PAY = P.paiement || { liens: {} };

  /* La formule gratuite n'a rien à régler : elle n'a pas sa place ici. */
  const plans = P.plans.filter((pl) => !pl.free);

  const carte = (pl) => {
    const lien = (PAY.liens || {})[pl.id];
    const bouton = lien
      ? `<a class="btn btn-pro btn-block btn-lg" href="${esc(lien)}" rel="noopener">
           Régler ${esc(pl.price)} ${esc(P.currency)} par carte</a>`
      : `<p class="note-attente">Le lien de paiement de cette formule vous est transmis
           par e-mail avec votre confirmation d'adhésion.</p>`;
    return `
<div class="plan${pl.featured ? " plan-featured" : ""}">
  ${pl.tier ? `<span class="plan-tier">${esc(pl.tier)}</span>` : ""}
  <h3>${esc(pl.name)}</h3>
  <div class="plan-price">
    <b>${esc(pl.price)}</b><span>${esc(P.currency)} ${esc(P.priceSuffix)}</span>
    <em>/ ${esc(pl.duration)}</em>
  </div>
  <p class="plan-audience">${esc(pl.pitch)}</p>
  ${bouton}
</div>`;
  };

  const body = `
<section class="hero hero-in-page">
  <div class="wrap hero-in">
    <span class="eyebrow">Espace partenaire</span>
    <h1>Régler votre abonnement</h1>
    <p class="lead">Votre dossier a été vérifié et votre formule retenue. Il ne reste qu'à régler la
    période souscrite. <strong>Paiement unique</strong> pour la durée choisie : il n'y a ni mandat de
    prélèvement, ni reconduction automatique à l'échéance.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="plans">${plans.map(carte).join("")}</div>
    <p class="center" style="margin-top:26px;font-size:.87rem;color:var(--tx-3)">${esc(P.vatNote)}</p>
  </div>
</section>

<section class="sec bg-2">
  <div class="wrap wrap-narrow">
    <div class="grid g-halves">
      <div>
        <h2 style="font-size:clamp(1.3rem,2.4vw,1.8rem)">Ce qui se passe après le paiement</h2>
        <ul class="checks">
          <li>${esc(PAY.delaiActivation || "Votre accès est ouvert sous 24 heures ouvrées.")}</li>
          <li>${esc(PAY.factureNote || "")}</li>
          <li>Votre zone d'intervention et vos métiers déclarés sont enregistrés : les demandes
              correspondantes vous parviennent dès l'ouverture de l'accès.</li>
          <li>Aucun prélèvement ultérieur. Nous vous recontactons avant l'échéance avec le bilan
              des demandes transmises, et vous décidez de la suite.</li>
        </ul>
      </div>
      <div>
        <div class="aside-card">
          <h3>Payer autrement</h3>
          ${PAY.virement ? `<p>${esc(PAY.ribNote)}</p>` : ""}
          <p>Une question sur la facturation, la TVA ou le périmètre souscrit ?</p>
          <p style="font-weight:700">
            <a data-cfg="phone" href="tel:${esc(site.phoneHref)}" style="color:var(--pro-600)">${esc(site.phoneDisplay)}</a><br>
            <a data-cfg="emailPro" href="mailto:${esc(site.emailPro)}" style="color:var(--pro-600)">${esc(site.emailPro)}</a>
          </p>
          <p style="font-size:.86rem;color:var(--tx-3);margin-bottom:0">Le paiement par carte est traité
          par Stripe. Nous ne voyons ni ne conservons vos coordonnées bancaires.</p>
        </div>
      </div>
    </div>
    <p style="margin-top:30px;font-size:.9rem;color:var(--tx-3)">En réglant, vous acceptez les
    <a href="conditions-generales.html">conditions générales de vente</a>.</p>
  </div>
</section>`;

  return T.page({
    file: "paiement.html",
    noindex: true,
    title: `Régler votre abonnement partenaire | ${site.brand}`,
    desc: "Page de règlement réservée aux partenaires dont le dossier a été validé.",
    body, cities
  });
};
