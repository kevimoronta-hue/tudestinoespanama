import type { Dictionary } from "@/lib/dictionaries";

/** Localized licence label ("Public domain" is translated, CC licences are not). */
export function licenseLabel(license: string, dict: Dictionary): string {
  return /public domain/i.test(license) ? dict.footer.publicDomain : license;
}
