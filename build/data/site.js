/* =========================================================================
   Identité du site — modifiez ce fichier puis relancez `node build/build.js`
   ========================================================================= */
module.exports = {
  brand: "Rezo Enseignes",
  /* Marque commerciale ci-dessus, raison sociale ci-dessous : les mentions
     légales doivent porter la société immatriculée, pas le nom d'enseigne. */
  brandLegal: "SARL Rezofabrik",
  tagline: "Réseau national enseigne, signalétique, imprimerie & web",
  /* Adresse publique du site. Utilisée pour les URL canoniques, le sitemap
     et les balises Open Graph. À remplacer par votre nom de domaine dès qu'il
     est en place (ex. "https://www.rezoenseignes.fr"), puis relancer le build.
     Le domaine rezoenseignes.fr est libre en .fr comme en .com. */
  domain: "https://rezofabrik-hub.github.io/Apporteur-d-affaires-publicit-",
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
  /* Adresse opérationnelle actuelle. À basculer sur contact@rezoenseignes.fr
     et partenaires@rezoenseignes.fr dès que le domaine sera déposé. */
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
