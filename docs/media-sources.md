# Fuentes de imágenes — Hero y secciones

Versión legible por máquina: [`data/media-sources.json`](../data/media-sources.json).

- **Fecha de obtención:** 2026-10-14
- **Método:** API de Wikimedia Commons (`prop=imageinfo`, `extmetadata`). Autor, licencia y resolución se volvieron a consultar el 2026-10-14 y coinciden con `media/references/meta.json`.
- **Uso:** cada foto es el fotograma inicial de un clip image-to-video (escena del hero) y tiene además un derivado web WebP.

## Resumen

| # | Escena | Archivo local | Autor | Licencia | Atribución obligatoria | Derivado web |
|---|--------|---------------|-------|----------|------------------------|--------------|
| 1 | Llegada | `01-arrival.jpg` | Dronepicr | CC BY 3.0 | Sí | `public/images/panama-city-bahia-aerea.webp` |
| 2 | Canal | `02-canal.jpg` | U.S. Department of State | Dominio público | No | `public/images/canal-esclusas-miraflores.webp` |
| 3 | Identidad / Casco Antiguo | `03-casco.jpg` | David Broad | CC BY 3.0 | Sí | `public/images/casco-antiguo-fachada.webp` |
| 4 | Modernidad / Skyline | `04-skyline.jpg` | dronepicr | CC BY 2.0 | Sí | `public/images/skyline-cinta-costera.webp` |
| 5 | Apertura / Naturaleza | `05-nature.jpg` | Ayaita | CC BY 3.0 | Sí | `public/images/guna-yala-isla.webp` |

Los pósters `public/video/hero-panama-desktop-poster.webp` (1920×1080) y `public/video/hero-panama-mobile-poster.webp` (1080×1920) derivan de los recortes de la escena 5 y llevan el mismo crédito.

### Archivos derivados (medidos con `ffprobe` el 2026-10-14)

| Archivo | Dimensiones |
|---------|-------------|
| `media/references/frames/*-16x9.jpg` (5 archivos) | 1920×1080 |
| `media/references/frames/*-9x16.jpg` (5 archivos) | 1080×1920 |
| `public/images/*.webp` (5 archivos, `scripts/build-web-images.py`) | 2560×1600 |
| `public/video/hero-panama-desktop-poster.webp` | 1920×1080 |
| `public/video/hero-panama-mobile-poster.webp` | 1080×1920 |

Los puntos focales que se indican abajo **se estimaron a posteriori** comparando cada recorte con su original (búsqueda de la mejor coincidencia, suponiendo un recorte de tipo *cover* sin zoom adicional). Son aproximados (±0,02).

---

## 1 · Llegada — `01-arrival`

- **Página fuente:** https://commons.wikimedia.org/wiki/File:Panama_City_financial_district.jpg
- **Archivo:** https://upload.wikimedia.org/wikipedia/commons/8/8c/Panama_City_financial_district.jpg
- **Autor:** Dronepicr (obra propia)
- **Licencia:** CC BY 3.0 — https://creativecommons.org/licenses/by/3.0
- **Atribución obligatoria:** sí
- **Lugar:** distrito financiero de la Ciudad de Panamá visto desde la Bahía de Panamá (Cinta Costera)
- **GPS:** 8.965575, -79.524282
- **Fecha de captura:** 2016-03-22 08:40:21 (dron DJI)
- **Resolución original:** 3992×2242, horizontal
- **Compatibilidad 16:9:** sí — el original ya es casi 16:9; recorte 3985×2242 (fotograma completo) → 1920×1080.
- **Compatibilidad 9:16:** sí, por recorte, **con reservas de calidad**. Es la imagen de menor resolución del conjunto: el recorte vertical solo dispone de **1261×2242 px** de fuente. Se reduce a 1080×1920 (no hay ampliación, factor ≈0,86), pero apenas queda margen y se descarta ~68 % del ancho. Si el generador de vídeo amplía internamente o se aplica un zoom en el clip, la pérdida de nitidez será visible antes que en las demás escenas.
- **Punto focal:** 16:9 centro (0,50 / 0,50); 9:16 x≈0,45 — torres del distrito financiero sobre la marina.
- **Crédito a mostrar:** `Dronepicr, CC BY 3.0, vía Wikimedia Commons`
- **Confianza de ubicación:** alta (GPS + categorías *Panama Bay*, *Cinta Costera*, *Skylines of Panama City* + descripción).

## 2 · Canal — `02-canal`

- **Página fuente:** https://commons.wikimedia.org/wiki/File:Two_Ships_Transit_Miraflores_Locks_as_Secretary_Kerry_Visits_Panama_Canal_After_Attending_Summit_of_the_Americas_in_Panama_(17108904531).jpg
- **Archivo:** https://upload.wikimedia.org/wikipedia/commons/b/b1/Two_Ships_Transit_Miraflores_Locks_as_Secretary_Kerry_Visits_Panama_Canal_After_Attending_Summit_of_the_Americas_in_Panama_%2817108904531%29.jpg
- **Autor:** U.S. Department of State (vía Flickr, foto 17108904531)
- **Licencia:** dominio público (obra del Gobierno de EE. UU.); no hay URL de licencia.
- **Atribución obligatoria:** no. Se recomienda mantener el crédito igualmente.
- **Lugar:** Esclusas de Miraflores, Canal de Panamá
- **GPS:** 8.974610, -79.578952
- **Fecha de captura:** 2015-04-10 18:57:03
- **Resolución original:** 4727×3146, horizontal
- **Compatibilidad 16:9:** sí, por recorte 4727×2658 (franja centrada) → 1920×1080.
- **Compatibilidad 9:16:** sí, por recorte 1769×3146 → 1080×1920.
- **Punto focal:** 16:9 centro; 9:16 x≈0,38 — proa del buque rojo y muro central.
- **Crédito a mostrar:** `U.S. Department of State, dominio público, vía Wikimedia Commons`
- **Confianza de ubicación:** alta (GPS + categoría *Miraflores Locks* + descripción oficial).
- **Nota:** el nombre de un buque comercial es legible en la imagen. La foto se tomó durante una visita oficial, pero no aparece ninguna persona reconocible.

## 3 · Identidad / Casco Antiguo — `03-casco`

- **Página fuente:** https://commons.wikimedia.org/wiki/File:Old_Panama_City_-_Casco_Viejo_-_Panama_-_panoramio_(14).jpg
- **Archivo:** https://upload.wikimedia.org/wikipedia/commons/9/90/Old_Panama_City_-_Casco_Viejo_-_Panama_-_panoramio_%2814%29.jpg
- **Autor:** David Broad (Panoramio, archivado)
- **Licencia:** CC BY 3.0 — https://creativecommons.org/licenses/by/3.0
- **Atribución obligatoria:** sí
- **Lugar:** Casco Antiguo (Casco Viejo), Ciudad de Panamá. El edificio concreto no está identificado.
- **GPS:** 8.952008, -79.535804
- **Fecha de captura:** 2016-02-15 (sin hora)
- **Resolución original:** 4288×2848, horizontal
- **Compatibilidad 16:9:** sí, por recorte 4288×2412 → 1920×1080.
- **Compatibilidad 9:16:** sí, por recorte 1602×2848 → 1080×1920.
- **Punto focal:** 16:9 x=0,50, y≈0,45 (balcones superiores); 9:16 x≈0,60 — esquina de la fachada rosa.
- **Crédito a mostrar:** `David Broad, CC BY 3.0, vía Wikimedia Commons`
- **Confianza de ubicación:** alta (GPS + categoría *Historic District of Panamá* + título).

## 4 · Modernidad / Skyline — `04-skyline`

- **Página fuente:** https://commons.wikimedia.org/wiki/File:Panama_Stadt_(27057207512).jpg
- **Archivo:** https://upload.wikimedia.org/wikipedia/commons/3/3c/Panama_Stadt_%2827057207512%29.jpg
- **Autor:** dronepicr (Flickr; mismo autor que la escena 1)
- **Licencia:** CC BY 2.0 — https://creativecommons.org/licenses/by/2.0
- **Atribución obligatoria:** sí
- **Lugar:** Cinta Costera / Bahía de Panamá, Ciudad de Panamá
- **GPS:** no disponible en los metadatos
- **Fecha de captura:** 2016-03-21 15:31
- **Resolución original:** 5483×3655, horizontal
- **Compatibilidad 16:9:** sí, por recorte 5483×3084 → 1920×1080.
- **Compatibilidad 9:16:** sí, por recorte 2055×3655 → 1080×1920.
- **Punto focal:** 16:9 centro; 9:16 x≈0,62 — torres y avenida costera.
- **Crédito a mostrar:** `dronepicr, CC BY 2.0, vía Wikimedia Commons`
- **Confianza de ubicación:** alta, basada solo en categorías (*Cinta Costera*, *Panama Bay*, *Skylines of Panama City*) y título; sin GPS.

## 5 · Apertura / Naturaleza — `05-nature`

- **Página fuente:** https://commons.wikimedia.org/wiki/File:Guna_Yala_Island.jpg
- **Archivo:** https://upload.wikimedia.org/wikipedia/commons/7/72/Guna_Yala_Island.jpg
- **Autor:** Ayaita (obra propia)
- **Licencia:** CC BY 3.0 — https://creativecommons.org/licenses/by/3.0
- **Atribución obligatoria:** sí
- **Lugar:** una isla de la Comarca Guna Yala (archipiélago de San Blas), Caribe panameño. **La isla concreta no está identificada.**
- **GPS:** no disponible en los metadatos
- **Fecha de captura:** 2012-05-06
- **Resolución original:** 5184×3456, horizontal
- **Compatibilidad 16:9:** sí, por recorte 5184×2916 → 1920×1080.
- **Compatibilidad 9:16:** sí, por recorte 1944×3456 → 1080×1920.
- **Punto focal:** 16:9 centro; 9:16 x≈0,55 — palmeras y cabañas.
- **Crédito a mostrar:** `Ayaita, CC BY 3.0, vía Wikimedia Commons` (también para los dos pósters del hero)
- **Confianza de ubicación:** media — la comarca es fiable (categorías *Guna Yala Comarca*, *San Blas Islands* + descripción), la isla exacta no. No nombrar una isla concreta en los textos.

---

## Licencias y obligaciones

- Las cinco imágenes son **CC BY (2.0 o 3.0) o dominio público**. **Ninguna es ShareAlike (BY-SA)**, por lo que los vídeos derivados del hero **no quedan obligados** a publicarse bajo una licencia ShareAlike; el sitio puede conservar sus propios términos sobre el montaje.
- **CC BY exige atribución visible** (autor, licencia con enlace, fuente). El sitio muestra los créditos (implementado):
  - línea **"Créditos de imágenes"** en el pie de página de todas las páginas (autor, licencia, "vía Wikimedia Commons");
  - lista completa en **/es/nosotros#creditos** y **/en/about#creditos**, con enlace a la página Commons de cada foto y a la URL de la licencia, y una nota que indica que las imágenes fueron recortadas y, en el video de portada, animadas mediante IA;
  - crédito discreto de la foto del póster en la esquina inferior del hero (escritorio);
  - pie de foto con crédito bajo la imagen de cada artículo.
- **CC BY exige indicar si se hicieron cambios.** Los recortes, los WebP y los clips del hero son obras modificadas. Añadir junto al crédito: **"recortada y animada mediante IA"** (en los WebP estáticos basta con "recortada"). Ejemplo:
  > Dronepicr, CC BY 3.0, vía Wikimedia Commons — recortada y animada mediante IA
- Enlazar cada crédito a su página fuente en Commons y la licencia a su URL.
- No dar a entender que los autores ni el Departamento de Estado de EE. UU. respaldan el proyecto.
- Para el dominio público (escena 2) el crédito es una cortesía, no una obligación.

## Almacenamiento de originales

- Los originales en `media/references/` son pesados (total ≈ 42 MB; **`04-skyline.jpg` ≈ 22 MB**, `01-arrival.jpg` ≈ 6,8 MB). **No deben copiarse a `public/`**: se publicarían tal cual y Next.js no los optimiza.
- El sitio solo debe servir los derivados de `public/images/` y `public/video/`.
- Recomendación: versionar `media/references/` con **Git LFS** (`git lfs track "media/references/*.jpg"`) o excluir esos JPG del repositorio (`.gitignore`) y guardarlos en un almacenamiento externo, conservando `meta.json` y este documento como trazabilidad. Ninguna de estas opciones está configurada todavía.
