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
     OFFRE DE LANCEMENT — la réponse au problème d'amorçage.
     Sans partenaires, impossible de servir la demande ; sans demande, personne
     ne paie. Les deux mois gratuits cassent ce blocage.

     Ils constituent désormais une formule à part entière — Découverte, à 0 € —
     et non plus une remise appliquée aux formules payantes : un prix affiché à
     zéro lève l'objection d'entrée bien plus efficacement qu'un rabais, et il
     évite au partenaire d'avoir à choisir une durée avant d'avoir rien vu.
     Passez `active: false` quand le réseau est suffisamment garni : la formule
     Découverte disparaîtra alors des cartes tarifaires et du questionnaire.
  --------------------------------------------------------------------- */
  launch: {
    active: true,
    label: "Offre de lancement",
    headline: "Les 2 premiers mois à 0 €",
    sub: "Le réseau se constitue : les premières entreprises inscrites reçoivent les demandes de leur zone pendant deux mois, gratuitement et sans engagement.",
    detail: "Vous jugez sur pièces. À l'issue des deux mois, vous choisissez votre abonnement pour la première année — 6 mois ou 12 mois — ou vous ne donnez pas suite, sans frais ni justification.",
    conditions: [
      "Offre réservée aux premières entreprises inscrites, dans la limite des places par zone et par métier",
      "Deux mois à 0 €, sans prélèvement et sans carte bancaire demandée",
      "Aucune commission sur les affaires signées, pendant les deux mois comme après",
      "À l'issue des deux mois, vous choisissez entre l'abonnement 6 mois et l'abonnement 12 mois",
      "Aucun basculement automatique : sans accord explicite de votre part, l'accès s'arrête"
    ],
    badge: "2 mois à 0 €"
  },

  /* Devise et mentions affichées sous les prix */
  currency: "€",
  vatNote: "Montants hors taxes. Sans reconduction tacite : vous décidez du renouvellement.",

  /* ---------------------------------------------------------------------
     Les formules, dans l'ordre du parcours réel : on essaie gratuitement,
     puis on s'abonne pour la première année sur 6 ou 12 mois.
     `free: true` marque la formule d'essai — elle n'est affichée que tant que
     `launch.active` vaut true. `featured: true` met une formule en avant.
     Les tarifs des deux abonnements sont inchangés : 390 € et 690 €.
  --------------------------------------------------------------------- */
  plans: [
    {
      id: "decouverte",
      name: "Découverte",
      duration: "2 mois",
      price: "0",
      free: true,
      badge: "Offre de lancement",
      priceNote: "gratuit, sans carte bancaire et sans engagement",
      pitch: "Recevez les demandes de votre zone pendant deux mois avant de décider quoi que ce soit.",
      audience: "Toute entreprise du secteur qui veut mesurer le flux avant de s'engager",
      features: [
        "Référencement dans l'annuaire du réseau",
        "Réception des demandes correspondant à vos capacités déclarées",
        "Zone d'intervention d'un département",
        "Jusqu'à 2 métiers déclarés",
        "Fiche entreprise avec logo, photos et coordonnées",
        "Aucune commission sur les affaires signées",
        "Bilan des demandes transmises au terme des deux mois"
      ],
      notIncluded: ["Mise en avant prioritaire", "Page dédiée sur le site"]
    },
    {
      id: "semestriel",
      name: "Abonnement 6 mois",
      duration: "6 mois",
      price: "390",
      priceNote: "soit 65 € par mois",
      pitch: "Pour poursuivre après les deux mois d'essai sans engager une année entière.",
      audience: "Artisan, indépendant, structure de 1 à 3 personnes",
      features: [
        "Tout ce que comprend la formule Découverte",
        "Référencement maintenu sans interruption",
        "Zone d'intervention d'un département",
        "Jusqu'à 2 métiers déclarés",
        "Bilan des demandes transmises à mi-parcours",
        "Aucune commission sur les affaires signées"
      ],
      notIncluded: ["Mise en avant prioritaire", "Page dédiée sur le site"]
    },
    {
      id: "annuel",
      name: "Abonnement 12 mois",
      duration: "12 mois",
      price: "690",
      priceNote: "soit 57,50 € par mois — 90 € de moins que deux semestres",
      featured: true,
      badge: "Le plus choisi",
      pitch: "La formule de référence pour une entreprise structurée qui veut un flux régulier sur l'année.",
      audience: "Enseigniste, imprimeur, poseur, agence, structure de 3 à 20 personnes",
      features: [
        "Tout ce que comprend l'abonnement 6 mois",
        "Zone d'intervention étendue : jusqu'à 3 départements",
        "Métiers déclarés illimités",
        "Priorité d'envoi sur les demandes de votre spécialité",
        "Page dédiée sur le site, indexée par les moteurs de recherche",
        "Mise en avant sur les pages villes de votre zone",
        "Bilan semestriel des demandes transmises",
        "Accompagnement sur les dossiers multi-sites et les appels d'offres",
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
     "Le site couvre 120 villes, 8 métiers et 12 secteurs d'activité. Votre fiche partenaire profite de cette surface, qu'une entreprise seule mettrait des années à construire."],
    ["Un filtrage par capacités réelles",
     "Nacelle, CACES, parc de véhicules, machines d'atelier, hauteur d'intervention : votre profil technique détermine les demandes que vous recevez. Vous ne perdez pas de temps sur des chantiers que vous auriez refusés."],
    ["Vous gardez le client",
     "Vous facturez en direct, vous fixez vos prix, vous conservez la relation et le service après-vente. Nous n'intervenons ni dans le contrat, ni dans l'exécution."],
    ["Une alternative claire à la franchise",
     "Pas de droit d'entrée à cinq chiffres, pas de redevance sur le chiffre d'affaires, pas de fournisseurs imposés, pas de contrainte d'enseigne. Vous restez indépendant."]
  ],

  /* Comparaison honnête avec les autres façons de trouver des chantiers */
  comparison: {
    head: ["", "Abonnement partenaire", "Franchise du secteur", "Achat de contacts"],
    rows: [
      ["Coût d'entrée", "Aucun", "15 000 à 60 000 €", "Aucun"],
      ["Coût récurrent", "Abonnement fixe", "Redevance sur le chiffre d'affaires", "Au contact, sans plafond"],
      ["Commission sur affaires", "Aucune", "Incluse dans la redevance", "Aucune"],
      ["Votre enseigne", "La vôtre", "Celle du réseau", "La vôtre"],
      ["Fournisseurs", "Libres", "Imposés", "Libres"],
      ["Nombre de destinataires par demande", "2 à 3", "Sans objet", "5 à 10 selon les plateformes"],
      ["Demande qualifiée par téléphone", "Oui", "Sans objet", "Rarement"],
      ["Engagement", "6 ou 12 mois", "5 à 7 ans", "Aucun"]
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
    { q: "Comment fonctionne la formule Découverte à 0 € ?", a: "Vous remplissez le questionnaire, nous vérifions votre dossier, et vous recevez les demandes de votre zone pendant deux mois sans rien payer et sans carte bancaire. À l'issue de cette période, nous faisons le point sur ce qui vous a été transmis et vous choisissez votre abonnement pour la première année : 6 mois à 390 € ou 12 mois à 690 €. Si le flux ne vous convient pas, vous ne donnez pas suite et cela s'arrête là." },
    { q: "Pourquoi une formule à 0 € ?", a: "Parce qu'un réseau qui démarre a un problème d'amorçage : sans partenaires nous ne pouvons pas servir les demandes, et sans demandes personne n'a envie de payer. Les deux premiers mois à zéro euro cassent ce blocage — vous jugez sur pièces, nous constituons le réseau. C'est temporaire et réservé aux premières entreprises inscrites." },
    { q: "Pourquoi un abonnement plutôt qu'une commission ?", a: "Parce qu'une commission variable pousse l'intermédiaire à privilégier les gros dossiers et à vous envoyer un maximum de demandes, qualifiées ou non. L'abonnement inverse la logique : notre intérêt devient de vous garder d'une année sur l'autre, donc de vous transmettre des demandes que vous transformez réellement. Vous gardez par ailleurs 100 % de la marge sur chaque chantier signé." },
    { q: "Combien de partenaires par zone et par métier ?", a: "Deux à quatre selon la densité du territoire. Nous ne saturons pas une zone : un partenaire qui ne transforme jamais rien ne renouvelle pas, ce qui n'a d'intérêt pour personne." },
    { q: "Que se passe-t-il si je ne reçois pas de demandes ?", a: "Nous suivons le volume transmis à chaque partenaire. Si votre zone se révèle moins active que prévu, nous élargissons votre périmètre ou vos métiers déclarés sans surcoût. C'est précisément la raison d'être de la formule Découverte : deux mois à zéro euro vous permettent de mesurer le flux réel de votre secteur avant d'engager le moindre euro." },
    { q: "L'abonnement est-il reconduit automatiquement ?", a: "Non, et la formule Découverte ne bascule pas davantage en abonnement payant toute seule. Aucune reconduction tacite nulle part : nous vous recontactons avant l'échéance avec le bilan des demandes transmises, et vous décidez. C'est un choix assumé — un partenaire reconduit par inertie est un partenaire mécontent." },
    { q: "Puis-je passer du 6 mois au 12 mois ?", a: "Oui, à tout moment : la différence est calculée au prorata du temps restant, sans frais de changement. Le passage de l'abonnement 12 mois vers le 6 mois s'effectue en revanche à l'échéance." },
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
        duration: "6 mois",
        price: "290",
        priceNote: "soit 48 € par mois",
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
        price: "790",
        priceNote: "soit 66 € par mois — demandes illimitées",
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
