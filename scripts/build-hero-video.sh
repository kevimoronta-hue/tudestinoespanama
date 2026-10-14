#!/usr/bin/env bash
#
# build-hero-video.sh — Monta los vídeos del hero a partir de los clips de
# Higgsfield/Kling (uno por escena y orientación).
#
# Entradas esperadas (en $CLIPS_DIR, por defecto media/clips/):
#   $SCENES-{16x9,9x16}.mp4 (por defecto 01-cinta 02-casco 03-canal 04-isla 05-bahia)
#   Cada clip debe durar al menos OFFSET + 2.0 s.
#
# Salidas (en $OUT_DIR, por defecto public/video/):
#   hero-panama-<versión>-desktop-16x9.mp4   1920×1080, 24 fps, 10,0 s, 240 fotogramas
#   hero-panama-<versión>-mobile-9x16.mp4    1080×1920, 24 fps, 10,0 s, 240 fotogramas
#   <versión> = HERO_VERSION de lib/hero-media.ts (fuente única). /video/* se sirve como
#   "immutable": para un montaje nuevo, sube HERO_VERSION; nunca sobrescribas un archivo publicado.
#   (+ .webm VP9 con --webm, + pósters WebP con --posters)
#
# Montaje: 5 × 2,000 s, cortes secos (filtro concat, sin fundidos), sin audio,
# H.264 High, CRF 26 (16x9) / 29 (9x16) — overridable with CRF_16x9 / CRF_9x16, preset slow, +faststart.
#
# Uso:
#   scripts/build-hero-video.sh [--only 16x9|9x16] [--posters] [--webm] [-h]
#
# Opciones:
#   --only 16x9|9x16  Construye solo una orientación (solo exige esos 5 clips).
#   --posters         Regenera los pósters WebP desde el primer fotograma (sin salto póster → vídeo).
#                     Por defecto NO se tocan los pósters existentes.
#   --webm            Genera además una versión WebM (VP9).
#   -h, --help        Muestra esta ayuda.
#
# Variables de entorno:
#   CLIPS_DIR   Carpeta de clips (por defecto <proyecto>/media/clips)
#   OUT_DIR     Carpeta de salida (por defecto <proyecto>/public/video)
#   OFFSET_<escena>_<orientación>
#               Segundos a saltar al inicio de un clip (por defecto 0.3).
#               La escena usa "_" en lugar de "-", p. ej.:
#                 OFFSET_02_canal_16x9=0.5
#                 OFFSET_05_nature_9x16=1.2
#   DEFAULT_OFFSET  Cambia el desplazamiento por defecto (0.3).
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

CLIPS_DIR="${CLIPS_DIR:-$PROJECT_ROOT/media/clips}"
OUT_DIR="${OUT_DIR:-$PROJECT_ROOT/public/video}"
DEFAULT_OFFSET="${DEFAULT_OFFSET:-0.3}"

# v2 (2026-10-14): fotos HD Unsplash. v1 (Commons): "01-arrival 02-canal 03-casco 04-skyline 05-nature".
HERO_VERSION="$(sed -n 's/^export const HERO_VERSION = "\(.*\)";$/\1/p' "$PROJECT_ROOT/lib/hero-media.ts")"
[ -n "$HERO_VERSION" ] || { echo "ERROR: no se encontró HERO_VERSION en lib/hero-media.ts" >&2; exit 1; }
SCENES="${SCENES:-01-cinta 02-casco 03-canal 04-isla 05-bahia}"
SEG_SECONDS="2.000"
FPS="${FPS:-24}"       # Kling v3.0 entrega 24 fps: se conserva sin duplicar fotogramas
SEG_FRAMES=$((FPS * 2))

TOTAL_FRAMES=$((FPS * 10))
TARGET_DURATION="10.0"
DURATION_TOLERANCE="0.05"
MAX_MOBILE_BYTES=$((5 * 1024 * 1024))
MAX_DESKTOP_BYTES=$((8 * 1024 * 1024))

DO_POSTERS=0
DO_WEBM=0
ONLY=""

usage() {
  sed -n '2,/^set -euo pipefail/p' "${BASH_SOURCE[0]}" | sed '$d' | sed 's/^# \{0,1\}//'
}

die() {
  echo "ERROR: $*" >&2
  exit 1
}

# --- Argumentos -------------------------------------------------------------
while [ $# -gt 0 ]; do
  case "$1" in
    --posters) DO_POSTERS=1 ;;
    --webm) DO_WEBM=1 ;;
    --only)
      [ $# -ge 2 ] || die "--only requiere un valor: 16x9 o 9x16"
      ONLY="$2"
      shift
      ;;
    --only=*) ONLY="${1#--only=}" ;;
    -h|--help) usage; exit 0 ;;
    *) echo "ERROR: argumento desconocido: $1" >&2; echo >&2; usage >&2; exit 2 ;;
  esac
  shift
done

case "$ONLY" in
  "") ORIENTATIONS="16x9 9x16" ;;
  16x9|9x16) ORIENTATIONS="$ONLY" ;;
  *) die "valor no válido para --only: '$ONLY' (usa 16x9 o 9x16)" ;;
esac

# --- Herramientas -----------------------------------------------------------
command -v ffmpeg >/dev/null 2>&1 || die "ffmpeg no está instalado."
command -v ffprobe >/dev/null 2>&1 || die "ffprobe no está instalado."

is_number() {
  printf '%s' "$1" | grep -Eq '^[0-9]+(\.[0-9]+)?$'
}

is_number "$DEFAULT_OFFSET" || die "DEFAULT_OFFSET no es un número: '$DEFAULT_OFFSET'"

# --- Comprobación de clips --------------------------------------------------
missing=""
for o in $ORIENTATIONS; do
  for s in $SCENES; do
    f="$CLIPS_DIR/$s-$o.mp4"
    if [ ! -f "$f" ]; then
      missing="$missing  - $f"$'\n'
    fi
  done
done

if [ -n "$missing" ]; then
  echo "ERROR: faltan clips para montar el hero ($ORIENTATIONS):" >&2
  printf '%s' "$missing" >&2
  echo "No se ha generado nada. Coloca los clips que faltan en $CLIPS_DIR y vuelve a ejecutar." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# --- Utilidades -------------------------------------------------------------
offset_for() { # $1 = escena, $2 = orientación
  local var="OFFSET_$(printf '%s' "$1" | tr '-' '_')_$2"
  local val="${!var:-$DEFAULT_OFFSET}"
  is_number "$val" || die "$var no es un número: '$val'"
  printf '%s' "$val"
}

clip_duration() {
  ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$1"
}

file_bytes() {
  wc -c < "$1" | tr -d ' '
}

human_size() {
  awk -v b="$1" 'BEGIN { printf "%.2f MB", b / 1048576 }'
}

# Construye los argumentos de entrada y el filtergraph para una orientación.
# Resultado en las variables globales INPUT_ARGS (array) y FILTER.
build_graph() { # $1 = orientación, $2 = ancho, $3 = alto
  local o="$1" w="$2" h="$3" i=0 s f off dur need concat_in=""
  INPUT_ARGS=()
  FILTER=""
  for s in $SCENES; do
    f="$CLIPS_DIR/$s-$o.mp4"
    off="$(offset_for "$s" "$o")"
    dur="$(clip_duration "$f")"
    need="$(awk -v a="$off" -v b="$SEG_SECONDS" 'BEGIN { printf "%.3f", a + b }')"
    if ! awk -v d="$dur" -v n="$need" 'BEGIN { exit !(d + 0 >= n + 0) }'; then
      die "$f dura ${dur}s; con un desplazamiento de ${off}s necesita al menos ${need}s."
    fi
    echo "  [$o] $s  desplazamiento=${off}s  duración clip=${dur}s" >&2
    # +0.5 s de margen de lectura; el corte exacto lo hace trim por fotogramas.
    INPUT_ARGS+=(-ss "$off" -t "$(awk -v b="$SEG_SECONDS" 'BEGIN { printf "%.3f", b + 0.5 }')" -i "$f")
    FILTER="${FILTER}[$i:v]fps=$FPS,scale=$w:$h:force_original_aspect_ratio=increase:flags=lanczos,crop=$w:$h,setsar=1,format=yuv420p,trim=start_frame=0:end_frame=$SEG_FRAMES,setpts=PTS-STARTPTS[v$i];"
    concat_in="$concat_in[v$i]"
    i=$((i + 1))
  done
  FILTER="${FILTER}${concat_in}concat=n=$i:v=1:a=0,fps=$FPS[out]"
}

verify_output() { # $1 = archivo
  local f="$1" dur frames
  dur="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f")"
  frames="$(ffprobe -v error -count_frames -select_streams v:0 \
    -show_entries stream=nb_read_frames -of default=nw=1:nk=1 "$f")"
  echo "  verificación: duración=${dur}s fotogramas=${frames}" >&2
  if ! awk -v d="$dur" -v t="$TARGET_DURATION" -v tol="$DURATION_TOLERANCE" \
      'BEGIN { x = d - t; if (x < 0) x = -x; exit !(x <= tol) }'; then
    echo "ERROR: duración ${dur}s fuera de ${TARGET_DURATION}±${DURATION_TOLERANCE}s ($f)" >&2
    return 1
  fi
  if [ "$frames" != "$TOTAL_FRAMES" ]; then
    echo "ERROR: ${frames} fotogramas, se esperaban ${TOTAL_FRAMES} ($f)" >&2
    return 1
  fi
}

make_poster() { # $1 = vídeo, $2 = póster .webp
  local video="$1" poster="$2" png
  png="${poster%.webp}.tmp-poster.png"
  # Primer fotograma: el vídeo arranca exactamente sobre el póster.
  ffmpeg -hide_banner -loglevel error -y -i "$video" -frames:v 1 "$png"
  if ffmpeg -hide_banner -encoders 2>/dev/null | grep -q libwebp; then
    ffmpeg -hide_banner -loglevel error -y -i "$png" -c:v libwebp -quality 55 "$poster"
  elif command -v cwebp >/dev/null 2>&1; then
    cwebp -quiet -q 55 "$png" -o "$poster"
  elif command -v python3 >/dev/null 2>&1 && \
      python3 -c "from PIL import features; import sys; sys.exit(0 if features.check('webp') else 1)" 2>/dev/null; then
    python3 -c "import sys; from PIL import Image; Image.open(sys.argv[1]).save(sys.argv[2], 'WEBP', quality=55, method=6)" "$png" "$poster"
  else
    rm -f "$png"
    die "no hay codificador WebP (ffmpeg libwebp, cwebp o Python PIL); póster no generado."
  fi
  rm -f "$png"
  echo "  póster: $poster ($(human_size "$(file_bytes "$poster")"))" >&2
}

# --- Montaje ----------------------------------------------------------------
status=0
for o in $ORIENTATIONS; do
  if [ "$o" = "16x9" ]; then
    W=1920; H=1080; CRF="${CRF_16x9:-26}"; NAME="hero-panama-$HERO_VERSION-desktop-16x9"; POSTER="hero-panama-$HERO_VERSION-desktop-poster.webp"; MAX=$MAX_DESKTOP_BYTES
  else
    W=1080; H=1920; CRF="${CRF_9x16:-29}"; NAME="hero-panama-$HERO_VERSION-mobile-9x16"; POSTER="hero-panama-$HERO_VERSION-mobile-poster.webp"; MAX=$MAX_MOBILE_BYTES
  fi

  echo "== $o → $OUT_DIR/$NAME.mp4" >&2
  build_graph "$o" "$W" "$H"

  out="$OUT_DIR/$NAME.mp4"
  tmp="$OUT_DIR/$NAME.tmp.mp4"
  ffmpeg -hide_banner -loglevel error -y "${INPUT_ARGS[@]}" \
    -filter_complex "$FILTER" -map "[out]" -an \
    -frames:v "$TOTAL_FRAMES" -r "$FPS" \
    -c:v libx264 -profile:v high -preset slow -crf "$CRF" -pix_fmt yuv420p \
    -g "$((FPS * 2))" -movflags +faststart \
    "$tmp"

  if ! verify_output "$tmp"; then
    rm -f "$tmp"
    status=1
    continue
  fi
  mv -f "$tmp" "$out"

  bytes="$(file_bytes "$out")"
  echo "  OK: $out ($(human_size "$bytes"))" >&2
  if [ "$bytes" -gt "$MAX" ]; then
    echo "  AVISO: $out supera $(human_size "$MAX"); considera subir el CRF." >&2
  fi

  if [ "$DO_WEBM" -eq 1 ]; then
    wout="$OUT_DIR/$NAME.webm"
    wtmp="$OUT_DIR/$NAME.tmp.webm"
    ffmpeg -hide_banner -loglevel error -y "${INPUT_ARGS[@]}" \
      -filter_complex "$FILTER" -map "[out]" -an \
      -frames:v "$TOTAL_FRAMES" -r "$FPS" \
      -c:v libvpx-vp9 -crf $((CRF + 10)) -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
      -pix_fmt yuv420p "$wtmp"
    if verify_output "$wtmp"; then
      mv -f "$wtmp" "$wout"
      echo "  OK: $wout ($(human_size "$(file_bytes "$wout")"))" >&2
    else
      rm -f "$wtmp"
      status=1
    fi
  fi

  if [ "$DO_POSTERS" -eq 1 ]; then
    make_poster "$out" "$OUT_DIR/$POSTER"
  else
    echo "  pósters: se conservan los existentes (usa --posters para regenerarlos)" >&2
  fi
done

exit "$status"
