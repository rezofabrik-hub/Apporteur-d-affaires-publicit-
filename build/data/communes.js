/* =========================================================================
   Données officielles par commune — et le régime de publicité extérieure
   qui en découle.
   -------------------------------------------------------------------------
   C'est ce fichier qui rend chaque page ville différente des autres pour
   autre chose que son nom. Le code de l'environnement fait dépendre les
   règles d'enseigne et de publicité d'un seuil de population : selon que
   la commune dépasse ou non 10 000 habitants, et selon qu'elle appartient
   ou non à une unité urbaine de plus de 100 000 habitants, un totem est
   permis ou interdit, une enseigne lumineuse autorisée ou non, une affiche
   limitée à 10,50 m² ou à 4,70 m². Ce sont des faits vérifiables, propres
   à la commune, et que les réseaux concurrents ne publient pas.

   SOURCES — aucune de ces valeurs n'est estimée.

   · Population municipale : Insee, recensement 2023, populations de
     référence en vigueur au 1er janvier 2026, fichier « ensemble.xlsx »
     (mise à jour décembre 2025). Le code de l'environnement raisonne sur
     la population de l'agglomération au sens du code de la route ; à
     défaut d'authentification par décret de ce chiffre, il revient au
     maire de le déterminer (CE, 29 mars 1993, Sté Dauphin OTA, n° 143774).
     La population municipale est la référence de travail, pas une
     certitude juridique : la page le dit.

   · Unité urbaine : Insee, zonage en unités urbaines 2020, géographie au
     1er janvier 2023, composition communale. La tranche de taille est
     portée par le troisième caractère du code d'unité urbaine — règle
     vérifiée sans exception sur les 2 487 unités du fichier. Tranche ≥ 6
     signifie plus de 100 000 habitants (54 unités urbaines en France).

   · Règles : code de l'environnement, articles R.581-26, R.581-31,
     R.581-34, R.581-63, R.581-64 et R.581-65, lus dans le guide pratique
     « La réglementation de la publicité extérieure » du ministère de la
     Transition écologique, édition de janvier 2025. La surface unitaire
     maximale de la publicité murale a été ramenée de 12 m² à 10,50 m² par
     l'article 2 du décret n° 2023-1007 du 30 octobre 2023 : c'est 10,50 m²
     qu'il faut retenir, et non le chiffre que l'on lit encore partout.

   · Monuments historiques (champ « mh ») : ministère de la Culture, base
     Mérimée, fichier POP « merimee.csv », 46 753 immeubles protégés répartis
     sur 16 978 communes. Le comptage se fait sur le code Insee porté par la
     notice au moment de la protection. Pour Paris, Marseille et Lyon, les
     notices se répartissent entre le code de la commune et ceux des
     arrondissements : les deux sont additionnés.

     Ce chiffre vaut pour ce qu'il est : le nombre d'immeubles protégés sur
     la commune. Il ne dit pas si TEL local est concerné — la protection au
     titre des abords joue dans un rayon de 500 mètres ET en covisibilité
     avec le monument (art. L.621-30 du code du patrimoine), ou dans le
     périmètre délimité des abords lorsqu'il en existe un. Les pages doivent
     donc poser la question, jamais trancher à la place de l'ABF.

   ATTENTION en cas de mise à jour : ces chiffres sont opposables. Ne les
   corriger qu'à partir des fichiers Insee, jamais de mémoire.
   ========================================================================= */

const communes = {
  "abbeville": { insee: "80001", pop: 22395, uu: "Abbeville", uuGrande: false, mh: 30 },
  "agde": { insee: "34003", pop: 29939, uu: "Agde", uuGrande: false, mh: 17 },
  "agen": { insee: "47001", pop: 32801, uu: "Agen", uuGrande: false, mh: 34 },
  "aix-en-provence": { insee: "13001", pop: 149695, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 161 },
  "aix-les-bains": { insee: "73008", pop: 32406, uu: "Chambéry", uuGrande: true, mh: 18 },
  "ajaccio": { insee: "2A004", pop: 76320, uu: "Ajaccio", uuGrande: false, mh: 25 },
  "albert": { insee: "80016", pop: 9521, uu: "Albert", uuGrande: false, mh: 5 },
  "albertville": { insee: "73011", pop: 19978, uu: "Albertville", uuGrande: false, mh: 10 },
  "albi": { insee: "81004", pop: 51290, uu: "Albi", uuGrande: false, mh: 37 },
  "alencon": { insee: "61001", pop: 25490, uu: "Alençon", uuGrande: false, mh: 31 },
  "ales": { insee: "30007", pop: 46125, uu: "Alès", uuGrande: false, mh: 7 },
  "amiens": { insee: "80021", pop: 136449, uu: "Amiens", uuGrande: true, mh: 65 },
  "ancenis-saint-gereon": { insee: "44003", pop: 11600, uu: "Ancenis-Saint-Géréon", uuGrande: false, mh: 5 },
  "angers": { insee: "49007", pop: 159022, uu: "Angers", uuGrande: true, mh: 101 },
  "anglet": { insee: "64024", pop: 43271, uu: "Bayonne (partie française)", uuGrande: true, mh: 2 },
  "angouleme": { insee: "16015", pop: 41908, uu: "Angoulême", uuGrande: true, mh: 38 },
  "annecy": { insee: "74010", pop: 132117, uu: "Annecy", uuGrande: true, mh: 26 },
  "annemasse": { insee: "74012", pop: 37628, uu: "Genève (SUI)-Annemasse (partie française)", uuGrande: true, mh: 0 },
  "annonay": { insee: "07010", pop: 17274, uu: "Annonay", uuGrande: false, mh: 5 },
  "antibes": { insee: "06004", pop: 77637, uu: "Nice", uuGrande: true, mh: 15 },
  "arcachon": { insee: "33009", pop: 11092, uu: "La Teste-de-Buch-Arcachon", uuGrande: false, mh: 6 },
  "argeles-sur-mer": { insee: "66008", pop: 10616, uu: "Saint-Cyprien", uuGrande: false, mh: 7 },
  "argentan": { insee: "61006", pop: 13527, uu: "Argentan", uuGrande: false, mh: 19 },
  "argenteuil": { insee: "95018", pop: 106130, uu: "Paris", uuGrande: true, mh: 4 },
  "arles": { insee: "13004", pop: 51811, uu: "Arles", uuGrande: false, mh: 98 },
  "arpajon-sur-cere": { insee: "15012", pop: 6361, uu: "Aurillac", uuGrande: false, mh: 3 },
  "arras": { insee: "62041", pop: 42875, uu: "Arras", uuGrande: false, mh: 227 },
  "asnieres-sur-seine": { insee: "92004", pop: 93941, uu: "Paris", uuGrande: true, mh: 4 },
  "athis-mons": { insee: "91027", pop: 36613, uu: "Paris", uuGrande: true, mh: 2 },
  "aubagne": { insee: "13005", pop: 47529, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 5 },
  "aubenas": { insee: "07019", pop: 12416, uu: "Aubenas", uuGrande: false, mh: 8 },
  "aubervilliers": { insee: "93001", pop: 88365, uu: "Paris", uuGrande: true, mh: 2 },
  "aubusson": { insee: "23008", pop: 3018, uu: "Aubusson", uuGrande: false, mh: 12 },
  "auch": { insee: "32013", pop: 22428, uu: "Auch", uuGrande: false, mh: 25 },
  "aulnay-sous-bois": { insee: "93005", pop: 87599, uu: "Paris", uuGrande: true, mh: 1 },
  "aureilhan": { insee: "65047", pop: 8031, uu: "Tarbes", uuGrande: false, mh: 2 },
  "aurillac": { insee: "15014", pop: 26214, uu: "Aurillac", uuGrande: false, mh: 27 },
  "auxerre": { insee: "89024", pop: 35097, uu: "Auxerre", uuGrande: false, mh: 37 },
  "avignon": { insee: "84007", pop: 92188, uu: "Avignon", uuGrande: true, mh: 165 },
  "bagnols-sur-ceze": { insee: "30028", pop: 18112, uu: "Bagnols-sur-Cèze", uuGrande: false, mh: 12 },
  "bar-le-duc": { insee: "55029", pop: 14607, uu: "Bar-le-Duc", uuGrande: false, mh: 37 },
  "bastelicaccia": { insee: "2A032", pop: 4411, uu: "Bastelicaccia", uuGrande: false, mh: 0 },
  "bastia": { insee: "2B033", pop: 46867, uu: "Bastia", uuGrande: false, mh: 20 },
  "bayeux": { insee: "14047", pop: 12659, uu: "Bayeux", uuGrande: false, mh: 31 },
  "bayonne": { insee: "64102", pop: 54306, uu: "Bayonne (partie française)", uuGrande: true, mh: 25 },
  "beaune": { insee: "21054", pop: 20352, uu: "Beaune", uuGrande: false, mh: 37 },
  "beaupreau-en-mauges": { insee: "49023", pop: 23989, uu: "Beaupréau-en-Mauges", uuGrande: false, mh: 2 },
  "beauvais": { insee: "60057", pop: 55550, uu: "Beauvais", uuGrande: false, mh: 27 },
  "begles": { insee: "33039", pop: 31831, uu: "Bordeaux", uuGrande: true, mh: 4 },
  "belfort": { insee: "90010", pop: 45912, uu: "Belfort", uuGrande: false, mh: 21 },
  "bergerac": { insee: "24037", pop: 27110, uu: "Bergerac", uuGrande: false, mh: 9 },
  "besancon": { insee: "25056", pop: 118489, uu: "Besançon", uuGrande: true, mh: 194 },
  "bethune": { insee: "62119", pop: 25224, uu: "Béthune", uuGrande: true, mh: 16 },
  "beziers": { insee: "34032", pop: 81545, uu: "Béziers", uuGrande: false, mh: 36 },
  "bezons": { insee: "95063", pop: 36434, uu: "Paris", uuGrande: true, mh: 1 },
  "biarritz": { insee: "64122", pop: 26206, uu: "Bayonne (partie française)", uuGrande: true, mh: 12 },
  "biscarrosse": { insee: "40046", pop: 15836, uu: "Biscarrosse", uuGrande: false, mh: 1 },
  "blagnac": { insee: "31069", pop: 27604, uu: "Toulouse", uuGrande: true, mh: 4 },
  "blois": { insee: "41018", pop: 47219, uu: "Blois", uuGrande: false, mh: 70 },
  "bobigny": { insee: "93008", pop: 56927, uu: "Paris", uuGrande: true, mh: 4 },
  "bordeaux": { insee: "33063", pop: 267991, uu: "Bordeaux", uuGrande: true, mh: 385 },
  "borgo": { insee: "2B042", pop: 10311, uu: "Borgo", uuGrande: false, mh: 1 },
  "boulazac-isle-manoire": { insee: "24053", pop: 10759, uu: "Périgueux", uuGrande: false, mh: 1 },
  "boulogne-billancourt": { insee: "92012", pop: 119019, uu: "Paris", uuGrande: true, mh: 19 },
  "boulogne-sur-mer": { insee: "62160", pop: 40539, uu: "Boulogne-sur-Mer", uuGrande: false, mh: 13 },
  "bourg-en-bresse": { insee: "01053", pop: 42372, uu: "Bourg-en-Bresse", uuGrande: false, mh: 35 },
  "bourges": { insee: "18033", pop: 64186, uu: "Bourges", uuGrande: false, mh: 115 },
  "bourgoin-jallieu": { insee: "38053", pop: 30151, uu: "Bourgoin-Jallieu", uuGrande: false, mh: 2 },
  "bressuire": { insee: "79049", pop: 19970, uu: "Bressuire", uuGrande: false, mh: 7 },
  "brest": { insee: "29019", pop: 142346, uu: "Brest", uuGrande: true, mh: 10 },
  "briancon": { insee: "05023", pop: 11411, uu: "Briançon", uuGrande: false, mh: 22 },
  "brive-la-gaillarde": { insee: "19031", pop: 47095, uu: "Brive-la-Gaillarde", uuGrande: false, mh: 20 },
  "bron": { insee: "69029", pop: 42982, uu: "Lyon", uuGrande: true, mh: 1 },
  "bruay-la-buissiere": { insee: "62178", pop: 21424, uu: "Béthune", uuGrande: true, mh: 5 },
  "bussy-saint-georges": { insee: "77058", pop: 27498, uu: "Paris", uuGrande: true, mh: 2 },
  "buxerolles": { insee: "86041", pop: 10289, uu: "Poitiers", uuGrande: true, mh: 0 },
  "caen": { insee: "14118", pop: 109400, uu: "Caen", uuGrande: true, mh: 90 },
  "cagnes-sur-mer": { insee: "06027", pop: 53354, uu: "Nice", uuGrande: true, mh: 3 },
  "cahors": { insee: "46042", pop: 20050, uu: "Cahors", uuGrande: false, mh: 45 },
  "calais": { insee: "62193", pop: 67571, uu: "Calais", uuGrande: false, mh: 13 },
  "caluire-et-cuire": { insee: "69034", pop: 43597, uu: "Lyon", uuGrande: true, mh: 4 },
  "canet-en-roussillon": { insee: "66037", pop: 13227, uu: "Canet-en-Roussillon", uuGrande: false, mh: 3 },
  "cannes": { insee: "06029", pop: 74350, uu: "Nice", uuGrande: true, mh: 19 },
  "carcassonne": { insee: "11069", pop: 46080, uu: "Carcassonne", uuGrande: false, mh: 52 },
  "carpentras": { insee: "84031", pop: 31619, uu: "Avignon", uuGrande: true, mh: 26 },
  "castelnau-le-lez": { insee: "34057", pop: 26058, uu: "Montpellier", uuGrande: true, mh: 4 },
  "castelnaudary": { insee: "11076", pop: 12151, uu: "Castelnaudary", uuGrande: false, mh: 17 },
  "castelsarrasin": { insee: "82033", pop: 14343, uu: "Castelsarrasin", uuGrande: false, mh: 5 },
  "castres": { insee: "81065", pop: 42505, uu: "Castres", uuGrande: false, mh: 22 },
  "cavaillon": { insee: "84035", pop: 25636, uu: "Avignon", uuGrande: true, mh: 14 },
  "cayenne": { insee: "97302", pop: 62675, uu: "Cayenne", uuGrande: true, mh: 43 },
  "cergy": { insee: "95127", pop: 70906, uu: "Paris", uuGrande: true, mh: 4 },
  "challans": { insee: "85047", pop: 22943, uu: "Challans", uuGrande: false, mh: 2 },
  "chalon-sur-saone": { insee: "71076", pop: 45102, uu: "Chalon-sur-Saône", uuGrande: false, mh: 46 },
  "chalons-en-champagne": { insee: "51108", pop: 42971, uu: "Châlons-en-Champagne", uuGrande: false, mh: 53 },
  "chambery": { insee: "73065", pop: 59964, uu: "Chambéry", uuGrande: true, mh: 25 },
  "champigny-sur-marne": { insee: "94017", pop: 78072, uu: "Paris", uuGrande: true, mh: 4 },
  "champs-sur-marne": { insee: "77083", pop: 27451, uu: "Paris", uuGrande: true, mh: 1 },
  "charleville-mezieres": { insee: "08105", pop: 45560, uu: "Charleville-Mézières", uuGrande: false, mh: 63 },
  "chartres": { insee: "28085", pop: 38324, uu: "Chartres", uuGrande: false, mh: 41 },
  "chateau-gontier-sur-mayenne": { insee: "53062", pop: 16584, uu: "Château-Gontier-sur-Mayenne", uuGrande: false, mh: 15 },
  "chateauroux": { insee: "36044", pop: 42963, uu: "Châteauroux", uuGrande: false, mh: 20 },
  "chatellerault": { insee: "86066", pop: 31003, uu: "Châtellerault", uuGrande: false, mh: 16 },
  "chaumont": { insee: "52121", pop: 20827, uu: "Chaumont", uuGrande: false, mh: 22 },
  "chaville": { insee: "92022", pop: 20594, uu: "Paris", uuGrande: true, mh: 0 },
  "chelles": { insee: "77108", pop: 54620, uu: "Paris", uuGrande: true, mh: 2 },
  "chemille-en-anjou": { insee: "49092", pop: 21999, uu: "Chemillé-en-Anjou", uuGrande: false, mh: 7 },
  "chenove": { insee: "21166", pop: 14244, uu: "Dijon", uuGrande: true, mh: 0 },
  "cherbourg": { insee: "50129", pop: 78258, uu: "Cherbourg-en-Cotentin", uuGrande: false, mh: 26 },
  "cholet": { insee: "49099", pop: 54404, uu: "Cholet", uuGrande: false, mh: 5 },
  "clamart": { insee: "92023", pop: 58576, uu: "Paris", uuGrande: true, mh: 8 },
  "clermont-ferrand": { insee: "63113", pop: 146351, uu: "Clermont-Ferrand", uuGrande: true, mh: 181 },
  "cognac": { insee: "16102", pop: 18532, uu: "Cognac", uuGrande: false, mh: 20 },
  "colmar": { insee: "68066", pop: 66970, uu: "Colmar", uuGrande: false, mh: 58 },
  "colombes": { insee: "92025", pop: 91053, uu: "Paris", uuGrande: true, mh: 2 },
  "colomiers": { insee: "31149", pop: 40882, uu: "Toulouse", uuGrande: true, mh: 0 },
  "commercy": { insee: "55122", pop: 5350, uu: "Commercy", uuGrande: false, mh: 9 },
  "compiegne": { insee: "60159", pop: 40761, uu: "Compiègne", uuGrande: false, mh: 48 },
  "concarneau": { insee: "29039", pop: 20845, uu: "Concarneau", uuGrande: false, mh: 8 },
  "condom": { insee: "32107", pop: 6473, uu: "Condom", uuGrande: false, mh: 21 },
  "conflans-sainte-honorine": { insee: "78172", pop: 36958, uu: "Paris", uuGrande: true, mh: 3 },
  "corbeil-essonnes": { insee: "91174", pop: 54471, uu: "Paris", uuGrande: true, mh: 7 },
  "corte": { insee: "2B096", pop: 7819, uu: "Corte", uuGrande: false, mh: 9 },
  "cosne-cours-sur-loire": { insee: "58086", pop: 9733, uu: "Cosne-Cours-sur-Loire", uuGrande: false, mh: 8 },
  "coueron": { insee: "44047", pop: 24103, uu: "Nantes", uuGrande: true, mh: 1 },
  "courbevoie": { insee: "92026", pop: 82902, uu: "Paris", uuGrande: true, mh: 6 },
  "cournon-d-auvergne": { insee: "63124", pop: 19951, uu: "Clermont-Ferrand", uuGrande: true, mh: 3 },
  "creil": { insee: "60175", pop: 36301, uu: "Creil", uuGrande: true, mh: 3 },
  "creteil": { insee: "94028", pop: 93397, uu: "Paris", uuGrande: true, mh: 2 },
  "cugnaux": { insee: "31157", pop: 20662, uu: "Toulouse", uuGrande: true, mh: 2 },
  "dax": { insee: "40088", pop: 22109, uu: "Dax", uuGrande: false, mh: 10 },
  "deauville": { insee: "14220", pop: 3539, uu: "Dives-sur-Mer", uuGrande: false, mh: 4 },
  "delle": { insee: "90033", pop: 5623, uu: "Delle (partie française)", uuGrande: false, mh: 4 },
  "deols": { insee: "36063", pop: 7600, uu: "Châteauroux", uuGrande: false, mh: 9 },
  "dieppe": { insee: "76217", pop: 28496, uu: "Dieppe", uuGrande: false, mh: 25 },
  "digne-les-bains": { insee: "04070", pop: 17979, uu: "Digne-les-Bains", uuGrande: false, mh: 7 },
  "dijon": { insee: "21231", pop: 161830, uu: "Dijon", uuGrande: true, mh: 216 },
  "dole": { insee: "39198", pop: 23840, uu: "Dole", uuGrande: false, mh: 50 },
  "douai": { insee: "59178", pop: 40250, uu: "Douai-Lens", uuGrande: true, mh: 46 },
  "draguignan": { insee: "83050", pop: 40826, uu: "Draguignan", uuGrande: false, mh: 9 },
  "drancy": { insee: "93029", pop: 72390, uu: "Paris", uuGrande: true, mh: 2 },
  "dreux": { insee: "28134", pop: 31543, uu: "Dreux", uuGrande: false, mh: 11 },
  "dunkerque": { insee: "59183", pop: 86263, uu: "Dunkerque", uuGrande: true, mh: 31 },
  "echirolles": { insee: "38151", pop: 37491, uu: "Grenoble", uuGrande: true, mh: 0 },
  "embrun": { insee: "05046", pop: 6412, uu: "Embrun", uuGrande: false, mh: 11 },
  "epernay": { insee: "51230", pop: 22174, uu: "Épernay", uuGrande: false, mh: 8 },
  "epinal": { insee: "88160", pop: 32251, uu: "Épinal", uuGrande: false, mh: 27 },
  "evreux": { insee: "27229", pop: 49360, uu: "Évreux", uuGrande: false, mh: 12 },
  "evry-courcouronnes": { insee: "91228", pop: 66919, uu: "Paris", uuGrande: true, mh: 0 },
  "feurs": { insee: "42094", pop: 8367, uu: "Feurs", uuGrande: false, mh: 4 },
  "figeac": { insee: "46102", pop: 9793, uu: "Figeac", uuGrande: false, mh: 27 },
  "flers": { insee: "61169", pop: 14432, uu: "Flers", uuGrande: false, mh: 2 },
  "fleury-les-aubrais": { insee: "45147", pop: 21804, uu: "Orléans", uuGrande: true, mh: 0 },
  "foix": { insee: "09122", pop: 9934, uu: "Foix", uuGrande: false, mh: 4 },
  "fontaine": { insee: "38169", pop: 22020, uu: "Grenoble", uuGrande: true, mh: 0 },
  "fontenay-sous-bois": { insee: "94033", pop: 53757, uu: "Paris", uuGrande: true, mh: 1 },
  "forbach": { insee: "57227", pop: 20493, uu: "Sarrebruck (ALL)-Forbach (partie française)", uuGrande: false, mh: 2 },
  "fort-de-france": { insee: "97209", pop: 75506, uu: "Fort-de-France", uuGrande: true, mh: 36 },
  "fougeres": { insee: "35115", pop: 20307, uu: "Fougères", uuGrande: false, mh: 24 },
  "franconville": { insee: "95252", pop: 37754, uu: "Paris", uuGrande: true, mh: 0 },
  "frejus": { insee: "83061", pop: 59719, uu: "Fréjus", uuGrande: false, mh: 30 },
  "frontignan": { insee: "34108", pop: 24136, uu: "Sète", uuGrande: false, mh: 4 },
  "gaillac": { insee: "81099", pop: 16162, uu: "Gaillac", uuGrande: false, mh: 11 },
  "gap": { insee: "05061", pop: 41293, uu: "Gap", uuGrande: false, mh: 6 },
  "garges-les-gonesse": { insee: "95268", pop: 41791, uu: "Paris", uuGrande: true, mh: 1 },
  "golbey": { insee: "88209", pop: 8832, uu: "Épinal", uuGrande: false, mh: 0 },
  "gourdon": { insee: "46127", pop: 4206, uu: "Gourdon", uuGrande: false, mh: 7 },
  "gramat": { insee: "46128", pop: 3512, uu: "Gramat", uuGrande: false, mh: 4 },
  "granville": { insee: "50218", pop: 12510, uu: "Granville", uuGrande: false, mh: 13 },
  "grasse": { insee: "06069", pop: 50970, uu: "Nice", uuGrande: true, mh: 27 },
  "grenoble": { insee: "38185", pop: 156140, uu: "Grenoble", uuGrande: true, mh: 37 },
  "gueret": { insee: "23096", pop: 12955, uu: "Guéret", uuGrande: false, mh: 4 },
  "haguenau": { insee: "67180", pop: 36391, uu: "Haguenau", uuGrande: false, mh: 22 },
  "henin-beaumont": { insee: "62427", pop: 25688, uu: "Douai-Lens", uuGrande: true, mh: 1 },
  "herblay-sur-seine": { insee: "95306", pop: 31779, uu: "Paris", uuGrande: true, mh: 1 },
  "hericourt": { insee: "70285", pop: 10621, uu: "Héricourt", uuGrande: false, mh: 3 },
  "herouville-saint-clair": { insee: "14327", pop: 23470, uu: "Caen", uuGrande: true, mh: 4 },
  "houilles": { insee: "78311", pop: 33983, uu: "Paris", uuGrande: true, mh: 0 },
  "hyeres": { insee: "83069", pop: 55858, uu: "Toulon", uuGrande: true, mh: 39 },
  "illkirch-graffenstaden": { insee: "67218", pop: 27872, uu: "Strasbourg (partie française)", uuGrande: true, mh: 1 },
  "issoire": { insee: "63178", pop: 15115, uu: "Issoire", uuGrande: false, mh: 12 },
  "issoudun": { insee: "36088", pop: 11159, uu: "Issoudun", uuGrande: false, mh: 12 },
  "issy-les-moulineaux": { insee: "92040", pop: 67669, uu: "Paris", uuGrande: true, mh: 8 },
  "istres": { insee: "13047", pop: 44292, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 6 },
  "ivry-sur-seine": { insee: "94041", pop: 65064, uu: "Paris", uuGrande: true, mh: 7 },
  "joigny": { insee: "89206", pop: 9016, uu: "Joigny", uuGrande: false, mh: 19 },
  "joue-les-tours": { insee: "37122", pop: 38423, uu: "Tours", uuGrande: true, mh: 9 },
  "l-isle-jourdain": { insee: "32160", pop: 9537, uu: "L'Isle-Jourdain", uuGrande: false, mh: 3 },
  "l-isle-sur-la-sorgue": { insee: "84054", pop: 20244, uu: "Avignon", uuGrande: true, mh: 19 },
  "la-ciotat": { insee: "13028", pop: 38477, uu: "Toulon", uuGrande: true, mh: 10 },
  "la-fleche": { insee: "72154", pop: 14947, uu: "La Flèche", uuGrande: false, mh: 7 },
  "la-garde": { insee: "83062", pop: 26476, uu: "Toulon", uuGrande: true, mh: 4 },
  "la-roche-sur-yon": { insee: "85191", pop: 54849, uu: "La Roche-sur-Yon", uuGrande: false, mh: 8 },
  "la-rochelle": { insee: "17300", pop: 79851, uu: "La Rochelle", uuGrande: true, mh: 294 },
  "la-seyne-sur-mer": { insee: "83126", pop: 63732, uu: "Toulon", uuGrande: true, mh: 4 },
  "la-souterraine": { insee: "23176", pop: 4978, uu: "La Souterraine", uuGrande: false, mh: 7 },
  "la-teste-de-buch": { insee: "33529", pop: 27566, uu: "La Teste-de-Buch-Arcachon", uuGrande: false, mh: 3 },
  "lamballe-armor": { insee: "22093", pop: 17241, uu: "Lamballe-Armor", uuGrande: false, mh: 19 },
  "lanester": { insee: "56098", pop: 23263, uu: "Lorient", uuGrande: true, mh: 1 },
  "langon": { insee: "33227", pop: 7674, uu: "Langon", uuGrande: false, mh: 2 },
  "langres": { insee: "52269", pop: 7421, uu: "Langres", uuGrande: false, mh: 48 },
  "lannion": { insee: "22113", pop: 20315, uu: "Lannion", uuGrande: false, mh: 31 },
  "laon": { insee: "02408", pop: 24220, uu: "Laon", uuGrande: false, mh: 72 },
  "laval": { insee: "53130", pop: 49400, uu: "Laval", uuGrande: false, mh: 38 },
  "le-blanc-mesnil": { insee: "93007", pop: 62376, uu: "Paris", uuGrande: true, mh: 2 },
  "le-cannet": { insee: "06030", pop: 41938, uu: "Nice", uuGrande: true, mh: 4 },
  "le-creusot": { insee: "71153", pop: 20509, uu: "Le Creusot", uuGrande: false, mh: 3 },
  "le-grand-quevilly": { insee: "76322", pop: 25789, uu: "Rouen", uuGrande: true, mh: 3 },
  "le-havre": { insee: "76351", pop: 166687, uu: "Le Havre", uuGrande: true, mh: 31 },
  "le-mans": { insee: "72181", pop: 146249, uu: "Le Mans", uuGrande: true, mh: 83 },
  "le-petit-quevilly": { insee: "76498", pop: 22208, uu: "Rouen", uuGrande: true, mh: 5 },
  "le-puy-en-velay": { insee: "43157", pop: 18540, uu: "Le Puy-en-Velay", uuGrande: false, mh: 86 },
  "le-treport": { insee: "76711", pop: 4378, uu: "Eu", uuGrande: false, mh: 3 },
  "lens": { insee: "62498", pop: 32920, uu: "Douai-Lens", uuGrande: true, mh: 12 },
  "lepanges-sur-vologne": { insee: "88266", pop: 844, uu: null, uuGrande: false, mh: 0 },
  "les-mureaux": { insee: "78440", pop: 34632, uu: "Paris", uuGrande: true, mh: 1 },
  "les-sables-d-olonne": { insee: "85194", pop: 49603, uu: "Les Sables-d'Olonne", uuGrande: false, mh: 6 },
  "lesparre-medoc": { insee: "33240", pop: 5872, uu: "Lesparre-Médoc", uuGrande: false, mh: 1 },
  "levallois-perret": { insee: "92044", pop: 68092, uu: "Paris", uuGrande: true, mh: 3 },
  "libourne": { insee: "33243", pop: 25036, uu: "Libourne", uuGrande: false, mh: 11 },
  "lieusaint": { insee: "77251", pop: 14017, uu: "Paris", uuGrande: true, mh: 0 },
  "lievin": { insee: "62510", pop: 30063, uu: "Douai-Lens", uuGrande: true, mh: 3 },
  "lille": { insee: "59350", pop: 238246, uu: "Lille (partie française)", uuGrande: true, mh: 210 },
  "limoges": { insee: "87085", pop: 129937, uu: "Limoges", uuGrande: true, mh: 66 },
  "lingolsheim": { insee: "67267", pop: 20826, uu: "Strasbourg (partie française)", uuGrande: true, mh: 0 },
  "lisieux": { insee: "14366", pop: 19645, uu: "Lisieux", uuGrande: false, mh: 30 },
  "lons-le-saunier": { insee: "39300", pop: 16618, uu: "Lons-le-Saunier", uuGrande: false, mh: 83 },
  "lorient": { insee: "56121", pop: 58329, uu: "Lorient", uuGrande: true, mh: 5 },
  "lormont": { insee: "33249", pop: 25769, uu: "Bordeaux", uuGrande: true, mh: 4 },
  "lourdes": { insee: "65286", pop: 13266, uu: "Lourdes", uuGrande: false, mh: 4 },
  "louviers": { insee: "27375", pop: 18705, uu: "Louviers", uuGrande: false, mh: 6 },
  "luce": { insee: "28218", pop: 15921, uu: "Chartres", uuGrande: false, mh: 0 },
  "lunel": { insee: "34145", pop: 26623, uu: "Lunel", uuGrande: false, mh: 2 },
  "luneville": { insee: "54329", pop: 18262, uu: "Lunéville", uuGrande: false, mh: 10 },
  "lure": { insee: "70310", pop: 7877, uu: "Lure", uuGrande: false, mh: 3 },
  "lyon": { insee: "69123", pop: 519127, uu: "Lyon", uuGrande: true, mh: 260 },
  "macon": { insee: "71270", pop: 35177, uu: "Mâcon", uuGrande: false, mh: 26 },
  "maisons-alfort": { insee: "94046", pop: 56799, uu: "Paris", uuGrande: true, mh: 8 },
  "manosque": { insee: "04112", pop: 22718, uu: "Manosque", uuGrande: false, mh: 13 },
  "mantes-la-jolie": { insee: "78361", pop: 43526, uu: "Paris", uuGrande: true, mh: 11 },
  "marmande": { insee: "47157", pop: 17328, uu: "Marmande", uuGrande: false, mh: 4 },
  "marseille": { insee: "13055", pop: 886040, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 115 },
  "martigues": { insee: "13056", pop: 48298, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 7 },
  "marvejols": { insee: "48092", pop: 4764, uu: "Marvejols", uuGrande: false, mh: 8 },
  "massy": { insee: "91377", pop: 51729, uu: "Paris", uuGrande: true, mh: 2 },
  "maubeuge": { insee: "59392", pop: 28767, uu: "Maubeuge (partie française)", uuGrande: true, mh: 10 },
  "mayenne": { insee: "53147", pop: 12883, uu: "Mayenne", uuGrande: false, mh: 6 },
  "meaux": { insee: "77284", pop: 56905, uu: "Meaux", uuGrande: false, mh: 13 },
  "melun": { insee: "77288", pop: 45995, uu: "Paris", uuGrande: true, mh: 9 },
  "mende": { insee: "48095", pop: 12464, uu: "Mende", uuGrande: false, mh: 33 },
  "menton": { insee: "06083", pop: 30604, uu: "Menton-Monaco (partie française)", uuGrande: false, mh: 18 },
  "merignac": { insee: "33281", pop: 78090, uu: "Bordeaux", uuGrande: true, mh: 7 },
  "metz": { insee: "57463", pop: 122572, uu: "Metz", uuGrande: true, mh: 124 },
  "meyzieu": { insee: "69282", pop: 36687, uu: "Lyon", uuGrande: true, mh: 0 },
  "millau": { insee: "12145", pop: 22044, uu: "Millau", uuGrande: false, mh: 13 },
  "moissac": { insee: "82112", pop: 13419, uu: "Castelsarrasin", uuGrande: false, mh: 12 },
  "monistrol-sur-loire": { insee: "43137", pop: 8823, uu: "Monistrol-sur-Loire", uuGrande: false, mh: 3 },
  "mont-de-marsan": { insee: "40192", pop: 31592, uu: "Mont-de-Marsan", uuGrande: false, mh: 12 },
  "mont-saint-aignan": { insee: "76451", pop: 20165, uu: "Rouen", uuGrande: true, mh: 3 },
  "montaigu-vendee": { insee: "85146", pop: 21134, uu: "Montaigu-Vendée", uuGrande: false, mh: 1 },
  "montargis": { insee: "45208", pop: 14825, uu: "Montargis", uuGrande: false, mh: 8 },
  "montauban": { insee: "82121", pop: 62945, uu: "Montauban", uuGrande: false, mh: 43 },
  "montbeliard": { insee: "25388", pop: 24672, uu: "Montbéliard", uuGrande: true, mh: 34 },
  "montelimar": { insee: "26198", pop: 40595, uu: "Montélimar", uuGrande: false, mh: 10 },
  "montigny-le-bretonneux": { insee: "78423", pop: 32465, uu: "Paris", uuGrande: true, mh: 1 },
  "montigny-les-metz": { insee: "57480", pop: 21718, uu: "Metz", uuGrande: true, mh: 1 },
  "montlucon": { insee: "03185", pop: 33147, uu: "Montluçon", uuGrande: false, mh: 23 },
  "montpellier": { insee: "34172", pop: 310240, uu: "Montpellier", uuGrande: true, mh: 118 },
  "montreuil": { insee: "93048", pop: 111934, uu: "Paris", uuGrande: true, mh: 4 },
  "morlaix": { insee: "29151", pop: 15194, uu: "Morlaix", uuGrande: false, mh: 24 },
  "moulins": { insee: "03190", pop: 19206, uu: "Moulins", uuGrande: false, mh: 54 },
  "mulhouse": { insee: "68224", pop: 104978, uu: "Mulhouse", uuGrande: true, mh: 35 },
  "muret": { insee: "31395", pop: 26079, uu: "Toulouse", uuGrande: true, mh: 5 },
  "nancy": { insee: "54395", pop: 103671, uu: "Nancy", uuGrande: true, mh: 259 },
  "nanterre": { insee: "92050", pop: 97783, uu: "Paris", uuGrande: true, mh: 3 },
  "nantes": { insee: "44109", pop: 327734, uu: "Nantes", uuGrande: true, mh: 130 },
  "narbonne": { insee: "11262", pop: 57587, uu: "Narbonne", uuGrande: false, mh: 64 },
  "nevers": { insee: "58194", pop: 33085, uu: "Nevers", uuGrande: false, mh: 59 },
  "nice": { insee: "06088", pop: 357737, uu: "Nice", uuGrande: true, mh: 81 },
  "nimes": { insee: "30189", pop: 151839, uu: "Nîmes", uuGrande: true, mh: 96 },
  "niort": { insee: "79191", pop: 59854, uu: "Niort", uuGrande: false, mh: 27 },
  "nogent-sur-oise": { insee: "60463", pop: 21907, uu: "Creil", uuGrande: true, mh: 3 },
  "noisy-le-grand": { insee: "93051", pop: 72978, uu: "Paris", uuGrande: true, mh: 4 },
  "obernai": { insee: "67348", pop: 12587, uu: "Obernai", uuGrande: false, mh: 25 },
  "olivet": { insee: "45232", pop: 23507, uu: "Orléans", uuGrande: true, mh: 2 },
  "onet-le-chateau": { insee: "12176", pop: 12080, uu: "Rodez", uuGrande: false, mh: 3 },
  "orange": { insee: "84087", pop: 29706, uu: "Avignon", uuGrande: true, mh: 16 },
  "orleans": { insee: "45234", pop: 116357, uu: "Orléans", uuGrande: true, mh: 167 },
  "orvault": { insee: "44114", pop: 28534, uu: "Nantes", uuGrande: true, mh: 1 },
  "oullins-pierre-benite": { insee: "69149", pop: 38168, uu: "Lyon", uuGrande: true, mh: 3 },
  "oyonnax": { insee: "01283", pop: 22480, uu: "Oyonnax", uuGrande: false, mh: 1 },
  "palaiseau": { insee: "91477", pop: 37471, uu: "Paris", uuGrande: true, mh: 1 },
  "pamiers": { insee: "09225", pop: 16473, uu: "Pamiers", uuGrande: false, mh: 9 },
  "panazol": { insee: "87114", pop: 11342, uu: "Limoges", uuGrande: true, mh: 1 },
  "paris": { insee: "75056", pop: 2103778, uu: "Paris", uuGrande: true, mh: 1893 },
  "pau": { insee: "64445", pop: 80441, uu: "Pau", uuGrande: true, mh: 16 },
  "perigueux": { insee: "24322", pop: 29055, uu: "Périgueux", uuGrande: false, mh: 45 },
  "peronne": { insee: "80620", pop: 7090, uu: "Péronne", uuGrande: false, mh: 3 },
  "perpignan": { insee: "66136", pop: 121616, uu: "Perpignan", uuGrande: true, mh: 36 },
  "pessac": { insee: "33318", pop: 67339, uu: "Bordeaux", uuGrande: true, mh: 53 },
  "plaisance-du-touch": { insee: "31424", pop: 21079, uu: "Toulouse", uuGrande: true, mh: 3 },
  "plaisir": { insee: "78490", pop: 31811, uu: "Paris", uuGrande: true, mh: 2 },
  "pointe-a-pitre": { insee: "97120", pop: 15040, uu: "Pointe-à-Pitre-Les Abymes", uuGrande: true, mh: 17 },
  "poissy": { insee: "78498", pop: 40983, uu: "Paris", uuGrande: true, mh: 9 },
  "poitiers": { insee: "86194", pop: 89916, uu: "Poitiers", uuGrande: true, mh: 85 },
  "pont-du-chateau": { insee: "63284", pop: 12412, uu: "Pont-du-Château", uuGrande: false, mh: 5 },
  "pontarlier": { insee: "25462", pop: 18067, uu: "Pontarlier", uuGrande: false, mh: 10 },
  "pontault-combault": { insee: "77373", pop: 39096, uu: "Paris", uuGrande: true, mh: 0 },
  "pontoise": { insee: "95500", pop: 31970, uu: "Paris", uuGrande: true, mh: 12 },
  "porto-vecchio": { insee: "2A247", pop: 11198, uu: "Porto-Vecchio", uuGrande: false, mh: 2 },
  "privas": { insee: "07186", pop: 8538, uu: "Privas", uuGrande: false, mh: 3 },
  "quimper": { insee: "29232", pop: 64385, uu: "Quimper", uuGrande: false, mh: 58 },
  "rambouillet": { insee: "78517", pop: 27724, uu: "Rambouillet", uuGrande: false, mh: 15 },
  "reims": { insee: "51454", pop: 177674, uu: "Reims", uuGrande: true, mh: 66 },
  "rennes": { insee: "35238", pop: 230890, uu: "Rennes", uuGrande: true, mh: 98 },
  "rethel": { insee: "08362", pop: 7444, uu: "Rethel", uuGrande: false, mh: 3 },
  "reze": { insee: "44143", pop: 43556, uu: "Nantes", uuGrande: true, mh: 3 },
  "riom": { insee: "63300", pop: 18820, uu: "Riom", uuGrande: false, mh: 76 },
  "ris-orangis": { insee: "91521", pop: 31189, uu: "Paris", uuGrande: true, mh: 2 },
  "rivesaltes": { insee: "66164", pop: 9270, uu: "Perpignan", uuGrande: true, mh: 1 },
  "roanne": { insee: "42187", pop: 35409, uu: "Roanne", uuGrande: false, mh: 7 },
  "rochefort": { insee: "17299", pop: 23460, uu: "Rochefort", uuGrande: false, mh: 18 },
  "rodez": { insee: "12202", pop: 23981, uu: "Rodez", uuGrande: false, mh: 31 },
  "romans-sur-isere": { insee: "26281", pop: 33464, uu: "Romans-sur-Isère", uuGrande: false, mh: 19 },
  "romilly-sur-seine": { insee: "10323", pop: 14959, uu: "Romilly-sur-Seine", uuGrande: false, mh: 1 },
  "romorantin-lanthenay": { insee: "41194", pop: 18373, uu: "Romorantin-Lanthenay", uuGrande: false, mh: 11 },
  "roubaix": { insee: "59512", pop: 98286, uu: "Lille (partie française)", uuGrande: true, mh: 39 },
  "rouen": { insee: "76540", pop: 117662, uu: "Rouen", uuGrande: true, mh: 234 },
  "royan": { insee: "17306", pop: 19425, uu: "Royan", uuGrande: false, mh: 12 },
  "rueil-malmaison": { insee: "92063", pop: 82874, uu: "Paris", uuGrande: true, mh: 9 },
  "sable-sur-sarthe": { insee: "72264", pop: 12326, uu: "Sablé-sur-Sarthe", uuGrande: false, mh: 3 },
  "saint-amand-montrond": { insee: "18197", pop: 9899, uu: "Saint-Amand-Montrond", uuGrande: false, mh: 8 },
  "saint-amour": { insee: "39475", pop: 2349, uu: "Saint-Amour", uuGrande: false, mh: 9 },
  "saint-andre-de-cubzac": { insee: "33366", pop: 12626, uu: "Bordeaux", uuGrande: true, mh: 2 },
  "saint-andre-les-vergers": { insee: "10333", pop: 12806, uu: "Troyes", uuGrande: true, mh: 1 },
  "saint-brieuc": { insee: "22278", pop: 44364, uu: "Saint-Brieuc", uuGrande: false, mh: 31 },
  "saint-chamond": { insee: "42207", pop: 35646, uu: "Saint-Étienne", uuGrande: true, mh: 8 },
  "saint-chely-d-apcher": { insee: "48140", pop: 3955, uu: "Saint-Chély-d'Apcher", uuGrande: false, mh: 2 },
  "saint-claude": { insee: "39478", pop: 8386, uu: "Saint-Claude", uuGrande: false, mh: 5 },
  "saint-cyprien": { insee: "66171", pop: 12068, uu: "Saint-Cyprien", uuGrande: false, mh: 1 },
  "saint-cyr-sur-loire": { insee: "37214", pop: 17029, uu: "Tours", uuGrande: true, mh: 4 },
  "saint-denis-93": { insee: "93066", pop: 149077, uu: "Paris", uuGrande: true, mh: 17 },
  "saint-denis-reunion": { insee: "97411", pop: 155634, uu: "Saint-Denis", uuGrande: true, mh: 63 },
  "saint-die-des-vosges": { insee: "88413", pop: 19251, uu: "Saint-Dié-des-Vosges", uuGrande: false, mh: 12 },
  "saint-dizier": { insee: "52448", pop: 22858, uu: "Saint-Dizier", uuGrande: false, mh: 12 },
  "saint-etienne": { insee: "42218", pop: 173136, uu: "Saint-Étienne", uuGrande: true, mh: 40 },
  "saint-etienne-du-rouvray": { insee: "76575", pop: 29518, uu: "Rouen", uuGrande: true, mh: 0 },
  "saint-flour": { insee: "15187", pop: 6391, uu: "Saint-Flour", uuGrande: false, mh: 33 },
  "saint-germain-en-laye": { insee: "78551", pop: 45931, uu: "Paris", uuGrande: true, mh: 34 },
  "saint-girons": { insee: "09261", pop: 6008, uu: "Saint-Girons", uuGrande: false, mh: 5 },
  "saint-gratien": { insee: "95555", pop: 21336, uu: "Paris", uuGrande: true, mh: 1 },
  "saint-herblain": { insee: "44162", pop: 50973, uu: "Nantes", uuGrande: true, mh: 2 },
  "saint-jean-de-braye": { insee: "45284", pop: 23147, uu: "Orléans", uuGrande: true, mh: 3 },
  "saint-jean-de-luz": { insee: "64483", pop: 14857, uu: "Bayonne (partie française)", uuGrande: true, mh: 9 },
  "saint-junien": { insee: "87154", pop: 11415, uu: "Saint-Junien", uuGrande: false, mh: 8 },
  "saint-laurent-du-var": { insee: "06123", pop: 32172, uu: "Nice", uuGrande: true, mh: 0 },
  "saint-lo": { insee: "50502", pop: 19471, uu: "Saint-Lô", uuGrande: false, mh: 13 },
  "saint-louis": { insee: "68297", pop: 22805, uu: "Bâle (SUI)-Saint-Louis (partie française)", uuGrande: false, mh: 1 },
  "saint-malo": { insee: "35288", pop: 47439, uu: "Saint-Malo", uuGrande: false, mh: 87 },
  "saint-martin-d-heres": { insee: "38421", pop: 37695, uu: "Grenoble", uuGrande: true, mh: 1 },
  "saint-maur-des-fosses": { insee: "94068", pop: 76572, uu: "Paris", uuGrande: true, mh: 4 },
  "saint-maximin-la-sainte-baume": { insee: "83116", pop: 17896, uu: "Saint-Maximin-la-Sainte-Baume", uuGrande: false, mh: 6 },
  "saint-medard-en-jalles": { insee: "33449", pop: 32910, uu: "Bordeaux", uuGrande: true, mh: 3 },
  "saint-nazaire": { insee: "44184", pop: 74568, uu: "Saint-Nazaire", uuGrande: true, mh: 10 },
  "saint-ouen-l-aumone": { insee: "95572", pop: 25578, uu: "Paris", uuGrande: true, mh: 3 },
  "saint-paul-reunion": { insee: "97415", pop: 108088, uu: "Saint-Paul", uuGrande: true, mh: 29 },
  "saint-pierre-reunion": { insee: "97416", pop: 85038, uu: "Saint-Pierre", uuGrande: true, mh: 33 },
  "saint-priest": { insee: "69290", pop: 49229, uu: "Lyon", uuGrande: true, mh: 1 },
  "saint-quentin": { insee: "02691", pop: 52813, uu: "Saint-Quentin", uuGrande: false, mh: 16 },
  "saint-raphael": { insee: "83118", pop: 37113, uu: "Fréjus", uuGrande: false, mh: 6 },
  "saint-sebastien-sur-loire": { insee: "44190", pop: 28596, uu: "Nantes", uuGrande: true, mh: 2 },
  "saint-vincent-de-tyrosse": { insee: "40284", pop: 8014, uu: "Saint-Vincent-de-Tyrosse", uuGrande: false, mh: 0 },
  "sainte-genevieve-des-bois": { insee: "91549", pop: 35438, uu: "Paris", uuGrande: true, mh: 6 },
  "saintes": { insee: "17415", pop: 25363, uu: "Saintes", uuGrande: false, mh: 25 },
  "salon-de-provence": { insee: "13103", pop: 44194, uu: "Salon-de-Provence", uuGrande: false, mh: 10 },
  "sarcelles": { insee: "95585", pop: 59173, uu: "Paris", uuGrande: true, mh: 2 },
  "sarreguemines": { insee: "57631", pop: 20143, uu: "Sarreguemines (partie française)", uuGrande: false, mh: 2 },
  "sartene": { insee: "2A272", pop: 3742, uu: "Sartène", uuGrande: false, mh: 14 },
  "sartrouville": { insee: "78586", pop: 52763, uu: "Paris", uuGrande: true, mh: 1 },
  "saumur": { insee: "49328", pop: 26241, uu: "Saumur", uuGrande: false, mh: 47 },
  "savigny-le-temple": { insee: "77445", pop: 31148, uu: "Paris", uuGrande: true, mh: 1 },
  "savigny-sur-orge": { insee: "91589", pop: 37601, uu: "Paris", uuGrande: true, mh: 1 },
  "schiltigheim": { insee: "67447", pop: 34708, uu: "Strasbourg (partie française)", uuGrande: true, mh: 5 },
  "sedan": { insee: "08409", pop: 16667, uu: "Sedan", uuGrande: false, mh: 11 },
  "sens": { insee: "89387", pop: 27106, uu: "Sens", uuGrande: false, mh: 39 },
  "serris": { insee: "77449", pop: 10326, uu: "Paris", uuGrande: true, mh: 0 },
  "sete": { insee: "34301", pop: 45337, uu: "Sète", uuGrande: false, mh: 9 },
  "sevremoine": { insee: "49301", pop: 25797, uu: "Sèvremoine", uuGrande: false, mh: 2 },
  "sisteron": { insee: "04209", pop: 7850, uu: "Sisteron", uuGrande: false, mh: 9 },
  "six-fours-les-plages": { insee: "83129", pop: 37109, uu: "Toulon", uuGrande: true, mh: 4 },
  "soissons": { insee: "02722", pop: 28046, uu: "Soissons", uuGrande: false, mh: 26 },
  "sotteville-les-rouen": { insee: "76681", pop: 29003, uu: "Rouen", uuGrande: true, mh: 2 },
  "soyaux": { insee: "16374", pop: 10087, uu: "Angoulême", uuGrande: true, mh: 2 },
  "strasbourg": { insee: "67482", pop: 293771, uu: "Strasbourg (partie française)", uuGrande: true, mh: 232 },
  "talence": { insee: "33522", pop: 46338, uu: "Bordeaux", uuGrande: true, mh: 6 },
  "tarbes": { insee: "65440", pop: 44399, uu: "Tarbes", uuGrande: false, mh: 12 },
  "thionville": { insee: "57672", pop: 42658, uu: "Thionville", uuGrande: true, mh: 12 },
  "thonon-les-bains": { insee: "74281", pop: 37928, uu: "Thonon-les-Bains", uuGrande: false, mh: 15 },
  "thouars": { insee: "79329", pop: 13891, uu: "Thouars", uuGrande: false, mh: 17 },
  "toul": { insee: "54528", pop: 15768, uu: "Toul", uuGrande: false, mh: 53 },
  "toulon": { insee: "83137", pop: 179116, uu: "Toulon", uuGrande: true, mh: 25 },
  "toulouse": { insee: "31555", pop: 514819, uu: "Toulouse", uuGrande: true, mh: 233 },
  "tourcoing": { insee: "59599", pop: 98772, uu: "Lille (partie française)", uuGrande: true, mh: 25 },
  "tournefeuille": { insee: "31557", pop: 30168, uu: "Toulouse", uuGrande: true, mh: 1 },
  "tours": { insee: "37261", pop: 139259, uu: "Tours", uuGrande: true, mh: 152 },
  "trappes": { insee: "78621", pop: 34689, uu: "Paris", uuGrande: true, mh: 1 },
  "troyes": { insee: "10387", pop: 62088, uu: "Troyes", uuGrande: true, mh: 42 },
  "tulle": { insee: "19272", pop: 13401, uu: "Tulle", uuGrande: false, mh: 19 },
  "ussel": { insee: "19275", pop: 9187, uu: "Ussel", uuGrande: false, mh: 8 },
  "valdoie": { insee: "90099", pop: 5175, uu: "Belfort", uuGrande: false, mh: 0 },
  "valence": { insee: "26362", pop: 64458, uu: "Valence", uuGrande: true, mh: 19 },
  "valenciennes": { insee: "59606", pop: 43468, uu: "Valenciennes (partie française)", uuGrande: true, mh: 37 },
  "valserhone": { insee: "01033", pop: 16712, uu: "Valserhône", uuGrande: false, mh: 1 },
  "vand-uvre-les-nancy": { insee: "54547", pop: 29942, uu: "Nancy", uuGrande: true, mh: 3 },
  "vannes": { insee: "56260", pop: 55790, uu: "Vannes", uuGrande: false, mh: 37 },
  "varennes-vauzelles": { insee: "58303", pop: 9146, uu: "Nevers", uuGrande: false, mh: 0 },
  "vaulx-en-velin": { insee: "69256", pop: 53069, uu: "Lyon", uuGrande: true, mh: 1 },
  "vendome": { insee: "41269", pop: 15758, uu: "Vendôme", uuGrande: false, mh: 21 },
  "venissieux": { insee: "69259", pop: 65502, uu: "Lyon", uuGrande: true, mh: 2 },
  "verdun": { insee: "55545", pop: 16890, uu: "Verdun", uuGrande: false, mh: 23 },
  "vernon": { insee: "27681", pop: 25290, uu: "Vernon", uuGrande: false, mh: 10 },
  "versailles": { insee: "78646", pop: 84095, uu: "Paris", uuGrande: true, mh: 124 },
  "vertou": { insee: "44215", pop: 26227, uu: "Nantes", uuGrande: true, mh: 2 },
  "vesoul": { insee: "70550", pop: 15078, uu: "Vesoul", uuGrande: false, mh: 16 },
  "vichy": { insee: "03310", pop: 25115, uu: "Vichy", uuGrande: false, mh: 51 },
  "vienne": { insee: "38544", pop: 31778, uu: "Vienne", uuGrande: false, mh: 39 },
  "vierzon": { insee: "18279", pop: 25068, uu: "Vierzon", uuGrande: false, mh: 12 },
  "vigneux-sur-seine": { insee: "91657", pop: 31466, uu: "Paris", uuGrande: true, mh: 1 },
  "villefranche-sur-saone": { insee: "69264", pop: 36172, uu: "Lyon", uuGrande: true, mh: 22 },
  "villejuif": { insee: "94076", pop: 60183, uu: "Paris", uuGrande: true, mh: 5 },
  "villenave-d-ornon": { insee: "33550", pop: 42545, uu: "Bordeaux", uuGrande: true, mh: 2 },
  "villeneuve-d-ascq": { insee: "59009", pop: 62868, uu: "Lille (partie française)", uuGrande: true, mh: 11 },
  "villeneuve-sur-lot": { insee: "47323", pop: 22350, uu: "Villeneuve-sur-Lot", uuGrande: false, mh: 16 },
  "villeparisis": { insee: "77514", pop: 26946, uu: "Paris", uuGrande: true, mh: 0 },
  "villeurbanne": { insee: "69266", pop: 163684, uu: "Lyon", uuGrande: true, mh: 3 },
  "vitrolles": { insee: "13117", pop: 36758, uu: "Marseille-Aix-en-Provence", uuGrande: true, mh: 1 },
  "vitry-sur-seine": { insee: "94081", pop: 93963, uu: "Paris", uuGrande: true, mh: 2 },
  "voiron": { insee: "38563", pop: 21847, uu: "Voiron", uuGrande: false, mh: 2 },
  "wattrelos": { insee: "59650", pop: 40847, uu: "Lille (partie française)", uuGrande: true, mh: 3 },
  "yssingeaux": { insee: "43268", pop: 7415, uu: "Yssingeaux", uuGrande: false, mh: 2 },
};

/* Seuils du code de l'environnement. */
const SEUIL_COMMUNE = 10000;   /* agglomération, art. R.581-26 et R.581-65 */

/* Régime applicable à une commune, en l'absence de règlement local de
   publicité. Le RLP, lorsqu'il existe, ne peut qu'être plus restrictif. */
function regime(slug) {
  const c = communes[slug];
  if (!c) return null;
  const grande  = c.pop >= SEUIL_COMMUNE;
  /* Pour la publicité, l'appartenance à une unité urbaine de plus de
     100 000 habitants suffit à faire basculer une petite commune dans le
     régime large. Pour l'enseigne scellée au sol, non : l'article R.581-65
     ne regarde que la population de l'agglomération. */
  const largePub = grande || c.uuGrande;
  return {
    insee: c.insee,
    pop: c.pop,
    uu: c.uu,
    uuGrande: c.uuGrande,
    grande: grande,
    largePub: largePub,
    regles: [
      {
        objet: "Enseigne scellée au sol de plus d'un mètre carré",
        verdict: grande ? "autorisee" : "interdite",
        texte: grande
          ? "Autorisée. Hauteur limitée à 6,50 m si l'enseigne fait un mètre de large ou plus, à 8 m si elle fait moins d'un mètre. Un seul dispositif de plus d'un mètre carré le long de chaque voie ouverte à la circulation publique qui borde l'établissement."
          : "Interdite. Les enseignes scellées au sol de plus d'un mètre carré ne sont admises que dans les agglomérations de plus de 10 000 habitants — et l'appartenance à une unité urbaine, même grande, ne change rien ici. Le totem de parking se remplace par une enseigne de façade, un drapeau ou un dispositif d'un mètre carré au plus.",
        source: "Art. R.581-65 et R.581-64 du code de l'environnement"
      },
      {
        objet: "Enseigne apposée en façade",
        verdict: "autorisee",
        texte: "Surface cumulée limitée à 15 % de la surface de la façade commerciale, portée à 25 % lorsque cette façade mesure moins de 50 m². La règle est la même partout en France : c'est la façade qui commande, pas la commune.",
        source: "Art. R.581-63 du code de l'environnement"
      },
      {
        objet: "Publicité murale non lumineuse",
        verdict: "autorisee",
        texte: largePub
          ? "Surface unitaire limitée à 10,50 m², hauteur limitée à 7,50 m au-dessus du sol."
          : "Surface unitaire limitée à 4,70 m², hauteur limitée à 6 m au-dessus du sol. Le long d'une route à grande circulation, un arrêté préfectoral peut porter cette surface à 8 m².",
        source: "Art. R.581-26 du code de l'environnement"
      },
      {
        objet: "Publicité scellée au sol non lumineuse",
        verdict: largePub ? "autorisee" : "interdite",
        texte: largePub
          ? "Admise, sous les conditions de surface, de hauteur, de densité et de recul du règlement national."
          : "Interdite. Aucun panneau publicitaire posé ou scellé au sol n'est admis.",
        source: "Art. R.581-31 du code de l'environnement"
      },
      {
        objet: "Publicité lumineuse",
        verdict: largePub ? "autorisee" : "interdite",
        texte: largePub
          ? "Admise, avec extinction nocturne obligatoire et prescriptions techniques d'économie d'énergie."
          : "Ne peut pas être autorisée.",
        source: "Art. R.581-34 du code de l'environnement"
      }
    ]
  };
}

/* Commentaire de strate. Sept tranches de taille, parce qu'un commerce de
   2 000 habitants et une enseigne de métropole n'ont ni le même voisinage
   administratif, ni la même probabilité de tomber sur un règlement local.
   Cela sert aussi à désolidariser les pages : sans ce texte, les 393
   communes de plus de 10 000 habitants affichaient un tableau rigoureusement
   identique, ce qui est exactement le défaut que l'on reproche au réseau
   concurrent. */
const STRATES = [
  [3500, "Sous 3 500 habitants, la mairie instruit peu de dossiers d'enseigne dans l'année : le maire ou la secrétaire de mairie répond souvent directement, et un dossier propre passe vite. En contrepartie, il n'y a presque jamais de règlement local de publicité — c'est donc le règlement national ci-dessus qui fait loi, sans adoucissement possible."],
  [10000, "Entre 3 500 et 10 000 habitants, la commune a généralement un service urbanisme, parfois mutualisé à l'échelle de l'intercommunalité. Le seuil des 10 000 habitants est en vue sans être atteint : les interdictions ci-dessus s'appliquent pleinement, et il est fréquent qu'un commerçant découvre après commande que le totem qu'il a payé ne peut pas être posé."],
  [20000, "Entre 10 000 et 20 000 habitants, la commune vient de basculer dans le régime large : totem et lumineux redeviennent possibles. C'est aussi la strate où les règlements locaux de publicité commencent à apparaître, souvent pour protéger un centre ancien tout en laissant respirer les zones commerciales de périphérie."],
  [50000, "Entre 20 000 et 50 000 habitants, il existe presque toujours un service urbanisme constitué et, une fois sur deux, un règlement local de publicité. Le centre-ville et la zone d'activité y obéissent couramment à deux jeux de règles distincts : la même enseigne peut être refusée d'un côté et acceptée de l'autre."],
  [100000, "Entre 50 000 et 100 000 habitants, le règlement local de publicité est la règle plutôt que l'exception, et il est fréquemment intercommunal. Comptez un délai d'instruction réel, et prévoyez que l'avis de l'Architecte des Bâtiments de France soit demandé dès que le local touche un périmètre patrimonial."],
  [200000, "Au-dessus de 100 000 habitants, le règlement local de publicité est quasi systématique et détaillé : il zone la commune, et les prescriptions de format, de matériaux et parfois de couleurs changent d'un quartier à l'autre. La question n'est plus « qu'autorise le code de l'environnement » mais « dans quelle zone se trouve mon local »."],
  [Infinity, "Dans les plus grandes villes, le règlement local de publicité est un document épais, zoné rue par rue, et l'instruction est stricte. S'y ajoutent l'occupation du domaine public pour la nacelle et, très souvent, un arrêté de circulation pour la journée de pose : la logistique pèse autant que la fabrication dans le devis."]
];

function strate(slug) {
  const c = communes[slug];
  if (!c) return null;
  for (let i = 0; i < STRATES.length; i++) {
    if (c.pop < STRATES[i][0]) return STRATES[i][1];
  }
  return STRATES[STRATES.length - 1][1];
}

/* Abords des monuments historiques.

   C'est la contrainte locale la plus décisive du métier, et celle qu'aucun
   réseau concurrent ne publie commune par commune. Deux effets, distincts :

   · l'enseigne devient soumise à AUTORISATION préalable au lieu d'être
     libre (art. L.581-18 du code de l'environnement, renvoyant à L.581-8),
     avec intervention de l'Architecte des Bâtiments de France ;
   · la publicité y est INTERDITE (art. L.581-8), sauf dérogation prévue
     par un règlement local de publicité.

   Le périmètre : moins de 500 mètres du monument ET covisibilité avec lui,
   ou le périmètre délimité des abords quand la commune en a défini un
   (art. L.621-30 du code du patrimoine).

   La fonction ci-dessous ne tranche rien : elle dit combien de monuments
   existent sur la commune et quelle probabilité cela crée. C'est une raison
   de vérifier, jamais un verdict. */
function patrimoine(slug) {
  const c = communes[slug];
  if (!c) return null;
  const n = c.mh || 0;
  let niveau;
  if (n === 0)      niveau = "aucun";
  else if (n <= 4)  niveau = "faible";
  else if (n <= 20) niveau = "moyen";
  else              niveau = "fort";
  return { nombre: n, niveau: niveau };
}

module.exports = {
  communes: communes, regime: regime, strate: strate,
  patrimoine: patrimoine, SEUIL_COMMUNE: SEUIL_COMMUNE
};
