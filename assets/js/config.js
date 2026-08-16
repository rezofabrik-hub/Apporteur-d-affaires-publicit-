/* =========================================================================
   Configuration du site — SEUL FICHIER À MODIFIER pour brancher les formulaires
   ========================================================================= */
window.RF_CONFIG = {

  /* ---------------------------------------------------------------------
     1. RÉCEPTION DES FORMULAIRES
     ---------------------------------------------------------------------
     Renseignez UNE url d'endpoint qui accepte du JSON en POST.

     Solutions prêtes à l'emploi (aucun serveur à gérer) :
       • Formspree ......... https://formspree.io      → "https://formspree.io/f/xxxxxxx"
       • Web3Forms ......... https://web3forms.com     → "https://api.web3forms.com/submit"
       • Formsubmit ........ https://formsubmit.co     → "https://formsubmit.co/ajax/VOTRE@EMAIL"
       • Make / Zapier ..... webhook personnalisé
       • Worker Cloudflare . voir /worker/lead-worker.js dans ce dépôt

     Tant que la valeur reste vide, les formulaires basculent automatiquement
     sur le mode secours : ouverture du logiciel de messagerie avec un e-mail
     pré-rempli, et sauvegarde locale de la demande (aucune donnée perdue).
  --------------------------------------------------------------------- */
  endpointClient: "",   // demandes de devis (particuliers / entreprises)
  endpointPro: "",      // candidatures des professionnels partenaires

  /* Champ requis par Web3Forms uniquement (sinon laisser vide) */
  web3formsKey: "",

  /* ---------------------------------------------------------------------
     2. COORDONNÉES — reprises partout sur le site
  --------------------------------------------------------------------- */
  email: "contact@rezofabrik.fr",
  emailPro: "partenaires@rezofabrik.fr",
  phone: "+33 6 00 00 00 00",
  phoneHref: "+33600000000",

  /* ---------------------------------------------------------------------
     3. DIVERS
  --------------------------------------------------------------------- */
  thanksUrl: "merci.html",
  storageKey: "rf_leads_backup"
};
