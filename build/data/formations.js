/* =========================================================================
   Rubrique « Poser » — le geste métier, pose par pose.
   -------------------------------------------------------------------------
   POURQUOI CETTE RUBRIQUE EXISTE

   Elle sert quatre objectifs à la fois, et c'est ce qui la rend rentable :

   1. Du contenu que personne ne peut dupliquer. La similarité entre nos
      pages villes est mesurée à 59,6 %, contre 23,8 % chez Signarama dont
      chaque franchisé écrit ses propres textes. Trente poses documentées
      depuis l'atelier sont trente pages uniques par nature.
   2. Des photos. Un secteur sur treize a une galerie ; filmer une pose
      produit les images en même temps que la vidéo.
   3. Du recrutement de partenaires. Qui cherche « sceller un totem » ?
      Un poseur — exactement le profil que le réseau veut accueillir.
   4. De la valeur ajoutée à l'abonnement, sans coût marginal une fois
      les vidéos produites.

   STATUT JURIDIQUE — À NE PAS CONFONDRE

   Tant que ces pages sont des tutoriels consultés seuls, sans parcours
   pédagogique, sans évaluation et sans attestation, ce ne sont PAS des
   actions de formation professionnelle : ni déclaration d'activité, ni
   numéro NDA, ni Qualiopi (fiche service-public F19087, qui exclut
   explicitement « les simples contenus vidéo ou tutoriels sans
   accompagnement ni évaluation »).

   Dès qu'on ajoute une évaluation ou une attestation, on bascule dans
   l'action de formation : déclaration à la DREETS sous trois mois, bilan
   pédagogique annuel, et Qualiopi pour tout financement CPF ou OPCO.
   Le champ « statut » ci-dessous existe pour tenir cette frontière.

   SÉCURITÉ — LA RÈGLE DE RÉDACTION

   Ces contenus décrivent des travaux en hauteur, des scellements qui
   supportent des charges et des raccordements électriques. On ne publie
   donc JAMAIS une valeur de dimensionnement inventée : ni volume de
   massif, ni profondeur d'ancrage, ni section de câble. Là où le chiffre
   engage la sécurité, la page dit d'où vient le chiffre — fiche technique
   du fabricant, avis technique européen de la cheville, note de calcul au
   vent — et non un ordre de grandeur de mémoire.

   RELECTURE OBLIGATOIRE AVANT PUBLICATION

   Les fiches sont rédigées à partir de la pratique courante du métier.
   Elles portent « statut: brouillon » tant qu'un professionnel ne les a
   pas validées : dans cet état elles sont en noindex et hors sitemap.
   Passer une fiche à « publie » est une décision humaine, pas une étape
   de build.
   ========================================================================= */

const FAMILLES = [
  { slug: "adhesif",   nom: "Adhésif et vitrophanie",     intro: "Le geste qui fait la différence entre une pose qui tient dix ans et une pose qui cloque en six mois." },
  { slug: "facade",    nom: "Enseigne de façade",          intro: "Fixation, alignement, raccordement : ce qui se voit de la rue et ce qui se joue derrière le mur." },
  { slug: "sol",       nom: "Totem et signalétique au sol", intro: "Là où la pose devient du génie civil : massif, scellement, prise au vent." },
  { slug: "panneau",   nom: "Panneaux et supports rigides", intro: "Dibond, PVC, plexiglas, bâche : chaque matériau a sa dilatation et ses entraxes." },
  { slug: "vehicule",  nom: "Véhicule",                     intro: "Surfaces courbes, rivets, poignées : le covering est le plus exigeant des supports." },
  { slug: "interieur", nom: "Signalétique intérieure",      intro: "Plaques, braille, habillages muraux : précision et conformité." },
  { slug: "entretien", nom: "Entretien, dépose, sécurité",  intro: "Ce qui prolonge une enseigne, et ce que la loi impose quand l'activité s'arrête." }
];

/* ---------------------------------------------------------------------
   Les trente poses.

   « statut » : "publie" = fiche relue, indexable.
                "brouillon" = rédigée mais non validée : noindex, hors
                sitemap, signalée comme telle sur la page.
   « acces »  : "libre" = gratuit. "reseau" = réservé aux partenaires.
   --------------------------------------------------------------------- */
const POSES = [

/* ======================= ADHÉSIF ET VITROPHANIE ======================= */
{
  slug: "coller-adhesif-vitrine-methode-humide",
  famille: "adhesif",
  nav: "Coller un adhésif sur vitrine — méthode humide",
  h1: "Coller un adhésif sur une vitrine à la méthode humide",
  title: "Poser un Adhésif sur Vitrine — Méthode Humide Pas à Pas",
  desc: "La méthode humide expliquée geste par geste : préparation du verre, solution de pose, maroufl'age, séchage. Les erreurs qui font cloquer un adhésif.",
  statut: "publie", acces: "libre",
  duree: "45 min", niveau: "Débutant",
  resume: "La méthode humide pardonne les erreurs de placement : le film flotte sur un film d'eau savonneuse et se repositionne tant que l'eau n'est pas chassée. C'est la méthode à apprendre en premier.",
  quand: "Sur verre plan, pour des visuels de plus de 30 cm, et chaque fois qu'un repositionnement est probable. À éviter sur les films à colle repositionnable à billes et sur les microperforés, qui n'aiment pas l'eau.",
  materiel: [
    "Raclette à feutre (le feutre évite de rayer le vernis d'impression)",
    "Pulvérisateur et solution de pose : eau déminéralisée et quelques gouttes de liquide vaisselle sans additif",
    "Grattoir à lame neuve pour le décapage du verre",
    "Chiffon microfibre non pelucheux",
    "Décapeur thermique ou sèche-cheveux pour le séchage des bords",
    "Cutter à lame sécable et règle de coupe"
  ],
  etapes: [
    ["Préparer le verre", "Gratter les résidus à la lame, dégraisser à l'alcool isopropylique, puis rincer. Un verre neuf sort d'usine avec un film de silicone : il se dégraisse aussi. C'est l'étape que l'on bâcle et qui fait décoller la pose six mois plus tard."],
    ["Positionner et scotcher", "Fixer le visuel à sec sur la vitre avec du ruban de masquage, reculer, vérifier l'alignement depuis la rue. Poser une charnière de ruban sur un bord pour garder le repère."],
    ["Mouiller généreusement", "Pulvériser la vitre ET la face adhésive une fois le liner retiré. Trop peu d'eau est la première cause d'échec : le film accroche avant d'être en place."],
    ["Positionner le film", "Le film flotte : on ajuste au millimètre. Vérifier l'aplomb à ce moment, pas après."],
    ["Chasser l'eau", "Raclette du centre vers l'extérieur, par passes qui se recouvrent, en tenant le film tendu de l'autre main. Toujours du centre vers les bords, jamais l'inverse."],
    ["Reprendre les bords", "Repasser la raclette sur tout le pourtour, puis sécher au décapeur à faible distance pour chasser l'humidité résiduelle sous les bords."],
    ["Couper et laisser sécher", "Araser au cutter contre le châssis si nécessaire. Prévenir le client : de fines bulles d'eau peuvent subsister quelques jours et disparaissent seules."]
  ],
  erreurs: [
    "Trop peu d'eau : le film accroche avant d'être positionné et ne se rattrape plus.",
    "Raclette du bord vers le centre : on emprisonne l'eau au lieu de la chasser.",
    "Poser par temps froid sur une vitre froide : sous la température minimale d'application indiquée par le fabricant, la colle ne fait pas sa prise.",
    "Solution trop savonneuse : le film ne colle jamais complètement.",
    "Utiliser de l'eau du robinet calcaire : des traces blanches apparaissent au séchage.",
    "Nettoyer à l'ammoniaque avant pose : incompatible avec la plupart des colles acryliques."
  ],
  securite: [
    "Travail en hauteur : escabeau conforme ou échafaudage roulant, jamais une chaise. Au-delà de trois mètres, la nacelle s'impose et demande une autorisation de conduite.",
    "Lames de cutter et grattoir : gants anti-coupure et lame changée souvent — une lame usée force et dérape.",
    "Occupation du trottoir : autorisation en mairie et balisage si la pose déborde sur le domaine public."
  ],
  verifier: "La température minimale d'application et la plage de température d'utilisation figurent sur la fiche technique du film. Elles varient d'un fabricant et d'une gamme à l'autre : elles se lisent, elles ne se devinent pas.",
  faq: [
    { q: "Combien de temps avant que l'adhésif atteigne son adhérence finale ?", a: "La prise initiale est immédiate, mais l'adhérence finale d'une colle acrylique se construit sur plusieurs jours. C'est pour cela qu'on ne nettoie pas une vitrophanie fraîchement posée, et qu'on ne la juge pas le jour même." },
    { q: "Peut-on poser un adhésif en plein soleil ?", a: "C'est déconseillé. Le verre chauffe, l'eau s'évapore avant d'être chassée et la colle prend trop vite. On pose à l'ombre, tôt le matin, ou on masque la vitre." },
    { q: "Faut-il poser à l'intérieur ou à l'extérieur de la vitre ?", a: "Cela dépend du film : un adhésif classique se pose à l'extérieur, un film en pose intérieure (dit « reverse » ou « pose intérieure ») est imprimé en miroir et se colle côté boutique. Poser un film extérieur à l'intérieur donne un visuel inversé et une adhérence médiocre." }
  ]
},
{
  slug: "coller-adhesif-vitrine-methode-seche",
  famille: "adhesif",
  nav: "Coller un adhésif sur vitrine — méthode sèche",
  h1: "Coller un adhésif sur une vitrine à la méthode sèche",
  title: "Pose d'Adhésif à Sec sur Vitrine — Technique et Limites",
  desc: "La pose à sec : plus rapide, sans repositionnement possible. Technique de la charnière, marouflage progressif, et les films qui l'exigent.",
  statut: "publie", acces: "libre",
  duree: "30 min", niveau: "Intermédiaire",
  resume: "Plus rapide que la méthode humide, mais sans droit à l'erreur : le film colle où il touche. C'est la méthode obligatoire pour les films microperforés et les colles à billes.",
  quand: "Sur petits formats, sur les films que l'eau abîme, et quand le délai de séchage n'est pas acceptable.",
  materiel: ["Raclette à feutre", "Ruban de masquage", "Chiffon microfibre", "Alcool isopropylique", "Cutter"],
  etapes: [
    ["Préparer et positionner", "Même préparation du verre que pour la méthode humide. Le dégraissage compte davantage encore : à sec, aucune eau ne rattrape une poussière."],
    ["Poser la charnière", "Une bande de ruban de masquage sur toute la largeur, au milieu du visuel, le fixe à la vitre et sert d'axe."],
    ["Rabattre une moitié", "Replier une moitié, retirer le liner sur cette partie uniquement, et couper le liner au ras de la charnière."],
    ["Maroufler au centre", "Raclette depuis la charnière vers l'extérieur, en éventail, sans jamais laisser le film retomber à plat devant la raclette."],
    ["Traiter la seconde moitié", "Retirer la charnière, replier, retirer le liner restant, maroufler de la même façon."]
  ],
  erreurs: [
    "Laisser le film retomber devant la raclette : il colle d'un coup et emprisonne une bulle qu'on ne récupère pas.",
    "Retirer tout le liner d'un coup : le film se colle sur lui-même et il est perdu.",
    "Vouloir repositionner : à sec, un film décollé puis recollé garde des marques.",
    "Poser par temps froid : en dessous d'une dizaine de degrés, la colle n'accroche pas et le film se rétracte en séchant. La plage de température admissible figure sur la fiche technique.",
    "Travailler en plein soleil sur la vitre : le verre chaud fait prendre la colle instantanément, sans laisser le temps de marouffler.",
    "Négliger la charnière et poser à main levée : le visuel part de travers dès les premiers centimètres et il n'y a pas de retour possible."
  ],
  securite: ["Travail en hauteur : mêmes règles que pour la méthode humide.", "Gants anti-coupure au cutter.",
    "Décapeur thermique s'il sert à chasser une bulle : jamais dirigé vers un joint d'étanchéité, et à distance constante.",
    "Chutes de liner au sol : elles glissent comme du verglas, surtout sur un carrelage de vitrine."
  ],
  verifier: "Certains films n'admettent que la pose à sec — c'est écrit sur leur fiche technique, et les mouiller ruine définitivement la colle. La plage de température de pose y figure également : elle conditionne l'accroche et elle est plus étroite qu'on ne croit, généralement quelques degrés au-dessus de zéro au minimum. En cas de doute sur une référence inconnue, la fiche technique du fabricant tranche, jamais l'habitude prise sur une autre marque.",
  faq: [
    { q: "Quand la méthode sèche est-elle obligatoire ?", a: "Sur les microperforés, dont les trous laisseraient passer l'eau derrière le film, et sur les colles structurées à billes ou canaux d'air, conçues pour se repositionner à sec." },
    { q: "Comment rattraper une bulle d'air en pose sèche ?", a: "Une petite bulle se perce à l'aiguille très fine et se maroufle. Une grande bulle demande de décoller jusqu'à elle et de reprendre — d'où l'intérêt de maroufler par petites passes." },
    { q: "Peut-on poser à sec sur une vitrine en plein soleil ?", a: "C'est déconseillé, et pas pour le confort du poseur. Un verre chauffé par le soleil fait prendre la colle au contact, sans le temps de repositionner ni de chasser l'air. Si le chantier ne peut pas être décalé, travaillez la vitrine à l'ombre du bâtiment, tôt le matin, ou posez un voile d'ombrage le temps de l'intervention." }
  ]
},
{
  slug: "poser-film-depoli-sans-bulles",
  famille: "adhesif",
  nav: "Poser un film dépoli sans bulles",
  h1: "Poser un film dépoli (effet sablé) sans bulles",
  title: "Poser un Film Dépoli sur Vitre — Sans Bulle ni Trace",
  desc: "Le dépoli ne pardonne rien : chaque bulle et chaque poussière se voit. Préparation, pose humide, découpe des angles et finitions.",
  statut: "publie", acces: "libre",
  duree: "1 h", niveau: "Intermédiaire",
  resume: "Le film dépoli est translucide et uniforme : le moindre défaut se lit en contre-jour. C'est la pose la moins indulgente de toutes.",
  quand: "Occultation partielle d'un bureau, confidentialité en pharmacie ou cabinet médical, décor de vitrine.",
  materiel: ["Raclette à feutre neuve", "Pulvérisateur, eau déminéralisée", "Grattoir, alcool isopropylique", "Règle inox et cutter", "Éclairage rasant pour contrôler"],
  etapes: [
    ["Nettoyer deux fois", "Le dépoli révèle tout. Premier passage au grattoir et à l'alcool, second passage à l'eau déminéralisée, contrôle en lumière rasante avant de sortir le film."],
    ["Couper large", "Prévoir un débord de deux à trois centimètres sur tout le pourtour : on arase après pose, jamais avant."],
    ["Poser humide", "Méthode humide obligatoire : le dépoli ne se repositionne pas à sec sans marquer."],
    ["Maroufler méthodiquement", "Passes courtes et se recouvrant, du centre vers l'extérieur, en contrôlant en contre-jour au fur et à mesure."],
    ["Araser", "Règle inox plaquée contre le châssis, lame neuve, coupe en un seul geste continu."]
  ],
  erreurs: [
    "Une poussière sous le film : invisible sur un adhésif opaque, très visible sur un dépoli.",
    "Couper à la dimension exacte avant pose : le moindre décalage laisse un jour au bord.",
    "Lame usée : elle déchire le dépoli au lieu de le couper.",
    "Maroufler avec une raclette dure : elle marque le dépoli de traces brillantes que rien n'efface.",
    "Poser sur un vitrage sale en périphérie : la poussière du joint migre sous le film dans les jours qui suivent et forme une frange visible.",
    "Oublier de contrôler en lumière rasante avant d'araser : une bulle repérée après la coupe ne se chasse plus vers le bord."
  ],
  securite: ["Travail en hauteur.", "Gants anti-coupure : la règle inox et la lame neuve sont une combinaison qui blesse vite.",
    "Eau au sol : le sol d'une vitrine mouillé est glissant, et l'on y travaille souvent sur un escabeau.",
    "Chutes de film et lames usagées : conteneur fermé, jamais la poubelle du client."
  ],
  verifier: "Certains dépolis sont déconseillés sur double vitrage exposé plein sud : l'accumulation de chaleur entre les verres peut provoquer une casse thermique, et la responsabilité en cas de bris revient à celui qui a posé. La compatibilité se lit sur la fiche technique du film et se confirme auprès du fabricant du vitrage, qui connaît la composition exacte du double vitrage. Cette vérification prend dix minutes et elle vaut le prix d'un vitrage de vitrine.",
  faq: [
    { q: "Le dépoli adhésif remplace-t-il un verre sablé ?", a: "Visuellement oui, de très près on distingue la différence. Il a l'avantage d'être réversible et infiniment moins cher, et l'inconvénient d'être vulnérable aux rayures." },
    { q: "Peut-on découper un motif dans le dépoli ?", a: "Oui, c'est même l'usage le plus courant : bandes horizontales, logo réservé en transparence, motif aléatoire. La découpe se fait en amont au traceur, pas sur place." },
    { q: "Combien de temps avant que le dépoli soit sec ?", a: "Le film est manipulable immédiatement mais la colle n'atteint sa tenue finale qu'après plusieurs jours, le temps que l'eau résiduelle s'évacue. Pendant cette période, quelques micro-bulles laiteuses peuvent subsister : elles disparaissent seules. Ne les percez pas, vous laisseriez un point visible définitif." }
  ]
},
{
  slug: "poser-lettrage-papier-transfert",
  famille: "adhesif",
  nav: "Poser un lettrage au papier de transfert",
  h1: "Poser un lettrage découpé avec papier de transfert",
  title: "Poser un Lettrage Adhésif Découpé — Papier de Transfert",
  desc: "Lettrage découpé, échenillage, transfert et alignement. La méthode pour que les lettres arrivent droites et espacées comme au fichier.",
  statut: "publie", acces: "libre",
  duree: "45 min", niveau: "Débutant",
  resume: "Le lettrage découpé n'a pas de fond : chaque lettre est indépendante et c'est le papier de transfert qui les maintient en place jusqu'à la vitre.",
  quand: "Horaires, raison sociale, mentions légales, numéro de téléphone : tout ce qui est du texte sans fond.",
  materiel: ["Papier ou film de transfert", "Raclette à feutre", "Ruban de masquage", "Niveau à bulle ou laser", "Pulvérisateur (si pose humide)"],
  etapes: [
    ["Échenillage", "Retirer les chutes autour des lettres, et surtout les contre-formes intérieures des A, O, P, R. C'est l'étape qu'on oublie et qui se voit."],
    ["Appliquer le transfert", "Maroufler fermement le papier de transfert sur les lettres pour qu'elles le préfèrent au liner."],
    ["Tracer la ligne", "Ruban de masquage au niveau, sur la vitre, à la hauteur de la ligne de base des lettres. C'est ce repère qui garantit l'horizontalité, pas l'œil."],
    ["Poser et maroufler", "Aligner sur le ruban, maroufler du centre vers les bords."],
    ["Retirer le transfert", "Décoller lentement, à angle très fermé, presque parallèle à la vitre. Une lettre qui suit le transfert se remaroufle et on reprend."]
  ],
  erreurs: [
    "Oublier une contre-forme : un O plein au lieu d'un O.",
    "Retirer le transfert à 90° : les lettres suivent.",
    "Se fier à l'œil pour l'horizontalité : un décalage de deux millimètres sur deux mètres se voit depuis la rue.",
    "Maroufler le transfert trop faiblement : les lettres restent sur le liner au lieu de suivre, et le lettrage est à refaire.",
    "Poser un lettrage fin par temps humide : l'humidité ambiante suffit à faire perdre son mordant au papier de transfert.",
    "Oublier de vérifier le sens de lecture avant de poser côté intérieur de vitre : c'est l'erreur qui ne se rattrape jamais."
  ],
  securite: ["Travail en hauteur selon la position du lettrage.",
    "Cutter et lames : rangement immédiat, jamais posé sur l'appui de vitrine.",
    "Escabeau plutôt que chaise ou comptoir, y compris pour un lettrage bas."
  ],
  verifier: "Le temps de repos du transfert avant retrait varie selon le film et la température, et il figure sur la fiche technique du fabricant. Deux points s'y lisent également et se vérifient avant la commande : la pose intérieure ou extérieure attendue, qui change le sens de fabrication du fichier, et la durabilité annoncée du vinyle, qui va de deux à dix ans selon les gammes. Un lettrage économique posé côté extérieur en plein sud ne passe pas deux étés.",
  faq: [
    { q: "Pose humide ou sèche pour un lettrage ?", a: "Humide pour les grands lettrages, où l'alignement compte et où le repositionnement sauve. Sèche pour les petits textes, plus rapide." },
    { q: "Comment poser un lettrage sur une vitre déjà teintée ?", a: "Sans difficulté particulière côté extérieur. Côté intérieur, sur un film solaire, l'adhérence est moindre : il faut vérifier la compatibilité des deux films." },
    { q: "Combien de temps tient un lettrage de vitrine ?", a: "De deux à dix ans selon la qualité du vinyle et l'exposition. Un film monomère d'entrée de gamme sur une vitrine plein sud commence à jaunir et à se rétracter au bout de deux ans ; un film coulé de qualité posé côté intérieur tient dix ans sans bouger. L'écart de prix à la commande est faible, l'écart de durée est considérable : c'est la question à poser au moment du devis." }
  ]
},
{
  slug: "poser-microperfore-one-way-vision",
  famille: "adhesif",
  nav: "Poser un microperforé (one way vision)",
  h1: "Poser un film microperforé sur une vitrine",
  title: "Poser un Microperforé One Way Vision — Méthode et Pièges",
  desc: "Le microperforé se pose à sec, se nettoie autrement et se laque parfois. Pose, entretien et limites du one way vision.",
  statut: "publie", acces: "libre",
  duree: "1 h", niveau: "Intermédiaire",
  resume: "Visuel plein depuis la rue, transparence depuis l'intérieur : le microperforé est troué à 40 ou 50 %. Ces trous changent tout, à la pose comme à l'entretien.",
  quand: "Vitrine que l'on veut habiller sans aveugler le commerce, vitre de véhicule, devanture d'agence.",
  materiel: ["Raclette à feutre", "Alcool isopropylique", "Cutter", "Éventuellement film de lamination pour pose extérieure"],
  etapes: [
    ["Préparer le verre", "Dégraissage soigné : à sec, rien ne rattrape."],
    ["Poser à sec, obligatoirement", "L'eau passerait par les perforations et se retrouverait piégée entre le film et le verre. La méthode humide est exclue."],
    ["Maroufler avec une raclette douce", "Une raclette trop dure marque les perforations et abîme l'impression."],
    ["Araser", "Coupe nette au ras du châssis : un bord qui dépasse se décolle vite, les trous offrant prise à l'eau et au vent."]
  ],
  erreurs: [
    "Poser à l'eau : c'est l'erreur classique, et elle est irrattrapable.",
    "Nettoyer à la raclette de laveur de vitres : elle arrache le film par les perforations.",
    "Poser côté intérieur : le one way vision ne fonctionne que côté extérieur, avec la lumière du jour du bon côté.",
    "Poser sur une vitrine dépourvue de recul intérieur : le one way vision a besoin que l'intérieur soit plus sombre que l'extérieur. Devant un mur blanc éclairé, l'effet ne fonctionne pas.",
    "Omettre le laminat de protection en pose extérieure : l'encre s'efface en une saison et les perforations se chargent de poussière.",
    "Araser au ras du joint sans marge : la moindre reprise de découpe laisse un bord dentelé, très visible sur un support perforé."
  ],
  securite: ["Travail en hauteur selon la vitrine.",
    "Chutes de microperforé : elles sont coupantes en bord de découpe et glissantes au sol.",
    "Gants anti-coupure au moment de l'arasement, la lame ripe facilement sur un film perforé."
  ],
  verifier: "Le taux de perforation — le plus souvent 40 ou 50 % — et la nécessité d'un laminat de protection en pose extérieure dépendent de la référence et se lisent sur la fiche technique. Un point mérite d'être tranché avant la commande : la pose est-elle prévue côté extérieur ou côté intérieur du vitrage ? Les deux existent, elles ne se fabriquent pas de la même façon, et un film destiné à l'extérieur posé à l'intérieur donne un résultat terne dans les deux sens.",
  faq: [
    { q: "Comment nettoie-t-on un microperforé ?", a: "À l'eau claire et à l'éponge douce, par tamponnement, jamais à la raclette ni au jet haute pression. C'est à dire au client : c'est la première cause de dégradation." },
    { q: "Le one way vision fonctionne-t-il la nuit ?", a: "Non, et c'est sa limite. L'effet repose sur le contraste de luminosité : la nuit, boutique éclairée et rue sombre, la vision s'inverse et l'on voit l'intérieur depuis la rue." },
    { q: "Le microperforé réduit-il la lumière à l'intérieur ?", a: "Oui, dans la proportion de son taux de perforation : un film perforé à 40 % laisse passer environ 40 % de la lumière, donc en bloque la majorité. Sur une vitrine déjà sombre ou orientée au nord, l'effet sur le confort intérieur est net, et les occupants le signalent en général au bout de quelques jours. À évaluer avant de couvrir une vitrine entière." }
  ]
},
{
  slug: "deposer-ancien-adhesif-sans-rayer",
  famille: "adhesif",
  nav: "Déposer un ancien adhésif sans rayer",
  h1: "Déposer un ancien adhésif sans rayer le verre",
  title: "Retirer un Vieil Adhésif de Vitrine Sans Rayer le Verre",
  desc: "Chaleur, grattoir, dissolvant de colle : la méthode pour déposer un adhésif cuit par dix ans de soleil sans abîmer le support.",
  statut: "publie", acces: "libre",
  duree: "1 h 30", niveau: "Débutant",
  resume: "Un adhésif de dix ans ne se décolle pas, il s'arrache par morceaux en laissant sa colle. La chaleur est la clé, la patience fait le reste.",
  quand: "Changement d'enseigne, reprise de local, rénovation de vitrine.",
  materiel: ["Décapeur thermique", "Grattoir à lame neuve", "Dissolvant de colle adapté au support", "Chiffons", "Gants résistants à la chaleur"],
  etapes: [
    ["Chauffer par zones", "Décapeur à distance moyenne, en balayage constant. Chauffer une zone de la taille d'une main, décoller, passer à la suivante."],
    ["Tirer à angle fermé", "Décoller lentement, presque parallèlement à la vitre : à 90°, le film casse et laisse sa colle."],
    ["Traiter la colle résiduelle", "Dissolvant appliqué au chiffon, temps de pose respecté, puis grattoir à plat."],
    ["Dégraisser", "Alcool isopropylique et rinçage : le dissolvant laisse un film gras qui empêcherait toute repose."]
  ],
  erreurs: [
    "Surchauffer : sur double vitrage, une chaleur excessive et localisée risque la casse thermique.",
    "Grattoir sur châssis peint ou alu laqué : il raye définitivement. Le grattoir est pour le verre, pas pour l'encadrement.",
    "Dissolvant sur plexiglas ou polycarbonate : beaucoup de produits les fissurent. Toujours tester sur une zone cachée.",
    "Décoller à froid pour gagner du temps : le film casse en petits morceaux et la colle reste intégralement, ce qui triple la durée du chantier.",
    "Employer une lame de rasoir sur un vitrage à couche : les verres à couche peu émissive ou anti-reflet ont un traitement de surface que la lame raye définitivement.",
    "Négliger le nettoyage du joint périphérique : la colle s'y accumule et ressort sous le film neuf dans les semaines qui suivent."
  ],
  securite: [
    "Décapeur thermique : gants, et jamais dirigé vers un joint d'étanchéité ou un câble.",
    "Dissolvants : ventilation, gants nitrile, lecture de la fiche de données de sécurité.",
    "Déchets : les films déposés et les chiffons imbibés relèvent d'une filière de déchets professionnels, pas de la poubelle du client.",
    "Travail en hauteur si la dépose concerne un bandeau haut : nacelle ou échafaudage, pas d'escabeau en appui sur la vitrine."
  ],
  verifier: "La compatibilité du dissolvant avec le support — verre, aluminium laqué, plexiglas, peinture — est indiquée sur sa fiche de données de sécurité, qui doit être présente sur le chantier. Un point souvent découvert trop tard : sur un vitrage à couche, ni la lame ni certains solvants ne sont admis, et le vitrier du bâtiment est le seul à pouvoir dire de quel type de verre il s'agit. Avant d'attaquer une dépose sur un vitrage dont on ignore la nature, la question se pose au gestionnaire du bâtiment.",
  faq: [
    { q: "Et sur du plexiglas ?", a: "Chaleur douce uniquement, jamais de grattoir métallique, et surtout pas d'acétone ni de white-spirit qui fissurent le PMMA. Un dissolvant spécifiquement déclaré compatible, ou rien." },
    { q: "Combien de temps pour déposer une vitrine complète ?", a: "Très variable : un adhésif de deux ans se retire en une demi-heure, un adhésif de dix ans plein sud peut demander une journée. C'est à chiffrer en régie, pas au forfait." },
    { q: "Combien de temps faut-il pour déposer un covering de vitrine complet ?", a: "Bien plus longtemps que pour le poser, et c'est la surprise classique du devis. Comptez deux à trois fois le temps de pose sur un film récent et correctement posé, davantage sur un adhésif resté sept ou huit ans en plein soleil, dont la colle a migré et durci. Un devis de dépose établi au même tarif horaire qu'une pose est un devis qui sera dépassé." }
  ]
},
/* ========================== ENSEIGNE DE FAÇADE ========================== */
{
  slug: "poser-caisson-lumineux-facade",
  famille: "facade", nav: "Poser un caisson lumineux en façade",
  h1: "Poser un caisson lumineux en façade",
  title: "Poser un Caisson Lumineux en Façade — Fixation et Raccord",
  desc: "Repérage, choix des chevilles selon le support, passage de l'alimentation, étanchéité des percements. La pose d'un caisson pas à pas.",
  statut: "publie", acces: "libre", duree: "3 h", niveau: "Confirmé",
  resume: "Un caisson pèse, prend le vent et se raccorde au réseau. Trois métiers en un : fixation, étanchéité, électricité.",
  quand: "Devanture de commerce, façade d'agence, enseigne de zone d'activité.",
  materiel: ["Perforateur et forets adaptés au support", "Chevilles dimensionnées selon le support et la charge", "Niveau laser", "Détecteur de métaux et de câbles", "Mastic d'étanchéité compatible façade", "Matériel de travail en hauteur"],
  etapes: [
    ["Identifier le support", "Béton plein, parpaing creux, brique, ossature bois, isolation par l'extérieur : chacun appelle une cheville différente. Sonder avant de percer, jamais l'inverse."],
    ["Détecter avant de percer", "Détecteur de câbles et de canalisations sur toute la zone de perçage. Un percement dans une gaine électrique encastrée est un accident."],
    ["Tracer au laser", "Repérer l'axe, l'aplomb et la hauteur. Vérifier depuis la rue avant de percer : la perception change à distance."],
    ["Percer et cheviller", "Profondeur et diamètre exactement conformes à la notice de la cheville. Dépoussiérer les trous : une cheville chimique dans un trou non soufflé perd une grande part de sa résistance."],
    ["Fixer le caisson", "Présenter à deux, mettre à niveau, serrer au couple indiqué."],
    ["Passer et raccorder l'alimentation", "Percement en pente vers l'extérieur, passe-fil, et raccordement par un intervenant habilité."],
    ["Étanchéifier", "Mastic sur tous les percements, en cordon continu. C'est ce qui évite l'infiltration derrière la façade — et le litige deux hivers plus tard."]
  ],
  erreurs: ["Cheviller du parpaing creux comme du béton plein.", "Percer sans détecter.", "Percement horizontal ou en pente vers l'intérieur : l'eau entre.", "Serrer une cheville au-delà du couple : elle perd sa tenue.",
    "Poser le caisson avant d'avoir fait tirer l'alimentation : il faut alors le redéposer, ou passer le câble en apparent sur la façade.",
    "Négliger l'isolation thermique par l'extérieur : sur une façade ITE, une cheville ordinaire ne traverse que l'isolant et ne tient rien. Il faut des fixations traversantes prévues pour ce cas.",
    "Oublier le point de purge en partie basse : un caisson étanche en apparence accumule la condensation et noie son alimentation en un hiver."
  ],
  securite: ["Travail en hauteur : échafaudage ou nacelle, harnais selon configuration. La conduite de nacelle exige une autorisation délivrée par l'employeur après formation.", "Raccordement électrique : opération réservée à une personne titulaire d'une habilitation électrique adaptée.", "Occupation du domaine public : autorisation en mairie, balisage, et arrêté de circulation si le trottoir est neutralisé.", "Casque et chaussures de sécurité : un caisson qui échappe tombe de haut.",
    "Le caisson se lève à deux au minimum, ou au treuil : sa prise au vent en cours de levage surprend même par temps calme."
  ],
  verifier: "La charge admissible d'une cheville dépend du support, de l'entraxe, de la distance au bord et de la profondeur d'ancrage. Ces valeurs figurent dans la fiche technique du fabricant de fixations, sous forme de tableaux par matériau, et elles ne se déduisent d'aucune règle générale. Sur un support douteux — parpaing creux, brique ancienne, façade isolée par l'extérieur, enduit épais sur support inconnu — un essai d'arrachement sur place est la seule réponse sérieuse. Aucun poids de caisson ne permet à lui seul de choisir une fixation : c'est le support qui commande, pas la charge.",
  faq: [
    { q: "Faut-il une autorisation pour poser un caisson ?", a: "Oui dès lors que la commune a un règlement local de publicité, ou que le local se trouve aux abords d'un monument historique ou en site patrimonial remarquable. Le dossier repose sur le formulaire Cerfa n° 14798. La page ville du réseau indique le régime applicable commune par commune." },
    { q: "Qui raccorde l'alimentation ?", a: "Une personne habilitée. Le poseur d'enseigne n'est pas électricien par défaut : l'habilitation électrique est une autorisation écrite délivrée par l'employeur après formation, et elle est exigible en cas de contrôle comme en cas de sinistre." },
    { q: "Combien de temps dure un caisson lumineux ?", a: "Le caisson lui-même, quinze à vingt ans si l'étanchéité tient. Ce qui lâche en premier, ce sont l'alimentation et les modules LED, entre cinq et dix ans selon leur qualité et la température qu'ils subissent à l'intérieur du coffre. D'où l'importance d'un accès de maintenance prévu dès la pose : un caisson qu'on ne peut pas ouvrir sans le déposer finit remplacé au lieu d'être réparé." }
  ]
},
{
  slug: "poser-lettres-decoupees-relief",
  famille: "facade", nav: "Poser des lettres découpées relief",
  h1: "Poser des lettres découpées en relief sur une façade",
  title: "Poser des Lettres Relief en Façade — Gabarit et Entraxes",
  desc: "La technique du gabarit papier, le perçage des entretoises, l'alignement et le rattrapage des façades qui ne sont pas d'aplomb.",
  statut: "publie", acces: "libre", duree: "4 h", niveau: "Confirmé",
  resume: "Chaque lettre est une pièce indépendante à fixer. Tout se joue au gabarit : une fois percé, on ne rattrape plus.",
  quand: "Enseigne haut de gamme, façade en secteur patrimonial où le caisson plein est refusé.",
  materiel: ["Gabarit papier ou film fourni par l'atelier", "Perforateur, forets", "Entretoises et tiges filetées", "Niveau laser", "Mastic ou scellement selon le support"],
  etapes: [
    ["Vérifier le gabarit", "Le gabarit sort de l'atelier à l'échelle 1. Le contrôler au mètre avant de le fixer : une erreur d'impression se paie en percements inutiles."],
    ["Positionner au laser", "Fixer le gabarit au ruban, ligne de base au laser, et reculer pour juger depuis la rue."],
    ["Percer à travers le gabarit", "Chaque point de fixation est marqué sur le gabarit. Percer tous les trous avant de retirer le gabarit."],
    ["Poser les tiges", "Scellement chimique ou cheville selon le support, temps de prise respecté avant toute charge."],
    ["Présenter les lettres", "Une par une, en partant du centre vers les extrémités pour répartir les écarts éventuels."],
    ["Ajuster et étanchéifier", "Entretoises réglées pour compenser les défauts de planéité, mastic sur les percements."]
  ],
  erreurs: ["Retirer le gabarit avant d'avoir percé tous les trous.", "Poser les lettres avant la fin du temps de prise du scellement.", "Commencer par une extrémité : l'écart cumulé se retrouve entièrement sur la dernière lettre.", "Négliger le défaut d'aplomb de la façade : les lettres avancent et reculent visiblement en lumière rasante.",
    "Percer sans relever l'aplomb réel de la façade : sur un mur qui fuit, des entretoises de longueur identique donnent des lettres qui avancent et reculent.",
    "Poser des lettres de grande taille sans point de fixation intermédiaire : elles vrillent avec les écarts de température.",
    "Coller des lettres légères sur une façade peinte sans essai préalable : c'est la peinture qui se décolle, pas la lettre."
  ],
  securite: ["Travail en hauteur.", "Poussière de perçage : masque FFP2 minimum, surtout en intérieur ou sur support ancien.", "Attention aux supports amiantés sur les bâtiments antérieurs à 1997 : le repérage avant travaux est une obligation du donneur d'ordre.",
    "Entretoises et tiges dépassant de la façade pendant la pose : elles sont à hauteur de visage et doivent être signalées ou protégées."
  ],
  verifier: "Le temps de prise d'un scellement chimique dépend fortement de la température, et la notice donne un tableau : à cinq degrés, il peut être plusieurs fois plus long qu'à vingt. Deux autres valeurs s'y lisent et ne se devinent pas : la profondeur d'ancrage exigée pour chaque diamètre de tige, et le couple de serrage. Sur une façade dont la composition est inconnue — enduit épais, doublage, isolation extérieure —, un sondage préalable dit ce qui porte réellement, et la réponse surprend souvent.",
  faq: [
    { q: "Lettres collées ou vissées ?", a: "Le collage seul se réserve aux petites lettres légères sur support parfaitement sain et plan. Dès que la lettre a du poids ou de la prise au vent, la fixation mécanique s'impose — quitte à la compléter par un joint." },
    { q: "Pourquoi les lettres relief passent-elles mieux en secteur patrimonial ?", a: "L'Architecte des Bâtiments de France privilégie les dispositifs qui laissent lire la façade. Des lettres détachées conservent la maçonnerie visible entre elles, là qu'un caisson plein masque un pan de mur entier." },
    { q: "Quelle est la durée de vie de lettres découpées en relief ?", a: "Vingt ans et davantage en aluminium laqué ou en inox, à condition que la fixation soit saine et que la façade ne travaille pas. C'est le format d'enseigne le plus durable, et c'est aussi celui qui vieillit le mieux visuellement : une lettre relief se nettoie, se repeint et se redépose, là où un caisson vieilli se remplace. C'est un argument à faire valoir quand le budget initial paraît élevé." }
  ]
},
{
  slug: "poser-lettres-retroeclairees",
  famille: "facade", nav: "Poser des lettres rétro-éclairées",
  h1: "Poser des lettres rétro-éclairées et passer les câbles",
  title: "Lettres Rétro-Éclairées — Pose, Câblage et Halo",
  desc: "Le rétro-éclairage se joue au recul de la lettre et à la couleur du mur. Pose, passage des câbles, alimentation et réglage du halo.",
  statut: "publie", acces: "libre", duree: "5 h", niveau: "Confirmé",
  resume: "La lettre n'éclaire pas vers l'avant mais vers le mur. Le rendu dépend autant du support que du produit.",
  quand: "Enseigne de façade haut de gamme, hall d'accueil, contre-jour de nuit.",
  materiel: ["Gabarit", "Perforateur", "Entretoises réglables", "Alimentations LED", "Gaines et passe-fils", "Détecteur de câbles"],
  etapes: [
    ["Étudier le mur", "Le halo se forme sur le mur : un mur sombre absorbe, un mur clair renvoie. Sur mur foncé, le rétro-éclairage déçoit presque toujours."],
    ["Percer les passages de câbles", "Un percement par lettre, en pente vers l'extérieur, positionné pour rester invisible."],
    ["Poser les entretoises", "Le recul conditionne la largeur du halo : trop peu, une ligne dure ; trop, une tache floue."],
    ["Câbler", "Chaque lettre est raccordée à l'alimentation, gaines protégées, connexions en boîtier étanche adapté à l'extérieur."],
    ["Raccorder et régler", "Raccordement par intervenant habilité, essai de nuit avant de refermer."],
    ["Étanchéifier", "Tous les percements, cordon continu."]
  ],
  erreurs: ["Poser sur mur sombre sans prévenir le client du rendu.", "Connexions non étanches en extérieur.", "Alimentation sous-dimensionnée : scintillement et durée de vie réduite.", "Ne pas prévoir l'accès à l'alimentation pour la maintenance.",
    "Rétroéclairer sur un mur clair très réfléchissant : le halo se dilue et l'effet disparaît de jour comme de nuit.",
    "Mélanger des modules LED de lots ou de marques différentes sur une même enseigne : la teinte de blanc varie d'une lettre à l'autre et cela ne se rattrape pas.",
    "Placer l'alimentation dans un coffre non ventilé : la chaleur accumulée divise sa durée de vie."
  ],
  securite: ["Travail en hauteur.", "Raccordement réservé à un intervenant habilité.", "Coupure et consignation du circuit avant intervention.",
    "Les alimentations restent sous tension résiduelle après coupure : respecter le délai de décharge indiqué avant toute manipulation."
  ],
  verifier: "La puissance de l'alimentation, son indice de protection et la longueur maximale de ruban par alimentation sont données par le fabricant, et les dépasser réduit la durée de vie sans forcément provoquer de panne immédiate — ce qui rend l'erreur difficile à détecter. L'obligation d'extinction nocturne s'applique par ailleurs indépendamment de la technologie employée. Un point à trancher avant la commande : la température de blanc, du blanc chaud au blanc froid, qui change complètement le rendu nocturne et ne se modifie plus après fabrication.",
  faq: [
    { q: "Quelle distance entre la lettre et le mur ?", a: "Elle se règle à l'essai, de nuit, avant serrage définitif : c'est le seul moyen de juger. Les entretoises réglables existent pour cela." },
    { q: "Combien consomme une enseigne LED ?", a: "Bien moins qu'un néon, mais le chiffre exact dépend du linéaire et du produit. L'extinction nocturne étant de toute façon obligatoire, la consommation réelle est calculée sur les heures autorisées." },
    { q: "Le rétroéclairage convient-il à toutes les façades ?", a: "Non, et c'est la question à poser avant de le proposer. Il lui faut un fond mat, de teinte moyenne à sombre, et un recul suffisant pour que le halo se forme. Sur une façade blanche, vitrée ou très claire, l'effet est faible et le client sera déçu par un résultat pourtant conforme à la commande. Une simulation nocturne au moment du devis évite ce malentendu." }
  ]
},
{
  slug: "poser-enseigne-drapeau-potence",
  famille: "facade", nav: "Poser une enseigne drapeau",
  h1: "Poser une enseigne drapeau sur potence",
  title: "Poser une Enseigne Drapeau — Potence, Saillie et Autorisation",
  desc: "L'enseigne perpendiculaire prend le vent en porte-à-faux et déborde sur le domaine public. Fixation, saillie réglementaire, contrôle.",
  statut: "publie", acces: "libre", duree: "3 h", niveau: "Confirmé",
  resume: "Le drapeau est la pose la plus sollicitée mécaniquement : tout le poids et toute la prise au vent sont en porte-à-faux sur quelques chevilles.",
  quand: "Rue piétonne, rue étroite, commerce en enfilade : partout où l'enseigne à plat n'est pas vue.",
  materiel: ["Potence dimensionnée", "Chevilles sous avis technique", "Perforateur", "Niveau", "Matériel de hauteur", "Clé dynamométrique"],
  etapes: [
    ["Vérifier la saillie autorisée", "La saillie maximale et la hauteur libre sous l'enseigne sont fixées par le règlement de voirie et, le cas échéant, par le règlement local de publicité. Se renseigner AVANT de fabriquer."],
    ["Sonder le support", "Une potence en porte-à-faux exige un support sain. Un parpaing creux ou une brique fragile impose une platine répartissant la charge, voire une traversée."],
    ["Percer et sceller", "Scellement chimique le plus souvent, trous soufflés, temps de prise respecté intégralement."],
    ["Monter la potence", "Serrage au couple, contrôle du niveau."],
    ["Suspendre l'enseigne", "À deux, sans forcer sur les fixations fraîches."],
    ["Contrôler", "Vérifier l'absence de jeu, reprendre le serrage après quelques jours si la notice le prévoit."]
  ],
  erreurs: ["Sous-estimer la prise au vent : un panneau plein en porte-à-faux subit des efforts très supérieurs à son poids.", "Charger un scellement avant la fin du temps de prise.", "Ignorer la saillie autorisée : dépose à la charge du commerçant.", "Fixer sur un enduit sans atteindre le support porteur.",
    "Reprendre les fixations d'une ancienne potence sans les contrôler : les trous existants sont fatigués et le support a travaillé autour.",
    "Poser un drapeau ajouré en croyant réduire la prise au vent : le gain est réel mais bien moindre qu'il n'y paraît, et il ne dispense d'aucun calcul.",
    "Oublier que l'enseigne devra être déposée : sans accès nacelle possible sur la voie, la dépose coûtera un arrêté de circulation."
  ],
  securite: ["Travail en hauteur et au-dessus du domaine public : balisage obligatoire.", "Autorisation d'occupation temporaire du domaine public en mairie.", "Vérification périodique : une enseigne drapeau doit être maintenue en bon état de fonctionnement et de sécurité (art. R.581-58).",
    "Le montage se fait à deux : une potence en porte-à-faux devient incontrôlable seule dès qu'il y a du vent.",
    "Contrôle de l'ancrage après quelques semaines de service : c'est là que se révèle un scellement insuffisant, avant qu'il ne cède."
  ],
  verifier: "Le dimensionnement de la potence et des ancrages relève d'un calcul au vent selon l'Eurocode 1, tenant compte de la zone de vent, de la hauteur au-dessus du sol, de la surface du panneau et du bras de levier. Ce calcul se demande au fabricant de la potence, qui le fournit pour ses gammes, ou à un bureau d'études. Aucune règle générale ne le remplace : la même enseigne qui tient depuis vingt ans à Lille descend au sol sur le littoral languedocien. La saillie maximale autorisée sur le domaine public et la hauteur libre à respecter sont, elles, fixées par la commune et se lisent au règlement local de publicité ou au règlement de voirie.",
  faq: [
    { q: "Quelle hauteur libre sous une enseigne drapeau ?", a: "Elle est fixée par le règlement de voirie de la commune, pour laisser passer piétons et véhicules de secours. Le service voirie de la mairie la donne en un appel." },
    { q: "Le drapeau est-il soumis à autorisation ?", a: "Comme toute enseigne : oui en présence d'un RLP, aux abords d'un monument historique ou en site patrimonial remarquable. S'y ajoute l'autorisation d'occupation du domaine public, puisque l'enseigne surplombe la voie." },
    { q: "Qui est responsable si une enseigne drapeau tombe ?", a: "L'exploitant de l'enseigne au premier chef, en sa qualité de gardien de la chose au sens de l'article 1242 du code civil, et le poseur si le défaut vient de l'installation. C'est pourquoi le contrôle périodique n'est pas une précaution de confort : une enseigne suspendue au-dessus d'un trottoir doit être maintenue en bon état, et le prouver en cas d'accident suppose d'en garder trace. Un simple relevé de visite daté suffit." }
  ]
},
{
  slug: "raccorder-enseigne-lumineuse",
  famille: "facade", nav: "Raccorder une enseigne lumineuse",
  h1: "Raccorder une enseigne lumineuse et programmer son extinction",
  title: "Raccorder une Enseigne Lumineuse — Habilitation et Extinction",
  desc: "Protection du circuit, indice de protection, horloge astronomique et obligation d'extinction nocturne. Ce qui relève de l'habilitation.",
  statut: "publie", acces: "reseau", duree: "2 h", niveau: "Confirmé",
  resume: "Le raccordement est la seule étape de la pose d'enseigne qui exige une habilitation. Elle n'est pas une formalité : elle est exigible en cas de contrôle et déterminante en cas de sinistre.",
  quand: "Toute enseigne lumineuse, tout caisson, tout rétro-éclairage.",
  materiel: ["Matériel d'électricien habilité", "Horloge astronomique ou interrupteur crépusculaire", "Boîtiers de dérivation étanches", "Vérificateur d'absence de tension"],
  etapes: [
    ["Couper et consigner", "Coupure, condamnation, signalisation, vérification d'absence de tension. Dans cet ordre, sans exception."],
    ["Vérifier la protection", "Le circuit doit être protégé par un dispositif adapté, et une enseigne extérieure relève des règles applicables aux circuits extérieurs."],
    ["Câbler en étanche", "Boîtiers de dérivation d'indice de protection adapté à l'extérieur, presse-étoupe serrés, aucune connexion à l'air libre."],
    ["Poser la commande d'extinction", "Horloge astronomique de préférence : elle suit le lever et le coucher du soleil sans réglage saisonnier."],
    ["Essayer et documenter", "Essai de nuit, puis remise au client de la notice et du réglage effectué."]
  ],
  erreurs: ["Raccorder sans habilitation.", "Dominos ou connexions non étanches en extérieur.", "Oublier la programmation d'extinction : l'infraction est constatée par le maire.", "Alimenter depuis une prise intérieure par un câble passé sous une fenêtre.",
    "Piquer sur le circuit d'éclairage existant de la boutique : la protection n'est pas dimensionnée pour la charge, et rien ne signale l'anomalie jusqu'au déclenchement.",
    "Laisser l'horloge de programmation sans sauvegarde d'heure : après chaque coupure de courant elle repart à zéro et l'enseigne reste allumée la nuit.",
    "Ne pas repérer ni étiqueter le circuit au tableau : le jour d'une panne, personne ne sait quoi couper."
  ],
  securite: ["Habilitation électrique obligatoire, adaptée à la nature de l'opération, délivrée par l'employeur après formation.", "Consignation avant toute intervention.", "Travail en hauteur cumulé au risque électrique : ne jamais intervenir seul.",
    "Aucune intervention sous tension : la coupure seule ne suffit pas, il faut la consignation, avec condamnation et vérification d'absence de tension.",
    "Vérification du raccordement à la terre des parties métalliques accessibles : un caisson en aluminium mal relié est un défaut classique et dangereux."
  ],
  verifier: "Les règles d'installation relèvent de la norme NF C 15-100, et la section des conducteurs comme le calibre de la protection dépendent de la puissance installée, de la longueur de la ligne et du mode de pose — ce site ne publiera aucune valeur générique, parce qu'une section sous-dimensionnée chauffe sans que rien ne le signale. Ce calcul revient à l'électricien qui réalise le raccordement, sous son habilitation. L'obligation d'extinction des enseignes lumineuses est fixée par l'article R.581-59 du code de l'environnement : entre 1 h et 6 h, sauf lorsque l'activité s'exerce à ces heures.",
  faq: [
    { q: "Un poseur d'enseigne peut-il raccorder lui-même ?", a: "Seulement s'il détient une habilitation électrique adaptée. L'habilitation n'est pas un diplôme mais une autorisation écrite de l'employeur, délivrée après formation et réactualisée périodiquement." },
    { q: "À quelle heure faut-il éteindre ?", a: "Les enseignes lumineuses sont soumises à une obligation d'extinction nocturne encadrée par l'article R.581-59. Les horaires précis et les cas particuliers — activité nocturne notamment — se lisent dans le texte applicable et dans le règlement local de publicité." },
    { q: "Faut-il un circuit dédié pour une enseigne ?", a: "C'est la bonne pratique, et elle règle trois problèmes à la fois. Un circuit propre, protégé et repéré au tableau permet de couper l'enseigne sans couper la boutique, d'y placer l'horloge d'extinction, et de diagnostiquer une panne sans tout éteindre. Le surcoût à l'installation est modeste comparé au premier dépannage réalisé dans le noir." }
  ]
},
{
  slug: "poser-habillage-facade-dibond",
  famille: "facade", nav: "Poser un habillage de façade en Dibond",
  h1: "Poser un bandeau ou un habillage de façade en Dibond",
  title: "Habillage de Façade en Dibond — Entraxes et Dilatation",
  desc: "Le Dibond bouge avec la température. Entraxes, trous oblongs, joints de dilatation : poser un bandeau qui ne gondole pas.",
  statut: "publie", acces: "libre", duree: "4 h", niveau: "Confirmé",
  resume: "L'aluminium composite se dilate de façon sensible. Un bandeau fixé rigidement à ses deux extrémités gondole au premier été.",
  quand: "Bandeau de devanture, habillage de pilier, rénovation de façade commerciale.",
  materiel: ["Panneaux Dibond", "Rivets ou vis à tête large", "Perceuse, forets", "Niveau laser", "Cales de dilatation", "Mastic"],
  etapes: [
    ["Préparer l'ossature", "Tasseaux ou profilés d'aplomb : le Dibond suit fidèlement son support, y compris ses défauts."],
    ["Percer en oblong", "Les trous du panneau sont percés plus larges que la fixation, ou oblongs, pour laisser le panneau coulisser."],
    ["Fixer du centre vers les bords", "On bloque au centre et on laisse jouer aux extrémités."],
    ["Respecter les jeux", "Un jeu entre panneaux et en périphérie, jamais bord à bord."],
    ["Finir", "Profilés de finition ou joint souple ; mastic sur les percements exposés à l'eau."]
  ],
  erreurs: ["Percer au diamètre exact de la vis : le panneau ne peut plus se dilater et gondole.", "Serrer à fond : même effet.", "Poser bord à bord sans jeu.", "Entraxes de fixation trop espacés : le panneau vague entre deux points.",
    "Poser des panneaux de grande longueur d'un seul tenant : la dilatation cumulée devient impossible à rattraper aux extrémités.",
    "Fixer directement sur un support non plan sans ossature : le panneau épouse les défauts du mur et les révèle en lumière rasante.",
    "Négliger la ventilation de la lame d'air derrière l'habillage : l'humidité s'y accumule et l'aluminium se corrode par l'arrière, là où on ne le voit pas."
  ],
  securite: ["Travail en hauteur.", "Chants de Dibond coupants : gants.", "Découpe : lunettes et aspiration des copeaux d'aluminium.",
    "Manutention par vent : un panneau composite de grand format se comporte comme une voile et échappe des mains au-delà d'une brise modérée."
  ],
  verifier: "Le coefficient de dilatation, l'entraxe maximal de fixation et le jeu à prévoir sont donnés par la fiche technique du panneau, et ils varient selon l'épaisseur, la longueur et la teinte — un panneau sombre en plein sud se dilate nettement plus qu'un panneau clair. Ces valeurs se lisent, elles ne se déduisent pas. Deux vérifications s'ajoutent en façade : la nature réelle du support porteur derrière l'enduit, et la présence éventuelle d'une isolation extérieure, qui impose des fixations traversantes d'un tout autre type.",
  faq: [
    { q: "Quelle épaisseur de Dibond pour un bandeau de façade ?", a: "Cela dépend de l'entraxe de l'ossature et de l'exposition au vent. Le fabricant publie des abaques croisant épaisseur, entraxe et charge : c'est là qu'on lit la réponse." },
    { q: "Peut-on coller le Dibond au lieu de le visser ?", a: "Sur support sain et plan, un collage structural existe, avec un mastic-colle qualifié pour cet usage et un temps de prise respecté. En façade exposée et en hauteur, la fixation mécanique reste la référence." },
    { q: "Le Dibond peut-il rester dehors dix ans ?", a: "Oui pour le panneau lui-même, dont le laquage résiste bien, à condition que la pose ait laissé la dilatation s'exercer et que l'arrière soit ventilé. Ce qui vieillit en premier, c'est l'impression ou l'adhésif qui l'habille, pas l'aluminium. Sur une façade exposée plein sud, prévoyez un laminat de protection dès la fabrication : il coûte peu et double la tenue des couleurs." }
  ]
}
,
/* =================== TOTEM ET SIGNALÉTIQUE AU SOL =================== */
{
  slug: "poser-totem-massif-beton",
  famille: "sol", nav: "Poser un totem : le massif béton",
  h1: "Poser un totem : le massif béton et son dimensionnement",
  title: "Poser un Totem — Massif Béton, Fouille et Scellement",
  desc: "Fouille, ferraillage, coulage, tiges d'ancrage et temps de séchage. Ce qui tient un totem debout, et qui se décide avant la livraison.",
  statut: "publie", acces: "libre", duree: "2 jours (séchage compris)", niveau: "Confirmé",
  resume: "Un totem ne tient pas par son poids mais par son massif. C'est du génie civil, et c'est la pose où l'improvisation coûte le plus cher — un totem qui verse est un accident, pas un litige.",
  quand: "Entrée de zone d'activité, parking de commerce, concession, entrée de site industriel.",
  materiel: [
    "Béton dosé selon la prescription de la note de calcul",
    "Armatures et cage de ferraillage selon plan",
    "Tiges d'ancrage ou platine fournies par le fabricant",
    "Mini-pelle ou tarière selon le volume",
    "Niveau, règle de maçon, gabarit de tiges",
    "Matériel de levage adapté au poids du mât"
  ],
  etapes: [
    ["Faire la DT-DICT", "Avant toute fouille, la déclaration de projet de travaux et la déclaration d'intention de commencement de travaux sont obligatoires. Elles identifient les réseaux enterrés. Creuser sans, c'est engager sa responsabilité pénale en cas d'arrachement d'une conduite de gaz."],
    ["Vérifier le sol et l'implantation", "Nature du sol, présence d'eau, limite de propriété, servitudes, distance à la voie. Un totem implanté hors de la propriété est déposable."],
    ["Creuser la fouille", "Aux dimensions de la note de calcul. Fond dressé et compacté, parois nettes."],
    ["Poser le ferraillage", "Cage d'armatures sur cales, enrobage respecté sur toutes les faces : une armature affleurante rouille et fait éclater le béton."],
    ["Positionner les tiges au gabarit", "Le gabarit du fabricant maintient l'entraxe exact des tiges. Une erreur ici et la platine du mât n'entre pas."],
    ["Couler et vibrer", "Coulage en une fois, vibration pour chasser les vides, arase de niveau, contrôle de l'aplomb des tiges."],
    ["Attendre", "Le temps avant mise en charge est prescrit par la note de calcul et dépend du béton et de la température. On ne monte pas le mât parce que le béton est dur en surface."],
    ["Monter le mât", "Levage adapté, calage, mise d'aplomb, serrage au couple, contre-écrous."]
  ],
  erreurs: [
    "Creuser sans DT-DICT.",
    "Dimensionner le massif « à vue » ou par comparaison avec un chantier précédent : la prise au vent varie avec la surface, la hauteur et la zone géographique.",
    "Monter le mât avant la fin du délai de mise en charge.",
    "Oublier le gabarit de tiges : l'entraxe dérive au coulage.",
    "Négliger l'enrobage du ferraillage.",
    "Implanter sans vérifier la limite de propriété."
  ],
  securite: [
    "DT-DICT obligatoire avant toute excavation.",
    "Fouille : risque d'éboulement dès qu'elle est profonde ; blindage selon la profondeur et la nature du sol.",
    "Levage : élingues vérifiées, personne sous la charge, autorisation de conduite pour l'engin.",
    "Port des EPI : casque, chaussures de sécurité, gilet haute visibilité sur voirie."
  ],
  verifier: "Le volume du massif, le ferraillage, le dosage du béton et le délai avant mise en charge résultent d'une note de calcul tenant compte de la surface du totem, de sa hauteur, de la zone de vent selon l'Eurocode 1 et de la nature du sol. Cette note se demande au fabricant du totem ou à un bureau d'études. Aucune valeur générique ne peut la remplacer, et ce site n'en publiera pas.",
  faq: [
    { q: "Peut-on poser un totem partout ?", a: "Non. Les enseignes scellées au sol de plus d'un mètre carré ne sont admises que dans les agglomérations de plus de 10 000 habitants (art. R.581-65 du code de l'environnement), et l'appartenance à une unité urbaine n'y change rien. Chaque page ville du réseau indique le régime applicable à la commune." },
    { q: "Massif coulé ou platine sur dalle existante ?", a: "La platine chevillée sur une dalle existante est possible et démontable, à condition que la dalle ait l'épaisseur, le ferraillage et la portance nécessaires. C'est une vérification, pas une hypothèse." },
    { q: "Combien de temps avant de monter le mât ?", a: "Le délai figure dans la note de calcul. Il dépend du béton employé et de la température ambiante, et il est bien plus long par temps froid. La dureté de surface ne dit rien de la résistance à cœur." }
  ]
},
{
  slug: "scellement-chimique-ou-mecanique",
  famille: "sol", nav: "Scellement chimique ou mécanique",
  h1: "Scellement chimique ou cheville mécanique : lequel choisir",
  title: "Scellement Chimique ou Mécanique — Comment Choisir",
  desc: "Béton fissuré, parpaing creux, brique, pierre : quel ancrage pour quel support, et pourquoi le soufflage du trou change tout.",
  statut: "publie", acces: "libre", duree: "1 h", niveau: "Intermédiaire",
  resume: "La cheville mécanique travaille par expansion, le scellement chimique par adhérence. Le support décide, pas l'habitude.",
  quand: "Toute fixation qui reprend une charge : mât, potence, platine, caisson.",
  materiel: ["Perforateur", "Forets au diamètre exact prescrit", "Écouvillon et soufflette", "Cartouche de résine et pistolet", "Tamis pour matériaux creux", "Clé dynamométrique"],
  etapes: [
    ["Identifier le support", "Béton plein, béton fissuré, parpaing creux, brique pleine ou perforée, pierre tendre. Un sondage au foret renseigne en dix secondes."],
    ["Choisir l'ancrage", "En matériau creux, le scellement chimique avec tamis s'impose : une cheville à expansion éclate la cloison du parpaing."],
    ["Percer au diamètre exact", "Ni plus ni moins que la prescription. Un trou trop large divise la résistance."],
    ["Nettoyer le trou", "Écouvillonner et souffler, plusieurs fois alternativement. La poussière résiduelle est la première cause de ruine d'un scellement chimique."],
    ["Injecter depuis le fond", "Remplir aux deux tiers environ en remontant, sans emprisonner de bulle."],
    ["Insérer et attendre", "Tige mise en place en tournant, excédent essuyé, temps de prise intégralement respecté avant toute charge."]
  ],
  erreurs: ["Ne pas souffler le trou.", "Charger avant la fin du temps de prise.", "Cheville à expansion en parpaing creux.", "Trop près du bord : la distance au bord conditionne la résistance autant que la profondeur.", "Résine périmée ou stockée hors de sa plage de température.",
    "Percer au perforateur en mode percussion dans un matériau creux : la percussion fait éclater les cloisons intérieures et le trou perd toute tenue.",
    "Employer un tamis dans du plein ou l'omettre dans du creux : le tamis est une pièce obligatoire en matériau creux, et un gaspillage inutile ailleurs.",
    "Réutiliser un trou existant sans le nettoyer ni le rechemiser : l'ancienne résine empêche l'adhérence de la nouvelle."
  ],
  securite: ["Poussière de perçage : masque, et aspiration si possible.", "Résines : gants nitrile, lunettes, fiche de données de sécurité lue.", "Repérage amiante obligatoire avant travaux sur bâtiment antérieur à 1997.",
    "Cartouche entamée : la résine durcit dans la canule, et une canule bouchée qu'on force peut éclater sous la pression du pistolet.",
    "Travail au-dessus de la tête : les coulures de résine tombent, lunettes de protection fermées obligatoires."
  ],
  verifier: "Profondeur d'ancrage, diamètre de perçage, distance au bord, entraxe minimal, couple de serrage et charge admissible figurent dans l'avis technique du fabricant de la cheville, sous forme de tableaux par matériau support. Ce sont les seules valeurs qui engagent, et elles varient d'une marque à l'autre pour un même diamètre apparent : un tableau lu sur une documentation concurrente ne vaut rien. La température du support au moment de la pose, et non la température de l'air, conditionne le temps de prise — un mur nord en février est bien plus froid que l'air ambiant.",
  faq: [
    { q: "Le scellement chimique est-il toujours meilleur ?", a: "Non. Il est supérieur en matériau creux, en béton fissuré et près des bords. En béton plein sain et pour une charge modérée, une cheville mécanique de qualité est plus rapide et immédiatement chargeable." },
    { q: "Peut-on sceller par temps froid ?", a: "Oui, avec une résine adaptée aux basses températures et en acceptant un temps de prise bien plus long. En dessous de la température minimale indiquée, la résine ne polymérise pas." },
    { q: "Combien de temps tient un scellement chimique ?", a: "Toute la vie de l'ouvrage si la pose a été faite dans les règles : trou nettoyé, résine dans sa plage de température, temps de prise respecté, charge conforme au tableau. Ce qui lâche, ce n'est presque jamais la résine — c'est le support qui se dégrade autour, ou un trou qu'on n'avait pas soufflé. C'est pourquoi le nettoyage du trou, qui paraît le geste le plus négligeable, est celui dont dépend le reste." }
  ]
},
{
  slug: "poser-totem-sur-platine",
  famille: "sol", nav: "Poser un totem sur platine",
  h1: "Poser un totem sur platine, démontable",
  title: "Totem sur Platine — Pose Démontable sur Dalle Existante",
  desc: "Quand la dalle existe, la platine évite la fouille. Vérification de la dalle, chevillage, calage et reprise d'aplomb.",
  statut: "publie", acces: "libre", duree: "4 h", niveau: "Confirmé",
  resume: "Plus rapide qu'un massif coulé, et réversible — mais la dalle doit être capable de reprendre le moment de renversement.",
  quand: "Parking béton existant, local loué où le bail impose la remise en état, dispositif temporaire.",
  materiel: ["Platine et visserie du fabricant", "Chevilles ou scellement selon la dalle", "Perforateur", "Cales de réglage", "Clé dynamométrique", "Niveau"],
  etapes: [
    ["Vérifier la dalle", "Épaisseur, ferraillage, état, portance. Un carottage ou un sondage renseigne. Une dalle de parking classique n'est pas toujours suffisante."],
    ["Tracer et percer", "Gabarit de la platine, perçage au diamètre prescrit, soufflage."],
    ["Poser les ancrages", "Chimiques ou mécaniques selon la dalle, temps de prise respecté."],
    ["Caler d'aplomb", "Cales métalliques sous la platine, jamais de bois ni de plastique qui flueraient."],
    ["Serrer au couple", "Serrage croisé progressif, contre-écrous."],
    ["Ragréer", "Mortier sans retrait sous la platine si la notice le prévoit, pour répartir l'appui."]
  ],
  erreurs: ["Cheviller sur une dalle trop mince.", "Caler avec du bois.", "Serrer d'un côté puis de l'autre au lieu de croiser.", "Percer sans repérer les gaines et réseaux noyés dans la dalle.",
    "Poser une platine sur un enrobé ou un dallage sur sable : ces revêtements ne reprennent aucun moment de renversement, quel que soit l'ancrage employé.",
    "Omettre l'étanchéité au pied de la platine : l'eau stagne sous la plaque et corrode les tiges par la base, là où rien ne se voit.",
    "Négliger le contrôle du serrage après quelques semaines : les tiges se détendent lors des premiers cycles de charge."
  ],
  securite: ["Levage du mât : élingues vérifiées, personne sous la charge.", "Repérage des réseaux avant perçage de dalle.", "Balisage si la zone reste accessible au public.",
    "Platine boulonnée en attente sans mât : les tiges filetées dépassant au sol sont un risque de chute et de blessure, à protéger dès la pose."
  ],
  verifier: "La capacité d'une dalle à reprendre le moment de renversement d'un totem se calcule : épaisseur, ferraillage, portance du sol support et type d'ancrage doivent être vérifiés ensemble, et la vérification suppose de connaître la dalle — ce qu'un carottage ou un sondage établit, pas une estimation visuelle. Une dalle de parking courante n'est pas toujours suffisante, et c'est le cas le plus fréquemment rencontré. Le calcul relève du fabricant du totem ou d'un bureau d'études ; aucune valeur générique ne s'y substitue.",
  faq: [
    { q: "Platine ou massif ?", a: "Massif dès que le sol est nu ou que le totem est haut et exposé. Platine quand une dalle apte existe et que la réversibilité est demandée — typiquement un local en location." },
    { q: "La platine est-elle visible ?", a: "Elle se masque par une jupe ou un capot fourni avec le totem. Prévoir cet accessoire à la commande, pas après." },
    { q: "Peut-on déplacer un totem sur platine ?", a: "C'est justement son intérêt, et la raison de le préférer au massif coulé quand le bail est incertain ou le site provisoire. Le démontage laisse les tiges d'ancrage en place — on les recoupe et on rebouche —, la dalle reste utilisable et le totem se repose ailleurs. À condition d'avoir conservé la platine, son gabarit et la note de calcul : sans eux, la repose redevient une étude complète." }
  ]
},
{
  slug: "poser-panneau-sur-poteaux",
  famille: "sol", nav: "Poser un panneau sur poteaux",
  h1: "Poser un panneau sur poteaux (pré-enseigne)",
  title: "Poser un Panneau sur Poteaux — Implantation et Scellement",
  desc: "Deux poteaux, un panneau, et une réglementation stricte sur les pré-enseignes. Implantation, scellement, alignement.",
  statut: "publie", acces: "libre", duree: "1 jour", niveau: "Intermédiaire",
  resume: "Techniquement simple, réglementairement délicat : la pré-enseigne hors agglomération est très encadrée.",
  quand: "Signalisation d'activité en périphérie, jalonnement de site, panneau de chantier.",
  materiel: ["Poteaux bois, acier ou alu", "Béton de scellement", "Tarière ou bêche", "Niveau, cordeau", "Visserie inox"],
  etapes: [
    ["Vérifier le droit d'implanter", "Statut du terrain, autorisation du propriétaire, et surtout régime de la pré-enseigne : hors agglomération, elles sont très restreintes."],
    ["DT-DICT", "Obligatoire dès qu'on creuse, même pour deux trous de poteau."],
    ["Implanter au cordeau", "Entraxe exact des poteaux, contrôlé avant de creuser."],
    ["Sceller les poteaux", "Trous à la profondeur prescrite, poteaux calés d'aplomb, béton coulé, contrôle du niveau pendant la prise."],
    ["Attendre puis monter le panneau", "Temps de prise respecté avant de charger."],
    ["Fixer le panneau", "Visserie inox, trous légèrement surdimensionnés pour la dilatation."]
  ],
  erreurs: ["Négliger le régime des pré-enseignes hors agglomération.", "Monter le panneau avant prise du béton.", "Poteaux non alignés : visible de loin.", "Visserie acier zingué : coulures de rouille sur le panneau dès la première année.",
    "Sceller des poteaux bois sans les protéger au niveau du sol : c'est précisément à la ligne de terre que le bois pourrit, pas au-dessus ni en dessous.",
    "Implanter sur l'accotement sans vérifier la limite du domaine public : le panneau est déposable et le commerçant paye la dépose.",
    "Fixer le panneau rigidement sur les deux poteaux sans jeu : les poteaux travaillent différemment et le panneau se vrille."
  ],
  securite: ["DT-DICT.", "Travail en bord de voie : balisage, gilet, et arrêté de circulation si nécessaire.", "Levage à deux pour les grands panneaux.",
    "Sur route à grande circulation, l'intervention suppose une signalisation temporaire conforme, pas un simple gilet."
  ],
  verifier: "Le régime des pré-enseignes est fixé par les articles L.581-7 et R.581-66 et suivants du code de l'environnement, avec des dérogations limitativement énumérées hors agglomération — et c'est un terrain où l'intuition trompe presque toujours : beaucoup de panneaux visibles le long des routes sont en réalité irréguliers et tolérés jusqu'au jour où ils ne le sont plus. Avant toute implantation hors agglomération, la question se pose au service urbanisme de la commune, et la réponse se garde par écrit.",
  faq: [
    { q: "Peut-on poser une pré-enseigne le long d'une route ?", a: "Hors agglomération, la publicité est en principe interdite et les pré-enseignes ne sont admises que dans des cas limitativement prévus par le code de l'environnement. C'est à vérifier avant de fabriquer, pas après." },
    { q: "Bois ou acier pour les poteaux ?", a: "Le bois traité classe 4 convient en milieu rural et vieillit bien ; l'acier galvanisé dure plus longtemps mais se voit davantage. Le choix est souvent dicté par l'environnement paysager et par l'avis de l'ABF en site protégé." },
    { q: "Combien de temps tient un panneau sur poteaux bois ?", a: "Sept à quinze ans selon l'essence, le traitement et l'exposition, et la rupture se produit presque toujours au même endroit : au ras du sol, là où le bois alterne humidité et séchage. Des poteaux en acier galvanisé ou des pieds métalliques scellés qui maintiennent le bois au-dessus du sol allongent considérablement la durée de vie, pour un surcoût faible à l'installation." }
  ]
},
{
  slug: "poser-signaletique-directionnelle-multilames",
  famille: "sol", nav: "Poser une signalétique directionnelle",
  h1: "Poser une signalétique directionnelle multi-lames",
  title: "Signalétique Directionnelle Multi-Lames — Pose et Ordre",
  desc: "Mât, lames orientables, ordre de lecture et hauteur de pose : monter un jalonnement directionnel qui reste lisible à la distance réelle et qui évolue.",
  statut: "publie", acces: "libre", duree: "4 h", niveau: "Intermédiaire",
  resume: "La difficulté n'est pas mécanique mais logique : l'ordre des lames et leur orientation décident si le visiteur trouve ou tourne en rond.",
  quand: "Zone d'activité, hôpital, campus, site touristique, parc d'entreprises.",
  materiel: ["Mât et colliers de lames", "Lames", "Béton ou platine", "Boussole ou plan orienté", "Niveau", "Clé dynamométrique"],
  etapes: [
    ["Travailler sur plan orienté", "L'orientation des lames se décide au bureau, sur un plan, pas sur place à l'intuition."],
    ["Implanter le mât", "Massif ou platine selon le sol, comme pour un totem mais avec des efforts moindres."],
    ["Monter les lames dans l'ordre", "Convention courante : les destinations les plus proches en haut, ou le regroupement par pôle. L'essentiel est de tenir la même règle sur tout le site."],
    ["Orienter", "Chaque lame pointe la direction réelle, pas approximative."],
    ["Contrôler à hauteur d'œil", "Se placer en position de conducteur ou de piéton et vérifier la lisibilité réelle, à la distance réelle."]
  ],
  erreurs: ["Orienter au jugé.", "Mélanger les conventions d'ordre d'un mât à l'autre.", "Lames trop nombreuses : au-delà de cinq ou six, plus personne ne lit.", "Hauteur inadaptée au mode de déplacement visé.",
    "Écrire des destinations trop longues : au-delà de deux ou trois mots, la lame devient illisible à la vitesse où on la lit.",
    "Poser le mât trop près du carrefour : l'automobiliste lit après avoir dû choisir.",
    "Employer des lames de teintes différentes sans logique : la couleur doit porter une information, ou ne rien porter du tout."
  ],
  securite: ["Travail en bord de voie de circulation : balisage.", "Levage du mât.", "DT-DICT si scellement.",
    "Mât en bord de voie : sa position doit tenir compte du risque de heurt, et un mât rigide implanté en zone de récupération est un danger en soi."
  ],
  verifier: "La hauteur de pose, la taille de caractère et les distances de lecture relèvent des règles d'accessibilité lorsque le site reçoit du public, et ces règles sont précises : hauteur de caractère rapportée à la distance de lecture, contraste minimal entre le texte et son fond, absence de reflet. Elles se lisent dans l'arrêté du 20 avril 2017 relatif à l'accessibilité des établissements recevant du public. Sur le domaine public routier, le jalonnement obéit en outre à l'instruction interministérielle sur la signalisation routière, qui n'admet pas n'importe quelle forme ni n'importe quelle couleur.",
  faq: [
    { q: "Combien de lames au maximum ?", a: "En pratique, au-delà de cinq ou six lames un mât devient illisible à la vitesse de passage. Mieux vaut deux mâts successifs qu'un mât surchargé." },
    { q: "Le jalonnement est-il soumis à autorisation ?", a: "Sur domaine privé, il relève de la signalétique et non de la publicité. Sur domaine public, il relève du gestionnaire de voirie et suit sa charte : c'est lui qu'il faut consulter." },
    { q: "Quelle hauteur de caractère faut-il ?", a: "Elle se déduit de la distance à laquelle on doit lire, et c'est le seul raisonnement qui vaille. Un piéton qui lit à deux mètres n'a pas les mêmes besoins qu'un automobiliste qui lit à trente. La règle d'accessibilité applicable aux établissements recevant du public fixe des minima selon cette distance : ils figurent dans l'arrêté du 20 avril 2017 et ce sont eux qui font foi, pas l'aspect de la maquette à l'écran." }
  ]
}
,
/* ================== PANNEAUX ET SUPPORTS RIGIDES ================== */
{
  slug: "fixer-panneau-dibond-facade",
  famille: "panneau", nav: "Fixer un panneau Dibond en façade",
  h1: "Fixer un panneau Dibond en façade",
  title: "Fixer un Panneau Dibond en Façade — Entraxes et Jeux",
  desc: "Entraxes de fixation, trous oblongs, jeu de dilatation et étanchéité des percements. Poser un Dibond qui ne gondole pas.",
  statut: "publie", acces: "libre", duree: "2 h", niveau: "Intermédiaire",
  resume: "L'aluminium composite se dilate sensiblement entre un matin d'hiver et un après-midi d'été. Toute la pose consiste à lui laisser la place de bouger.",
  quand: "Panneau d'information, plaque professionnelle grand format, habillage de pilier, panneau de chantier.",
  materiel: ["Panneau Dibond", "Vis à tête large ou rivets, en inox", "Rondelles", "Perceuse et forets", "Niveau laser", "Mastic neutre", "Gants (chants coupants)"],
  etapes: [
    ["Vérifier la planéité du support", "Le Dibond épouse son support : un mur creux se lit sur le panneau en lumière rasante. Compenser par des cales ou une ossature."],
    ["Repérer les points de fixation", "Entraxes selon l'abaque du fabricant, jamais « au jugé ». Points répartis, jamais uniquement aux quatre coins sur un grand format."],
    ["Percer le panneau en surdimensionné", "Le trou du panneau est plus large que la vis — c'est ce jeu qui absorbe la dilatation."],
    ["Percer le mur et cheviller", "Cheville adaptée au support, soufflage des trous."],
    ["Fixer du centre vers les bords", "Rondelle large sous la tête, serrage ferme mais non bloquant : le panneau doit pouvoir coulisser."],
    ["Laisser les jeux périphériques", "Jamais bord à bord contre un tableau ou un panneau voisin."],
    ["Étanchéifier", "Cordon de mastic sur les percements exposés à la pluie."]
  ],
  erreurs: [
    "Percer le panneau au diamètre exact de la vis : le panneau gondole au premier été.",
    "Serrer à bloc : même résultat.",
    "Fixer uniquement aux quatre angles sur un grand panneau : il vague au centre.",
    "Visserie acier zingué en extérieur : coulures de rouille dès la première saison.",
    "Poser bord à bord sans jeu."
  ],
  securite: ["Travail en hauteur selon la position.", "Chants de Dibond très coupants : gants systématiques.", "Découpe : lunettes, et aspiration des copeaux d'aluminium."],
  verifier: "L'entraxe maximal de fixation, le diamètre de perçage à prévoir et le jeu de dilatation dépendent de l'épaisseur du panneau et de la marque. Ils figurent dans la fiche technique du fabricant, avec des abaques croisant épaisseur, entraxe et exposition au vent.",
  faq: [
    { q: "Pourquoi mon panneau gondole-t-il ?", a: "Presque toujours parce qu'il ne peut pas se dilater : trous au diamètre exact de la vis, serrage à bloc, ou pose bord à bord sans jeu. La dilatation de l'aluminium composite est bien réelle et doit être anticipée." },
    { q: "Rivets ou vis ?", a: "Les rivets sont plus discrets et plus rapides, mais le panneau n'est plus démontable et le jeu de dilatation doit être ménagé au perçage. Les vis permettent la dépose et le réglage." }
  ]
},
{
  slug: "poser-panneau-pvc-interieur",
  famille: "panneau", nav: "Poser un panneau PVC en intérieur",
  h1: "Poser un panneau PVC ou Forex en intérieur",
  title: "Poser un Panneau PVC Expansé — Collage ou Fixation",
  desc: "Léger, peu coûteux, mais sensible à la chaleur et au fluage. Collage, fixation, et les limites du PVC expansé.",
  statut: "publie", acces: "libre", duree: "1 h", niveau: "Débutant",
  resume: "Le PVC expansé est le support d'intérieur le plus courant. Léger et bon marché, il flue sous son propre poids en grand format et se déforme à la chaleur.",
  quand: "Signalétique intérieure, panneau d'information, PLV, habillage temporaire.",
  materiel: ["Panneau PVC expansé", "Adhésif double face haute performance ou vis à tête large", "Niveau", "Chiffon et alcool", "Cutter à lame longue"],
  etapes: [
    ["Préparer le mur", "Dégraisser et dépoussiérer. Sur peinture fraîche de moins de trois semaines, aucun adhésif ne tient durablement."],
    ["Choisir le mode de fixation", "Collage double face en dessous d'un certain format et sur mur lisse ; fixation mécanique dès que le panneau a du poids ou que le mur est irrégulier."],
    ["Poser des plots de double face", "Répartis, jamais un cordon continu qui emprisonnerait l'air."],
    ["Positionner et presser", "Le double face haute performance ne se repositionne pas : on vise juste du premier coup."],
    ["En fixation mécanique", "Trous surdimensionnés dans le panneau, rondelles larges, serrage doux."]
  ],
  erreurs: ["Coller sur peinture récente.", "Grand format collé uniquement : il se décolle par fluage.", "Poser du PVC devant une source de chaleur ou en vitrine plein sud : il se déforme.", "Serrer fort une vis dans du PVC expansé : elle traverse.",
    "Stocker les panneaux à plat contre un mur chaud avant la pose : ils prennent une déformation que la fixation ne rattrape pas.",
    "Coller un panneau sur un revêtement mural texturé : la surface de contact réelle est une fraction de la surface apparente."
  ],
  securite: ["Cutter à lame longue : coupe en plusieurs passes, jamais en forçant.", "Découpe : le PVC expansé produit une poussière fine.",
    "Chutes de PVC expansé : légères et coupantes sur les chants, à ramasser avant qu'elles ne se dispersent."
  ],
  verifier: "La tenue d'un adhésif double face dépend du support, de la surface de contact et de la température ; les valeurs figurent sur la fiche technique du ruban, et elles supposent un support propre, sec et non poreux. Deux points qui décident du résultat : la classification au feu exigée dans un établissement recevant du public, que le PVC expansé courant ne satisfait pas toujours, et le comportement du panneau en température — un PVC posé devant une baie plein sud ou au-dessus d'un radiateur se déforme quelle que soit la qualité de la fixation.",
  faq: [
    { q: "PVC ou Dibond ?", a: "PVC en intérieur, à plat, sur des formats modestes et pour un budget serré. Dibond dès qu'il y a de l'extérieur, du grand format ou une exigence de tenue dans le temps." },
    { q: "Le PVC expansé convient-il en extérieur ?", a: "Il existe des qualités extérieures, mais il reste sensible aux écarts thermiques et jaunit. Pour une pose durable en façade, l'aluminium composite est le bon choix." },
    { q: "Le PVC expansé convient-il dans un établissement recevant du public ?", a: "Pas automatiquement, et c'est un point qu'on découvre rarement au bon moment. Les aménagements intérieurs d'un ERP répondent à des exigences de réaction au feu, et tous les PVC expansés ne portent pas le classement nécessaire. La fiche technique du panneau mentionne son classement : s'il n'y figure pas, c'est qu'il n'en a pas. Demandez-le au fournisseur avant de commander, pas après la pose." }
  ]
},
{
  slug: "poser-plexiglas-sur-entretoises",
  famille: "panneau", nav: "Poser du plexiglas sur entretoises",
  h1: "Poser une plaque de plexiglas sur entretoises",
  title: "Poser du Plexiglas sur Entretoises — Perçage et Jeu",
  desc: "Le PMMA se fissure si on le contraint. Perçage, jeu de dilatation, entretoises et produits à ne jamais approcher.",
  statut: "publie", acces: "libre", duree: "1 h 30", niveau: "Intermédiaire",
  resume: "Le plexiglas se dilate beaucoup et casse net si on le serre. Toute la pose consiste à ne jamais le contraindre.",
  quand: "Plaque professionnelle, signalétique de bureau, plaque de porte haut de gamme.",
  materiel: ["Plaque PMMA", "Entretoises inox", "Forets adaptés au plastique", "Niveau", "Gabarit de perçage"],
  etapes: [
    ["Percer largement", "Trou nettement plus large que la vis, pour laisser la dilatation. Foret adapté au plastique, vitesse lente, perçage sans forcer, plaque soutenue sur toute sa surface."],
    ["Retirer le film de protection au dernier moment", "Il protège des rayures pendant toute la manipulation."],
    ["Poser les entretoises au mur", "Chevilles adaptées, entretoises d'aplomb au niveau."],
    ["Présenter la plaque", "Sans forcer. Si elle ne vient pas seule, c'est que le perçage est décalé : on reprend, on ne force pas."],
    ["Serrer doucement", "Juste le contact. Un serrage appuyé fissure le PMMA à terme, en étoile autour du trou."]
  ],
  erreurs: ["Percer au diamètre de la vis.", "Serrer fort.", "Forcer pour faire entrer la plaque.", "Nettoyer à l'alcool ménager, à l'acétone ou au white-spirit : le PMMA se fissure (fissuration sous contrainte).",
    "Retirer les films de protection avant la pose : le PMMA se raye au moindre contact, et les films sont là pour ça jusqu'au dernier geste.",
    "Poser une grande plaque avec des entretoises aux seuls quatre angles : elle prend du ventre au centre, et le défaut s'accentue avec la chaleur."
  ],
  securite: ["Perçage : lunettes, la plaque peut éclater.", "Chants coupants après découpe.",
    "Plaque de grand format manipulée seule : le PMMA casse net sous son propre poids s'il fléchit trop, et les éclats sont coupants."
  ],
  verifier: "Le jeu de perçage à prévoir et les produits de nettoyage compatibles sont indiqués par le fabricant de la plaque. Le PMMA est sensible à la fissuration sous contrainte : un perçage trop juste, un serrage excessif ou un solvant inadapté provoquent des microfissures qui apparaissent des semaines plus tard, en étoile autour des vis. C'est la panne caractéristique de ce matériau, et elle est toujours imputée à la pose. Le coefficient de dilatation du PMMA est par ailleurs élevé : une plaque d'un mètre bouge de façon mesurable entre l'hiver et l'été, et le perçage doit le permettre.",
  faq: [
    { q: "Comment nettoyer du plexiglas ?", a: "Eau tiède savonneuse et chiffon microfibre doux. Jamais d'alcool, d'acétone, de white-spirit ni de nettoyant vitres ammoniaqué : ils provoquent une fissuration en réseau, irréversible." },
    { q: "Plexiglas ou verre pour une plaque professionnelle ?", a: "Le PMMA est plus léger, incassable à l'usage courant et moins cher. Le verre ne raye pas et vieillit mieux, mais il pèse et casse. Pour une plaque de porte, le PMMA domine largement." },
    { q: "Plexiglas ou polycarbonate ?", a: "Le PMMA, dit plexiglas, est plus dur, plus transparent et ne jaunit pas : c'est le bon choix en intérieur et pour tout ce qui doit rester net. Le polycarbonate est beaucoup plus résistant aux chocs mais se raye plus facilement et jaunit aux ultraviolets s'il n'est pas traité. En extérieur exposé ou dans un lieu où l'on redoute le vandalisme, le polycarbonate traité l'emporte ; partout ailleurs, le PMMA." }
  ]
},
{
  slug: "poser-bache-banderole-tension",
  famille: "panneau", nav: "Poser une bâche ou banderole",
  h1: "Poser une bâche ou une banderole sous tension",
  title: "Poser une Bâche Publicitaire — Tension et Prise au Vent",
  desc: "Œillets, tendeurs, filets de vent et fixation. Poser une bâche qui ne claque pas et ne s'arrache pas au premier coup de vent.",
  statut: "publie", acces: "libre", duree: "2 h", niveau: "Intermédiaire",
  resume: "Une bâche est une voile. Mal tendue elle claque, se déchire et arrache ses fixations — et sur échafaudage, la réglementation s'en mêle.",
  quand: "Bâche de chantier, banderole événementielle, habillage de grille, façade en rénovation.",
  materiel: ["Bâche ourlée et œilletée", "Tendeurs élastiques ou colliers", "Cordage", "Échelle ou nacelle", "Gants"],
  etapes: [
    ["Vérifier les œillets", "Espacement régulier, ourlet renforcé. Une bâche mal confectionnée s'arrache aux œillets : cela se voit avant la pose."],
    ["Fixer les angles d'abord", "Les quatre angles, sans tension excessive, pour positionner."],
    ["Tendre progressivement", "En croix, en répartissant la tension sur tous les œillets. Une tension concentrée sur quelques points déchire."],
    ["Utiliser des tendeurs élastiques", "Ils absorbent les rafales, là où un cordage rigide transmet tout l'effort aux œillets."],
    ["Contrôler après quelques jours", "La bâche se détend : une reprise de tension est presque toujours nécessaire."]
  ],
  erreurs: ["Tendre par les angles uniquement.", "Cordage rigide sans élasticité.", "Bâche pleine sur grande surface sans filets de vent : la prise au vent devient considérable.", "Négliger la reprise de tension.",
    "Poser une bâche neuve sans reprendre la tension quelques jours après : toutes les bâches se détendent lors des premiers cycles.",
    "Fixer dans les œillets sans anneau intermédiaire : l'œillet s'ovalise puis arrache le renfort."
  ],
  securite: ["Travail en hauteur.", "Vent : ne jamais poser une grande bâche par vent soutenu, elle devient incontrôlable.", "Sur échafaudage : la charge de vent supplémentaire doit être prise en compte par le monteur de l'échafaudage.",
    "Dépose par vent : une bâche que l'on détache d'un côté devient immédiatement incontrôlable. La dépose se fait dans le même ordre de précaution que la pose."
  ],
  verifier: "La publicité sur bâche de chantier est encadrée par les articles R.581-53 et suivants du code de l'environnement : la surface consacrée à la publicité ne peut excéder une proportion de la surface totale de la bâche, et le dispositif est soumis à autorisation. Ces règles sont strictes et contrôlées, la bâche de chantier étant un support très surveillé. Le dimensionnement des points d'accroche relève, lui, du calcul au vent : une bâche pleine de grande surface développe des efforts considérables, et le support — échafaudage, façade, structure — doit être vérifié pour les reprendre.",
  faq: [
    { q: "Faut-il des filets de vent ?", a: "Sur grande surface exposée, oui : une bâche pleine reçoit tout l'effort du vent. Les découpes en croissant réduisent cet effort. Le fabricant indique à partir de quelle surface les prévoir." },
    { q: "Une bâche de chantier peut-elle porter de la publicité ?", a: "Oui, sous conditions strictes fixées par le code de l'environnement, et elles ne sont pas admises dans les agglomérations de moins de 10 000 habitants. La page ville du réseau indique la population de chaque commune couverte." },
    { q: "Combien de temps une bâche tendue reste-t-elle belle ?", a: "Un à trois ans selon le grammage, l'exposition et surtout la qualité de la tension. Une bâche correctement tendue et reprise vieillit lentement ; une bâche qui claque au vent s'use aux œillets en quelques mois et finit par se déchirer d'un bord à l'autre. Sur une pose destinée à durer, le choix du grammage et des renforts périphériques pèse davantage que celui de l'impression." }
  ]
}
,
/* ============================== VÉHICULE ============================== */
{
  slug: "covering-partiel-utilitaire",
  famille: "vehicule", nav: "Covering partiel d'un utilitaire",
  h1: "Réaliser le covering partiel d'un utilitaire",
  title: "Covering Partiel d'Utilitaire — Méthode et Préparation",
  desc: "Préparation de la carrosserie, pose par panneaux, gestion des nervures et des joints. Le covering partiel expliqué geste par geste.",
  statut: "publie", acces: "libre", duree: "1 jour", niveau: "Confirmé",
  resume: "Le covering partiel habille les flancs et les portes sans démonter. Tout se joue à la préparation : un covering échoue presque toujours à cause d'un dégraissage insuffisant.",
  quand: "Flotte d'artisan, utilitaire de société, véhicule en leasing à restituer intact.",
  materiel: ["Film covering coulé", "Raclette à feutre", "Décapeur thermique", "Alcool isopropylique et dégraissant carrosserie", "Cutter à lame fine et ruban de découpe", "Aimants de maintien", "Local hors poussière, tempéré"],
  etapes: [
    ["Laver puis dégraisser", "Lavage complet, séchage, puis dégraissage à l'alcool zone par zone juste avant pose. Insister sur les joints, les seuils et le pourtour des poignées où la cire s'accumule."],
    ["Tempérer le véhicule", "Le film et la carrosserie doivent être dans la plage de température d'application du fabricant. Une pose dans un atelier froid ne tient pas."],
    ["Découper les lés", "Prévoir un débord généreux sur chaque panneau."],
    ["Positionner aux aimants", "Le film est maintenu sans adhérer, on juge l'alignement avant de coller."],
    ["Poser du centre vers les bords", "Raclette en éventail, sans étirer le film sur les parties planes — un film étiré cherche à revenir et se rétracte."],
    ["Traiter les nervures et creux", "Chaleur douce pour assouplir, puis marouflage progressif au fond du creux. Ne jamais tendre par-dessus un creux sans le maroufler."],
    ["Araser et rabattre", "Coupe au ruban de découpe ou au cutter à lame fine sur support protégé, rabattement dans les seuils."],
    ["Post-chauffer", "Chauffe finale des zones étirées et des bords, selon la température indiquée par le fabricant : c'est ce qui fixe la mémoire du film."]
  ],
  erreurs: [
    "Dégraissage insuffisant : cause numéro un des décollements.",
    "Étirer le film sur les surfaces planes : il se rétracte en quelques semaines et laisse un bord blanc.",
    "Pont sur un creux : le film se décolle du fond dans les jours qui suivent.",
    "Couper au cutter directement sur la carrosserie : rayure irréparable et litige garanti.",
    "Poser sur une peinture refaite depuis moins de quelques semaines : les solvants continuent de s'évaporer.",
    "Poser sur un véhicule sorti du lavage sans laisser sécher les joints : l'eau retenue dans les jointures ressort sous le film pendant plusieurs jours.",
    "Franchir une ouverture — capot, porte, hayon — d'un seul tenant : le film casse à la première ouverture. Chaque élément mobile se traite séparément.",
    "Négliger le post-chauffage dans les creux et sur les bords : sans lui, le film garde sa mémoire de forme et revient à plat en quelques semaines."
  ],
  securite: ["Décapeur thermique : gants, jamais dirigé vers un réservoir ou une durite.", "Solvants : ventilation et gants nitrile.", "Lames : gants anti-coupure.",
    "Véhicule immobilisé et calé pendant l'intervention : un utilitaire sur un sol en pente qui bouge au moment où l'on travaille contre la carrosserie est un accident classique."
  ],
  verifier: "Plage de température d'application, température de post-chauffage et délai après réfection de peinture sont propres à chaque référence de film et figurent sur sa fiche technique. Un point mérite d'être tranché avec le client avant de commencer : l'état de la carrosserie. Sur une peinture déjà écaillée, oxydée ou reprise localement, le film n'adhère pas durablement et sa dépose emportera ce qui tenait encore. Un constat contradictoire avec photos, fait avant la pose, évite le litige qui suivra.",
  faq: [
    { q: "Combien de temps tient un covering ?", a: "Le fabricant annonce une durabilité pour le film, mais elle suppose une pose correcte et un entretien adapté. Un véhicule lavé au rouleau haute pression tous les quinze jours vieillit bien plus vite." },
    { q: "Le covering abîme-t-il la peinture ?", a: "Sur une peinture d'origine en bon état, non : il la protège même des micro-rayures. Sur une peinture refaite ou déjà écaillée, la dépose peut arracher. Cela se dit au client avant, et se note sur le devis." },
    { q: "Faut-il déclarer un covering publicitaire à l'assurance ?", a: "Le changement d'aspect d'un véhicule se signale à l'assureur, et l'omission peut être opposée en cas de sinistre. La déclaration est par ailleurs obligatoire auprès du service des immatriculations lorsque la couleur dominante change, ce qui est le cas d'un covering total. Pour un marquage partiel qui laisse la teinte d'origine dominante, la question ne se pose pas dans les mêmes termes — mais un mot à l'assureur reste la prudence élémentaire." }
  ]
},
{
  slug: "poser-lettrage-vehicule",
  famille: "vehicule", nav: "Poser un lettrage sur véhicule",
  h1: "Poser un lettrage adhésif sur un véhicule",
  title: "Lettrage de Véhicule — Alignement sur Carrosserie Courbe",
  desc: "Aligner un lettrage sur une carrosserie qui n'a aucune ligne droite : repères visuels, papier de transfert, courbes et nervures, et le post-chauffage des bords.",
  statut: "publie", acces: "libre", duree: "3 h", niveau: "Intermédiaire",
  resume: "La difficulté n'est pas de coller mais d'aligner : une carrosserie n'a ni horizontale ni verticale fiables. C'est l'œil, à distance, qui tranche.",
  quand: "Artisan, taxi, véhicule de société, flotte légère.",
  materiel: ["Lettrage découpé et papier de transfert", "Ruban de masquage", "Raclette à feutre", "Dégraissant", "Décapeur thermique"],
  etapes: [
    ["Dégraisser la zone", "Alcool isopropylique, en insistant autour des poignées et des joints."],
    ["Positionner à sec et reculer", "Scotcher le lettrage sans retirer le liner, s'éloigner de plusieurs mètres, juger. Un lettrage aligné sur une nervure paraît droit même s'il ne l'est pas géométriquement."],
    ["Poser la charnière", "Ruban sur toute la largeur, au milieu."],
    ["Poser par moitiés", "Comme pour un lettrage sur vitre, en marouflant depuis la charnière."],
    ["Traiter les nervures", "Chaleur douce et marouflage au fond, jamais de pont."],
    ["Retirer le transfert à angle fermé", "Presque parallèlement à la carrosserie."],
    ["Post-chauffer les bords", "Selon la fiche technique du film."]
  ],
  erreurs: ["Aligner à la règle au lieu de l'œil : le résultat paraît de travers.", "Poser à cheval sur une nervure sans maroufler au fond.", "Retirer le transfert trop vite ou à 90°.", "Poser sur véhicule mouillé ou froid.",
    "Poser sur une surface exposée au soleil : la tôle est bien plus chaude que l'air, et la colle prend avant d'avoir pu marouffler.",
    "Ignorer le sens de lecture sur un véhicule à deux côtés : le lettrage se conçoit symétrique, pas dupliqué.",
    "Poser à cheval sur un joint de porte : la lettre se déchire dès la première ouverture."
  ],
  securite: ["Décapeur thermique.", "Travail accroupi prolongé : prévoir un tapis.",
    "Cutter à proximité de la carrosserie : jamais de coupe directement sur la tôle, la rayure est définitive et se règle en litige."
  ],
  verifier: "Température minimale d'application et nécessité d'un post-chauffage figurent sur la fiche technique du film, et elles se rapportent à la température du support, pas à celle de l'air. Un point à vérifier avant la commande : la durabilité attendue du vinyle en usage véhicule, très différente de celle d'un usage vitrine. Un véhicule lavé au rouleau, exposé en permanence et soumis aux projections use un lettrage bien plus vite qu'une vitrine, et la gamme choisie doit en tenir compte.",
  faq: [
    { q: "Faut-il mouiller pour poser sur un véhicule ?", a: "Non, la pose se fait à sec dans l'immense majorité des cas. L'eau resterait piégée dans les nervures et les joints, et empêcherait la prise de la colle." },
    { q: "Combien de temps avant de laver le véhicule ?", a: "Le fabricant indique un délai avant premier lavage, le temps que l'adhésif atteigne son adhérence finale. Le respecter évite de décoller les bords." },
    { q: "Le lettrage résiste-t-il au lavage automatique ?", a: "Il le supporte, mais il en souffre. Les rouleaux attaquent les bords et les angles, qui sont les points de départ de tout décollement, et les produits alcalins employés en station accélèrent le vieillissement des encres. Un véhicule marqué se lave idéalement au jet à distance raisonnable et à la main sur les zones lettrées. Prévenez le client : c'est la première cause d'usure prématurée, et il l'ignore presque toujours." }
  ]
},
{
  slug: "adhesif-surface-complexe-rivets",
  famille: "vehicule", nav: "Poser sur surface complexe et rivets",
  h1: "Poser un adhésif sur surface complexe, rivetée ou ondulée",
  title: "Poser un Adhésif sur Rivets et Tôle Ondulée",
  desc: "Rivets, ondulations, tôle nervurée : la pose au pinceau chauffant et au rouleau. Les techniques pour épouser un relief marqué.",
  statut: "publie", acces: "reseau", duree: "1 jour", niveau: "Expert",
  resume: "Sur une tôle rivetée ou ondulée, le film doit épouser chaque relief sans être étiré à l'excès. C'est la pose la plus technique du métier.",
  quand: "Camion à ridelles rivetées, remorque, container, bardage industriel ondulé.",
  materiel: ["Film coulé haute conformabilité", "Décapeur thermique", "Rouleau en mousse dure", "Pinceau de marouflage", "Aiguille fine", "Thermomètre infrarouge"],
  etapes: [
    ["Choisir le bon film", "Un film calandré ne conviendra jamais : seul un film coulé haute conformabilité accepte ce relief."],
    ["Poser à plat d'abord", "Appliquer sans forcer sur les parties planes entre reliefs."],
    ["Chauffer modérément", "Contrôler la température au thermomètre infrarouge : surchauffer brûle le film et le rend cassant."],
    ["Maroufler autour de chaque rivet", "Au pinceau ou au rouleau mousse, en tournant autour du rivet, jamais en poussant dessus."],
    ["Percer si nécessaire", "Sur les reliefs les plus marqués, une micro-perforation à l'aiguille libère l'air emprisonné."],
    ["Post-chauffer impérativement", "C'est l'étape qui empêche le film de revenir à sa forme initiale. Sans elle, le film se décolle des reliefs en quelques semaines."]
  ],
  erreurs: ["Film calandré au lieu de coulé.", "Surchauffer : le film blanchit et devient cassant.", "Étirer au lieu de maroufler.", "Oublier le post-chauffage : décollement garanti sur les reliefs.",
    "Chauffer le film avant de l'avoir posé à plat : préchauffé, il perd sa mémoire de forme et ne se rétracte plus correctement dans les creux.",
    "Employer un film monomère sur une surface à double courbure : il ne s'y conforme pas et se décolle par les bords en quelques semaines.",
    "Poser sur une surface froide : en dessous de la température admissible, la colle ne s'accroche pas et le travail se défait à la première pluie."
  ],
  securite: ["Décapeur thermique en usage prolongé : pauses et gants.", "Travail en hauteur sur camion ou bardage.",
    "Décapeur ou chalumeau de carrossier : risque de brûlure et d'inflammation des chutes de film, poste dégagé.",
    "Ventilation si le travail se fait en local fermé, les films chauffés dégagent des composés volatils."
  ],
  verifier: "Seuls les films coulés, dits « cast », se conforment durablement à une surface complexe : rivets, ondulations, double courbure. Un film calandré posé au même endroit se rétracte et découvre les reliefs en quelques mois. Le type de film, sa plage de température de pose et la température de thermoformage admissible figurent sur la fiche technique. Sur un support inconnu — bardage traité, panneau composite, peinture récente —, un essai d'adhérence sur une zone cachée vaut mieux qu'une reprise complète.",
  faq: [
    { q: "Peut-on couvrir un rivet entièrement ?", a: "Oui avec un film coulé haute conformabilité, chauffé et maroufflé au pinceau autour du rivet, puis post-chauffé. C'est long, et c'est ce qui distingue un poseur confirmé." },
    { q: "Et sur tôle ondulée de bardage ?", a: "Même principe : marouflage au fond de chaque onde, post-chauffage systématique. Prévoir un temps de pose largement supérieur à une surface plane équivalente." },
    { q: "Combien de temps faut-il attendre après une peinture neuve ?", a: "Plusieurs semaines, et c'est l'erreur la plus fréquente sur un véhicule ou un bardage repeint. Une peinture fraîche continue de dégazer bien après avoir séché en surface : les solvants qui s'échappent forment des bulles sous l'adhésif et ruinent l'accroche. Le délai exact dépend du type de peinture et figure dans sa documentation ; à défaut, un mois est un minimum raisonnable." }
  ]
},
{
  slug: "deposer-covering-sans-abimer",
  famille: "vehicule", nav: "Déposer un covering sans abîmer",
  h1: "Déposer un covering sans abîmer la peinture",
  title: "Retirer un Covering — Méthode Sans Arrachement",
  desc: "Chaleur, angle de traction, résidus de colle. Déposer un covering de plusieurs années sans emporter la peinture.",
  statut: "publie", acces: "libre", duree: "1 jour", niveau: "Intermédiaire",
  resume: "Le risque n'est pas le film mais la peinture en dessous. Sur une carrosserie repeinte ou déjà fragilisée, la dépose peut arracher.",
  quand: "Fin de leasing, changement d'identité visuelle, revente du véhicule.",
  materiel: ["Décapeur thermique", "Dissolvant de colle compatible carrosserie", "Chiffons microfibre", "Gomme à décaper (roue en caoutchouc)", "Polish de finition"],
  etapes: [
    ["Prévenir le client et documenter", "Photographier l'état avant intervention, surtout sur véhicule repeint. C'est la protection du poseur."],
    ["Chauffer par zones", "Chaleur modérée et constante, une zone de la taille d'une main à la fois."],
    ["Tirer à angle très fermé", "Autour de quinze à trente degrés par rapport à la carrosserie, lentement. À 90°, le film casse et la colle reste."],
    ["Traiter les résidus", "Dissolvant compatible, temps de pose respecté, ou gomme à décaper à faible vitesse."],
    ["Laver et lustrer", "Lavage complet puis polish léger pour homogénéiser l'aspect — la zone couverte a moins vieilli que le reste."]
  ],
  erreurs: ["Tirer à 90° : le film casse en confettis et la dépose prend trois fois plus de temps.", "Surchauffer : la peinture peut cloquer.", "Gomme à décaper trop vite ou appuyée : elle brûle le vernis.", "Dissolvant non compatible avec le vernis : voilage définitif.",
    "Déposer un film resté en place bien au-delà de sa durée annoncée : la colle a durci et migré, et la dépose emporte parfois le vernis.",
    "Travailler sur un véhicule froid : en dessous d'une dizaine de degrés, le film casse au lieu de s'étirer, quelle que soit la chaleur appliquée localement.",
    "Négliger le lustrage final : la carrosserie découvre un contraste net entre les zones couvertes et les zones exposées, et le client l'attribue à la dépose."
  ],
  securite: ["Décapeur thermique : jamais vers un réservoir ni une durite.", "Solvants : ventilation, gants nitrile, fiche de données de sécurité.",
    "Poste dégagé et extincteur accessible : chaleur, solvants et chutes de film forment une combinaison inflammable."
  ],
  verifier: "La compatibilité du dissolvant avec les vernis automobiles est indiquée sur sa fiche technique, et l'essai sur une zone cachée reste obligatoire quoi qu'elle annonce — les vernis varient d'un constructeur et d'une année à l'autre. Un constat préalable est tout aussi important : une carrosserie repeinte, un vernis déjà microfissuré ou un élément en plastique peint ne réagissent pas comme une peinture d'origine. Photographier l'état avant dépose protège les deux parties.",
  faq: [
    { q: "Combien de temps pour déposer un covering complet ?", a: "Très variable selon l'âge et l'exposition : un film de deux ans se retire en quelques heures, un film de sept ans plein sud peut demander plusieurs jours. Facturer en régie." },
    { q: "La peinture sera-t-elle comme avant ?", a: "Sur peinture d'origine saine, oui, souvent mieux préservée que le reste de la carrosserie. Sur peinture refaite, le risque d'arrachement existe et doit être annoncé et écrit avant intervention." },
    { q: "Combien coûte une dépose de covering ?", a: "Souvent plus cher que la pose, et c'est ce qui surprend. Un film récent et bien posé se retire en quelques heures ; un covering resté sept ou huit ans au soleil peut demander deux à trois fois le temps de pose, plus les produits et le lustrage. Le devis de dépose s'établit après avoir vu le véhicule, jamais par téléphone — l'âge du film et son exposition changent tout." }
  ]
},

/* ======================= SIGNALÉTIQUE INTÉRIEURE ======================= */
{
  slug: "poser-plaque-signaletique-porte",
  famille: "interieur", nav: "Poser une plaque de porte",
  h1: "Poser une plaque de signalétique de porte",
  title: "Poser une Plaque de Porte — Hauteur et Fixation",
  desc: "Hauteur de pose, fixation sans percer, et la méthode du gabarit pour aligner une série de plaques sur un couloir entier sans décalage visible.",
  statut: "publie", acces: "libre", duree: "30 min", niveau: "Débutant",
  resume: "Simple en apparence, mais une série de plaques mal alignées sur un couloir se remarque immédiatement.",
  quand: "Bureaux, cabinet médical, hôtel, établissement recevant du public.",
  materiel: ["Plaques", "Adhésif double face ou vis", "Niveau laser", "Gabarit de hauteur", "Alcool"],
  etapes: [
    ["Fixer la hauteur de référence", "Une seule hauteur pour tout le bâtiment, mesurée depuis le sol fini, notée sur un gabarit."],
    ["Choisir le côté", "Côté poignée, sur le mur adjacent à la porte de préférence, pour rester lisible porte ouverte."],
    ["Dégraisser", "Même sur peinture : la poussière suffit à faire lâcher un double face."],
    ["Poser au gabarit", "Le gabarit garantit l'alignement d'un bout à l'autre du couloir, là où le laser se déplace et dérive."],
    ["Contrôler en enfilade", "Se placer en bout de couloir : les défauts d'alignement sautent aux yeux depuis cet angle et seulement celui-là."]
  ],
  erreurs: ["Mesurer chaque plaque indépendamment au lieu d'utiliser un gabarit.", "Poser sur peinture fraîche.", "Poser côté charnière : la plaque disparaît porte ouverte.", "Hauteur variable d'un étage à l'autre.",
    "Poser sur une porte vitrée sans tenir compte de ce qu'on voit au travers : le texte devient illisible sur un fond mouvant.",
    "Employer un double face sur un mur peint récemment repeint ou sur un revêtement poreux : la plaque tombe, en emportant la peinture.",
    "Multiplier les formats et les matières d'un étage à l'autre : une signalétique cohérente se reconnaît sans être lue."
  ],
  securite: ["Rien de particulier hors perçage.",
    "Perçage dans une cloison : repérer les gaines électriques, qui passent souvent à hauteur d'interrupteur, donc à hauteur de plaque."
  ],
  verifier: "Dans un établissement recevant du public, la hauteur de pose, le contraste visuel et la taille de caractère relèvent des règles d'accessibilité fixées par l'arrêté du 20 avril 2017. Ce sont des valeurs réglementaires, pas des recommandations esthétiques, et un contrôle les vérifie. Un point que l'on découvre souvent tard : la plaque se pose sur le mur du côté de la poignée, à distance de l'ouvrant, précisément pour rester lisible et atteignable porte ouverte — ce qui suppose d'avoir prévu la place lors du choix du format.",
  faq: [
    { q: "À quelle hauteur pose-t-on une plaque de porte ?", a: "En ERP, la hauteur et le contraste sont encadrés par la réglementation accessibilité. Hors ERP, l'usage se situe à hauteur de regard, et la règle d'or reste l'uniformité sur tout le bâtiment." },
    { q: "Double face ou vis ?", a: "Double face sur mur lisse et sain, pour ne pas percer en location. Vis dès que le mur est irrégulier, la plaque lourde, ou le passage intensif." },
    { q: "Faut-il la même plaque pour tous les locaux ?", a: "Le format et la matière, oui — c'est la cohérence qui fait qu'une signalétique se lit sans effort. Le contenu, non : une porte de bureau, un local technique et une issue de secours n'appellent ni les mêmes mentions ni les mêmes obligations. Les locaux recevant du public et les issues relèvent en outre de règles propres, qui priment sur la charte graphique." }
  ]
},
{
  slug: "poser-signaletique-braille-relief",
  famille: "interieur", nav: "Poser une signalétique braille",
  h1: "Poser une signalétique braille et en relief",
  title: "Signalétique Braille et Relief — Pose et Conformité",
  desc: "Hauteur, emplacement atteignable, sens de lecture. La signalétique tactile obéit à des règles précises, pas à l'esthétique.",
  statut: "publie", acces: "libre", duree: "45 min", niveau: "Intermédiaire",
  resume: "Une signalétique braille posée trop haut ou hors d'atteinte ne sert à rien. L'emplacement est ici une obligation, pas un choix de décorateur.",
  quand: "Établissement recevant du public, ascenseur, sanitaires, numérotation de chambres, mairie.",
  materiel: ["Plaques braille et relief", "Double face ou vis inox", "Gabarit de hauteur", "Alcool"],
  etapes: [
    ["Vérifier la règle applicable", "Hauteur, emplacement et caractéristiques du relief sont fixés par la réglementation accessibilité des ERP. On lit le texte avant de poser."],
    ["Choisir un emplacement atteignable", "La plaque doit pouvoir être touchée : sur le mur côté poignée, dégagée de tout obstacle, jamais sur la porte elle-même qui bouge."],
    ["Dégraisser et poser au gabarit", "Hauteur identique dans tout le bâtiment."],
    ["Vérifier le sens et l'intégrité", "Le braille se lit de gauche à droite ; contrôler qu'aucun point n'est écrasé par le marouflage."],
    ["Contrôler le contraste", "Le relief doit aussi être visible : le contraste entre la plaque et son support est réglementé."]
  ],
  erreurs: ["Poser sur la porte : elle bouge, la lecture devient impossible.", "Poser trop haut ou derrière un obstacle.", "Écraser les points braille en marouflant.", "Contraste insuffisant avec le mur.",
    "Poser une plaque braille derrière une plante, un extincteur ou un mobilier : elle doit être atteignable à la main, pas seulement visible.",
    "Choisir un relief trop peu marqué pour des raisons esthétiques : un relief que le doigt ne distingue pas ne sert à rien.",
    "Poser à une hauteur différente d'un local à l'autre : une personne aveugle cherche à hauteur constante, c'est la régularité qui rend le dispositif utilisable."
  ],
  securite: ["Rien de particulier.",
    "Plaque en saillie sur un cheminement : elle ne doit pas constituer elle-même un obstacle au sens des règles d'accessibilité."
  ],
  verifier: "Les caractéristiques dimensionnelles du braille et du relief, la hauteur de pose et le contraste requis sont définis par la réglementation sur l'accessibilité des établissements recevant du public, notamment l'arrêté du 20 avril 2017. Le braille répond en outre à des normes dimensionnelles précises — diamètre des points, espacement, hauteur — qui ne se laissent pas adapter : un braille redessiné pour des raisons graphiques n'est plus lisible au doigt. La maquette se fait valider par un fournisseur qui maîtrise ces contraintes, jamais par le seul graphiste.",
  faq: [
    { q: "Le braille est-il obligatoire partout ?", a: "Non, il l'est pour certaines informations dans les établissements recevant du public — notamment la numérotation des étages en ascenseur et l'identification des locaux. Le champ exact figure dans la réglementation accessibilité." },
    { q: "Braille gravé ou rapporté ?", a: "Les deux existent. Les points rapportés en demi-sphère offrent un relief franc et durable ; la gravure creuse est moins lisible au toucher. La réglementation impose des points saillants." },
    { q: "Une plaque en relief suffit-elle sans braille ?", a: "Les deux ne s'adressent pas aux mêmes personnes et ne se remplacent pas. Le relief en caractères latins sert aux personnes malvoyantes et à celles devenues aveugles tardivement, qui ne lisent pas le braille — c'est la majorité. Le braille sert à celles qui l'ont appris. Une signalétique accessible porte donc les deux, et c'est ce que prévoit la réglementation." }
  ]
},
{
  slug: "poser-habillage-mural-grand-format",
  famille: "interieur", nav: "Poser un habillage mural grand format",
  h1: "Poser un habillage mural grand format, lé par lé",
  title: "Habillage Mural Grand Format — Pose Lé par Lé",
  desc: "Raccords, recouvrement, aplomb et préparation du mur. Poser un décor mural adhésif sur plusieurs mètres sans décalage.",
  statut: "publie", acces: "libre", duree: "1 jour", niveau: "Confirmé",
  resume: "Le premier lé décide de tout : s'il n'est pas d'aplomb, l'erreur se cumule sur toute la largeur du mur.",
  quand: "Décor de salle de sport, hall d'accueil, salle de réunion, vitrine intérieure, restaurant.",
  materiel: ["Lés numérotés", "Raclette à feutre", "Niveau laser", "Cutter à lame fine", "Règle inox", "Alcool", "Échafaudage roulant"],
  etapes: [
    ["Préparer le mur", "Lisse, sain, dépoussiéré. Sur peinture récente, attendre le délai indiqué par le fabricant de la peinture — un adhésif sur peinture fraîche arrache au retrait."],
    ["Tracer l'aplomb du premier lé", "Au laser. C'est le seul repère fiable : ni le mur, ni le plafond, ni le sol ne sont d'aplomb."],
    ["Poser le premier lé", "Du haut vers le bas, en marouflant en éventail."],
    ["Poser les suivants en recouvrement", "Léger recouvrement sur le lé précédent, en respectant l'ordre de numérotation."],
    ["Couper les raccords en double coupe", "Lame neuve, règle inox, coupe des deux épaisseurs en une passe, puis retrait des deux chutes. Le raccord devient invisible."],
    ["Araser en périphérie", "Plinthes, angles, interrupteurs."]
  ],
  erreurs: ["Se fier au mur ou au plafond pour l'aplomb.", "Poser dans le désordre : les raccords de motif ne tombent plus.", "Double coupe avec lame usée : elle entaille le mur.", "Poser sur peinture fraîche.",
    "Poser sur une cloison qui n'a pas été ratissée : le grand format révèle chaque défaut d'enduit en lumière rasante.",
    "Commencer par le mur le plus visible : on progresse d'un angle vers l'autre, et les écarts s'accumulent sur le dernier lé — autant qu'ils tombent là où personne ne regarde.",
    "Négliger le climat du local : une pose faite dans un local non chauffé en hiver se rétracte dès la remise en chauffe."
  ],
  securite: ["Travail en hauteur : échafaudage roulant, jamais en équilibre sur un escabeau avec un lé de trois mètres.", "Lames : gants.",
    "Échafaudage roulant : roues bloquées avant de monter, et jamais déplacé avec quelqu'un dessus. C'est l'accident le plus fréquent en pose intérieure."
  ],
  verifier: "Le délai à respecter après peinture et la compatibilité avec le type de peinture figurent sur la fiche technique du film, et ils ne sont pas anecdotiques : une peinture mate récente est le support le plus difficile qui soit, et beaucoup d'échecs viennent de là. Un essai d'adhérence sur une zone cachée, quarante-huit heures avant le chantier, dit ce qu'aucune fiche technique ne peut dire sur une peinture dont on ignore la référence exacte. Sur support douteux, il vaut mieux prévoir une impression sur panneau rapporté qu'un film collé.",
  faq: [
    { q: "Peut-on poser sur une peinture mate ?", a: "C'est le cas le plus délicat : la peinture mate est poreuse et fragile, et le retrait arrache souvent le film de peinture. À déconseiller ou à faire précéder d'un primaire d'accrochage." },
    { q: "Comment gérer les interrupteurs et prises ?", a: "On démonte les plaques quand c'est possible, on pose le lé par-dessus, on découpe et on remonte. Couper autour sans démonter se voit toujours." },
    { q: "Combien de temps tient un habillage mural intérieur ?", a: "Cinq à dix ans sans difficulté en intérieur, la lumière et les écarts de température y étant modérés. Ce qui l'abîme, ce sont les passages : angles, hauteur d'épaule dans un couloir, zones de manutention. Sur ces endroits précis, un laminat de protection ou un panneau rigide rapporté prolonge considérablement la durée de vie, et coûte moins cher que de refaire le mur entier." }
  ]
},

/* =================== ENTRETIEN, DÉPOSE, SÉCURITÉ =================== */
{
  slug: "entretenir-nettoyer-enseigne",
  famille: "entretien", nav: "Nettoyer et entretenir une enseigne",
  h1: "Nettoyer et entretenir une enseigne",
  title: "Entretien d'une Enseigne — Produits, Gestes et Fréquence",
  desc: "Ce qui prolonge une enseigne et ce qui la tue. Produits à proscrire, fréquence, et l'obligation légale de maintien en bon état.",
  statut: "publie", acces: "libre", duree: "1 h", niveau: "Débutant",
  resume: "La plupart des enseignes ne meurent pas d'usure mais de nettoyage. Trois produits et deux gestes suffisent à ruiner une pose correcte.",
  quand: "Contrat d'entretien, visite annuelle, remise en état avant photo ou vente.",
  materiel: ["Eau tiède savonneuse", "Chiffon microfibre", "Éponge non abrasive", "Perche télescopique", "Produits adaptés au support"],
  etapes: [
    ["Identifier les matériaux", "Adhésif imprimé, plexiglas, alu laqué, inox, polycarbonate : chacun a ses interdits."],
    ["Dépoussiérer à sec", "Un chiffon sec avant l'eau évite de transformer la poussière en pâte abrasive."],
    ["Laver à l'eau tiède savonneuse", "De haut en bas, au chiffon doux, sans pression."],
    ["Rincer et sécher", "Le séchage évite les traces calcaires, très visibles sur les surfaces sombres."],
    ["Contrôler en même temps", "Fixations, joints, étanchéité, éclairage : la visite d'entretien est le bon moment pour repérer un desserrage avant qu'il devienne un accident."]
  ],
  erreurs: [
    "Nettoyeur haute pression : il décolle les adhésifs et force l'eau dans les caissons.",
    "Produits abrasifs ou éponge grattante : ils rayent définitivement le plexiglas et matifient les impressions.",
    "Solvants sur plexiglas : fissuration irréversible.",
    "Raclette de laveur de vitres sur un microperforé : elle l'arrache.",
    "Nettoyer une pose de moins de quelques jours : l'adhésif n'a pas atteint son adhérence finale.",
    "Nettoyer par temps de gel ou en plein soleil : l'eau sèche en traces avant d'avoir été essuyée, et le résultat est pire qu'avant.",
    "Traiter un caisson sans vérifier son étanchéité au préalable : le nettoyage introduit alors l'eau qu'on croyait chasser."
  ],
  securite: ["Travail en hauteur avec de l'eau : risque de glissade accru.", "Coupure de l'alimentation avant tout nettoyage d'une enseigne lumineuse.",
    "Nettoyage à la nacelle sur voirie : les mêmes autorisations d'occupation du domaine public que pour une pose s'appliquent."
  ],
  verifier: "Les produits compatibles avec chaque support figurent sur les fiches techniques des matériaux, et la règle est simple : en cas de doute, eau tiède et savon neutre ne détériorent rien. L'article R.581-58 du code de l'environnement impose par ailleurs que l'enseigne soit maintenue en bon état de propreté, d'entretien et de fonctionnement — ce n'est pas une recommandation. Une enseigne dont la moitié des lettres est éteinte est en infraction, et le maire peut en exiger la remise en état.",
  faq: [
    { q: "À quelle fréquence entretenir une enseigne ?", a: "Deux fois par an en milieu urbain ou littoral, une fois ailleurs, avec un contrôle des fixations à chaque passage. En bord de mer, le sel impose un rinçage plus fréquent." },
    { q: "Le client est-il obligé d'entretenir son enseigne ?", a: "Oui. L'article R.581-58 du code de l'environnement met le maintien en bon état à la charge de la personne exerçant l'activité signalée. Une enseigne dégradée ou à l'éclairage défectueux est en infraction." },
    { q: "Un contrat d'entretien est-il utile ?", a: "Il l'est dès qu'une enseigne est lumineuse et en hauteur, pour une raison simple : sans visite programmée, personne ne monte voir avant la panne. Une visite annuelle permet de repérer un joint qui vieillit, une fixation qui se desserre ou un module qui faiblit, c'est-à-dire de réparer au lieu de remplacer. Le coût d'une visite se compare à celui d'un remplacement de caisson, pas à zéro." }
  ]
},
{
  slug: "deposer-enseigne-fin-activite",
  famille: "entretien", nav: "Déposer une enseigne en fin d'activité",
  h1: "Déposer une enseigne en fin d'activité",
  title: "Déposer une Enseigne — Obligation Légale et Remise en État",
  desc: "La dépose n'est pas facultative : elle est obligatoire à la cessation d'activité. Délai, charge, remise en état de la façade.",
  statut: "publie", acces: "libre", duree: "3 h", niveau: "Intermédiaire",
  resume: "Beaucoup l'ignorent : la suppression de l'enseigne au terme de l'activité est une obligation légale, pas un service optionnel. C'est aussi une prestation à vendre.",
  quand: "Cessation d'activité, déménagement, changement d'enseigne, fin de bail commercial.",
  materiel: ["Matériel de hauteur", "Outillage de démontage", "Mastic et enduit de rebouchage", "Peinture de retouche façade", "Bennes ou filière de déchets"],
  etapes: [
    ["Couper et consigner l'alimentation", "Avant tout démontage d'une enseigne lumineuse, et par un intervenant habilité."],
    ["Démonter par éléments", "Du plus léger au plus lourd, en sécurisant chaque pièce avant de libérer la suivante."],
    ["Déposer les fixations", "Retirer tiges et chevilles, ou les recouper au ras selon le support."],
    ["Reboucher et étanchéifier", "Chaque percement rebouché puis étanchéifié : ce sont autant de points d'entrée d'eau laissés dans la façade."],
    ["Reprendre la façade", "Nettoyage de l'empreinte laissée par l'enseigne, retouche de peinture si le bail l'exige."],
    ["Évacuer en filière", "Les caissons contiennent de l'électronique et parfois des tubes : ils relèvent d'une filière de déchets professionnels."]
  ],
  erreurs: ["Laisser les percements ouverts.", "Abandonner les tiges d'ancrage qui rouillent et coulent sur la façade.", "Oublier la remise en état prévue au bail commercial.", "Jeter caissons et sources lumineuses avec les déchets courants.",
    "Déposer sans photographier l'état de la façade avant intervention : toute trace préexistante sera attribuée à la dépose.",
    "Omettre de couper et de déposer l'alimentation restée en attente : un câble sous tension qui pend en façade après la dépose est un danger et une responsabilité."
  ],
  securite: ["Consignation électrique avant démontage.", "Travail en hauteur et manutention de charges.", "Chute d'objets : balisage au sol obligatoire.", "Bâtiment antérieur à 1997 : repérage amiante avant travaux.",
    "Vérification d'absence de tension avant tout démontage, y compris sur une enseigne que le client affirme hors service depuis des mois."
  ],
  verifier: "L'obligation de suppression de l'enseigne au terme de l'activité signalée figure à l'article R.581-58 du code de l'environnement : elle incombe à la personne qui exerçait l'activité, dans les trois mois de la cessation, remise en état des lieux comprise. Les déchets relèvent par ailleurs de filières distinctes — les sources lumineuses et les appareillages électriques sont des déchets d'équipements électriques et électroniques, qui ne se jettent ni avec les gravats ni avec les encombrants. Le bordereau de suivi remis au client est la preuve que l'obligation a été tenue : il se conserve.",
  faq: [
    { q: "Qui doit payer la dépose ?", a: "Le code de l'environnement met la suppression à la charge de la personne qui exerçait l'activité signalée. En pratique, le bail commercial précise souvent aussi les obligations de remise en état du preneur." },
    { q: "Peut-on laisser une enseigne d'un commerce fermé ?", a: "Non. Une enseigne qui ne signale plus aucune activité doit être supprimée. Le maire peut mettre en demeure, et c'est un motif de contentieux fréquent en centre-ville." },
    { q: "Le bailleur peut-il exiger la dépose ?", a: "Il le peut, et il le fait généralement au titre de la clause de remise en état du bail commercial, indépendamment de l'obligation du code de l'environnement. Les deux se cumulent : l'une est administrative et vise l'enseigne, l'autre est contractuelle et vise l'état des lieux. Un locataire sortant qui laisse son enseigne s'expose donc aux deux, et la retenue sur dépôt de garantie dépasse presque toujours le coût qu'aurait eu la dépose." }
  ]
}

];

module.exports = { FAMILLES, POSES };
