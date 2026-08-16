#!/usr/bin/env python3
"""
Récupère des photographies libres de droit (Openverse : CC0 / domaine public / CC-BY)
pour chaque domaine métier du site, les redimensionne et écrit un manifeste JSON
(crédits + licences) utilisé par le générateur de pages.

Usage : python3 tools/fetch-images.py
"""
import json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "signaletique", "assets", "img")
MANIFEST = os.path.join(ROOT, "signaletique", "assets", "img", "credits.json")
API = "https://api.openverse.org/v1/images/"
LICENSES = "cc0,pdm,by"
UA = "RezoFabrik-SiteBuilder/1.0 (+https://www.rezofabrik.fr)"

# slug -> liste de requêtes (on prend les meilleurs résultats, dédupliqués)
TOPICS = {
    "enseigne":            ["storefront sign shop", "shop sign facade", "business sign building"],
    "enseigne-lumineuse":  ["neon sign shop front", "illuminated sign night", "led sign letters"],
    "lettres-decoupees":   ["metal letters sign wall", "channel letters sign", "3d letters signage"],
    "signaletique":        ["wayfinding signage", "directional sign arrows", "information sign panel"],
    "signaletique-int":    ["office door sign", "interior signage office", "museum wayfinding"],
    "signaletique-secu":   ["safety sign construction", "emergency exit sign", "warning sign industrial"],
    "covering":            ["vehicle wrap van", "car wrap vinyl", "van lettering company"],
    "covering-flotte":     ["fleet vehicles branding", "delivery van livery", "truck lettering"],
    "impression":          ["large format printer", "wide format printing machine", "digital printing press"],
    "impression-banderole":["banner printing", "vinyl banner outdoor", "roll of vinyl print"],
    "objets-pub":          ["promotional products branded", "branded merchandise mugs", "corporate gifts pens"],
    "textile":             ["screen printing tshirt", "embroidery machine textile", "printed t-shirt workshop"],
    "maquette":            ["graphic designer workspace", "logo design sketch", "designer computer mockup"],
    "pao":                 ["color proof printing", "pantone color swatches", "graphic design studio"],
    "nacelle":             ["cherry picker aerial platform", "boom lift worker", "aerial work platform building"],
    "pose":                ["worker installing sign", "installer ladder facade", "construction worker facade"],
    "vitrophanie":         ["window graphics shop", "shop window lettering", "frosted window film office"],
    "plv":                 ["point of sale display retail", "retail display stand", "cardboard display shop"],
    "stand":               ["trade show booth", "exhibition stand", "conference roll up banner"],
    "gravure":             ["laser cutting machine", "cnc router workshop", "engraving machine metal"],
    "totem":               ["pylon sign totem", "outdoor totem sign", "monument sign entrance"],
    "digital":             ["digital signage screen", "led display screen shop", "digital menu board"],
    "marquage-sol":        ["floor marking warehouse", "floor graphics arrow", "parking line marking"],
    "atelier":             ["sign workshop fabrication", "metal workshop welding", "print shop workshop"],
    "equipe-pro":          ["business handshake partnership", "team meeting office", "craftsman portrait workshop"],
    "commerce":            ["french shop front street", "boutique facade street", "restaurant terrace facade"],
    "perpignan":           ["perpignan france", "castillet perpignan", "roussillon france town"],
    "hero":                ["city street signs shops", "shopping street signage", "urban storefronts"],
}

PER_TOPIC = 3


def api_search(query, page_size=12):
    params = urllib.parse.urlencode({
        "q": query,
        "license": LICENSES,
        "page_size": page_size,
        "extension": "jpg",
        "mature": "false",
    })
    req = urllib.request.Request(API + "?" + params, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.load(r).get("results", [])


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    if len(data) < 20000:
        raise ValueError("image trop petite (%d o)" % len(data))
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)


def process(path, slug, idx):
    """Redimensionne en deux tailles : -lg (1600px) et -md (800px). Retourne (w,h) du lg."""
    from PIL import Image
    im = Image.open(path)
    im = im.convert("RGB")
    out = {}
    for suffix, width in (("lg", 1600), ("md", 800)):
        c = im.copy()
        if c.width > width:
            c = c.resize((width, round(c.height * width / c.width)), Image.LANCZOS)
        target = os.path.join(OUT_DIR, "%s-%d-%s.jpg" % (slug, idx, suffix))
        c.save(target, "JPEG", quality=78, optimize=True, progressive=True)
        out[suffix] = (c.width, c.height)
    return out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    seen_ids = set()
    for slug, queries in TOPICS.items():
        picked = []
        for q in queries:
            if len(picked) >= PER_TOPIC:
                break
            try:
                results = api_search(q)
            except Exception as e:
                print("  ! recherche KO (%s) : %s" % (q, e), file=sys.stderr)
                time.sleep(2)
                continue
            for r in results:
                if len(picked) >= PER_TOPIC:
                    break
                if r["id"] in seen_ids:
                    continue
                url = r.get("url") or ""
                if not url.startswith("http"):
                    continue
                idx = len(picked) + 1
                tmp = os.path.join(OUT_DIR, "_tmp.bin")
                try:
                    download(url, tmp)
                    dims = process(tmp, slug, idx)
                except Exception as e:
                    print("  . rejet %s : %s" % (r["id"][:8], e), file=sys.stderr)
                    continue
                finally:
                    if os.path.exists(tmp):
                        os.remove(tmp)
                seen_ids.add(r["id"])
                picked.append({
                    "file": "%s-%d" % (slug, idx),
                    "w": dims["lg"][0], "h": dims["lg"][1],
                    "title": (r.get("title") or "").strip()[:160],
                    "creator": (r.get("creator") or "Inconnu").strip()[:80],
                    "creator_url": r.get("creator_url") or "",
                    "license": (r.get("license") or "").upper(),
                    "license_url": r.get("license_url") or "",
                    "source_url": r.get("foreign_landing_url") or "",
                    "provider": r.get("provider") or "",
                    "query": q,
                })
            time.sleep(0.6)
        manifest[slug] = picked
        print("%-20s %d image(s)" % (slug, len(picked)))
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    total = sum(len(v) for v in manifest.values())
    print("\n%d images enregistrées dans %s" % (total, OUT_DIR))


if __name__ == "__main__":
    main()
