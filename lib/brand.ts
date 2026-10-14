import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Light (white) logo variant for dark/photographic backgrounds — header over the hero
 * and footer. Drop the client-supplied file into public/brand/ with one of these names
 * and it is picked up at build time; no code change needed.
 */
const LIGHT_LOGO_CANDIDATES = ["logo-light.svg", "logo-light.webp", "logo-light.png"];

export function lightLogoSrc(): string | null {
  const file = LIGHT_LOGO_CANDIDATES.find((f) => existsSync(path.join(process.cwd(), "public", "brand", f)));
  return file ? `/brand/${file}` : null;
}
