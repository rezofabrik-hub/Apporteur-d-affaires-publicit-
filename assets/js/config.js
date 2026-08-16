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

     ACTIVATION — FAITE. Elle l'a été le 16 août 2026 sur rezofabrik@gmail.com.
     FormSubmit exige une confirmation avant de délivrer quoi que ce soit : un
     e-mail « Activate Form » arrive sur l'adresse visée, et tant que son lien
     n'est pas cliqué l'endpoint répond « This form needs Activation » sans
     rien transmettre. Deux points à retenir pour la suite :

     · L'activation vaut pour le DOMAINE depuis lequel la demande est postée.
       Au passage sur rezoenseignes.fr, prévoir une nouvelle confirmation :
       poster une fois depuis le nouveau domaine déclenche l'e-mail, un clic
       et c'est réglé. Le vérifier AVANT d'annoncer le domaine, pas après.
     · L'e-mail d'activation n'arrive presque jamais dans l'onglet principal
       de Gmail. Le retrouver par : in:anywhere formsubmit
  --------------------------------------------------------------------- */
  /* FormSubmit retenu parce qu'il ne demande ni compte, ni clé d'API, ni
     carte bancaire : l'adresse de destination est l'endpoint. Le jour où le
     volume justifie un outil plus complet — accusé de réception automatique,
     export CSV, connexion à un CRM — Formspree ou un Worker Cloudflare
     prennent le relais en changeant ces lignes, rien d'autre. */
  /* ADRESSE ACTIVE — vérifiée le 16 août 2026 : l'endpoint répond
     {"success":"true"} et le message arrive bien dans la boîte.
     C'est elle qui reçoit les demandes, elle est donc en tête : l'ordre
     compte, chaque adresse non activée coûte un aller-retour réseau avant
     que la suivante soit essayée. */
  endpointClient: "https://formsubmit.co/ajax/rezofabrik@gmail.com",
  endpointPro: "https://formsubmit.co/ajax/rezofabrik@gmail.com",

  /* Adresse de repli, essayée automatiquement si la première échoue.
     commercial-rezofabrik@gmail.com n'est pas encore activée côté FormSubmit
     (réponse « This form needs Activation »). Elle reste câblée ici : le jour
     où le lien d'activation est cliqué, elle devient un vrai second filet
     sans qu'aucune ligne ne change. Pour en faire l'adresse principale,
     il suffira d'intervertir les deux blocs. */
  endpointClientAlt: "https://formsubmit.co/ajax/commercial-rezofabrik@gmail.com",
  endpointProAlt: "https://formsubmit.co/ajax/commercial-rezofabrik@gmail.com",

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
