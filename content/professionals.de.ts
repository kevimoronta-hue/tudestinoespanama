import type { Professional } from "@/types/content";

/**
 * German (de) DEMO directory listings — translations of the `locale: "es"`
 * items in content/professionals.ts. All entries are fictitious placeholders,
 * example.com contacts only, never verified (`verifiedAt` intentionally omitted).
 */
export const professionalsDe: Professional[] = [
  {
    translationKey: "demo-legal",
    locale: "de",
    name: "Beispiel-Anwaltskanzlei (Demo)",
    slug: "beispiel-anwaltskanzlei-demo",
    category: "legal",
    location: "Ciudad de Panamá",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keiner realen Kanzlei und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Koordination von Dokumenten", "Betreuung auf Spanisch und Englisch"],
    email: "contacto@example.com",
    website: "https://example.com",
    sponsored: true,
    status: "demo",
  },
  {
    translationKey: "demo-inmobiliaria",
    locale: "de",
    name: "Beispiel-Immobilienagentur (Demo)",
    slug: "beispiel-immobilienagentur-demo",
    category: "inmobiliaria",
    location: "Panamá Oeste",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keinem realen Unternehmen und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Begleitung bei Besichtigungen", "Koordination von Dokumenten"],
    email: "inmobiliaria@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-contabilidad",
    locale: "de",
    name: "Beispiel-Steuerbüro (Demo)",
    slug: "beispiel-steuerbuero-demo",
    category: "contabilidad",
    location: "Ciudad de Panamá",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keinem realen Büro und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Ordnung der Buchhaltungsunterlagen"],
    email: "contabilidad@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-reubicacion",
    locale: "de",
    name: "Beispiel-Umzugsservice (Demo)",
    slug: "beispiel-umzugsservice-demo",
    category: "reubicacion",
    location: "Chiriquí",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keinem realen Dienst und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Unterstützung bei der Wohnungssuche", "Koordination von Dokumenten"],
    email: "reubicacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-salud",
    locale: "de",
    name: "Beispiel-Gesundheitszentrum (Demo)",
    slug: "beispiel-gesundheitszentrum-demo",
    category: "salud",
    location: "Coclé",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keinem realen Zentrum und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Informationen zu Terminen"],
    email: "salud@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-educacion",
    locale: "de",
    name: "Beispiel-Bildungszentrum (Demo)",
    slug: "beispiel-bildungszentrum-demo",
    category: "educacion",
    location: "Bocas del Toro",
    description:
      "Beispieleintrag, der das Format eines Verzeichniseintrags veranschaulicht. Er entspricht keiner realen Einrichtung und wurde nicht geprüft.",
    services: ["Allgemeine Orientierung", "Informationen für Familien"],
    email: "educacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
];
