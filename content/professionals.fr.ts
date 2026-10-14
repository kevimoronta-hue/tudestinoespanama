import type { Professional } from "@/types/content";

/**
 * DEMO directory listings — French versions of the `locale: "es"` items in
 * content/professionals.ts. All entries are fictitious placeholders that
 * illustrate the listing format. Never verified (`verifiedAt` intentionally omitted).
 */
export const professionalsFr: Professional[] = [
  {
    translationKey: "demo-legal",
    locale: "fr",
    name: "Cabinet juridique Exemple (démo)",
    slug: "cabinet-juridique-exemple-demo",
    category: "legal",
    location: "Ciudad de Panamá",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucun cabinet réel et n'a pas été vérifiée.",
    services: ["Orientation générale", "Coordination des documents", "Accueil en espagnol et en anglais"],
    email: "contacto@example.com",
    website: "https://example.com",
    sponsored: true,
    status: "demo",
  },
  {
    translationKey: "demo-inmobiliaria",
    locale: "fr",
    name: "Agence immobilière Exemple (démo)",
    slug: "agence-immobiliere-exemple-demo",
    category: "inmobiliaria",
    location: "Panamá Oeste",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucune entreprise réelle et n'a pas été vérifiée.",
    services: ["Orientation générale", "Accompagnement lors des visites", "Coordination des documents"],
    email: "inmobiliaria@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-contabilidad",
    locale: "fr",
    name: "Cabinet comptable Exemple (démo)",
    slug: "cabinet-comptable-exemple-demo",
    category: "contabilidad",
    location: "Ciudad de Panamá",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucun cabinet réel et n'a pas été vérifiée.",
    services: ["Orientation générale", "Organisation de la documentation comptable"],
    email: "contabilidad@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-reubicacion",
    locale: "fr",
    name: "Service de relocation Exemple (démo)",
    slug: "service-relocation-exemple-demo",
    category: "reubicacion",
    location: "Chiriquí",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucun service réel et n'a pas été vérifiée.",
    services: ["Orientation générale", "Aide à la recherche de logement", "Coordination des documents"],
    email: "reubicacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-salud",
    locale: "fr",
    name: "Centre de santé Exemple (démo)",
    slug: "centre-sante-exemple-demo",
    category: "salud",
    location: "Coclé",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucun centre réel et n'a pas été vérifiée.",
    services: ["Orientation générale", "Informations sur les rendez-vous"],
    email: "salud@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
  {
    translationKey: "demo-educacion",
    locale: "fr",
    name: "Établissement scolaire Exemple (démo)",
    slug: "etablissement-scolaire-exemple-demo",
    category: "educacion",
    location: "Bocas del Toro",
    description:
      "Fiche d'exemple illustrant le format d'une entrée de l'annuaire. Elle ne correspond à aucun établissement réel et n'a pas été vérifiée.",
    services: ["Orientation générale", "Informations pour les familles"],
    email: "educacion@example.com",
    website: "https://example.com",
    sponsored: false,
    status: "demo",
  },
];
