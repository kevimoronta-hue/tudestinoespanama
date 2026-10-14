import type { Locale } from "@/types/content";

/**
 * Minimal copy for the client-side 404 and error boundaries, which cannot load the
 * full dictionaries. Keep in sync with `notFound` / `listing.error*` in each dictionary.
 */
export const systemCopy: Record<
  Locale,
  { notFoundTitle: string; notFoundText: string; home: string; explore: string; errorTitle: string; errorText: string; retry: string }
> = {
  es: {
    notFoundTitle: "Página no encontrada",
    notFoundText: "La página que buscas no existe o ha cambiado de dirección.",
    home: "Volver al inicio",
    explore: "Ir a Explora",
    errorTitle: "No se pudo cargar esta sección",
    errorText: "Ocurrió un error inesperado. Intenta de nuevo en unos instantes.",
    retry: "Reintentar",
  },
  en: {
    notFoundTitle: "Page not found",
    notFoundText: "The page you are looking for does not exist or has moved.",
    home: "Back to home",
    explore: "Go to Explore",
    errorTitle: "This section could not be loaded",
    errorText: "An unexpected error occurred. Please try again in a moment.",
    retry: "Try again",
  },
  fr: {
    notFoundTitle: "Page introuvable",
    notFoundText: "La page que vous cherchez n’existe pas ou a changé d’adresse.",
    home: "Retour à l’accueil",
    explore: "Aller à Explorer",
    errorTitle: "Cette section n’a pas pu être chargée",
    errorText: "Une erreur inattendue s’est produite. Réessayez dans quelques instants.",
    retry: "Réessayer",
  },
  de: {
    notFoundTitle: "Seite nicht gefunden",
    notFoundText: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    home: "Zur Startseite",
    explore: "Zu „Erkunden“",
    errorTitle: "Dieser Bereich konnte nicht geladen werden",
    errorText: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es gleich noch einmal.",
    retry: "Erneut versuchen",
  },
  it: {
    notFoundTitle: "Pagina non trovata",
    notFoundText: "La pagina che cerchi non esiste o è stata spostata.",
    home: "Torna alla home",
    explore: "Vai a Esplora",
    errorTitle: "Impossibile caricare questa sezione",
    errorText: "Si è verificato un errore imprevisto. Riprova tra qualche istante.",
    retry: "Riprova",
  },
};
