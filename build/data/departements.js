/* =========================================================================
   Départements français et leurs voisins terrestres.

   Sert à proposer automatiquement au partenaire les départements limitrophes
   du sien, pour qu'il déclare une zone de trois départements cohérente plutôt
   que de piocher au hasard dans une liste de cent une entrées.

   La relation est symétrique par construction : `checkSymetrie()` en fin de
   fichier le vérifie à chaque génération du site et interrompt le build en
   cas d'oubli. C'est la seule protection efficace contre une faute de frappe
   dans un tableau de cette taille.

   Les frontières maritimes ne comptent pas : la Corse n'a que ses deux
   départements, et les territoires d'outre-mer aucun voisin. Les frontières
   avec un pays étranger ne figurent évidemment pas non plus.
   ========================================================================= */

const DEPTS = {
  "01": ["Ain", ["39", "71", "69", "38", "73", "74"]],
  "02": ["Aisne", ["59", "80", "60", "77", "51", "08"]],
  "03": ["Allier", ["18", "58", "71", "42", "63", "23"]],
  "04": ["Alpes-de-Haute-Provence", ["05", "26", "84", "83", "06"]],
  "05": ["Hautes-Alpes", ["38", "73", "26", "04"]],
  "06": ["Alpes-Maritimes", ["04", "83"]],
  "07": ["Ardèche", ["42", "43", "48", "30", "84", "26", "38"]],
  "08": ["Ardennes", ["02", "51", "55"]],
  "09": ["Ariège", ["31", "11", "66"]],
  "10": ["Aube", ["89", "21", "52", "51", "77"]],
  "11": ["Aude", ["09", "31", "81", "34", "66"]],
  "12": ["Aveyron", ["46", "15", "48", "30", "34", "81", "82"]],
  "13": ["Bouches-du-Rhône", ["30", "84", "83"]],
  "14": ["Calvados", ["50", "61", "27"]],
  "15": ["Cantal", ["19", "63", "43", "48", "12", "46"]],
  "16": ["Charente", ["17", "79", "86", "87", "24"]],
  "17": ["Charente-Maritime", ["85", "79", "16", "33"]],
  "18": ["Cher", ["41", "45", "58", "03", "23", "36"]],
  "19": ["Corrèze", ["24", "87", "23", "63", "15", "46"]],
  "21": ["Côte-d'Or", ["89", "10", "52", "70", "39", "71", "58"]],
  "22": ["Côtes-d'Armor", ["29", "56", "35"]],
  "23": ["Creuse", ["36", "18", "03", "63", "19", "87"]],
  "24": ["Dordogne", ["16", "87", "19", "46", "47", "33"]],
  "25": ["Doubs", ["70", "90", "39"]],
  "26": ["Drôme", ["38", "05", "04", "84", "07"]],
  "27": ["Eure", ["76", "60", "95", "78", "28", "61", "14"]],
  "28": ["Eure-et-Loir", ["27", "78", "91", "45", "41", "72", "61"]],
  "29": ["Finistère", ["22", "56"]],
  "2A": ["Corse-du-Sud", ["2B"]],
  "2B": ["Haute-Corse", ["2A"]],
  "30": ["Gard", ["07", "48", "12", "34", "13", "84"]],
  "31": ["Haute-Garonne", ["32", "82", "81", "11", "09", "65"]],
  "32": ["Gers", ["40", "47", "82", "31", "65", "64"]],
  "33": ["Gironde", ["17", "24", "47", "40"]],
  "34": ["Hérault", ["12", "30", "81", "11", "48"]],
  "35": ["Ille-et-Vilaine", ["22", "56", "44", "49", "53", "50"]],
  "36": ["Indre", ["37", "41", "18", "23", "87", "86"]],
  "37": ["Indre-et-Loire", ["72", "41", "36", "86", "49"]],
  "38": ["Isère", ["01", "73", "05", "26", "07", "42", "69"]],
  "39": ["Jura", ["21", "70", "25", "01", "71"]],
  "40": ["Landes", ["33", "47", "32", "64"]],
  "41": ["Loir-et-Cher", ["28", "45", "18", "36", "37", "72"]],
  "42": ["Loire", ["71", "03", "63", "43", "07", "38", "69"]],
  "43": ["Haute-Loire", ["63", "42", "07", "48", "15"]],
  "44": ["Loire-Atlantique", ["35", "49", "85", "56"]],
  "45": ["Loiret", ["28", "91", "77", "89", "58", "18", "41"]],
  "46": ["Lot", ["24", "19", "15", "12", "82", "47"]],
  "47": ["Lot-et-Garonne", ["33", "24", "46", "82", "32", "40"]],
  "48": ["Lozère", ["15", "43", "07", "30", "34", "12"]],
  "49": ["Maine-et-Loire", ["35", "53", "72", "37", "86", "79", "85", "44"]],
  "50": ["Manche", ["14", "61", "35", "53"]],
  "51": ["Marne", ["02", "08", "55", "52", "10", "77"]],
  "52": ["Haute-Marne", ["51", "55", "88", "70", "21", "10"]],
  "53": ["Mayenne", ["50", "35", "49", "72", "61"]],
  "54": ["Meurthe-et-Moselle", ["55", "57", "88"]],
  "55": ["Meuse", ["08", "51", "52", "88", "54", "57"]],
  "56": ["Morbihan", ["29", "22", "35", "44"]],
  "57": ["Moselle", ["54", "55", "67"]],
  "58": ["Nièvre", ["45", "89", "21", "71", "03", "18"]],
  "59": ["Nord", ["62", "02"]],
  "60": ["Oise", ["80", "02", "77", "95", "27", "76"]],
  "61": ["Orne", ["14", "27", "28", "72", "53", "50"]],
  "62": ["Pas-de-Calais", ["59", "80"]],
  "63": ["Puy-de-Dôme", ["03", "23", "19", "15", "43", "42"]],
  "64": ["Pyrénées-Atlantiques", ["40", "32", "65"]],
  "65": ["Hautes-Pyrénées", ["64", "32", "31"]],
  "66": ["Pyrénées-Orientales", ["09", "11"]],
  "67": ["Bas-Rhin", ["57", "88", "68"]],
  "68": ["Haut-Rhin", ["67", "88", "90"]],
  "69": ["Rhône", ["71", "01", "38", "42"]],
  "70": ["Haute-Saône", ["52", "88", "90", "25", "39", "21"]],
  "71": ["Saône-et-Loire", ["21", "39", "01", "69", "42", "03", "58"]],
  "72": ["Sarthe", ["61", "28", "41", "37", "49", "53"]],
  "73": ["Savoie", ["74", "01", "38", "05"]],
  "74": ["Haute-Savoie", ["01", "73"]],
  "75": ["Paris", ["92", "93", "94"]],
  "76": ["Seine-Maritime", ["80", "60", "27"]],
  "77": ["Seine-et-Marne", ["02", "51", "10", "89", "45", "91", "94", "93", "95", "60"]],
  "78": ["Yvelines", ["95", "92", "91", "28", "27"]],
  "79": ["Deux-Sèvres", ["49", "86", "16", "17", "85"]],
  "80": ["Somme", ["62", "02", "60", "76"]],
  "81": ["Tarn", ["12", "34", "11", "31", "82"]],
  "82": ["Tarn-et-Garonne", ["46", "12", "81", "31", "32", "47"]],
  "83": ["Var", ["13", "84", "04", "06"]],
  "84": ["Vaucluse", ["26", "04", "83", "13", "30", "07"]],
  "85": ["Vendée", ["44", "49", "79", "17"]],
  "86": ["Vienne", ["37", "36", "87", "16", "79", "49"]],
  "87": ["Haute-Vienne", ["86", "36", "23", "19", "24", "16"]],
  "88": ["Vosges", ["54", "55", "52", "70", "90", "68", "67"]],
  "89": ["Yonne", ["77", "10", "21", "58", "45"]],
  "90": ["Territoire de Belfort", ["68", "88", "70", "25"]],
  "91": ["Essonne", ["78", "92", "94", "77", "45", "28"]],
  "92": ["Hauts-de-Seine", ["75", "93", "94", "91", "78", "95"]],
  "93": ["Seine-Saint-Denis", ["75", "92", "95", "77", "94"]],
  "94": ["Val-de-Marne", ["75", "92", "93", "77", "91"]],
  "95": ["Val-d'Oise", ["78", "92", "93", "77", "60", "27"]],
  /* Outre-mer : aucun voisin terrestre. Le partenaire y couvre son territoire,
     la règle des trois départements limitrophes n'a pas d'objet. */
  "971": ["Guadeloupe", []],
  "972": ["Martinique", []],
  "973": ["Guyane", []],
  "974": ["La Réunion", []],
  "976": ["Mayotte", []]
};

/* Vérification de symétrie : si 66 déclare 11 comme voisin, 11 doit déclarer
   66. Une faute de frappe casse le build plutôt que de produire un formulaire
   qui proposerait un département qui n'existe pas ou une voisine fantôme. */
function checkSymetrie() {
  const erreurs = [];
  Object.keys(DEPTS).forEach((code) => {
    DEPTS[code][1].forEach((v) => {
      if (!DEPTS[v]) return erreurs.push(`${code} cite ${v}, qui n'existe pas`);
      if (!DEPTS[v][1].includes(code)) erreurs.push(`${code} cite ${v}, mais ${v} ne cite pas ${code}`);
    });
  });
  if (erreurs.length) {
    throw new Error("Départements limitrophes — relation non symétrique :\n  " + erreurs.join("\n  "));
  }
}
checkSymetrie();

/** Liste ordonnée : [{ code, nom, voisins }] */
const list = Object.keys(DEPTS).sort().map((code) => ({
  code, nom: DEPTS[code][0], voisins: DEPTS[code][1].slice().sort()
}));

/**
 * Département déduit d'un code postal.
 * Corse : 20xxx se répartit entre 2A et 2B, qu'un code postal seul ne permet
 * pas toujours de trancher — on renvoie null plutôt qu'un mauvais choix.
 * Outre-mer : trois chiffres.
 */
function fromCp(cp) {
  const s = String(cp || "").replace(/\D/g, "");
  if (s.length < 2) return null;
  if (s.startsWith("97") || s.startsWith("98")) return DEPTS[s.slice(0, 3)] ? s.slice(0, 3) : null;
  const d = s.slice(0, 2);
  if (d === "20") return null;
  return DEPTS[d] ? d : null;
}

module.exports = { list, fromCp, byCode: DEPTS };
