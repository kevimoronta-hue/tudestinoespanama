import type { Opportunity } from "@/types/content";

/**
 * German (de) DEMO opportunities — translations of the `locale: "es"` items in
 * content/opportunities.ts. All entries are fictitious and only illustrate the
 * format (including the "expired" state via a past deadline).
 */
export const opportunitiesDe: Opportunity[] = [
  {
    translationKey: "demo-opportunity-1",
    locale: "de",
    title: "Beispiel-Ausschreibung (Demo): Übersetzungsdienstleistungen",
    slug: "beispiel-ausschreibung-demo-uebersetzung",
    category: "licitacion",
    location: "Ciudad de Panamá",
    description:
      "Fiktiver Eintrag, der zeigt, wie eine Ausschreibung mit abgelaufener Frist dargestellt wird. Er entspricht keinem realen Verfahren.",
    organization: "Beispielorganisation (Demo)",
    sourceUrl: "https://example.org/demo-opportunity-1",
    publishedAt: "2026-02-10",
    deadline: "2026-03-31",
    contactMethod: "Formular bei der Quelle (Beispiel)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-2",
    locale: "de",
    title: "Beispiel-Aufruf (Demo): Kulturprojekte",
    slug: "beispiel-aufruf-demo-kulturprojekte",
    category: "convocatoria",
    location: "Panamá (landesweit)",
    description:
      "Fiktiver Eintrag, der das Format eines offenen Aufrufs veranschaulicht. Er entspricht keinem realen Aufruf.",
    organization: "Beispielorganisation (Demo)",
    sourceUrl: "https://example.org/demo-opportunity-2",
    publishedAt: "2026-09-01",
    deadline: "2027-02-15",
    contactMethod: "Formular bei der Quelle (Beispiel)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-3",
    locale: "de",
    title: "Beispielprogramm (Demo): Begleitung für Gründerinnen und Gründer",
    slug: "beispielprogramm-demo-gruender",
    category: "programa",
    location: "Chiriquí",
    description:
      "Fiktiver Eintrag, der das Format eines Programms ohne festgelegte Frist veranschaulicht. Er entspricht keinem realen Programm.",
    organization: "Beispielorganisation (Demo)",
    sourceUrl: "https://example.org/demo-opportunity-3",
    publishedAt: "2026-09-18",
    contactMethod: "Formular bei der Quelle (Beispiel)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-4",
    locale: "de",
    title: "Beispielveranstaltung (Demo): Networking-Treffen",
    slug: "beispielveranstaltung-demo-networking",
    category: "evento",
    location: "Ciudad de Panamá",
    description:
      "Fiktiver Eintrag, der das Format einer Veranstaltung mit Anmeldefrist veranschaulicht. Er entspricht keiner realen Veranstaltung.",
    organization: "Beispielorganisation (Demo)",
    sourceUrl: "https://example.org/demo-opportunity-4",
    publishedAt: "2026-10-05",
    deadline: "2027-05-20",
    contactMethod: "Formular bei der Quelle (Beispiel)",
    status: "demo",
  },
];
