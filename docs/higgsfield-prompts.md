# Video hero — v2 (2026-10-14, fotos HD Unsplash)

**Sustituye a la v1** (más abajo, conservada como historial). Mismo pipeline que la v1; solo cambian las fotos de origen y los prompts.

| Archivo | Formato | Duración | Peso |
| --- | --- | --- | --- |
| `public/video/hero-panama-v2-desktop-16x9.mp4` | 1920×1080, H.264 High, 24 fps, sin audio, faststart, CRF 26 | 10,000 s (240 fotogramas) | 7,2 MB |
| `public/video/hero-panama-v2-mobile-9x16.mp4` | 1080×1920, H.264 High, 24 fps, sin audio, faststart, CRF 29 | 10,000 s (240 fotogramas) | 4,4 MB |
| `public/video/hero-panama-v2-{desktop,mobile}-poster.webp` | primer fotograma del montaje (sin salto póster → vídeo), WebP q55 | — | 172 / 179 KB |

- **Fotos**: los 5 masters Unsplash de `data/media-sources.json` → `webPhotos` (`media/references/u-*.jpg`, no versionados).
- **Fotogramas de inicio**: `media/references/frames-v2/{escena}-{16x9,9x16}.jpg`, encuadrados por separado (el 9:16 no es un recorte del vídeo 16:9: un recorte así daría 607×1080 px ampliados ×1,8).
- **Generación**: Google Flow, **Veo 3.1 Fast**, image-to-video, 8 s, descarga "upscaled" 1080p; 10 clips × 20 créditos = 200 créditos. Proyecto local de descarga: `~/flow-mcp-out/TuDestinoHeroV2/`. Todos los clips aceptados al primer intento.
- **Nombres versionados**: `lib/hero-media.ts` (`HERO_VERSION = "v2"`) es la fuente única para el hero, el póster Open Graph y el script de montaje. `/video/*` se sirve con `Cache-Control: immutable`: la v2 se publicó primero con los nombres de la v1 y los navegadores que ya tenían la v1 en caché la seguían mostrando; desde ahora cada montaje lleva un nombre nuevo.
- **Montaje**: `scripts/build-hero-video.sh --posters` (CRF 26 / 29 por defecto) (5 × 2,000 s desde 0,3 s, cortes secos, sin audio). WebM VP9 probado y descartado: más pesado que el MP4 a calidad igual (11,0 / 8,7 MB).
- **QC**: fotogramas 0 / 1 / 2,3 / 4 / 6 / 7,8 s de cada clip. En el tramo usado (0,3–2,3 s) la geometría coincide con la foto. Más allá de ~4 s Veo extiende la escena (más fachadas, resto del buque, olas mayores): esos segundos no se usan.

| # | Escena | Foto | Movimiento (uno por plano) |
| --- | --- | --- | --- |
| 1 | Cinta Costera (apertura) | Luis Aleman | push-in aéreo lento hacia el skyline |
| 2 | Casco Antiguo | Kaori Hirakata | 16:9 deslizamiento lateral muy lento · 9:16 tilt ascendente |
| 3 | Esclusas de Miraflores | Rikin Katyal | push-in lento desde el mirador |
| 4 | San Blas (Guna Yala) | Azzedine Rouichi | 16:9 deriva lateral sutil · 9:16 push-in suave |
| 5 | Bahía al atardecer (final) | Sol Cerrud | avance aéreo lento hacia Punta Paitilla |

Progresión de luz: día → atardecer; el bucle vuelve de una vista aérea de ciudad (5) a otra (1).

Reglas comunes de los prompts v2 (texto completo en el historial de la sesión / Flow): *"One single continuous shot with no cut, no dissolve and no change of location"*, una sola cámara nombrada, preservar geometría exacta, *"Nothing enters the frame"* en Casco, buque que *"advances imperceptibly"* sin cambiar forma, *"window lights steady (no flicker)"* al atardecer, sin texto/logo/marca de agua/morphing/time-lapse, luz natural sin saturación exagerada.

---

# Historial v1 — pipeline Higgsfield / Flow (retirado)

> Los archivos citados en esta sección (clips v1, `media/clips-rejected/`, `media/clips-kling/`, `media/references/frames/`, `data/hero-prompts.json`, `scripts/veo-generate.mjs`) se eliminaron el 2026-10-14; los versionados siguen en el historial git.

Estado al 2026-10-14. Documento honesto: indica lo generado, lo pendiente y cómo terminarlo.

## Resumen de estado (final, 2026-10-14)

✅ **Los dos montajes existen y están integrados:**

| Archivo | Formato | Duración | Fotogramas | Peso |
| --- | --- | --- | --- | --- |
| `public/video/hero-panama-desktop-16x9.mp4` | 1920×1080, H.264 High, 24 fps, sin audio, faststart | 10,000 s | 240 (5 × 48) | 7,98 MB |
| `public/video/hero-panama-mobile-9x16.mp4` | 1080×1920, H.264 High, 24 fps, sin audio, faststart | 10,000 s | 240 (5 × 48) | 4,41 MB |

Orden de los planos: 1 Llegada (bahía aérea) → 2 Canal (Miraflores) → 3 Casco Antiguo → 4 Skyline (Cinta Costera) → 5 Guna Yala. Cortes secos, 2,000 s por plano (desplazamiento 0,3 s en cada clip de 8 s).

Clips fuente en `media/clips/` (Veo 3.1 Fast vía Google Flow). Rechazados por fidelidad (guardados en `media/clips-rejected/`):
- Casco 16:9, 1.ª versión: fundido hacia otra calle inventada (fachadas amarillas/rojas, reja) desde 0,3 s.
- Casco 9:16, 1.ª versión: rama de buganvilla añadida en primer plano desde ~1 s.
Ambos se regeneraron con un prompt que prohíbe cortes, fundidos y elementos que entren en cuadro; las nuevas versiones permanecen en la misma fachada.

Créditos Google Flow consumidos: 12 generaciones × 20 = 240 créditos (los 2 primeros intentos fallaron antes de generar).

## Ruta efectivamente utilizada (2026-10-14): Google Flow · Veo 3.1 Fast

Ante el bloqueo de Higgsfield ("daily generation limit for your grace period") y la ausencia de cuota Veo en la API Gemini (proyecto sin facturación), el cliente aprobó generar los 10 clips con **Google Flow** (cuenta PRO del cliente) mediante el MCP local `flow-mcp`. **Desviación respecto al brief**, que exigía Higgsfield.

- Modelo: **Veo 3.1 - Fast**, image-to-video, 8 s fijos, 24 fps; descarga "upscaled" 1080p (16:9) / 1080×1920 (9:16). El audio generado se elimina en el montaje (`-an`).
- Imágenes de inicio: los mismos 10 recortes de `media/references/frames/`, subidos a mano por el cliente al proyecto Flow "Uploads" (Flow exige aceptar un aviso de derechos en cada subida; las 5 fotos son CC BY / dominio público).
- Prompts: los de `data/hero-prompts.json`, adaptados al formato Flow (sin la mención "2 seconds": Veo genera 8 s y el montaje recorta 2,000 s).
- Coste: 20 créditos por clip, tope de seguridad 25 por clip.
- Incidencias: el MCP marca cada clip como "failed" porque Flow renombra el resultado (p. ej. "Aerial push toward Panama City") y el MCP lo busca por el texto del prompt; la generación sí se realiza. Los vídeos se recuperan con `flow_download` por título (gratuito).
- Los 2 clips Kling (Higgsfield) generados antes se conservan en `media/clips-kling/` y no se usan, para mantener una colorimetría homogénea.

## Parámetros usados (intento Higgsfield)

- Herramienta: Higgsfield (MCP), `generate_video`
- Modelo: **Kling v3.0** (`kling3_0`), `mode: "pro"`, `sound: "off"`, `duration: 3` (mínimo del modelo; se recortan 2,000 s en el montaje)
- Imagen de inicio (`start_image`): recortes de las fotos reales documentadas en `docs/media-sources.md` → `media/references/frames/*.jpg`
- Relación de aspecto: generada **por separado** en `16:9` y `9:16` a partir de recortes distintos (no se recorta el video de escritorio para móvil)
- Salida observada: 1920×1080, **24 fps**, 3,04 s, sin audio
- Coste: 5,25 créditos por clip (10 clips ≈ 52,5 créditos). Saldo consultado antes de generar: 1 208 créditos.

### Media IDs ya subidos a Higgsfield (válidos para reutilizar)

| Recorte | media_id |
| --- | --- |
| 01-arrival-16x9 | `b9ac96aa-a0ad-4ded-86fd-09cedb563ed7` |
| 01-arrival-9x16 | `0d6d980e-2e01-477a-b6ac-cac69d854b4e` |
| 02-canal-16x9 | `0b4b9bf8-6962-4a04-9552-b3cb5465200e` |
| 02-canal-9x16 | `064750ea-a1e9-4f28-87c4-ae794867213e` |
| 03-casco-16x9 | `b1dfb74c-d7e7-4527-b69c-3b051920ada3` |
| 03-casco-9x16 | `a3b89988-45d9-4ab0-967c-06884a976758` |
| 04-skyline-16x9 | `4ff65e31-55d6-4df4-b11c-497c5a5ba43f` |
| 04-skyline-9x16 | `a74c5df8-b494-427e-ae9b-a76885946192` |
| 05-nature-16x9 | `da5e3d5a-5552-44ba-911f-acf43e38f3e1` |
| 05-nature-9x16 | `60155e09-ae8f-4f19-a696-22eacf22edd6` |

Jobs completados: canal 16:9 `02cb6fa4-1670-4f5e-bc5b-dc98fdbee5b8`, skyline 16:9 `d027e936-e717-4945-b7d5-7d98fd951b2a`.

Control de calidad visual de los 2 clips (fotogramas 0 / 36 / 72): geometría, edificios, barcos y esclusas idénticos a la foto; movimiento lento; sin texto, logos ni marcas de agua añadidos. El texto real pintado en los cascos de los barcos (escena 2) proviene de la fotografía original.

## Prompt global (añadido a cada plano)

```
Preserve the exact real-world identity, geography, architecture and natural features of the supplied Panama reference photograph. Create a restrained premium cinematic documentary shot with physically plausible camera motion, realistic tropical daylight, natural atmospheric depth, accurate perspective and stable geometry. No fantasy elements, no new buildings, no altered landmark, no fake signage, no text, no logo, no watermark, no excessive lens flare, no time-lapse, no hyperlapse, no drone acrobatics, no aggressive zoom, no surreal morphing. Keep motion subtle and elegant. Duration exactly 2 seconds.
```

## Prompts por plano (enviados tal cual, combinados con el global)

### Plano 1 — Llegada

16:9:
```
Create a slow, physically plausible aerial push forward toward the authentic Panama landscape shown in the reference. Add only subtle natural parallax and gentle atmospheric depth. The horizon must remain stable. The movement should feel like a calm premium travel documentary opening, not a fast drone shot. Preserve the real coastline and city geometry. Wide 16:9 framing, forward movement slightly diagonal, nothing important cut off.
```
9:16: igual, con `The horizon must remain stable in the upper third … Vertical 9:16 framing, central focal point, calm open space in the lower part of the frame.`

### Plano 2 — Canal

16:9:
```
Create a very slow cinematic lateral movement across the authentic Panama Canal reference, with a subtle forward drift and precise focus on the locks and vessels. Preserve all engineering structures, water channels and vessel proportions exactly. Natural water movement only. No newly generated ships or infrastructure. Gentle lateral move that makes the scale of the canal perceptible. Premium documentary realism.
```
9:16: `Create a very slow cinematic movement with a subtle forward drift … Keep the main subject centered; do not cut the ship or the lock walls. … vertical 9:16 framing.`

### Plano 3 — Casco Antiguo

16:9:
```
Create a calm stabilized camera glide through the authentic Casco Antiguo scene, an extremely gentle horizontal movement. Use subtle parallax from the real architecture, realistic tropical light and a controlled focus transition from one real architectural detail to another. Preserve facade colors, balconies, street geometry and historical architecture. Do not add crowds, people, vehicles, signs or decorative objects.
```
9:16: `Create a calm stabilized slow vertical tilt with a light push-in on the authentic Casco Antiguo facade, architecture dominant in the vertical 9:16 frame … Do not add crowds, people, faces, vehicles, signs or decorative objects.`

### Plano 4 — Skyline

16:9:
```
Create a slow premium cinematic push toward the authentic Panama City skyline along the Cinta Costera. Wide composition, light forward movement, perfectly stable horizon. Preserve the exact skyline silhouette and building geometry from the reference. Add only realistic atmospheric depth, subtle water movement and a gentle controlled focus pull; traffic may move naturally at real speed. No new skyscrapers, no futuristic additions, no altered roads.
```
9:16: `… vertical 9:16 framing with the skyline centered and the main towers kept inside the frame at full height …`

### Plano 5 — Naturaleza y estabilización final

16:9:
```
Create a slow cinematic reveal of the authentic Guna Yala island landscape shown in the reference, panoramic composition. Use subtle camera drift, realistic palm foliage and gentle water movement and a calm tropical atmosphere. Preserve the exact island, huts, coastline, vegetation and horizon. Gradually reduce camera motion during the final second and finish on a stable, sharp composition suitable for a title overlay. No new buildings, no boats added, no people added.
```
9:16: `… vertical 9:16 framing with breathing room around the center … finish on a stable, sharp composition.`

> Nota: Kling genera como mínimo 3 s. La frase "Duration exactly 2 seconds" se mantiene en el prompt por coherencia con el brief, pero la duración exacta de 2,000 s se garantiza en el montaje (`scripts/build-hero-video.sh`), que toma 2 s de cada clip a partir de un desplazamiento configurable (0,3 s por defecto) y exige exactamente 240 fotogramas a 24 fps (10,000 s).

## Cómo terminar (cuando el límite se restablezca o el plan se actualice)

1. Relanzar los 8 clips pendientes con los mismos `media_id` y prompts (mismo modelo y parámetros). Comprobar el coste antes (`get_cost: true`).
2. Descargar cada resultado a `media/clips/<escena>-<16x9|9x16>.mp4` (nombres exactos: `01-arrival`, `02-canal`, `03-casco`, `04-skyline`, `05-nature`).
3. Revisar cada clip (geometría, sin texto/logos añadidos, sin personas inventadas en primer plano). Regenerar si hace falta.
4. Ejecutar:
   ```bash
   ./scripts/build-hero-video.sh --posters
   ```
   Opcional: `--webm` (VP9) y desplazamientos por clip, p. ej. `OFFSET_03_casco_9x16=0.6`.
5. `npm run build` → el hero activa automáticamente el video correspondiente a cada orientación.

Presupuesto de peso objetivo: móvil 3–5 MB, escritorio 5–8 MB (el script avisa si se superan 5 MB / 8 MB).
