import type { Article, ContentImage, Source } from "@/types/content";

/** This file holds the Spanish and English originals; other locales live in *.{fr,de,it}.ts. */
type Locale = "es" | "en";

/**
 * DEMO editorial content. Every item is `status: "demo"`.
 * Texts deliberately avoid figures, legal facts, procedures, timelines and costs.
 * Sources are "where to verify" references (official homepages), not citations
 * of specific claims.
 */

const CONSULTED = "2026-10-14";
const AUTHOR: Record<Locale, string> = {
  es: "Equipo editorial Tu Destino es Panamá",
  en: "Tu Destino es Panamá editorial team",
};

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

const IMAGES: Record<
  ImageKey,
  { src: string; alt: Record<Locale, string> }
> = {
  bahia: {
    src: "/images/panama-city-bahia-aerea.webp",
    alt: {
      es: "Vista aérea del distrito financiero de Ciudad de Panamá y la bahía al atardecer",
      en: "Aerial view of Panama City's financial district and the bay at sunset",
    },
  },
  canal: {
    src: "/images/canal-esclusas-miraflores.webp",
    alt: {
      es: "Buque portacontenedores transitando por las esclusas de Miraflores del Canal de Panamá",
      en: "Container ship transiting the Miraflores Locks of the Panama Canal",
    },
  },
  casco: {
    src: "/images/casco-antiguo-fachada.webp",
    alt: {
      es: "Fachada colonial con balcones en el Casco Antiguo de Ciudad de Panamá",
      en: "Colonial facade with balconies in Panama City's Casco Antiguo",
    },
  },
  skyline: {
    src: "/images/skyline-cinta-costera.webp",
    alt: {
      es: "Horizonte de Ciudad de Panamá y la Cinta Costera",
      en: "Panama City skyline and the Cinta Costera",
    },
  },
  gunaYala: {
    src: "/images/guna-yala-isla.webp",
    alt: {
      es: "Playa de arena blanca con palmeras en las islas de Guna Yala (San Blas)",
      en: "White-sand beach with palm trees in the Guna Yala (San Blas) islands",
    },
  },
};

function cover(key: ImageKey, locale: Locale): ContentImage {
  const img = IMAGES[key];
  return {
    src: img.src,
    alt: img.alt[locale],
    width: 2560,
    height: 1600,
  };
}

export const articles: Article[] = [
  // ───────────────────────── DESCUBRE ─────────────────────────
  {
    translationKey: "regiones-de-panama",
    locale: "es",
    title: "Las regiones de Panamá: una primera mirada",
    slug: "regiones-de-panama",
    excerpt:
      "Panamá se organiza en provincias y comarcas indígenas. Una introducción para orientarte antes de elegir qué conocer primero.",
    body: [
      {
        type: "p",
        text: "Panamá es un país de contrastes en un territorio angosto, con costas en el mar Caribe y en el océano Pacífico. Entender cómo se organiza su territorio es un buen punto de partida para planificar cualquier visita o proyecto.",
      },
      { type: "h2", text: "Provincias y comarcas indígenas" },
      {
        type: "p",
        text: "El país se organiza en provincias y comarcas indígenas. Las comarcas son territorios con formas propias de organización, ligadas a los pueblos originarios que las habitan.",
      },
      {
        type: "ul",
        items: [
          "Zonas urbanas como Ciudad de Panamá, con su actividad comercial y cultural.",
          "Tierras altas y valles en el interior del país.",
          "Litorales en el Caribe y en el Pacífico, con islas y archipiélagos.",
        ],
      },
      {
        type: "p",
        text: "El Canal de Panamá, que conecta el océano Atlántico con el Pacífico, atraviesa el istmo y es una referencia inevitable para entender la geografía del país.",
      },
      {
        type: "note",
        text: "Para datos oficiales sobre la división territorial y la población, consulta las publicaciones vigentes del Instituto Nacional de Estadística y Censo.",
      },
    ],
    section: "descubre",
    category: "regiones",
    location: "Panamá (nacional)",
    coverImage: cover("canal", "es"),
    author: AUTHOR.es,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTime: 4,
    seoTitle: "Regiones de Panamá: provincias y comarcas indígenas",
    seoDescription:
      "Una introducción a cómo se organiza el territorio panameño, entre provincias, comarcas indígenas y dos costas.",
    status: "demo",
  },
  {
    translationKey: "regiones-de-panama",
    locale: "en",
    title: "Panama's regions: a first look",
    slug: "regions-of-panama",
    excerpt:
      "Panama is organised into provinces and indigenous comarcas. An introduction to help you decide what to explore first.",
    body: [
      {
        type: "p",
        text: "Panama is a narrow country full of contrasts, with coastlines on both the Caribbean Sea and the Pacific Ocean. Understanding how its territory is organised is a good starting point for planning a trip or a project.",
      },
      { type: "h2", text: "Provinces and indigenous comarcas" },
      {
        type: "p",
        text: "The country is organised into provinces and indigenous comarcas. Comarcas are territories with their own forms of organisation, tied to the Indigenous peoples who live there.",
      },
      {
        type: "ul",
        items: [
          "Urban areas such as Panama City, with its commercial and cultural life.",
          "Highlands and valleys in the interior of the country.",
          "Caribbean and Pacific coastlines, with islands and archipelagos.",
        ],
      },
      {
        type: "p",
        text: "The Panama Canal, which connects the Atlantic and Pacific oceans, crosses the isthmus and is an essential reference for understanding the country's geography.",
      },
      {
        type: "note",
        text: "For official data on territorial divisions and population, check the current publications of the National Institute of Statistics and Census (INEC).",
      },
    ],
    section: "descubre",
    category: "regiones",
    location: "Panamá (nacional)",
    coverImage: cover("canal", "en"),
    author: AUTHOR.en,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTime: 4,
    seoTitle: "Panama's regions: provinces and indigenous comarcas",
    seoDescription:
      "An introduction to how Panama's territory is organised, from provinces and indigenous comarcas to its two coastlines.",
    status: "demo",
  },
  {
    translationKey: "casco-antiguo",
    locale: "es",
    title: "Casco Antiguo: el barrio histórico de Ciudad de Panamá",
    slug: "casco-antiguo-patrimonio",
    excerpt:
      "Calles, plazas y balcones que cuentan parte de la historia de la ciudad. Claves para recorrerlo con calma y respeto.",
    body: [
      {
        type: "p",
        text: "El Casco Antiguo, también conocido como Casco Viejo, es el distrito histórico de Ciudad de Panamá. Sus fachadas con balcones, sus iglesias y sus plazas invitan a recorrerlo a pie y sin prisa.",
      },
      { type: "h2", text: "Un barrio vivo" },
      {
        type: "p",
        text: "Además de su valor histórico, el Casco Antiguo es un barrio donde vive y trabaja gente. Recorrerlo con respeto por sus residentes forma parte de la experiencia.",
      },
      {
        type: "ul",
        items: [
          "Camina temprano o al final de la tarde para disfrutar de las plazas.",
          "Observa la arquitectura: balcones, patios y detalles de las fachadas.",
          "Respeta los espacios privados y las normas de los sitios religiosos.",
        ],
      },
      {
        type: "note",
        text: "Para conocer el reconocimiento patrimonial del sitio y su descripción oficial, consulta directamente el portal de Patrimonio Mundial de la UNESCO.",
      },
    ],
    section: "descubre",
    category: "cultura",
    location: "Ciudad de Panamá",
    coverImage: cover("casco", "es"),
    author: AUTHOR.es,
    sources: [SRC.unesco],
    sensitive: false,
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-20",
    readingTime: 4,
    seoTitle: "Casco Antiguo de Panamá: historia y patrimonio",
    seoDescription:
      "Recorre el Casco Antiguo, el distrito histórico de Ciudad de Panamá: arquitectura, plazas y consejos para visitarlo con respeto.",
    status: "demo",
  },
  {
    translationKey: "casco-antiguo",
    locale: "en",
    title: "Casco Antiguo: Panama City's historic district",
    slug: "casco-antiguo-heritage",
    excerpt:
      "Streets, squares and balconies that tell part of the city's story. Tips for exploring it slowly and respectfully.",
    body: [
      {
        type: "p",
        text: "Casco Antiguo, also known as Casco Viejo, is the historic district of Panama City. Its balconied facades, churches and squares are best explored on foot and at an unhurried pace.",
      },
      { type: "h2", text: "A living neighbourhood" },
      {
        type: "p",
        text: "Beyond its historic value, Casco Antiguo is a neighbourhood where people live and work. Exploring it with respect for its residents is part of the experience.",
      },
      {
        type: "ul",
        items: [
          "Walk early in the morning or late in the afternoon to enjoy the squares.",
          "Look up at the architecture: balconies, courtyards and facade details.",
          "Respect private spaces and the rules of religious sites.",
        ],
      },
      {
        type: "note",
        text: "For the site's heritage status and its official description, check the UNESCO World Heritage portal directly.",
      },
    ],
    section: "descubre",
    category: "cultura",
    location: "Ciudad de Panamá",
    coverImage: cover("casco", "en"),
    author: AUTHOR.en,
    sources: [SRC.unesco],
    sensitive: false,
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-20",
    readingTime: 4,
    seoTitle: "Casco Antiguo, Panama: history and heritage",
    seoDescription:
      "Explore Casco Antiguo, Panama City's historic district: architecture, squares and tips for visiting respectfully.",
    status: "demo",
  },
  {
    translationKey: "naturaleza-dos-costas",
    locale: "es",
    title: "Naturaleza entre dos costas: selva, Pacífico y Caribe",
    slug: "naturaleza-dos-costas",
    excerpt:
      "Bosques tropicales, playas y paisajes marinos en un mismo país. Ideas para acercarte a la naturaleza panameña de forma responsable.",
    body: [
      {
        type: "p",
        text: "Panamá tiene costas en el océano Pacífico y en el mar Caribe, y buena parte de su territorio está cubierto por bosque tropical. Esa combinación da lugar a paisajes muy distintos en distancias relativamente cortas.",
      },
      { type: "h2", text: "Dos litorales, dos ambientes" },
      {
        type: "p",
        text: "El Pacífico y el Caribe ofrecen experiencias diferentes: cambian el paisaje, el clima local y la vida cotidiana de las comunidades costeras. Vale la pena informarte sobre cada zona antes de elegir tu destino.",
      },
      { type: "h2", text: "Visitar la selva con responsabilidad" },
      {
        type: "ul",
        items: [
          "Infórmate sobre las áreas protegidas y sus normas de visita.",
          "Considera recorrer senderos con guías locales.",
          "No extraigas plantas ni animales, y llévate tus residuos.",
        ],
      },
      {
        type: "note",
        text: "Las condiciones de acceso a parques y áreas protegidas pueden cambiar. Consulta información oficial y actualizada antes de tu visita.",
      },
    ],
    section: "descubre",
    category: "naturaleza",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "es"),
    author: AUTHOR.es,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingTime: 5,
    seoTitle: "Naturaleza en Panamá: selva, Pacífico y Caribe",
    seoDescription:
      "Bosque tropical y dos costas, Pacífico y Caribe: ideas para descubrir la naturaleza de Panamá de forma responsable.",
    status: "demo",
  },
  {
    translationKey: "naturaleza-dos-costas",
    locale: "en",
    title: "Nature between two coasts: rainforest, Pacific and Caribbean",
    slug: "nature-two-coasts",
    excerpt:
      "Tropical forests, beaches and seascapes in a single country. Ideas for experiencing Panama's nature responsibly.",
    body: [
      {
        type: "p",
        text: "Panama has coastlines on both the Pacific Ocean and the Caribbean Sea, and much of its territory is covered by tropical forest. That combination creates very different landscapes within relatively short distances.",
      },
      { type: "h2", text: "Two coastlines, two moods" },
      {
        type: "p",
        text: "The Pacific and the Caribbean offer different experiences: the scenery, the local climate and the daily life of coastal communities all change. It is worth reading up on each area before choosing where to go.",
      },
      { type: "h2", text: "Visiting the rainforest responsibly" },
      {
        type: "ul",
        items: [
          "Learn about protected areas and their visitor rules.",
          "Consider exploring trails with local guides.",
          "Do not remove plants or animals, and take your waste with you.",
        ],
      },
      {
        type: "note",
        text: "Access conditions for parks and protected areas can change. Check official, up-to-date information before your visit.",
      },
    ],
    section: "descubre",
    category: "naturaleza",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "en"),
    author: AUTHOR.en,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingTime: 5,
    seoTitle: "Nature in Panama: rainforest, Pacific and Caribbean",
    seoDescription:
      "Tropical forest and two coastlines, Pacific and Caribbean: ideas for discovering Panama's nature responsibly.",
    status: "demo",
  },
  {
    translationKey: "guna-yala",
    locale: "es",
    title: "Guna Yala: islas del Caribe y cultura guna",
    slug: "guna-yala-islas",
    excerpt:
      "La comarca de Guna Yala y sus islas, también conocidas como San Blas. Cómo planificar una visita respetuosa con la comunidad.",
    body: [
      {
        type: "p",
        text: "Guna Yala es una comarca indígena en la costa caribeña de Panamá, habitada por el pueblo guna. Sus islas, conocidas también como archipiélago de San Blas, son uno de los paisajes más reconocibles del país.",
      },
      { type: "h2", text: "Un territorio con organización propia" },
      {
        type: "p",
        text: "Visitar Guna Yala significa entrar en un territorio con autoridades y normas propias. La experiencia es más valiosa cuando se planifica con respeto por la cultura y las decisiones de la comunidad.",
      },
      {
        type: "ul",
        items: [
          "Infórmate con antelación sobre las condiciones de acceso vigentes.",
          "Prioriza servicios ofrecidos por la propia comunidad.",
          "Pide permiso antes de fotografiar a personas.",
          "Reduce tus residuos: las islas son ecosistemas frágiles.",
        ],
      },
      {
        type: "note",
        text: "Las condiciones de visita pueden cambiar. Verifica la información con fuentes oficiales y con operadores autorizados antes de viajar.",
      },
    ],
    section: "descubre",
    category: "destinos",
    location: "Guna Yala",
    coverImage: cover("gunaYala", "es"),
    author: AUTHOR.es,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    readingTime: 5,
    seoTitle: "Guna Yala (San Blas): islas y cultura guna",
    seoDescription:
      "Guna Yala, comarca indígena del Caribe panameño: cómo planificar una visita a sus islas con respeto por la comunidad guna.",
    status: "demo",
  },
  {
    translationKey: "guna-yala",
    locale: "en",
    title: "Guna Yala: Caribbean islands and Guna culture",
    slug: "guna-yala-islands",
    excerpt:
      "The Guna Yala comarca and its islands, also known as San Blas. How to plan a visit that respects the community.",
    body: [
      {
        type: "p",
        text: "Guna Yala is an indigenous comarca on Panama's Caribbean coast, home to the Guna people. Its islands, also known as the San Blas archipelago, are among the country's most recognisable landscapes.",
      },
      { type: "h2", text: "A territory with its own organisation" },
      {
        type: "p",
        text: "Visiting Guna Yala means entering a territory with its own authorities and rules. The experience is richer when it is planned with respect for the culture and the community's decisions.",
      },
      {
        type: "ul",
        items: [
          "Find out about current access conditions well in advance.",
          "Favour services offered by the community itself.",
          "Ask permission before photographing people.",
          "Minimise your waste: the islands are fragile ecosystems.",
        ],
      },
      {
        type: "note",
        text: "Visiting conditions can change. Verify information with official sources and authorised operators before you travel.",
      },
    ],
    section: "descubre",
    category: "destinos",
    location: "Guna Yala",
    coverImage: cover("gunaYala", "en"),
    author: AUTHOR.en,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    readingTime: 5,
    seoTitle: "Guna Yala (San Blas): islands and Guna culture",
    seoDescription:
      "Guna Yala, an indigenous comarca on Panama's Caribbean coast: how to plan a respectful visit to its islands.",
    status: "demo",
  },

  // ───────────────────────── VIVIR ─────────────────────────
  {
    translationKey: "primeros-pasos",
    locale: "es",
    title: "Primeros pasos para mudarte a Panamá: preguntas que preparar",
    slug: "primeros-pasos-mudarse-panama",
    excerpt:
      "Antes de planificar una mudanza, conviene ordenar tus preguntas e identificar qué instituciones son competentes para tu caso.",
    body: [
      {
        type: "p",
        text: "Mudarse a otro país implica decisiones personales, familiares y administrativas. Esta guía no describe trámites ni requisitos: te ayuda a preparar las preguntas correctas para consultarlas con las fuentes oficiales.",
      },
      { type: "h2", text: "Identifica a la institución competente" },
      {
        type: "p",
        text: "Antes de planificar, identifica qué institución es competente para tu situación y consulta su información vigente. Para asuntos migratorios, la referencia es el Servicio Nacional de Migración.",
      },
      { type: "h2", text: "Preguntas para preparar" },
      {
        type: "ul",
        items: [
          "¿Cuál es el propósito de mi estancia y qué institución atiende ese caso?",
          "¿Qué documentos de mi país de origen podrían solicitarme y cómo se legalizan?",
          "¿Necesito asesoría profesional independiente para mi situación concreta?",
          "¿Dónde puedo confirmar que la información que leo está actualizada?",
        ],
      },
      {
        type: "note",
        text: "Las condiciones y normas cambian. Este contenido es orientativo y no constituye asesoría legal ni migratoria. Verifica siempre con la institución oficial y, si es necesario, con un profesional habilitado.",
      },
    ],
    section: "vivir",
    category: "primeros-pasos",
    location: "Panamá (nacional)",
    coverImage: cover("skyline", "es"),
    author: AUTHOR.es,
    sources: [SRC.migracion, SRC.minsa],
    sensitive: true,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-15",
    readingTime: 6,
    seoTitle: "Mudarse a Panamá: preguntas antes de empezar",
    seoDescription:
      "Qué preguntas preparar y qué instituciones oficiales consultar antes de planificar una mudanza a Panamá. Guía orientativa.",
    status: "demo",
  },
  {
    translationKey: "primeros-pasos",
    locale: "en",
    title: "First steps for moving to Panama: questions to prepare",
    slug: "first-steps-moving-to-panama",
    excerpt:
      "Before planning a move, it helps to organise your questions and identify which institutions are responsible for your situation.",
    body: [
      {
        type: "p",
        text: "Moving to another country involves personal, family and administrative decisions. This guide does not describe procedures or requirements: it helps you prepare the right questions to take to official sources.",
      },
      { type: "h2", text: "Identify the responsible institution" },
      {
        type: "p",
        text: "Before making plans, identify which institution is responsible for your situation and check its current information. For immigration matters, the reference is Panama's National Immigration Service (Servicio Nacional de Migración).",
      },
      { type: "h2", text: "Questions to prepare" },
      {
        type: "ul",
        items: [
          "What is the purpose of my stay, and which institution handles that case?",
          "Which documents from my home country might be requested, and how are they legalised?",
          "Do I need independent professional advice for my specific situation?",
          "Where can I confirm that the information I'm reading is up to date?",
        ],
      },
      {
        type: "note",
        text: "Conditions and regulations change. This content is for general guidance only and is not legal or immigration advice. Always verify with the official institution and, where needed, a qualified professional.",
      },
    ],
    section: "vivir",
    category: "primeros-pasos",
    location: "Panamá (nacional)",
    coverImage: cover("skyline", "en"),
    author: AUTHOR.en,
    sources: [SRC.migracion, SRC.minsa],
    sensitive: true,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-15",
    readingTime: 6,
    seoTitle: "Moving to Panama: questions before you start",
    seoDescription:
      "Which questions to prepare and which official institutions to consult before planning a move to Panama. General guidance.",
    status: "demo",
  },
  {
    translationKey: "vivienda",
    locale: "es",
    title: "Buscar vivienda en Panamá: qué revisar antes de decidir",
    slug: "buscar-vivienda-panama",
    excerpt:
      "Zona, transporte, servicios y contrato: una lista de aspectos para evaluar con calma antes de alquilar o comprar.",
    body: [
      {
        type: "p",
        text: "Elegir dónde vivir es una de las primeras decisiones al llegar a un país. Más que recomendar zonas o precios, esta guía propone qué aspectos revisar para tomar una decisión informada.",
      },
      { type: "h2", text: "Aspectos para evaluar" },
      {
        type: "ul",
        items: [
          "Cercanía a tu trabajo, centros educativos y servicios de salud.",
          "Opciones de transporte disponibles en la zona.",
          "Servicios básicos: agua, electricidad, internet.",
          "Condiciones del contrato y quién responde por cada gasto.",
        ],
      },
      { type: "h2", text: "Antes de firmar" },
      {
        type: "p",
        text: "Lee el contrato con atención, visita el inmueble en persona y, si tienes dudas, busca asesoría profesional independiente. Desconfía de ofertas que te pidan pagos sin un documento claro.",
      },
      {
        type: "note",
        text: "Las condiciones del mercado y las normas cambian. Este contenido es orientativo y no constituye asesoría legal ni inmobiliaria.",
      },
    ],
    section: "vivir",
    category: "vivienda",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "es"),
    author: AUTHOR.es,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    readingTime: 5,
    seoTitle: "Buscar vivienda en Panamá: lista para revisar",
    seoDescription:
      "Qué revisar antes de alquilar o comprar vivienda en Panamá: ubicación, transporte, servicios y contrato. Guía orientativa.",
    status: "demo",
  },
  {
    translationKey: "vivienda",
    locale: "en",
    title: "Finding a home in Panama: what to check before deciding",
    slug: "finding-housing-panama",
    excerpt:
      "Area, transport, utilities and the contract: a checklist to review calmly before renting or buying.",
    body: [
      {
        type: "p",
        text: "Choosing where to live is one of the first decisions when you arrive in a new country. Rather than recommending neighbourhoods or prices, this guide suggests what to check so you can decide with good information.",
      },
      { type: "h2", text: "Things to assess" },
      {
        type: "ul",
        items: [
          "Proximity to your workplace, schools and healthcare services.",
          "Transport options available in the area.",
          "Basic utilities: water, electricity, internet.",
          "Contract terms and who is responsible for each expense.",
        ],
      },
      { type: "h2", text: "Before you sign" },
      {
        type: "p",
        text: "Read the contract carefully, visit the property in person and, if in doubt, seek independent professional advice. Be wary of offers asking for payment without clear documentation.",
      },
      {
        type: "note",
        text: "Market conditions and regulations change. This content is for general guidance only and is not legal or real estate advice.",
      },
    ],
    section: "vivir",
    category: "vivienda",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "en"),
    author: AUTHOR.en,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    readingTime: 5,
    seoTitle: "Finding a home in Panama: a checklist",
    seoDescription:
      "What to check before renting or buying a home in Panama: location, transport, utilities and contract. General guidance.",
    status: "demo",
  },
  {
    translationKey: "salud",
    locale: "es",
    title: "Salud en Panamá: preguntas para preparar tu llegada",
    slug: "salud-preguntas-llegada",
    excerpt:
      "Cómo organizar tus preguntas sobre atención médica, cobertura y requisitos sanitarios, y dónde verificarlas.",
    body: [
      {
        type: "p",
        text: "La salud es una prioridad al planificar una estancia larga en otro país. Esta guía no ofrece información médica ni describe coberturas: te ayuda a preparar preguntas y a identificar fuentes oficiales.",
      },
      { type: "h2", text: "Preguntas útiles" },
      {
        type: "ul",
        items: [
          "¿Qué cobertura de salud necesito según mi situación y cómo la verifico?",
          "¿Hay recomendaciones sanitarias vigentes para viajeros?",
          "¿Dónde están los centros de atención más cercanos a la zona donde viviré?",
          "¿Cómo gestiono la continuidad de un tratamiento que ya sigo?",
        ],
      },
      { type: "h2", text: "Dónde verificar" },
      {
        type: "p",
        text: "Antes de planificar, identifica qué institución es competente y consulta su información vigente. El Ministerio de Salud es la referencia para las disposiciones sanitarias del país.",
      },
      {
        type: "note",
        text: "Las disposiciones sanitarias cambian. Este contenido no constituye consejo médico ni legal. Consulta siempre fuentes oficiales y a profesionales de la salud.",
      },
    ],
    section: "vivir",
    category: "salud",
    location: "Panamá (nacional)",
    coverImage: cover("casco", "es"),
    author: AUTHOR.es,
    sources: [SRC.minsa, SRC.migracion],
    sensitive: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-29",
    readingTime: 5,
    seoTitle: "Salud en Panamá: qué preguntar antes de llegar",
    seoDescription:
      "Preguntas sobre atención médica y cobertura para preparar tu llegada a Panamá, y fuentes oficiales donde verificarlas.",
    status: "demo",
  },
  {
    translationKey: "salud",
    locale: "en",
    title: "Healthcare in Panama: questions to prepare before arriving",
    slug: "healthcare-questions-before-arriving",
    excerpt:
      "How to organise your questions about medical care, coverage and health requirements, and where to verify them.",
    body: [
      {
        type: "p",
        text: "Health is a priority when planning a long stay in another country. This guide does not provide medical information or describe coverage options: it helps you prepare questions and identify official sources.",
      },
      { type: "h2", text: "Useful questions" },
      {
        type: "ul",
        items: [
          "What health coverage do I need for my situation, and how can I verify it?",
          "Are there current health recommendations for travellers?",
          "Where are the nearest healthcare facilities to the area where I'll live?",
          "How do I continue a treatment I'm already following?",
        ],
      },
      { type: "h2", text: "Where to verify" },
      {
        type: "p",
        text: "Before making plans, identify which institution is responsible and check its current information. The Ministry of Health (MINSA) is the reference for the country's health regulations.",
      },
      {
        type: "note",
        text: "Health regulations change. This content is not medical or legal advice. Always consult official sources and healthcare professionals.",
      },
    ],
    section: "vivir",
    category: "salud",
    location: "Panamá (nacional)",
    coverImage: cover("casco", "en"),
    author: AUTHOR.en,
    sources: [SRC.minsa, SRC.migracion],
    sensitive: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-29",
    readingTime: 5,
    seoTitle: "Healthcare in Panama: what to ask before arriving",
    seoDescription:
      "Questions about medical care and coverage to prepare before arriving in Panama, and official sources to verify them.",
    status: "demo",
  },
  {
    translationKey: "transporte",
    locale: "es",
    title: "Moverse por Panamá: qué averiguar sobre transporte",
    slug: "moverse-por-panama",
    excerpt:
      "Transporte público, conducción y desplazamientos entre regiones: preguntas para resolver con fuentes oficiales.",
    body: [
      {
        type: "p",
        text: "La forma en que te desplazas influye en dónde decides vivir y en cómo organizas tu día. Esta guía propone qué averiguar, sin describir trámites ni requisitos.",
      },
      { type: "h2", text: "Preguntas para resolver" },
      {
        type: "ul",
        items: [
          "¿Qué opciones de transporte público hay en la zona donde viviré?",
          "Si quiero conducir, ¿qué institución informa sobre las licencias y su vigencia?",
          "¿Cómo planifico viajes entre provincias y hacia otras regiones?",
        ],
      },
      {
        type: "p",
        text: "Para temas de tránsito y conducción, la referencia es la Autoridad de Tránsito y Transporte Terrestre. Consulta su información vigente antes de tomar decisiones.",
      },
      {
        type: "note",
        text: "Las normas de tránsito y las condiciones de transporte cambian. Este contenido es orientativo y no constituye asesoría legal.",
      },
    ],
    section: "vivir",
    category: "transporte",
    location: "Panamá (nacional)",
    coverImage: cover("canal", "es"),
    author: AUTHOR.es,
    sources: [SRC.attt],
    sensitive: false,
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    readingTime: 4,
    seoTitle: "Transporte en Panamá: qué averiguar",
    seoDescription:
      "Preguntas sobre transporte público, conducción y viajes entre regiones en Panamá, y dónde verificarlas oficialmente.",
    status: "demo",
  },
  {
    translationKey: "transporte",
    locale: "en",
    title: "Getting around Panama: what to find out about transport",
    slug: "getting-around-panama",
    excerpt:
      "Public transport, driving and travel between regions: questions to resolve with official sources.",
    body: [
      {
        type: "p",
        text: "How you get around shapes where you decide to live and how you organise your day. This guide suggests what to find out, without describing procedures or requirements.",
      },
      { type: "h2", text: "Questions to resolve" },
      {
        type: "ul",
        items: [
          "What public transport options exist in the area where I'll live?",
          "If I want to drive, which institution provides information on licences and their validity?",
          "How do I plan trips between provinces and to other regions?",
        ],
      },
      {
        type: "p",
        text: "For traffic and driving matters, the reference is the Land Transit and Transport Authority (ATTT). Check its current information before making decisions.",
      },
      {
        type: "note",
        text: "Traffic rules and transport conditions change. This content is for general guidance only and is not legal advice.",
      },
    ],
    section: "vivir",
    category: "transporte",
    location: "Panamá (nacional)",
    coverImage: cover("canal", "en"),
    author: AUTHOR.en,
    sources: [SRC.attt],
    sensitive: false,
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    readingTime: 4,
    seoTitle: "Transport in Panama: what to find out",
    seoDescription:
      "Questions about public transport, driving and travel between regions in Panama, and where to verify them officially.",
    status: "demo",
  },

  // ───────────────────────── INVERTIR ─────────────────────────
  {
    translationKey: "entorno-negocios",
    locale: "es",
    title: "Entorno de negocios en Panamá: cómo acercarse con responsabilidad",
    slug: "entorno-negocios-enfoque-responsable",
    excerpt:
      "Antes de invertir o emprender, identifica las instituciones oficiales y busca asesoría profesional independiente.",
    body: [
      {
        type: "p",
        text: "Explorar oportunidades de negocio en otro país requiere tiempo, información verificada y acompañamiento profesional. Esta guía no ofrece cifras, rentabilidades ni ventajas fiscales: propone un método para informarte bien.",
      },
      { type: "h2", text: "Un enfoque en tres pasos" },
      {
        type: "ul",
        items: [
          "Identifica las instituciones oficiales relacionadas con tu actividad, como el Ministerio de Comercio e Industrias.",
          "Consulta datos oficiales del sector en fuentes como el Instituto Nacional de Estadística y Censo.",
          "Contrata asesoría legal y contable independiente antes de comprometer recursos.",
        ],
      },
      { type: "h2", text: "Señales de alerta" },
      {
        type: "p",
        text: "Desconfía de promesas de rentabilidad garantizada, de presiones para decidir rápido o de ofertas sin documentación verificable.",
      },
      {
        type: "note",
        text: "Las normas cambian. Este contenido no constituye asesoría legal, fiscal ni financiera. Verifica siempre con las instituciones competentes y con profesionales habilitados.",
      },
    ],
    section: "invertir",
    category: "entorno-negocios",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "es"),
    author: AUTHOR.es,
    sources: [SRC.mici, SRC.inec],
    sensitive: true,
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-10",
    readingTime: 5,
    seoTitle: "Negocios en Panamá: un enfoque responsable",
    seoDescription:
      "Cómo acercarte al entorno de negocios en Panamá: instituciones oficiales, asesoría profesional y señales de alerta.",
    status: "demo",
  },
  {
    translationKey: "entorno-negocios",
    locale: "en",
    title: "Doing business in Panama: a responsible approach",
    slug: "business-environment-responsible-approach",
    excerpt:
      "Before investing or starting a venture, identify the official institutions and seek independent professional advice.",
    body: [
      {
        type: "p",
        text: "Exploring business opportunities in another country takes time, verified information and professional support. This guide offers no figures, returns or tax advantages: it suggests a method for getting properly informed.",
      },
      { type: "h2", text: "A three-step approach" },
      {
        type: "ul",
        items: [
          "Identify the official institutions related to your activity, such as the Ministry of Commerce and Industries (MICI).",
          "Consult official sector data from sources such as the National Institute of Statistics and Census (INEC).",
          "Hire independent legal and accounting advice before committing resources.",
        ],
      },
      { type: "h2", text: "Warning signs" },
      {
        type: "p",
        text: "Be wary of promises of guaranteed returns, pressure to decide quickly or offers without verifiable documentation.",
      },
      {
        type: "note",
        text: "Regulations change. This content is not legal, tax or financial advice. Always verify with the relevant institutions and qualified professionals.",
      },
    ],
    section: "invertir",
    category: "entorno-negocios",
    location: "Panamá (nacional)",
    coverImage: cover("bahia", "en"),
    author: AUTHOR.en,
    sources: [SRC.mici, SRC.inec],
    sensitive: true,
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-10",
    readingTime: 5,
    seoTitle: "Doing business in Panama: a responsible approach",
    seoDescription:
      "How to approach Panama's business environment: official institutions, professional advice and warning signs.",
    status: "demo",
  },
];
