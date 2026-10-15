"""Brand symbol alone (globe + Panama map + plane + ribbons), cut from the official master
(PNG embedded in public/brand/tu-destino-es-panama-logo.svg) at the transparent gap that
separates it from the wordmark (x≈676). Pixel-exact, no redrawing. Two versions:
  logo-symbol.webp        original colours
  logo-symbol-white.webp  brand blue → white (same recolour as scripts/build-logo-white.py),
                          for dark/blue surfaces such as the WhatsApp button.

usage: python3 scripts/build-logo-symbol.py
"""
import base64
import io
import re

import numpy as np
from PIL import Image

svg = open("public/brand/tu-destino-es-panama-logo.svg").read()
png = base64.b64decode(re.search(r"data:image/png;base64,([A-Za-z0-9+/=\s]+)", svg).group(1))
master = Image.open(io.BytesIO(png)).convert("RGBA")

symbol = master.crop((0, 0, 676, master.height))
symbol = symbol.crop(symbol.getbbox())  # trim to the drawn pixels

arr = np.asarray(symbol).astype(np.float32)
rgb, alpha = arr[..., :3], arr[..., 3:]
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
w = np.clip(((b - np.maximum(r, g)) - 18) / 55, 0, 1)[..., None]
lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
shade = (0.86 + 0.14 * np.clip((lum - 0.04) / 0.45, 0, 1))[..., None] * 255
white = np.concatenate([shade, shade, shade], axis=-1)
white_symbol = Image.fromarray(np.concatenate([rgb * (1 - w) + white * w, alpha], axis=-1).clip(0, 255).astype(np.uint8))

for img, name in ((symbol, "logo-symbol"), (white_symbol, "logo-symbol-white")):
    h = 256
    img.resize((round(img.width * h / img.height), h), Image.LANCZOS).save(f"public/brand/{name}.webp", "WEBP", quality=90, method=6)
print(symbol.size)
