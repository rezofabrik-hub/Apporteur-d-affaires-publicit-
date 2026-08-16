/* =========================================================================
   ENTRAIDE ENTRE PARTENAIRES — le réseau dans l'autre sens
   -------------------------------------------------------------------------
   POURQUOI CETTE RUBRIQUE EXISTE

   Un réseau qui démarre a un défaut structurel : il promet des demandes
   clients qu'il ne peut pas encore livrer. Le partenaire paie en septembre,
   reçoit deux demandes en novembre, et ne renouvelle pas. Aucune promesse
   commerciale ne corrige cela — seule une contrepartie disponible dès le
   premier jour le fait.

   Cette contrepartie existe, et elle ne coûte rien à produire : les
   professionnels du secteur ont en permanence besoin les uns des autres. Un
   chantier à 180 kilomètres sans poseur sur place, une commande qui réclame
   une machine qu'on n'a pas, une nacelle en panne le matin de la pose. Ces
   besoins-là sont quotidiens, ils ne dépendent d'aucun trafic, et personne
   ne les sert correctement aujourd'hui — les groupes Facebook du métier en
   sont pleins, sans vérification ni fiabilité.

   CE QUI EST VOLONTAIREMENT ABSENT

   Pas de place de marché, pas de comptes, pas d'annuaire consultable. Les
   partenaires ne se voient pas entre eux : chaque demande passe par le
   réseau, qui oriente vers l'entreprise capable de répondre. Ce n'est pas
   une limite technique, c'est l'engagement de confidentialité pris envers
   les partenaires — et c'est aussi ce qui empêche qu'on court-circuite le
   réseau une fois les présentations faites.
   ========================================================================= */
module.exports = {
  slug: "entraide-partenaires",
  nav: "Entraide entre partenaires",
  navDesc: "Capacité, poseur, dépannage, matériel : ce que vous cherchez",
  h1: "Le réseau fonctionne aussi dans l'autre sens",
  title: "Entraide entre Partenaires — Capacité, Poseur, Dépannage, Matériel",
  desc: "Partenaire du réseau : trouvez une capacité de production, un poseur, un dépannage urgent, du matériel ou un avis technique auprès des autres entreprises. Réponse sous 24 h ouvrées.",

  lead: "Recevoir des demandes de clients, c'est la moitié de ce qu'apporte le réseau. L'autre moitié, c'est de pouvoir en formuler une. Un chantier hors de votre zone, une machine que vous n'avez pas, une nacelle immobilisée le matin de la pose : vous décrivez le besoin, nous cherchons parmi les partenaires qui peuvent y répondre.",

  /* Les six motifs. L'ordre n'est pas décoratif : il va du besoin le plus
     fréquent au plus rare, et c'est celui dans lequel ils apparaissent sur
     le formulaire. */
  motifs: [
    {
      titre: "Une capacité de production",
      texte: "Vous avez vendu une prestation que votre atelier ne sait pas produire, ou pas dans ce délai. Découpe laser, fraiseuse numérique, thermolaquage, impression UV grand format, thermoformage, brodeuse : nous cherchons l'atelier qui a la machine, pas celui qui acceptera de sous-traiter à son tour."
    },
    {
      titre: "Un poseur ou de la main-d'œuvre",
      texte: "Un chantier à cent quatre-vingts kilomètres, une pose en hauteur qui demande une nacelle de vingt mètres, une équipe indisponible la semaine où le client attend. Le déplacement d'un poseur local coûte toujours moins cher que le vôtre, et il connaît la mairie."
    },
    {
      titre: "Un dépannage urgent",
      texte: "La nacelle qui ne démarre pas le matin de la pose, le traceur en panne avec une bâche à livrer le lendemain. C'est rare, c'est critique, et c'est exactement ce à quoi sert un réseau. Traité en priorité, avec réponse dans la demi-journée quand c'est possible."
    },
    {
      titre: "Du matériel ou de la matière",
      texte: "Une machine d'occasion à reprendre, un lot de Dibond ou de plexi, des chutes exploitables, un rouleau de film qu'il vous manque pour finir un chantier. Entre professionnels vérifiés, avec des SIRET contrôlés — ce qu'aucun groupe de petites annonces ne garantit."
    },
    {
      titre: "Un avis technique",
      texte: "Sur quoi fixer une enseigne sur un bardage composite, quel adhésif tient sur une peinture microporeuse, comment traiter un raccordement quand le tableau est à l'autre bout du bâtiment. Vingt-cinq ans de métier de notre côté, et des confrères qui ont déjà rencontré le cas."
    },
    {
      titre: "Un groupement pour un marché",
      texte: "Une collectivité lance une consultation trop large pour une entreprise seule — signalétique, jalonnement et pose sur trente sites. Nous constituons le groupement momentané d'entreprises et vous répondez ensemble plutôt que de renoncer chacun de votre côté."
    }
  ],

  /* Le déroulé. Trois étapes, parce qu'il n'y en a réellement que trois. */
  etapes: [
    ["Vous décrivez le besoin",
     "Le motif, ce qu'il vous faut précisément, le département du chantier et le délai. Deux minutes, comme pour une demande client — sauf que cette fois c'est vous qui demandez."],
    ["Nous cherchons dans le réseau",
     "Nous savons qui a quelle machine, quel parc de véhicules, quelles habilitations et quelle disponibilité : c'est ce que déclare le questionnaire d'adhésion, et c'est ce que nous vérifions. Réponse sous 24 heures ouvrées, la demi-journée sur un dépannage urgent."],
    ["Vous traitez en direct",
     "Nous vous présentons l'entreprise, vous vous entendez directement sur le prix et le calendrier. Nous ne prenons aucune commission sur ce que vous vous facturez entre vous, et nous n'intervenons pas dans le contrat."]
  ],

  /* La confidentialité est le point sur lequel un partenaire hésite, et
     c'est aussi ce qui distingue le dispositif d'un groupe d'entraide
     ouvert. Elle mérite donc d'être traitée en face plutôt qu'en note. */
  confidentialite: {
    titre: "Personne ne voit la liste des partenaires, y compris les partenaires",
    texte: "Il n'existe aucun annuaire consultable, aucun espace membres, aucun fil de discussion commun. Vous ne savez pas qui d'autre est dans le réseau, et personne ne sait que vous y êtes. Chaque mise en relation est faite une par une, pour un besoin précis, entre deux entreprises qui ont une raison de se parler ce jour-là.",
    points: [
      "Votre demande n'est jamais diffusée : elle est adressée aux seules entreprises capables d'y répondre",
      "Votre nom n'est communiqué qu'à celle que vous retenez, pas aux autres",
      "Aucune commission sur les affaires que vous traitez entre partenaires",
      "Un concurrent direct de votre zone ne recevra jamais votre demande"
    ]
  },

  faq: [
    { q: "Ce service est-il compris dans l'abonnement ?", a: "Oui, dans toutes les formules, y compris la formule Découverte à 0 €. C'est même la raison pour laquelle il existe : un réseau qui démarre met plusieurs mois à produire un flux de demandes clients régulier, et il serait malhonnête de faire payer un partenaire pour une promesse qui ne se réalisera qu'au printemps suivant. L'entraide, elle, fonctionne dès la première semaine." },
    { q: "Combien de temps pour obtenir une réponse ?", a: "Sous 24 heures ouvrées pour une demande courante, et dans la demi-journée lorsque vous cochez « dépannage urgent » — dans la limite de ce que permet la densité du réseau dans votre secteur. Si personne ne peut répondre, nous vous le disons tout de suite plutôt que de vous laisser attendre : sur un chantier, une réponse négative rapide vaut mieux qu'un espoir de trois jours." },
    { q: "Prenez-vous une commission sur ce que je facture à un autre partenaire ?", a: "Non, aucune. Ni sur les affaires que vous signez avec un client que nous vous avons transmis, ni sur celles que vous traitez avec un autre membre du réseau. Notre revenu est l'abonnement, et rien d'autre. C'est ce qui nous permet de vous mettre en relation sans arrière-pensée sur le montant." },
    { q: "Vais-je me retrouver face à un concurrent direct ?", a: "Non. Nous ne sollicitons jamais une entreprise du même métier sur la même zone que la vôtre pour répondre à votre demande — ce serait lui offrir la cartographie de vos chantiers. Nous cherchons soit hors de votre secteur, soit sur un métier que vous n'exercez pas." },
    { q: "Puis-je proposer mes services plutôt que demander ?", a: "Oui, et c'est même utile : indiquez-nous vos périodes creuses, une machine récemment installée, une équipe qui se libère, un secteur où vous acceptez de vous déplacer. Nous vous solliciterons en priorité sur les demandes correspondantes. Beaucoup de partenaires utilisent le formulaire dans ce sens-là." },
    { q: "Et si je ne suis pas encore partenaire ?", a: "Le service est réservé aux entreprises du réseau, parce qu'il repose entièrement sur ce que nous savons de leurs capacités réelles et sur des SIRET et des assurances que nous avons vérifiés. Si vous cherchez un exécutant sans vouloir rejoindre le réseau, la page <a href=\"sous-traitance-professionnels.html\">sous-traitance entre professionnels</a> est ouverte à tous." }
  ]
};
