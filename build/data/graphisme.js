/* =========================================================================
   GRAPHISME — trois pages d'intention, un seul métier
   -------------------------------------------------------------------------
   POURQUOI TROIS PAGES DE PLUS ALORS QUE LE MÉTIER EXISTE DÉJÀ

   La page « Maquette & création graphique » couvre le sujet correctement,
   et personne ne la trouvera : on ne cherche pas « maquette ». On cherche
   « création de logo », « charte graphique », « trouver un graphiste ».
   Trois requêtes distinctes, trois intentions distinctes, trois pages — la
   page métier restant le pivot qui les relie.

   CE QUI LES REND DIFFÉRENTES PLUTÔT QUE REDONDANTES

   Le risque, en découpant un métier, est d'écrire trois fois la même chose
   et de se cannibaliser. Chacune répond donc à une question que les autres
   ne posent pas :

     · logo          → à qui appartient ce que vous payez ;
     · charte        → ce que contient le document, et pourquoi il évite de
                       repayer trois fois la même déclinaison ;
     · graphiste     → freelance, studio ou agence : lequel pour quel besoin.

   CES PAGES NE SONT PAS DÉCLINÉES PAR VILLE, volontairement. « Création de
   logo à Vesoul » n'est pas une requête : un logo se conçoit à distance, et
   fabriquer 436 pages locales sur un métier sans ancrage local produirait
   exactement les pages satellites qu'on cherche à éviter ailleurs.

   POINT DE VIGILANCE JURIDIQUE

   La cession de droits est le sujet que presque aucune page concurrente
   n'aborde, alors que c'est le premier litige du secteur. L'article L.131-3
   du code de la propriété intellectuelle impose que chaque droit cédé soit
   mentionné distinctement dans l'acte, avec son étendue, sa destination, le
   territoire et la durée. Autrement dit : payer un logo ne suffit pas à le
   posséder. C'est écrit tel quel sur la page, sans dramatisation et sans
   promettre d'expertise juridique — nous orientons, nous ne conseillons pas
   en droit.
   ========================================================================= */
module.exports = [

/* ────────────────────────────────────────────────────────── LOGO */
{
  slug: "creation-logo-identite-visuelle",
  nav: "Création de logo",
  navDesc: "Identité visuelle, déclinaisons, cession des droits",
  h1: "Faire créer un logo qui vous appartienne vraiment",
  title: "Création de Logo & Identité Visuelle — Devis de Graphistes",
  desc: "Faire créer un logo d'entreprise par un graphiste vérifié : identité visuelle, déclinaisons, fichiers vectoriels et cession de droits écrite. Devis comparables sous 48 h.",
  topic: "maquette",
  topicAlt: ["enseigne-lumineuse"],
  lead: "Un logo n'est pas un dessin, c'est un actif. Il finira découpé dans de l'aluminium, imprimé sur un fourgon, brodé sur une polaire et affiché sur un écran de téléphone — et à chacune de ces étapes, un fichier mal préparé ou des droits mal cédés coûtent beaucoup plus cher que ce que vous auriez économisé au départ.",

  blocs: [
    {
      titre: "Ce que vous devez recevoir, et pas seulement voir",
      texte: "La différence entre un logo utilisable et un logo qui vous bloquera pendant dix ans tient à la livraison. Exigez-la par écrit dès le devis.",
      liste: [
        "Les <strong>fichiers vectoriels sources</strong> — .ai, .eps ou .svg — et pas seulement un PNG ou un JPEG. Sans vectoriel, aucun enseigniste ne peut découper vos lettres, et toute nouvelle taille se repaie.",
        "Une <strong>version monochrome</strong> et une <strong>version en négatif</strong>. Votre logo devra un jour être gravé, brodé d'un seul fil ou apparaître en blanc sur fond sombre.",
        "Les <strong>références couleur</strong> dans les trois univers : Pantone pour la peinture et le film, CMJN pour l'imprimerie, RVB et hexadécimal pour l'écran. Un rouge non référencé, c'est trois rouges différents sur la façade, la camionnette et le site.",
        "Une <strong>zone de protection</strong> et une <strong>taille minimale</strong> d'utilisation, sans quoi le logo finira collé à un bord ou illisible sur une carte de visite.",
        "L'<strong>acte de cession de droits</strong>, signé."
      ]
    },
    {
      titre: "La cession de droits : le point que presque personne ne vérifie",
      texte: "C'est le premier litige du secteur, et il se règle en une clause. En droit français, payer une création ne suffit pas à en acquérir les droits : l'article L.131-3 du code de la propriété intellectuelle impose que chaque droit cédé — reproduction, représentation, adaptation — soit mentionné distinctement dans l'acte, avec son étendue, sa destination, le territoire et la durée.",
      liste: [
        "Sans acte écrit, le graphiste reste titulaire des droits patrimoniaux, même si la facture est payée.",
        "Une cession « pour usage web » ne vous autorise pas à le poser sur une façade ni sur un véhicule.",
        "Le <strong>droit moral</strong> de l'auteur, lui, est incessible : l'auteur conserve le droit à la paternité de son œuvre, quoi qu'on écrive au contrat.",
        "Déposer le logo comme <strong>marque figurative à l'INPI</strong> est une démarche distincte, qui protège l'usage commercial dans les classes désignées — elle ne remplace pas la cession, elle s'y ajoute.",
        "Nous demandons systématiquement que la cession figure au devis. Nous ne sommes pas juristes et ne rédigeons pas votre contrat : nous vérifions que le sujet est traité au lieu d'être découvert trois ans plus tard."
      ]
    },
    {
      titre: "Refonte ou vectorisation : vous n'avez peut-être pas besoin d'un logo neuf",
      texte: "Beaucoup d'entreprises paient une création complète alors qu'elles ont surtout un problème de fichier. Trois situations, trois budgets très différents.",
      liste: [
        "<strong>Vous n'avez qu'un JPEG flou</strong> — le logo est bon, il est seulement inexploitable. Une vectorisation le redessine à l'identique pour une fraction du prix d'une création.",
        "<strong>Le logo a vieilli mais il est connu de vos clients</strong> — une refonte le modernise en conservant ce qui vous identifie. C'est presque toujours plus rentable qu'une rupture complète.",
        "<strong>Vous démarrez ou vous changez de métier</strong> — là, une création complète se justifie."
      ]
    }
  ],

  budget: {
    head: ["Prestation", "Budget courant", "Ce qui fait varier"],
    rows: [
      ["Vectorisation d'un logo existant", "80 – 300 €", "Complexité du tracé, dégradés, nombre de couleurs"],
      ["Refonte d'un logo existant", "400 – 1 500 €", "Nombre de pistes, déclinaisons attendues"],
      ["Création de logo, indépendant", "600 – 2 500 €", "Expérience, nombre d'allers-retours, étendue de la cession"],
      ["Création de logo, studio ou agence", "2 000 – 8 000 €", "Recherche amont, étude de concurrence, présentation"],
      ["Identité visuelle complète avec charte", "1 500 – 6 000 €", "Nombre de supports déclinés"],
      ["Dépôt de marque à l'INPI (une classe)", "à partir de 190 €", "Taxe officielle, hors honoraires de conseil"]
    ],
    note: "Fourchettes constatées sur le marché français. Le prix d'un logo ne se juge pas au dessin mais à ce qui est livré avec : sans fichiers vectoriels et sans cession écrite, un logo à 300 € en coûtera 1 500 le jour où il faudra le faire découper."
  },

  faq: [
    { q: "Combien de propositions vais-je recevoir ?", a: "Deux à trois graphistes, chacun travaillant sur le même brief. Chaque professionnel présente en général une à trois pistes, puis affine celle que vous retenez. Méfiez-vous des offres annonçant vingt propositions : personne ne travaille sérieusement vingt directions, ce sont des variations d'une même idée." },
    { q: "Combien de temps faut-il pour un logo ?", a: "Comptez deux à quatre semaines entre le brief et les fichiers définitifs : quelques jours de recherche, une présentation, un ou deux allers-retours, puis la préparation des déclinaisons et des fichiers de production. Un logo livré en 48 heures est un logo de banque d'images légèrement retouché." },
    { q: "Puis-je faire créer mon logo et l'enseigne au même endroit ?", a: "Oui, et c'est souvent préférable : un graphiste qui sait que le logo finira en lettres découpées de 40 cm ne dessine pas les mêmes contreformes que s'il pense écran. Précisez-le dans votre demande, nous orientons vers des professionnels qui travaillent régulièrement avec des enseignistes — et nous pouvons enchaîner sur la <a href=\"enseignes.html\">fabrication</a> avec les mêmes fichiers." },
    { q: "Que se passe-t-il si aucune piste ne me convient ?", a: "C'est prévu dans un devis sérieux : un nombre d'allers-retours est indiqué, ainsi que ce qui se passe au-delà. Faites préciser ce point avant de signer plutôt que de le découvrir au troisième refus. Un graphiste qui n'accepte aucune reprise et un graphiste qui en promet une infinité posent le même problème." },
    { q: "Le logo peut-il être déposé à mon nom ?", a: "Le dépôt à l'INPI se fait au nom que vous indiquez — votre société le plus souvent. C'est une démarche distincte de la cession de droits : la cession vous transfère les droits d'auteur du graphiste, le dépôt vous réserve l'usage commercial du signe. Les deux sont utiles et ne se remplacent pas. Vérifiez l'antériorité avant de déposer." }
  ],

  liens: [
    ["charte-graphique.html", "La charte graphique", "Le document qui évite de repayer trois fois la même déclinaison"],
    ["trouver-un-graphiste.html", "Freelance, studio ou agence ?", "Lequel choisir selon votre besoin et votre budget"],
    ["maquette-creation-graphique.html", "Maquette et fichiers de production", "Simulation sur façade, BAT, préparation des fichiers"]
  ],

  keywords: ["création de logo", "créateur de logo", "faire créer un logo", "logo entreprise",
    "logo professionnel", "identité visuelle", "designer de logo", "logo sur mesure",
    "refonte de logo", "vectorisation de logo", "logo vectoriel", "fichier .ai .eps .svg",
    "cession de droits logo", "dépôt de marque INPI", "logo artisan", "logo commerce",
    "logo restaurant", "logo bâtiment", "logo et enseigne"]
},

/* ─────────────────────────────────────────────────────── CHARTE */
{
  slug: "charte-graphique",
  nav: "Charte graphique",
  navDesc: "Le document de référence de votre identité",
  h1: "Faire réaliser une charte graphique",
  title: "Charte Graphique — Faire Réaliser le Guide de votre Marque",
  desc: "Charte graphique d'entreprise : couleurs référencées, typographies, règles d'usage du logo, déclinaisons print et enseigne. Devis de graphistes vérifiés sous 48 h.",
  topic: "maquette",
  topicAlt: ["signaletique"],
  lead: "Une charte graphique n'est pas un document de prestige, c'est un outil d'économie. Elle existe pour qu'un imprimeur, un enseigniste, un poseur de covering et un développeur produisent le même rendu sans vous appeler — et pour que vous cessiez de payer trois fois la recherche du même bleu.",

  blocs: [
    {
      titre: "Ce qu'une charte contient réellement",
      texte: "Une charte utile tient souvent en quinze à trente pages. Au-delà, elle n'est plus lue ; en deçà, elle laisse trop de questions ouvertes.",
      liste: [
        "Les <strong>versions officielles du logo</strong> : principale, secondaire, horizontale, monochrome, en négatif, et les usages interdits — déformation, ombre ajoutée, changement de couleur.",
        "La <strong>zone de protection</strong> et la taille minimale, exprimées en proportion du logo pour rester valables à toutes les échelles.",
        "Les <strong>couleurs référencées</strong> dans les quatre systèmes : Pantone, CMJN, RVB, hexadécimal — plus, pour l'enseigne, les références de film adhésif et de laquage correspondantes.",
        "Les <strong>typographies</strong>, leurs graisses autorisées, et une police de substitution librement utilisable pour les documents bureautiques.",
        "Les <strong>déclinaisons types</strong> : papeterie, carte de visite, devis et facture, signature électronique, véhicule, enseigne, vitrine, textile.",
        "Les <strong>règles de cohabitation</strong> avec d'autres logos — partenaires, labels, financeurs — question qui se pose toujours plus tôt qu'on ne le croit."
      ]
    },
    {
      titre: "Pourquoi elle se rentabilise sur le troisième support",
      texte: "L'objection habituelle est le prix. Elle ne tient pas dès qu'on compte ce que coûte son absence.",
      liste: [
        "Sans référence Pantone, chaque prestataire choisit « à peu près » votre couleur : la façade, le fourgon et les cartes ne sont plus assortis, et le rattrapage se paie en refabrication.",
        "Sans fichier vectoriel documenté, chaque nouveau prestataire refacture une remise à niveau du logo.",
        "Sans règles d'usage, votre identité se déforme d'année en année sans que personne ne décide rien.",
        "Sur un réseau multi-sites, la charte est ce qui permet de faire fabriquer localement — donc sans frais de transport — tout en gardant un rendu identique d'un point de vente à l'autre."
      ]
    },
    {
      titre: "Charte graphique ou charte d'enseigne ?",
      texte: "Les deux existent et ne se confondent pas. Un donneur d'ordre qui déploie plusieurs sites a besoin des deux, et beaucoup n'en font faire qu'une.",
      liste: [
        "La <strong>charte graphique</strong> régit l'identité : logo, couleurs, typographies, mise en page.",
        "La <strong>charte d'enseigne</strong>, ou cahier technique, régit la fabrication : matériaux, épaisseurs, mode d'éclairage, température de couleur des LED, type de fixation, hauteur de pose, référence de laquage.",
        "C'est la seconde qui garantit qu'une enseigne posée à Lille ressemble à celle de Perpignan. Nous la faisons rédiger avec l'enseigniste, pas seulement avec le graphiste."
      ]
    }
  ],

  budget: {
    head: ["Prestation", "Budget courant", "Ce qui fait varier"],
    rows: [
      ["Mini-charte, 6 à 10 pages", "400 – 900 €", "Logo existant, peu de déclinaisons"],
      ["Charte graphique complète, 15 à 30 pages", "900 – 3 000 €", "Nombre de supports, présence d'un système iconographique"],
      ["Charte avec identité visuelle créée", "1 500 – 6 000 €", "Création du logo comprise"],
      ["Cahier technique d'enseigne multi-sites", "800 – 3 500 €", "Nombre de typologies de façade à traiter"],
      ["Mise à jour d'une charte existante", "300 – 1 200 €", "Ampleur de la refonte"]
    ],
    note: "Fourchettes constatées sur le marché français. Le bon test avant de signer : demandez à voir une charte déjà livrée par le prestataire. Si elle ne contient aucune référence Pantone ni aucune règle chiffrée, c'est une plaquette, pas une charte."
  },

  faq: [
    { q: "Ai-je vraiment besoin d'une charte pour une petite entreprise ?", a: "Pas toujours. En dessous de trois ou quatre supports, une page de références — couleurs, typographies, fichiers — suffit souvent, et c'est ce que nous demandons aux graphistes de fournir même sur une simple création de logo. La charte devient utile dès que plusieurs prestataires différents travaillent sur votre image, ou dès que vous avez plusieurs sites." },
    { q: "Puis-je faire évoluer une charte existante ?", a: "Oui, et c'est le cas le plus fréquent. Si vous disposez des fichiers vectoriels sources, la mise à jour coûte une fraction d'une création. Si vous ne les avez pas — cas courant quand la charte a été faite par un prestataire qui a cessé son activité — il faut d'abord reconstituer les sources, ce qui se chiffre à part." },
    { q: "La charte inclut-elle les fichiers de production ?", a: "Elle doit les accompagner : les logos vectoriels dans toutes leurs versions, les typographies ou leurs licences, et les gabarits des supports courants. Une charte livrée en PDF seul, sans les fichiers, oblige chaque prestataire à tout reconstituer. Faites-le préciser au devis." },
    { q: "Qui doit rédiger le cahier technique d'enseigne ?", a: "Le graphiste seul ne peut pas : il ne connaît ni les épaisseurs de matière, ni les contraintes de fixation, ni le comportement d'une LED derrière un plexi opale. Nous faisons intervenir un enseigniste sur cette partie. C'est aussi ce qui évite la charte magnifique et infabricable — un classique du secteur." }
  ],

  liens: [
    ["creation-logo-identite-visuelle.html", "Création de logo", "Ce que vous devez recevoir, et à qui il appartient"],
    ["trouver-un-graphiste.html", "Freelance, studio ou agence ?", "Lequel choisir selon votre besoin"],
    ["enseignes.html", "Fabrication d'enseignes", "Faire appliquer la charte sur votre façade"]
  ],

  keywords: ["charte graphique", "charte graphique entreprise", "faire une charte graphique",
    "guide de marque", "brand book", "identité de marque", "cahier des charges graphique",
    "charte d'enseigne", "cahier technique enseigne", "normes graphiques", "couleurs Pantone",
    "typographie de marque", "déclinaison de marque", "charte multi-sites", "cohérence de marque"]
},

/* ────────────────────────────────────────────────────── GRAPHISTE */
{
  slug: "trouver-un-graphiste",
  nav: "Trouver un graphiste",
  navDesc: "Freelance, studio ou agence : lequel pour votre besoin",
  h1: "Trouver un graphiste : freelance, studio ou agence ?",
  title: "Trouver un Graphiste — Freelance, Studio ou Agence : Comment Choisir",
  desc: "Trouver un graphiste pour votre entreprise : différences entre freelance, studio et agence, tarifs réels, ce qu'il faut fournir. Devis comparables sous 48 h, gratuit.",
  topic: "maquette",
  topicAlt: ["equipe-pro"],
  lead: "Le mot « graphiste » recouvre trois métiers qui ne facturent ni ne travaillent de la même façon. Choisir le mauvais, ce n'est pas payer trop cher : c'est confier une identité de marque à quelqu'un qui fait de l'exécution, ou payer une recherche stratégique pour une carte de visite.",

  blocs: [
    {
      titre: "Trois profils, trois usages",
      texte: "Aucun n'est meilleur que l'autre. Ils répondent à des besoins différents, et le prix suit la structure autant que le talent.",
      liste: [
        "<strong>Le graphiste indépendant</strong> — un interlocuteur unique, des délais courts, un tarif journalier de 250 à 600 €. Le bon choix pour un logo, une charte simple, des supports récurrents. La limite est la disponibilité : en congé ou sur un gros dossier, personne ne le remplace.",
        "<strong>Le studio, deux à dix personnes</strong> — une continuité de service, des compétences complémentaires (identité, print, web, motion), un tarif de 400 à 800 € la journée. Le bon choix quand votre besoin dépasse un support isolé.",
        "<strong>L'agence</strong> — recherche amont, étude de concurrence, direction artistique, chef de projet dédié, à partir de 700 € la journée. Justifié pour un lancement de marque, un réseau multi-sites, un budget de communication conséquent. Surdimensionné pour refaire un logo d'artisan.",
        "<strong>L'infographiste de production</strong>, souvent intégré chez l'imprimeur ou l'enseigniste — il exécute et prépare les fichiers, il ne conçoit pas d'identité. Indispensable, mais ce n'est pas à lui qu'on demande de créer une marque."
      ]
    },
    {
      titre: "Ce qu'il faut fournir pour obtenir un devis juste",
      texte: "Un graphiste qui chiffre sans ces éléments chiffre à l'aveugle, et le devis sera soit gonflé pour couvrir l'incertitude, soit révisé en cours de route.",
      liste: [
        "Votre <strong>activité et votre clientèle</strong> en trois phrases — pas votre secteur, votre positionnement réel.",
        "La <strong>liste des supports</strong> qui porteront l'identité : façade, véhicules, vitrine, imprimés, textile, site.",
        "Ce que vous <strong>possédez déjà</strong> : logo, fichiers sources, photos, typographies achetées.",
        "Deux ou trois <strong>exemples que vous aimez</strong>, et surtout deux que vous n'aimez pas — c'est souvent plus instructif.",
        "Votre <strong>échéance réelle</strong> : ouverture, salon, lancement.",
        "Votre <strong>ordre de budget</strong>. Le taire ne fait pas baisser les prix, cela produit des propositions hors sujet."
      ]
    },
    {
      titre: "Les signaux qui doivent vous alerter",
      texte: "Ils n'ont rien à voir avec le talent, et tout avec la façon de travailler.",
      liste: [
        "Aucune mention de la <strong>cession de droits</strong> dans le devis.",
        "Pas de <strong>fichiers vectoriels</strong> annoncés dans la livraison.",
        "Un nombre d'<strong>allers-retours non précisé</strong>, dans un sens comme dans l'autre.",
        "Des <strong>typographies</strong> dont la licence commerciale n'est pas justifiée : une police téléchargée gratuitement n'est pas toujours utilisable pour une marque.",
        "Un portfolio qui ne montre que des écrans, alors que votre besoin finira découpé dans de l'aluminium."
      ]
    }
  ],

  budget: {
    head: ["Profil", "Tarif journalier courant", "À privilégier pour"],
    rows: [
      ["Graphiste indépendant débutant", "180 – 300 €", "Supports simples, déclinaisons, mise en page"],
      ["Graphiste indépendant confirmé", "300 – 600 €", "Logo, charte, identité d'une TPE ou PME"],
      ["Studio graphique", "400 – 800 €", "Identité complète, plusieurs supports, continuité"],
      ["Agence de communication", "700 – 1 500 €", "Lancement de marque, réseau, stratégie amont"],
      ["Infographiste de production", "200 – 400 €", "Préparation de fichiers, exécution, BAT"]
    ],
    note: "Tarifs journaliers constatés sur le marché français, hors taxes. Un logo se chiffre rarement en journées visibles : demandez un forfait, avec le détail de ce qu'il comprend et le nombre d'allers-retours inclus."
  },

  faq: [
    { q: "Le service est-il payant pour trouver un graphiste ?", a: "Non. La mise en relation est gratuite et sans engagement, et aucune commission n'est ajoutée au prix du professionnel retenu. Notre rémunération vient d'un abonnement payé par les professionnels du réseau." },
    { q: "Puis-je travailler à distance avec un graphiste ?", a: "Oui, et c'est le cas le plus courant sur ce métier : contrairement à une enseigne ou à un covering, rien n'impose la proximité. Nous privilégions malgré tout un professionnel de votre région lorsque le projet comporte un volet terrain — relevé de façade, prise de vue, présentation en réunion." },
    { q: "Un graphiste peut-il aussi faire mon site internet ?", a: "Certains le font, beaucoup s'arrêtent au design et travaillent avec un développeur. Précisez-le dès la demande : si vous voulez un seul interlocuteur du logo au site, nous orientons vers un profil qui couvre les deux, sinon nous constituons le binôme. Voir aussi notre page <a href=\"creation-site-internet.html\">création de site internet</a>." },
    { q: "Comment comparer deux devis de graphistes ?", a: "Pas au prix, mais à quatre lignes : le nombre de pistes présentées, le nombre d'allers-retours inclus, la liste précise des fichiers livrés, et l'étendue de la cession de droits. Deux devis qui diffèrent de 50 % décrivent presque toujours des prestations différentes — c'est exactement pour cela que nous transmettons le même brief à tous." },
    { q: "Vérifiez-vous les graphistes du réseau ?", a: "Oui, comme tous les partenaires : SIRET actif, assurance responsabilité civile professionnelle, et cohérence entre les capacités annoncées et les réalisations présentées. Nous demandons en outre qu'ils travaillent en fichiers vectoriels et qu'ils traitent la cession de droits au devis — ce sont les deux points sur lesquels un client se retrouve piégé." }
  ],

  liens: [
    ["creation-logo-identite-visuelle.html", "Création de logo", "Ce que vous devez recevoir, et à qui il appartient"],
    ["charte-graphique.html", "La charte graphique", "Ce que contient le document, et ce qu'il fait économiser"],
    ["maquette-creation-graphique.html", "Maquette et fichiers de production", "Simulation sur façade, BAT, fichiers de découpe"]
  ],

  keywords: ["trouver un graphiste", "graphiste freelance", "graphiste indépendant",
    "graphiste entreprise", "studio graphique", "agence graphique", "directeur artistique",
    "infographiste", "designer graphique", "tarif graphiste", "prix graphiste",
    "devis graphiste", "graphiste print", "graphiste identité visuelle", "graphiste local"]
}

];
