"""Perspectivas cards: one real, location-verified photo per concept (Unsplash masters in
media/references/p-*.jpg, sources in data/media-sources.json → perspectivas).
Crop once, downsample once, WebP q80. next/image serves smaller variants.

usage: python3 scripts/build-perspectivas-images.py
"""
from PIL import Image

# (master, output, crop box x, y, w, h or None for full frame, output width)
JOBS = [
    ("p-connect", "conectividad-vuelo-panama", None, 2400),
    # Tighter on the causeway, the Biomuseo and the ships waiting at the Canal entrance.
    ("p-position", "posicion-calzada-amador", (250, 250, 3200, 2018), 2400),
    ("p-logistics", "logistica-esclusas-canal", None, 2400),
    ("p-diversity", "regiones-valle-chiriqui", None, 2000),
    ("p-nature", "naturaleza-isla-coiba", None, 1600),
    # Casco Antiguo promenade: right part only (keeps the strollers, drops the masked couple
    # in front), landscape and close enough on the people for the split card.
    ("p-communityB", "comunidad-paseo-casco-ancho", (2540, 1800, 2200, 1848), 2000),
]

for src, dst, box, width in JOBS:
    im = Image.open(f"media/references/{src}.jpg").convert("RGB")
    if box:
        x, y, w, h = box
        im = im.crop((x, y, x + w, y + h))
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    im.save(f"public/images/perspectivas/{dst}.webp", "WEBP", quality=80, method=6)
    print(dst, im.size)
