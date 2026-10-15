"""Default Open Graph / Twitter image (1200x630): the site's real San Blas beach photo
(media/references/u-isla.jpg — public/images/guna-yala-isla.webp, hero shot 4), a subtle
ocean-navy gradient on the open sea/sky side, the white logo (public/brand/logo-white-1564.png,
built from the official master) and the title "Tu destino es Panamá" in Manrope 800 (site font).

usage: python3 scripts/build-og-image.py   (font: media/references/manrope-800.ttf, Google Fonts OFL)
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
photo = Image.open("media/references/u-isla.jpg").convert("RGB")
# 1.905:1 crop keeping the palms, the shoreline and the open sea (lower-middle band).
pw, ph = photo.size
ch = round(pw * H / W)
top = round((ph - ch) * 0.55)
bg = photo.crop((0, top, pw, top + ch)).resize((W, H), Image.LANCZOS)

# Gradient: transparent over the palms, deep brand navy on the right (text side) and a
# light veil at the bottom. Brand ocean navy #0A2B5C → #061C3D.
x = np.linspace(0, 1, W)[None, :, None]
y = np.linspace(0, 1, H)[:, None, None]
a = np.clip((x - 0.34) / 0.66, 0, 1) ** 1.2 * 0.82 + np.clip((y - 0.6) / 0.4, 0, 1) ** 2 * 0.25
a = np.clip(a, 0, 0.85)
navy = np.array([7, 33, 72], dtype=np.float32)[None, None, :]
img = np.asarray(bg).astype(np.float32)
img = img * (1 - a) + navy * a
canvas = Image.fromarray(img.clip(0, 255).astype(np.uint8)).convert("RGBA")

# Logo (white version of the official logo), right column.
logo = Image.open("public/brand/logo-white-1564.png").convert("RGBA")
lh = 70
logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
X = 742
canvas.alpha_composite(logo, (X, 176))

# Title, exactly "Tu destino es Panamá", two lines, with a very soft shadow.
font = ImageFont.truetype("media/references/manrope-800.ttf", 78)
lines = ["Tu destino", "es Panamá"]
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
ty = 290
for i, line in enumerate(lines):
    sd.text((X, ty + i * 88 + 3), line, font=font, fill=(2, 14, 34, 110))
canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(10)))
d = ImageDraw.Draw(canvas)
for i, line in enumerate(lines):
    d.text((X, ty + i * 88), line, font=font, fill=(255, 255, 255, 255))

out = canvas.convert("RGB")
out.save("public/og/og-tu-destino-es-panama.jpg", "JPEG", quality=88, optimize=True, progressive=True)
print(out.size)
