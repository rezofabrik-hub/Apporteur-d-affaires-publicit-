/* =========================================================================
   Chefs-lieux d'arrondissement — préfectures et sous-préfectures
   -------------------------------------------------------------------------
   POURQUOI CETTE LISTE

   La sélection des villes reposait sur la seule population, plafonnée à huit
   communes par département. Une sous-préfecture peu peuplée en était donc
   exclue : Prades, 6 148 habitants, chef-lieu d'arrondissement des
   Pyrénées-Orientales, n'avait pas de page, quand cinq communes du
   département en avaient une. Or un chef-lieu d'arrondissement est un point
   de repère : les communes alentour s'y réfèrent, et c'est son nom que l'on
   tape.

   SOURCE

   Wikidata, requête SPARQL du 15/09/2026 : les entités « arrondissement
   français » (Q194203) non dissoutes, et leur chef-lieu (P36) rattaché à son
   code Insee (P374). Les arrondissements supprimés — Puget-Théniers en 1926,
   par exemple — sont écartés par le filtre sur la date de dissolution.

   334 chefs-lieux, répartis sur 97 départements. Le chiffre est
   cohérent avec le nombre d'arrondissements en vigueur.

   VÉRIFICATION

   Pyrénées-Orientales : Céret, Perpignan, Prades.
   Aude : Carcassonne, Limoux, Narbonne.
   Haute-Garonne : Muret, Saint-Gaudens, Toulouse.
   ========================================================================= */
module.exports = [
  "01034", // Belley
  "01053", // Bourg-en-Bresse
  "01173", // Gex
  "01269", // Nantua
  "02168", // Château-Thierry
  "02408", // Laon
  "02691", // Saint-Quentin
  "02722", // Soissons
  "02789", // Vervins
  "03185", // Montluçon
  "03190", // Moulins
  "03310", // Vichy
  "04019", // Barcelonnette
  "04039", // Castellane
  "04070", // Digne-les-Bains
  "04088", // Forcalquier
  "05023", // Briançon
  "05061", // Gap
  "06069", // Grasse
  "06088", // Nice
  "07132", // Largentière
  "07186", // Privas
  "07324", // Tournon-sur-Rhône
  "08105", // Charleville-Mézières
  "08362", // Rethel
  "08409", // Sedan
  "09122", // Foix
  "09225", // Pamiers
  "09261", // Saint-Girons
  "10033", // Bar-sur-Aube
  "10268", // Nogent-sur-Seine
  "10387", // Troyes
  "11069", // Carcassonne
  "11206", // Limoux
  "11262", // Narbonne
  "12145", // Millau
  "12202", // Rodez
  "12300", // Villefranche-de-Rouergue
  "13001", // Aix-en-Provence
  "13004", // Arles
  "13047", // Istres
  "13055", // Marseille
  "14047", // Bayeux
  "14118", // Caen
  "14258", // Falaise
  "14366", // Lisieux
  "14762", // Vire Normandie
  "15014", // Aurillac
  "15120", // Mauriac
  "15187", // Saint-Flour
  "16015", // Angoulême
  "16102", // Cognac
  "17197", // Jonzac
  "17299", // Rochefort
  "17300", // La Rochelle
  "17347", // Saint-Jean-d'Angély
  "17415", // Saintes
  "18033", // Bourges
  "18197", // Saint-Amand-Montrond
  "18279", // Vierzon
  "19031", // Brive-la-Gaillarde
  "19272", // Tulle
  "19275", // Ussel
  "21054", // Beaune
  "21231", // Dijon
  "21425", // Montbard
  "22050", // Dinan
  "22070", // Guingamp
  "22113", // Lannion
  "22278", // Saint-Brieuc
  "23008", // Aubusson
  "23096", // Guéret
  "24037", // Bergerac
  "24311", // Nontron
  "24322", // Périgueux
  "24520", // Sarlat-la-Canéda
  "25056", // Besançon
  "25388", // Montbéliard
  "25462", // Pontarlier
  "26113", // Die
  "26220", // Nyons
  "26362", // Valence
  "27016", // Les Andelys
  "27056", // Bernay
  "27229", // Évreux
  "28085", // Chartres
  "28088", // Châteaudun
  "28134", // Dreux
  "28280", // Nogent-le-Rotrou
  "29019", // Brest
  "29026", // Châteaulin
  "29151", // Morlaix
  "29232", // Quimper
  "2A004", // Ajaccio
  "2A272", // Sartène
  "2B033", // Bastia
  "2B050", // Calvi
  "2B096", // Corte
  "30007", // Alès
  "30189", // Nîmes
  "30350", // Le Vigan
  "31395", // Muret
  "31483", // Saint-Gaudens
  "31555", // Toulouse
  "32013", // Auch
  "32107", // Condom
  "32256", // Mirande
  "33009", // Arcachon
  "33058", // Blaye
  "33063", // Bordeaux
  "33227", // Langon
  "33240", // Lesparre-Médoc
  "33243", // Libourne
  "34032", // Béziers
  "34142", // Lodève
  "34172", // Montpellier
  "35115", // Fougères
  "35236", // Redon
  "35238", // Rennes
  "35288", // Saint-Malo
  "36018", // Le Blanc
  "36044", // Châteauroux
  "36046", // La Châtre
  "36088", // Issoudun
  "37072", // Chinon
  "37132", // Loches
  "37261", // Tours
  "38185", // Grenoble
  "38509", // La Tour-du-Pin
  "38544", // Vienne
  "39198", // Dole
  "39300", // Lons-le-Saunier
  "39478", // Saint-Claude
  "40088", // Dax
  "40192", // Mont-de-Marsan
  "41018", // Blois
  "41194", // Romorantin-Lanthenay
  "41269", // Vendôme
  "42147", // Montbrison
  "42187", // Roanne
  "42218", // Saint-Étienne
  "43040", // Brioude
  "43157", // Le Puy-en-Velay
  "43268", // Yssingeaux
  "44036", // Châteaubriant
  "44109", // Nantes
  "44184", // Saint-Nazaire
  "45208", // Montargis
  "45234", // Orléans
  "45252", // Pithiviers
  "46042", // Cahors
  "46102", // Figeac
  "46127", // Gourdon
  "47001", // Agen
  "47157", // Marmande
  "47195", // Nérac
  "47323", // Villeneuve-sur-Lot
  "48061", // Florac Trois Rivières
  "48095", // Mende
  "49007", // Angers
  "49099", // Cholet
  "49328", // Saumur
  "49331", // Segré-en-Anjou Bleu
  "50025", // Avranches
  "50129", // Cherbourg-en-Cotentin
  "50147", // Coutances
  "50502", // Saint-Lô
  "51108", // Châlons-en-Champagne
  "51230", // Épernay
  "51454", // Reims
  "51649", // Vitry-le-François
  "52121", // Chaumont
  "52269", // Langres
  "52448", // Saint-Dizier
  "53062", // Château-Gontier-sur-Mayenne
  "53130", // Laval
  "53147", // Mayenne
  "54099", // Val de Briey
  "54329", // Lunéville
  "54395", // Nancy
  "54528", // Toul
  "55029", // Bar-le-Duc
  "55122", // Commercy
  "55545", // Verdun
  "56121", // Lorient
  "56178", // Pontivy
  "56260", // Vannes
  "57227", // Forbach
  "57463", // Metz
  "57630", // Sarrebourg
  "57631", // Sarreguemines
  "57672", // Thionville
  "58062", // Château-Chinon
  "58079", // Clamecy
  "58086", // Cosne-Cours-sur-Loire
  "58194", // Nevers
  "59036", // Avesnes-sur-Helpe
  "59122", // Cambrai
  "59178", // Douai
  "59183", // Dunkerque
  "59350", // Lille
  "59606", // Valenciennes
  "60057", // Beauvais
  "60157", // Clermont
  "60159", // Compiègne
  "60612", // Senlis
  "61001", // Alençon
  "61006", // Argentan
  "61293", // Mortagne-au-Perche
  "62041", // Arras
  "62119", // Béthune
  "62160", // Boulogne-sur-Mer
  "62193", // Calais
  "62498", // Lens
  "62588", // Montreuil-sur-Mer
  "62765", // Saint-Omer
  "63003", // Ambert
  "63113", // Clermont-Ferrand
  "63178", // Issoire
  "63300", // Riom
  "63430", // Thiers
  "64102", // Bayonne
  "64422", // Oloron-Sainte-Marie
  "64445", // Pau
  "65025", // Argelès-Gazost
  "65059", // Bagnères-de-Bigorre
  "65440", // Tarbes
  "66049", // Céret
  "66136", // Perpignan
  "66149", // Prades
  "67180", // Haguenau
  "67300", // Molsheim
  "67437", // Saverne
  "67462", // Sélestat
  "67482", // Strasbourg
  "68004", // Altkirch
  "68066", // Colmar
  "68224", // Mulhouse
  "68334", // Thann
  "69123", // Lyon
  "69264", // Villefranche-sur-Saône
  "70310", // Lure
  "70550", // Vesoul
  "71014", // Autun
  "71076", // Chalon-sur-Saône
  "71106", // Charolles
  "71263", // Louhans-Châteaurenaud
  "71270", // Mâcon
  "72154", // La Flèche
  "72180", // Mamers
  "72181", // Le Mans
  "73011", // Albertville
  "73065", // Chambéry
  "73248", // Saint-Jean-de-Maurienne
  "74010", // Annecy
  "74042", // Bonneville
  "74243", // Saint-Julien-en-Genevois
  "74281", // Thonon-les-Bains
  "75056", // Paris
  "76217", // Dieppe
  "76351", // Le Havre
  "76540", // Rouen
  "77186", // Fontainebleau
  "77284", // Meaux
  "77288", // Melun
  "77337", // Noisiel
  "77379", // Provins
  "77468", // Torcy
  "78361", // Mantes-la-Jolie
  "78517", // Rambouillet
  "78551", // Saint-Germain-en-Laye
  "78646", // Versailles
  "79049", // Bressuire
  "79191", // Niort
  "79202", // Parthenay
  "80001", // Abbeville
  "80021", // Amiens
  "80561", // Montdidier
  "80620", // Péronne
  "81004", // Albi
  "81065", // Castres
  "82033", // Castelsarrasin
  "82121", // Montauban
  "83023", // Brignoles
  "83050", // Draguignan
  "83137", // Toulon
  "84003", // Apt
  "84007", // Avignon
  "84031", // Carpentras
  "85092", // Fontenay-le-Comte
  "85191", // La Roche-sur-Yon
  "85194", // Les Sables-d'Olonne
  "86066", // Châtellerault
  "86165", // Montmorillon
  "86194", // Poitiers
  "87011", // Bellac
  "87085", // Limoges
  "87126", // Rochechouart
  "87187", // Saint-Yrieix-la-Perche
  "88160", // Épinal
  "88321", // Neufchâteau
  "88413", // Saint-Dié-des-Vosges
  "89024", // Auxerre
  "89025", // Avallon
  "89387", // Sens
  "90010", // Belfort
  "91223", // Étampes
  "91228", // Évry-Courcouronnes
  "92002", // Antony
  "92012", // Boulogne-Billancourt
  "92050", // Nanterre
  "93008", // Bobigny
  "93062", // Le Raincy
  "93066", // Saint-Denis
  "94028", // Créteil
  "94038", // L'Haÿ-les-Roses
  "94052", // Nogent-sur-Marne
  "95018", // Argenteuil
  "95428", // Montmorency
  "95500", // Pontoise
  "95585", // Sarcelles
  "97105", // Basse-Terre
  "97120", // Pointe-à-Pitre
  "97209", // Fort-de-France
  "97217", // Le Marin
  "97225", // Saint-Pierre
  "97230", // La Trinité
  "97302", // Cayenne
  "97308", // Saint-Georges
  "97311", // Saint-Laurent-du-Maroni
  "97410", // Saint-Benoît
  "97411", // Saint-Denis
  "97415", // Saint-Paul
  "97416", // Saint-Pierre
];
