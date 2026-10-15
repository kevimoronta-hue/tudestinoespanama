"""Contact card photo (FinalCTA): Unsplash master media/references/c-window.jpg
(Jason Grant, Panama City — source in data/media-sources.json → contact).
Portrait master downsampled once to 1600 px wide, WebP q80; next/image serves smaller sizes.

usage: python3 scripts/build-contact-image.py
"""
from PIL import Image

im = Image.open("media/references/c-window.jpg").convert("RGB")
w = 1600
im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
im.save("public/images/contacto-ventana-skyline.webp", "WEBP", quality=80, method=6)
print(im.size)
