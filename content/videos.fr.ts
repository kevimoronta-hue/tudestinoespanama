import type { ContentImage, VideoResource } from "@/types/content";

/**
 * DEMO video placeholders — French versions of the `locale: "es"` items in
 * content/videos.ts. No `videoUrl` until a real, licensed recording is supplied.
 */

function thumb(src: string, alt: string): ContentImage {
  return { src, alt, width: 2560, height: 1600 };
}

const T = {
  casco: thumb(
    "/images/casco-antiguo-fachada.webp",
    "Façade coloniale à balcons dans le Casco Antiguo de la ville de Panama",
  ),
  canal: thumb(
    "/images/canal-esclusas-miraflores.webp",
    "Porte-conteneurs franchissant les écluses de Miraflores du canal de Panama",
  ),
  gunaYala: thumb(
    "/images/guna-yala-isla.webp",
    "Plage de sable blanc bordée de palmiers dans les îles de Guna Yala (San Blas)",
  ),
  skyline: thumb(
    "/images/skyline-cinta-costera.webp",
    "Silhouette de la ville de Panama et la Cinta Costera",
  ),
};

const PENDING_FR =
  "Vidéo prévue. Elle sera publiée dès qu'un enregistrement assorti d'une licence d'utilisation sera disponible.";

export const videosFr: VideoResource[] = [
  {
    translationKey: "video-casco-antiguo",
    locale: "fr",
    title: "Balade dans le Casco Antiguo (vidéo à venir)",
    slug: "balade-casco-antiguo",
    description: `Promenade à travers les rues et les places du quartier historique. ${PENDING_FR}`,
    thumbnail: T.casco,
    category: "cultura",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-10",
    status: "demo",
  },
  {
    translationKey: "video-canal",
    locale: "fr",
    title: "Le canal de Panama vu depuis les écluses (vidéo à venir)",
    slug: "canal-depuis-les-ecluses",
    description: `Regard sur le passage des navires dans le Canal, qui relie l'Atlantique au Pacifique. ${PENDING_FR}`,
    thumbnail: T.canal,
    category: "ciudad",
    location: "Ciudad de Panamá",
    publishedAt: "2026-09-17",
    status: "demo",
  },
  {
    translationKey: "video-guna-yala",
    locale: "fr",
    title: "Paysages de Guna Yala (vidéo à venir)",
    slug: "paysages-guna-yala",
    description: `Images des îles des Caraïbes panaméennes, qui seront tournées avec l'autorisation de la communauté. ${PENDING_FR}`,
    thumbnail: T.gunaYala,
    category: "naturaleza",
    location: "Guna Yala",
    publishedAt: "2026-09-24",
    status: "demo",
  },
  {
    translationKey: "video-guia-llegada",
    locale: "fr",
    title: "Guide : les questions avant de vous installer (vidéo à venir)",
    slug: "guide-questions-avant-installation",
    description: `Résumé en vidéo des questions qu'il convient de préparer et de vérifier auprès des sources officielles. ${PENDING_FR}`,
    thumbnail: T.skyline,
    category: "guia",
    location: "Panamá (national)",
    publishedAt: "2026-10-01",
    status: "demo",
  },
];
