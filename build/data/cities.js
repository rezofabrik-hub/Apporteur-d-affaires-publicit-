/* =========================================================================
   Couverture villes — assemblage des deux sources
   -------------------------------------------------------------------------
   Le site couvre les grandes villes des 96 départements métropolitains, plus
   l'outre-mer. Cette couverture vient de deux endroits qu'il ne faut surtout
   pas mélanger :

     · cities-curated.js — les villes travaillées à la main. Quartiers réels,
       zones d'activité nommées, contraintes de terrain (tramontane, air
       salin, secteur patrimonial). C'est du contenu que personne ne peut
       générer, et c'est lui qui fait la différence en référencement local.

     · cities-auto.js — produit par `node tools/gen_villes.js` depuis l'API
       Découpage administratif de l'État. Codes postaux, populations et
       communes limitrophes officiels, pour toutes les villes que la version
       manuelle ne couvre pas encore.

   ORDRE — il ne doit pas bouger à la légère. Les villes travaillées à la
   main viennent en tête, et le build ne décline la matrice métier × ville
   que sur les premières entrées (MATRIX_CITIES dans build/build.js).
   Réordonner ce tableau reviendrait donc à supprimer des pages déjà
   indexées pour en créer d'autres : à éviter sans raison sérieuse.

   Le manuel l'emporte : une ville présente dans les deux fichiers n'est
   retenue que dans sa version rédigée.
   ========================================================================= */
const curated = require("./cities-curated");
const auto = require("./cities-auto");
const prefectures = require("./prefectures");

/* Le dédoublonnage porte sur le couple (département, nom) autant que sur le
   slug : le fichier manuel a ses propres raccourcis d'URL — `cherbourg` pour
   Cherbourg-en-Cotentin, `saint-denis-93` pour distinguer celui de
   Seine-Saint-Denis de son homonyme réunionnais. Comparer les seuls slugs
   publierait deux pages pour la même ville, sous deux adresses concurrentes.
   Les URL déjà en ligne l'emportent, sans exception. */
const cle = (v) => v.dept + "|" + v.name.toLowerCase();
const dejaVues = new Set(curated.map((v) => v.slug));
const dejaNommees = new Set(curated.map(cle));
const liste = curated.concat(
  auto.filter((v) => !dejaVues.has(v.slug) && !dejaNommees.has(cle(v)))
);

/* Le statut de préfecture est appliqué ici depuis la liste officielle plutôt
   que recopié dans chaque fiche : personne n'a à se souvenir que le chef-lieu
   de l'Ardèche est Privas et non Annonay, sa plus grande ville. */
liste.forEach((v) => {
  if (prefectures[v.dept] === v.name) v.prefecture = true;
});

module.exports = liste;
