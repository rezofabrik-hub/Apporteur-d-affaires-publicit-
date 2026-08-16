/* =========================================================================
   Identité du site — modifiez ce fichier puis relancez `node build/build.js`
   ========================================================================= */
module.exports = {
  brand: "Rezo Enseignes",
  /* Marque commerciale ci-dessus, raison sociale ci-dessous : les mentions
     légales doivent porter la société immatriculée, pas le nom d'enseigne. */
  brandLegal: "SARL Rezofabrik",
  tagline: "Réseau national enseigne, signalétique & publicité par l'objet",
  /* Adresse publique du site. Utilisée pour les URL canoniques, le sitemap
     et les balises Open Graph. À remplacer par votre nom de domaine dès qu'il
     est en place (ex. "https://www.rezoenseignes.fr"), puis relancer le build.
     Le domaine rezoenseignes.fr est libre en .fr comme en .com. */
  domain: "https://rezofabrik-hub.github.io/Apporteur-d-affaires-publicit-",
  lang: "fr-FR",

  /* Positionnement (repris dans les balises et le contenu) */
  baseline: "Un seul interlocuteur pour toute votre communication visuelle, partout en France.",
  role: "agence de communication et de mise en relation",

  /* Contact — répliqué dans assets/js/config.js */
  email: "contact@rezoenseignes.fr",
  emailPro: "partenaires@rezoenseignes.fr",
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
    { n: "12", l: "métiers de la communication visuelle" },
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
