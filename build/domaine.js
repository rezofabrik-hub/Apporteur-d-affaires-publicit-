#!/usr/bin/env node
/* =========================================================================
   Bascule du site vers son nom de domaine définitif.
   -------------------------------------------------------------------------
   Usage :  node build/domaine.js rezoenseignes.fr
            node build/domaine.js --etat

   CE QUE FAIT CE SCRIPT
     · remplace l'adresse du site dans build/data/site.js — c'est elle qui
       alimente les URL canoniques, les balises Open Graph, les deux
       sitemaps, le robots.txt et l'ensemble du balisage JSON-LD ;
     · écrit le fichier CNAME attendu par GitHub Pages ;
     · reconstruit les 1 968 pages.

   POURQUOI IL NE FAUT PAS LE LANCER AVANT D'AVOIR DÉPOSÉ LE DOMAINE

   Le fichier CNAME dit à GitHub Pages de ne plus servir que ce domaine :
   l'adresse en .github.io se met à rediriger vers lui. Si le domaine
   n'existe pas encore, ou si ses DNS ne sont pas propagés, le site
   devient inaccessible — pas dégradé, inaccessible.

   L'ordre est donc : déposer le domaine, poser les DNS, attendre la
   propagation, PUIS lancer ce script.
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const RACINE = path.join(__dirname, "..");
const SITE = path.join(RACINE, "build/data/site.js");
const CNAME = path.join(RACINE, "CNAME");

function etat() {
  const s = fs.readFileSync(SITE, "utf8");
  const m = s.match(/^\s*domain: "([^"]+)"/m);
  console.log("  domaine configuré :", m ? m[1] : "(introuvable)");
  console.log("  fichier CNAME     :",
    fs.existsSync(CNAME) ? fs.readFileSync(CNAME, "utf8").trim() : "(absent)");
}

const arg = process.argv[2];
if (!arg || arg === "--etat") { etat(); process.exit(0); }

const domaine = arg.replace(/^https?:\/\//, "").replace(/\/+$/, "").toLowerCase();
if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9-]+)+$/.test(domaine)) {
  console.error("Domaine invalide :", arg);
  process.exit(1);
}

let s = fs.readFileSync(SITE, "utf8");
const avant = s.match(/^\s*domain: "([^"]+)"/m);
if (!avant) { console.error("Ligne domain introuvable dans build/data/site.js"); process.exit(1); }

s = s.replace(/^(\s*domain: )"[^"]+"/m, `$1"https://${domaine}"`);
fs.writeFileSync(SITE, s);

/* GitHub Pages lit ce fichier à la racine du dépôt publié. Sans saut de
   ligne final il est parfois mal interprété. */
fs.writeFileSync(CNAME, domaine + "\n");

console.log("  ancien domaine :", avant[1]);
console.log("  nouveau        : https://" + domaine);
console.log("  CNAME écrit    :", domaine);
console.log("\n  reconstruction…\n");
execFileSync("node", [path.join(__dirname, "build.js")], { stdio: "inherit", cwd: RACINE });

console.log("\n  À vérifier après déploiement :");
console.log("   · https://" + domaine + "/sitemap-index.xml répond 200");
console.log("   · les URL canoniques pointent bien vers " + domaine);
console.log("   · « Enforce HTTPS » est coché dans les réglages Pages du dépôt");
