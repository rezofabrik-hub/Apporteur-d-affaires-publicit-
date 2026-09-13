/* =========================================================================
   Argumentaire d'adhésion au réseau
   -------------------------------------------------------------------------
   La page partenaires présente l'offre : formules, tarifs, questionnaire.
   Celle-ci répond à une question différente, et antérieure : pourquoi un
   enseigniste qui tourne déjà devrait-il payer pour entrer dans un réseau.

   L'argument tient en une phrase : le réseau marche dans les deux sens. Les
   places de marché de contacts amènent des clients et prennent une
   commission ; les réseaux de sous-traitance de pose fournissent un
   exécutant et prennent une marge. Personne ne fait les deux, et personne
   ne le fait au forfait. C'est la seule position réellement défendable de
   ce projet, donc c'est elle qu'il faut tenir partout.

   Sur le ton : le réseau démarre, le référencement met six à douze mois à
   produire son effet, et le dire est un argument — pas un aveu. Un
   professionnel de ce métier reconnaît immédiatement un discours qui
   promet du chantier immédiat, et s'en méfie à juste titre.
   ========================================================================= */

module.exports = {
  slug: "pourquoi-adherer",
  nav: "Pourquoi adhérer",
  navDesc: "Ce que l'abonnement vous apporte réellement, ce qu'il coûte, et à partir de quand il est remboursé.",
  h1: "Pourquoi adhérer au réseau plutôt que d'acheter des contacts ou d'entrer en franchise",
  title: "Pourquoi adhérer au réseau — l'argumentaire complet",
  desc: "Un réseau qui vous amène des clients et qui vous trouve un poseur quand c'est vous qui en cherchez. Abonnement fixe, aucune commission, votre enseigne reste la vôtre.",
  lead: "Vous savez déjà fabriquer et poser. Ce que vous achetez ici, ce n'est pas un savoir-faire : c'est de la demande qualifiée, et une capacité de production que vous n'avez pas à porter vous-même le jour où un marché dépasse votre zone.",

  /* ------------------------------------------------------------ le concept */
  double: {
    eyebrow: "Le principe",
    titre: "Le réseau marche dans les deux sens",
    lead: "C'est la différence de fond avec tout ce qui existe sur ce marché. Un abonnement, deux flux — et vous n'en payez qu'un.",
    sens: [
      {
        fleche: "↓",
        titre: "Descendant : le client final vient à vous",
        texte: "Un commerçant, un restaurateur, un syndic, une collectivité cherche une enseigne ou de la signalétique. Il arrive par la recherche, sur la page de son métier et de sa ville. Nous qualifions son projet par téléphone, nous le traduisons en cahier des charges, puis nous vous l'adressons.",
        contre: "Les places de marché de contacts font cela — en revendant le même contact à cinq ou dix entreprises, et en prélevant au passage."
      },
      {
        fleche: "→",
        titre: "Latéral : vous cherchez, le réseau répond",
        texte: "Vous gagnez un marché à trois cents kilomètres et vous n'avez pas les bras. Votre traceur est en panne un vendredi. Vous avez besoin d'une nacelle de 22 mètres pour une semaine, d'un thermolaquage, d'un avis technique sur une pose en façade classée. Vous le demandez au réseau, un confrère répond.",
        contre: "Les réseaux de sous-traitance de pose font cela — et prennent une marge sur chaque chantier qu'ils vous confient ou qu'ils vous prennent."
      }
    ],
    conclusion: "Les premiers ne vous apportent jamais de capacité de production. Les seconds ne vous apportent jamais de client final. Ici les deux flux passent par le même abonnement, et aucun des deux ne donne lieu à une commission."
  },

  /* ------------------------------------------------------- ce qu'on achète */
  produit: {
    eyebrow: "Ce que vous recevez",
    titre: "Un dossier, pas un contact",
    lead: "C'est la partie du travail que personne ne veut faire, et c'est précisément celle que vingt-cinq ans de métier permettent de faire vite.",
    texte: "Un contact brut, c'est un nom, un téléphone et « je voudrais une enseigne ». Il vous reste deux heures de téléphone, une visite et souvent un devis pour rien. Ce que nous transmettons a déjà été instruit par quelqu'un qui a fabriqué et posé pendant vingt-cinq ans.",
    contenu: [
      "Ce qui est demandé, en vocabulaire du métier : caisson, lettres boîtier, lettres relief, drapeau, bandeau, adhésif découpé",
      "Les dimensions relevées ou estimées, et la longueur de façade disponible",
      "Le mode d'éclairage envisagé, et si une alimentation existe déjà sur place",
      "La contrainte administrative repérée : déclaration préalable, autorisation, périmètre ABF, règlement local de publicité",
      "La strate de TLPE applicable à la commune, quand elle a institué la taxe",
      "L'accès : hauteur, trottoir, nacelle nécessaire ou non, contrainte de stationnement",
      "Le budget annoncé par le client et le délai qu'il a en tête",
      "Ce que le client n'a pas dit et qu'il faudra lui demander — c'est souvent le plus utile"
    ],
    note: "Deux à trois entreprises reçoivent la même demande, jamais davantage. Vous chiffrez contre un ou deux confrères, pas contre neuf inconnus qui ont acheté le même contact le même matin."
  },

  /* ------------------------------------------------------------ le calcul */
  calcul: {
    eyebrow: "L'arithmétique",
    titre: "Ce que ça coûte, et à partir de quand c'est remboursé",
    lead: "Le chiffre à retenir n'est pas le prix affiché : c'est le montant qui reste réellement à votre charge une fois la TVA récupérée, et le chiffre d'affaires qu'il faut produire pour le couvrir.",
    lignes: [
      ["Abonnement, première année (tarif de lancement)", "490 € TTC"],
      ["TVA récupérable", "− 82 €"],
      ["Charge réelle sur douze mois", "408 € HT"],
      ["Charge déductible du résultat imposable", "408 € HT"],
      ["Chiffre d'affaires à produire, à 35 % de marge brute", "≈ 1 170 €"],
      ["Soit, en volume de chantier", "une seule enseigne de commerce"]
    ],
    note: "Une enseigne de commerce courante se situe entre 1 200 et 3 500 € selon la technique. La première affaire signée rembourse l'année. La deuxième est du résultat. C'est l'inverse d'une commission, qui prélève d'autant plus que vous réussissez.",
    honnete: "Un chantier par an suffit à rembourser. Nous ne promettons pas pour autant un volume : un référencement neuf met six à douze mois à produire son plein effet, et c'est exactement la raison pour laquelle cette première année est à 490 € au lieu de 890 € — six mois offerts, le temps que le flux s'installe. Autant le dire tout de suite : c'est une offre de première année. La deuxième se renouvelle à 890 €, et à ce moment-là vous aurez douze mois de relevé pour juger si ça les vaut."
  },

  /* ------------------------------------------- ce que vous ne perdez pas */
  liberte: {
    eyebrow: "Ce qui ne change pas",
    titre: "Vous restez votre propre entreprise",
    lead: "Le comparatif avec la franchise est le plus fréquent, et c'est celui où l'écart est le plus net.",
    points: [
      ["Votre enseigne reste la vôtre", "Vous ne repeignez pas votre camion, vous ne changez pas votre nom, vous ne déposez pas votre logo au vestiaire. Personne ne sait que vous êtes du réseau, sauf les clients à qui nous vous présentons."],
      ["Vos fournisseurs restent les vôtres", "Aucune centrale d'achat, aucun tarif imposé, aucune obligation de vous approvisionner chez qui que ce soit. Si vous avez négocié votre aluminium pendant quinze ans, vous le gardez."],
      ["Vos prix restent les vôtres", "Nous ne voyons pas vos devis, nous ne les validons pas et nous ne prenons rien dessus. Le contrat se signe entre le client et vous."],
      ["Vos clients restent les vôtres", "Une fois la mise en relation faite, la relation vous appartient. Il n'existe aucune clause qui nous rendrait le client s'il revient vous voir l'année suivante."],
      ["Aucun droit d'entrée, aucune redevance", "Un abonnement de douze mois, sans reconduction tacite. À l'échéance, vous décidez ; si vous ne faites rien, il s'arrête."],
      ["Aucun annuaire public", "Vos coordonnées ne sont affichées nulle part. Elles ne sortent que pour un projet précis et vers un seul client. C'est un engagement de structure, pas une promesse : il n'existe pas de page qui liste les partenaires."]
    ]
  },

  /* -------------------------------------------------------- le comparatif */
  face: {
    eyebrow: "Face aux autres solutions",
    titre: "Les quatre façons d'aller chercher du chantier, et ce qu'elles coûtent",
    lead: "Toutes sont défendables. Elles ne coûtent simplement pas la même chose, et ne vous laissent pas la même liberté.",
    head: ["", "Abonnement partenaire", "Achat de contacts", "Réseau de sous-traitance de pose", "Franchise"],
    rows: [
      ["Ce que vous payez", "Un forfait annuel", "Chaque contact, à l'unité", "Une marge sur chaque chantier", "Droit d'entrée puis redevance sur le chiffre d'affaires"],
      ["Prélèvement sur vos affaires", "Aucun", "Aucun, mais le contact est revendu", "Oui, sur chaque chantier", "Oui, en continu"],
      ["Vous amène des clients finaux", "Oui", "Oui", "Non — leur client, c'est vous", "Oui, sous leur marque"],
      ["Vous trouve un exécutant hors de votre zone", "Oui, compris", "Non", "Oui, contre marge", "Selon le réseau"],
      ["Demande instruite avant transmission", "Oui, cahier des charges", "Rarement", "Sans objet", "Sans objet"],
      ["Destinataires par demande", "2 à 3", "5 à 10", "Sans objet", "Sans objet"],
      ["Votre enseigne", "La vôtre", "La vôtre", "La vôtre", "Celle du réseau"],
      ["Votre territoire", "Libre, vous déclarez votre zone", "Libre", "Libre", "Imposé et exclusif"],
      ["Vos fournisseurs", "Libres", "Libres", "Libres", "Imposés le plus souvent"],
      ["Durée d'engagement", "12 mois, sans tacite reconduction", "Aucune", "Au chantier", "5 à 7 ans"],
      ["Coût connu à l'avance", "Oui, au centime", "Non, sans plafond", "Non, proportionnel", "Non, proportionnel"]
    ],
    note: "Le réseau de sous-traitance de pose n'est pas un concurrent au sens strict : c'est un service que nous rendons en interne, sans marge, à travers l'entraide entre partenaires. Un partenaire qui y avait recours plusieurs fois par an y retrouve à lui seul le coût de l'abonnement."
  },

  /* ---------------------------------------------------------- objections */
  objections: [
    {
      q: "J'ai déjà assez de travail, je ne cherche pas de clients.",
      a: "Alors ce n'est pas le flux descendant qui vous intéresse, c'est l'autre. Une entreprise qui tourne bien est aussi celle qui refuse des marchés parce qu'ils sortent de sa zone, ou qui sous-traite au prix fort quand son atelier est plein. L'entraide entre partenaires est comprise dans l'abonnement : un poseur à l'autre bout de la France, une capacité de production, un dépannage machine, un avis technique. Deux recours dans l'année suffisent à rentabiliser."
    },
    {
      q: "Votre site est neuf. Qu'est-ce qui me garantit que je recevrai des demandes ?",
      a: "Rien ne le garantit, et nous ne le prétendrons pas. Ce qui est garanti, c'est la conséquence : si aucune demande ne vous a été transmise au bout de trois mois, votre accès est prolongé de six mois sans frais, et sans que vous ayez à le réclamer — nous le constatons nous-mêmes sur le relevé. C'est aussi la raison du tarif de lancement : douze mois au prix de six, parce que la montée en charge du référencement occupe la première moitié de l'année."
    },
    {
      q: "Qu'est-ce qui m'empêche de faire ce référencement moi-même ?",
      a: "Rien, techniquement. La question est le temps. Le site couvre aujourd'hui plusieurs centaines de villes et l'ensemble des départements de métropole, avec une page par métier et par ville. Une entreprise seule qui voudrait la même surface y consacrerait plusieurs années et un poste à temps plein — pour une visibilité qui resterait limitée à sa zone. C'est le seul poste où la mutualisation change vraiment l'échelle."
    },
    {
      q: "Combien d'entreprises par ville ? Je ne veux pas être quinze sur le même secteur.",
      a: "Le nombre de partenaires par département est limité, et il l'est pour une raison mécanique : au-delà de deux ou trois entreprises actives sur une zone, chacune reçoit trop peu de demandes pour que l'abonnement ait un sens, et le réseau se détruit lui-même. Une demande part vers deux ou trois destinataires au maximum, avec un tour de rôle pour que ce ne soit jamais toujours le même."
    },
    {
      q: "Les 490 €, c'est tous les ans ?",
      a: "Non, et c'est le genre de chose qu'il vaut mieux dire au début qu'à l'échéance. 490 € est un tarif de lancement : il couvre vos douze premiers mois — six mois vous sont offerts sur le tarif normal. La deuxième année se renouvelle à 890 €, le tarif du réseau. Deux garanties en contrepartie : vos 490 € sont acquis pour toute la durée des douze mois souscrits, une hausse en cours d'année ne vous est jamais appliquée ; et comme il n'y a aucune reconduction tacite, personne ne vous prélèvera 890 € sans que vous l'ayez décidé. Nous vous recontactons avant l'échéance avec le relevé des demandes transmises, et vous tranchez sur des chiffres."
    },
    {
      q: "Et si je ne suis pas satisfait au bout de quelques mois ?",
      a: "L'abonnement est de douze mois, sans reconduction tacite : il s'arrête tout seul à l'échéance si vous ne faites rien. Il n'y a pas de clause de sortie à négocier parce qu'il n'y a pas de contrat pluriannuel à casser. C'est le contraire d'une franchise, où l'engagement se compte en années et où la sortie se négocie."
    },
    {
      q: "Vous prenez une commission sur les affaires que je signe ?",
      a: "Non, aucune, et ce n'est pas une tolérance commerciale : nous ne voyons pas vos devis et nous ne sommes pas partie au contrat. Vous facturez directement le client, à votre prix. Le modèle tient parce que le revenu vient de l'abonnement, pas du chantier — c'est ce qui nous permet de vous envoyer une affaire de 30 000 € sans que cela change quoi que ce soit à ce que vous nous payez."
    }
  ],

  /* ------------------------------------------------------------- la suite */
  suite: {
    titre: "Ce qui se passe si vous candidatez",
    etapes: [
      ["Vous remplissez le questionnaire", "Zone d'intervention, métiers, machines d'atelier, parc de véhicules, hauteur d'intervention, habilitations. C'est ce profil technique qui détermine les demandes que vous recevrez — un dossier vague produit des demandes hors sujet."],
      ["Nous vous appelons", "Un échange de vingt minutes pour vérifier que le profil correspond à ce que le réseau reçoit sur votre secteur, et pour vous dire franchement si nous avons du volume chez vous ou pas encore."],
      ["Vous décidez, ensuite seulement", "Le paiement n'intervient qu'après cet échange. Nous préférons refuser une adhésion que l'encaisser en sachant que la zone est déjà servie."]
    ]
  }
};
