import type { ContentImage, VideoResource } from "@/types/content";

/**
 * Italian DEMO video placeholders — translation of the `locale: "es"` items in
 * content/videos.ts. No `videoUrl` until a real, licensed recording is supplied.
 */

function thumb(src: string, alt: string, credit: string): ContentImage {
  return { src, alt, width: 1600, height: 1000, credit };
}

const T = {
  casco: thumb(
    "/images/casco-antiguo-fachada.webp",
    "Facciata coloniale con balconi nel Casco Antiguo di Ciudad de Panamá",
    "David Broad, CC BY 3.0, via Wikimedia Commons",
  ),
  canal: thumb(
    "/images/canal-esclusas-miraflores.webp",
    "Due navi in transito nelle chiuse di Miraflores del Canale di Panamá",
    "U.S. Department of State, pubblico dominio, via Wikimedia Commons",
  ),
  gunaYala: thumb(
    "/images/guna-yala-isla.webp",
    "Piccola isola con palme e capanne a Guna Yala",
    "Ayaita, CC BY 3.0, via Wikimedia Commons",
  ),
  skyline: thumb(
    "/images/skyline-cinta-costera.webp",
    "Skyline di Ciudad de Panamá e la Cinta Costera",
    "dronepicr, CC BY 2.0, via Wikimedia Commons",
  ),
};

const PENDING_IT =
  "Video in programma. Sarà pubblicato quando sarà disponibile una registrazione con licenza d'uso.";

export const videosIt: VideoResource[] = [
  {
    translationKey: "video-casco-antiguo",
    locale: "it",
    title: "Passeggiata nel Casco Antiguo (video in arrivo)",
    slug: "passeggiata-casco-antiguo",
    description: `Una passeggiata tra le strade e le piazze del quartiere storico. ${PENDING_IT}`,
    thumbnail: T.casco,
    category: "cultura",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-10",
    status: "demo",
  },
  {
    translationKey: "video-canal",
    locale: "it",
    title: "Il Canale di Panamá visto dalle chiuse (video in arrivo)",
    slug: "canale-visto-dalle-chiuse",
    description: `Uno sguardo al passaggio delle navi nel Canale, che collega l'Atlantico al Pacifico. ${PENDING_IT}`,
    thumbnail: T.canal,
    category: "ciudad",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-17",
    status: "demo",
  },
  {
    translationKey: "video-guna-yala",
    locale: "it",
    title: "Paesaggi di Guna Yala (video in arrivo)",
    slug: "paesaggi-guna-yala",
    description: `Immagini delle isole dei Caraibi panamensi, che saranno girate con il permesso della comunità. ${PENDING_IT}`,
    thumbnail: T.gunaYala,
    category: "naturaleza",
    location: "Guna Yala",
    publishedAt: "2026-09-24",
    status: "demo",
  },
  {
    translationKey: "video-guia-llegada",
    locale: "it",
    title: "Guida: le domande prima di trasferirti (video in arrivo)",
    slug: "guida-domande-prima-di-trasferirti",
    description: `Una sintesi in video delle domande che conviene preparare e verificare con le fonti ufficiali. ${PENDING_IT}`,
    thumbnail: T.skyline,
    category: "guia",
    location: "Panamá (nazionale)",
    publishedAt: "2026-10-01",
    status: "demo",
  },
];
