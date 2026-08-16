# Rezo Fabrik — réseau national enseigne, signalétique & publicité par l'objet

Site vitrine et générateur de demandes pour une activité d'**apporteur d'affaires**
en communication visuelle : mise en relation entre des clients ayant un projet
(enseigne, signalétique, covering, impression, objets publicitaires) et des
professionnels indépendants partout en France.

**69 pages HTML statiques**, sans framework ni dépendance externe : aucun CDN,
aucune police distante, aucun traceur. Tout se charge depuis le domaine.

---

## Ce que contient le site

| Bloc | Pages | Rôle |
|---|---|---|
| Accueil | `index.html` | Positionnement, métiers, méthode, preuve, double appel à l'action |
| Métiers | 8 pages piliers | Contenu long (1 500 à 2 500 mots) par domaine, avec tableaux de prix et FAQ |
| Villes | 46 pages locales | SEO local : département, quartiers, zones d'activité, contraintes régionales |
| Conversion | `devis.html`, `professionnels.html`, `merci.html` | Formulaires multi-étapes client et partenaire |
| Ressources | `tarifs`, `glossaire`, `reglementation-enseigne`, `comment-ca-marche`, `faq`, `villes` | Contenu de référence, longue traîne |
| Légal | `mentions-legales`, `confidentialite`, `credits-photos`, `plan-du-site`, `404` | Obligations et transparence |

### Les 8 pages métier

`enseignes` · `signaletique` · `covering-vehicule` · `impression-grand-format`
`objets-publicitaires` · `maquette-creation-graphique` · `pose-nacelle` · `vitrophanie-plv`

---

## Démarrage

```bash
node build/build.js          # régénère les 69 pages + sitemap.xml + robots.txt
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

Mettez également à jour l'e-mail et le téléphone dans ce fichier —
ils sont injectés partout sur le site.

### 2. Identité et coordonnées — `build/data/site.js`

Nom de marque, baseline, nom de domaine, e-mails, téléphone, ville pilote,
chiffres affichés sur l'accueil. Relancez `node build/build.js` après modification.

**Important** : remplacez `domain` par votre vrai nom de domaine dès qu'il est en
place. Cette valeur alimente les URL canoniques, le `sitemap.xml` et l'Open Graph.

### 3. Mentions légales et confidentialité

Les pages `mentions-legales.html` et `confidentialite.html` contiennent des champs
entre crochets — `[Forme juridique]`, `[adresse]`, `[SIRET]` — **à compléter avant
toute mise en ligne définitive**. Ces mentions sont légalement obligatoires
(loi n°2004-575 du 21 juin 2004). Le contenu se modifie dans `build/pages/misc.js`.

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

### 5. Ajouter ou modifier un métier — `build/data/services.js`

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

Les scripts de collecte se trouvent dans `tools/` (dépôt `comte-guifr-`) et ne
sont pas nécessaires au fonctionnement du site.

---

## Référencement — ce qui est déjà en place

- Titres et méta-descriptions uniques sur les 69 pages (vérifié automatiquement)
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

### GitHub Pages (automatique)

Le workflow `.github/workflows/deploy-pages.yml` publie le site à chaque push
sur `main`. Il active GitHub Pages tout seul au premier passage.

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
