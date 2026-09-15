#!/usr/bin/env python3
# =========================================================================
#  Générateur du bloc de données de build/data/communes.js
#  ------------------------------------------------------------------------
#  POURQUOI CET OUTIL
#
#  communes.js porte, pour chaque ville du site, les quatre valeurs dont
#  dépend le régime de publicité extérieure : population municipale, unité
#  urbaine, dépassement du seuil des 100 000 habitants, nombre d'immeubles
#  protégés. Ce sont elles qui rendent chaque page ville différente pour
#  autre chose que son nom.
#
#  Le fichier a été tenu à la main tant qu'il comptait 440 entrées. Passé à
#  818, la saisie manuelle garantissait une erreur quelque part — et une
#  erreur ici n'est pas cosmétique : elle fait annoncer à un commerçant
#  qu'il a le droit de poser un totem alors qu'il ne l'a pas.
#
#  TROIS SOURCES, TOUTES OFFICIELLES
#
#   1. Population — geo.api.gouv.fr (API Découpage administratif de l'État,
#      données Insee). Vérifiée sur les 440 entrées tenues à la main :
#      440 correspondances exactes, aucun écart.
#
#   2. Unité urbaine — Insee, zonage en unités urbaines 2020, géographie au
#      1er janvier 2023, feuille « Composition_communale ». La tranche de
#      taille vient de la feuille « UU2020 », colonne TUU2017 : tranche ≥ 6
#      signifie plus de 100 000 habitants. Vérifié sur les 440 entrées :
#      aucun écart, ni sur le nom d'unité urbaine ni sur le seuil.
#
#      Attention au piège : les codes d'unité urbaine d'outre-mer
#      contiennent une lettre (9C601 pour Cayenne). Un filtre sur cinq
#      chiffres les écarte silencieusement et fait passer six communes
#      d'outre-mer sous le seuil des 100 000 habitants.
#
#   3. Immeubles protégés — base Mérimée, ministère de la Culture,
#      export POP. Le rattachement se fait sur le code Insee au moment de
#      la protection. Paris, Lyon et Marseille classent leurs notices par
#      arrondissement : elles sont additionnées sur la commune. Vérifié sur
#      les 440 entrées : 429 comptes identiques, 9 à moins de deux notices
#      près, 2 écarts supérieurs tenant à la fraîcheur de la base.
#
#  USAGE
#      python3 tools/gen_communes.py        (nécessite un accès réseau)
#
#  Le fichier produit est relu par le build, qui reste hors ligne.
# =========================================================================
import csv, io, json, os, re, subprocess, sys, unicodedata, zipfile
import xml.etree.ElementTree as ET

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(RACINE, "tools", ".geocache")
SORTIE = os.path.join(RACINE, "build", "data", "communes.js")

UU_URL = "https://www.insee.fr/fr/statistiques/fichier/4802589/UU2020_au_01-01-2023.zip"
MH_URL = "https://ministere-culture.s3.sbg.io.cloud.ovh.net/POP/merimee.csv"
GEO_URL = ("https://geo.api.gouv.fr/communes?fields=nom,code,population"
           ",departement&format=json")


def telecharger(url, dest, mini=10_000):
    """Télécharge avec reprise : le proxy sortant coupe une requête sur dix."""
    if os.path.exists(dest) and os.path.getsize(dest) > mini:
        return dest
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    for essai in range(1, 5):
        r = subprocess.run(["curl", "-sSfL", url, "-o", dest, "--max-time", "300"])
        if r.returncode == 0 and os.path.getsize(dest) > mini:
            return dest
        print(f"  réseau : échec {essai}/4", file=sys.stderr)
        subprocess.run(["sleep", str(3 * essai)])
    raise SystemExit(f"téléchargement impossible : {url}")


def slugifier(nom):
    # Le site désambiguïse certains noms par un suffixe entre parenthèses —
    # « Saint-Denis (La Réunion) » — qui n'existe pas dans le répertoire
    # officiel. Sans ce nettoyage la commune reste introuvable et perd sa page.
    nom = re.sub(r"\s*\([^)]*\)", "", nom)
    s = unicodedata.normalize("NFD", nom)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").lower()
    s = re.sub(r"['’ ]", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    return re.sub(r"-+", "-", s).strip("-")


def lire_xlsx(z, feuille):
    NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
    ss = ["".join(t.text or "" for t in si.iter(NS + "t"))
          for si in ET.fromstring(z.read("xl/sharedStrings.xml"))]
    for row in ET.fromstring(z.read(feuille)).iter(NS + "row"):
        vals = {}
        for c in row.iter(NS + "c"):
            ref = re.match(r"([A-Z]+)", c.get("r") or "A1").group(1)
            v = c.find(NS + "v")
            if v is None:
                continue
            vals[ref] = ss[int(v.text)] if c.get("t") == "s" else v.text
        yield vals


def charger_uu():
    zpath = telecharger(UU_URL, os.path.join(CACHE, "uu2020.zip"), 100_000)
    # L'archive Insee contient le classeur, qui est lui-même une archive :
    # on ouvre donc le xlsx depuis le zip, sans écrire de fichier temporaire.
    exterieur = zipfile.ZipFile(zpath)
    nom_xlsx = next(n for n in exterieur.namelist() if n.endswith(".xlsx"))
    z = zipfile.ZipFile(io.BytesIO(exterieur.read(nom_xlsx)))
    # sheet2 = table des unités urbaines, sheet3 = composition communale
    tranches = {}
    for r in lire_xlsx(z, "xl/worksheets/sheet2.xml"):
        a = r.get("A")
        # le code peut contenir une lettre outre-mer : surtout pas \d{5}
        if a and re.fullmatch(r"[0-9A-Z]{5}", a) and (r.get("C") or "").isdigit():
            tranches[a] = int(r["C"])
    par_commune = {}
    for r in lire_xlsx(z, "xl/worksheets/sheet3.xml"):
        cod = r.get("A")
        if cod and re.fullmatch(r"[0-9][0-9AB][0-9]{3}", cod):
            lib = r.get("D") or ""
            par_commune[cod] = {
                "uu": None if re.search(r"hors unité urbaine", lib, re.I) else lib,
                "grande": tranches.get(r.get("C"), 0) >= 6,
            }
    return par_commune


def charger_mh():
    csv.field_size_limit(10 ** 9)
    path = telecharger(MH_URL, os.path.join(CACHE, "merimee.csv"), 1_000_000)
    compte = {}
    with open(path, encoding="utf-8", errors="replace") as f:
        r = csv.reader(f, delimiter="|")
        entete = next(r)
        iCOG = entete.index("COG_Insee_lors_de_la_protection")
        for row in r:
            if len(row) <= iCOG:
                continue
            m = re.search(r"\b(\d[0-9AB]\d{3})\b", row[iCOG] or "")
            if m:
                compte[m.group(1)] = compte.get(m.group(1), 0) + 1
    # Paris, Lyon et Marseille classent leurs notices par arrondissement
    for parent, arrs in {
        "75056": [f"751{i:02d}" for i in range(1, 21)],
        "69123": [f"693{i:02d}" for i in range(81, 90)],
        "13055": [f"132{i:02d}" for i in range(1, 17)],
    }.items():
        compte[parent] = compte.get(parent, 0) + sum(compte.get(a, 0) for a in arrs)
    return compte


def charger_geo():
    path = telecharger(GEO_URL, os.path.join(CACHE, "communes-fr.json"), 1_000_000)
    return json.load(open(path, encoding="utf-8"))


def main():
    villes = json.load(open(os.path.join(CACHE, "villes-du-site.json"), encoding="utf-8"))
    uu, mh, geo = charger_uu(), charger_mh(), charger_geo()

    par_cle = {}
    for c in geo:
        d = (c.get("departement") or {}).get("code")
        if d and c.get("population"):
            par_cle[(d, slugifier(c["nom"]))] = c

    lignes, absents = [], []
    for v in sorted(villes, key=lambda x: x["slug"]):
        c = par_cle.get((v["dept"], slugifier(v["name"])))
        if not c:
            absents.append(f'{v["slug"]} ({v["dept"]})')
            continue
        code = c["code"]
        u = uu.get(code, {"uu": None, "grande": False})
        libelle = "null" if not u["uu"] else json.dumps(u["uu"], ensure_ascii=False)
        lignes.append(
            f'  {json.dumps(v["slug"])}: {{ insee: "{code}", pop: {c["population"]}, '
            f'uu: {libelle}, uuGrande: {"true" if u["grande"] else "false"}, '
            f'mh: {mh.get(code, 0)} }},'
        )

    print(f"  {len(lignes)} communes produites")
    if absents:
        print(f"  {len(absents)} sans correspondance : {', '.join(absents[:10])}")

    src = open(SORTIE, encoding="utf-8").read()
    debut = src.index("const communes = {")
    fin = src.index("\n};", debut)
    neuf = src[:debut] + "const communes = {\n" + "\n".join(lignes) + src[fin:]
    open(SORTIE, "w", encoding="utf-8").write(neuf)
    print(f"  écrit : {SORTIE}")


if __name__ == "__main__":
    main()
