import type { Locale } from "@/types/content";
import { de } from "./de";
import { en } from "./en";
import { es, type Dictionary } from "./es";
import { fr } from "./fr";
import { it } from "./it";

export type { Dictionary };

/** One typed dictionary per locale — the only place UI copy lives. */
const dictionaries: Record<Locale, Dictionary> = { es, en, fr, de, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { t } from "@/lib/t";
