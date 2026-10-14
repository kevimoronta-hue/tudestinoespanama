/**
 * Single source of truth for the home hero video and its posters.
 *
 * /video/* is served with `Cache-Control: immutable` (next.config.ts), so a new montage MUST
 * get new file names: bump HERO_VERSION, run scripts/build-hero-video.sh (it reads the same
 * version) and delete the previous files. Never overwrite a published file under the same name.
 */
export const HERO_VERSION = "v2";

const base = `/video/hero-panama-${HERO_VERSION}`;

export const HERO_MEDIA = {
  desktop: { video: `${base}-desktop-16x9.mp4`, poster: `${base}-desktop-poster.webp`, width: 1920, height: 1080 },
  mobile: { video: `${base}-mobile-9x16.mp4`, poster: `${base}-mobile-poster.webp`, width: 1080, height: 1920 },
} as const;
