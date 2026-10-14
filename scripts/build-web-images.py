"""Rebuild the 16:10 web derivatives in public/images from the HD originals in media/references.

Same crop windows as the first 1600 px pass (located against the published files), now
exported at 2560x1600 so large cards and retina screens get real pixels. No upscaling:
every original is wider than 3500 px. next/image serves smaller sizes to phones.

usage: python3 scripts/build-web-images.py
"""
from PIL import Image, ImageFilter

# (original, derivative, crop box x, y, w, h in original pixels, denoise)
JOBS = [
    ("01-arrival", "panama-city-bahia-aerea", 206, 0, 3587, 2242, False),
    ("02-canal", "canal-esclusas-miraflores", 0, 95, 4727, 2954, False),
    ("03-casco", "casco-antiguo-fachada", 0, 86, 4288, 2680, False),
    ("04-skyline", "skyline-cinta-costera", 0, 110, 5483, 3427, True),
    ("05-nature", "guna-yala-isla", 0, 104, 5184, 3240, False),
]
W, H = 2560, 1600

for src, dst, x, y, w, h, denoise in JOBS:
    im = Image.open(f"media/references/{src}.jpg").convert("RGB").crop((x, y, x + w, y + h))
    if denoise:
        # The skyline original carries visible sensor grain at 100 %; a sub-pixel blur before
        # downsampling removes it without softening the towers at 2560 px.
        im = im.filter(ImageFilter.GaussianBlur(0.7))
    im = im.resize((W, H), Image.LANCZOS)
    # Light sharpening to recover the crispness lost in downsampling (no halos at this radius).
    im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=45, threshold=2))
    im.save(f"public/images/{dst}.webp", "WEBP", quality=80, method=6)
    print(dst, im.size)
