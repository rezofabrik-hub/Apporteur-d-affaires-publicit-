#!/usr/bin/env python3
"""
Étape 1 : constitue un large pool de photos candidates (Openverse + Wikimedia Commons)
et fabrique des planches-contact numérotées pour une sélection visuelle.

Sortie : _pool/<topic>/NN.jpg  +  _pool/<topic>/meta.json  +  _pool/sheets/<topic>.jpg
"""
import json, os, sys, time, urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
import threading
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POOL = os.path.join(ROOT, "_pool")
UA = "RezoFabrikSiteBuilder/1.0 (https://www.rezofabrik.fr; contact@rezofabrik.fr)"
OV = "https://api.openverse.org/v1/images/"
WM = "https://commons.wikimedia.org/w/api.php"

# topic -> (requêtes Openverse, catégories Wikimedia Commons)
TOPICS = {
    "enseigne":           (["shop sign", "storefront sign", "signboard", "shop facade"],
                           ["Shop signs in France", "Signboards", "Business signs"]),
    "enseigne-lumineuse": (["neon sign", "illuminated sign", "neon light shop", "led sign"],
                           ["Neon signs", "Illuminated signs", "Neon signs in France"]),
    "lettres-decoupees":  (["metal letters", "sign lettering", "3d letters", "letters facade"],
                           ["Lettering on buildings", "Metal letters"]),
    "signaletique":       (["wayfinding", "direction sign", "signpost", "information sign"],
                           ["Wayfinding", "Direction signs", "Information signs"]),
    "signaletique-int":   (["office sign", "indoor sign", "corridor sign", "door sign"],
                           ["Indoor signs", "Door signs"]),
    "signaletique-secu":  (["safety sign", "exit sign", "warning sign", "hazard sign"],
                           ["Safety signs", "Emergency exit signs"]),
    "covering":           (["vehicle wrap", "car wrap", "van advertising", "advertising car"],
                           ["Advertising vehicles", "Vans with advertising"]),
    "covering-flotte":    (["truck advertising", "advertising bus", "delivery van", "livery truck"],
                           ["Advertising trucks", "Advertising on buses"]),
    "impression":         (["large format printer", "wide format printing", "printing machine", "plotter printer"],
                           ["Large format printers", "Inkjet printers"]),
    "impression-banderole": (["banner advertising", "vinyl banner", "printed banner", "billboard poster"],
                           ["Banners", "Advertising banners"]),
    "objets-pub":         (["promotional products", "branded merchandise", "corporate gifts", "promotional pens"],
                           ["Promotional merchandise", "Advertising gifts"]),
    "textile":            (["screen printing", "embroidery machine", "printed t-shirt", "workwear uniform"],
                           ["Screen printing", "Machine embroidery"]),
    "maquette":           (["graphic design", "designer desk", "logo sketch", "design studio"],
                           ["Graphic design", "Graphic designers"]),
    "pao":                (["color swatches", "pantone", "printing proof", "prepress"],
                           ["Colour charts", "Prepress"]),
    "nacelle":            (["cherry picker", "aerial work platform", "boom lift", "scissor lift"],
                           ["Aerial work platforms", "Cherry pickers"]),
    "pose":               (["installing sign", "worker facade", "sign installation", "construction worker building"],
                           ["Sign installation", "Construction workers"]),
    "vitrophanie":        (["shop window", "window lettering", "window sticker", "storefront window"],
                           ["Shop windows", "Window stickers"]),
    "plv":                (["retail display", "point of sale display", "store display", "shop display stand"],
                           ["Point of sale displays", "Retail displays"]),
    "stand":              (["trade fair stand", "exhibition booth", "trade show", "exhibition stand"],
                           ["Trade fair stands", "Exhibition booths"]),
    "gravure":            (["laser cutting", "cnc router", "engraving", "laser cutter workshop"],
                           ["Laser cutting", "CNC routers", "Engraving"]),
    "decoupe-laser":      (["laser cutting machine", "laser cutter metal sheet", "laser engraving machine",
                            "laser cut acrylic", "fiber laser cutting", "laser cutting sparks"],
                           ["Laser cutting", "Laser cutting machines", "Laser engraving"]),
    "cnc":                (["cnc milling machine", "cnc machining center", "cnc router cutting wood",
                            "cnc plasma cutting", "milling machine metal", "cnc machine workshop"],
                           ["CNC machine tools", "Milling machines", "CNC routers", "Plasma cutting"]),
    "totem":              (["pylon sign", "totem sign", "advertising column", "monument sign"],
                           ["Pylon signs", "Advertising columns"]),
    "digital":            (["digital signage", "led display", "video wall", "digital screen advertising"],
                           ["Digital signage", "LED displays"]),
    "marquage-sol":       (["floor marking", "road marking", "floor graphics", "warehouse floor lines"],
                           ["Floor markings", "Road surface marking"]),
    "atelier":            (["metal workshop", "fabrication workshop", "print shop", "workshop craftsman"],
                           ["Workshops", "Sign makers"]),
    "equipe-pro":         (["business handshake", "team meeting", "craftsman portrait", "professionals office"],
                           ["Handshakes", "Business meetings"]),
    "commerce":           (["shops france street", "shop front france", "boutique france", "street shops"],
                           ["Shops in France", "Storefronts in France"]),
    "perpignan":          (["perpignan", "castillet perpignan", "perpignan france", "roussillon"],
                           ["Perpignan", "Le Castillet (Perpignan)"]),
    "hero":               (["shopping street", "commercial street", "city street shops", "high street shops"],
                           ["Shopping streets", "Commercial streets in France"]),
}

BAD_LICENSES = ("cc by-nc", "cc by-nd", "nonc", "noderiv")


_wm_lock = threading.Lock()
_last = [0.0]


def get_json(url, tries=1):
    return _get_json(url)


def _get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.load(r)


def openverse(query, n=14):
    p = urllib.parse.urlencode({"q": query, "license": "cc0,pdm,by,by-sa", "page_size": n,
                                "extension": "jpg", "mature": "false"})
    out = []
    try:
        for r in _get_json(OV + "?" + p).get("results", []):
            u = r.get("url") or ""
            if not u.startswith("http"):
                continue
            out.append({"url": u, "title": (r.get("title") or "")[:150],
                        "creator": (r.get("creator") or "Inconnu")[:80],
                        "creator_url": r.get("creator_url") or "",
                        "license": (r.get("license") or "").upper(),
                        "license_url": r.get("license_url") or "",
                        "source_url": r.get("foreign_landing_url") or "",
                        "provider": r.get("provider") or "openverse"})
    except Exception as e:
        print("   ! openverse '%s' : %s" % (query, e), file=sys.stderr)
    return out


def wm_json(url):
    """Appels Wikimedia sérialisés + backoff : l'API limite fortement le débit."""
    with _wm_lock:
        for attempt in range(4):
            wait = max(0.0, 1.3 - (time.time() - _last[0]))
            if wait:
                time.sleep(wait)
            try:
                r = _get_json(url)
                _last[0] = time.time()
                return r
            except urllib.error.HTTPError as e:
                _last[0] = time.time()
                if e.code != 429 or attempt == 3:
                    raise
                time.sleep(3 * (attempt + 1))
    return {}


def commons(category, n=14):
    p = urllib.parse.urlencode({
        "action": "query", "generator": "categorymembers",
        "gcmtitle": "Category:" + category, "gcmtype": "file", "gcmlimit": n,
        "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": 1600, "format": "json"})
    out = []
    try:
        pages = wm_json(WM + "?" + p).get("query", {}).get("pages", {})
    except Exception as e:
        print("   ! commons '%s' : %s" % (category, e), file=sys.stderr)
        return out
    for pg in pages.values():
        ii = (pg.get("imageinfo") or [{}])[0]
        url = ii.get("thumburl") or ii.get("url")
        if not url or not url.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        em = ii.get("extmetadata", {})
        lic = em.get("LicenseShortName", {}).get("value", "CC BY-SA")
        if any(b in lic.lower() for b in BAD_LICENSES):
            continue
        author = em.get("Artist", {}).get("value", "Wikimedia Commons")
        author = urllib.parse.unquote(author)
        author = __import__("re").sub("<[^>]+>", "", author).strip()[:80] or "Wikimedia Commons"
        out.append({"url": url, "title": pg.get("title", "")[5:][:150], "creator": author,
                    "creator_url": "", "license": lic,
                    "license_url": em.get("LicenseUrl", {}).get("value", ""),
                    "source_url": ii.get("descriptionurl", ""), "provider": "wikimedia"})
    return out


def fetch(item, dest):
    req = urllib.request.Request(item["url"], headers={"User-Agent": UA})
    for attempt in range(2):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
            break
        except Exception:
            if attempt:
                return None
            time.sleep(1.5)
    if len(data) < 25000:
        return None
    tmp = dest + ".bin"
    with open(tmp, "wb") as f:
        f.write(data)
    try:
        im = Image.open(tmp).convert("RGB")
        if im.width < 700 or im.height < 450:
            raise ValueError("trop petit")
        if im.width / im.height < 0.9:          # on écarte les portraits étroits
            raise ValueError("portrait")
        im.thumbnail((1600, 1600), Image.LANCZOS)
        im.save(dest, "JPEG", quality=82, optimize=True)
        item["w"], item["h"] = im.size
        return item
    except Exception:
        return None
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def contact_sheet(topic, metas, path, cols=5, cell=300):
    rows = (len(metas) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 26)), "white")
    d = ImageDraw.Draw(sheet)
    for i, m in enumerate(metas):
        x, y = (i % cols) * cell, (i // cols) * (cell + 26)
        try:
            th = Image.open(m["path"]).convert("RGB")
            th.thumbnail((cell - 8, cell - 8), Image.LANCZOS)
            sheet.paste(th, (x + 4, y + 22))
        except Exception:
            pass
        d.rectangle([x + 2, y + 2, x + 60, y + 20], fill="black")
        d.text((x + 8, y + 6), "%s %02d" % (topic[:6], m["idx"]), fill="white")
    sheet.save(path, "JPEG", quality=72, optimize=True)


def do_topic(topic):
    queries, cats = TOPICS[topic]
    cands = []
    for q in queries:
        cands += openverse(q)
    for c in cats:
        cands += commons(c)
    seen, uniq = set(), []
    for c in cands:
        if c["url"] in seen:
            continue
        seen.add(c["url"])
        uniq.append(c)
    tdir = os.path.join(POOL, topic)
    os.makedirs(tdir, exist_ok=True)
    metas, idx = [], 0
    for c in uniq:
        if len(metas) >= 20:
            break
        idx += 1
        dest = os.path.join(tdir, "%02d.jpg" % idx)
        got = fetch(c, dest)
        if got:
            got["idx"], got["path"] = idx, dest
            metas.append(got)
    with open(os.path.join(tdir, "meta.json"), "w", encoding="utf-8") as f:
        json.dump(metas, f, ensure_ascii=False, indent=1)
    os.makedirs(os.path.join(POOL, "sheets"), exist_ok=True)
    if metas:
        contact_sheet(topic, metas, os.path.join(POOL, "sheets", topic + ".jpg"))
    print("%-22s %2d candidats" % (topic, len(metas)))
    return topic, len(metas)


if __name__ == "__main__":
    only = sys.argv[1:] or list(TOPICS)
    os.makedirs(POOL, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        list(ex.map(do_topic, only))
