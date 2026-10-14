import type { Article, ContentImage, Source } from "@/types/content";

/**
 * German (de) DEMO editorial content — translations of the `locale: "es"`
 * items in content/articles.ts. Every item is `status: "demo"`.
 * Facts, sources, dates and images are kept identical to the Spanish source.
 */

const CONSULTED = "2026-10-14";
const AUTHOR = "Redaktionsteam Tu Destino es Panamá";

const SRC = {
  canal: {
    label: "Autoridad del Canal de Panamá",
    url: "https://pancanal.com",
    publisher: "Autoridad del Canal de Panamá",
    consultedAt: CONSULTED,
    official: true,
  },
  migracion: {
    label: "Servicio Nacional de Migración",
    url: "https://www.migracion.gob.pa",
    publisher: "Servicio Nacional de Migración",
    consultedAt: CONSULTED,
    official: true,
  },
  minsa: {
    label: "Ministerio de Salud (MINSA)",
    url: "https://www.minsa.gob.pa",
    publisher: "Ministerio de Salud de Panamá",
    consultedAt: CONSULTED,
    official: true,
  },
  inec: {
    label: "Instituto Nacional de Estadística y Censo (INEC)",
    url: "https://www.inec.gob.pa",
    publisher: "Instituto Nacional de Estadística y Censo",
    consultedAt: CONSULTED,
    official: true,
  },
  promtur: {
    label: "Visit Panama (Promtur Panamá)",
    url: "https://www.visitpanama.com",
    publisher: "Promtur Panamá",
    consultedAt: CONSULTED,
    official: true,
  },
  mici: {
    label: "Ministerio de Comercio e Industrias (MICI)",
    url: "https://www.mici.gob.pa",
    publisher: "Ministerio de Comercio e Industrias",
    consultedAt: CONSULTED,
    official: true,
  },
  attt: {
    label: "Autoridad de Tránsito y Transporte Terrestre (ATTT)",
    url: "https://www.transito.gob.pa",
    publisher: "Autoridad de Tránsito y Transporte Terrestre",
    consultedAt: CONSULTED,
    official: true,
  },
  unesco: {
    label: "Patrimonio Mundial UNESCO",
    url: "https://whc.unesco.org",
    publisher: "UNESCO",
    consultedAt: CONSULTED,
    official: true,
  },
} satisfies Record<string, Source>;

type ImageKey = "bahia" | "canal" | "casco" | "skyline" | "gunaYala";

const IMAGES: Record<ImageKey, { src: string; alt: string }> = {
  bahia: {
    src: "/images/panama-city-bahia-aerea.webp",
    alt: "Luftaufnahme des Finanzviertels von Panama-Stadt und der Bucht bei Sonnenuntergang",
  },
  canal: {
    src: "/images/canal-esclusas-miraflores.webp",
    alt: "Containerschiff in den Miraflores-Schleusen des Panamakanals",
  },
  casco: {
    src: "/images/casco-antiguo-fachada.webp",
    alt: "Koloniale Fassade mit Balkonen im Casco Antiguo von Panama-Stadt",
  },
  skyline: {
    src: "/images/skyline-cinta-costera.webp",
    alt: "Skyline von Panama-Stadt und die Cinta Costera",
  },
  gunaYala: {
    src: "/images/guna-yala-isla.webp",
    alt: "Weißer Sandstrand mit Palmen auf den Inseln von Guna Yala (San Blas)",
  },
};

function cover(key: ImageKey): ContentImage {
  const img = IMAGES[key];
  return { src: img.src, alt: img.alt, width: 2560, height: 1600 };
}

export const articlesDe: Article[] = [
  // ───────────────────────── DESCUBRE ─────────────────────────
  {
    translationKey: "regiones-de-panama",
    locale: "de",
    title: "Die Regionen Panamas: ein erster Überblick",
    slug: "regionen-von-panama",
    excerpt:
      "Panama gliedert sich in Provinzen und indigene Comarcas. Eine Einführung, die Ihnen hilft, sich zu orientieren, bevor Sie entscheiden, was Sie zuerst entdecken möchten.",
    body: [
      {
        type: "p",
        text: "Panama ist ein Land der Kontraste auf schmalem Raum, mit Küsten am Karibischen Meer und am Pazifischen Ozean. Wer versteht, wie das Staatsgebiet gegliedert ist, hat einen guten Ausgangspunkt, um eine Reise oder ein Vorhaben zu planen.",
      },
      { type: "h2", text: "Provinzen und indigene Comarcas" },
      {
        type: "p",
        text: "Das Land gliedert sich in Provinzen und indigene Comarcas. Comarcas sind Gebiete mit eigenen Organisationsformen, die mit den dort lebenden indigenen Völkern verbunden sind.",
      },
      {
        type: "ul",
        items: [
          "Städtische Räume wie Panama-Stadt mit ihrem Geschäfts- und Kulturleben.",
          "Hochländer und Täler im Landesinneren.",
          "Küsten an der Karibik und am Pazifik, mit Inseln und Archipelen.",
        ],
      },
      {
        type: "p",
        text: "Der Panamakanal, der den Atlantik mit dem Pazifik verbindet, durchquert die Landenge und ist ein unverzichtbarer Bezugspunkt, um die Geografie des Landes zu verstehen.",
      },
      {
        type: "note",
        text: "Offizielle Daten zur territorialen Gliederung und zur Bevölkerung finden Sie in den aktuellen Veröffentlichungen des Instituto Nacional de Estadística y Censo.",
      },
    ],
    section: "descubre",
    category: "regiones",
    location: "Panamá (landesweit)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTime: 4,
    seoTitle: "Regionen Panamas: Provinzen und indigene Comarcas",
    seoDescription:
      "Eine Einführung in die Gliederung Panamas: Provinzen, indigene Comarcas und zwei Küsten.",
    status: "demo",
  },
  {
    translationKey: "casco-antiguo",
    locale: "de",
    title: "Casco Antiguo: das historische Viertel von Panama-Stadt",
    slug: "casco-antiguo-kulturerbe",
    excerpt:
      "Gassen, Plätze und Balkone, die einen Teil der Stadtgeschichte erzählen. Tipps, um das Viertel in Ruhe und mit Respekt zu erkunden.",
    body: [
      {
        type: "p",
        text: "Der Casco Antiguo, auch Casco Viejo genannt, ist das historische Viertel von Panama-Stadt. Seine Fassaden mit Balkonen, seine Kirchen und Plätze laden dazu ein, ihn zu Fuß und ohne Eile zu erkunden.",
      },
      { type: "h2", text: "Ein lebendiges Viertel" },
      {
        type: "p",
        text: "Über seinen historischen Wert hinaus ist der Casco Antiguo ein Viertel, in dem Menschen leben und arbeiten. Ihn mit Rücksicht auf seine Bewohnerinnen und Bewohner zu erkunden, gehört zum Erlebnis dazu.",
      },
      {
        type: "ul",
        items: [
          "Spazieren Sie früh am Morgen oder am späten Nachmittag, um die Plätze zu genießen.",
          "Achten Sie auf die Architektur: Balkone, Innenhöfe und Details der Fassaden.",
          "Respektieren Sie private Bereiche und die Regeln religiöser Stätten.",
        ],
      },
      {
        type: "note",
        text: "Informationen zur Anerkennung als Kulturerbe und die offizielle Beschreibung der Stätte finden Sie direkt auf dem Welterbe-Portal der UNESCO.",
      },
    ],
    section: "descubre",
    category: "cultura",
    location: "Ciudad de Panamá",
    coverImage: cover("casco"),
    author: AUTHOR,
    sources: [SRC.unesco],
    sensitive: false,
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-20",
    readingTime: 4,
    seoTitle: "Casco Antiguo in Panama: Geschichte und Kulturerbe",
    seoDescription:
      "Entdecken Sie den Casco Antiguo, die Altstadt von Panama-Stadt: Architektur, Plätze und Tipps für einen respektvollen Besuch.",
    status: "demo",
  },
  {
    translationKey: "naturaleza-dos-costas",
    locale: "de",
    title: "Natur zwischen zwei Küsten: Regenwald, Pazifik und Karibik",
    slug: "natur-zwischen-zwei-kuesten",
    excerpt:
      "Tropenwälder, Strände und Meereslandschaften in einem einzigen Land. Ideen, um Panamas Natur verantwortungsvoll zu erleben.",
    body: [
      {
        type: "p",
        text: "Panama hat Küsten am Pazifischen Ozean und am Karibischen Meer, und ein großer Teil seines Gebiets ist von tropischem Wald bedeckt. Diese Kombination lässt auf vergleichsweise kurzen Distanzen sehr unterschiedliche Landschaften entstehen.",
      },
      { type: "h2", text: "Zwei Küsten, zwei Welten" },
      {
        type: "p",
        text: "Pazifik und Karibik bieten unterschiedliche Erlebnisse: Landschaft, lokales Klima und der Alltag der Küstengemeinden verändern sich. Es lohnt sich, sich über jede Gegend zu informieren, bevor Sie Ihr Reiseziel wählen.",
      },
      { type: "h2", text: "Den Regenwald verantwortungsvoll besuchen" },
      {
        type: "ul",
        items: [
          "Informieren Sie sich über Schutzgebiete und ihre Besucherregeln.",
          "Erwägen Sie, Wanderwege mit lokalen Guides zu erkunden.",
          "Entnehmen Sie keine Pflanzen oder Tiere und nehmen Sie Ihren Abfall wieder mit.",
        ],
      },
      {
        type: "note",
        text: "Die Zugangsbedingungen für Parks und Schutzgebiete können sich ändern. Informieren Sie sich vor Ihrem Besuch anhand offizieller und aktueller Angaben.",
      },
    ],
    section: "descubre",
    category: "naturaleza",
    location: "Panamá (landesweit)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingTime: 5,
    seoTitle: "Natur in Panama: Regenwald, Pazifik und Karibik",
    seoDescription:
      "Tropenwald und zwei Küsten, Pazifik und Karibik: Ideen, um die Natur Panamas verantwortungsvoll zu entdecken.",
    status: "demo",
  },
  {
    translationKey: "guna-yala",
    locale: "de",
    title: "Guna Yala: Karibikinseln und die Kultur der Guna",
    slug: "guna-yala-inseln",
    excerpt:
      "Die Comarca Guna Yala und ihre Inseln, auch bekannt als San Blas. So planen Sie einen Besuch, der die Gemeinschaft respektiert.",
    body: [
      {
        type: "p",
        text: "Guna Yala ist eine indigene Comarca an der Karibikküste Panamas, in der das Volk der Guna lebt. Ihre Inseln, auch als San-Blas-Archipel bekannt, gehören zu den bekanntesten Landschaften des Landes.",
      },
      { type: "h2", text: "Ein Gebiet mit eigener Organisation" },
      {
        type: "p",
        text: "Wer Guna Yala besucht, betritt ein Gebiet mit eigenen Autoritäten und Regeln. Das Erlebnis ist umso wertvoller, wenn es mit Respekt vor der Kultur und den Entscheidungen der Gemeinschaft geplant wird.",
      },
      {
        type: "ul",
        items: [
          "Informieren Sie sich rechtzeitig über die aktuell geltenden Zugangsbedingungen.",
          "Bevorzugen Sie Angebote, die von der Gemeinschaft selbst bereitgestellt werden.",
          "Fragen Sie um Erlaubnis, bevor Sie Menschen fotografieren.",
          "Vermeiden Sie Abfall: Die Inseln sind empfindliche Ökosysteme.",
        ],
      },
      {
        type: "note",
        text: "Die Besuchsbedingungen können sich ändern. Prüfen Sie die Informationen vor der Reise bei offiziellen Quellen und autorisierten Anbietern.",
      },
    ],
    section: "descubre",
    category: "destinos",
    location: "Guna Yala",
    coverImage: cover("gunaYala"),
    author: AUTHOR,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    readingTime: 5,
    seoTitle: "Guna Yala (San Blas): Inseln und Kultur der Guna",
    seoDescription:
      "Guna Yala, indigene Comarca an Panamas Karibikküste: So planen Sie einen Besuch der Inseln mit Respekt vor den Guna.",
    status: "demo",
  },

  // ───────────────────────── VIVIR ─────────────────────────
  {
    translationKey: "primeros-pasos",
    locale: "de",
    title: "Erste Schritte für den Umzug nach Panama: Fragen, die Sie vorbereiten sollten",
    slug: "erste-schritte-umzug-panama",
    excerpt:
      "Bevor Sie einen Umzug planen, sollten Sie Ihre Fragen ordnen und herausfinden, welche Institutionen für Ihren Fall zuständig sind.",
    body: [
      {
        type: "p",
        text: "Ein Umzug in ein anderes Land bringt persönliche, familiäre und administrative Entscheidungen mit sich. Dieser Ratgeber beschreibt weder Verfahren noch Voraussetzungen: Er hilft Ihnen, die richtigen Fragen vorzubereiten, um sie bei den offiziellen Quellen zu klären.",
      },
      { type: "h2", text: "Ermitteln Sie die zuständige Institution" },
      {
        type: "p",
        text: "Bevor Sie planen, finden Sie heraus, welche Institution für Ihre Situation zuständig ist, und prüfen Sie deren aktuell gültige Informationen. In Migrationsfragen ist der Servicio Nacional de Migración die maßgebliche Stelle.",
      },
      { type: "h2", text: "Fragen zur Vorbereitung" },
      {
        type: "ul",
        items: [
          "Was ist der Zweck meines Aufenthalts, und welche Institution ist für diesen Fall zuständig?",
          "Welche Dokumente aus meinem Herkunftsland könnten verlangt werden, und wie werden sie beglaubigt?",
          "Benötige ich für meine konkrete Situation eine unabhängige professionelle Beratung?",
          "Wo kann ich überprüfen, ob die Informationen, die ich lese, aktuell sind?",
        ],
      },
      {
        type: "note",
        text: "Bedingungen und Vorschriften ändern sich. Dieser Inhalt dient der Orientierung und stellt keine Rechts- oder Migrationsberatung dar. Prüfen Sie stets bei der offiziellen Institution und, falls nötig, bei einer zugelassenen Fachperson.",
      },
    ],
    section: "vivir",
    category: "primeros-pasos",
    location: "Panamá (landesweit)",
    coverImage: cover("skyline"),
    author: AUTHOR,
    sources: [SRC.migracion, SRC.minsa],
    sensitive: true,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-15",
    readingTime: 6,
    seoTitle: "Umzug nach Panama: Fragen vor dem Start",
    seoDescription:
      "Welche Fragen Sie vorbereiten und welche offiziellen Institutionen Sie vor der Planung eines Umzugs nach Panama konsultieren sollten.",
    status: "demo",
  },
  {
    translationKey: "vivienda",
    locale: "de",
    title: "Wohnungssuche in Panama: Was Sie vor der Entscheidung prüfen sollten",
    slug: "wohnungssuche-panama",
    excerpt:
      "Lage, Verkehrsanbindung, Versorgung und Vertrag: eine Liste von Punkten, die Sie vor dem Mieten oder Kaufen in Ruhe prüfen sollten.",
    body: [
      {
        type: "p",
        text: "Die Wahl des Wohnorts ist eine der ersten Entscheidungen nach der Ankunft in einem Land. Statt Wohngegenden oder Preise zu empfehlen, zeigt dieser Ratgeber, welche Aspekte Sie prüfen sollten, um eine fundierte Entscheidung zu treffen.",
      },
      { type: "h2", text: "Worauf Sie achten sollten" },
      {
        type: "ul",
        items: [
          "Nähe zu Ihrem Arbeitsplatz, zu Bildungseinrichtungen und Gesundheitsdiensten.",
          "Verfügbare Verkehrsmittel in der Umgebung.",
          "Grundversorgung: Wasser, Strom, Internet.",
          "Vertragsbedingungen und wer welche Kosten trägt.",
        ],
      },
      { type: "h2", text: "Vor der Unterschrift" },
      {
        type: "p",
        text: "Lesen Sie den Vertrag aufmerksam, besichtigen Sie die Immobilie persönlich und holen Sie bei Zweifeln eine unabhängige professionelle Beratung ein. Seien Sie misstrauisch bei Angeboten, die Zahlungen ohne ein klares Dokument verlangen.",
      },
      {
        type: "note",
        text: "Marktbedingungen und Vorschriften ändern sich. Dieser Inhalt dient der Orientierung und stellt keine Rechts- oder Immobilienberatung dar.",
      },
    ],
    section: "vivir",
    category: "vivienda",
    location: "Panamá (landesweit)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    readingTime: 5,
    seoTitle: "Wohnungssuche in Panama: eine Checkliste",
    seoDescription:
      "Was Sie vor dem Mieten oder Kaufen in Panama prüfen sollten: Lage, Verkehr, Versorgung und Vertrag. Ein Orientierungsratgeber.",
    status: "demo",
  },
  {
    translationKey: "salud",
    locale: "de",
    title: "Gesundheit in Panama: Fragen zur Vorbereitung Ihrer Ankunft",
    slug: "gesundheit-fragen-vor-der-ankunft",
    excerpt:
      "Wie Sie Ihre Fragen zu medizinischer Versorgung, Versicherungsschutz und gesundheitlichen Anforderungen ordnen – und wo Sie sie überprüfen können.",
    body: [
      {
        type: "p",
        text: "Gesundheit hat Priorität, wenn Sie einen längeren Aufenthalt in einem anderen Land planen. Dieser Ratgeber bietet keine medizinischen Informationen und beschreibt keinen Versicherungsschutz: Er hilft Ihnen, Fragen vorzubereiten und offizielle Quellen zu ermitteln.",
      },
      { type: "h2", text: "Hilfreiche Fragen" },
      {
        type: "ul",
        items: [
          "Welchen Krankenversicherungsschutz benötige ich in meiner Situation, und wie überprüfe ich das?",
          "Gibt es aktuell gültige Gesundheitsempfehlungen für Reisende?",
          "Wo befinden sich die nächstgelegenen Gesundheitseinrichtungen in der Gegend, in der ich wohnen werde?",
          "Wie stelle ich die Fortsetzung einer laufenden Behandlung sicher?",
        ],
      },
      { type: "h2", text: "Wo Sie Informationen prüfen können" },
      {
        type: "p",
        text: "Bevor Sie planen, finden Sie heraus, welche Institution zuständig ist, und prüfen Sie deren aktuell gültige Informationen. Das Ministerio de Salud ist die maßgebliche Stelle für die gesundheitlichen Bestimmungen des Landes.",
      },
      {
        type: "note",
        text: "Gesundheitliche Bestimmungen ändern sich. Dieser Inhalt stellt keine medizinische oder rechtliche Beratung dar. Wenden Sie sich stets an offizielle Quellen und an medizinische Fachpersonen.",
      },
    ],
    section: "vivir",
    category: "salud",
    location: "Panamá (landesweit)",
    coverImage: cover("casco"),
    author: AUTHOR,
    sources: [SRC.minsa, SRC.migracion],
    sensitive: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-29",
    readingTime: 5,
    seoTitle: "Gesundheit in Panama: Was Sie vor der Ankunft fragen sollten",
    seoDescription:
      "Fragen zu medizinischer Versorgung und Versicherungsschutz vor Ihrer Ankunft in Panama – und offizielle Quellen, um sie zu prüfen.",
    status: "demo",
  },
  {
    translationKey: "transporte",
    locale: "de",
    title: "Unterwegs in Panama: Was Sie über den Verkehr herausfinden sollten",
    slug: "unterwegs-in-panama",
    excerpt:
      "Öffentlicher Nahverkehr, Autofahren und Reisen zwischen Regionen: Fragen, die Sie mit offiziellen Quellen klären sollten.",
    body: [
      {
        type: "p",
        text: "Wie Sie sich fortbewegen, beeinflusst, wo Sie wohnen möchten und wie Sie Ihren Tag gestalten. Dieser Ratgeber zeigt, was Sie herausfinden sollten, ohne Verfahren oder Voraussetzungen zu beschreiben.",
      },
      { type: "h2", text: "Zu klärende Fragen" },
      {
        type: "ul",
        items: [
          "Welche öffentlichen Verkehrsmittel gibt es in der Gegend, in der ich wohnen werde?",
          "Wenn ich Auto fahren möchte: Welche Institution informiert über Führerscheine und deren Gültigkeit?",
          "Wie plane ich Fahrten zwischen Provinzen und in andere Regionen?",
        ],
      },
      {
        type: "p",
        text: "Für Fragen zu Straßenverkehr und Fahrerlaubnis ist die Autoridad de Tránsito y Transporte Terrestre die maßgebliche Stelle. Prüfen Sie deren aktuell gültige Informationen, bevor Sie Entscheidungen treffen.",
      },
      {
        type: "note",
        text: "Verkehrsregeln und Verkehrsbedingungen ändern sich. Dieser Inhalt dient der Orientierung und stellt keine Rechtsberatung dar.",
      },
    ],
    section: "vivir",
    category: "transporte",
    location: "Panamá (landesweit)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.attt],
    sensitive: false,
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    readingTime: 4,
    seoTitle: "Verkehr in Panama: Was Sie herausfinden sollten",
    seoDescription:
      "Fragen zu öffentlichem Nahverkehr, Autofahren und Reisen zwischen Regionen in Panama – und wo Sie sie offiziell prüfen können.",
    status: "demo",
  },

  // ───────────────────────── INVERTIR ─────────────────────────
  {
    translationKey: "entorno-negocios",
    locale: "de",
    title: "Das Geschäftsumfeld in Panama: ein verantwortungsvoller Zugang",
    slug: "geschaeftsumfeld-verantwortungsvoller-ansatz",
    excerpt:
      "Bevor Sie investieren oder ein Unternehmen gründen, ermitteln Sie die offiziellen Institutionen und holen Sie unabhängige professionelle Beratung ein.",
    body: [
      {
        type: "p",
        text: "Geschäftsmöglichkeiten in einem anderen Land zu erkunden, erfordert Zeit, geprüfte Informationen und professionelle Begleitung. Dieser Ratgeber nennt weder Zahlen noch Renditen oder Steuervorteile: Er schlägt eine Methode vor, um sich fundiert zu informieren.",
      },
      { type: "h2", text: "Ein Ansatz in drei Schritten" },
      {
        type: "ul",
        items: [
          "Ermitteln Sie die offiziellen Institutionen, die mit Ihrer Tätigkeit zu tun haben, etwa das Ministerio de Comercio e Industrias.",
          "Ziehen Sie offizielle Branchendaten aus Quellen wie dem Instituto Nacional de Estadística y Censo heran.",
          "Beauftragen Sie eine unabhängige rechtliche und buchhalterische Beratung, bevor Sie Mittel binden.",
        ],
      },
      { type: "h2", text: "Warnsignale" },
      {
        type: "p",
        text: "Seien Sie misstrauisch bei Versprechen garantierter Renditen, bei Druck, schnell zu entscheiden, oder bei Angeboten ohne überprüfbare Unterlagen.",
      },
      {
        type: "note",
        text: "Vorschriften ändern sich. Dieser Inhalt stellt keine Rechts-, Steuer- oder Finanzberatung dar. Prüfen Sie stets bei den zuständigen Institutionen und bei zugelassenen Fachleuten.",
      },
    ],
    section: "invertir",
    category: "entorno-negocios",
    location: "Panamá (landesweit)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.mici, SRC.inec],
    sensitive: true,
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-10",
    readingTime: 5,
    seoTitle: "Geschäfte in Panama: ein verantwortungsvoller Ansatz",
    seoDescription:
      "So nähern Sie sich dem Geschäftsumfeld in Panama: offizielle Institutionen, professionelle Beratung und Warnsignale.",
    status: "demo",
  },
];
