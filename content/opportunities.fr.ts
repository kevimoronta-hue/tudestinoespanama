import type { Opportunity } from "@/types/content";

/**
 * DEMO opportunities — French versions of the `locale: "es"` items in
 * content/opportunities.ts. All entries are fictitious and only illustrate the
 * format (including the "expired" state via a past deadline).
 */
export const opportunitiesFr: Opportunity[] = [
  {
    translationKey: "demo-opportunity-1",
    locale: "fr",
    title: "Appel d'offres d'exemple (démo) : services de traduction",
    slug: "appel-offres-exemple-demo-traduction",
    category: "licitacion",
    location: "Ciudad de Panamá",
    description:
      "Entrée fictive illustrant l'affichage d'un appel d'offres dont la date limite est dépassée. Elle ne correspond à aucune procédure réelle.",
    organization: "Organisation d'exemple (démo)",
    sourceUrl: "https://example.org/demo-opportunity-1",
    publishedAt: "2026-02-10",
    deadline: "2026-03-31",
    contactMethod: "Formulaire sur la source (exemple)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-2",
    locale: "fr",
    title: "Appel à candidatures d'exemple (démo) : projets culturels",
    slug: "appel-candidatures-exemple-demo-projets-culturels",
    category: "convocatoria",
    location: "Panamá (national)",
    description:
      "Entrée fictive illustrant le format d'un appel à candidatures ouvert. Elle ne correspond à aucun appel réel.",
    organization: "Organisation d'exemple (démo)",
    sourceUrl: "https://example.org/demo-opportunity-2",
    publishedAt: "2026-09-01",
    deadline: "2027-02-15",
    contactMethod: "Formulaire sur la source (exemple)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-3",
    locale: "fr",
    title: "Programme d'exemple (démo) : accompagnement des entrepreneurs",
    slug: "programme-exemple-demo-entrepreneurs",
    category: "programa",
    location: "Chiriquí",
    description:
      "Entrée fictive illustrant le format d'un programme sans date limite définie. Elle ne correspond à aucun programme réel.",
    organization: "Organisation d'exemple (démo)",
    sourceUrl: "https://example.org/demo-opportunity-3",
    publishedAt: "2026-09-18",
    contactMethod: "Formulaire sur la source (exemple)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-4",
    locale: "fr",
    title: "Événement d'exemple (démo) : rencontre de networking",
    slug: "evenement-exemple-demo-networking",
    category: "evento",
    location: "Ciudad de Panamá",
    description:
      "Entrée fictive illustrant le format d'un événement avec date limite d'inscription. Elle ne correspond à aucun événement réel.",
    organization: "Organisation d'exemple (démo)",
    sourceUrl: "https://example.org/demo-opportunity-4",
    publishedAt: "2026-10-05",
    deadline: "2027-05-20",
    contactMethod: "Formulaire sur la source (exemple)",
    status: "demo",
  },
];
