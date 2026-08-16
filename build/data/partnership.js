/* =========================================================================
   Offre partenaire — formules d'abonnement du réseau.

   ⚠️  LES MONTANTS CI-DESSOUS SONT DES PROPOSITIONS, PAS DES PRIX VALIDÉS.
   Ajustez-les à votre marché puis relancez `node build/build.js`.
   Repères pour vous situer : un abonnement annuaire professionnel local se
   négocie couramment entre 500 et 2 500 € par an, et l'achat de contacts
   qualifiés en communication visuelle tourne autour de 25 à 60 € le contact.
   Votre argument est que l'abonnement remplace ces deux dépenses.
   ========================================================================= */
module.exports = {

  /* ---------------------------------------------------------------------
     OFFRE DE LANCEMENT — première année du réseau.

     L'ancienne formule était « deux mois à 0 € puis 6 ou 12 mois ». Elle est
     remplacée par une année entière au tarif d'un semestre, pour une raison
     de calendrier et non de marketing : un référencement neuf met six à douze
     mois à produire. Un abonnement de six mois expirait précisément au moment
     où le flux commence — le partenaire serait parti juste avant que cela
     fonctionne. Douze mois lui font traverser la montée en charge.

     CE QUI REMPLACE LA GRATUITÉ. Les deux mois offerts levaient l'objection
     « je ne vous connais pas ». Ils sont remplacés par une garantie de montée
     en charge : sans aucune demande transmise au bout de trois mois, l'accès
     est prolongé de six mois sans frais. Le risque reste du bon côté, la
     prestation n'est plus donnée, et surtout la promesse dit la vérité sur le
     calendrier au lieu de la masquer.

     Un partenaire qui paie répond au téléphone ; un partenaire gratuit laisse
     filer les demandes et abîme le réseau. C'est la vraie raison de fond.
  --------------------------------------------------------------------- */
  launch: {
    active: true,
    label: "Offre de lancement",
    headline: "12 mois au tarif de 6 — première année du réseau",
    sub: "Le réseau se constitue : les entreprises qui entrent cette première année obtiennent douze mois d'accès à 490 € TTC, le tarif d'un semestre.",
    detail: "C'est une question de calendrier autant que de prix. Un réseau qui démarre met six à douze mois à installer son flux de demandes : l'abonnement doit couvrir cette montée en charge, pas s'arrêter au milieu.",
    conditions: [
      "Tarif de lancement réservé aux entreprises inscrites avant le 16 août 2027",
      "12 mois d'accès à 490 € TTC, soit 408 € HT à votre charge réelle",
      "Le tarif du réseau passera ensuite à 890 € par an — votre prix reste celui de votre souscription jusqu'à son terme",
      "Aucune commission sur les affaires signées",
      "Aucune reconduction tacite : à l'échéance, vous décidez",
      "Sans aucune demande transmise au bout de trois mois, votre accès est prolongé de six mois sans frais"
    ],
    badge: "12 mois au prix de 6"
  },

  /* Garantie de montée en charge — reprise telle quelle sur la page
     partenaires, le questionnaire et les conditions de vente. Elle ne coûte
     rien si le réseau fonctionne, et elle est la seule façon honnête de
     vendre une première année : on ne cache pas que le flux met du temps à
     s'installer, on s'engage sur ce qui se passe s'il ne s'installe pas. */
  garantie: {
    titre: "Garantie de montée en charge",
    texte: "Un référencement neuf met six à douze mois à produire son plein effet, et nous ne le cacherons pas pour vendre un abonnement. Si aucune demande ne vous a été transmise au bout de trois mois, votre accès est prolongé de six mois sans frais — sans démarche de votre part, nous le constatons nous-mêmes sur le relevé.",
    conditions: [
      "Constaté sur le relevé des demandes transmises, sans réclamation à formuler",
      "Prolongation de six mois, aux mêmes conditions et sans supplément",
      "S'applique dès lors que vos capacités et votre zone sont renseignées et à jour"
    ]
  },

  /* ---------------------------------------------------------------------
     TARIF DE LANCEMENT.
     Les montants des formules sont les prix réellement pratiqués aujourd'hui.
     Ce bloc annonce la hausse programmée à la date anniversaire : le visiteur
     comprend que le tarif actuel est avantageux, sans qu'on lui présente une
     réduction fictive.

     Pourquoi pas un prix barré : annoncer une réduction impose que le prix de
     référence ait été effectivement pratiqué (article L.112-1-1 du code de la
     consommation). Un prix barré jamais appliqué constitue une pratique
     commerciale trompeuse, et l'article L.121-5 étend cette qualification aux
     pratiques visant les professionnels. Une hausse annoncée à l'avance, elle,
     est parfaitement licite — à condition d'être appliquée le moment venu.

     ┌──────────────────────────────────────────────────────────────────┐
     │  À FAIRE LE 16 AOÛT 2027 — application de la hausse annoncée      │
     │                                                                  │
     │  1. `plans` ci-dessous        : Proximité 490 → 890                │
     │  2. `pose.plans`, plus bas    : Ponctuelle 490 → 890               │
     │  3. `launch`                  : `active: false`                    │
     │  4. `vatNote`                 : 408 → 742 HT                       │
     │  5. `node build/build.js`, puis pousser                          │
     │                                                                  │
     │  Les abonnements en cours restent au tarif de lancement jusqu'à   │
     │  leur terme : c'est ce que le site promet, contractuellement.     │
     │  Ne pas appliquer cette hausse retournerait l'argument contre     │
     │  vous — un partenaire qui a signé pour éviter une hausse qui      │
     │  n'arrive jamais ne renouvellera pas de bonne grâce.              │
     └──────────────────────────────────────────────────────────────────┘

     Les prix futurs sont portés par `nextPrice` sur chaque formule, et non
     par un pourcentage global : les deux hausses ne sont pas du même ordre
     Le tarif de lancement, lui, est annoncé comme temporaire sur le site :
     c'est ce qui le rend licite. Un « lancement » reconduit indéfiniment
     ferait de 890 € un prix qui n'a jamais existé.

     La date se règle dans build/data/site.js (`launchDate` et `anniversary`).
  --------------------------------------------------------------------- */
  launchPrice: {
    /* Volontairement inactif : la hausse ne s'annonce pas sur le site. Elle est
       communiquée individuellement à chaque partenaire avant la fin
       de son contrat. Annoncer une augmentation à quelqu'un qui découvre
       l'offre le fait hésiter ; l'annoncer à un partenaire qui a déjà mesuré
       ce que le réseau lui rapporte est une tout autre conversation.
       Les montants cibles restent consignés dans `nextPrice` sur chaque
       formule — mémoire interne, jamais affichée. */
    /* Actif : le caractère temporaire du tarif doit être annoncé, sinon
       « offre de lancement » ne veut rien dire. C'est aussi ce qui rend
       l'annonce licite — un prix de lancement daté, appliqué puis relevé à
       la date dite, n'est pas une réduction fictive. Encore faut-il
       réellement passer à 890 € le 16 août 2027 : reconduire indéfiniment le
       lancement ferait de 890 € un prix qui n'a jamais existé. */
    active: true,
    label: "Tarif de lancement",
    headline: "Tarif de lancement — première année du réseau",
    note: "490 € TTC les 12 mois pour toute souscription avant le 16 août 2027. Le tarif du réseau passera ensuite à 890 € par an. Le prix de votre souscription reste le vôtre jusqu'au terme de votre abonnement."
  },

  /* Devise et mentions affichées sous les prix.
     Les tarifs sont annoncés TTC : le partenaire voit ce qu'il décaisse.
     Mais il récupère la TVA, donc la charge réelle est le montant HT — c'est
     lui qui sert de base à tous les calculs d'amortissement ci-dessous. */
  currency: "€",
  priceSuffix: "TTC",
  vatNote: "Montants toutes taxes comprises, TVA 20 % incluse — que vous récupérez : la charge réellement supportée est de 408 € sur l'année en formule Proximité, 1 242 € en Rayonnement régional et 2 492 € en Envergure nationale. Toutes les formules sont souscrites pour douze mois, sans reconduction tacite : à l'échéance, vous décidez.",

  /* ---------------------------------------------------------------------
     Trois formules, toutes souscrites pour douze mois. Ce n'est plus la
     durée qui les distingue mais l'étendue de la zone : trois départements,
     une région, ou la France entière. Un partenaire n'a donc plus à arbitrer
     entre deux durées avant d'avoir rien vu — il choisit un périmètre, ce
     qu'il sait faire.

     Tarifs annoncés TTC. `featured: true` met une formule en avant.
     `nextPrice` porte le tarif applicable après le 16 août 2027 : mémoire
     interne pour la formule Proximité, dont la hausse est annoncée sur le
     site puisqu'elle justifie le caractère temporaire du lancement.
  --------------------------------------------------------------------- */
  plans: [
    {
      id: "annuel",
      name: "Proximité",
      tier: "Partenaire Proximité",
      cta: "Choisir la formule Proximité",
      duration: "12 mois",
      price: "490",
      nextPrice: "890",   // tarif du réseau à partir du 16 août 2027
      priceNote: "soit 41 € par mois TTC — 408 € HT à votre charge réelle sur l'année",
      featured: true,
      badge: "12 mois au prix de 6",
      pitch: "Une année complète d'accès au tarif d'un semestre, le temps que le flux s'installe.",
      audience: "Enseigniste, imprimeur, poseur ou agence qui veut un flux installé sur l'année",
      features: [
        "Inscription complète au fichier partenaires, jamais publié",
        "Réception des demandes correspondant à vos capacités déclarées",
        "Zone d'intervention : 3 départements de votre choix",
        "Métiers déclarés illimités",
        "Priorité d'envoi sur les demandes de votre spécialité",
        "Vos coordonnées transmises au seul client dont le projet correspond",
        "Votre nom n'apparaît nulle part : vos concurrents ignorent que vous êtes du réseau",
        "Bilan des demandes transmises à mi-parcours, puis avant l'échéance",
        "Accompagnement sur les dossiers multi-sites et les appels d'offres",
        "Label Partenaire Proximité à afficher sur vos supports",
        "Aucune commission sur les affaires signées"
      ],
      notIncluded: []
    },
    {
      id: "region",
      name: "Rayonnement régional",
      tier: "Partenaire Régional",
      cta: "Choisir Rayonnement régional",
      duration: "12 mois",
      price: "1490",
      nextPrice: "1790",
      priceNote: "soit 124,17 € par mois TTC — 1 242 € HT à votre charge réelle",
      pitch: "Une région administrative entière, pour qui livre bien au-delà de son département.",
      audience: "Fabricant, imprimeur grand format ou agence disposant d'équipes mobiles",
      features: [
        "Tout ce que comprend la formule Proximité",
        "Zone d'intervention : une région administrative complète",
        "Priorité d'envoi sur l'ensemble de la région",
        "Consultation systématique sur les dossiers régionaux de votre spécialité",
        "Bilan trimestriel des demandes transmises",
        "Interlocuteur dédié",
        "Label Partenaire Régional à afficher sur vos supports",
        "Aucune commission sur les affaires signées"
      ],
      notIncluded: []
    },
    {
      id: "france",
      name: "Envergure nationale",
      tier: "Partenaire National",
      cta: "Choisir Envergure nationale",
      duration: "12 mois",
      price: "2990",
      nextPrice: "3490",
      priceNote: "soit 249,17 € par mois TTC — 2 492 € HT à votre charge réelle",
      pitch: "Tout le territoire, pour les structures qui produisent et livrent partout.",
      audience: "Fabricant national, imprimeur industriel, réseau de poseurs, centrale d'achat",
      features: [
        "Tout ce que comprend Rayonnement régional",
        "Zone d'intervention : France métropolitaine et outre-mer",
        "Priorité d'envoi sur les dossiers nationaux et multi-sites",
        "Consultation systématique sur tous les dossiers nationaux",
        "Demandes des collectivités et des marchés publics",
        "Bilan mensuel des demandes transmises",
        "Interlocuteur dédié et point trimestriel",
        "Label Partenaire National à afficher sur vos supports",
        "Aucune commission sur les affaires signées"
      ],
      notIncluded: []
    }
  ],

  /* Ce que le partenaire obtient concrètement, formulé en bénéfices */
  benefits: [
    ["Des demandes qualifiées, pas des contacts revendus",
     "Chaque projet est qualifié par téléphone et traduit en cahier des charges avant de vous être transmis. Vous chiffrez, vous ne débroussaillez pas. Et il n'est jamais adressé à plus de deux ou trois partenaires."],
    ["Un budget fixe, connu à l'avance",
     "Un abonnement, pas une commission variable ni un achat de contacts à l'unité. Vous savez ce que la prospection vous coûte sur l'année, et chaque affaire supplémentaire améliore votre rentabilité au lieu de la diminuer."],
    ["Une visibilité que vous ne pourriez pas produire seul",
     /* {villes}, {metiers} et {secteurs} sont substitués au rendu (voir
        T.chiffres dans build/lib/tpl.js). Un chiffre écrit en dur dans une
        phrase de vente vieillit mal et finit par être faux le jour où on le
        montre à un partenaire — ici il suit les données. */
     "Le site couvre {villes} villes et {departements} départements, {metiers} métiers et {secteurs} secteurs d'activité. Votre fiche partenaire profite de cette surface, qu'une entreprise seule mettrait des années à construire."],
    ["Un filtrage par capacités réelles",
     "Nacelle, CACES, parc de véhicules, machines d'atelier, hauteur d'intervention : votre profil technique détermine les demandes que vous recevez. Vous ne perdez pas de temps sur des chantiers que vous auriez refusés."],
    ["Vos données restent confidentielles",
     "Vous n'êtes pas affiché dans un annuaire public, à côté de vos concurrents et à la merci du premier client qui compare dix fiches. Votre nom et vos coordonnées ne sortent que pour un projet précis, et seulement vers le client concerné. Personne ne sait que vous êtes du réseau, sauf ceux à qui nous vous présentons."],
    ["Vous gardez le client",
     "Vous facturez en direct, vous fixez vos prix, vous conservez la relation et le service après-vente. Nous n'intervenons ni dans le contrat, ni dans l'exécution."],
    ["Une alternative claire à la franchise",
     "Pas de redevance assise sur votre chiffre d'affaires, pas de fournisseurs imposés, pas de contrainte d'enseigne, pas d'engagement sur cinq à sept ans. Vous restez indépendant."]
  ],

  /* ---------------------------------------------------------------------
     RÉPARTITION DES DEMANDES.
     C'est la contrepartie concrète de chaque niveau, et donc ce qui justifie
     l'écart de prix. Un partenaire National paie six fois le tarif Proximité :
     il doit savoir exactement ce qu'il achète, et un partenaire Proximité doit
     savoir ce qu'il n'aura pas. Le tableau ci-dessous est un engagement, pas
     un argumentaire — il décrit la règle réellement appliquée à l'arrivée
     d'une demande.
  --------------------------------------------------------------------- */
  dispatch: {
    eyebrow: "Répartition des demandes",
    title: "Qui reçoit quoi, et pourquoi les niveaux ne se valent pas",
    lead: "Chaque demande est classée selon l'étendue de la communication à réaliser, puis adressée aux partenaires du niveau correspondant. Ce n'est pas une hiérarchie de prestige : c'est une question de capacité à livrer.",
    head: ["Ce que demande le client", "Partenaires sollicités", "Pourquoi eux"],
    rows: [
      ["Une enseigne, une vitrine, un véhicule — un seul lieu",
       "Partenaires Proximité du département concerné",
       "La proximité conditionne le coût de déplacement et la réactivité du service après-vente"],
      ["Deux à cinq sites dans un même département",
       "Partenaires Proximité, en priorité ceux qui ont déclaré des équipes de pose",
       "Un seul atelier peut couvrir l'ensemble sans multiplier les trajets"],
      ["Un déploiement sur plusieurs départements d'une même région",
       "Partenaires Régionaux de la région, avec des Proximité en appui sur la pose",
       "Il faut une structure capable de coordonner un planning multi-sites"],
      ["Un marché public ou une consultation de collectivité",
       "Partenaires Régionaux et Nationaux selon l'étendue du lot",
       "Ces dossiers exigent des références, une capacité financière et des délais tenus"],
      ["Une campagne nationale, une franchise, un réseau multi-sites",
       "Partenaires Nationaux exclusivement",
       "Un donneur d'ordre national veut un interlocuteur unique, pas dix prestataires à coordonner"],
      ["Un chantier isolé hors de la zone de tout partenaire",
       "Partenaire le plus proche, quel que soit son niveau",
       "Mieux vaut un professionnel compétent à cent kilomètres qu'une demande non servie"]
    ],
    note: "Un partenaire Proximité ne reçoit pas les campagnes nationales, et c'est assumé : il n'aurait ni les équipes ni la trésorerie pour un déploiement de quarante points de vente. À l'inverse, un partenaire National reçoit aussi les demandes locales de ses départements — monter en niveau n'a jamais fait perdre les affaires du bas de gamme.",
    ladder: [
      ["Partenaire Proximité", "3 départements de votre choix",
       "Vous recevez les demandes locales de vos trois départements : commerces, artisans, professions libérales, PME mono-site. C'est le volume le plus régulier du réseau, et celui qui se transforme le mieux quand on est installé à côté."],
      ["Partenaire Régional", "Une région administrative entière",
       "Vous ajoutez les déploiements régionaux et les consultations de collectivités du territoire. Ces dossiers sont moins nombreux mais nettement plus gros, et beaucoup d'entreprises locales ne peuvent pas les prendre faute d'équipes mobiles."],
      ["Partenaire National", "France métropolitaine et outre-mer",
       "Vous êtes seul sur les campagnes nationales, les franchises et les réseaux multi-sites — les dossiers où le donneur d'ordre cherche un interlocuteur unique. Vous conservez par ailleurs toutes les demandes locales de vos départements."]
    ]
  },

  /* ---------------------------------------------------------------------
     PAIEMENT — liens Stripe, un par formule
     ---------------------------------------------------------------------
     POURQUOI DES « PAYMENT LINKS » ET PAS UNE INTÉGRATION

     Le site est statique : aucun serveur ne tourne derrière, donc rien ne
     peut créer une session de paiement ni recevoir un webhook. Les Payment
     Links de Stripe résolvent cela sans rien changer à l'architecture : on
     crée le lien dans le tableau de bord Stripe, on le colle ci-dessous,
     et Stripe héberge la page de paiement — authentification forte, 3-D
     Secure, reçu, gestion des cartes refusées. Aucune clé d'API ne se
     retrouve dans le code public, ce qui serait le cas avec une intégration
     côté navigateur.

     PAIEMENT UNIQUE, PAS ABONNEMENT RÉCURRENT

     Créez les liens en mode « paiement unique », pas en mode abonnement.
     C'est cohérent avec l'engagement pris sur la page partenaires — aucune
     reconduction tacite — et cela évite les mandats SEPA, les résiliations
     à gérer et les prélèvements contestés. Le partenaire repaie
     volontairement à l'échéance, ou ne repaie pas.

     À NE JAMAIS METTRE EN ACCÈS LIBRE

     Ces liens ne figurent pas sur la page partenaires et n'ont pas à y
     figurer. Le parcours est : questionnaire, vérification du dossier,
     entretien, PUIS paiement. Un bouton « payer » en accès public ferait
     entrer des entreprises non vérifiées, qu'il faudrait rembourser — et la
     promesse de professionnels contrôlés ne vaudrait plus rien. La page
     paiement.html est en noindex et n'est liée depuis nulle part : son
     adresse se transmet par e-mail, une fois le dossier validé.
  --------------------------------------------------------------------- */
  paiement: {
    /* Collez ici l'URL fournie par Stripe pour chaque formule.
       Tant qu'une case reste vide, la formule s'affiche sur la page de
       paiement avec la mention « nous vous transmettons le lien » plutôt
       qu'un bouton mort. */
    liens: {
      annuel: "",
      region: "",
      france: ""
    },
    /* Moyens acceptés, affichés au partenaire. Le virement reste utile :
       beaucoup d'entreprises du bâtiment paient ainsi par habitude, et il
       ne coûte aucune commission. */
    virement: true,
    ribNote: "Un règlement par virement est possible : demandez le RIB, la facture vous est adressée avant paiement.",
    delaiActivation: "Votre accès est ouvert sous 24 heures ouvrées après réception du règlement.",
    factureNote: "Une facture conforme, portant notre SIRET et le numéro de TVA intracommunautaire, vous est adressée systématiquement — le reçu Stripe ne la remplace pas."
  },

  /* ---------------------------------------------------------------------
     AMORTISSEMENT — l'objection numéro un d'un artisan devant un abonnement
     est « combien ça va me coûter », jamais « combien ça va me rapporter ».
     On répond donc par un seuil, pas par un argument : le chiffre d'affaires
     qu'il faut signer dans l'année pour rembourser l'abonnement.

     Deux règles pour que ce bloc reste crédible :
     · les fourchettes de prix sont EXACTEMENT celles des tableaux tarifaires
       publiés sur les pages métier — un visiteur qui recoupe doit retrouver
       les mêmes chiffres, sinon tout le site perd sa crédibilité ;
     · le taux de marge est affiché, pas caché dans le calcul. 35 % en
       fabrication (achat de matière) et 45 % en pose (main-d'œuvre) sont des
       hypothèses volontairement basses : si le partenaire fait mieux, le
       raisonnement ne fait que se renforcer.

     Base de calcul : le coût HT, puisque le partenaire récupère la TVA.
  --------------------------------------------------------------------- */
  amortissement: {
    eyebrow: "Amortissement",
    title: "Combien faut-il signer pour rembourser l'abonnement ?",
    lead: "La question n'est pas ce que coûte l'abonnement, mais à partir de quel moment il est remboursé. Voici le calcul, fait avec nos propres grilles tarifaires et une hypothèse de marge délibérément prudente.",
    threshold: "408 €",
    thresholdNote: "Coût réel de l'abonnement annuel au tarif de lancement : 490 € TTC, dont 82 € de TVA que vous récupérez. C'est donc 408 € qu'il faut couvrir sur douze mois, soit environ 1 170 € de chiffre d'affaires à 35 % de marge brute. Une seule enseigne de commerce y suffit.",
    head: ["Une seule affaire de ce type", "Budget courant", "Marge brute à 35 %", "Année d'abonnement remboursée ?"],
    rows: [
      ["Caisson lumineux LED simple face 2 m", "900 – 2 200 €", "315 – 770 €", "Oui sur le haut de la fourchette"],
      ["Lettres découpées relief rétro-éclairées", "1 800 – 6 000 €", "630 – 2 100 €", "Oui, dès 2 100 € de vente"],
      ["Totem lumineux double face 3 m", "3 000 – 9 000 €", "1 050 – 3 150 €", "Oui, une seule suffit"],
      ["Habillage complet de devanture", "4 000 – 20 000 €", "1 400 – 7 000 €", "Oui, largement"],
      ["Semi-covering imprimé sur fourgon", "1 100 – 2 400 €", "385 – 840 €", "Oui sur le haut de la fourchette"],
      ["Total covering sur fourgon", "2 600 – 5 500 €", "910 – 1 925 €", "Oui, une seule suffit"]
    ],
    note: "Autrement dit : une enseigne à lettres relief, un totem ou un covering complet dans l'année, et l'abonnement est remboursé. Tout le reste de ce que le réseau vous transmet est du chiffre d'affaires net de coût d'acquisition — puisqu'il n'y a aucune commission sur les affaires signées.",
    compare: [
      ["Abonnement annuel", "408 € HT pour l'année", "Demandes qualifiées, jamais adressées à plus de 2 ou 3 partenaires"],
      ["Achat de contacts à l'unité", "25 à 60 € le contact", "Non qualifié, revendu simultanément à 5 ou 10 entreprises"],
      ["Franchise du secteur", "15 000 à 60 000 € de droit d'entrée", "Plus une redevance annuelle assise sur votre chiffre d'affaires"]
    ],

    /* Variante affichée sur la page du service de pose. La marge y est plus
       élevée qu'en fabrication : la pose, c'est de la main-d'œuvre, pas de
       l'achat de matière. Le seuil tombe donc à moins de deux journées. */
    pose: {
      title: "Une à deux journées de pose et l'année est remboursée",
      lead: "Le calcul est encore plus direct sur la pose : il n'y a pas d'achat de matière, donc la marge porte sur la main-d'œuvre. Nous retenons 45 %, ce qui reste conservateur pour une équipe équipée.",
      head: ["Type d'intervention", "Budget courant", "Marge brute à 45 %", "Année d'abonnement remboursée ?"],
      rows: [
        ["Pose d'enseigne avec nacelle (journée)", "800 – 1 600 €", "360 – 720 €", "Oui, une à deux journées"],
        ["Pose d'enseigne avec nacelle (½ journée)", "450 – 900 €", "202 – 405 €", "Une à deux demi-journées"],
        ["Dépose d'enseigne + rebouchage", "300 – 1 200 €", "135 – 540 €", "Un à trois chantiers"],
        ["Raccordement électrique et horloge astronomique", "200 – 600 €", "90 – 270 €", "Complément de chantier"],
        ["Contrat de maintenance annuel (1 enseigne)", "180 – 600 € / an", "81 – 270 € / an", "Récurrent, il s'ajoute chaque année"]
      ],
      note: "Une à deux journées de nacelle dans l'année suffisent à couvrir les 408 € de coût réel. Un seul chantier que vous n'auriez pas pu prendre — parce qu'il était à 200 kilomètres et qu'aucun poseur n'était disponible — coûte plus cher que l'abonnement entier."
    }
  },

  /* Comparaison honnête avec les autres façons de trouver des chantiers.
     Quatre modèles coexistent sur le marché français, et le partenaire les
     confond souvent. L'annuaire professionnel en particulier : il vend de la
     visibilité, pas des affaires — distinction essentielle, et qui n'est
     presque jamais faite parce qu'elle ne sert pas les annuaires. */
  comparison: {
    head: ["", "Abonnement partenaire", "Annuaire professionnel", "Franchise du secteur", "Achat de contacts"],
    rows: [
      ["Coût récurrent", "Abonnement fixe", "Abonnement fixe", "Redevance sur le chiffre d'affaires", "Au contact, sans plafond"],
      ["Ce que vous achetez", "Des demandes qualifiées", "Une fiche et de la visibilité", "Une marque et un territoire", "Des coordonnées"],
      ["Commission sur affaires", "Aucune", "Aucune", "Incluse dans la redevance", "Aucune"],
      ["Qui fait la prospection", "Le réseau", "Personne — vous attendez d'être trouvé", "Vous, sous l'enseigne", "La plateforme"],
      ["Votre enseigne", "La vôtre", "La vôtre", "Celle du réseau", "La vôtre"],
      ["Fournisseurs", "Libres", "Libres", "Imposés", "Libres"],
      ["Nombre de destinataires par demande", "2 à 3", "Sans objet", "Sans objet", "5 à 10 selon les plateformes"],
      ["Demande qualifiée par téléphone", "Oui", "Sans objet", "Sans objet", "Rarement"],
      ["Engagement", "12 mois, sans reconduction tacite", "12 mois en général", "5 à 7 ans", "Aucun"]
    ]
  },

  /* Étapes d'adhésion */
  steps: [
    ["Vous remplissez le questionnaire",
     "Entreprise, contact, capacités de production, matériel, parc de véhicules, habilitations et assurances. Comptez 7 à 10 minutes : c'est cette précision qui déterminera la pertinence des demandes reçues."],
    ["Nous vérifions votre dossier",
     "SIRET actif, assurances responsabilité civile professionnelle et décennale à jour, habilitations déclarées, cohérence des capacités annoncées. Réponse sous 48 heures ouvrées."],
    ["Entretien et choix de la formule",
     "Un échange téléphonique de vingt minutes pour caler votre zone, vos métiers, votre capacité mensuelle et le montant minimum de chantier que vous acceptez. Vous choisissez ensuite la durée."],
    ["Mise en ligne et premières demandes",
     "Votre fiche est publiée sous 72 heures. Les demandes correspondant à votre profil vous parviennent dès qu'elles se présentent, par e-mail et par téléphone pour les urgences."]
  ],

  faq: [
    { q: "Que comprend l'offre de lancement ?", a: "Douze mois d'accès au réseau pour 490 € TTC, soit le tarif d'un semestre. Elle est réservée aux entreprises qui souscrivent avant le 16 août 2027 ; au-delà, le tarif du réseau sera de 890 € par an. Le prix de votre souscription reste le vôtre jusqu'au terme de votre abonnement, quelle que soit l'évolution ultérieure." },
    { q: "Pourquoi douze mois et pas six ?", a: "Par honnêteté de calendrier. Un réseau qui démarre met six à douze mois à installer un flux de demandes régulier : un abonnement de six mois se terminerait précisément au moment où cela commence à produire, et vous seriez parti juste avant. Douze mois vous font traverser la montée en charge — et c'est aussi pour cela que le tarif est celui d'un semestre." },
    { q: "Pourquoi un abonnement plutôt qu'une commission ?", a: "Parce qu'une commission variable pousse l'intermédiaire à privilégier les gros dossiers et à vous envoyer un maximum de demandes, qualifiées ou non. L'abonnement inverse la logique : notre intérêt devient de vous garder d'une année sur l'autre, donc de vous transmettre des demandes que vous transformez réellement. Vous gardez par ailleurs 100 % de la marge sur chaque chantier signé." },
    { q: "Je suis une agence franchisée. Puis-je rejoindre le réseau ?", a: "Oui, et c'est même une situation confortable des deux côtés. Un contrat de franchise vous attribue un secteur : il vous protège de vos confrères du réseau, mais il plafonne aussi votre croissance, puisque vous ne pouvez pas aller prospecter ailleurs. Nous ne vous demandons rien de contraire à cela — nous vous transmettons des demandes situées à l'intérieur de votre propre secteur, celui que votre contrat vous attribue déjà. Vous ne prenez le territoire de personne, vous recevez simplement des clients de votre zone que vous n'avez pas eu à démarcher. Deux réserves, dites franchement : relisez les clauses de votre contrat relatives aux apporteurs d'affaires extérieurs, certains réseaux imposent que toute demande passe par leur propre outil ; et parlez-en à votre franchiseur plutôt que de le découvrir plus tard. Le tarif de lancement et la garantie de montée en charge limitent le risque d'un essai : douze mois à 490 €, et une prolongation de six mois sans frais si rien ne vous est transmis au bout de trois." },

    { q: "Combien de partenaires par zone et par métier ?", a: "Deux à quatre selon la densité du territoire. Nous ne saturons pas une zone : un partenaire qui ne transforme jamais rien ne renouvelle pas, ce qui n'a d'intérêt pour personne." },
    { q: "Que se passe-t-il si je ne reçois pas de demandes ?", a: "Une garantie de montée en charge s'applique : si aucune demande ne vous a été transmise au bout de trois mois, votre accès est prolongé de six mois sans frais. Vous n'avez aucune démarche à faire, nous le constatons nous-mêmes sur le relevé des demandes. Et si votre zone se révèle moins active que prévu, nous élargissons votre périmètre ou vos métiers déclarés sans surcoût." },
    { q: "L'abonnement est-il reconduit automatiquement ?", a: "Non. Aucune reconduction tacite, aucun prélèvement automatique, aucun mandat SEPA : le règlement est unique, pour la période souscrite. Nous vous recontactons avant l'échéance avec le bilan des demandes transmises, et vous décidez. C'est un choix assumé — un partenaire reconduit par inertie est un partenaire mécontent." },
    { q: "Que se passe-t-il à la fin de mon abonnement ?", a: "Rien d'automatique : il n'y a pas de reconduction tacite. Nous vous recontactons avant l'échéance avec le bilan des demandes qui vous ont été transmises, et vous décidez de renouveler ou non. Les conditions applicables au renouvellement vous sont communiquées à ce moment-là, et vous restez libre de ne pas donner suite." },
    { q: "Le service de pose suit-il la même grille tarifaire ?", a: "L'entrée est au même tarif : 490 € TTC pour douze mois en formule Pose Ponctuelle, qui couvre jusqu'à cinq demandes de pose par mois. La formule Pose Illimitée, à 890 € TTC sur douze mois, lève ce plafond et ajoute la coordination de chantier." },
    { q: "Comment se définit ma zone d'intervention ?", a: "Vous choisissez librement vos trois départements en formule Proximité, et ils n'ont pas à être limitrophes : un atelier peut viser une métropole située à deux départements de là, où se trouvent réellement ses clients. Le questionnaire vous propose les départements voisins du vôtre à titre de suggestion, rien de plus. Si trois départements ne suffisent pas, la formule Rayonnement régional couvre une région administrative entière et Envergure nationale tout le territoire." },
    { q: "Puis-je changer mes départements en cours d'abonnement ?", a: "Oui, une fois par période et sans frais : il suffit de nous le demander. Un déménagement d'atelier, l'embauche d'une équipe mobile ou une zone qui se révèle moins active que prévu sont autant de raisons légitimes. Nous ajustons également votre périmètre de notre propre initiative si le volume transmis reste faible." },
    { q: "Mon entreprise sera-t-elle affichée sur le site ?", a: "Non, et c'est délibéré. Nous ne publions aucun annuaire de partenaires. Votre nom, vos coordonnées et vos capacités restent dans notre fichier interne et ne sortent que pour un projet précis, vers le seul client concerné. Un annuaire public vous expose à côté de vos concurrents, laisse n'importe qui comparer dix fiches et vous met en concurrence sur le prix avant même d'avoir parlé. Nous faisons l'inverse : le client reçoit deux ou trois noms choisis pour son projet, pas une liste." },
    { q: "Quelle différence avec un annuaire professionnel ?", a: "Un annuaire vend de la visibilité : vous payez une fiche, un portrait, une mention dans une newsletter, puis vous attendez qu'on vous trouve. Personne n'y prospecte à votre place. Nous vendons des demandes : nous allons chercher le client, nous qualifions son besoin par téléphone, nous rédigeons un cahier des charges et nous vous le transmettons. Les deux se cumulent très bien — beaucoup de nos partenaires figurent dans un annuaire — mais ils ne se remplacent pas." },
    { q: "À quoi sert le label de partenaire ?", a: "Chaque niveau d'adhésion donne droit à un label — Partenaire Local, Confirmé, Régional ou National — que vous pouvez afficher sur votre devanture, vos devis, votre site et vos véhicules. Il atteste que votre SIRET, vos assurances et vos habilitations ont été vérifiés par le réseau. Pour un client qui hésite entre deux entreprises, c'est un élément de réassurance concret, et il ne vous coûte rien de plus que votre abonnement." },
    { q: "Quelle différence entre les trois formules ?", a: "L'étendue de la zone, et rien d'autre. Les prestations sont strictement identiques : mêmes demandes qualifiées, même priorité d'envoi, même absence de commission, même confidentialité. Proximité couvre trois départements de votre choix, Rayonnement régional une région entière, Envergure nationale la France complète — et c'est cette dernière qui reçoit les campagnes multi-sites d'un donneur d'ordre national." },
    { q: "Puis-je changer de formule en cours d'abonnement ?", a: "Oui, à tout moment vers une formule plus large : la différence est calculée au prorata du temps restant, sans frais de changement. C'est fréquent chez un partenaire qui décroche un premier dossier multi-sites et veut élargir sa zone dans la foulée." },
    { q: "Prenez-vous une commission en plus de l'abonnement ?", a: "Non, jamais. L'abonnement est la seule contrepartie. Vous facturez le client en direct, au prix que vous fixez, et rien ne nous revient sur le chantier." },
    { q: "Acceptez-vous les auto-entrepreneurs ?", a: "Oui, dès lors que le SIRET est actif et que les assurances sont à jour. La taille n'est pas un critère de sélection ; la fiabilité et l'adéquation des capacités en sont. Un poseur indépendant bien équipé et réactif vaut mieux qu'une structure importante mais indisponible." },
    { q: "Que se passe-t-il si un partenaire ne donne pas satisfaction ?", a: "Nous suivons les retours clients après chaque affaire transmise. Un partenaire dont les litiges se répètent est retiré du réseau sans remboursement du temps restant, conformément aux conditions d'adhésion. C'est ce qui protège la crédibilité du réseau — et donc la vôtre." }
  ],

  /* =====================================================================
     SERVICE POSE — offre à deux entrées.
     1. Donneurs d'ordre : fabricants, agences, imprimeurs, franchises et
        fournisseurs sans équipe de pose sur place.
     2. Poseurs : entreprises de pose qui veulent recevoir ces chantiers.
     Montants à ajuster comme ceux des formules partenaires.
  ===================================================================== */
  pose: {
    lead: "Vous fabriquez, imprimez ou vendez, mais vous n'avez pas d'équipe de pose sur place ? Nous mobilisons un poseur habilité près du chantier, partout en France, avec les attestations à jour et un devis sous 24 heures.",

    /* Pour les donneurs d'ordre */
    plans: [
      {
        id: "pose-6",
        name: "Pose Ponctuelle",
        duration: "12 mois",
        price: "490",
        nextPrice: "890",
        priceNote: "tarif de lancement — 408 € HT à votre charge réelle sur l'année",
        pitch: "Pour les structures qui posent quelques chantiers par mois hors de leur zone.",
        audience: "Enseigniste, imprimeur ou agence de 1 à 5 personnes",
        features: [
          "Accès au réseau de poseurs habilités partout en France",
          "Devis de pose sous 24 heures ouvrées",
          "Tarifs de pose négociés réseau",
          "Attestations fournies avant intervention : CACES, habilitation électrique, décennale",
          "Jusqu'à 5 demandes de pose par mois"
        ],
        notIncluded: ["Coordination de chantier", "Interventions de nuit et en site occupé", "Déploiement multi-sites"]
      },
      {
        id: "pose-12",
        name: "Pose Illimitée",
        duration: "12 mois",
        price: "890",
        nextPrice: "1199",
        priceNote: "742 € HT à votre charge réelle — demandes de pose illimitées",
        featured: true,
        badge: "Pour les fabricants",
        pitch: "Pour ceux qui livrent dans toute la France et veulent un poseur disponible à chaque fois.",
        audience: "Fabricant, imprimeur grand format, réseau, agence multi-clients",
        features: [
          "Tout ce que comprend la formule Ponctuelle",
          "Demandes de pose illimitées",
          "Coordination et suivi de chantier par nos soins",
          "Interventions de nuit, en site occupé et en centre commercial",
          "Déploiement multi-sites avec planning coordonné",
          "Photos de réception et procès-verbal de pose",
          "Interlocuteur dédié"
        ],
        notIncluded: []
      }
    ],

    /* Ce que la prestation couvre réellement */
    prestations: [
      ["Pose d'enseigne et de signalétique", "Implantation, traçage, perçage, chevillage ou scellement chimique adapté au support, reprise d'étanchéité et nettoyage de chantier."],
      ["Travail en hauteur", "Nacelle articulée, télescopique, sur camion ou araignée, conduite par un opérateur titulaire du CACES R486. Échafaudage et intervention sur cordes selon l'accès."],
      ["Raccordement électrique", "Alimentation, protection différentielle, horloge astronomique ou cellule crépusculaire, par un intervenant titulaire d'une habilitation électrique en cours de validité."],
      ["Dépose et remise en état", "Retrait de l'ancienne enseigne, rebouchage des ancrages, reprise de façade, évacuation en filière agréée."],
      ["Pose d'adhésif et de covering", "Vitrophanie, micro-perforé, films techniques, marquage de véhicules en atelier chauffé."],
      ["Démarches de chantier", "Autorisation d'occupation temporaire du domaine public, arrêté de circulation, neutralisation de stationnement, coordination avec les services techniques."]
    ],

    faq: [
      { q: "Sous quel délai un poseur intervient-il ?", a: "Le devis de pose vous parvient sous 24 heures ouvrées. L'intervention se planifie ensuite selon la zone et l'accès : comptez 3 à 10 jours ouvrés en métropole pour une pose standard, davantage si une nacelle de grande hauteur ou une autorisation d'occupation du domaine public est nécessaire — cette dernière se demande 10 à 15 jours à l'avance." },
      { q: "Qui est responsable en cas de dommage pendant la pose ?", a: "Le poseur qui intervient, au titre de sa responsabilité civile professionnelle et de sa garantie décennale. Nous vous transmettons systématiquement ses attestations en cours de validité avant l'intervention, ainsi que le CACES de l'opérateur et la vérification générale périodique de la nacelle." },
      { q: "Puis-je faire poser une enseigne que je n'ai pas fabriquée ?", a: "Oui, c'est même le cas le plus fréquent. Le poseur vérifie avant intervention la compatibilité des fixations avec le support, la nature de la façade et la faisabilité du raccordement. Si un point bloque, il vous le signale avant de se déplacer plutôt que sur place." },
      { q: "L'abonnement pose remplace-t-il l'abonnement partenaire ?", a: "Non, les deux répondent à des besoins opposés. L'abonnement partenaire vous fait recevoir des demandes de clients finaux. L'abonnement pose vous donne accès à des poseurs pour exécuter vos propres chantiers. Une entreprise qui fabrique sans poser a intérêt aux deux ; nous appliquons alors une remise sur le second." },
      { q: "Je suis poseur, comment recevoir ces chantiers ?", a: "En remplissant le questionnaire partenaire et en déclarant précisément votre matériel : type de nacelle et hauteur de travail, échafaudage, cordistes, CACES détenus, parc de véhicules et zone d'intervention. Ce sont exactement les critères sur lesquels nous vous adressons les chantiers de pose." }
    ]
  }
};
