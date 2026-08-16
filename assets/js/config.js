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

     ⚠️  ACTIVATION — À FAIRE UNE SEULE FOIS
     FormSubmit exige une confirmation avant de délivrer quoi que ce soit :
     à la toute première demande reçue, un e-mail « Confirm your email »
     arrive sur l'adresse ci-dessous. Tant que le lien qu'il contient n'est
     pas cliqué, AUCUNE demande n'est transmise. Vérifiez les indésirables :
     ce message y atterrit souvent.
  --------------------------------------------------------------------- */
  /* FormSubmit retenu parce qu'il ne demande ni compte, ni clé d'API, ni
     carte bancaire : l'adresse de destination est l'endpoint. Le jour où le
     volume justifie un outil plus complet — accusé de réception automatique,
     export CSV, connexion à un CRM — Formspree ou un Worker Cloudflare
     prennent le relais en changeant ces deux lignes, rien d'autre. */
  endpointClient: "https://formsubmit.co/ajax/commercial-rezofabrik@gmail.com",
  endpointPro: "https://formsubmit.co/ajax/commercial-rezofabrik@gmail.com",

  /* Champ requis par Web3Forms uniquement (sinon laisser vide) */
  web3formsKey: "",

  /* ---------------------------------------------------------------------
     2. COORDONNÉES — reprises partout sur le site
  --------------------------------------------------------------------- */
  /* Adresse opérationnelle actuelle — les formulaires en mode secours
     y aboutissent réellement. À basculer sur les adresses du domaine
     rezoenseignes.fr dès qu'il sera déposé. */
  email: "commercial-rezofabrik@gmail.com",
  emailPro: "commercial-rezofabrik@gmail.com",
  phone: "07 75 76 92 32",
  phoneHref: "+33775769232",

  /* ---------------------------------------------------------------------
     3. DIVERS
  --------------------------------------------------------------------- */
  thanksUrl: "merci.html",
  storageKey: "rf_leads_backup"
};
