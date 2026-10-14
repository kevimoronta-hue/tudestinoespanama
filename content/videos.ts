import type { ContentImage, VideoResource } from "@/types/content";

/** This file holds the Spanish and English originals; other locales live in *.{fr,de,it}.ts. */
type Locale = "es" | "en";

/**
 * DEMO video placeholders. No `videoUrl` until a real, licensed recording
 * is supplied. Thumbnails reuse the licensed article images.
 */

function thumb(
  src: string,
  alt: Record<Locale, string>,
  credit: Record<Locale, string>,
  locale: Locale,
): ContentImage {
  return { src, alt: alt[locale], width: 1600, height: 1000, credit: credit[locale] };
}

const T = {
  casco: (l: Locale) =>
    thumb(
      "/images/casco-antiguo-fachada.webp",
      {
        es: "Fachada colonial con balcones en el Casco Antiguo de Ciudad de Panamá",
        en: "Colonial facade with balconies in Panama City's Casco Antiguo",
      },
      {
        es: "David Broad, CC BY 3.0, vía Wikimedia Commons",
        en: "David Broad, CC BY 3.0, via Wikimedia Commons",
      },
      l,
    ),
  canal: (l: Locale) =>
    thumb(
      "/images/canal-esclusas-miraflores.webp",
      {
        es: "Dos barcos transitando por las esclusas de Miraflores del Canal de Panamá",
        en: "Two ships transiting the Miraflores Locks of the Panama Canal",
      },
      {
        es: "U.S. Department of State, dominio público, vía Wikimedia Commons",
        en: "U.S. Department of State, public domain, via Wikimedia Commons",
      },
      l,
    ),
  gunaYala: (l: Locale) =>
    thumb(
      "/images/guna-yala-isla.webp",
      {
        es: "Pequeña isla con palmeras y chozas en Guna Yala",
        en: "Small island with palm trees and huts in Guna Yala",
      },
      {
        es: "Ayaita, CC BY 3.0, vía Wikimedia Commons",
        en: "Ayaita, CC BY 3.0, via Wikimedia Commons",
      },
      l,
    ),
  skyline: (l: Locale) =>
    thumb(
      "/images/skyline-cinta-costera.webp",
      {
        es: "Horizonte de Ciudad de Panamá y la Cinta Costera",
        en: "Panama City skyline and the Cinta Costera",
      },
      {
        es: "dronepicr, CC BY 2.0, vía Wikimedia Commons",
        en: "dronepicr, CC BY 2.0, via Wikimedia Commons",
      },
      l,
    ),
};

const PENDING_ES =
  "Video planificado. Se publicará cuando esté disponible una grabación con licencia de uso.";
const PENDING_EN =
  "Planned video. It will be published once a licensed recording is available.";

export const videos: VideoResource[] = [
  // ───────────── ES ─────────────
  {
    translationKey: "video-casco-antiguo",
    locale: "es",
    title: "Recorrido por el Casco Antiguo (video pendiente)",
    slug: "recorrido-casco-antiguo",
    description: `Paseo por las calles y plazas del distrito histórico. ${PENDING_ES}`,
    thumbnail: T.casco("es"),
    category: "cultura",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-10",
    status: "demo",
  },
  {
    translationKey: "video-canal",
    locale: "es",
    title: "El Canal de Panamá visto desde las esclusas (video pendiente)",
    slug: "canal-desde-las-esclusas",
    description: `Mirada al paso de barcos por el Canal, que conecta el Atlántico con el Pacífico. ${PENDING_ES}`,
    thumbnail: T.canal("es"),
    category: "ciudad",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-17",
    status: "demo",
  },
  {
    translationKey: "video-guna-yala",
    locale: "es",
    title: "Paisajes de Guna Yala (video pendiente)",
    slug: "paisajes-guna-yala",
    description: `Imágenes de las islas del Caribe panameño, que se grabarán con permiso de la comunidad. ${PENDING_ES}`,
    thumbnail: T.gunaYala("es"),
    category: "naturaleza",
    location: "Guna Yala",
    publishedAt: "2026-09-24",
    status: "demo",
  },
  {
    translationKey: "video-guia-llegada",
    locale: "es",
    title: "Guía: preguntas antes de mudarte (video pendiente)",
    slug: "guia-preguntas-antes-de-mudarte",
    description: `Resumen en video de las preguntas que conviene preparar y verificar con fuentes oficiales. ${PENDING_ES}`,
    thumbnail: T.skyline("es"),
    category: "guia",
    location: "Panamá (nacional)",
    publishedAt: "2026-10-01",
    status: "demo",
  },

  // ───────────── EN ─────────────
  {
    translationKey: "video-casco-antiguo",
    locale: "en",
    title: "A walk through Casco Antiguo (video pending)",
    slug: "casco-antiguo-walk",
    description: `A stroll through the streets and squares of the historic district. ${PENDING_EN}`,
    thumbnail: T.casco("en"),
    category: "cultura",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-10",
    status: "demo",
  },
  {
    translationKey: "video-canal",
    locale: "en",
    title: "The Panama Canal from the locks (video pending)",
    slug: "canal-from-the-locks",
    description: `A look at ships transiting the Canal, which connects the Atlantic and the Pacific. ${PENDING_EN}`,
    thumbnail: T.canal("en"),
    category: "ciudad",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-17",
    status: "demo",
  },
  {
    translationKey: "video-guna-yala",
    locale: "en",
    title: "Guna Yala landscapes (video pending)",
    slug: "guna-yala-landscapes",
    description: `Footage of the islands on Panama's Caribbean coast, to be filmed with the community's permission. ${PENDING_EN}`,
    thumbnail: T.gunaYala("en"),
    category: "naturaleza",
    location: "Guna Yala",
    publishedAt: "2026-09-24",
    status: "demo",
  },
  {
    translationKey: "video-guia-llegada",
    locale: "en",
    title: "Guide: questions before you move (video pending)",
    slug: "guide-questions-before-you-move",
    description: `A video summary of the questions worth preparing and checking with official sources. ${PENDING_EN}`,
    thumbnail: T.skyline("en"),
    category: "guia",
    location: "Panamá (nacional)",
    publishedAt: "2026-10-01",
    status: "demo",
  },
];
