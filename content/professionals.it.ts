import type { Professional } from "@/types/content";

/**
 * Italian DEMO directory listings — translation of the `locale: "es"` items in
 * content/professionals.ts. All entries are fictitious placeholders, never verified.
 */
export const professionalsIt: Professional[] = [
  {
    translationKey: "demo-legal",
    locale: "it",
    name: "Studio legale Esempio (demo)",
    slug: "studio-legale-esempio-demo",
    category: "legal",
    location: "Ciudad de Panamá",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessuno studio reale e non è stata verificata.",
    services: ["Orientamento generale", "Coordinamento dei documenti", "Assistenza in spagnolo e inglese"],
    email: "contacto@example.com",
    website: "https://example.com",
    sponsored: true,
    status: "demo",
  },
  {
    translationKey: "demo-inmobiliaria",
    locale: "it",
    name: "Agenzia immobiliare Esempio (demo)",
    slug: "agenzia-immobiliare-esempio-demo",
    category: "inmobiliaria",
    location: "Panamá Oeste",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessuna azienda reale e non è stata verificata.",
    services: ["Orientamento generale", "Accompagnamento alle visite", "Coordinamento dei documenti"],
    email: "inmobiliaria@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-contabilidad",
    locale: "it",
    name: "Studio contabile Esempio (demo)",
    slug: "studio-contabile-esempio-demo",
    category: "contabilidad",
    location: "Ciudad de Panamá",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessuno studio reale e non è stata verificata.",
    services: ["Orientamento generale", "Organizzazione della documentazione contabile"],
    email: "contabilidad@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-reubicacion",
    locale: "it",
    name: "Servizio di trasferimento Esempio (demo)",
    slug: "servizio-trasferimento-esempio-demo",
    category: "reubicacion",
    location: "Chiriquí",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessun servizio reale e non è stata verificata.",
    services: ["Orientamento generale", "Supporto nella ricerca della casa", "Coordinamento dei documenti"],
    email: "reubicacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-salud",
    locale: "it",
    name: "Centro medico Esempio (demo)",
    slug: "centro-medico-esempio-demo",
    category: "salud",
    location: "Coclé",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessun centro reale e non è stata verificata.",
    services: ["Orientamento generale", "Informazioni sugli appuntamenti"],
    email: "salud@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-educacion",
    locale: "it",
    name: "Istituto scolastico Esempio (demo)",
    slug: "istituto-scolastico-esempio-demo",
    category: "educacion",
    location: "Bocas del Toro",
    description:
      "Scheda di esempio che illustra il formato di una voce della directory. Non corrisponde a nessun istituto reale e non è stata verificata.",
    services: ["Orientamento generale", "Informazioni per le famiglie"],
    email: "educacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
];
