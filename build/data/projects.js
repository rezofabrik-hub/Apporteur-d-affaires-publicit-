/* =========================================================================
   RÉALISATIONS

   C'est le levier le plus puissant du secteur : Signarama publie plus de
   4 000 pages de chantiers photographiés, une par réalisation et par magasin.
   Chacune est du contenu strictement unique, impossible à dupliquer, et capte
   des requêtes très ciblées du type « enseigne lumineuse Angoulême ».

   ⚠️  LES ENTRÉES CI-DESSOUS SONT DES PROJETS TYPES, PAS DES CHANTIERS RÉELS.
   Elles portent `illustration: true`, ce qui affiche une mention claire sur la
   page : les visuels sont des photographies libres de droit, pas des clichés
   de vos chantiers. C'est volontaire — présenter des photos d'inconnus comme
   ses propres réalisations se retourne contre vous au premier client qui les
   reconnaît, et la crédibilité est le seul actif d'un réseau qui démarre.

   AU FUR ET À MESURE : pour chaque vrai chantier, dupliquez une entrée,
   remplacez les textes, passez `illustration: false`, ajoutez `partner`,
   `client` et vos propres images dans assets/img/, puis relancez le build.
   Cinquante vraies réalisations valent mieux que cinq cents pages générées.
   ========================================================================= */
module.exports = [
{
  slug: "enseigne-lumineuse-boulangerie-perpignan",
  title: "Enseigne lumineuse pour une boulangerie de centre-ville",
  service: "enseignes", city: "perpignan", sector: "commerce-detail",
  year: "2025", budget: "3 200 € HT", duration: "5 semaines",
  topic: "enseigne-lumineuse", imgs: [1, 2, 4],
  facts: [["Support", "Lettres relief rétro-éclairées"], ["Matériaux", "Aluminium thermolaqué, plexiglas coulé"],
          ["Éclairage", "Modules LED 4000 K, alimentation IP67"], ["Pose", "Nacelle, demi-journée"]],
  context: "Reprise d'un local commercial en secteur sauvegardé, avec un ancien caisson lumineux hors service à déposer et une façade de six mètres à requalifier.",
  challenge: "Le local se situe aux abords d'un monument historique : le caisson plein était refusé d'office par l'Architecte des Bâtiments de France. Il fallait par ailleurs tenir compte de la tramontane, qui dépasse régulièrement 100 km/h sur le secteur.",
  solution: "Lettres découpées en aluminium thermolaqué, rétro-éclairées par modules LED pour projeter un halo sur la façade plutôt que d'émettre directement. Fixations par entretoises inox 316 avec scellement chimique, calculées pour la prise au vent locale. Dossier d'autorisation préalable déposé en mairie avec insertion photographique, accordé en sept semaines.",
  result: "Enseigne lisible depuis le trottoir opposé de jour comme de nuit, conforme au règlement local de publicité, avec une consommation divisée par quatre par rapport à l'ancien caisson néon."
},
{
  slug: "covering-flotte-utilitaires-toulouse",
  title: "Marquage d'une flotte de six utilitaires",
  service: "covering-vehicule", city: "toulouse", sector: "batiment-artisan",
  year: "2025", budget: "7 400 € HT", duration: "3 semaines",
  topic: "covering", imgs: [1, 2, 5],
  facts: [["Prestation", "Semi-covering imprimé"], ["Véhicules", "6 utilitaires, 3 silhouettes"],
          ["Film", "Vinyle coulé laminé anti-UV"], ["Immobilisation", "1 véhicule par jour"]],
  context: "Entreprise de plomberie-chauffage souhaitant homogénéiser une flotte constituée au fil des années, avec trois modèles de véhicules différents.",
  challenge: "Trois silhouettes distinctes, donc trois gabarits, pour un rendu qui devait rester identique à l'œil. L'entreprise ne pouvait immobiliser qu'un seul véhicule à la fois sans perturber les chantiers en cours.",
  solution: "Gabarits établis par modèle à partir des cotes constructeur, avec une maquette validée en quatre vues pour chaque silhouette. Film coulé imprimé et laminé, posé en atelier chauffé. Planning de passage étalé sur trois semaines, un véhicule par jour, sur rendez-vous.",
  result: "Flotte homogène, reconnaissable à distance, pour un coût amorti sur six ans qui revient à moins de 18 € par véhicule et par mois."
},
{
  slug: "signaletique-cabinet-medical-montpellier",
  title: "Signalétique complète d'une maison de santé",
  service: "signaletique", city: "montpellier", sector: "cabinet-medical",
  year: "2025", budget: "4 800 € HT", duration: "6 semaines",
  topic: "signaletique-int", imgs: [1, 2, 3],
  facts: [["Support", "Totem, plaques et jalonnement"], ["Accessibilité", "Relief et braille conformes"],
          ["Praticiens", "8 platines interchangeables"], ["Norme", "Arrêté du 20 avril 2017"]],
  context: "Maison de santé pluriprofessionnelle regroupant huit praticiens sur deux niveaux, avec une rotation régulière de remplaçants et d'internes.",
  challenge: "Concilier trois exigences : l'accessibilité réglementaire d'un établissement recevant du public, la déontologie propre à chaque profession représentée, et la nécessité de changer un nom sans refabriquer le support.",
  solution: "Totem d'entrée à huit platines interchangeables, signalétique d'étage et de porte à porte-nom coulissant. Caractères en relief et braille abrégé sur toutes les informations essentielles, posés entre 0,90 m et 1,30 m, avec un contraste mesuré supérieur à 70 %. Bandes d'éveil de vigilance en haut des deux volées d'escalier.",
  result: "Aucune réserve lors de la visite de la commission d'accessibilité, et un changement de praticien qui prend désormais moins d'une minute."
},
{
  slug: "bache-echafaudage-chantier-lyon",
  title: "Bâche d'échafaudage sur une façade de sept étages",
  service: "impression-grand-format", city: "lyon", sector: "batiment-artisan",
  year: "2025", budget: "5 600 € HT", duration: "2 semaines",
  topic: "impression-banderole", imgs: [1, 2, 4],
  facts: [["Support", "Mesh microperforé 320 g/m²"], ["Surface", "148 m²"],
          ["Fixation", "Œillets tous les 50 cm, sandows"], ["Durée", "Chantier de 9 mois"]],
  context: "Réhabilitation d'un immeuble de sept étages en centre-ville, avec un échafaudage installé pour neuf mois sur une artère très passante.",
  challenge: "Une bâche pleine de 148 m² se comporte comme une voile : sur un échafaudage, la prise au vent aurait été rédhibitoire. Le visuel devait par ailleurs rester lisible depuis la rue en contrebas, donc en très forte contre-plongée.",
  solution: "Toile mesh microperforée laissant passer environ 30 % de l'air, imprimée en éco-solvant et laminée anti-UV. Composition retravaillée pour la contre-plongée, avec des hauteurs de caractères progressives selon l'étage. Fixation par œillets tous les 50 cm et sandows sur la structure, avec reprise de tension programmée à trois mois.",
  result: "Neuf mois d'exposition sans reprise ni déchirure, sur l'un des axes les plus fréquentés du quartier."
},
{
  slug: "vitrophanie-agence-immobiliere-bordeaux",
  title: "Habillage de vitrine d'une agence immobilière",
  service: "vitrophanie-plv", city: "bordeaux", sector: "agence-immobiliere",
  year: "2025", budget: "2 400 € HT", duration: "3 semaines",
  topic: "vitrophanie", imgs: [1, 2, 3],
  facts: [["Support", "Vitrine LED double face 8 × A3"], ["Films", "Lettrage, dépoli, mentions légales"],
          ["Transparence", "52 % conservée"], ["Changement", "Annonce remplacée en 10 secondes"]],
  context: "Agence de dix-huit mètres linéaires de vitrine, avec une quinzaine d'annonces modifiées chaque semaine.",
  challenge: "L'ancien système à pinces demandait près de deux heures de manipulation hebdomadaire. La vitrine était par ailleurs saturée d'affiches, au point qu'on ne voyait plus l'intérieur de l'agence.",
  solution: "Vitrine LED double face à ouverture rapide sur huit cadres A3, lisible depuis la rue comme depuis l'intérieur et éclairée après la fermeture. Bandeau haut en lettrage adhésif, mentions professionnelles obligatoires et barème d'honoraires en bas de vitrine, film dépoli sur la seule zone du secrétariat.",
  result: "52 % de surface vitrée réellement transparente conservée, deux heures de manipulation économisées chaque semaine, et une vitrine qui continue de travailler après 19 heures."
},
{
  slug: "totem-concession-automobile-nantes",
  title: "Totem d'entrée pour une concession automobile",
  service: "enseignes", city: "nantes", sector: "garage-automobile",
  year: "2024", budget: "8 900 € HT", duration: "9 semaines",
  topic: "totem", imgs: [1, 2, 3],
  facts: [["Support", "Totem lumineux double face"], ["Hauteur", "4,50 m"],
          ["Lettres", "35 cm de hauteur"], ["Fondation", "Massif béton armé"]],
  context: "Concession implantée en bord de rocade, visible depuis un axe circulé à 90 km/h, avec une entrée de parcelle peu identifiable.",
  challenge: "La lecture se fait à environ 120 mètres et à vitesse constante. L'ancien panneau, dimensionné à l'œil, était illisible dans ces conditions — un défaut de calibrage classique en zone d'activité.",
  solution: "Application de la règle des 3 cm de hauteur de lettre pour 10 mètres de distance : lettres de 35 cm sur un totem de 4,50 m. Structure en aluminium thermolaqué double face, faces en plexiglas coulé rétro-éclairées LED, massif béton armé calculé au vent. Autorisation préalable et déclaration TLPE prises en charge.",
  result: "Entrée de site identifiée sans hésitation depuis la rocade, y compris de nuit et par temps couvert."
},
{
  slug: "croix-pharmacie-officine-nimes",
  title: "Croix et enseigne pour une officine",
  service: "enseignes", city: "nimes", sector: "pharmacie",
  year: "2025", budget: "4 100 € HT", duration: "4 semaines",
  topic: "croix-pharmacie", imgs: [1, 2, 3],
  facts: [["Support", "Croix LED double face 80 cm"], ["Fonctions", "Messages, heure, température"],
          ["Enseigne", "Lettres relief inox brossé"], ["Programmation", "À distance, depuis le comptoir"]],
  context: "Officine de quartier reprise par un nouveau titulaire, avec une croix au néon vieillissante et une enseigne de façade illisible.",
  challenge: "La croix devait rester visible dans une rue étroite, tout en permettant d'afficher les gardes et les campagnes de prévention sans intervention technique à chaque changement.",
  solution: "Croix LED double face de 80 cm à messages défilants, programmable à distance depuis le poste du comptoir, avec affichage alterné de l'heure et de la température. Enseigne de façade en lettres relief inox brossé, rétro-éclairées en blanc neutre pour rester cohérente avec le vert réglementaire de la croix.",
  result: "Gardes et campagnes de vaccination affichées en quelques secondes, sans appel au prestataire, et une façade requalifiée pour un budget contenu."
},
{
  slug: "stand-salon-professionnel-paris",
  title: "Stand textile pour un salon professionnel",
  service: "vitrophanie-plv", city: "paris", sector: "commerce-detail",
  year: "2025", budget: "3 800 € HT", duration: "2 semaines",
  topic: "stand", imgs: [1, 2, 3],
  facts: [["Support", "Mur d'images textile tendu"], ["Dimensions", "4 × 2,50 m"],
          ["Montage", "25 minutes à deux"], ["Réutilisation", "Structure conservée"]],
  context: "Entreprise exposant sur trois salons par an, jusqu'alors équipée de panneaux rigides transportés en camionnette.",
  challenge: "Les panneaux rigides s'abîmaient au transport et devaient être refaits presque chaque année. Le montage mobilisait trois personnes pendant une demi-journée.",
  solution: "Structure aluminium à cadre tendu avec housse textile imprimée par sublimation, transportée en deux valises. Comptoir d'accueil personnalisé et porte-brochures assortis. Seule la housse est à refaire lors d'un changement de charte, pour une fraction du coût de la structure.",
  result: "Montage en vingt-cinq minutes à deux personnes, transport en voiture au lieu d'une camionnette, structure conservée d'un salon à l'autre."
},
{
  slug: "marquage-sol-entrepot-lille",
  title: "Marquage au sol d'un entrepôt logistique",
  service: "signaletique", city: "lille", sector: "industrie-logistique",
  year: "2024", budget: "6 200 € HT", duration: "4 semaines",
  topic: "marquage-sol", imgs: [1, 2, 3],
  facts: [["Surface", "620 m linéaires"], ["Produit", "Résine à froid bi-composant"],
          ["Zones", "Circulation, piétons, stockage"], ["Intervention", "Week-end, site à l'arrêt"]],
  context: "Entrepôt de 4 000 m² avec circulation permanente de chariots élévateurs et des flux piétons non séparés.",
  challenge: "Le marquage adhésif posé deux ans plus tôt avait été arraché en quelques mois par les rotations sur place des chariots. Le site ne pouvait s'arrêter qu'un week-end.",
  solution: "Résine à froid bi-composant sur les allées de circulation, adhésif technique antidérapant sur les cheminements piétons et les zones appelées à évoluer. Préparation du support par ponçage et dégraissage, condition indispensable à la tenue. Intervention menée sur un week-end complet, site à l'arrêt.",
  result: "Flux piétons et chariots séparés physiquement, marquage intact après deux hivers, et un point de conformité levé au document unique."
},
{
  slug: "enseigne-restaurant-neon-marseille",
  title: "Néon LED et enseigne pour un restaurant",
  service: "enseignes", city: "marseille", sector: "restaurant-bar-hotel",
  year: "2025", budget: "2 900 € HT", duration: "4 semaines",
  topic: "enseigne-lumineuse", imgs: [3, 5, 6],
  facts: [["Support", "Néon LED flexible sur mesure"], ["Enseigne", "Lettres laiton brossé"],
          ["Consommation", "12 W pour le néon de vitrine"], ["Terrasse", "Brise-vues imprimés"]],
  context: "Restaurant de quinze couverts en rue piétonne, cherchant à se démarquer d'une dizaine d'établissements voisins sur quelques dizaines de mètres.",
  challenge: "Le règlement local encadrait strictement l'enseigne de façade. Il fallait donc créer l'attractivité autrement, sans dépasser les formats autorisés.",
  solution: "Enseigne de façade sobre en lettres laiton brossé, conforme au règlement, complétée par un néon LED flexible en vitrine portant la signature de l'établissement. Le rendu nocturne a été validé sur échantillon allumé avant fabrication — un rouge profond vire à l'orangé en rétro-éclairage. Brise-vues de terrasse imprimés, conformes au règlement de terrasse municipal.",
  result: "Un néon devenu le fond de photo des clients et un relais spontané sur les réseaux, pour une consommation de 12 W."
},
{
  slug: "signaletique-securite-atelier-strasbourg",
  title: "Signalétique de sécurité d'un atelier de production",
  service: "signaletique", city: "strasbourg", sector: "industrie-logistique",
  year: "2024", budget: "2 700 € HT", duration: "3 semaines",
  topic: "signaletique-secu", imgs: [1, 2, 3],
  facts: [["Norme", "ISO 7010"], ["Plans", "4 plans NF X 08-070"],
          ["Panneaux", "68 unités"], ["Support", "Polycarbonate photoluminescent"]],
  context: "Atelier de mécanique de précision employant régulièrement des intérimaires et accueillant des chauffeurs extérieurs.",
  challenge: "La signalétique existante mélangeait plusieurs générations de pictogrammes, dont certains antérieurs à la norme ISO 7010 et incompréhensibles pour un opérateur non francophone.",
  solution: "Remise à plat complète sur la base du document unique d'évaluation des risques : 68 panneaux ISO 7010, balisage d'évacuation en polycarbonate photoluminescent, quatre plans d'évacuation conformes NF X 08-070 orientés dans le sens de lecture réelle du lecteur, et protocole de sécurité affiché au quai.",
  result: "Lecture immédiate quelle que soit la langue de l'opérateur, et deux observations levées lors de la visite de l'inspection du travail."
},
{
  slug: "habillage-devanture-salon-coiffure-rennes",
  title: "Devanture complète d'un salon de coiffure",
  service: "vitrophanie-plv", city: "rennes", sector: "coiffure-esthetique",
  year: "2025", budget: "3 300 € HT", duration: "5 semaines",
  topic: "vitrophanie", imgs: [4, 5, 6],
  facts: [["Enseigne", "Lettres relief rétro-éclairées"], ["Vitrine", "Lettrage + dépoli hauteur bac"],
          ["Tarifs", "Affichage réglementaire extérieur"], ["Néon", "Signature intérieure"]],
  context: "Salon repris par une nouvelle gérante, avec une devanture d'origine datée et une vitrine entièrement recouverte d'affiches.",
  challenge: "Préserver l'intimité des clientes installées aux bacs sans transformer la vitrine en mur opaque — l'erreur la plus fréquente et la plus coûteuse dans ce métier.",
  solution: "Bandeau haut en lettres relief rétro-éclairées, zone médiane laissée transparente pour montrer l'activité du salon, film dépoli en bandeau à hauteur des bacs pour l'intimité. Affichage réglementaire des prestations et tarifs en vitrophanie à l'entrée. Néon LED de signature installé derrière la caisse.",
  result: "Panier moyen en hausse selon la gérante, et une vitrine qui montre enfin ce qui se passe à l'intérieur."
},
{
  slug: "objets-publicitaires-textile-nice",
  title: "Textile et objets pour une entreprise du bâtiment",
  service: "objets-publicitaires", city: "nice", sector: "batiment-artisan",
  year: "2025", budget: "2 850 € HT", duration: "3 semaines",
  topic: "textile", imgs: [1, 2, 3],
  facts: [["Textile", "24 pièces, broderie + flex"], ["EPI", "Haute visibilité EN ISO 20471"],
          ["Objets", "Gourdes et carnets"], ["Frais techniques", "Non récurrents"]],
  context: "Entreprise de douze salariés dotant ses équipes de tenues, avec des vêtements haute visibilité soumis à certification.",
  challenge: "Marquer des vêtements EN ISO 20471 sans leur faire perdre leur classe de visibilité, ce qu'un marquage trop grand ou mal placé provoque en réduisant la surface fluorescente.",
  solution: "Travail à partir des gabarits de zones de marquage publiés par le fabricant, attestation de conformité fournie. Blason brodé sur les polos et vestes — la broderie survit à la durée de vie du vêtement — et numéros en flex pour ce qui évolue. Gourdes inox et carnets remis aux clients en fin de chantier.",
  result: "Certification préservée, tenues encore intactes après deux saisons, et des frais techniques déjà amortis pour la prochaine commande."
},
{
  slug: "creation-identite-visuelle-grenoble",
  title: "Création d'identité visuelle et déclinaison complète",
  service: "maquette-creation-graphique", city: "grenoble", sector: "commerce-detail",
  year: "2024", budget: "3 600 € HT", duration: "7 semaines",
  topic: "maquette", imgs: [1, 2, 3],
  facts: [["Livrables", "Logo, charte, déclinaisons"], ["Couleurs", "Références Pantone et RAL"],
          ["Formats", "Vectoriels tous supports"], ["Cession", "Droits cédés par écrit"]],
  context: "Commerce en création disposant d'un logo dessiné sur un outil en ligne, exploitable à l'écran mais impossible à fabriquer en relief.",
  challenge: "Le tracé comportait un dégradé et des filets de 0,3 mm : ni découpable dans l'aluminium, ni lisible à deux mètres, ni utilisable en rétro-éclairage.",
  solution: "Reconstruction complète en courbes propres, avec une version simplifiée pour les petites tailles et la broderie. Couleurs référencées en Pantone et en RAL pour garantir un rendu identique entre laque, adhésif et impression. Charte précisant les tailles minimales d'utilisation en millimètres, et cession écrite des droits patrimoniaux.",
  result: "Une identité fabricable sur tous les supports, déclinée ensuite sur l'enseigne, le véhicule et la vitrine sans retouche."
},
{
  slug: "depose-repose-enseigne-nacelle-strasbourg",
  title: "Dépose et repose d'enseigne en nacelle",
  service: "pose-nacelle", city: "strasbourg", sector: "commerce-detail",
  year: "2025", budget: "1 850 € HT", duration: "1 journée",
  topic: "nacelle", imgs: [1, 2, 4],
  facts: [["Accès", "Nacelle 16 m, rue piétonne"], ["Autorisation", "Occupation du domaine public"],
          ["Intervention", "Avant ouverture des commerces"], ["Reprise", "Rebouchage et façade"]],
  context: "Changement d'enseigne à sept mètres de hauteur, en rue piétonne, sur un local dont la façade venait d'être ravalée.",
  challenge: "L'accès nacelle empiétait sur une rue piétonne très fréquentée en journée, et le ravalement récent interdisait toute reprise approximative des anciens ancrages.",
  solution: "Autorisation d'occupation temporaire du domaine public déposée quinze jours avant, avec arrêté municipal et balisage. Intervention menée entre 6 h et 9 h, avant l'ouverture des commerces. Dépose, rebouchage des ancrages au mortier de réparation, retouche de façade au ton, puis repose avec chevilles à rupture de pont thermique adaptées à l'isolation extérieure.",
  result: "Aucune gêne pour les commerces voisins, façade sans trace visible de l'ancienne enseigne, et étanchéité reprise sur chaque percement."
},
{
  slug: "signaletique-directionnelle-mairie-dijon",
  title: "Jalonnement et signalétique d'un pôle administratif",
  service: "signaletique", city: "dijon", sector: "collectivite-erp",
  year: "2024", budget: "9 400 € HT", duration: "11 semaines",
  topic: "signaletique", imgs: [4, 5, 6],
  facts: [["Étude", "Plan de jalonnement complet"], ["Points de décision", "17 identifiés"],
          ["Supports", "Mâts, totems, plaques"], ["Accessibilité", "Relief, braille, contraste"]],
  context: "Regroupement de plusieurs services municipaux sur un même site, avec un accueil saturé d'appels du type « je ne trouve pas ».",
  challenge: "L'organisation interne des services ne correspondait pas au parcours réel des usagers. Le vocabulaire différait par ailleurs entre le panneau extérieur et la porte du service, ce qui suffit à faire douter n'importe qui.",
  solution: "Relevé sur site et identification de dix-sept points de décision réels, du parking jusqu'à la porte. Arborescence de nommage unique validée avant toute fabrication, jamais plus de sept lignes par panneau. Mâts directionnels extérieurs, totem d'accueil, signalétique d'étage et de porte, le tout conforme aux exigences d'accessibilité en relief et braille.",
  result: "Sollicitations de l'accueil nettement réduites d'après les agents, et un plan évolutif grâce aux lames et porte-nom interchangeables."
},
{
  slug: "impression-panneaux-chantier-angers",
  title: "Panneaux de chantier et bâches de palissade",
  service: "impression-grand-format", city: "angers", sector: "batiment-artisan",
  year: "2025", budget: "1 950 € HT", duration: "10 jours",
  topic: "impression", imgs: [1, 2, 3],
  facts: [["Panneau", "Permis de construire réglementaire"], ["Palissade", "36 m² de bâche imprimée"],
          ["Support", "Dibond 3 mm laminé"], ["Pose", "Incluse, avec dépose en fin de chantier"]],
  context: "Opération de construction en centre-ville, avec une palissade de trente-six mètres carrés visible depuis une rue commerçante.",
  challenge: "Le panneau de permis de construire conditionne le point de départ du délai de recours des tiers : son contenu et sa présence continue devaient être irréprochables. La palissade, elle, représentait la plus grande surface de communication du promoteur.",
  solution: "Panneau réglementaire au format conforme avec l'ensemble des mentions obligatoires, en Dibond 3 mm laminé anti-UV pour tenir toute la durée du chantier. Bâche de palissade imprimée en éco-solvant, avec perspective du projet livré et coordonnées commerciales. Pose et dépose incluses.",
  result: "Affichage réglementaire sécurisé sur toute la durée du chantier et une palissade transformée en support de commercialisation."
},
{
  slug: "covering-integral-vehicule-canet-en-roussillon",
  title: "Total covering d'un véhicule de société en bord de mer",
  service: "covering-vehicule", city: "canet-en-roussillon", sector: "commerce-detail",
  year: "2025", budget: "2 650 € HT", duration: "2 semaines",
  topic: "covering", imgs: [6, 7, 8],
  facts: [["Prestation", "Total covering"], ["Film", "Vinyle coulé + laminat anti-UV"],
          ["Durée d'atelier", "3 jours"], ["Contrainte", "Air salin et ensoleillement"]],
  context: "Véhicule d'une entreprise de services stationnant quotidiennement sur le front de mer, exposé au sel et à un ensoleillement parmi les plus élevés de France.",
  challenge: "Le bord de mer est le pire environnement pour un covering : sel, UV et lavages fréquents. Un film calandré n'y tient pas deux saisons, et le toit vieillit toujours en premier.",
  solution: "Film coulé haut de gamme avec laminat anti-UV, seul capable d'épouser passages de roue et nervures sans revenir en arrière. Dépose des poignées, optiques et joints pour un rendu sans raccord visible. Pose en atelier chauffé entre 18 et 25 °C, hors poussière, sur trois jours. Consignes d'entretien remises : lavage manuel au pH neutre, pas de rouleau de station.",
  result: "Rendu sans raccord apparent, protection de la peinture d'origine, et une durée de vie estimée à sept ans malgré l'exposition."
}
];
