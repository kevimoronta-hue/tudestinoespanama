"""White-on-blue logo for the footer, from the official master (PNG embedded in
public/brand/tu-destino-es-panama-logo.svg).

Only the blue areas become white; their light modulation is kept so the 3D relief survives.
Red ribbons, the red accent in the A and the silver ribbons are untouched. Edges blend
progressively with the original pixels (no hard cut-out); alpha is the original alpha.

usage: python3 scripts/build-logo-white.py
"""
import base64
import io
import re

import numpy as np
from PIL import Image

svg = open("public/brand/tu-destino-es-panama-logo.svg").read()
png = base64.b64decode(re.search(r"data:image/png;base64,([A-Za-z0-9+/=\s]+)", svg).group(1))
im = np.asarray(Image.open(io.BytesIO(png)).convert("RGBA")).astype(np.float32)
rgb, alpha = im[..., :3], im[..., 3:]
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

# How "blue" a pixel is: blue channel above the others. Saturated brand blues score high,
# silver (neutral, slightly cool) and red score ~0.
blueness = b - np.maximum(r, g)
w = np.clip((blueness - 18) / 55, 0, 1)[..., None]

# White with the original light modulation: brightest blues → pure white, deepest → soft
# light grey, so the bevels of the letters and the map stay readable.
lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
lum_n = np.clip((lum - 0.04) / 0.45, 0, 1)
shade = (0.86 + 0.14 * lum_n)[..., None] * 255
white = np.concatenate([shade, shade, shade], axis=-1)

out_rgb = rgb * (1 - w) + white * w
out = np.concatenate([out_rgb, alpha], axis=-1).clip(0, 255).astype(np.uint8)
img = Image.fromarray(out)
img.save("public/brand/logo-white-1564.png", optimize=True)
for width in (480, 800):
    h = round(468 * width / 1564)
    img.resize((width, h), Image.LANCZOS).save(f"public/brand/logo-white-{width}.webp", "WEBP", quality=90, method=6)
print("ok")
