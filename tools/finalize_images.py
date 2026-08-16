#!/usr/bin/env python3
"""
Étape 2 : à partir du pool de candidats, retient la sélection validée visuellement,
applique un étalonnage colorimétrique commun (cohérence "direction artistique")
et exporte les visuels du site + le fichier de crédits/licences.
"""
import json, os, shutil, sys
from PIL import Image, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POOL = os.path.join(ROOT, "_pool")
SITE = os.environ.get("SITE_DIR", os.path.join(ROOT, "site"))
OUT = os.path.join(SITE, "assets", "img")

# Sélection validée à partir des planches-contact (indices du pool)
PICKS = {
    "enseigne":             [2, 13, 17, 18, 28],
    "enseigne-lumineuse":   [3, 10, 11, 13, 19, 30],
    "lettres-decoupees":    [32, 33, 3, 8],
    "signaletique":         [1, 3, 4, 5, 11, 15, 21, 26],
    "signaletique-int":     [27, 9, 1, 15],
    "signaletique-secu":    [7, 10, 18, 20, 22, 23],
    "covering":             [1, 2, 3, 6, 7, 8, 10, 11, 13, 14, 20],
    "covering-flotte":      [17, 39, 41],
    "impression":           [1, 2, 22],
    "impression-banderole": [19, 20, 21, 25, 26, 31, 32],
    "objets-pub":           [18, 26, 32, 2],
    "textile":              [44, 49, 50, 51, 11, 3],
    "maquette":             [15, 17, 21, 13, 31],
    "pao":                  [10, 11, 12, 15, 21],
    "nacelle":              [1, 4, 10, 12, 38, 43, 45, 48, 51],
    "pose":                 [5, 9, 13, 15, 20, 8],
    "vitrophanie":          [8, 13, 14, 15, 18, 19],
    "plv":                  [17, 18, 23, 26, 30, 33, 36],
    "stand":                [14, 16, 17, 18, 19, 20, 26, 28],
    "gravure":              [18, 19, 20, 22, 23, 26, 27, 28],
    "decoupe-laser":        [1, 14, 13, 18, 19, 22, 5, 2],
    "cnc":                  [10, 2, 3, 9, 17, 5, 6],
    "totem":                [9, 16, 22, 52, 55, 56],
    "digital":              [7, 12, 14, 15, 29, 31],
    "marquage-sol":         [5, 6, 22, 30, 31, 34],
    "atelier":              [3, 6, 7, 29, 32],
    "equipe-pro":           [1, 16, 19, 20, 22],
    "commerce":             [3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 22, 25],
    "perpignan":            [4, 8, 10, 17, 18, 20, 21, 22, 32],
    "hero":                 [5, 7, 13, 22, 24],
}

SIZES = (("lg", 1280), ("md", 720))
SHADOW_TINT = (4, 11, 20)   # remontée des noirs vers le bleu d'encre de la charte


def grade(im):
    """Étalonnage léger et homogène : contraste +, saturation -, noirs teintés."""
    im = ImageEnhance.Color(im).enhance(0.93)
    im = ImageEnhance.Contrast(im).enhance(1.16)
    im = ImageEnhance.Brightness(im).enhance(1.01)
    r, g, b = im.split()
    lut = []
    for ch in range(3):
        base = SHADOW_TINT[ch]
        lut.append([min(255, int(v + base * (1 - v / 255.0) ** 3.0)) for v in range(256)])
    r, g, b = r.point(lut[0]), g.point(lut[1]), b.point(lut[2])
    return Image.merge("RGB", (r, g, b))


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT, exist_ok=True)
    credits, missing, kept = [], [], 0
    manifest = {}
    for topic, idxs in PICKS.items():
        meta_path = os.path.join(POOL, topic, "meta.json")
        if not os.path.isfile(meta_path):
            missing.append(topic)
            continue
        by_idx = {m["idx"]: m for m in json.load(open(meta_path, encoding="utf-8"))}
        entries = []
        for n, idx in enumerate(idxs, start=1):
            m = by_idx.get(idx)
            if not m:
                missing.append("%s#%d" % (topic, idx))
                continue
            src = os.path.join(POOL, topic, "%02d.jpg" % idx)
            if not os.path.isfile(src):
                missing.append("%s#%d(fichier)" % (topic, idx))
                continue
            im = grade(Image.open(src).convert("RGB"))
            name = "%s-%d" % (topic, n)
            dims = {}
            for suffix, width in SIZES:
                c = im.copy()
                if c.width > width:
                    c = c.resize((width, round(c.height * width / c.width)), Image.LANCZOS)
                c.save(os.path.join(OUT, "%s-%s.jpg" % (name, suffix)),
                       "JPEG", quality=75, optimize=True, progressive=True)
                dims[suffix] = c.size
            entries.append({"name": name, "w": dims["lg"][0], "h": dims["lg"][1]})
            credits.append({
                "file": name, "topic": topic,
                "title": m.get("title") or "Photographie",
                "creator": m.get("creator") or "Auteur inconnu",
                "creator_url": m.get("creator_url") or "",
                "license": m.get("license") or "CC",
                "license_url": m.get("license_url") or "",
                "source_url": m.get("source_url") or "",
                "provider": m.get("provider") or "",
            })
            kept += 1
        manifest[topic] = entries
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    with open(os.path.join(SITE, "assets", "credits.json"), "w", encoding="utf-8") as f:
        json.dump(credits, f, ensure_ascii=False, indent=1)
    print("%d visuels exportés (%d sujets)" % (kept, len(manifest)))
    if missing:
        print("manquants :", ", ".join(missing[:20]), file=sys.stderr)


if __name__ == "__main__":
    main()
