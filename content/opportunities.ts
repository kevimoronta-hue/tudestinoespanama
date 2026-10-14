import type { Opportunity } from "@/types/content";

/**
 * DEMO opportunities. All entries are fictitious and only illustrate the
 * format (including the "expired" state via a past deadline).
 */
export const opportunities: Opportunity[] = [
  // ───────────── ES ─────────────
  {
    translationKey: "demo-opportunity-1",
    locale: "es",
    title: "Licitación de ejemplo (demo): servicios de traducción",
    slug: "licitacion-ejemplo-demo-traduccion",
    category: "licitacion",
    location: "Ciudad de Panamá",
    description:
      "Entrada ficticia que ilustra cómo se muestra una licitación con fecha límite vencida. No corresponde a ningún proceso real.",
    organization: "Organización de ejemplo (demo)",
    sourceUrl: "https://example.org/demo-opportunity-1",
    publishedAt: "2026-02-10",
    deadline: "2026-03-31",
    contactMethod: "Formulario en la fuente (ejemplo)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-2",
    locale: "es",
    title: "Convocatoria de ejemplo (demo): proyectos culturales",
    slug: "convocatoria-ejemplo-demo-proyectos-culturales",
    category: "convocatoria",
    location: "Panamá (nacional)",
    description:
      "Entrada ficticia que ilustra el formato de una convocatoria abierta. No corresponde a ninguna convocatoria real.",
    organization: "Organización de ejemplo (demo)",
    sourceUrl: "https://example.org/demo-opportunity-2",
    publishedAt: "2026-09-01",
    deadline: "2027-02-15",
    contactMethod: "Formulario en la fuente (ejemplo)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-3",
    locale: "es",
    title: "Programa de ejemplo (demo): acompañamiento a emprendedores",
    slug: "programa-ejemplo-demo-emprendedores",
    category: "programa",
    location: "Chiriquí",
    description:
      "Entrada ficticia que ilustra el formato de un programa sin fecha límite definida. No corresponde a ningún programa real.",
    organization: "Organización de ejemplo (demo)",
    sourceUrl: "https://example.org/demo-opportunity-3",
    publishedAt: "2026-09-18",
    contactMethod: "Formulario en la fuente (ejemplo)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-4",
    locale: "es",
    title: "Evento de ejemplo (demo): encuentro de networking",
    slug: "evento-ejemplo-demo-networking",
    category: "evento",
    location: "Ciudad de Panamá",
    description:
      "Entrada ficticia que ilustra el formato de un evento con fecha de inscripción. No corresponde a ningún evento real.",
    organization: "Organización de ejemplo (demo)",
    sourceUrl: "https://example.org/demo-opportunity-4",
    publishedAt: "2026-10-05",
    deadline: "2027-05-20",
    contactMethod: "Formulario en la fuente (ejemplo)",
    status: "demo",
  },

  // ───────────── EN ─────────────
  {
    translationKey: "demo-opportunity-1",
    locale: "en",
    title: "Example tender (demo): translation services",
    slug: "example-tender-demo-translation",
    category: "licitacion",
    location: "Ciudad de Panamá",
    description:
      "Fictitious entry illustrating how a tender with an expired deadline is displayed. It does not correspond to any real process.",
    organization: "Example organization (demo)",
    sourceUrl: "https://example.org/demo-opportunity-1",
    publishedAt: "2026-02-10",
    deadline: "2026-03-31",
    contactMethod: "Form at the source (example)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-2",
    locale: "en",
    title: "Example open call (demo): cultural projects",
    slug: "example-open-call-demo-cultural-projects",
    category: "convocatoria",
    location: "Panamá (nacional)",
    description:
      "Fictitious entry illustrating the format of an open call. It does not correspond to any real call.",
    organization: "Example organization (demo)",
    sourceUrl: "https://example.org/demo-opportunity-2",
    publishedAt: "2026-09-01",
    deadline: "2027-02-15",
    contactMethod: "Form at the source (example)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-3",
    locale: "en",
    title: "Example programme (demo): support for entrepreneurs",
    slug: "example-programme-demo-entrepreneurs",
    category: "programa",
    location: "Chiriquí",
    description:
      "Fictitious entry illustrating the format of a programme with no set deadline. It does not correspond to any real programme.",
    organization: "Example organization (demo)",
    sourceUrl: "https://example.org/demo-opportunity-3",
    publishedAt: "2026-09-18",
    contactMethod: "Form at the source (example)",
    status: "demo",
  },
  {
    translationKey: "demo-opportunity-4",
    locale: "en",
    title: "Example event (demo): networking meetup",
    slug: "example-event-demo-networking",
    category: "evento",
    location: "Ciudad de Panamá",
    description:
      "Fictitious entry illustrating the format of an event with a registration deadline. It does not correspond to any real event.",
    organization: "Example organization (demo)",
    sourceUrl: "https://example.org/demo-opportunity-4",
    publishedAt: "2026-10-05",
    deadline: "2027-05-20",
    contactMethod: "Form at the source (example)",
    status: "demo",
  },
];
