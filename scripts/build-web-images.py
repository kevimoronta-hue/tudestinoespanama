"""Build the 16:10 web photos in public/images from the HD masters in media/references.

Masters are free-licence originals downloaded at full resolution (see data/media-sources.json,
"webPhotos"). Each is cropped to 16:10 and downsampled once to 2560x1600 (no upscaling, no
sharpening). next/image then serves 640-2560 px variants in AVIF/WebP, so phones never get
the 2560 master.

usage: python3 scripts/build-web-images.py
"""
from PIL import Image

# (master in media/references, published file, crop box x, y, w, h in master pixels)
JOBS = [
    ("u-bahia", "panama-city-bahia-aerea", 0, 300, 4032, 2520),
    ("u-canalA", "canal-esclusas-miraflores", 0, 380, 4032, 2520),
    ("u-casco", "casco-antiguo-fachada", 0, 78, 3740, 2338),
    ("u-cinta", "skyline-cinta-costera", 276, 0, 4912, 3070),
    ("u-isla", "guna-yala-isla", 0, 250, 4000, 2500),
]
W, H = 2560, 1600

for src, dst, x, y, w, h in JOBS:
    im = Image.open(f"media/references/{src}.jpg").convert("RGB").crop((x, y, x + w, y + h))
    im = im.resize((W, H), Image.LANCZOS)
    im.save(f"public/images/{dst}.webp", "WEBP", quality=82, method=6)
    print(dst, im.size)
