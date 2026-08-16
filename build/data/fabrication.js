/* =========================================================================
   FABRICATION LOCALE — l'argument que ni une franchise ni un fabricant
   centralisé ne peuvent avancer.

   La communication visuelle a une particularité que le client national
   découvre toujours trop tard : ses produits sont volumineux, fragiles et
   souvent hors-gabarit. Un caisson lumineux de deux mètres, un totem de
   trois mètres, un jeu de lettres relief calé sur mesure — rien de tout
   cela ne part en colis standard. Le transport devient alors un poste de
   coût à part entière, et un poste de risque : la casse en messagerie sur
   du plexiglas thermoformé n'est pas un incident rare.

   Le réseau répond à cela par sa structure même : un atelier près de chaque
   site, qui fabrique ET pose. Le produit ne voyage pas, il naît sur place.

   HONNÊTETÉ DU RAISONNEMENT — ce bloc ne serait pas crédible s'il prétendait
   que la fabrication locale gagne toujours. Elle ne gagne pas toujours :
   sur de petites pièces identiques en grande série (plaques, adhésifs,
   textiles, objets publicitaires), une production unique amortit ses
   réglages et part en colis ordinaire pour quelques euros. La section
   `centralise` dit exactement cela. C'est ce qui rend le reste défendable.

   LES FOURCHETTES DE TRANSPORT ci-dessous sont des ordres de grandeur du
   marché de la messagerie hors-gabarit et palette longue, pas des tarifs
   contractuels : distance, volume, hayon, rendez-vous de livraison et
   valeur assurée les font varier du simple au triple. Elles sont affichées
   comme telles — jamais comme un prix ferme.
   ========================================================================= */
module.exports = {
  eyebrow: "Fabrication locale",
  title: "Fabriqué près de votre site, pas expédié d'un entrepôt à 800 kilomètres",
  lead: "En communication visuelle, le produit est encombrant, fragile et souvent hors-gabarit. Le faire voyager coûte cher, allonge les délais et ajoute un risque de casse. Le réseau est construit pour l'éviter : l'atelier qui fabrique est celui qui pose, et il est à moins d'une heure de votre façade.",

  /* Les quatre bénéfices, dans l'ordre où ils comptent pour un donneur
     d'ordre national : le prix d'abord, puis le délai, puis le risque,
     puis le service après-vente — que personne n'anticipe et qui décide
     pourtant du renouvellement. */
  benefits: [
    ["Un poste de transport qui disparaît",
     "Sur une enseigne fabriquée à 700 kilomètres, la livraison peut représenter 5 à 15 % du budget du support. Fabriquée sur place, elle représente zéro. Ce n'est pas une remise commerciale, c'est un coût qui n'existe plus."],
    ["Des délais qui ne dépendent plus d'un camion",
     "Une palette hors-gabarit part en messagerie spécialisée : deux à six jours ouvrés, une date de livraison rarement garantie, et un créneau à tenir sur le chantier. En circuit court, le produit sort de l'atelier le matin et il est posé l'après-midi."],
    ["Plus de casse en transit, plus de litige",
     "Le plexiglas thermoformé, le PVC expansé grand format et les faces tendues supportent mal la manutention répétée. Une casse en messagerie, c'est une refabrication complète, un chantier reporté et une expertise à mener entre trois intervenants. Un produit qui ne voyage pas ne casse pas."],
    ["Un service après-vente qui tient dans la journée",
     "Un transformateur LED qui lâche au bout de dix-huit mois se remplace en deux heures quand le fabricant est à trente kilomètres. Quand il est à l'autre bout de la France, il faut démonter, expédier, attendre, réexpédier, reposer — et votre enseigne reste éteinte pendant trois semaines."]
  ],

  /* Ordres de grandeur du transport évité. Colonne « fabriqué sur place »
     volontairement à zéro : c'est le seul chiffre du tableau qui soit
     rigoureusement exact. */
  transportHead: ["Support", "Contrainte de transport", "Expédition depuis un atelier unique", "Fabriqué sur place"],
  transport: [
    ["Caisson lumineux simple face 2 m", "Palette longue, hors-gabarit", "150 – 400 €", "0 €"],
    ["Totem lumineux double face 3 m", "Transport spécifique, hayon", "350 – 900 €", "0 €"],
    ["Jeu de lettres relief rétro-éclairées", "Calage sur mesure, fragile", "80 – 250 €", "0 €"],
    ["Bâche ou panneau grand format 6 × 3 m", "Rouleau long", "60 – 180 €", "0 €"],
    ["Habillage complet de devanture", "Deux palettes minimum", "250 – 600 €", "0 €"],
    ["Signalétique intérieure d'un établissement", "Colis multiples, plusieurs envois", "120 – 350 €", "0 €"]
  ],
  transportNote: "Fourchettes indicatives du marché de la messagerie hors-gabarit, hors assurance sur valeur déclarée. Elles varient fortement selon la distance, le volume, la nécessité d'un hayon et le respect d'un créneau de livraison — c'est précisément cette imprévisibilité qui les rend difficiles à budgéter à l'avance.",

  /* L'effet d'échelle : c'est sur le multi-sites que l'argument devient
     décisif, parce que le poste transport se multiplie par le nombre de
     points de vente alors que le reste du budget bénéficie, lui, d'une
     économie d'échelle. */
  scale: {
    title: "Sur un déploiement multi-sites, le transport est le seul poste qui ne baisse jamais",
    body: "Un réseau qui équipe quarante points de vente négocie ses matériaux, ses faces et sa main-d'œuvre au volume. Le transport, lui, se paie quarante fois : chaque site est une expédition distincte, vers une adresse distincte, avec sa propre contrainte de livraison. À 200 € l'envoi moyen, cela fait 8 000 € qui ne financent aucune enseigne. Réparti sur des ateliers de proximité, ce poste tombe à zéro et l'économie revient dans le produit ou dans le prix.",
    points: [
      "Un seul cahier des charges technique, écrit une fois, appliqué à l'identique partout",
      "Mêmes matériaux, mêmes références de faces, mêmes teintes contrôlées site par site",
      "Un interlocuteur unique côté réseau — vous ne pilotez pas quarante ateliers",
      "Les poses coordonnées par région, sans camion à faire traverser la France"
    ]
  },

  /* Le contrepoint. Sans lui, tout le reste passe pour un argument de vente. */
  centralise: {
    title: "Quand la fabrication centralisée reste le bon choix",
    body: "La proximité ne gagne pas sur tout, et prétendre le contraire serait malhonnête. Dès que la pièce est petite, identique en grande série et transportable en colis ordinaire, une production unique reste plus économique : les réglages machine s'amortissent sur la quantité et l'expédition coûte quelques euros. Nous arbitrons projet par projet, et nous le disons quand la centralisation est la bonne réponse.",
    rows: [
      ["Plaques professionnelles, numéros, étiquettes gravées", "Production centralisée — série longue, colis léger"],
      ["Adhésifs, vitrophanie découpée, lettrages simples", "Production centralisée — envoi à plat, pose locale"],
      ["Objets publicitaires, textiles floqués ou brodés", "Production centralisée — série et sourcing"],
      ["Enseignes lumineuses, caissons, totems, lettres relief", "Fabrication locale — volume et fragilité"],
      ["Covering et marquage de véhicules", "Fabrication locale — le véhicule vient à l'atelier"],
      ["Signalétique de chantier et grands formats rigides", "Fabrication locale — encombrement"]
    ]
  },

  /* Version courte, pour les pages où le bloc complet serait trop long. */
  short: {
    title: "Le circuit court, aussi sur la fabrication",
    body: "Une enseigne lumineuse, un totem ou un habillage de devanture voyagent mal et coûtent cher à expédier. Nos partenaires fabriquent dans leur propre atelier, à proximité de votre site, puis posent eux-mêmes : le poste transport disparaît du devis, les délais ne dépendent plus d'un transporteur, et le service après-vente se règle dans la journée."
  }
};
