/* =========================================================================
   Identité du site — modifiez ce fichier puis relancez `node build/build.js`
   ========================================================================= */
module.exports = {
  brand: "Rezo Enseigne",
  /* Marque commerciale ci-dessus, raison sociale ci-dessous : les mentions
     légales doivent porter la société immatriculée, pas le nom d'enseigne. */
  brandLegal: "Rezo Fabrik",

  /* ─────────────────────────────────────────────────────────────────────
     IDENTITÉ LÉGALE — source unique des mentions légales, des CGV et de
     la politique de confidentialité. Données relevées au répertoire
     Sirene (recherche-entreprises.api.gouv.fr) le 15/09/2026.

     La clé du numéro de TVA intracommunautaire se recalcule ainsi :
       clé = (12 + 3 × (SIREN mod 97)) mod 97
       (12 + 3 × 72) mod 97 = 228 mod 97 = 34  →  FR34953641701

     `capital` reste à compléter : le montant ne figure pas dans les
     données ouvertes, il est dans les statuts et sur l'extrait Kbis.
     ───────────────────────────────────────────────────────────────────── */
  legal: {
    denomination: "REZO FABRIK",
    forme: "société à responsabilité limitée",
    capital: "[capital social]",
    siren: "953 641 701",
    siret: "953 641 701 00024",
    rcs: "Perpignan 953 641 701",
    tva: "FR34953641701",
    naf: "43.32B",
    dirigeant: "Laurent Mienville",
    dateCreation: "11 juin 2023",
    /* Adresse du siège telle qu'immatriculée. Elle diffère de l'adresse
       postale d'usage ci-dessous : les mentions légales doivent porter
       celle du registre. */
    siege: "Angle de la rue de Close et boulevard Carrère Vieille, 66140 Canet-en-Roussillon"
  },
  tagline: "Réseau national enseigne, signalétique, imprimerie & web",
  /* Adresse publique du site. Utilisée pour les URL canoniques, le sitemap
     et les balises Open Graph. À remplacer par votre nom de domaine dès qu'il
     est en place. Ne pas éditer cette ligne à la main : passer par
     node build/domaine.js <domaine>, qui écrit aussi le fichier CNAME
     attendu par GitHub Pages et reconstruit le site. */
  domain: "https://rezo-enseigne.fr",
  lang: "fr-FR",

  /* Positionnement (repris dans les balises et le contenu) */
  baseline: "Un seul interlocuteur pour toute votre communication, de l'enseigne au site internet, partout en France.",
  role: "agence de communication et de mise en relation",

  /* Date de lancement du réseau. Elle fixe la date anniversaire à laquelle
     prend fin la remise de première année (voir `discount` dans
     build/data/partnership.js). Ne la modifiez qu'ici : la bannière, les
     cartes tarifaires et la FAQ s'y réfèrent toutes, aucune date n'est
     écrite en dur ailleurs. */
  launchDate: "2026-08-16",
  anniversary: "16 août",

  /* Expérience du dirigeant — c'est l'argument que ni une franchise ni une
     plateforme de mise en relation ne peuvent avancer. Repris sur l'accueil,
     la page méthode, la page partenaires et dans les données structurées. */
  experienceYears: 25,
  experienceLine: "25 ans de métier dans la communication visuelle",
  experienceText: "Le réseau n'est pas piloté par un informaticien qui a repéré un marché, mais par un professionnel de la communication visuelle qui l'exerce depuis vingt-cinq ans. C'est ce qui permet de qualifier un projet en dix minutes au téléphone, de traduire « je voudrais quelque chose de visible » en cahier des charges technique, et de repérer immédiatement un devis auquel il manque la moitié des postes.",

  /* Contact — répliqué dans assets/js/config.js */
  /* Adresse opérationnelle actuelle. À basculer sur contact@rezo-enseigne.fr
     et partenaires@rezo-enseigne.fr une fois le domaine déposé et la
     redirection e-mail créée chez Gandi (incluse avec le domaine). */
  email: "commercial-rezofabrik@gmail.com",
  emailPro: "commercial-rezofabrik@gmail.com",
  phoneDisplay: "07 75 76 92 32",
  phoneHref: "+33775769232",

  /* Siège social — repris dans le pied de page, les mentions légales
     et les données structurées (Organization / LocalBusiness). */
  address: {
    street: "9 rue de la Close",
    cp: "66140",
    city: "Canet-en-Roussillon",
    region: "Occitanie",
    country: "FR"
  },

  /* Ville pilote */
  pilotCity: "perpignan",

  /* Chiffres affichés (à ajuster au réel) */
  stats: [
    { n: "25 ans", l: "d'expérience en communication visuelle" },
    { n: "48 h", l: "pour recevoir vos premières propositions" },
    { n: "100 %", l: "gratuit et sans engagement pour le client" },
    { n: "France", l: "entière, DOM inclus" }
  ],

  /* Réseaux (laisser vide pour masquer) */
  social: {
    linkedin: "",
    facebook: "",
    instagram: ""
  }
};
