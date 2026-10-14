import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tu Destino es Panamá",
    short_name: "Destino Panamá",
    description: "Información, orientación y conexiones útiles para descubrir Panamá.",
    start_url: "/es",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#071C38",
    lang: "es",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
