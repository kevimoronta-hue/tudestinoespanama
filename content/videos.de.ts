import type { ContentImage, VideoResource } from "@/types/content";

/**
 * German (de) DEMO video placeholders — translations of the `locale: "es"`
 * items in content/videos.ts. No `videoUrl` until a real, licensed recording
 * is supplied. Thumbnails reuse the licensed article images.
 */

function thumb(src: string, alt: string, credit: string): ContentImage {
  return { src, alt, width: 1600, height: 1000, credit };
}

const T = {
  casco: thumb(
    "/images/casco-antiguo-fachada.webp",
    "Koloniale Fassade mit Balkonen im Casco Antiguo von Panama-Stadt",
    "David Broad, CC BY 3.0, über Wikimedia Commons",
  ),
  canal: thumb(
    "/images/canal-esclusas-miraflores.webp",
    "Zwei Schiffe passieren die Miraflores-Schleusen des Panamakanals",
    "U.S. Department of State, gemeinfrei, über Wikimedia Commons",
  ),
  gunaYala: thumb(
    "/images/guna-yala-isla.webp",
    "Kleine Insel mit Palmen und Hütten in Guna Yala",
    "Ayaita, CC BY 3.0, über Wikimedia Commons",
  ),
  skyline: thumb(
    "/images/skyline-cinta-costera.webp",
    "Skyline von Panama-Stadt und die Cinta Costera",
    "dronepicr, CC BY 2.0, über Wikimedia Commons",
  ),
};

const PENDING_DE =
  "Geplantes Video. Es wird veröffentlicht, sobald eine Aufnahme mit Nutzungslizenz verfügbar ist.";

export const videosDe: VideoResource[] = [
  {
    translationKey: "video-casco-antiguo",
    locale: "de",
    title: "Rundgang durch den Casco Antiguo (Video folgt)",
    slug: "rundgang-casco-antiguo",
    description: `Ein Spaziergang durch die Gassen und über die Plätze des historischen Viertels. ${PENDING_DE}`,
    thumbnail: T.casco,
    category: "cultura",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-10",
    status: "demo",
  },
  {
    translationKey: "video-canal",
    locale: "de",
    title: "Der Panamakanal von den Schleusen aus (Video folgt)",
    slug: "panamakanal-von-den-schleusen",
    description: `Ein Blick auf die Schiffe, die den Kanal passieren, der den Atlantik mit dem Pazifik verbindet. ${PENDING_DE}`,
    thumbnail: T.canal,
    category: "ciudad",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-17",
    status: "demo",
  },
  {
    translationKey: "video-guna-yala",
    locale: "de",
    title: "Landschaften von Guna Yala (Video folgt)",
    slug: "landschaften-guna-yala",
    description: `Bilder der Inseln an Panamas Karibikküste, die mit Erlaubnis der Gemeinschaft gefilmt werden. ${PENDING_DE}`,
    thumbnail: T.gunaYala,
    category: "naturaleza",
    location: "Guna Yala",
    publishedAt: "2026-09-24",
    status: "demo",
  },
  {
    translationKey: "video-guia-llegada",
    locale: "de",
    title: "Ratgeber: Fragen vor dem Umzug (Video folgt)",
    slug: "ratgeber-fragen-vor-dem-umzug",
    description: `Eine Videozusammenfassung der Fragen, die Sie vorbereiten und bei offiziellen Quellen prüfen sollten. ${PENDING_DE}`,
    thumbnail: T.skyline,
    category: "guia",
    location: "Panamá (landesweit)",
    publishedAt: "2026-10-01",
    status: "demo",
  },
];
