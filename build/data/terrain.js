/* =========================================================================
   CONTRAINTES DE TERRAIN PAR VILLE
   -------------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE

   Les pages « métier + ville » se ressemblaient à 70 % d'une ville à l'autre,
   mesuré en 5-grammes. C'est la limite du gabarit : la FAQ, la grille de
   prix, les blocs de service et le pied de page sont identiques partout, et
   seul le nom de la ville changeait vraiment. Google appelle ça des pages
   satellites, et il les déclasse — en produire davantage aurait donc coûté
   des positions au lieu d'en gagner.

   La réponse n'est pas de paraphraser le même texte en huit variantes : au
   bout de quelques centaines de pages, la paraphrase se voit. La réponse est
   d'ajouter du contenu qui DIFFÈRE RÉELLEMENT d'une ville à l'autre parce
   qu'il décrit une réalité différente.

   CE QUI EST ENCODÉ ICI, ET POURQUOI C'EST VRAI

   Quatre familles de contraintes, toutes vérifiables, toutes déterminantes
   pour une enseigne — ce ne sont pas des variations rédactionnelles mais des
   faits techniques qui changent le matériau, la fixation ou le calcul :

     · littoral      → l'air salin pique l'acier zingué en une saison ;
     · montagne      → gel, charge de neige, amplitude thermique ;
     · vent nommé    → tramontane, mistral, vents d'ouest : prise au vent ;
     · ensoleillement→ au-delà de 2 500 h/an, une impression non laminée
                       perd ses rouges en dix-huit mois.

   S'y ajoute le régime de TLPE, qui dépend de la strate de population de la
   commune — donnée officielle, et qui varie mécaniquement d'une ville à
   l'autre.

   CE QUI N'EST PAS ENCODÉ

   Aucun climat inventé, aucune « spécificité locale » rédigée à la louche.
   Les listes de départements ci-dessous sont fermées et vérifiables. Une
   ville qui n'appartient à aucune ne reçoit aucune contrainte de terrain :
   mieux vaut une page plus courte qu'une page qui affirme n'importe quoi à
   un lecteur qui habite sur place.
   ========================================================================= */

/* Départements ayant une façade maritime. Liste fermée : 26 départements
   métropolitains, Corse comprise. */
const LITTORAL = new Set([
  "59", "62", "80", "76", "14", "50", "35", "22", "29", "56", "44", "85",
  "17", "33", "40", "64", "66", "11", "34", "30", "13", "83", "06", "2A", "2B"
]);

/* Départements portant un massif significatif — Alpes, Pyrénées, Massif
   central, Jura, Vosges, Corse. Le critère retenu est la présence de communes
   d'altitude soumises au gel et à la charge de neige, pas le point culminant. */
const MONTAGNE = new Set([
  "74", "73", "38", "05", "04", "26", "01", "39", "25", "88", "68", "70", "90",
  "64", "65", "31", "09", "66", "15", "43", "63", "48", "12", "07", "42", "19",
  "2A", "2B"
]);

/* Régimes de vent nommés. Ce sont ceux qui changent un calcul de prise au
   vent, pas de simples brises : la tramontane et le mistral dépassent
   régulièrement 100 km/h, les vents d'ouest atlantiques soufflent en rafales
   soutenues sur le littoral. */
const VENTS = [
  { code: "tramontane", depts: ["66", "11", "34", "09"],
    texte: "La tramontane souffle plus de cent jours par an et dépasse régulièrement 100 km/h. Sur une enseigne drapeau, un totem ou une bâche de terrasse, la prise au vent se calcule — elle ne s'estime pas. C'est la première cause d'arrachement dans le secteur, et au-delà de 6 m² une bâche pleine se comporte comme une voile : la mesh microperforée devient indispensable." },
  { code: "mistral", depts: ["13", "84", "26", "07", "30", "04", "83"],
    texte: "Le mistral impose ici ce que les autres régions ignorent : une enseigne drapeau ou un totem doit être dimensionné pour des rafales dépassant 100 km/h, et la fixation compte autant que la structure. Un scellement chimique correct coûte quelques dizaines d'euros de plus qu'une cheville standard, et évite une dépose d'urgence après le premier coup de vent." },
  { code: "atlantique", depts: ["29", "22", "56", "44", "85", "17", "33", "40", "35", "50"],
    texte: "Les vents d'ouest soufflent ici en rafales soutenues une bonne partie de l'année, chargés d'humidité. Sur les supports extérieurs, cela se traduit par deux exigences : une fixation calculée plutôt qu'estimée, et une attention particulière aux joints et aux entrées d'eau, qui travaillent bien plus vite qu'à l'intérieur des terres." },
  { code: "manche", depts: ["59", "62", "80", "76", "14"],
    texte: "Le régime de vent de la Manche et de la mer du Nord, combiné à une pluviométrie élevée, met les supports extérieurs à rude épreuve. L'étanchéité d'un caisson lumineux et la qualité des joints comptent ici davantage qu'ailleurs : une infiltration dans un caisson LED, c'est une panne d'alimentation dans les mois qui suivent." }
];

/* Départements à fort ensoleillement — au-delà d'environ 2 500 heures par an,
   la question du laminat anti-UV cesse d'être une option de confort. */
const FORT_UV = new Set([
  "66", "11", "34", "30", "13", "83", "06", "84", "04", "05", "2A", "2B"
]);

/* ------------------------------------------------------------------ outils */

/** Population numérique à partir du libellé affiché (« 121 000 »). */
function habitants(city) {
  const n = parseInt(String(city.pop || "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

/* Strates de la taxe locale sur la publicité extérieure (article L.2333-9 du
   code général des collectivités territoriales). Les tarifs maximaux sont
   fixés par strate de population et réévalués chaque année : on décrit donc
   la strate, jamais un montant — un chiffre en euros serait périmé au
   1er janvier suivant, et faux sur une page qui reste en ligne des années.

   Précision qui compte autant que la strate elle-même : la TLPE n'est due que
   si la commune ou son EPCI l'a instituée par délibération. Beaucoup de
   petites communes ne l'ont pas fait, et l'annoncer comme systématique serait
   une erreur qu'un commerçant vérifie en un appel à sa mairie. */
function strateTlpe(city) {
  const h = habitants(city);
  if (h >= 200000) {
    return "Au-delà de 200 000 habitants, " + city.name + " relève de la strate la plus élevée de la taxe locale sur la publicité extérieure : c'est le tarif au mètre carré le plus fort du barème. Sur une enseigne de grande surface, la taxe annuelle devient une ligne de budget à part entière, et elle se calcule dès la conception — réduire la surface taxable de quelques mètres carrés se décide sur le plan, pas après la pose.";
  }
  if (h >= 50000) {
    return "Avec plus de 50 000 habitants, " + city.name + " relève de la strate intermédiaire du barème de la taxe locale sur la publicité extérieure. La surface totale des enseignes détermine le montant, avec un seuil d'exonération en dessous duquel rien n'est dû : c'est un arbitrage qui se fait au moment du dessin, pas une fois l'enseigne posée.";
  }
  return "En dessous de 50 000 habitants, " + city.name + " relève de la strate la plus basse du barème de la taxe locale sur la publicité extérieure — quand elle est instituée, car beaucoup de communes de cette taille ne l'ont pas votée. La question se pose en une phrase à la mairie, et la réponse peut représenter plusieurs centaines d'euros par an.";
}

/** Description du tissu commercial, dérivée de la taille réelle de la ville. */
function tissu(city) {
  const h = habitants(city);
  const d = "le département " + city.dept;
  if (h >= 150000) {
    return "À cette échelle, trois marchés coexistent sans se ressembler : un hypercentre où la devanture se joue au détail et souvent sous contrainte réglementaire, des quartiers de report où le commerce de proximité cherche à se distinguer sans budget d'agglomération, et des zones commerciales périphériques où la lisibilité à 80 km/h commande tout. Un même professionnel les traite rarement aussi bien tous les trois.";
  }
  if (h >= 50000) {
    return "Une ville de cette taille concentre l'essentiel de son commerce sur un centre piétonnier ou semi-piétonnier et une à trois zones commerciales de périphérie. Les deux terrains n'appellent ni les mêmes dimensions ni les mêmes matériaux : en centre, la contrainte est réglementaire et esthétique ; en zone, elle est routière.";
  }
  if (h >= 15000) {
    return "Le commerce s'y organise autour d'un centre-ville resserré et d'une zone d'activité qui capte le flux routier. C'est une configuration où l'enseigne compte davantage qu'en grande agglomération : il y a moins de concurrence visuelle, donc un support bien conçu se voit réellement — et un support raté se remarque tout autant.";
  }
  return "Dans une commune de cette taille, la visibilité se joue sur peu de supports : la devanture, la signalétique directionnelle et, souvent, le véhicule de l'entreprise, qui circule dans tout " + d + " et fait plus de kilomètres publicitaires que n'importe quel panneau. C'est un budget modeste bien employé qui produit le meilleur retour.";
}

/**
 * Contraintes de terrain applicables à une ville, sous forme de phrases
 * prêtes à insérer. Renvoie un tableau, éventuellement vide : une ville de
 * plaine, à l'intérieur des terres et sans régime de vent nommé n'a pas de
 * contrainte particulière, et il vaut mieux ne rien dire que meubler.
 */
function contraintes(city) {
  const out = [];
  const d = city.dept;

  if (LITTORAL.has(d)) {
    out.push({
      titre: "Atmosphère saline",
      texte: "La façade maritime " + (city.deptName ? "du département" : "") +
        " place une partie de l'agglomération en atmosphère saline. L'air salé attaque l'acier zingué en une saison et pique même l'inox 304 en quelques années : sur toute visserie et toute structure extérieure, l'inox 316 devient le minimum, et la laque doit être de qualité marine. C'est un surcoût de quelques pour cent à la fabrication, contre une refabrication complète à cinq ans."
    });
  }

  const vent = VENTS.find((v) => v.depts.indexOf(d) !== -1);
  if (vent) out.push({ titre: "Prise au vent", texte: vent.texte });

  if (MONTAGNE.has(d)) {
    out.push({
      titre: "Gel et charge de neige",
      texte: "Les communes d'altitude du secteur imposent deux vérifications qu'on oublie en plaine : la charge de neige sur les enseignes en saillie et les auvents, et le comportement au gel des matériaux et des colles. Un adhésif posé en dessous de 10 °C n'adhère pas durablement, et l'amplitude thermique fait travailler les panneaux composites — le mode de fixation doit l'autoriser."
    });
  }

  if (FORT_UV.has(d)) {
    out.push({
      titre: "Ensoleillement",
      texte: "Avec un ensoleillement parmi les plus élevés de France, le laminat anti-UV cesse d'être une option de confort. Sans lui, une impression quadri perd ses rouges en dix-huit mois et un adhésif de vitrine devient cassant. Faites préciser le support ET le laminat dans le devis : c'est la ligne que les propositions les moins chères omettent."
    });
  }

  return out;
}

module.exports = { contraintes, strateTlpe, tissu, habitants, LITTORAL, MONTAGNE, FORT_UV };
