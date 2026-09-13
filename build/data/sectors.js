/* =========================================================================
   Pages « secteur d'activité » — l'angle par métier du client, complémentaire
   des pages métier (ce que l'on fabrique) et des pages villes (où).
   ========================================================================= */
module.exports = [
{
  slug: "pharmacie",
  nav: "Pharmacie & parapharmacie",
  h1: "Signalétique et enseigne de pharmacie",
  title: "Enseigne & Signalétique de Pharmacie — Croix, Vitrine, Agencement",
  desc: "Croix de pharmacie, enseigne, vitrophanie, signalétique de rayons et de comptoir. Devis d'enseignistes spécialisés officine partout en France.",
  topic: "croix-pharmacie", topicAlt: ["vitrophanie", "signaletique-int"],
  lead: "L'officine est un cas particulier : la croix est réglementée, la vitrine est un support de santé publique autant que de commerce, et le rayonnage doit être lisible par une clientèle souvent âgée. Trois contraintes qui excluent l'enseigniste généraliste improvisé.",
  besoins: [
    ["Croix de pharmacie", "Croix LED simple ou double face, fixe ou à messages défilants, avec affichage de la température et de l'heure. Programmation à distance, allumage sur horloge astronomique."],
    ["Enseigne de façade", "Lettres relief ou caisson au nom de l'officine, en cohérence avec la croix. Éclairage LED blanc neutre, très majoritairement en vert réglementaire pour la croix."],
    ["Vitrophanie et vitrine", "Habillage saisonnier, campagnes de prévention, horaires et gardes, dépoli sur la zone d'orthopédie pour préserver la confidentialité."],
    ["Signalétique de rayons", "Bandeaux de gondole, drapeaux de rayon suspendus, réglettes de linéaire : orthopédie, dermo-cosmétique, bébé, vétérinaire, homéopathie."],
    ["Signalétique de comptoir", "Plaques de confidentialité, indication de l'espace de conseil, signalétique d'entretien pharmaceutique, plexiglas de comptoir."],
    ["Accessibilité et sécurité", "Signalétique PMR conforme, bande de repérage des vitrages, plan d'évacuation, indication du local de garde et de la sonnette de nuit."]
  ],
  specifics: [
    "La <strong>croix verte</strong> est le seul insigne autorisé pour signaler une officine et son usage est réservé aux pharmacies : elle relève à la fois du Code de la santé publique et de la réglementation des enseignes. Sa pose reste soumise, comme toute enseigne, à l'autorisation préalable en mairie lorsque la commune dispose d'un règlement local de publicité.",
    "L'affichage des <strong>gardes et des horaires</strong> est une obligation professionnelle : il doit rester lisible depuis l'extérieur, y compris rideau fermé. Beaucoup d'officines le traitent en vitrophanie sur la porte plutôt qu'en feuille scotchée, ce qui change complètement l'image.",
    "L'<strong>agencement en libre accès</strong> impose une signalétique de rayon hiérarchisée. La règle utile : le drapeau suspendu se lit depuis l'entrée, le bandeau de gondole depuis l'allée, la réglette depuis un mètre. Trois niveaux, trois tailles de caractères."
  ],
  budget: [
    ["Croix LED double face 60 × 60 cm", "1 200 – 2 800 €"],
    ["Croix LED à messages défilants 80 cm", "2 200 – 4 500 €"],
    ["Enseigne de façade lettres relief", "1 800 – 5 000 €"],
    ["Habillage vitrine complet (vitrophanie)", "600 – 2 500 €"],
    ["Signalétique de rayons (officine 120 m²)", "900 – 3 000 €"],
    ["Pack signalétique accessibilité PMR", "400 – 1 200 €"]
  ],
  faq: [
    { q: "Qui peut installer une croix de pharmacie ?", a: "N'importe quel enseigniste techniquement, mais la croix ne peut signaler qu'une officine régulièrement autorisée : son usage est réservé aux pharmacies. Côté pose, elle est soumise aux mêmes règles que toute enseigne — autorisation préalable en mairie si la commune a un règlement local de publicité, respect des règles de saillie sur le domaine public, extinction nocturne éventuelle." },
    { q: "Une croix à messages défilants est-elle rentable ?", a: "Elle le devient si vous l'utilisez réellement : gardes, campagnes de vaccination, arrivée d'une gamme, rappel des horaires. Une croix à messages laissée sur l'heure et la température n'apporte rien de plus qu'une croix fixe, pour 1 000 à 2 000 € de plus. Vérifiez que la programmation se fait à distance, sinon personne ne l'utilisera." },
    { q: "Peut-on masquer la zone orthopédie sans assombrir la pharmacie ?", a: "Oui, c'est exactement l'usage du film dépoli appliqué en bandeau à hauteur de regard, ou d'un dépoli à motif. Vous conservez la lumière naturelle et l'aspect ouvert de l'officine tout en préservant la confidentialité de l'espace d'essayage." }
  ],

  /* ----------------------------------------------------------------------
     Bloc réglementaire approfondi — gabarit du secteur « référent ».
     Trois raisons d'écrire cela plutôt que du discours commercial : le
     pharmacien y découvre une obligation qu'il ignorait, donc il appelle ;
     les IA citent volontiers une page qui expose le droit applicable ; et
     une page de référence réglementaire est le seul contenu de ce métier
     vers lequel on fait spontanément des liens — ce qui est aujourd'hui le
     premier facteur limitant du site.

     Chaque affirmation porte sa source. Les valeurs chiffrées locales
     (surface, saillie, TLPE) ne sont jamais données : elles dépendent du
     règlement local de publicité, et les inventer ruinerait le reste.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre l'enseigne d'une officine",
    lead: "La pharmacie est le commerce le plus encadré en matière d'enseigne : quatre corpus de règles s'y superposent, qui ne relèvent ni des mêmes autorités ni des mêmes délais. C'est pour cela qu'un enseigniste généraliste se trompe presque toujours sur au moins un point.",
    couches: [
      {
        titre: "1 · Le droit de la santé : ce que vous avez le droit d'afficher",
        texte: "L'article R.4235-53 du code de la santé publique réserve à l'officine deux emblèmes : la <strong>croix grecque verte</strong> — quatre branches d'égale longueur — lumineuse ou non, et le <strong>caducée pharmaceutique vert</strong>, formé de la coupe d'Hygie et du serpent d'Épidaure. Le vert de référence est le Pantone 347 C.",
        cle: "La croix verte et le caducée sont des <strong>marques collectives dont le Conseil national de l'Ordre des pharmaciens est titulaire</strong>. Leur affichage par un non-pharmacien expose à des poursuites. C'est l'erreur la plus coûteuse du secteur : une parapharmacie, un espace bien-être ou une herboristerie ne peuvent pas poser de croix verte, quelle que soit leur bonne foi.",
        source: { label: "Article R.4235-53 du code de la santé publique", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006157750/" }
      },
      {
        titre: "2 · L'autorisation d'enseigne : qui décide, et ce qu'elle ne couvre pas",
        texte: "L'enseigne est définie à l'article L.581-3 du code de l'environnement. Depuis janvier 2024, son autorisation relève de la <strong>compétence exclusive du maire</strong>. S'y ajoute l'accord de l'<strong>architecte des Bâtiments de France</strong> lorsque l'immeuble est classé ou inscrit au titre des monuments historiques, et celui du <strong>préfet de région</strong> pour un site classé, un cœur de parc national ou une réserve naturelle.",
        cle: "Le piège, et il arrête des chantiers : <strong>l'autorisation d'enseigne ne vaut pas autorisation de modifier la façade</strong>. Repeindre la devanture, changer la vitrine ou poser un store relèvent d'une <strong>déclaration préalable distincte, au titre du code de l'urbanisme</strong>. Deux dossiers, deux instructions — souvent le même service, jamais la même décision.",
        source: { label: "Code de l'environnement — procédures de déclaration et d'autorisation préalable (R.581-6 à R.581-21-1)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006189035/" }
      },
      {
        titre: "3 · Les nuisances lumineuses : votre croix doit savoir s'éteindre",
        texte: "L'arrêté du 27 décembre 2018, modifié le 29 mai 2019, impose l'extinction des enseignes lumineuses <strong>entre 1 h et 6 h du matin</strong>. Il s'applique à l'ensemble des enseignes depuis le 1<sup>er</sup> janvier 2020.",
        cle: "<strong>Les officines de garde et celles ouvertes 24 h sur 24 en sont dérogataires</strong> : leur croix reste allumée, parce que c'est la visibilité du service de garde qui la justifie. La conséquence est technique, et elle doit figurer au cahier des charges : une croix ne peut pas être posée sur un simple interrupteur. Il lui faut une <strong>horloge astronomique et un calendrier de garde programmable</strong>, idéalement à distance — sinon la mise en conformité se fait à la main tous les soirs, ce qui revient à ne pas se faire.",
        source: { label: "Arrêté du 27 décembre 2018 relatif à la prévention, à la réduction et à la limitation des nuisances lumineuses", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037864346" }
      },
      {
        titre: "4 · Le règlement local et la taxe",
        texte: "Le <strong>règlement local de publicité</strong> de votre commune, lorsqu'elle en a adopté un, fixe la surface admise, la saillie maximale, la hauteur d'implantation et parfois la luminance. Ces valeurs changent d'une commune à l'autre, parfois d'une rue à l'autre : aucun chiffre national n'a de sens ici, et nous n'en donnerons pas.",
        cle: "S'y ajoute la <strong>TLPE</strong>, taxe locale sur la publicité extérieure, due au-delà d'un seuil de surface cumulée et tarifée selon la strate de population de la commune. Elle porte sur l'ensemble de vos supports, pas sur la seule croix : ajouter un totem ou un caisson peut faire basculer l'officine au-dessus du seuil. Cela se vérifie <em>avant</em> de dessiner, pas après.",
        source: { label: "Code général des collectivités territoriales — TLPE (L.2333-6 et suivants)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070633/LEGISCTA000006192887/" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Les valeurs chiffrées — surface, saillie, hauteur, tarif de TLPE — relèvent du règlement local de publicité de votre commune et se vérifient au cas par cas. C'est la première chose que fait l'enseigniste que nous vous présentons, avant même de chiffrer."
  },

  /* Une officine ne change pas de croix par caprice : cinq déclencheurs,
     tous prévisibles. Connaître le calendrier d'achat d'un secteur vaut
     mieux que prospecter au hasard, et c'est ce que le partenaire achète. */
  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand une officine refait son enseigne",
    lead: "Ce n'est jamais au hasard. Il y a cinq déclencheurs, et ils s'anticipent.",
    moments: [
      ["Transfert ou regroupement de licence", "Le budget le plus lourd : l'officine change d'adresse et tout est repris — croix, enseigne de façade, vitrine, signalétique intérieure. Le calendrier est commandé par l'autorisation de l'ARS, et le chantier doit être prêt le jour de l'ouverture."],
      ["Changement de titulaire", "Le repreneur veut marquer la reprise. Le nom change souvent, donc l'enseigne de façade et la vitrophanie ; la croix, elle, se conserve si elle est récente et conforme."],
      ["Rénovation d'agencement", "Le cycle est d'une dizaine d'années. La signalétique de rayons se refait avec le mobilier, et c'est le moment où la hiérarchie drapeau / bandeau / réglette se rejoue entièrement."],
      ["Mise en conformité accessibilité", "Signalétique PMR, bandes de repérage des vitrages, contraste des nez de marche. Souvent déclenché par un contrôle ou par un registre public d'accessibilité à mettre à jour."],
      ["Entrée dans un groupement", "L'adhésion impose une charte : façade, couleurs, vitrine. Le délai est court et le cahier des charges vient du groupement — il faut un poseur capable de lire une charte technique, pas d'improviser."]
    ]
  },

  /* Les questions que la demande doit porter. C'est ce qui distingue un
     dossier d'un contact, et c'est exactement ce que la console transmet
     au partenaire. */
  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Un enseigniste ne peut pas chiffrer une croix sans ces éléments. Nous les réunissons par téléphone pour que vous n'ayez pas à les redonner trois fois.",
    questions: [
      "Croix seule, ou croix et enseigne de façade reprises ensemble ?",
      "Mono-face ou bi-face — et depuis quels axes la croix doit-elle être vue ?",
      "L'officine assure-t-elle des gardes ? La réponse conditionne la programmation, donc le matériel.",
      "Une alimentation électrique existe-t-elle à l'emplacement, et de quelle section ?",
      "Hauteur de pose et saillie envisagées, longueur de façade disponible.",
      "La commune a-t-elle un règlement local de publicité ? L'immeuble est-il en secteur protégé ou aux abords d'un monument historique ?",
      "Surface cumulée des enseignes existantes, pour situer le projet par rapport au seuil de TLPE.",
      "Accès : trottoir, stationnement, nacelle nécessaire, contrainte d'horaire de pose en centre-ville.",
      "Messages défilants souhaités : température, heure, gardes, campagnes de prévention ?",
      "Qui dépose le dossier en mairie — vous, ou l'enseigniste dans le cadre de sa prestation ?"
    ],
    note: "Les trois points que les clients oublient systématiquement sont la garde, l'alimentation existante et la surface cumulée d'enseignes. Ce sont aussi les trois qui font le plus varier le devis."
  },

  /* Vocabulaire du métier : c'est ce que tape le client qui sait déjà ce
     qu'il veut, donc celui qui achète. */
  vocabulaire: [
    ["Croix grecque", "Quatre branches d'égale longueur. C'est la forme imposée : une croix latine ou un logo en forme de croix ne sont pas conformes."],
    ["Caducée pharmaceutique", "Coupe d'Hygie et serpent d'Épidaure. L'alternative réglementaire à la croix, souvent posée en drapeau de petite taille."],
    ["Croix bi-face", "Visible des deux sens de circulation. C'est le cas courant en rue ; la mono-face ne se justifie qu'adossée à un mur aveugle."],
    ["Saillie", "Ce dont l'enseigne dépasse du nu de la façade. Valeur maximale fixée par le règlement local, et surveillée de près en centre ancien."],
    ["Horloge astronomique", "Commande d'allumage calée sur le lever et le coucher du soleil. Indispensable pour tenir l'extinction de 1 h à 6 h sans intervention manuelle."],
    ["Drapeau de rayon", "Panneau suspendu perpendiculaire au linéaire, lisible depuis l'entrée. Premier niveau de la hiérarchie de rayonnage."],
    ["Bandeau de gondole", "Bandeau horizontal en tête de rayon, lisible depuis l'allée. Deuxième niveau."],
    ["Réglette de linéaire", "Étiquette de tablette, lisible à un mètre. Troisième niveau."],
    ["Dépoli", "Film translucide appliqué sur vitrage. En officine, il préserve la confidentialité de l'espace orthopédie sans assombrir la surface de vente."]
  ],

  /* Galerie documentaire : chaque photographie porte une légende qui
     enseigne un point du bloc réglementaire. Une image qui décore ne vaut
     rien sur une page qui prétend faire autorité ; une image légendée
     ajoute une preuve visuelle à chaque règle énoncée plus haut. */
  galerie: {
    eyebrow: "En images",
    titre: "Six croix, six règles",
    lead: "Chacune de ces façades illustre un point de ce qui précède. C'est le meilleur moyen de vérifier, avant de commander, ce que l'on est en train de demander.",
    photos: [
      { topic: "croix-pharmacie", i: 1,
        alt: "Croix de pharmacie néon verte en drapeau sur une façade",
        legende: "<strong>La forme grecque.</strong> Quatre branches d'égale longueur : c'est ce qu'impose l'article R.4235-53. Une croix latine ou un logo en forme de croix ne sont pas conformes." },
      { topic: "croix-pharmacie", i: 2,
        alt: "Croix de pharmacie à matrice de LED affichant un motif vert",
        legende: "<strong>La croix à matrice de LED.</strong> C'est elle qui affiche l'heure, la température et les gardes. C'est aussi celle qui impose une programmation — et donc un paramétrage à distance, si l'on ne veut pas monter sur la façade à chaque changement." },
      { topic: "croix-pharmacie", i: 4,
        alt: "Caducée pharmaceutique lumineux : coupe d'Hygie et serpent",
        legende: "<strong>Le caducée pharmaceutique.</strong> Coupe d'Hygie et serpent d'Épidaure : l'autre emblème autorisé, souvent posé en complément de la croix ou sur les façades où la saillie est contrainte." },
      { topic: "croix-pharmacie", i: 6,
        alt: "Croix de pharmacie vue de dessous, potence et fixation apparentes",
        legende: "<strong>La saillie.</strong> Vue de dessous, la potence et le débord sur le domaine public. C'est cette cote que le règlement local plafonne, et le premier point que vérifie la mairie." },
      { topic: "croix-pharmacie", i: 5,
        alt: "Croix de pharmacie éteinte en plein jour sur une façade d'immeuble",
        legende: "<strong>L'extinction.</strong> Éteinte en journée — et, depuis l'arrêté du 27 décembre 2018, obligatoirement entre 1 h et 6 h. Sauf pendant les gardes, où elle doit au contraire rester allumée." },
      { topic: "croix-pharmacie", i: 3,
        alt: "Croix de pharmacie à contour lumineux fin sur une façade ancienne",
        legende: "<strong>Le secteur protégé.</strong> Sur une façade ancienne ou aux abords d'un monument historique, l'accord de l'architecte des Bâtiments de France s'ajoute à celui du maire. Le dessin se négocie." }
    ]
  },

  services: ["enseignes", "vitrophanie-plv", "signaletique", "impression-grand-format"]
},
{
  slug: "restaurant-bar-hotel",
  nav: "Restaurant, bar & hôtel",
  h1: "Enseigne et signalétique pour restaurant, bar et hôtel",
  title: "Enseigne Restaurant, Bar & Hôtel — Néon, Terrasse, Menu, Vitrine",
  desc: "Enseigne lumineuse, néon LED, porte-menu, habillage de terrasse, signalétique d'hôtel. Devis d'enseignistes spécialisés CHR partout en France.",
  topic: "enseigne-lumineuse", topicAlt: ["commerce", "digital"],
  lead: "En restauration, l'enseigne ne dit pas seulement qui vous êtes : elle dit à quel prix et pour quelle occasion. Un néon rose et un lettrage laiton sur fond noir n'attirent pas la même clientèle, et cette décision se prend avant le premier coup de crayon.",
  besoins: [
    ["Enseigne de façade", "Lettres relief, néon LED, caisson rétro-éclairé ou lettrage peint. Le choix du matériau et de la température de couleur porte à lui seul le positionnement de l'établissement."],
    ["Néon LED d'ambiance", "En vitrine ou en salle : nom de l'établissement, slogan, signature, motif. Le support le plus photographié et donc le plus relayé sur les réseaux."],
    ["Porte-menu et affichage tarifaire", "Vitrine porte-menu éclairée, chevalet trottoir, ardoise, cadre clic. L'affichage des prix à l'extérieur est une obligation d'information du consommateur."],
    ["Terrasse", "Store banne imprimé, paravents et brise-vues marqués, parasols personnalisés, jardinières habillées, chauffage signalé."],
    ["Signalétique intérieure", "Sanitaires, vestiaire, sortie de secours, capacité d'accueil, plan d'évacuation, interdiction de fumer, information allergènes."],
    ["Hôtellerie", "Numérotation de chambres, plaques d'étage, signalétique de couloir, totem d'entrée, marquage du parking et signalétique de nuit."]
  ],
  specifics: [
    "L'<strong>affichage des prix</strong> à l'extérieur de l'établissement est obligatoire : carte ou menu lisible depuis la voie publique, ainsi que le prix des boissons pour un bar. Une vitrine porte-menu éclairée règle le sujet et évite la feuille A4 scotchée qui abîme l'image.",
    "En terrasse, l'occupation du domaine public est soumise à une <strong>autorisation municipale</strong> qui encadre souvent le mobilier, les couleurs et la publicité admise sur les brise-vues et les stores. Renseignez-vous avant de commander : certaines communes interdisent tout marquage de marque de boisson.",
    "Un établissement recevant du public doit afficher sa <strong>capacité maximale</strong>, ses consignes de sécurité et son plan d'évacuation, et informer sur les <strong>allergènes</strong>. Ce sont des points systématiquement vérifiés en commission de sécurité.",
    "Le <strong>rendu nocturne</strong> se décide avec un échantillon allumé, jamais sur écran. Un rouge profond vire à l'orangé en rétro-éclairage, et une façade sombre demande beaucoup moins de puissance qu'on ne l'imagine."
  ],
  budget: [
    ["Néon LED sur mesure (vitrine)", "350 – 1 500 €"],
    ["Enseigne lettres relief rétro-éclairées", "1 800 – 6 000 €"],
    ["Vitrine porte-menu éclairée", "300 – 900 €"],
    ["Store banne imprimé 4 m", "1 200 – 3 500 €"],
    ["Brise-vues de terrasse imprimés (jeu de 6)", "600 – 1 800 €"],
    ["Signalétique intérieure complète", "500 – 2 000 €"],
    ["Numérotation d'hôtel (30 chambres)", "900 – 3 500 €"]
  ],
  faq: [
    { q: "Un néon LED consomme-t-il beaucoup ?", a: "Non. Un néon LED de vitrine de 1 mètre consomme environ 8 à 15 W, soit moins qu'une ampoule domestique. C'est l'un de ses principaux avantages sur le néon au gaz : consommation divisée par cinq à dix, allumage instantané, basse tension et donc sécurité renforcée, et durée de vie de 8 à 12 ans." },
    { q: "Puis-je marquer les brise-vues de ma terrasse à mon nom ?", a: "Généralement oui pour votre propre nom, mais l'autorisation d'occupation du domaine public peut encadrer la surface, les couleurs, et interdire la publicité pour des marques tierces — un point sur lequel beaucoup de communes sont strictes vis-à-vis des marques de boissons. Vérifiez le règlement de terrasse de votre mairie avant de commander." },
    { q: "Faut-il éteindre l'enseigne la nuit ?", a: "Le cadre général impose l'extinction des enseignes lumineuses entre 1 h et 6 h, sauf lorsque l'activité s'exerce à ces heures — ce qui est justement le cas de nombreux bars et restaurants. Vérifiez votre règlement local : la dérogation liée à l'activité nocturne n'est pas automatique partout." }
  ],

  /* ----------------------------------------------------------------------
     Restauration : l'affichage extérieur des prix y est obligatoire, comme
     chez le garagiste, mais avec une particularité qui intéresse
     directement l'enseigniste — le texte descend jusqu'au contenu de la
     carte. Et la terrasse, qui est le vrai sujet du secteur, ne relève pas
     du droit de l'enseigne mais de l'occupation du domaine public : deux
     guichets, deux calendriers, une seule façade.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre la façade et la terrasse d'un établissement",
    lead: "Deux régimes se partagent votre devanture : celui de l'enseigne, qui regarde le mur, et celui du domaine public, qui regarde le trottoir. Ils n'ont ni le même service instructeur, ni le même délai, ni la même durée de validité.",
    couches: [
      {
        titre: "1 · L'affichage des prix : obligatoire, et lisible de l'extérieur",
        texte: "L'arrêté du 27 mars 1987, modifié en 1990, impose d'afficher les prix pratiqués <strong>de manière visible et lisible depuis l'extérieur</strong> de l'établissement. Les cartes et menus disponibles à l'intérieur doivent être <strong>identiques</strong> à ceux affichés dehors. Pour chaque prestation figurent le prix et la mention « boisson comprise » ou « boisson non comprise », et pour les boissons la nature et la contenance servie. Les prix de <strong>cinq vins</strong> — ou de cinq boissons couramment servies si l'établissement ne sert pas de vin — doivent également être affichés.",
        cle: "Ce que cela impose au support, et qu'on découvre souvent après l'avoir commandé : l'affichage extérieur <strong>change au rythme de la carte</strong>. Un menu gravé ou sérigraphié est une erreur coûteuse ; il faut un porte-menu, un cadre ou une ardoise conçus pour être mis à jour, et lisibles de nuit. Lorsqu'un service est perçu, les prix s'affichent taxes et service compris, avec la mention correspondante.",
        source: { label: "Arrêté du 27 mars 1987 relatif à l'affichage des prix dans les établissements servant des repas, denrées ou boissons à consommer sur place", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000338985" }
      },
      {
        titre: "2 · La terrasse : ce n'est pas de l'enseigne, c'est du domaine public",
        texte: "Occuper le trottoir suppose une autorisation de la commune, et la nature de l'autorisation dépend de ce que vous posez. Une <strong>terrasse ouverte</strong>, un étalage, un food-truck relèvent du <strong>permis de stationnement</strong> — occupation sans emprise au sol. Une <strong>terrasse fermée</strong> ou un kiosque fixé au sol relèvent de la <strong>permission de voirie</strong>. Dans les deux cas, une redevance est due, fixée par l'autorité gestionnaire, le plus souvent au mètre carré.",
        cle: "Le point à retenir avant d'investir : cette autorisation est <strong>personnelle, temporaire, précaire et révocable</strong>. Elle ne se transmet pas avec le fonds de commerce, elle se renouvelle — souvent à la saison — et elle peut être retirée. Cela conditionne le choix des supports : sur une emprise précaire, on privilégie ce qui se démonte et se réemploie, pas ce qui se scelle.",
        source: { label: "Occupation du domaine public par un commerce (AOT) — Justice.fr", url: "https://www.justice.fr/fiche/occupation-domaine-public-commerce-aot" }
      },
      {
        titre: "3 · L'enseigne, le store et la nuit",
        texte: "L'enseigne de façade relève de l'article L.581-3 du code de l'environnement et de l'autorisation du <strong>maire</strong>, avec l'accord de l'architecte des Bâtiments de France en secteur protégé — situation ordinaire pour un restaurant de centre ancien. Le <strong>store banne</strong>, lui, modifie l'aspect extérieur : il relève d'une <strong>déclaration préalable au titre du code de l'urbanisme</strong>, distincte de l'autorisation d'enseigne. Le lettrage porté sur le lambrequin du store est en revanche une enseigne.",
        cle: "Et la nuit : l'arrêté du 27 décembre 2018 impose l'extinction des enseignes lumineuses <strong>entre 1 h et 6 h</strong>. Pour un établissement qui ferme à 2 h, la contrainte est réelle et se règle à l'installation — une commande programmable, pas un interrupteur derrière le bar que personne n'actionnera.",
        source: { label: "Arrêté du 27 décembre 2018 relatif à la prévention, à la réduction et à la limitation des nuisances lumineuses", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037864346" }
      },
      {
        titre: "4 · Les affichages que le public doit voir à l'intérieur",
        texte: "Au-delà des prix, l'établissement doit porter à la connaissance du public un ensemble de mentions : interdiction de fumer et de vapoter, protection des mineurs en matière d'alcool, répression de l'ivresse publique, licence détenue, et — s'il reçoit du public au sens des ERP — les informations d'accessibilité.",
        cle: "Ces affichages sont permanents et normalisés, à la différence de la carte qui change. Les traiter en panneaux durables plutôt qu'en feuilles imprimées n'est pas une coquetterie : <strong>c'est ce qui fait la différence entre un établissement tenu et un établissement qui a l'air de bricoler</strong>, et c'est la première chose que remarque un contrôle comme un client.",
        source: { label: "Restaurants : droits et obligations des professionnels (DGCCRF)", url: "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/restaurants-droits-et-obligations-des-professionnels" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Les dimensions de terrasse admises, la redevance au mètre carré, les horaires et les matériaux imposés relèvent du règlement de voirie et du règlement local de publicité de votre commune — certaines villes ont une charte des terrasses très détaillée. Cela se vérifie au cas par cas, avant tout devis."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand un établissement refait sa devanture",
    lead: "La restauration est le secteur où le calendrier commande tout : ce qui n'est pas posé avant la saison ne servira pas cette année.",
    moments: [
      ["Avant la saison", "Le déclencheur numéro un. Terrasse, store, porte-menu, ardoises : tout doit être en place avant les beaux jours. Le délai prime sur le prix, et l'entreprise qui tient la date emporte l'affaire."],
      ["Reprise du fonds", "Changement de nom et de concept, donc enseigne, vitrophanie, carte et supports repris d'un bloc. Attention : l'autorisation de terrasse ne se transmet pas avec le fonds, elle est à redemander."],
      ["Changement de carte ou de concept", "Passage en bistronomie, ajout d'une offre à emporter, changement de formule du midi : l'affichage extérieur doit suivre, puisqu'il doit être identique à la carte intérieure."],
      ["Mise en conformité", "Affichage des prix incomplet, mentions obligatoires manquantes, accessibilité : le besoin est précis et le délai imposé."],
      ["Charte de terrasse communale", "De plus en plus de villes adoptent une charte imposant matériaux, couleurs et gabarits. Quand elle entre en vigueur, tout le centre-ville doit se mettre à niveau en même temps — c'est un volume de chantiers concentré sur quelques mois."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur un établissement, la moitié des questions portent sur le trottoir, pas sur le mur.",
    questions: [
      "Enseigne de façade seule, ou façade et terrasse traitées ensemble ?",
      "Disposez-vous déjà d'une autorisation d'occupation du domaine public, et de quel type : permis de stationnement ou permission de voirie ?",
      "Terrasse ouverte ou fermée, et sur quelle surface ? La commune a-t-elle une charte des terrasses ?",
      "Store banne existant ou à poser ? Un lettrage sur lambrequin est-il souhaité ?",
      "Votre affichage extérieur des prix est-il à jour, et identique à la carte servie à l'intérieur ?",
      "À quelle fréquence la carte change-t-elle ? C'est ce qui décide du support : porte-menu, cadre, ardoise ou vitrophanie.",
      "Jusqu'à quelle heure l'établissement est-il ouvert ? L'extinction de 1 h à 6 h impose une commande programmable.",
      "L'établissement est-il en secteur protégé ou aux abords d'un monument historique ?",
      "Les affichages obligatoires intérieurs sont-ils en place : interdiction de fumer, protection des mineurs, licence, accessibilité ?",
      "Y a-t-il une date butoir — ouverture, début de saison, passage d'un jury ou d'un contrôle ?"
    ],
    note: "La question la plus structurante est celle du rythme de la carte. Un établissement qui change sa carte chaque semaine et un établissement qui la change deux fois par an n'achètent pas le même support, même si la façade est identique."
  },

  vocabulaire: [
    ["Permis de stationnement", "Autorisation d'occuper le domaine public sans emprise au sol : terrasse ouverte, étalage, food-truck."],
    ["Permission de voirie", "Autorisation d'occupation avec emprise au sol : terrasse fermée, kiosque scellé. Régime plus lourd que le permis de stationnement."],
    ["Lambrequin", "La bande verticale et souple qui pend au bord d'un store banne. Le lettrage qu'elle porte est une enseigne au sens du code de l'environnement."],
    ["Store banne", "Store repliable en façade. Sa pose modifie l'aspect extérieur et relève d'une déclaration préalable d'urbanisme."],
    ["Porte-menu", "Cadre extérieur, souvent lumineux, recevant la carte. C'est le support de l'affichage obligatoire des prix — donc il doit être remplaçable."],
    ["Chevalet", "Panneau autoportant posé sur le trottoir. Il occupe le domaine public : son emprise entre dans l'autorisation."],
    ["Charte des terrasses", "Document communal fixant matériaux, couleurs, gabarits et mobilier admis. Prime sur les envies du concept."],
    ["Vitrophanie dépolie", "Film translucide en bas de vitrine. Isole visuellement la salle de la rue tout en gardant la lumière."],
    ["Licence III / licence IV", "Catégories de licence de débit de boissons. La licence détenue fait partie des affichages obligatoires."]
  ],
  services: ["enseignes", "vitrophanie-plv", "impression-grand-format", "signaletique"]
},
{
  slug: "cabinet-medical",
  nav: "Santé & professions libérales",
  h1: "Plaque et signalétique pour cabinet médical et profession libérale",
  title: "Plaque Professionnelle & Signalétique Cabinet Médical, Avocat, Notaire",
  desc: "Plaque professionnelle gravée, totem multi-praticiens, signalétique de cabinet, accessibilité PMR. Devis de graveurs et enseignistes partout en France.",
  topic: "signaletique-int", topicAlt: ["totem", "signaletique"],
  lead: "Pour une profession libérale, la plaque est un acte encadré : chaque ordre professionnel fixe ce qui peut y figurer, et parfois ses dimensions. La signalétique intérieure, elle, relève de l'accessibilité et de la confidentialité — deux exigences que peu de cabinets traitent correctement.",
  besoins: [
    ["Plaque professionnelle", "Laiton gravé, plexiglas satiné, inox brossé ou verre. Nom, titre, spécialité, numéro d'inscription à l'ordre, horaires et modalités de rendez-vous."],
    ["Totem multi-praticiens", "Pour maison de santé, cabinet de groupe ou immeuble médical : platines individuelles interchangeables, permettant d'ajouter ou de retirer un praticien sans refaire le support."],
    ["Signalétique d'orientation", "Fléchage depuis la rue et le parking, indication de l'étage, de l'ascenseur et de la salle d'attente. Le premier motif d'appel à l'accueil est « je ne trouve pas »."],
    ["Signalétique de porte", "Identification des salles de consultation, de soins, du secrétariat et des sanitaires, avec porte-nom interchangeable pour les remplaçants et internes."],
    ["Accessibilité PMR", "Caractères en relief et braille, contraste supérieur à 70 %, pose entre 0,90 m et 1,30 m, bande de vigilance en haut d'escalier, repérage des parois vitrées."],
    ["Confidentialité", "Film dépoli sur les vitrages de salle de soins et de secrétariat, marquage au sol de la ligne d'attente devant l'accueil."]
  ],
  specifics: [
    "Chaque profession a ses règles. Le <strong>Code de déontologie médicale</strong> encadre strictement le contenu de la plaque du médecin : elle doit rester d'aspect sobre et ne comporter que les indications utiles à l'information du patient. Les ordres des avocats, notaires, architectes ou experts-comptables ont leurs propres textes, parfois assortis de dimensions maximales.",
    "Un cabinet ouvert au public est un <strong>établissement recevant du public</strong>, généralement de 5e catégorie. Il est donc soumis aux obligations d'accessibilité : signalétique en relief et braille pour les informations essentielles, contraste visuel, hauteur de pose à portée de main, repérage des parois vitrées.",
    "La <strong>confidentialité</strong> est un point trop souvent négligé. Un film dépoli sur la vitre du secrétariat et une ligne d'attente marquée au sol à un mètre du comptoir coûtent quelques centaines d'euros et règlent une bonne part du problème."
  ],
  budget: [
    ["Plaque gravée laiton 30 × 20 cm", "120 – 350 €"],
    ["Plaque plexiglas satiné avec entretoises", "90 – 260 €"],
    ["Totem multi-praticiens 6 platines", "900 – 2 800 €"],
    ["Signalétique de portes (10 portes)", "350 – 1 100 €"],
    ["Pack accessibilité PMR (relief + braille)", "400 – 1 500 €"],
    ["Film dépoli confidentialité (secrétariat)", "180 – 600 €"]
  ],
  faq: [
    { q: "Que peut-on écrire sur une plaque de médecin ?", a: "Les indications utiles à l'information du patient : nom, prénom, spécialité et qualifications reconnues, numéro d'inscription à l'ordre, horaires, modalités de prise de rendez-vous, situation vis-à-vis des conventions. Le Code de déontologie impose un aspect sobre et proscrit tout caractère publicitaire. En cas de doute, le conseil départemental de l'ordre valide un projet de plaque avant fabrication." },
    { q: "Combien de plaques peut-on apposer ?", a: "L'usage courant est d'une plaque à l'entrée de l'immeuble et d'une à la porte du cabinet. En copropriété, l'accord de l'assemblée générale est nécessaire pour la plaque de rue, et le règlement peut imposer un format et un emplacement communs — d'où l'intérêt du totem à platines pour un immeuble médical." },
    { q: "La signalétique braille est-elle obligatoire dans un cabinet ?", a: "Pour les informations essentielles à l'usage des lieux — identification des salles, sanitaires, boutons d'ascenseur, numéros d'étage — oui, dès lors que le cabinet reçoit du public. Le doublage en relief et en braille concerne les éléments posés à hauteur de main, entre 0,90 m et 1,30 m." }
  ],

  /* ----------------------------------------------------------------------
     Cabinet médical : le secteur où la règle ne limite pas la forme mais le
     CONTENU. Le code de déontologie énumère limitativement ce qui peut
     figurer sur une plaque — tout le reste est interdit, y compris ce qu'un
     commerçant trouverait normal d'écrire. C'est l'inverse de tous les
     autres secteurs traités, et c'est ce qui piège l'enseigniste
     généraliste : il fait de la belle signalétique commerciale, et elle
     est irrégulière.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre la plaque et la signalétique d'un cabinet",
    lead: "Ici, la contrainte ne porte pas d'abord sur la taille ou l'emplacement : elle porte sur <em>ce que vous avez le droit d'écrire</em>. La liste des mentions autorisées est limitative, et tout ce qui n'y figure pas est à proscrire.",
    couches: [
      {
        titre: "1 · La plaque : une liste fermée de mentions",
        texte: "L'article R.4127-81 du code de la santé publique — article 81 du code de déontologie médicale — énumère les seules indications qu'un médecin peut faire figurer à son lieu d'exercice : <strong>ses nom et prénoms, son numéro de téléphone, les jours et heures de consultation, sa situation vis-à-vis des organismes d'assurance maladie, ainsi que ses diplômes, titres et qualifications reconnus</strong>. Ces indications doivent être « présentées avec discrétion, conformément aux usages de la profession ».",
        cle: "C'est une <strong>liste limitative</strong> : ce qui n'y est pas n'a pas sa place. Pas de slogan, pas de logo commercial, pas de liste de prestations, pas de mention valorisante. Un enseigniste habitué aux commerces produit spontanément l'inverse — et c'est le conseil de l'Ordre, pas le client, qui le lui fera remarquer. Sur le format, les 30 × 25 cm souvent cités relèvent de l'usage de la profession, pas d'une dimension inscrite dans le texte : c'est la discrétion qui est la règle.",
        source: { label: "Article R.4127-81 du code de la santé publique — mentions sur les plaques", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042795641" }
      },
      {
        titre: "2 · Combien de plaques, et où",
        texte: "Le même article prévoit qu'<strong>une plaque peut être apposée à l'entrée de l'immeuble et une autre à la porte du cabinet</strong>. Lorsque la disposition des lieux l'impose — cour, étage, bâtiment en retrait, cabinet de groupe — une <strong>signalisation intermédiaire</strong> peut s'y ajouter.",
        cle: "C'est la marge de manœuvre réelle du praticien, et elle est souvent ignorée : dans un immeuble complexe ou un cabinet pluriprofessionnel, le jalonnement intermédiaire est admis et il résout la plupart des problèmes d'orientation du patient. Encore faut-il qu'il reste dans le même registre de discrétion que les plaques, et qu'il soit conçu comme une aide au repérage, non comme une signalétique d'appel.",
        source: { label: "Article 81 du code de déontologie médicale — Conseil national de l'Ordre des médecins", url: "https://www.conseil-national.medecin.fr/code-deontologie/lexercice-profession-art-69-108/1-regles-communes-modes-dexercice-art-69-84-13" }
      },
      {
        titre: "3 · L'accessibilité : un registre, et un résumé affiché",
        texte: "Un cabinet recevant des patients est un <strong>établissement recevant du public</strong>, en cinquième catégorie le plus souvent. À ce titre, il doit tenir un <strong>registre public d'accessibilité</strong>, dont le contenu et les modalités de diffusion sont fixés par l'arrêté du 19 avril 2017, obligatoire depuis le 30 septembre 2017. Le registre se consulte sur place, au point d'accueil accessible, sur papier ou sur support numérique.",
        cle: "Le point qui devient un sujet de signalétique : le praticien doit <strong>en afficher un résumé de manière visible dans ses locaux</strong>, pour informer les patients des conditions d'accessibilité et des travaux réalisés ou en cours. S'y ajoutent les obligations matérielles de repérage — contraste des nez de marche, bandes de vigilance, repérage des parois vitrées — qui relèvent de la réglementation ERP et non du code de déontologie.",
        source: { label: "Registre d'accessibilité obligatoire — guide pour les ERP (handicap.gouv.fr)", url: "https://handicap.gouv.fr/registre-daccessibilite-obligatoire-un-guide-pour-les-erp" }
      },
      {
        titre: "4 · Ce qui relève de l'immeuble, pas de vous",
        texte: "Une plaque apposée sur la façade ou dans le hall d'un immeuble en copropriété touche aux <strong>parties communes</strong>. Son installation relève de ce que permettent le règlement de copropriété et, le cas échéant, une décision d'assemblée générale. En secteur protégé ou aux abords d'un monument historique, l'accord de l'architecte des Bâtiments de France s'ajoute pour toute intervention visible depuis l'espace public.",
        cle: "Conséquence pratique sur le calendrier, et elle surprend : <strong>le délai n'est pas celui de la fabrication, il est celui de l'assemblée générale</strong>. Une plaque se grave en quelques jours ; l'autorisation de la poser sur une partie commune peut attendre plusieurs mois. C'est la première chose à vérifier lors d'une installation ou d'un transfert de cabinet.",
        source: { label: "Code de l'environnement — enseignes et préenseignes (L.581-3)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006159442/" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Les règles déontologiques varient d'une profession de santé à l'autre — médecins, chirurgiens-dentistes, sages-femmes, auxiliaires médicaux relèvent chacun de leur propre code. En cas de doute sur une mention, le conseil départemental de votre ordre répond, et il vaut mieux l'interroger avant la gravure qu'après."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand un cabinet refait sa signalétique",
    lead: "Un cabinet n'achète pas de la signalétique pour se faire remarquer, mais parce qu'un événement l'y oblige. D'où des besoins précis et des délais courts.",
    moments: [
      ["Installation ou transfert", "Le déclencheur principal : plaques d'entrée et de porte, jalonnement intermédiaire, accessibilité. Le délai réel est celui de la copropriété, pas celui de la gravure."],
      ["Arrivée ou départ d'un associé", "En cabinet de groupe, chaque mouvement modifie la plaque collective. C'est un besoin récurrent et modeste, mais qui fidélise — le praticien revient chez celui qui a la gravure d'origine."],
      ["Nouveau titre ou nouvelle qualification", "Un titre reconnu peut être mentionné : la plaque est reprise. L'occasion de vérifier que les mentions existantes sont toujours conformes."],
      ["Mise en accessibilité", "Travaux, contrôle, ou simple mise à jour du registre : contraste des marches, bandes de vigilance, repérage des vitrages, résumé du registre à afficher."],
      ["Regroupement en maison de santé", "Plusieurs praticiens sous un même toit : jalonnement complet, signalétique de couloir, identification des salles. C'est le chantier le plus important du secteur, et celui qui demande une vraie conception."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur un cabinet, une question mal posée conduit à une plaque irrégulière — donc à refaire. Nous les posons toutes en amont.",
    questions: [
      "Quelle profession de santé, et quel ordre en relève ? Les règles ne sont pas identiques d'un code de déontologie à l'autre.",
      "Quelles mentions exactes doivent figurer : nom, prénoms, téléphone, jours et heures, situation au regard de l'assurance maladie, titres reconnus ?",
      "Exercice individuel ou de groupe ? Une plaque collective ou une plaque par praticien ?",
      "Plaque d'entrée d'immeuble, plaque de porte, ou les deux ? Une signalisation intermédiaire est-elle nécessaire au vu de la disposition des lieux ?",
      "L'immeuble est-il en copropriété ? L'accord de l'assemblée générale est-il obtenu, ou à demander ?",
      "Le bâtiment est-il en secteur protégé ou aux abords d'un monument historique ?",
      "Matière et fixation souhaitées : laiton, inox, plexiglas, gravure ou impression ? Pose en applique ou entretoises ?",
      "Le registre public d'accessibilité est-il tenu, et son résumé affiché dans les locaux ?",
      "Y a-t-il des aménagements d'accessibilité à signaler : nez de marche, bandes de vigilance, parois vitrées à repérer ?",
      "Pour un cabinet de groupe ou une maison de santé : combien de salles à identifier, et quel parcours patient depuis l'entrée ?"
    ],
    note: "La question qui évite la reprise est la deuxième. Une mention non prévue par le code de déontologie — une spécialité non reconnue comme titre, un slogan, un logo — rend la plaque irrégulière quelle que soit sa qualité de fabrication."
  },

  vocabulaire: [
    ["Plaque professionnelle", "Support portant les mentions autorisées à l'entrée de l'immeuble ou à la porte du cabinet. Son contenu est limitativement fixé par le code de déontologie."],
    ["Signalisation intermédiaire", "Jalonnement admis lorsque la disposition des lieux l'impose : cour, étage, bâtiment en retrait. Aide au repérage, non support d'appel."],
    ["Gravure laiton", "La facture traditionnelle de la plaque médicale : laiton gravé et rempli d'émail. Durable, sobre, conforme aux usages de la profession."],
    ["Entretoises", "Pièces d'écartement qui décollent la plaque du mur. Donnent l'ombre portée caractéristique et facilitent le nettoyage du support."],
    ["ERP de 5e catégorie", "La classification usuelle d'un cabinet libéral au regard des établissements recevant du public. Elle commande les obligations d'accessibilité."],
    ["Registre public d'accessibilité", "Document consultable sur place depuis le 30 septembre 2017, dont un résumé doit être affiché visiblement dans les locaux."],
    ["Bande de vigilance", "Bande podotactile posée en haut d'un escalier pour avertir du danger. Obligation d'accessibilité, pas de déontologie."],
    ["Repérage des parois vitrées", "Marquage contrasté appliqué sur les vitrages pour les rendre perceptibles. Traité en vitrophanie discrète en milieu médical."],
    ["Maison de santé", "Regroupement pluriprofessionnel. Le seul cas du secteur où la signalétique devient un vrai projet de jalonnement."]
  ],
  services: ["signaletique", "enseignes", "vitrophanie-plv", "maquette-creation-graphique"]
},
{
  slug: "garage-automobile",
  nav: "Automobile & garage",
  h1: "Enseigne et signalétique pour garage, carrosserie et concession",
  title: "Enseigne Garage & Concession Auto — Totem, Marquage, Signalétique Atelier",
  desc: "Enseigne de garage, totem de concession, marquage de véhicules de courtoisie, signalétique d'atelier et de sécurité. Devis partout en France.",
  topic: "covering", topicAlt: ["totem", "signaletique-secu"],
  lead: "Un garage se signale de loin, depuis une voie circulée, et doit en même temps organiser un atelier où circulent véhicules et piétons. Deux exigences opposées — visibilité routière et sécurité interne — qui appellent des solutions différentes.",
  besoins: [
    ["Totem et enseigne de bord de route", "Totem lumineux double face en entrée de parcelle, lisible à 100 mètres et à 70 km/h. Hauteur de lettre calibrée sur la vitesse de passage, pas sur la taille du bâtiment."],
    ["Enseigne de façade et bandeau", "Habillage du bandeau atelier, lettres relief, caisson, mise en avant des marques et labels de réparation représentés."],
    ["Marquage des véhicules", "Véhicules de courtoisie, dépanneuses et véhicules d'intervention marqués : c'est une flotte publicitaire qui circule toute la journée sur votre zone de chalandise."],
    ["Signalétique d'atelier", "Identification des postes, des baies, du stockage des pneus et des déchets, marquage au sol des circulations piétonnes et des zones de sécurité."],
    ["Signalétique de sécurité", "Port des EPI, risques mécaniques et chimiques, extincteurs, issues de secours, consignes de levage, panneaux ISO 7010."],
    ["Accueil et réception", "Signalétique de comptoir, affichage réglementaire des tarifs horaires, présentoirs, habillage de la salle d'attente."]
  ],
  specifics: [
    "L'<strong>affichage des tarifs</strong> est une obligation dans les activités de réparation automobile : taux horaires de main-d'œuvre par catégorie, modalités de facturation, et information sur le devis. L'affichage doit être visible du client dans le lieu de réception.",
    "Le <strong>marquage au sol de l'atelier</strong> n'est pas décoratif : la séparation des flux piétons et véhicules est une exigence de prévention des risques. Une résine à froid ou un adhésif antidérapant technique tient plusieurs années malgré les passages de roues et les projections d'huile.",
    "Pour la signalétique de bord de route, appliquez la règle des <strong>3 cm de hauteur de lettre pour 10 mètres de lecture</strong>. Un totem lu à 100 mètres demande des lettres de 30 cm : c'est la première erreur de dimensionnement des garages installés en zone."
  ],
  budget: [
    ["Totem lumineux double face 3 m", "3 000 – 9 000 €"],
    ["Enseigne de façade lettres relief", "1 800 – 6 000 €"],
    ["Marquage d'un véhicule de courtoisie", "200 – 700 €"],
    ["Marquage au sol atelier (300 m²)", "1 200 – 4 000 €"],
    ["Pack signalétique de sécurité atelier", "400 – 1 500 €"],
    ["Habillage vitrine et réception", "600 – 2 500 €"]
  ],
  faq: [
    { q: "Faut-il une autorisation pour un totem en bord de route ?", a: "Oui. Un totem est une enseigne scellée au sol : elle est soumise à autorisation préalable dans les communes dotées d'un règlement local de publicité, et le nombre comme la surface autorisés dépendent de la longueur de votre façade sur voie publique. En bord de route départementale ou nationale, des règles de recul et de sécurité routière s'ajoutent." },
    { q: "Marquer les véhicules de courtoisie, est-ce rentable ?", a: "C'est l'un des meilleurs rapports coût-visibilité du secteur. Un marquage à 300 € sur un véhicule qui circule quotidiennement sur votre zone génère plusieurs dizaines de milliers de contacts par mois, pour un amortissement de quelques mois. Prévoyez simplement le budget de dépose si les véhicules sont en location longue durée." },
    { q: "Quel marquage au sol résiste à l'huile et aux pneus ?", a: "La résine à froid bi-composant pour les zones les plus sollicitées, et l'adhésif technique antidérapant pour les circulations piétonnes. Le simple adhésif de bureau ne tient pas trois mois dans un atelier. La préparation du support — sol dégraissé, sec, non poreux — conditionne autant la tenue que le produit lui-même." }
  ],

  /* ----------------------------------------------------------------------
     Garage : le secteur où l'enseigne n'est pas qu'un choix commercial mais
     une obligation légale sanctionnée. L'arrêté du 27 mars 1987 impose un
     affichage des prix « visible et lisible de l'extérieur » — autrement
     dit, de la signalétique extérieure imposée par la loi, que la DGCCRF
     contrôle et verbalise. C'est l'argument le plus direct de tout le site :
     le lecteur découvre qu'il est peut-être en infraction, et la mise en
     conformité est exactement ce que le réseau vend.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre l'enseigne et l'affichage d'un garage",
    lead: "Le garage est le seul de nos secteurs où la signalétique extérieure est une obligation légale assortie d'une amende. Ce n'est pas une question d'image : c'est un poste de conformité, et la DGCCRF le contrôle.",
    couches: [
      {
        titre: "1 · L'affichage des prix : obligatoire, et à l'extérieur",
        texte: "L'arrêté du 27 mars 1987 impose aux entreprises d'entretien, de réparation, de contrôle technique, de dépannage, de remorquage et de garage de véhicules un affichage <strong>à l'entrée de l'établissement, visible et lisible depuis l'extérieur</strong> : les taux horaires TTC et les prix TTC des prestations forfaitaires. Le même affichage doit être repris au lieu de réception de la clientèle. Lorsque les prix reposent sur un taux horaire, le <strong>mode de calcul doit être précisé</strong> — temps réellement passé, ou barème de temps.",
        cle: "Les manquements sont sanctionnés par une <strong>amende administrative pouvant atteindre 3 000 € pour une personne physique et 15 000 € pour une personne morale</strong>. Et le sujet n'est pas théorique : l'enquête de la DGCCRF sur la loyauté de l'information en entretien et réparation automobile relève que <strong>quatre contrôles sur dix ont donné lieu à des mesures correctives ou répressives</strong>, l'affichage incomplet figurant parmi les anomalies les plus fréquentes.",
        source: { label: "Arrêté du 27 mars 1987 relatif aux règles de publicité des prix (entretien, réparation, contrôle technique, dépannage, remorquage, garage)", url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000862823" }
      },
      {
        titre: "2 · Les marques de constructeur : ce que vous n'avez pas le droit d'afficher",
        texte: "Un réparateur agréé dispose d'un lien contractuel avec le constructeur, qui l'autorise à porter sa marque. Un réparateur indépendant, lui, ne l'a pas — et la jurisprudence a écarté des formules comme « <em>citroëniste indépendant</em> », jugées de nature à laisser croire à une affiliation qui n'existe pas.",
        cle: "La ligne est simple à retenir : vous pouvez <strong>indiquer les marques que vous entretenez</strong>, vous ne pouvez pas <strong>reprendre leurs logos ni une formulation qui suggère un agrément</strong>. C'est un point de conception, pas seulement de droit : il se règle au moment de dessiner le bandeau, avant la fabrication. Un totem refait parce qu'un logo constructeur y figurait est un totem payé deux fois.",
        source: { label: "Règlement (UE) n° 461/2010 sur les accords verticaux dans le secteur automobile", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32010R0461" }
      },
      {
        titre: "3 · L'autorisation d'enseigne et le totem de bord de route",
        texte: "Comme toute enseigne, celle d'un garage relève de l'article L.581-3 du code de l'environnement et d'une autorisation délivrée par le <strong>maire</strong>. Le totem mérite une attention particulière : implanté en limite de parcelle, en bord de voie circulée et souvent en zone d'activité, il cumule les contraintes de hauteur, de recul et parfois de sécurité routière.",
        cle: "Le point que l'on découvre trop tard : <strong>une enseigne scellée au sol est encadrée plus strictement qu'une enseigne murale</strong>, et le règlement local de publicité limite couramment leur nombre par établissement. Avant de dessiner un totem de trois mètres, il faut savoir combien d'enseignes au sol la commune autorise — et si la vôtre en compte déjà une.",
        source: { label: "Code de l'environnement — enseignes (R.581-58 et suivants)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006189035/" }
      },
      {
        titre: "4 · L'atelier : une signalétique qui relève du code du travail",
        texte: "À l'intérieur, on change de corpus. Le marquage des circulations, l'identification des issues de secours, la signalisation des risques et des équipements de protection relèvent du <strong>code du travail</strong> et des règles de santé et sécurité, pas du droit de l'enseigne. Les couleurs et les pictogrammes y sont normalisés.",
        cle: "Conséquence pratique pour le devis : <strong>l'atelier et la façade ne se chiffrent pas ensemble</strong>. La façade est un sujet d'image et d'urbanisme ; l'atelier est un sujet de conformité, avec des matériaux différents — adhésif de sol résistant au passage de véhicules, panneaux photoluminescents pour les issues. Confier les deux au même prestataire n'a de sens que s'il maîtrise les deux.",
        source: { label: "Code du travail — signalisation de santé et de sécurité au travail", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018532292/" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Le nombre d'enseignes au sol admises, les hauteurs et les reculs relèvent du règlement local de publicité de votre commune et se vérifient au cas par cas — c'est la première chose que fait l'enseigniste que nous vous présentons."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand un garage refait son enseigne",
    lead: "Cinq déclencheurs, dont deux sont subis et trois choisis.",
    moments: [
      ["Un contrôle DGCCRF", "Le plus fréquent, et le plus urgent. L'affichage extérieur des tarifs est relevé non conforme, un délai de mise en conformité est fixé. Le chantier est court, le besoin est précis, et le prix compte moins que le délai."],
      ["Changement de statut réseau", "Entrée ou sortie d'un agrément constructeur, passage en réseau multimarque : la façade et le totem doivent être refaits, et les logos déposés retirés. Le calendrier est imposé par le contrat."],
      ["Reprise ou transmission", "Le repreneur change le nom et veut marquer la rupture. Enseigne de façade, totem, marquage des véhicules de courtoisie — souvent le lot complet."],
      ["Extension ou réaménagement de l'atelier", "Nouvelle baie, nouveau pont, reprise des circulations : le marquage au sol et la signalétique de sécurité sont repris avec l'implantation."],
      ["Ajout d'une activité", "Contrôle technique, carrosserie, borne de recharge, dépannage : chaque activité nouvelle doit apparaître sur le totem et dans l'affichage des prix. C'est souvent ce qui fait passer l'établissement au-dessus du seuil de TLPE."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur un garage, la moitié des questions portent sur la conformité. Nous les posons une fois pour toutes.",
    questions: [
      "Quelles activités exercez-vous : entretien, réparation, carrosserie, contrôle technique, dépannage, vente ?",
      "Votre affichage des tarifs est-il aujourd'hui lisible depuis l'extérieur, à l'entrée de l'établissement ?",
      "Êtes-vous réparateur agréé d'une ou plusieurs marques, et le contrat vous autorise-t-il à porter leurs logos ?",
      "Enseigne murale, totem scellé au sol, ou les deux — et combien d'enseignes au sol existent déjà sur la parcelle ?",
      "Depuis quelle voie faut-il être vu, et à quelle vitesse de circulation ?",
      "La commune a-t-elle un règlement local de publicité ? La parcelle est-elle en zone d'activité ou en agglomération ?",
      "Surface cumulée des enseignes existantes, pour situer le projet face au seuil de TLPE.",
      "Pour l'atelier : surface à marquer, nombre de postes, circulations piétonnes à distinguer, passage de véhicules sur le marquage ?",
      "Combien de véhicules à marquer — courtoisie, dépannage, utilitaires — et faut-il un covering total ou un lettrage ?",
      "Y a-t-il un délai imposé par un contrôle, un contrat de réseau ou une ouverture ?"
    ],
    note: "La question qui change le plus le devis est celle des enseignes au sol déjà présentes sur la parcelle : elle décide si le totem est possible tel quel, ou s'il faut en déposer une autre."
  },

  vocabulaire: [
    ["Taux horaire TTC", "La base de facturation de la main-d'œuvre. Son affichage extérieur est obligatoire, tout comme la mention du mode de calcul retenu."],
    ["Barème de temps", "Temps forfaitaire par opération, publié par le constructeur ou par la profession. L'alternative au temps réellement passé — le choix doit être affiché."],
    ["Enseigne scellée au sol", "Totem, mât, chevalet fixé au terrain. Encadrée plus strictement que l'enseigne murale, et souvent limitée en nombre par le règlement local."],
    ["Recul", "Distance imposée entre l'enseigne au sol et la limite de propriété ou le bord de la voie."],
    ["Réparateur agréé", "Lié par contrat à un constructeur, donc autorisé à porter sa marque. À distinguer du réparateur indépendant, qui peut citer les marques qu'il entretient sans en reprendre les logos."],
    ["Marquage au sol d'atelier", "Adhésif ou peinture délimitant circulations, zones de travail et cheminements piétons. Relève du code du travail, pas du droit de l'enseigne."],
    ["Photoluminescent", "Matériau qui restitue la lumière accumulée. Employé pour les issues de secours, afin qu'elles restent lisibles en cas de coupure."],
    ["Covering total", "Habillage intégral d'un véhicule. À distinguer du lettrage, qui se limite à des éléments découpés posés sur la peinture d'origine."],
    ["Véhicule de courtoisie", "Prêté au client pendant l'immobilisation. Souvent le support publicitaire le plus rentable d'un garage : il roule, il stationne, il est vu."]
  ],
  services: ["covering-vehicule", "enseignes", "signaletique", "impression-grand-format"]
},
{
  slug: "coiffure-esthetique",
  nav: "Coiffure, beauté & bien-être",
  h1: "Enseigne et vitrine pour salon de coiffure, institut et barbier",
  title: "Enseigne Salon de Coiffure, Institut de Beauté & Barbier — Vitrine, Néon",
  desc: "Enseigne de salon, néon LED, vitrophanie, habillage de vitrine et signalétique de cabine. Devis d'enseignistes partout en France.",
  topic: "enseigne-lumineuse", topicAlt: ["vitrophanie", "commerce"],
  lead: "Dans la beauté, la vitrine fait le prix. Un salon dont on ne voit rien depuis la rue est perçu comme fermé ; un salon entièrement ouvert met ses clientes en vitrine. Le bon réglage se joue au centimètre, et c'est là que se gagne le panier moyen.",
  besoins: [
    ["Enseigne de façade", "Lettres relief, néon LED, caisson ou lettrage peint. La typographie porte le positionnement du salon plus que n'importe quel autre élément."],
    ["Néon LED et signature en salon", "Nom, slogan ou motif lumineux au-dessus du bac ou derrière la caisse : le fond de photo que vos clientes publieront elles-mêmes."],
    ["Vitrophanie et confidentialité", "Bandeau dépoli à hauteur de bac pour préserver l'intimité, prestations et tarifs en lettrage, habillage saisonnier."],
    ["Affichage des tarifs", "Obligation légale d'affichage visible depuis l'extérieur : plaque, vitrophanie ou cadre clic à l'entrée."],
    ["Signalétique intérieure", "Cabines, sanitaires, espace attente, indication des marques distribuées, habillage des meubles de vente."],
    ["Supports de communication", "Cartes de rendez-vous, chevalet trottoir, kakémono d'offre saisonnière, textile personnalisé pour l'équipe."]
  ],
  specifics: [
    "L'<strong>affichage des prix</strong> est obligatoire pour les prestations de service à la personne : la liste des prestations et leurs tarifs doivent être visibles et lisibles depuis l'extérieur de l'établissement, avant même d'entrer. Une vitrophanie propre remplace avantageusement l'affichette imprimée qui se décolore en trois mois.",
    "Le réglage de <strong>transparence</strong> est le vrai sujet. La pratique qui fonctionne : bandeau haut en lettrage pour le nom, zone médiane laissée transparente pour montrer l'activité, bandeau bas en dépoli à hauteur de bac pour l'intimité. On garde la lumière, on montre la vie du salon, on protège les clientes.",
    "Le <strong>néon LED intérieur</strong> est devenu un investissement de communication à part entière : il devient le fond des photos publiées par la clientèle, avec le nom du salon dessus. Pour 350 à 1 500 €, c'est souvent le poste au meilleur retour du projet."
  ],
  budget: [
    ["Enseigne lettres relief rétro-éclairées", "1 500 – 4 500 €"],
    ["Néon LED sur mesure (intérieur ou vitrine)", "350 – 1 500 €"],
    ["Vitrophanie complète (lettrage + dépoli)", "400 – 1 600 €"],
    ["Affichage tarifaire vitrine", "80 – 350 €"],
    ["Chevalet trottoir A1 double face", "70 – 220 €"],
    ["Textile personnalisé équipe (10 pièces)", "250 – 800 €"]
  ],
  faq: [
    { q: "Suis-je obligé d'afficher mes tarifs en vitrine ?", a: "Oui. Pour les prestations de service à la personne, la liste des prestations proposées et leurs prix doivent être lisibles depuis l'extérieur, de manière à ce que le client soit informé avant d'entrer. Une vitrophanie ou un cadre affiché à l'entrée satisfait à cette obligation et tient bien mieux dans le temps qu'une feuille imprimée." },
    { q: "Comment protéger l'intimité sans fermer la vitrine ?", a: "Le film dépoli en bandeau, posé à hauteur des bacs ou des postes de coiffage, est la solution standard : il masque à hauteur assise tout en laissant passer la lumière et en conservant la visibilité au-dessus. On peut y réserver le logo ou un motif en transparence pour en faire un élément de décor plutôt qu'un cache." },
    { q: "Quelle enseigne pour un barbier plutôt qu'un salon mixte ?", a: "Les codes diffèrent nettement. Le barbier fonctionne avec des matières sombres et chaudes — laiton, noir mat, bois, néon ambré — et une typographie à empattements ou une enseigne drapeau à l'ancienne. Le salon mixte contemporain va plutôt vers des lettres fines en blanc ou en inox brossé et un rétro-éclairage neutre. Le budget est comparable ; c'est le parti pris qui change." }
  ],
  services: ["enseignes", "vitrophanie-plv", "objets-publicitaires", "maquette-creation-graphique"]
},
{
  slug: "agence-immobiliere",
  nav: "Immobilier & agences",
  h1: "Enseigne et vitrine pour agence immobilière",
  title: "Enseigne Agence Immobilière — Vitrine, Porte-affiches, Panneaux",
  desc: "Enseigne d'agence immobilière, vitrine porte-affiches LED, panneaux À vendre, covering de véhicules et signalétique. Devis partout en France.",
  topic: "vitrophanie", topicAlt: ["enseigne", "impression-banderole"],
  lead: "L'agence immobilière est le commerce dont la vitrine travaille le plus : elle change chaque semaine, elle est lue debout pendant plusieurs minutes, et elle doit rester lisible de nuit. Un système d'affichage mal choisi se paie en heures de manipulation chaque semaine.",
  besoins: [
    ["Vitrine porte-affiches LED", "Systèmes suspendus par câbles ou sur pied, cadres A4 ou A3 rétro-éclairés, simple ou double face. Le changement d'annonce doit prendre quelques secondes, pas plusieurs minutes."],
    ["Enseigne de façade", "Lettres relief ou caisson aux couleurs du réseau, avec respect strict de la charte lorsque vous êtes en franchise."],
    ["Vitrophanie", "Bandeau de services (vente, location, gestion, syndic), coordonnées, horaires, mentions légales de carte professionnelle."],
    ["Panneaux de commercialisation", "Panneaux À vendre et Loué en Dibond ou PVC, kits de fixation sur balcon, grille ou façade, bâches de commercialisation pour les programmes neufs."],
    ["Marquage de véhicules", "Véhicules d'agence marqués : ils stationnent devant les biens visités, donc au cœur de votre zone de prospection."],
    ["Supports de prospection", "Flyers, sacs, calendriers, objets publicitaires distribués en boîtage sur les secteurs travaillés."]
  ],
  specifics: [
    "Les <strong>mentions professionnelles obligatoires</strong> doivent figurer de manière visible : numéro de carte professionnelle, autorité de délivrance, garantie financière et son montant, assurance de responsabilité civile professionnelle. Elles se traitent proprement en vitrophanie sur la porte ou le bas de vitrine.",
    "L'<strong>affichage des honoraires</strong> est obligatoire et doit être consultable depuis l'extérieur ainsi que sur le lieu de réception : barème TTC, base de calcul et partie qui en a la charge.",
    "Sur le choix technique, la <strong>vitrine LED double face</strong> coûte plus cher à l'achat mais rend l'annonce lisible depuis la rue et depuis l'intérieur, et l'éclairage lui permet de continuer à travailler après la fermeture — c'est-à-dire au moment où les gens se promènent et regardent les vitrines."
  ],
  budget: [
    ["Vitrine porte-affiches LED 6 × A4", "900 – 2 500 €"],
    ["Vitrine LED double face 8 × A3", "1 800 – 4 500 €"],
    ["Enseigne de façade lettres relief", "1 800 – 5 000 €"],
    ["Vitrophanie complète (services + mentions)", "400 – 1 500 €"],
    ["Panneaux À vendre (lot de 20)", "300 – 900 €"],
    ["Marquage véhicule d'agence", "300 – 1 200 €"]
  ],
  faq: [
    { q: "Quelles mentions doivent figurer sur ma vitrine ?", a: "Le numéro de carte professionnelle et l'autorité qui l'a délivrée, le nom et l'adresse du garant ainsi que le montant de la garantie financière, et les références de l'assurance de responsabilité civile professionnelle. S'y ajoute l'affichage du barème des honoraires TTC, consultable depuis l'extérieur." },
    { q: "Vitrine à câbles ou cadres LED individuels ?", a: "Les câbles offrent la souplesse de composition et un coût inférieur ; les cadres LED individuels sont plus lisibles de nuit et plus rapides à changer. Le critère décisif est le nombre de changements hebdomadaires : au-delà de dix annonces modifiées par semaine, le temps gagné par un système à ouverture rapide rembourse la différence en une saison." },
    { q: "En franchise, puis-je choisir librement mon enseigne ?", a: "Non, la charte du réseau s'impose généralement : matériaux, couleurs référencées, typographie, proportions et parfois fournisseurs agréés. Nous consultons alors des enseignistes capables de travailler sur charte imposée et de fournir un bon à tirer conforme, ce qui évite un refus de validation par le franchiseur après fabrication." }
  ],

  /* ----------------------------------------------------------------------
     Agence immobilière : le secteur où la loi va le plus loin, puisqu'elle
     ne se contente pas d'imposer un affichage — elle en spécifie le format
     et l'emplacement dans la vitrine. Autrement dit, le législateur écrit
     un cahier des charges de vitrophanie. C'est l'angle le plus précis des
     trois secteurs traités, et celui où le lecteur a le plus de chances de
     découvrir qu'il n'est pas à jour : la formulation exigée a changé le
     1er avril 2022 et beaucoup de vitrines portent encore l'ancienne.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce que la loi impose à votre vitrine",
    lead: "L'agence immobilière est le seul de nos secteurs où le texte ne dit pas seulement <em>ce qu'</em>il faut afficher, mais <em>à quel format et à quel emplacement</em>. La vitrine n'est pas un support libre : c'est un document réglementaire.",
    couches: [
      {
        titre: "1 · Le barème d'honoraires : format et emplacement imposés",
        texte: "L'arrêté du 10 janvier 2017 impose l'affichage du barème <strong>depuis l'extérieur, sur la vitrine de l'établissement</strong> — et il précise la forme : <strong>dans le même format et au même emplacement que celui normalement alloué aux annonces</strong> de vente ou de location. La même obligation vaut pour chaque vitrine publicitaire située hors établissement. Lorsque la vitrine est partagée entre plusieurs professionnels, une mention renvoyant à la consultation du barème sur simple demande peut s'y substituer.",
        cle: "Le point que beaucoup de vitrines n'ont pas intégré : depuis l'arrêté du 26 janvier 2022, applicable au <strong>1<sup>er</sup> avril 2022</strong>, il ne s'agit plus d'afficher les « prix effectivement pratiqués » mais les <strong>« prix maximums pratiqués »</strong>. Une vitrine refaite avant cette date porte une formulation qui n'est plus celle du texte. Le manquement est sanctionné par une amende administrative d'au plus <strong>3 000 € pour une personne physique et 15 000 € pour une personne morale</strong>.",
        source: { label: "Arrêté du 10 janvier 2017 relatif à l'information des consommateurs par les professionnels intervenant dans une transaction immobilière", url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000033888549" }
      },
      {
        titre: "2 · La loi Hoguet : ce qui doit figurer à côté du barème",
        texte: "Le titulaire de la carte professionnelle doit apposer de manière visible, <strong>en vitrine et dans les lieux où est reçue la clientèle</strong> : le <strong>numéro de la carte professionnelle</strong>, les mentions relatives à la <strong>garantie financière</strong> — dénomination et coordonnées du garant, montant — ou, à défaut, la mention de non-perception de fonds, ainsi que le <strong>barème des honoraires TTC</strong>.",
        cle: "Ces mentions sont permanentes, alors que les annonces tournent chaque semaine. C'est ce qui commande la conception : <strong>les mentions légales se traitent en vitrophanie fixe, jamais sur une feuille glissée dans un porte-affiche</strong>. Un A4 punaisé qui jaunit ou qui tombe est le premier signe relevé lors d'un contrôle, et c'est aussi ce que voit le vendeur qui hésite entre deux agences.",
        source: { label: "Professionnels de l'immobilier : les règles à connaître (DGCCRF)", url: "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/professionnels-de-limmobilier-les-regles-connaitre" }
      },
      {
        titre: "3 · L'enseigne et le réseau",
        texte: "Comme partout, l'enseigne de façade relève de l'article L.581-3 du code de l'environnement et d'une autorisation du <strong>maire</strong>, avec l'accord de l'architecte des Bâtiments de France en secteur protégé — situation fréquente pour une agence, qui s'installe volontiers en centre-ville ancien et en pied d'immeuble.",
        cle: "Particularité du secteur : beaucoup d'agences appartiennent à un <strong>réseau qui impose une charte</strong> — couleurs, typographie, implantation du bandeau, gabarit des panneaux de commercialisation. Le poseur doit savoir lire un cahier des charges de réseau et le concilier avec le règlement local, qui ne connaît pas votre charte. Quand les deux se contredisent, <strong>c'est le règlement local qui l'emporte</strong>, et il faut le faire arbitrer avant fabrication, pas devant la façade.",
        source: { label: "Code de l'environnement — enseignes (R.581-58 et suivants)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006189035/" }
      },
      {
        titre: "4 · Les panneaux de commercialisation, hors de l'agence",
        texte: "Le panneau « À vendre » posé sur un bien n'est pas une enseigne au sens du code de l'environnement : il ne signale pas l'activité exercée sur place, mais un bien à commercialiser. Sa pose relève de l'accord du propriétaire, et en copropriété de ce que permettent le règlement de copropriété et les décisions d'assemblée générale.",
        cle: "En conséquence : <strong>un panneau en façade d'immeuble collectif se heurte régulièrement au règlement de copropriété</strong>, et la question se pose avant l'impression du lot, pas après. C'est aussi ce qui détermine le format : un panneau de balcon, un panneau de clôture et un panneau de vitrine n'ont ni la même fixation ni la même résistance au vent.",
        source: { label: "Code de l'environnement — définitions (L.581-3)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006159442/" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Le format exact, les dimensions admises en façade et les contraintes de secteur protégé relèvent du règlement local de publicité de votre commune, et votre charte de réseau s'y ajoute — c'est la première chose que vérifie l'enseigniste que nous vous présentons."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand une agence refait sa vitrine",
    lead: "La vitrine d'agence est le support qui vieillit le plus vite du commerce de centre-ville : elle est lue debout, longuement, et de près.",
    moments: [
      ["Une mise en conformité", "Un contrôle, ou simplement la lecture du texte : le barème n'est pas au bon format, les mentions ne sont plus à jour depuis avril 2022, la garantie financière a changé de garant. Le besoin est précis et le délai court."],
      ["Un changement de réseau ou d'indépendance", "Entrée dans une enseigne nationale, sortie vers l'indépendance, changement de franchise : tout est repris — bandeau, vitrophanie, panneaux, véhicules. C'est le lot complet, avec un calendrier imposé par le contrat."],
      ["L'ouverture ou le transfert d'agence", "Le chantier doit être terminé le jour de l'ouverture, mentions légales comprises : une agence ne peut pas recevoir de clientèle sans son affichage réglementaire."],
      ["Le passage aux vitrines LED", "Remplacement des porte-affiches classiques par des cadres lumineux : c'est le poste qui change le plus la perception nocturne, et le seul qui fait travailler la vitrine quand l'agence est fermée."],
      ["Le renouvellement du parc de panneaux", "Les panneaux de commercialisation se dégradent en une à deux saisons dehors. Leur renouvellement est régulier et se commande par lots — c'est un volume constant plutôt qu'un chantier."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur une agence, la conformité et le design se décident ensemble : c'est la loi qui fixe une partie du plan de vitrine.",
    questions: [
      "Quelle surface de vitrine, et combien d'emplacements d'annonces — le barème doit occuper le même format et le même emplacement.",
      "Porte-affiches LED ou vitrophanie seule ? Simple ou double face, et pour quel format d'annonce : A4, A3, A2 ?",
      "Vos mentions légales sont-elles à jour : numéro de carte professionnelle, garant, montant de la garantie financière, ou non-perception de fonds ?",
      "Votre affichage porte-t-il bien la mention des « prix maximums pratiqués », exigée depuis le 1er avril 2022 ?",
      "Appartenez-vous à un réseau, et disposez-vous de sa charte graphique et de son cahier des charges technique ?",
      "La vitrine est-elle partagée avec un autre professionnel ? Cela change le régime d'affichage du barème.",
      "L'agence est-elle en secteur protégé ou aux abords d'un monument historique ?",
      "Enseigne de façade : bandeau, lettres relief, caisson ? Une enseigne drapeau est-elle envisagée, et la saillie est-elle admise ?",
      "Panneaux de commercialisation : quel volume annuel, quels formats, quelles fixations — balcon, clôture, façade d'immeuble ?",
      "Véhicules à marquer, et faut-il un covering ou un lettrage amovible sur véhicule en leasing ?"
    ],
    note: "La question qui structure tout le reste est la première : le nombre d'emplacements d'annonces. C'est elle qui détermine la place que le barème doit occuper, donc le plan de vitrine, donc le devis."
  },

  vocabulaire: [
    ["Barème d'honoraires", "Le document qui liste les prix maximums pratiqués par prestation. Affichage obligatoire en vitrine, au format des annonces."],
    ["Carte professionnelle", "La carte T et ses déclinaisons, délivrées par la CCI. Son numéro doit figurer en vitrine et dans les lieux de réception."],
    ["Garantie financière", "Couvre les fonds détenus pour le compte de tiers. Nom du garant, coordonnées et montant s'affichent — sauf mention de non-perception de fonds."],
    ["Porte-affiche LED", "Cadre lumineux recevant une annonce imprimée. Simple face côté vitrine, double face pour être lu du trottoir et de l'intérieur."],
    ["Vitrophanie fixe", "Adhésif appliqué sur le vitrage, par opposition au document glissé dans un cadre. C'est le support des mentions permanentes."],
    ["Bandeau", "La partie horizontale de l'enseigne, au-dessus de la vitrine. Support principal du nom de l'agence."],
    ["Enseigne drapeau", "Perpendiculaire à la façade, lisible dans l'axe de la rue. Sa saillie est plafonnée par le règlement local."],
    ["Panneau de commercialisation", "Le « à vendre » ou « à louer » posé sur le bien. Ce n'est pas une enseigne au sens du code de l'environnement."],
    ["Dépoli", "Film translucide. En agence, il sert surtout à isoler visuellement les bureaux de négociation depuis la rue."]
  ],
  services: ["vitrophanie-plv", "enseignes", "impression-grand-format", "covering-vehicule"]
},
{
  slug: "batiment-artisan",
  nav: "Bâtiment & artisans",
  h1: "Marquage et signalétique pour artisans et entreprises du bâtiment",
  title: "Marquage Véhicule & Panneau de Chantier — Artisans, BTP, Bâtiment",
  desc: "Marquage de véhicules utilitaires, panneaux de chantier, bâches de palissade, vêtements de travail marqués. Devis partout en France.",
  topic: "covering", topicAlt: ["signaletique-secu", "pose"],
  lead: "Pour un artisan, le véhicule est le premier support publicitaire et le panneau de chantier le deuxième. Ensemble, ils coûtent moins qu'une campagne locale d'un mois et travaillent pendant des années sur exactement la bonne zone de chalandise.",
  besoins: [
    ["Marquage de l'utilitaire", "Nom, métier, téléphone, site, ville d'intervention. Le semi-covering imprimé est mémorisé environ trois fois mieux qu'un simple lettrage, pour un coût qui reste modeste."],
    ["Panneau de chantier", "Panneau réglementaire de permis de construire, panneau d'entreprise avec logos des intervenants, fléchage d'accès et balisage de sécurité."],
    ["Bâches de palissade", "Habillage des palissades et échafaudages en bâche mesh imprimée : la plus grande surface publicitaire dont vous disposerez jamais, en plein centre-ville."],
    ["Vêtements de travail marqués", "Vestes, pantalons, polos et parkas au nom de l'entreprise, dans le respect des zones de marquage autorisées sur les EPI certifiés."],
    ["Signalétique de sécurité", "Panneaux ISO 7010, port des EPI, risques de chute, balisage de zone, consignes de chantier."],
    ["Supports commerciaux", "Cartes, plaquettes, autocollants d'intervention, calendriers et objets publicitaires laissés chez le client après travaux."]
  ],
  specifics: [
    "Le <strong>panneau de permis de construire</strong> est obligatoire dès l'obtention de l'autorisation : il doit être visible depuis la voie publique, mesurer au moins 80 cm de côté, et rester en place pendant toute la durée du chantier. Son contenu est réglementé — nom du bénéficiaire, date et numéro du permis, nature des travaux, surface, hauteur, adresse de la mairie où le dossier est consultable.",
    "Sur les <strong>vêtements haute visibilité</strong> certifiés EN ISO 20471, un marquage mal placé peut faire perdre au vêtement sa classe de visibilité en réduisant la surface de matière fluorescente ou en empiétant sur les bandes rétro-réfléchissantes. Les fabricants publient des gabarits de zones autorisées : un fournisseur sérieux les respecte et vous le confirme par écrit.",
    "Une <strong>bâche mesh</strong> sur échafaudage est un support publicitaire à part entière, souvent soumis à autorisation et parfois à la taxe locale sur la publicité extérieure lorsqu'elle dépasse le simple habillage de chantier. Vérifiez auprès de la commune avant de la commander."
  ],
  budget: [
    ["Lettrage simple utilitaire (2 flancs + arrière)", "200 – 450 €"],
    ["Semi-covering utilitaire imprimé", "700 – 1 500 €"],
    ["Panneau de permis de construire réglementaire", "60 – 180 €"],
    ["Panneau de chantier 2 × 1 m sur pieds", "250 – 700 €"],
    ["Bâche mesh de palissade 10 m²", "300 – 900 €"],
    ["Vêtements de travail marqués (10 pièces)", "300 – 900 €"]
  ],
  faq: [
    { q: "Quel marquage de véhicule pour un artisan qui débute ?", a: "Commencez par un lettrage propre sur les deux flancs et l'arrière : nom, métier, téléphone, ville. Comptez 200 à 450 € sur un utilitaire compact. C'est l'investissement publicitaire au meilleur retour pour une entreprise qui démarre. Le semi-covering imprimé se justifie ensuite, quand l'identité visuelle est stabilisée." },
    { q: "Le panneau de permis de construire est-il vraiment obligatoire ?", a: "Oui, et il conditionne le point de départ du délai de recours des tiers. Il doit être installé dès l'obtention du permis, rester visible depuis la voie publique pendant toute la durée des travaux, et mesurer au minimum 80 cm de côté. Un affichage incomplet ou interrompu peut prolonger le délai pendant lequel un recours reste possible." },
    { q: "Peut-on marquer des vêtements de sécurité sans perdre la certification ?", a: "Oui, en respectant les zones de marquage définies par le fabricant et en ne réduisant pas la surface fluorescente sous le seuil de la classe visée. Concrètement : pas de marquage sur les bandes rétro-réfléchissantes, et surface limitée dans le dos et sur la poitrine. Les fournisseurs du réseau travaillent à partir des gabarits officiels des marques." }
  ],
  services: ["covering-vehicule", "impression-grand-format", "objets-publicitaires", "signaletique"]
},
{
  slug: "industrie-logistique",
  nav: "Industrie & logistique",
  h1: "Signalétique industrielle, sécurité et marquage d'entrepôt",
  title: "Signalétique Industrielle & Entrepôt — Sécurité, Marquage au Sol, Racks",
  desc: "Signalétique de sécurité ISO 7010, marquage au sol d'entrepôt, identification des racks et des zones, plans d'évacuation. Devis partout en France.",
  topic: "signaletique-secu", topicAlt: ["marquage-sol", "atelier"],
  lead: "Sur un site industriel, la signalétique est d'abord un outil de prévention, ensuite un outil de productivité. Un entrepôt correctement repéré réduit les erreurs de picking et les temps de recherche autant qu'il réduit les presque-accidents.",
  besoins: [
    ["Signalétique de sécurité", "Panneaux ISO 7010 d'interdiction, d'obligation, d'avertissement, de sauvetage et de lutte contre l'incendie, en version photoluminescente pour les cheminements d'évacuation."],
    ["Plans d'évacuation et d'intervention", "Conformes à la norme NF X 08-070, avec repérage vous-êtes-ici, cheminements, points de rassemblement et moyens de secours."],
    ["Marquage au sol", "Allées de circulation, zones piétonnes, zones de stockage et de dépose, passages piétons, marquage des issues et des abords d'équipements."],
    ["Identification des racks et des zones", "Étiquettes d'allée, de travée, de niveau et d'emplacement, plaques de charge maximale, codes-barres et repères visuels de picking."],
    ["Signalétique de quai", "Numérotation des quais, sens de circulation, consignes de calage, protocole de sécurité pour les chauffeurs extérieurs."],
    ["Identification des équipements", "Plaques de machines, repérage des réseaux et vannes, consignation, étiquetage ATEX en zones à risque d'explosion."]
  ],
  specifics: [
    "Les pictogrammes de sécurité doivent suivre la norme <strong>ISO 7010</strong>, qui harmonise les symboles pour qu'ils soient compris quelle que soit la langue de l'opérateur — un enjeu réel sur les sites employant des intérimaires et des chauffeurs étrangers.",
    "Les <strong>plans d'évacuation</strong> relèvent de la norme NF X 08-070 : orientation dans le sens de lecture réelle du lecteur, repérage du point où il se trouve, cheminements et issues, emplacement des moyens de secours. Un plan mal orienté est un plan que personne ne sait lire en situation de stress.",
    "Le <strong>marquage au sol</strong> d'un entrepôt subit les roues de chariots, les rotations sur place et les projections. La résine à froid bi-composant est la seule solution réellement durable en zone de circulation intense ; l'adhésif technique convient aux zones piétonnes et aux marquages appelés à évoluer.",
    "En atmosphère explosible, l'<strong>étiquetage ATEX</strong> des zones et des équipements est une obligation réglementaire, et il s'accompagne d'un document relatif à la protection contre les explosions."
  ],
  budget: [
    ["Pack signalétique de sécurité (site 1 000 m²)", "800 – 3 000 €"],
    ["Plan d'évacuation NF X 08-070 (par plan)", "120 – 400 €"],
    ["Marquage au sol résine (500 m linéaires)", "2 500 – 8 000 €"],
    ["Identification de racks (100 emplacements)", "600 – 2 200 €"],
    ["Signalétique de quais (10 quais)", "700 – 2 500 €"],
    ["Totem d'entrée de site", "2 000 – 7 000 €"]
  ],
  faq: [
    { q: "Quels panneaux de sécurité sont obligatoires ?", a: "Ceux qui correspondent aux risques réellement présents sur votre site, identifiés dans le document unique d'évaluation des risques : obligations d'EPI, avertissements de danger, interdictions, balisage des issues de secours et localisation des moyens de lutte contre l'incendie. Il n'existe pas de liste universelle — c'est l'analyse des risques qui détermine la signalétique." },
    { q: "Adhésif ou résine pour le marquage au sol d'un entrepôt ?", a: "Résine à froid dans les allées de circulation de chariots, où les rotations sur place arrachent tout adhésif en quelques mois. Adhésif technique antidérapant dans les zones piétonnes, les bureaux et les marquages temporaires ou appelés à évoluer. Dans les deux cas, la préparation du support conditionne la tenue autant que le produit." },
    { q: "À quelle fréquence renouveler la signalétique de sécurité ?", a: "Dès qu'elle devient illisible, décolorée ou obsolète, et systématiquement après toute modification des installations, des flux ou des risques. Un contrôle annuel intégré à la mise à jour du document unique est la pratique la plus simple à tenir dans le temps." }
  ],
  services: ["signaletique", "impression-grand-format", "pose-nacelle", "objets-publicitaires"]
},
{
  slug: "commerce-detail",
  nav: "Commerce de détail",
  h1: "Enseigne, vitrine et PLV pour commerce de détail",
  title: "Enseigne & Vitrine de Magasin — Commerce, Boutique, Retail",
  desc: "Enseigne de magasin, habillage de vitrine, PLV, signalétique de rayon et affichage promotionnel. Devis d'enseignistes partout en France.",
  topic: "commerce", topicAlt: ["vitrophanie", "plv"],
  lead: "Un commerce dispose de trois secondes pour arrêter un passant, et d'une seconde et demie pour capter l'attention à l'intérieur. L'enseigne, la vitrine et la PLV travaillent sur ces trois moments — et se conçoivent ensemble, pas séparément.",
  besoins: [
    ["Enseigne de façade", "Lettres relief, caisson, enseigne drapeau et bandeau, dimensionnés selon la distance de lecture réelle de votre rue."],
    ["Habillage de vitrine", "Vitrophanie, décors saisonniers, micro-perforé, soldes et opérations commerciales, avec des adhésifs prévus pour être déposés sans trace."],
    ["PLV et affichage magasin", "Chevalets, kakémonos, cadres clic, stop-rayons, présentoirs de comptoir et totems carton pour les opérations temporaires."],
    ["Signalétique de rayon", "Bandeaux de gondole, drapeaux suspendus, balisage des univers, indication des caisses, des cabines et des sanitaires."],
    ["Affichage réglementaire", "Prix, horaires, moyens de paiement, information sur la médiation de la consommation, mentions relatives aux soldes."],
    ["Sacs et objets", "Sacs personnalisés, packaging, cartes de fidélité et objets publicitaires remis en caisse."]
  ],
  specifics: [
    "L'<strong>affichage des prix</strong> est obligatoire pour tout produit exposé à la vue du public, y compris en vitrine : prix de vente TTC, lisible sans avoir à entrer. En période de soldes, l'affichage doit faire apparaître le prix de référence et le prix réduit.",
    "Sur la vitrine, la règle qui fonctionne est de conserver <strong>40 à 50 % de surface réellement transparente</strong>. Un magasin dont on ne voit pas l'intérieur est perçu comme fermé ; l'activité visible à l'intérieur est le meilleur argument de vente dont vous disposiez.",
    "Pour la PLV, l'emplacement compte autant que le message. Les <strong>zones de décélération</strong> — entrée, tête de gondole, file d'attente en caisse — captent nettement mieux qu'un linéaire en milieu de parcours, où le client est en mode recherche et non en mode découverte.",
    "En établissement recevant du public, les <strong>parois vitrées</strong> susceptibles d'être heurtées doivent être repérées par des éléments visuels contrastés à hauteur de vue : un simple bandeau adhésif suffit et évite le point de non-conformité en visite de sécurité."
  ],
  budget: [
    ["Enseigne caisson lumineux 2 m", "900 – 2 200 €"],
    ["Enseigne lettres relief rétro-éclairées", "1 800 – 6 000 €"],
    ["Habillage vitrine complet", "400 – 2 000 €"],
    ["Décor saisonnier repositionnable", "150 – 700 €"],
    ["Pack PLV magasin (chevalet + kakémono + cadres)", "300 – 1 200 €"],
    ["Signalétique de rayons (boutique 100 m²)", "400 – 1 500 €"]
  ],
  faq: [
    { q: "Quelle surface de vitrine puis-je couvrir ?", a: "Techniquement l'intégralité, mais commercialement c'est une erreur : gardez 40 à 50 % de transparence réelle. Le micro-perforé permet de tricher intelligemment — visuel plein depuis la rue, visibilité conservée depuis l'intérieur. Placez l'information à hauteur de regard, entre 1,40 m et 1,80 m." },
    { q: "Les décors saisonniers laissent-ils des traces ?", a: "Pas si vous demandez explicitement un adhésif repositionnable ou électrostatique, prévu pour être posé et déposé plusieurs fois. Les traces viennent des adhésifs permanents laissés plusieurs années en plein soleil, ou des films bas de gamme dont la colle migre. Précisez la durée d'utilisation prévue lors de la demande de devis." },
    { q: "Comment renouveler l'affichage promotionnel sans tout refaire ?", a: "En investissant une fois dans des supports réutilisables — cadres clic, chevalets, kakémonos à visuel interchangeable, systèmes à glissière — et en ne refaisant que le visuel imprimé à chaque opération. Le surcoût initial est amorti dès la deuxième ou troisième campagne." }
  ],

  /* ----------------------------------------------------------------------
     Commerce de détail. L'angle fort n'est pas l'enseigne — tout le monde en
     parle — mais le PRIX BARRÉ de la vitrine. Depuis le 28 mai 2022, le prix
     de référence d'une promotion est le prix le plus bas des trente derniers
     jours, et une quantité considérable de vitrophanies promotionnelles
     posées depuis reprend l'ancienne logique. Le commerçant qui lit cela
     vérifie sa vitrine, et il appelle.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre votre vitrine et vos prix affichés",
    lead: "La façade relève du droit de l'enseigne ; ce que vous écrivez <em>dans</em> la vitrine relève du droit de la consommation. Le second est bien plus contrôlé que le premier, et il a changé récemment.",
    couches: [
      {
        titre: "1 · Le prix barré : la règle des trente jours",
        texte: "L'ordonnance n° 2021-1734 du 22 décembre 2021, qui transpose la directive européenne dite <em>Omnibus</em>, est entrée en vigueur le <strong>28 mai 2022</strong>. Depuis cette date, toute annonce de réduction de prix doit indiquer le prix antérieur pratiqué, et ce prix antérieur est <strong>le prix le plus bas pratiqué auprès de tous les consommateurs au cours des trente jours précédant</strong> la réduction. En cas de réductions successives sur une période déterminée, le prix de référence reste celui pratiqué avant la première réduction.",
        cle: "C'est le point sur lequel beaucoup de vitrines sont restées en arrière. Un prix barré qui reprend le tarif catalogue, ou le prix pratiqué il y a trois mois, n'est plus conforme — et une vitrophanie promotionnelle posée avant mai 2022 véhicule l'ancienne logique. La règle ne s'applique pas aux <strong>produits périssables menacés d'altération rapide</strong>. Concrètement, cela pousse à concevoir les supports de promotion comme <strong>remplaçables</strong> plutôt que définitifs.",
        source: { label: "Annonces de réduction de prix : ce que vous devez savoir (DGCCRF)", url: "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/annonces-de-reduction-de-prix-ce-que-vous-devez-savoir" }
      },
      {
        titre: "2 · L'affichage des prix, en vitrine et en rayon",
        texte: "Les prix doivent être affichés de manière <strong>visible et lisible</strong>, exprimés en euros <strong>toutes taxes comprises</strong>, et permettre au consommateur de connaître le prix sans avoir à le demander. Pour les produits exposés en vitrine, l'information doit être perceptible depuis l'extérieur.",
        cle: "La conséquence pour l'agencement : l'étiquetage est un système, pas une suite d'autocollants. Trois niveaux de lecture cohabitent — le <strong>drapeau</strong> ou le bandeau, lus depuis l'entrée ; la <strong>réglette de linéaire</strong>, lue à un mètre ; l'étiquette produit, lue à trente centimètres. Quand ces niveaux ne sont pas hiérarchisés, le client ne trouve pas le prix, et c'est le premier motif d'abandon en rayon.",
        source: { label: "Professionnels, quelles sont vos obligations en matière d'affichage des prix ?", url: "https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-un-commerce/professionnels-quelles-sont-vos-obligations-en-matiere-daffichage-des-prix" }
      },
      {
        titre: "3 · L'enseigne, et le seuil de taxe que l'on franchit sans le voir",
        texte: "L'enseigne de façade relève de l'article L.581-3 du code de l'environnement et de l'autorisation du <strong>maire</strong>, avec l'accord de l'architecte des Bâtiments de France en secteur protégé — situation ordinaire pour un commerce de centre-ville.",
        cle: "Le point que les commerçants découvrent à la première facture : la <strong>TLPE</strong> se calcule sur la <strong>surface cumulée</strong> de tous les supports, pas sur la seule enseigne de façade. Un bandeau, une enseigne drapeau, un caisson au-dessus de la porte et un chevalet permanent s'additionnent. Ajouter un support peut faire basculer la boutique au-dessus du seuil d'exonération — cela se vérifie avant de dessiner, pas au moment de l'avis de taxe.",
        source: { label: "Code général des collectivités territoriales — TLPE (L.2333-6 et suivants)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070633/LEGISCTA000006192887/" }
      },
      {
        titre: "4 · Les opérations commerciales et le rythme de la vitrine",
        texte: "Les soldes se déroulent à des dates fixées nationalement, et les mentions employées pendant ces périodes relèvent des mêmes règles d'annonce de réduction de prix. Les autres opérations — promotions, ventes privées, déstockage — obéissent au droit commun de la consommation, dont la règle des trente jours.",
        cle: "Ce qui en découle intéresse directement la conception : <strong>une vitrine de commerce a deux couches</strong>. Une couche permanente — nom, activité, horaires, mentions obligatoires, coordonnées — qui se traite en vitrophanie durable ; et une couche saisonnière, remplacée plusieurs fois par an, qui doit se poser et se retirer sans abîmer le vitrage ni laisser de colle. Traiter les deux avec le même adhésif est l'erreur la plus courante, et la plus visible au bout de deux saisons.",
        source: { label: "Code de commerce — soldes (L.310-3)", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000005634379/LEGISCTA000006133186/" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Les dimensions admises en façade, les seuils et tarifs de TLPE relèvent du règlement local de publicité et de la délibération de votre commune, et se vérifient au cas par cas avant tout devis."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand un commerce refait sa vitrine",
    lead: "Le commerce de détail est le secteur au rythme le plus rapide : la vitrine travaille toute l'année, la façade une fois par décennie.",
    moments: [
      ["Ouverture ou reprise", "Le lot complet : enseigne, vitrophanie permanente, agencement, signalétique de rayon. Le délai est commandé par la date d'ouverture, jamais l'inverse."],
      ["Les temps forts de l'année", "Soldes d'hiver et d'été, rentrée, fêtes de fin d'année. Quatre à six habillages saisonniers par an pour un commerce actif : c'est un volume récurrent plutôt qu'un chantier."],
      ["Mise en conformité de l'affichage", "Prix barrés non conformes à la règle des trente jours, mentions obligatoires manquantes, étiquetage illisible. Besoin précis, délai court."],
      ["Réagencement intérieur", "Nouveau mobilier, nouveau parcours client : la signalétique de rayon se refait avec l'implantation, et la hiérarchie drapeau / bandeau / réglette se rejoue."],
      ["Entrée dans un réseau ou une franchise", "Charte imposée, calendrier contractuel, et la question classique : concilier la charte avec le règlement local de publicité, qui ne la connaît pas."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur un commerce, la vraie question n'est pas ce qu'il faut poser, mais à quelle fréquence cela devra être changé.",
    questions: [
      "Enseigne de façade, habillage de vitrine, signalétique intérieure — ou l'ensemble ?",
      "Combien d'habillages saisonniers par an ? C'est ce qui décide de la technique et du budget annuel réel.",
      "Quelle surface vitrée, et quelle part peut être couverte sans assombrir le magasin ?",
      "Vos annonces de réduction de prix appliquent-elles bien la règle des trente jours depuis mai 2022 ?",
      "Quelle est la surface cumulée de vos enseignes actuelles — bandeau, drapeau, caisson, chevalet ? C'est elle qui décide de la TLPE.",
      "La commune a-t-elle un règlement local de publicité ? Le commerce est-il en secteur protégé ?",
      "Appartenez-vous à un réseau imposant une charte graphique et technique ?",
      "Pour le rayon : combien de mètres de linéaire, et quelle hiérarchie de lecture souhaitée ?",
      "Le vitrage est-il simple, feuilleté, teinté ou traité ? Cela conditionne l'adhésif et sa dépose.",
      "Y a-t-il une date butoir — ouverture, début des soldes, arrivée d'une collection ?"
    ],
    note: "La deuxième question est celle qui change tout. Un commerce qui rhabille sa vitrine cinq fois par an et un commerce qui la laisse trois ans n'achètent ni le même film, ni la même pose, ni le même budget — même avec une vitrine identique."
  },

  vocabulaire: [
    ["Prix de référence", "Le prix barré. Depuis le 28 mai 2022, c'est le prix le plus bas pratiqué au cours des trente jours précédant la réduction."],
    ["Vitrophanie permanente", "Adhésif durable portant nom, activité, horaires et mentions obligatoires. À distinguer de l'habillage saisonnier."],
    ["Micro-perforé", "Film percé de trous invisibles de loin : image pleine vue de l'extérieur, transparence conservée de l'intérieur."],
    ["Film dépoli", "Translucide, non imprimé. Masque sans obscurcir — bas de vitrine, réserve, cabine d'essayage."],
    ["Drapeau de rayon", "Panneau suspendu perpendiculaire au linéaire, lisible depuis l'entrée. Premier niveau de lecture."],
    ["Bandeau de gondole", "Bandeau horizontal en tête de rayon, lisible depuis l'allée. Deuxième niveau."],
    ["Réglette de linéaire", "Porte-étiquette de tablette, lu à un mètre. Troisième niveau."],
    ["Stop-rayon", "Petit panneau perpendiculaire au linéaire, au niveau du produit. Arrête le regard sur une référence précise."],
    ["Chevalet", "Panneau autoportant posé devant la boutique. Il occupe le domaine public, et sa surface entre dans le calcul de la TLPE s'il est permanent."]
  ],
  services: ["enseignes", "vitrophanie-plv", "impression-grand-format", "objets-publicitaires"]
},
{
  slug: "collectivite-erp",
  nav: "Collectivités & ERP",
  h1: "Signalétique pour collectivités et établissements recevant du public",
  title: "Signalétique Collectivité & ERP — Accessibilité, Jalonnement, Évacuation",
  desc: "Signalétique directionnelle, accessibilité PMR, plans d'évacuation, jalonnement communal et signalétique de bâtiments publics. Devis partout en France.",
  topic: "signaletique", topicAlt: ["signaletique-int", "totem"],
  lead: "Pour une collectivité, la signalétique engage la responsabilité autant qu'elle rend service : accessibilité, sécurité, égalité d'accès à l'information. C'est aussi le domaine où un plan de jalonnement bien construit se voit immédiatement dans la baisse des sollicitations à l'accueil.",
  besoins: [
    ["Signalétique directionnelle et jalonnement", "Mâts et lames directionnelles, jalonnement des équipements publics, signalisation d'information locale, relais d'information service."],
    ["Signalétique de bâtiment", "Mairie, école, médiathèque, gymnase, CCAS : identification extérieure, plan d'orientation, signalétique d'étage et de porte."],
    ["Accessibilité PMR", "Relief et braille, contraste supérieur à 70 %, hauteur de pose réglementaire, bandes d'éveil de vigilance, repérage des parois vitrées, boucles à induction signalées."],
    ["Sécurité et évacuation", "Plans d'évacuation NF X 08-070, balisage photoluminescent, consignes, identification des moyens de secours, registre de sécurité."],
    ["Signalétique de parc et d'espace public", "Panneaux de règlement, tables d'orientation, pupitres d'interprétation, marquage des cheminements, signalétique de parking."],
    ["Signalétique événementielle", "Bâches, banderoles, oriflammes et fléchage pour les manifestations communales, avec pose et dépose."]
  ],
  specifics: [
    "L'<strong>arrêté du 20 avril 2017</strong> fixe des exigences précises pour l'accessibilité de l'information dans les ERP : contraste d'au moins 70 %, hauteur de caractères adaptée à la distance de lecture, doublage en relief et en braille des informations essentielles, pose entre 0,90 m et 1,30 m.",
    "Les collectivités relèvent de la <strong>commande publique</strong>. Selon les seuils, la consultation prend la forme d'une demande de devis, d'une procédure adaptée ou d'un marché formalisé. Nous orientons vers des entreprises habituées à répondre avec les pièces attendues — mémoire technique, références, attestations de régularité fiscale et sociale, assurances.",
    "Un <strong>plan de jalonnement</strong> se construit à partir des points de décision réels de l'usager, pas de l'organigramme des services. Le vocabulaire doit rester identique du parking jusqu'à la porte : si le panneau extérieur indique « Services techniques » et la porte « Régie », l'usager doute."
  ],
  budget: [
    ["Étude et plan de jalonnement communal", "1 500 – 8 000 €"],
    ["Mât directionnel 4 lames", "600 – 1 800 €"],
    ["Signalétique intérieure de mairie", "2 000 – 10 000 €"],
    ["Pack accessibilité PMR par bâtiment", "800 – 3 500 €"],
    ["Plan d'évacuation NF X 08-070", "120 – 400 €"],
    ["Pupitre d'interprétation extérieur", "700 – 2 500 €"]
  ],
  faq: [
    { q: "Comment consulter dans le cadre d'un marché public ?", a: "Selon le montant, une simple demande de devis peut suffire, ou une procédure adaptée voire formalisée devient nécessaire. Nous transmettons votre cahier des charges à des entreprises habituées aux marchés publics, capables de fournir mémoire technique, références comparables et attestations de régularité fiscale et sociale." },
    { q: "Quelles obligations d'accessibilité pour la signalétique d'une mairie ?", a: "Contraste d'au moins 70 % entre texte et fond, caractères dimensionnés selon la distance de lecture, doublage en relief et braille des informations essentielles — identification des locaux, sanitaires, étages, ascenseurs — posés entre 0,90 m et 1,30 m, bandes d'éveil de vigilance en haut des escaliers et repérage visuel des parois vitrées." },
    { q: "Peut-on jalonner un équipement privé sur la voie publique ?", a: "La signalisation d'information locale permet, dans un cadre défini par la commune ou le gestionnaire de voirie, de jalonner certains services et activités présentant un intérêt local. Elle obéit à une charte de mobilier et d'implantation, et les demandes sont instruites par la collectivité — ce n'est pas un droit automatique." }
  ],

  /* ----------------------------------------------------------------------
     Collectivité et ERP. Le point le plus utile de tout le site est ici, et
     il concerne bien au-delà des collectivités : depuis 2015, une entreprise
     ne peut plus poser sa propre préenseigne au bord de la route. Le
     remplacement — la SIL — relève du code de la route, et seul le
     gestionnaire de voirie peut l'implanter. Autrement dit, le commerçant
     rural qui veut être fléché doit passer par sa commune, pas par un
     enseigniste. Le dire clairement vaut mieux que de vendre un panneau qui
     sera déposé.
     ---------------------------------------------------------------------- */
  reglementation: {
    eyebrow: "Le cadre juridique",
    titre: "Ce qui encadre la signalétique publique et le jalonnement",
    lead: "Deux mondes se croisent ici : celui de l'enseigne, qui relève du code de l'environnement, et celui du <em>jalonnement routier</em>, qui relève du code de la route. Les confondre conduit à poser des panneaux qui seront déposés.",
    couches: [
      {
        titre: "1 · La fin des préenseignes, et ce qui les remplace",
        texte: "Depuis le <strong>13 juillet 2015</strong>, en application de la loi Grenelle II, les préenseignes dérogatoires sont <strong>interdites</strong>, à trois exceptions près : les activités liées à la production ou à la commercialisation de <strong>produits du terroir</strong>, les <strong>activités culturelles</strong>, et les <strong>monuments historiques ouverts à la visite</strong>. Les préenseignes autrefois admises pour les « activités utiles aux personnes en déplacement » — garages, stations-service, hôtels et restaurants — ont disparu.",
        cle: "Ce qui les remplace est la <strong>signalisation d'information locale (SIL)</strong>, et elle change complètement l'interlocuteur : la SIL relève du code de la route et de l'instruction interministérielle sur la signalisation routière, si bien que <strong>seul le gestionnaire de voirie est autorisé à implanter ses panneaux</strong>. Un commerçant ne peut pas commander son fléchage à un enseigniste et le faire poser : il doit s'adresser à la commune ou au département, qui décide de l'inscrire ou non à son schéma de jalonnement.",
        source: { label: "La signalisation d'information locale — services de l'État", url: "https://www.nord.gouv.fr/Actions-de-l-Etat/Environnement/Publicite/Reglementation-relative-a-la-publicite-exterieure-aux-enseignes-et-aux-preenseignes/Les-solutions-alternatives/La-Signalisation-d-Information-Locale-SIL" }
      },
      {
        titre: "2 · L'accessibilité : un registre, et un résumé affiché",
        texte: "Tout établissement recevant du public doit tenir un <strong>registre public d'accessibilité</strong>, dont le contenu et les modalités de diffusion sont fixés par l'arrêté du 19 avril 2017 et qui est obligatoire depuis le <strong>30 septembre 2017</strong>. Il se consulte sur place, au point d'accueil accessible, sur papier ou sur support numérique.",
        cle: "Pour une collectivité, la difficulté n'est pas le principe mais le <strong>volume</strong> : mairie, écoles, salle des fêtes, gymnase, médiathèque, cimetière, aires de jeux. Chaque bâtiment a son registre et son résumé à afficher, et chacun appelle en outre la signalétique matérielle correspondante — contraste des nez de marche, bandes de vigilance, repérage des parois vitrées, boucle magnétique à l'accueil. C'est un marché de parc, pas un chantier unitaire.",
        source: { label: "Registre d'accessibilité obligatoire — guide pour les ERP (handicap.gouv.fr)", url: "https://handicap.gouv.fr/registre-daccessibilite-obligatoire-un-guide-pour-les-erp" }
      },
      {
        titre: "3 · Comment une commune achète, et jusqu'à quel montant sans procédure",
        texte: "La commande publique impose une mise en concurrence au-delà d'un certain montant. Le <strong>seuil de dispense de procédure</strong> pour les marchés de fournitures et de services a été relevé de 40 000 à <strong>60 000 € HT au 1<sup>er</sup> avril 2026</strong>, par le décret n° 2025-1386 du 29 décembre 2025 modifiant l'article R.2122-8 du code de la commande publique.",
        cle: "La conséquence est très concrète pour un professionnel du secteur : <strong>l'essentiel des commandes de signalétique d'une commune passe sous ce seuil</strong>, donc sans publicité ni mise en concurrence préalables. Le bon interlocuteur n'est pas la plateforme de marchés publics, c'est le service technique. Au-delà, la procédure adaptée s'applique, et l'allotissement — signalétique intérieure, jalonnement extérieur, accessibilité — décide de qui peut répondre.",
        source: { label: "Mesures de simplification et rehaussement des seuils (DAJ, ministère de l'Économie)", url: "https://www.economie.gouv.fr/daj/maintien-des-seuils-de-declaration-des-donnees-essentielles-des-marches-publics" }
      },
      {
        titre: "4 · Sécurité et évacuation : une signalétique normalisée",
        texte: "Les plans d'évacuation et d'intervention, les consignes de sécurité et l'identification des issues relèvent de règles propres, distinctes du droit de l'enseigne. Les plans obéissent notamment à la norme <strong>NF X 08-070</strong>, qui en fixe la composition, les pictogrammes et les couleurs.",
        cle: "Le piège pour l'acheteur public : <strong>un plan d'évacuation n'est pas un document graphique libre</strong>. Il se dessine à partir du plan du bâtiment, il porte le « vous êtes ici » à l'emplacement réel du support, et il doit être repris à chaque modification de cloisonnement. C'est pourquoi il se commande avec les plans DWG ou PDF du bâtiment, et pourquoi un prestataire qui ne les demande pas n'a pas compris la prestation.",
        source: { label: "Accessibilité et sécurité des établissements recevant du public — ministère de la Transition écologique", url: "https://www.ecologie.gouv.fr/politiques-publiques/laccessibilite-etablissements-recevant-du-public-erp" }
      }
    ],
    avert: "Ces règles sont l'état du droit national tel que nous l'appliquons sur les dossiers du réseau. Les schémas de jalonnement, les chartes de signalétique et les règlements de SIL sont propres à chaque commune ou département, et les seuils de la commande publique évoluent — ils se vérifient à la date de la consultation."
  },

  calendrier: {
    eyebrow: "Le moment",
    titre: "Quand une collectivité commande de la signalétique",
    lead: "Le calendrier d'une commune est prévisible, et il ne ressemble à celui d'aucun commerce : il suit le budget et le mandat.",
    moments: [
      ["Après le vote du budget", "Le premier trimestre concentre les consultations : les crédits sont ouverts, les services techniques sortent les dossiers préparés l'hiver."],
      ["Livraison d'un équipement", "Nouvelle école, salle polyvalente, médiathèque, tiers-lieu : la signalétique est le dernier lot, souvent le plus serré en délai parce qu'il dépend de l'achèvement des cloisons."],
      ["Mise en accessibilité", "Programmation pluriannuelle, contrôle, ou plainte d'un usager. Le besoin porte sur un parc de bâtiments, pas sur un seul."],
      ["Refonte du jalonnement", "Adoption d'un schéma directeur de signalétique ou d'un règlement local de publicité : la commune reprend son jalonnement et sa SIL d'un bloc. C'est le marché le plus important du secteur."],
      ["Début de mandat", "La nouvelle équipe reprend l'identité visuelle de la commune : la signalétique suit, du panneau d'entrée d'agglomération aux plaques de rue."]
    ]
  },

  brief: {
    eyebrow: "Le dossier",
    titre: "Ce que nous établissons avant de transmettre votre projet",
    lead: "Sur un dossier public, ce qui coûte cher n'est pas la fabrication : c'est le temps perdu quand les pièces manquent.",
    questions: [
      "Signalétique intérieure de bâtiment, jalonnement extérieur, accessibilité, sécurité — ou plusieurs de ces lots ?",
      "Combien de bâtiments et de sites sont concernés ? S'agit-il d'un parc à traiter ou d'une opération unique ?",
      "Montant estimé : en dessous du seuil de dispense, ou en procédure adaptée ?",
      "Disposez-vous des plans des bâtiments au format DWG ou PDF ? Ils sont indispensables aux plans d'évacuation.",
      "Existe-t-il une charte graphique de la collectivité, et un schéma directeur de signalétique ?",
      "Pour du jalonnement routier : quelle voirie, et quel gestionnaire — communal, départemental, national ?",
      "S'agit-il de SIL ? Auquel cas le règlement du gestionnaire de voirie s'impose, et l'implantation lui revient.",
      "Les registres publics d'accessibilité sont-ils établis, et leurs résumés affichés ?",
      "Y a-t-il des contraintes patrimoniales : secteur protégé, abords de monument historique, site classé ?",
      "Quel délai, et dépend-il d'une date d'ouverture, d'une commission de sécurité ou d'une échéance budgétaire ?"
    ],
    note: "La question qui débloque le plus de dossiers est celle des plans du bâtiment. Sans eux, aucun plan d'évacuation conforme n'est possible, et le lot se décale — souvent de plusieurs semaines."
  },

  vocabulaire: [
    ["Préenseigne", "Panneau signalant une activité exercée ailleurs. Les préenseignes dérogatoires sont interdites depuis le 13 juillet 2015, sauf terroir, culture et monuments historiques."],
    ["SIL", "Signalisation d'information locale. Relève du code de la route ; seul le gestionnaire de voirie peut l'implanter."],
    ["Schéma de jalonnement", "Document par lequel une collectivité organise son fléchage : qui est signalé, depuis où, avec quel gabarit."],
    ["Mât et lame", "Le support vertical et les lames directionnelles qui s'y fixent. L'unité de compte d'un marché de jalonnement."],
    ["Registre public d'accessibilité", "Obligatoire depuis le 30 septembre 2017 dans tout ERP ; un résumé doit être affiché visiblement."],
    ["NF X 08-070", "Norme des plans d'évacuation et d'intervention : composition, pictogrammes, couleurs, emplacement du « vous êtes ici »."],
    ["Bande de vigilance", "Bande podotactile en haut d'escalier, obligation d'accessibilité."],
    ["Boucle magnétique", "Dispositif d'aide à l'audition à un guichet d'accueil. Sa présence se signale par un pictogramme normalisé."],
    ["Allotissement", "Découpage d'un marché en lots. Il décide de qui peut répondre : un lot unique écarte les petites entreprises."]
  ],
  services: ["signaletique", "impression-grand-format", "pose-nacelle", "maquette-creation-graphique"]
},
{
  slug: "franchise-reseau",
  nav: "Franchises & réseaux",
  h1: "Déploiement d'enseignes et de signalétique pour réseaux multi-sites",
  title: "Enseigne Franchise & Réseau Multi-sites — Déploiement National",
  desc: "Déploiement d'une charte enseigne sur plusieurs points de vente : cahier des charges technique, ateliers locaux, planning national. Devis partout en France.",
  topic: "totem", topicAlt: ["enseigne", "atelier"],
  lead: "Déployer une identité sur trente points de vente n'est pas trente fois le même chantier : c'est un problème de reproductibilité. Mêmes matériaux, mêmes couleurs, même rendu nocturne d'une ville à l'autre — et un dossier administratif à monter commune par commune.",
  besoins: [
    ["Charte technique d'enseigne", "Au-delà de la charte graphique : matériaux référencés, teintes RAL et Pantone, type d'éclairage, températures de couleur, modes de fixation, tolérances de fabrication."],
    ["Déploiement multi-sites", "Un atelier de référence pour la fabrication, des poseurs locaux pour l'installation, un planning par site et un interlocuteur unique côté réseau."],
    ["Dossiers administratifs", "Autorisation préalable d'enseigne commune par commune, insertion photographique par façade, déclaration TLPE, occupation du domaine public."],
    ["Kits d'ouverture", "Pack complet pour chaque nouveau point de vente : enseigne, vitrophanie, signalétique intérieure, PLV, textile et objets publicitaires."],
    ["Marquage de flotte", "Déclinaison de la charte sur les véhicules du réseau, avec gabarits par silhouette et kit de repose fourni aux exploitants."],
    ["Maintenance mutualisée", "Contrat d'entretien commun, délai d'intervention garanti, stock de pièces de rechange, remplacement à l'identique des faces et modules."]
  ],
  specifics: [
    "Le vrai risque du déploiement est la <strong>dérive progressive</strong>. Sans charte technique écrite, chaque atelier interprète : un rouge légèrement différent, une épaisseur de lettre qui varie, une LED plus froide. Au bout de vingt sites, le réseau n'a plus d'identité homogène — et personne ne sait à quel moment cela a commencé.",
    "Le <strong>volet administratif</strong> est le premier poste de retard. Chaque commune a son règlement local de publicité, et une même enseigne peut être acceptée dans une ville et refusée trois kilomètres plus loin. Anticipez deux à quatre mois d'instruction par site, en parallèle de la fabrication et non à la suite.",
    "La <strong>maintenance</strong> se prévoit dès le déploiement, pas après la première panne. Un stock de faces et de modules de rechange, un référentiel de pièces par site et un poseur local identifié transforment une immobilisation d'enseigne de trois semaines en une intervention de deux jours."
  ],
  budget: [
    ["Charte technique d'enseigne (document de référence)", "1 500 – 6 000 €"],
    ["Enseigne par point de vente (fabrication + pose)", "2 500 – 12 000 €"],
    ["Dossier d'autorisation par commune", "250 – 600 €"],
    ["Kit d'ouverture complet par site", "1 500 – 6 000 €"],
    ["Marquage de flotte (par véhicule, série)", "500 – 1 800 €"],
    ["Contrat de maintenance réseau (par site et par an)", "180 – 600 €"]
  ],
  faq: [
    { q: "Un seul fabricant ou des ateliers locaux ?", a: "Le montage qui fonctionne le mieux combine les deux : un atelier de référence fabrique les éléments identitaires — lettres, caissons, faces — pour garantir la reproductibilité, et des poseurs locaux installent. Vous gardez l'homogénéité de la fabrication tout en conservant la réactivité et le coût d'une intervention de proximité pour la pose et le service après-vente." },
    { q: "Combien de temps pour déployer 20 points de vente ?", a: "Comptez 4 à 8 mois selon la complexité. Le facteur limitant est rarement la fabrication : ce sont les autorisations communales, avec deux à quatre mois d'instruction par site. La méthode consiste à déposer tous les dossiers en parallèle dès la charte validée, puis à lancer la fabrication par vagues au rythme des accords obtenus." },
    { q: "Comment garantir la même couleur d'un site à l'autre ?", a: "En référençant les couleurs en Pantone et en RAL dans la charte technique, en imposant un seul fournisseur de laque et de film adhésif, et en conservant des échantillons de référence validés. Pour les enseignes lumineuses, ajoutez la température de couleur des LED en kelvins : c'est ce qui fait qu'un blanc paraît identique ou non d'une ville à l'autre." }
  ],
  services: ["enseignes", "signaletique", "covering-vehicule", "maquette-creation-graphique"]
},
{
  slug: "sport-loisirs",
  nav: "Sport, loisirs & associations",
  h1: "Signalétique et supports pour salles de sport, clubs et associations",
  title: "Signalétique Salle de Sport, Club & Association — Enseigne, Textile, Banderole",
  desc: "Enseigne de salle de sport, signalétique de club, banderoles de terrain, textile floqué et objets publicitaires pour associations. Devis partout en France.",
  topic: "textile", topicAlt: ["impression-banderole", "stand"],
  lead: "Salles de sport, clubs et associations partagent une contrainte : des budgets serrés, des supports qui doivent durer plusieurs saisons, et des partenaires à valoriser. Les bons choix techniques comptent ici plus qu'ailleurs.",
  besoins: [
    ["Enseigne et façade", "Enseigne de salle, totem d'entrée, habillage de façade et signalétique de parking, dimensionnés pour une lecture depuis un axe circulé."],
    ["Signalétique intérieure", "Vestiaires, sanitaires, zones d'entraînement, règlement intérieur, consignes de sécurité, capacité d'accueil et plan d'évacuation."],
    ["Banderoles et panneaux de terrain", "Panneaux partenaires en Dibond ou bâche, banderoles de grillage, habillage de main courante, kakémonos de gymnase."],
    ["Textile et équipement", "Maillots, survêtements, sacs et vestes floqués ou brodés aux couleurs du club, avec numérotation et noms des joueurs."],
    ["Événementiel", "Arches d'arrivée, oriflammes, stands de buvette habillés, fléchage de manifestation, photocall pour les remises de prix."],
    ["Objets et partenariats", "Gourdes, sacs, écharpes, médailles, coupes et objets publicitaires pour les tournois et les campagnes d'adhésion."]
  ],
  specifics: [
    "Pour les <strong>panneaux partenaires</strong>, le Dibond avec laminat anti-UV tient 8 à 10 ans en extérieur, contre 1 à 2 ans pour une bâche PVC ordinaire. Sur un panneau vendu à un sponsor pour plusieurs saisons, l'écart de prix initial est dérisoire face au coût de refabrication.",
    "En textile de club, la <strong>broderie</strong> survit à la durée de vie du vêtement, y compris en lavage fréquent, là où le flex se fissure après trente à cinquante lavages à 60 °C. Pour un maillot porté chaque semaine, la broderie du blason et le flocage du numéro forment la combinaison la plus durable.",
    "Une salle de sport est un <strong>établissement recevant du public</strong> : affichage de la capacité maximale, du règlement intérieur, des consignes de sécurité, du plan d'évacuation, et signalétique accessible. Ce sont des points contrôlés en visite de sécurité.",
    "Anticipez le <strong>renouvellement partiel</strong> : partenaires qui changent, effectifs qui évoluent. Des systèmes à panneaux interchangeables et un programme de broderie conservé chez le fournisseur évitent de tout refaire chaque saison."
  ],
  budget: [
    ["Enseigne de salle de sport", "1 200 – 5 000 €"],
    ["Panneau partenaire Dibond 2 × 1 m", "150 – 450 €"],
    ["Banderole de grillage 3 × 1 m", "80 – 250 €"],
    ["Maillots floqués et brodés (15 pièces)", "450 – 1 400 €"],
    ["Signalétique intérieure de club", "400 – 1 800 €"],
    ["Arche gonflable d'arrivée", "800 – 2 500 €"]
  ],
  faq: [
    { q: "Bâche ou Dibond pour les panneaux partenaires ?", a: "Dibond avec laminat anti-UV pour tout ce qui reste en place plusieurs saisons : 8 à 10 ans de tenue contre 1 à 2 ans pour une bâche PVC ordinaire. La bâche garde son intérêt pour les événements ponctuels, les grandes surfaces sur grillage, et les partenariats à durée limitée." },
    { q: "Broderie ou flocage pour les maillots de club ?", a: "Broderie pour le blason et le logo du club, qui ne changent pas et doivent survivre à des centaines de lavages. Flex ou flocage pour les numéros et les noms, qui évoluent d'une saison à l'autre et se remplacent facilement. Cette combinaison est le standard des clubs bien équipés." },
    { q: "Une association bénéficie-t-elle de tarifs particuliers ?", a: "Il n'existe pas de tarif associatif réglementé, mais beaucoup de professionnels du réseau pratiquent des conditions adaptées, notamment pour les clubs de leur commune, et acceptent des délais de production plus longs contre une remise. Précisez votre statut associatif dans la demande : cela fait souvent une différence réelle." }
  ],
  services: ["objets-publicitaires", "impression-grand-format", "enseignes", "signaletique"]
},

/* Syndics et gestionnaires de copropriété. Segment distinct des agences
   immobilières, et souvent confondu avec elles à tort : l'agence vend un
   bien une fois, le syndic gère le même immeuble pendant des années et
   commande de la signalétique tous les ans, sur un parc de dizaines
   d'immeubles. Une partie de ses besoins est de surcroît réglementaire,
   donc non négociable — c'est ce qui rend ce client durable. */
{
  slug: "syndic-copropriete",
  nav: "Syndics & copropriétés",
  h1: "Signalétique de copropriété pour syndics et gestionnaires",
  title: "Signalétique Copropriété — Syndic, Résidence, Parking, Sécurité",
  desc: "Plaques de résidence, numérotation de bâtiments, signalétique de parking et de caves, plans d'évacuation et affichage légal. Devis pour syndics partout en France.",
  topic: "signaletique",
  topicAlt: ["gravure", "enseigne"],
  lead: "Un syndic ne commande pas une enseigne, il équipe un parc. Numérotation, plans d'évacuation, signalétique de parking, affichage légal : les mêmes besoins reviennent immeuble après immeuble, avec une contrainte que les autres clients n'ont pas — chaque dépense passe devant une assemblée générale, et doit donc être justifiable ligne par ligne.",
  besoins: [
    ["Plaque de résidence et numérotation",
     "Plaque d'entrée gravée ou en lettres découpées, numérotation des bâtiments, des cages d'escalier, des étages et des paliers. C'est la première chose qu'un livreur, un secours ou un visiteur cherche, et la première source d'appels au gardien quand elle manque."],
    ["Signalétique de parking et de caves",
     "Numérotation des emplacements, marquage au sol, identification des caves et des locaux techniques, hauteur libre signalée à l'entrée. Le marquage au sol se refait tous les trois à cinq ans selon le passage."],
    ["Plans d'évacuation et consignes de sécurité",
     "Plans par niveau, consignes d'incendie, identification des issues de secours et des moyens de lutte. Ces supports relèvent d'une norme, pas du goût du conseil syndical."],
    ["Affichage légal et panneaux d'information",
     "Vitrine d'affichage fermant à clé dans le hall, panneaux de règlement intérieur, consignes de tri, horaires de collecte et coordonnées d'urgence."],
    ["Accessibilité des parties communes",
     "Bandes de contraste, nez de marche, signalétique en relief et braille, identification des cheminements. Les parties communes d'un immeuble d'habitation ont leurs propres exigences, distinctes de celles d'un établissement recevant du public."],
    ["Boîtes aux lettres et étiquettes",
     "Étiquetage normalisé des boîtes, renouvellement lors des changements d'occupants, plaques de porte pour les professions libérales installées dans l'immeuble."]
  ],
  specifics: [
    "Le <strong>plan d'évacuation</strong> répond à la norme <strong>NF X 08-070</strong> : format, orientation dans le sens de lecture réelle du lecteur, position du « vous êtes ici », pictogrammes normalisés. Un plan joliment dessiné mais non conforme ne remplit pas l'obligation, et c'est un point que le contrôleur regarde en premier.",
    "La <strong>numérotation des lots et des emplacements</strong> doit correspondre exactement à l'état descriptif de division de la copropriété. Une numérotation « logique » refaite sur place, différente du règlement, crée des litiges à la revente — nous demandons donc systématiquement l'état descriptif avant fabrication, jamais un relevé sur site.",
    "Le calendrier compte autant que le devis. Une dépense de signalétique passe en <strong>assemblée générale</strong>, souvent une fois par an : un devis valable trente jours ne sert à rien à un syndic. Les professionnels du réseau établissent des propositions à validité longue, et acceptent le fractionnement d'un programme sur deux exercices lorsque le budget travaux ne suit pas."
  ],
  budget: [
    ["Plaque de résidence gravée ou lettres découpées", "250 – 1 200 €"],
    ["Numérotation complète d'un bâtiment (paliers et portes)", "400 – 1 800 €"],
    ["Plan d'évacuation normalisé (par niveau)", "90 – 260 €"],
    ["Vitrine d'affichage légal fermant à clé", "180 – 600 €"],
    ["Numérotation et marquage au sol d'un parking (30 places)", "900 – 2 800 €"],
    ["Mise en accessibilité des parties communes", "600 – 3 500 €"]
  ],
  faq: [
    { q: "Peut-on traiter plusieurs immeubles dans une même consultation ?", a: "Oui, et c'est même préférable : un même professionnel qui équipe cinq résidences amortit ses déplacements et ses réglages machine, ce qui se voit sur le prix unitaire. Indiquez le nombre d'immeubles et leur commune dans la demande — nous orientons alors vers un atelier dimensionné pour le volume plutôt que vers un artisan qui traitera votre parc en cinq chantiers séparés." },
    { q: "Le devis restera-t-il valable jusqu'à l'assemblée générale ?", a: "C'est une demande que nous transmettons systématiquement. Beaucoup de professionnels acceptent une validité de six mois à un an sur ce type de prestation, parfois avec une clause de révision si le prix des matières évolue fortement. Précisez la date prévisionnelle de votre assemblée dès la demande : cela évite de tout refaire chiffrer." },
    { q: "Le plan d'évacuation est-il obligatoire dans un immeuble d'habitation ?", a: "Les obligations diffèrent selon que l'immeuble relève du seul régime de l'habitation ou comporte des locaux recevant du public, et selon sa hauteur. Les consignes de sécurité affichées dans les parties communes et l'identification des moyens de secours sont en revanche attendues partout. Nous vous orientons vers un professionnel qui connaît le régime applicable à votre immeuble plutôt que de vous vendre un plan par défaut." },
    { q: "Qui décide de la charte graphique d'une résidence ?", a: "Le conseil syndical, sur proposition du syndic, et la décision passe en assemblée. Notre rôle est de fournir des propositions comparables sur la même base technique pour que le vote porte sur un choix éclairé — pas sur trois devis qui ne décrivent pas les mêmes matériaux." },
    { q: "Intervenez-vous sur les résidences anciennes en secteur protégé ?", a: "Oui. Une plaque de résidence sur un immeuble situé aux abords d'un monument historique relève de l'avis de l'Architecte des Bâtiments de France au même titre qu'une enseigne commerciale. Les professionnels du réseau connaissent les matériaux qui passent — laiton, bronze, lettres découpées — et ceux qui sont systématiquement refusés." }
  ],
  services: ["signaletique", "decoupe-laser-cnc", "enseignes", "impression-grand-format"]
}
];
