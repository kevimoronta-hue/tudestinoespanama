import Image from "next/image";

/**
 * Official logo. Master file: public/brand/tu-destino-es-panama-logo.svg (a 1564×468 PNG
 * wrapped in SVG). The UI serves 1:1 WebP exports of it (same pixels and ratio).
 *
 * `variant="light"` is for dark/photographic backgrounds. It uses the client's white
 * logo (public/brand/logo-light.*, see lib/brand.ts) when present. Until that asset is
 * delivered, the colour logo is shown without any plate — temporary, low contrast.
 */
const RATIO = 1564 / 468;

interface Props {
  height?: number;
  priority?: boolean;
  alt: string;
  variant?: "color" | "light";
  lightSrc?: string | null;
}

export function Logo({ height = 44, priority = false, alt, variant = "color", lightSrc }: Props) {
  const width = Math.round(height * RATIO);
  const useLight = variant === "light" && lightSrc;
  return (
    <Image
      src={useLight ? lightSrc : "/brand/logo-480.webp"}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      sizes={`${width}px`}
      className={`block h-auto max-w-none select-none ${
        variant === "light" && !useLight ? "[filter:drop-shadow(0_1px_12px_rgb(255_255_255/0.28))]" : ""
      }`}
      style={{ width, height }}
      draggable={false}
      unoptimized
    />
  );
}
