/* =========================================================================
   Accords français des noms de département
   -------------------------------------------------------------------------
   « du Pyrénées-Orientales » ou « dans le Hérault » ruine la crédibilité
   d'un site de communication visuelle, et se répète ici sur des centaines de
   pages. Les départements français n'ont pas tous le même genre ni le même
   nombre, et certains ne prennent pas d'article du tout. On encode donc le
   genre grammatical une bonne fois, et on dérive les formes contractées.

     m = masculin singulier   → le Rhône,   du Rhône,   dans le Rhône
     f = féminin singulier    → la Marne,   de la Marne, dans la Marne
     p = pluriel              → les Landes, des Landes, dans les Landes
     e = sans article, « en » → Ille-et-Vilaine, d'Ille-et-Vilaine, en Ille-et-Vilaine
     a = sans article, « à »  → Paris,      de Paris,   à Paris

   L'élision (« l'Aude », « d'Ille-et-Vilaine ») est déduite de l'initiale.
   Attention au h : il est muet dans Hérault — « l'Hérault » — mais aspiré
   dans tous les Haut/Haute/Hauts, où l'élision serait une faute : on écrit
   « du Haut-Rhin » et « de la Haute-Garonne », jamais « de l'Haut-Rhin ».

   Les départements composés en « X-et-Y » (Ille-et-Vilaine, Saône-et-Loire…)
   s'emploient sans article et avec « en », ce que `genre` applique par
   défaut sans qu'il faille les lister un à un.
   ========================================================================= */

const GENRE = {
  /* ---- pluriels : la faute la plus visible, « du Pyrénées-Orientales » */
  "Pyrénées-Orientales": "p", "Pyrénées-Atlantiques": "p", "Hautes-Pyrénées": "p",
  "Alpes-Maritimes": "p", "Hautes-Alpes": "p", "Alpes-de-Haute-Provence": "p",
  "Bouches-du-Rhône": "p", "Hauts-de-Seine": "p", "Côtes-d'Armor": "p",
  "Ardennes": "p", "Deux-Sèvres": "p", "Yvelines": "p", "Vosges": "p", "Landes": "p",

  /* ---- féminins */
  "Haute-Garonne": "f", "Loire-Atlantique": "f", "Gironde": "f", "Marne": "f",
  "Loire": "f", "Seine-Maritime": "f", "Isère": "f", "Côte-d'Or": "f",
  "Sarthe": "f", "Haute-Vienne": "f", "Haute-Savoie": "f", "Moselle": "f",
  "Somme": "f", "Vienne": "f", "Charente-Maritime": "f", "Aude": "f",
  "Aisne": "f", "Oise": "f", "Aube": "f", "Yonne": "f", "Nièvre": "f",
  "Savoie": "f", "Drôme": "f", "Charente": "f", "Dordogne": "f", "Corrèze": "f",
  "Vendée": "f", "Mayenne": "f", "Manche": "f", "Eure": "f", "Indre": "f",
  "Corse-du-Sud": "f", "Haute-Corse": "f", "Seine-Saint-Denis": "f",
  "Haute-Saône": "f", "Meuse": "f", "Orne": "f", "Essonne": "f", "Ardèche": "f",
  "Creuse": "f", "Haute-Marne": "f", "Haute-Loire": "f", "Lozère": "f",
  "Martinique": "f", "Guadeloupe": "f", "Guyane": "f", "Mayotte": "f",

  /* ---- masculins */
  "Rhône": "m", "Hérault": "m", "Bas-Rhin": "m", "Haut-Rhin": "m", "Nord": "m",
  "Var": "m", "Gard": "m", "Puy-de-Dôme": "m", "Finistère": "m", "Doubs": "m",
  "Loiret": "m", "Calvados": "m", "Vaucluse": "m", "Pas-de-Calais": "m",
  "Territoire de Belfort": "m", "Ain": "m", "Allier": "m", "Morbihan": "m",
  "Cher": "m", "Tarn": "m", "Val-d'Oise": "m", "Val-de-Marne": "m", "Lot": "m",
  "Jura": "m", "Cantal": "m", "Aveyron": "m", "Gers": "m", "Ariège": "f",

  /* ---- sans article, avec « à » */
  "Paris": "a", "La Réunion": "a",
};

/** Genre grammatical d'un département : m, f, p, e ou a. */
function genre(name) {
  if (GENRE[name]) return GENRE[name];
  /* Les départements composés « X-et-Y » ne prennent pas d'article :
     on dit « en Ille-et-Vilaine », « de Saône-et-Loire ». */
  if (/-et-/.test(name)) return "e";
  return "m";
}

/* Le seul département français dont le h initial est muet. Partout ailleurs
   (Haut-Rhin, Haute-Garonne, Hauts-de-Seine) le h est aspiré : pas d'élision. */
const H_MUET = /^Hérault$/;

/** Vrai si le nom impose l'élision : voyelle en initiale, ou h muet. */
function elide(name) {
  return /^[aeiouyàâäéèêëîïôöùûü]/i.test(name) || H_MUET.test(name);
}

/** « le Rhône », « l'Hérault », « la Marne », « les Landes », « Paris ». */
function le(name) {
  const g = genre(name);
  if (g === "a" || g === "e") return name;
  if (g === "p") return "les " + name;
  if (elide(name)) return "l'" + name;
  return (g === "f" ? "la " : "le ") + name;
}

/** « du Rhône », « de l'Hérault », « de la Marne », « des Landes », « d'Ille-et-Vilaine ». */
function du(name) {
  const g = genre(name);
  if (g === "a" || g === "e") return (elide(name) ? "d'" : "de ") + name;
  if (g === "p") return "des " + name;
  if (elide(name)) return "de l'" + name;
  return (g === "f" ? "de la " : "du ") + name;
}

/** « dans le Rhône », « dans l'Hérault », « en Ille-et-Vilaine », « à Paris ». */
function dans(name) {
  const g = genre(name);
  if (g === "a") return "à " + name;
  if (g === "e") return "en " + name;
  if (g === "p") return "dans les " + name;
  if (elide(name)) return "dans l'" + name;
  return (g === "f" ? "dans la " : "dans le ") + name;
}

module.exports = { genre, le, du, dans };
