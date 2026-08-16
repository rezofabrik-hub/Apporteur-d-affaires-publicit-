# Rezo Fabrik — réseau national enseigne, signalétique & publicité par l'objet

Site vitrine et générateur de demandes pour une activité d'**apporteur d'affaires**
en communication visuelle : mise en relation entre des clients ayant un projet
(enseigne, signalétique, covering, impression, objets publicitaires) et des
professionnels indépendants partout en France.

**398 pages HTML statiques**, sans framework ni dépendance externe : aucun CDN,
aucune police distante, aucun traceur. Tout se charge depuis le domaine.

---

## Ce que contient le site

| Bloc | Pages | Rôle |
|---|---|---|
| Accueil | `index.html` | Positionnement, métiers, méthode, preuve, double appel à l'action |
| Métiers | 8 pages piliers | Contenu long (1 500 à 2 500 mots) par domaine, avec tableaux de prix et FAQ |
| Villes | 120 pages locales | SEO local : département, quartiers, zones d'activité, contraintes régionales |
| Secteurs | 12 pages + sommaire | Pharmacie, CHR, santé, auto, beauté, immobilier, BTP, industrie, retail, ERP, franchise, sport |
| Métier × ville | 240 pages | « Covering véhicule à Lyon », « Enseignes à Bordeaux » — les requêtes locales qui convertissent |
| Conversion | `devis.html`, `professionnels.html`, `merci.html` | Formulaires multi-étapes client et partenaire |
| Ressources | `tarifs`, `glossaire`, `reglementation-enseigne`, `comment-ca-marche`, `faq`, `villes` | Contenu de référence, longue traîne |
| Légal | `mentions-legales`, `confidentialite`, `credits-photos`, `plan-du-site`, `404` | Obligations et transparence |

### Les 8 pages métier

`enseignes` · `signaletique` · `covering-vehicule` · `impression-grand-format`
`objets-publicitaires` · `maquette-creation-graphique` · `pose-nacelle` · `vitrophanie-plv`

---

## Démarrage

```bash
node build/build.js          # régénère les 398 pages + sitemap.xml + robots.txt
python3 -m http.server 8000  # prévisualisation sur http://localhost:8000
```

Aucune installation n'est nécessaire : le générateur n'utilise que Node
(aucun paquet npm).

---

## Ce qu'il faut personnaliser

### 1. Recevoir les formulaires — `assets/js/config.js`

C'est le **seul fichier indispensable** pour rendre le site opérationnel.
Renseignez une URL d'endpoint acceptant du JSON en POST :

```js
endpointClient: "https://formspree.io/f/xxxxxxx",
endpointPro:    "https://formspree.io/f/yyyyyyy",
```

Solutions sans serveur : [Formspree](https://formspree.io),
[Web3Forms](https://web3forms.com), [Formsubmit](https://formsubmit.co),
un webhook Make/Zapier, ou le Worker Cloudflare fourni dans `worker/`.

> **Tant que ces champs sont vides**, les formulaires basculent en mode secours :
> ouverture du logiciel de messagerie avec la demande pré-remplie, et sauvegarde
> locale dans le navigateur. Rien n'est perdu, mais rien n'est automatisé.

Le téléphone (07 75 76 92 32) est déjà renseigné et injecté partout sur le site.
**L'e-mail reste un espace réservé** (`contact@rezofabrik.fr`) : remplacez-le par
votre adresse réelle, sinon le mode secours des formulaires enverra les demandes
vers une boîte inexistante.

### 2. Identité et coordonnées — `build/data/site.js`

Nom de marque, baseline, nom de domaine, e-mails, téléphone, ville pilote,
chiffres affichés sur l'accueil. Relancez `node build/build.js` après modification.

**Important** : remplacez `domain` par votre vrai nom de domaine dès qu'il est en
place. Cette valeur alimente les URL canoniques, le `sitemap.xml` et l'Open Graph.

### 3. Mentions légales — trois champs restants

L'éditeur est renseigné : **SARL Rezofabrik**, 9 rue de la Close, 66140
Canet-en-Roussillon, 07 75 76 92 32. Restent à compléter dans
`build/pages/misc.js` (page `mentions-legales.html`) :

- le **SIRET** et le numéro **RCS Perpignan**
- le **capital social**
- le numéro de **TVA intracommunautaire**

Ces mentions sont légalement obligatoires (loi n°2004-575 du 21 juin 2004).

### 4. Ajouter des villes — `build/data/cities.js`

Ajoutez une entrée puis relancez le build : la page, le maillage interne,
le plan du site et le sitemap se mettent à jour automatiquement.

```js
{ slug: "beaucaire", name: "Beaucaire", dept: "30", deptName: "Gard",
  region: "Occitanie", cp: "30300", pop: "16 000",
  quartiers: ["Centre historique", "…"],
  zones: ["Zone du Roubian", "…"],
  neighbors: ["Tarascon", "Nîmes", "…"] }
```

### 5. Ajouter un secteur d'activité — `build/data/sectors.js`

Même principe : une entrée = une page complète, ajoutée automatiquement au menu,
au plan du site et au sitemap.

### 6. Élargir la matrice métier × ville

La constante `MATRIX_CITIES` en tête de `build/build.js` fixe le nombre de villes
croisées avec les 8 métiers (30 par défaut, soit 240 pages). La porter à 60 génère
480 pages. Augmentez progressivement : mieux vaut 240 pages substantielles que
800 pages creuses, que Google traite comme des pages satellites.

### 7. Ajouter ou modifier un métier — `build/data/services.js`

Chaque entrée génère une page complète : héros, sommaire, sections,
tableau de prix, grille de prestations, galerie, FAQ, données structurées.

---

## Les photographies

175 visuels libres de droit (**CC0**, domaine public, **CC BY**, **CC BY-SA**),
issus d'[Openverse](https://openverse.org) et de
[Wikimedia Commons](https://commons.wikimedia.org), sélectionnés visuellement
puis harmonisés par un étalonnage colorimétrique commun. Auteurs et licences
sont listés sur `credits-photos.html`.

**Remplacez-les par vos propres réalisations dès que possible** : rien ne
convertit mieux qu'une photo de chantier réel. Déposez vos fichiers dans
`assets/img/` en conservant la nomenclature `<sujet>-<n>-lg.jpg` et
`<sujet>-<n>-md.jpg`, et mettez à jour `assets/img/manifest.json`.

Les scripts de collecte se trouvent dans `tools/` et ne
sont pas nécessaires au fonctionnement du site.

---

## La concurrence, en clair

Deux modèles dominent le secteur, et ils ne se battent pas de la même façon :

- **PANO** ne référence pas un site, mais **environ 150 sites** — chaque agence a
  son propre domaine (`pano-douai.fr`, `pano-agen.fr`, `panoaix.fr`…). D'où leur
  omniprésence locale. Chaque site pris isolément reste toutefois modeste.
- **Signarama** joue sur un seul domaine avec une cinquantaine de pages magasin
  (`/magasins/albi`), des pages catégories et des **pages secteurs**
  (`/industries/…`).

La structure de ce site répond directement à ces deux modèles : **120 villes**
(contre ~50 chez Signarama), **12 secteurs** (dimension qu'ils exploitent) et
surtout une **matrice métier × ville de 240 pages** qu'aucun des deux ne couvre
systématiquement sur un domaine unique. C'est là que se joue la longue traîne
qui convertit : « covering véhicule Lyon » plutôt que « covering ».

---

## Référencement — ce qui est déjà en place

- Titres et méta-descriptions uniques sur les 398 pages (vérifié automatiquement)
- Données structurées JSON-LD : `Organization`, `WebSite`, `Service`,
  `LocalBusiness` (une par ville), `FAQPage`, `BreadcrumbList`, `ItemList`,
  `DefinedTermSet`
- `sitemap.xml` avec priorités hiérarchisées, `robots.txt`
- Canoniques, Open Graph et Twitter Cards sur chaque page
- Maillage interne dense : métiers ↔ villes ↔ ressources
- Images en `srcset` deux tailles, `loading="lazy"`, dimensions déclarées
  (évite le décalage de mise en page)
- HTML sémantique, fil d'Ariane, contrastes AA, navigation clavier,
  `prefers-reduced-motion`

### Ce qui reste à faire côté référencement

Le site est techniquement prêt, mais le positionnement ne se décrète pas.
Par ordre d'impact :

1. **Google Business Profile** par ville où vous avez une adresse réelle —
   c'est le premier levier du référencement local, devant le site lui-même
2. **Google Search Console** : soumettre `sitemap.xml`, surveiller l'indexation
3. **Remplacer les photos** par vos réalisations, avec des `alt` décrivant
   la ville et la prestation
4. **Publier des cas clients** : une page par chantier réel, avec photos
   avant/après et budget — c'est le contenu qui convertit le mieux
5. **Obtenir des liens** : annuaires professionnels, fédérations,
   chambres de métiers, partenaires du réseau
6. **Avis clients** : Google, Pages Jaunes, Trustpilot

---

## Déploiement

### GitHub Pages — **le site est en ligne**

**https://rezofabrik-hub.github.io/Apporteur-d-affaires-publicit-/**

⚠️ L'URL est sensible à la casse : `Apporteur` prend un **A majuscule**.

Le workflow `.github/workflows/deploy-pages.yml` régénère les pages puis publie
l'ensemble sur la branche `gh-pages` à chaque push sur `main`. Aucune action
manuelle n'est nécessaire.

Pour brancher votre propre nom de domaine : ajoutez-le dans
*Settings → Pages → Custom domain*, créez un fichier `CNAME` à la racine
contenant le domaine, puis mettez à jour `domain` dans `build/data/site.js`
et relancez le build.

### Cloudflare Pages / Workers

Le dépôt est un site statique : pointez la racine du dépôt comme répertoire de
publication, sans commande de build (les fichiers HTML sont versionnés), ou
lancez `node build/build.js` en commande de build.

### Réception des formulaires par Worker Cloudflare

Voir `worker/lead-worker.js` — stockage KV et notification e-mail via Resend.

---

## Structure du dépôt

```
├── index.html, *.html          Pages générées (ne pas modifier à la main)
├── assets/
│   ├── css/site.css            Design system complet
│   ├── js/site.js              Navigation, formulaires, filtres
│   ├── js/config.js            ← Configuration des formulaires
│   ├── img/                    175 photos (2 tailles) + manifeste + favicon
│   └── credits.json            Auteurs et licences
├── build/
│   ├── build.js                Orchestrateur
│   ├── data/                   site · services · cities  ← contenu éditable
│   ├── lib/tpl.js              Gabarits et composants
│   └── pages/                  Générateurs par type de page
├── worker/                     Worker Cloudflare optionnel
├── sitemap.xml, robots.txt     Générés
└── .github/workflows/          Déploiement automatique
```

Les fichiers `.html` de la racine sont **générés** : toute modification directe
sera écrasée au prochain build. Éditez `build/data/` et `build/pages/`.
