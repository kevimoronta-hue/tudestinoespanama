import type { Opportunity } from "@/types/content";

/**
 * Italian DEMO opportunities — translation of the `locale: "es"` items in
 * content/opportunities.ts. All entries are fictitious and only illustrate the format.
 */
export const opportunitiesIt: Opportunity[] = [
  {
    translationKey: "demo-opportunity-1",
    locale: "it",
    title: "Gara d'appalto di esempio (demo): servizi di traduzione",
    slug: "gara-appalto-esempio-demo-traduzione",
    category: "licitacion",
    location: "Ciudad de Panamá",
    description:
      "Voce fittizia che illustra come viene mostrata una gara d'appalto con scadenza superata. Non corrisponde a nessuna procedura reale.",
    organization: "Organizzazione di esempio (demo)",
    sourceUrl: "https://example.org/demo-opportunity-1",
    publishedAt: "2026-02-10",
    deadline: "2026-03-31",
    contactMethod: "Modulo presso la fonte (esempio)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-2",
    locale: "it",
    title: "Bando di esempio (demo): progetti culturali",
    slug: "bando-esempio-demo-progetti-culturali",
    category: "convocatoria",
    location: "Panamá (nazionale)",
    description:
      "Voce fittizia che illustra il formato di un bando aperto. Non corrisponde a nessun bando reale.",
    organization: "Organizzazione di esempio (demo)",
    sourceUrl: "https://example.org/demo-opportunity-2",
    publishedAt: "2026-09-01",
    deadline: "2027-02-15",
    contactMethod: "Modulo presso la fonte (esempio)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-3",
    locale: "it",
    title: "Programma di esempio (demo): accompagnamento per imprenditori",
    slug: "programma-esempio-demo-imprenditori",
    category: "programa",
    location: "Chiriquí",
    description:
      "Voce fittizia che illustra il formato di un programma senza una scadenza definita. Non corrisponde a nessun programma reale.",
    organization: "Organizzazione di esempio (demo)",
    sourceUrl: "https://example.org/demo-opportunity-3",
    publishedAt: "2026-09-18",
    contactMethod: "Modulo presso la fonte (esempio)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-4",
    locale: "it",
    title: "Evento di esempio (demo): incontro di networking",
    slug: "evento-esempio-demo-networking",
    category: "evento",
    location: "Ciudad de Panamá",
    description:
      "Voce fittizia che illustra il formato di un evento con una data di iscrizione. Non corrisponde a nessun evento reale.",
    organization: "Organizzazione di esempio (demo)",
    sourceUrl: "https://example.org/demo-opportunity-4",
    publishedAt: "2026-10-05",
    deadline: "2027-05-20",
    contactMethod: "Modulo presso la fonte (esempio)",
    status: "demo",
  },
];
