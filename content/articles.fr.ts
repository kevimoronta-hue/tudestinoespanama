import type { Article, ContentImage, Source } from "@/types/content";

/**
 * DEMO editorial content — French versions of the `locale: "es"` items in
 * content/articles.ts. Every item is `status: "demo"`.
 * Texts deliberately avoid figures, legal facts, procedures, timelines and costs.
 * Sources keep their original (Spanish) proper names.
 */

const CONSULTED = "2026-10-14";
const AUTHOR = "Équipe éditoriale Tu Destino es Panamá";

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
    alt: "Vue aérienne du quartier financier de la ville de Panama et de la baie au coucher du soleil",
  },
  canal: {
    src: "/images/canal-esclusas-miraflores.webp",
    alt: "Porte-conteneurs franchissant les écluses de Miraflores du canal de Panama",
  },
  casco: {
    src: "/images/casco-antiguo-fachada.webp",
    alt: "Façade coloniale à balcons dans le Casco Antiguo de la ville de Panama",
  },
  skyline: {
    src: "/images/skyline-cinta-costera.webp",
    alt: "Silhouette de la ville de Panama et la Cinta Costera",
  },
  gunaYala: {
    src: "/images/guna-yala-isla.webp",
    alt: "Plage de sable blanc bordée de palmiers dans les îles de Guna Yala (San Blas)",
  },
};

function cover(key: ImageKey): ContentImage {
  const img = IMAGES[key];
  return { src: img.src, alt: img.alt, width: 2560, height: 1600 };
}

export const articlesFr: Article[] = [
  // ───────────────────────── DESCUBRE ─────────────────────────
  {
    translationKey: "regiones-de-panama",
    locale: "fr",
    title: "Les régions du Panama : un premier regard",
    slug: "regions-du-panama",
    excerpt:
      "Le Panama s'organise en provinces et en comarcas indigènes. Une introduction pour vous repérer avant de choisir ce que vous découvrirez en premier.",
    body: [
      {
        type: "p",
        text: "Le Panama est un pays de contrastes sur un territoire étroit, bordé à la fois par la mer des Caraïbes et par l'océan Pacifique. Comprendre l'organisation de son territoire est un excellent point de départ pour préparer un voyage ou un projet.",
      },
      { type: "h2", text: "Provinces et comarcas indigènes" },
      {
        type: "p",
        text: "Le pays s'organise en provinces et en comarcas indigènes. Les comarcas sont des territoires dotés de leurs propres formes d'organisation, liées aux peuples autochtones qui y vivent.",
      },
      {
        type: "ul",
        items: [
          "Des zones urbaines comme la ville de Panama, avec son activité commerciale et culturelle.",
          "Des hautes terres et des vallées à l'intérieur du pays.",
          "Des littoraux sur la mer des Caraïbes et sur le Pacifique, avec leurs îles et leurs archipels.",
        ],
      },
      {
        type: "p",
        text: "Le canal de Panama, qui relie l'océan Atlantique au Pacifique, traverse l'isthme : c'est un repère incontournable pour comprendre la géographie du pays.",
      },
      {
        type: "note",
        text: "Pour obtenir des données officielles sur le découpage territorial et la population, consultez les publications en vigueur de l'Instituto Nacional de Estadística y Censo.",
      },
    ],
    section: "descubre",
    category: "regiones",
    location: "Panamá (national)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTime: 4,
    seoTitle: "Régions du Panama : provinces et comarcas indigènes",
    seoDescription:
      "Une introduction à l'organisation du territoire panaméen, entre provinces, comarcas indigènes et deux littoraux.",
    status: "demo",
  },
  {
    translationKey: "casco-antiguo",
    locale: "fr",
    title: "Casco Antiguo : le quartier historique de la ville de Panama",
    slug: "casco-antiguo-patrimoine",
    excerpt:
      "Des rues, des places et des balcons qui racontent une part de l'histoire de la ville. Quelques clés pour le parcourir sans hâte et avec respect.",
    body: [
      {
        type: "p",
        text: "Le Casco Antiguo, également appelé Casco Viejo, est le quartier historique de la ville de Panama. Ses façades à balcons, ses églises et ses places invitent à la flânerie, à pied et sans se presser.",
      },
      { type: "h2", text: "Un quartier bien vivant" },
      {
        type: "p",
        text: "Au-delà de sa valeur historique, le Casco Antiguo est un quartier où l'on vit et où l'on travaille. Le parcourir dans le respect de ses habitants fait partie intégrante de l'expérience.",
      },
      {
        type: "ul",
        items: [
          "Promenez-vous tôt le matin ou en fin d'après-midi pour profiter des places.",
          "Prenez le temps d'observer l'architecture : balcons, patios et détails des façades.",
          "Respectez les espaces privés et les règles des lieux de culte.",
        ],
      },
      {
        type: "note",
        text: "Pour connaître la reconnaissance patrimoniale du site et sa description officielle, consultez directement le portail du Patrimoine mondial de l'UNESCO.",
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
    seoTitle: "Casco Antiguo de Panama : histoire et patrimoine",
    seoDescription:
      "Parcourez le Casco Antiguo, quartier historique de la ville de Panama : architecture, places et conseils pour le visiter avec respect.",
    status: "demo",
  },
  {
    translationKey: "naturaleza-dos-costas",
    locale: "fr",
    title: "Une nature entre deux côtes : forêt tropicale, Pacifique et Caraïbes",
    slug: "nature-entre-deux-cotes",
    excerpt:
      "Forêts tropicales, plages et paysages marins réunis dans un même pays. Des idées pour aller à la rencontre de la nature panaméenne de façon responsable.",
    body: [
      {
        type: "p",
        text: "Le Panama possède des côtes sur l'océan Pacifique et sur la mer des Caraïbes, et une grande partie de son territoire est couverte de forêt tropicale. Cette combinaison offre des paysages très différents sur des distances relativement courtes.",
      },
      { type: "h2", text: "Deux littoraux, deux ambiances" },
      {
        type: "p",
        text: "Le Pacifique et les Caraïbes proposent des expériences différentes : le paysage, le climat local et la vie quotidienne des communautés côtières changent de l'un à l'autre. Mieux vaut vous renseigner sur chaque zone avant de choisir votre destination.",
      },
      { type: "h2", text: "Visiter la forêt de façon responsable" },
      {
        type: "ul",
        items: [
          "Renseignez-vous sur les aires protégées et leurs règles de visite.",
          "Pensez à parcourir les sentiers avec des guides locaux.",
          "Ne prélevez ni plantes ni animaux, et remportez vos déchets.",
        ],
      },
      {
        type: "note",
        text: "Les conditions d'accès aux parcs et aux aires protégées peuvent changer. Consultez des informations officielles et à jour avant votre visite.",
      },
    ],
    section: "descubre",
    category: "naturaleza",
    location: "Panamá (national)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingTime: 5,
    seoTitle: "Nature au Panama : forêt tropicale, Pacifique et Caraïbes",
    seoDescription:
      "Forêt tropicale et deux littoraux, Pacifique et Caraïbes : des idées pour découvrir la nature du Panama de façon responsable.",
    status: "demo",
  },
  {
    translationKey: "guna-yala",
    locale: "fr",
    title: "Guna Yala : îles des Caraïbes et culture guna",
    slug: "guna-yala-iles",
    excerpt:
      "La comarca de Guna Yala et ses îles, également connues sous le nom de San Blas. Comment préparer une visite respectueuse de la communauté.",
    body: [
      {
        type: "p",
        text: "Guna Yala est une comarca indigène située sur la côte caraïbe du Panama, habitée par le peuple guna. Ses îles, également connues sous le nom d'archipel de San Blas, comptent parmi les paysages les plus emblématiques du pays.",
      },
      { type: "h2", text: "Un territoire doté de sa propre organisation" },
      {
        type: "p",
        text: "Visiter Guna Yala, c'est entrer sur un territoire qui a ses propres autorités et ses propres règles. L'expérience n'en est que plus précieuse lorsqu'elle est préparée dans le respect de la culture et des décisions de la communauté.",
      },
      {
        type: "ul",
        items: [
          "Renseignez-vous à l'avance sur les conditions d'accès en vigueur.",
          "Privilégiez les services proposés par la communauté elle-même.",
          "Demandez l'autorisation avant de photographier des personnes.",
          "Réduisez vos déchets : les îles sont des écosystèmes fragiles.",
        ],
      },
      {
        type: "note",
        text: "Les conditions de visite peuvent changer. Vérifiez les informations auprès de sources officielles et d'opérateurs agréés avant de partir.",
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
    seoTitle: "Guna Yala (San Blas) : îles et culture guna",
    seoDescription:
      "Guna Yala, comarca indigène des Caraïbes panaméennes : comment préparer une visite de ses îles dans le respect de la communauté guna.",
    status: "demo",
  },

  // ───────────────────────── VIVIR ─────────────────────────
  {
    translationKey: "primeros-pasos",
    locale: "fr",
    title: "Premiers pas pour s'installer au Panama : les questions à préparer",
    slug: "premiers-pas-installation-panama",
    excerpt:
      "Avant de planifier un déménagement, mieux vaut mettre de l'ordre dans vos questions et identifier les institutions compétentes pour votre situation.",
    body: [
      {
        type: "p",
        text: "S'installer dans un autre pays implique des décisions personnelles, familiales et administratives. Ce guide ne décrit ni démarches ni exigences : il vous aide à préparer les bonnes questions à poser aux sources officielles.",
      },
      { type: "h2", text: "Identifiez l'institution compétente" },
      {
        type: "p",
        text: "Avant de planifier, identifiez l'institution compétente pour votre situation et consultez ses informations en vigueur. Pour les questions migratoires, la référence est le Servicio Nacional de Migración.",
      },
      { type: "h2", text: "Les questions à préparer" },
      {
        type: "ul",
        items: [
          "Quel est l'objet de mon séjour, et quelle institution traite ce type de situation ?",
          "Quels documents de mon pays d'origine pourraient m'être demandés, et comment les légaliser ?",
          "Ai-je besoin d'un conseil professionnel indépendant pour ma situation particulière ?",
          "Où puis-je vérifier que les informations que je lis sont à jour ?",
        ],
      },
      {
        type: "note",
        text: "Les conditions et les réglementations évoluent. Ce contenu est fourni à titre indicatif et ne constitue pas un conseil juridique ni migratoire. Vérifiez toujours auprès de l'institution officielle et, si nécessaire, auprès d'un professionnel habilité.",
      },
    ],
    section: "vivir",
    category: "primeros-pasos",
    location: "Panamá (national)",
    coverImage: cover("skyline"),
    author: AUTHOR,
    sources: [SRC.migracion, SRC.minsa],
    sensitive: true,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-15",
    readingTime: 6,
    seoTitle: "S'installer au Panama : les questions avant de commencer",
    seoDescription:
      "Quelles questions préparer et quelles institutions officielles consulter avant de planifier une installation au Panama. Guide indicatif.",
    status: "demo",
  },
  {
    translationKey: "vivienda",
    locale: "fr",
    title: "Trouver un logement au Panama : ce qu'il faut vérifier avant de décider",
    slug: "trouver-logement-panama",
    excerpt:
      "Quartier, transports, services et contrat : une liste de points à examiner sereinement avant de louer ou d'acheter.",
    body: [
      {
        type: "p",
        text: "Choisir où vivre est l'une des premières décisions à prendre en arrivant dans un pays. Plutôt que de recommander des quartiers ou des prix, ce guide vous propose les points à examiner pour décider en connaissance de cause.",
      },
      { type: "h2", text: "Les points à évaluer" },
      {
        type: "ul",
        items: [
          "La proximité de votre lieu de travail, des établissements scolaires et des services de santé.",
          "Les options de transport disponibles dans le quartier.",
          "Les services de base : eau, électricité, internet.",
          "Les conditions du contrat et la répartition de chaque dépense.",
        ],
      },
      { type: "h2", text: "Avant de signer" },
      {
        type: "p",
        text: "Lisez attentivement le contrat, visitez le logement en personne et, en cas de doute, faites appel à un conseil professionnel indépendant. Méfiez-vous des offres qui exigent un paiement sans document clair.",
      },
      {
        type: "note",
        text: "Les conditions du marché et les réglementations évoluent. Ce contenu est fourni à titre indicatif et ne constitue pas un conseil juridique ni immobilier.",
      },
    ],
    section: "vivir",
    category: "vivienda",
    location: "Panamá (national)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    readingTime: 5,
    seoTitle: "Trouver un logement au Panama : la liste à vérifier",
    seoDescription:
      "Ce qu'il faut vérifier avant de louer ou d'acheter un logement au Panama : emplacement, transports, services et contrat. Guide indicatif.",
    status: "demo",
  },
  {
    translationKey: "salud",
    locale: "fr",
    title: "La santé au Panama : les questions à préparer avant votre arrivée",
    slug: "sante-questions-avant-arrivee",
    excerpt:
      "Comment organiser vos questions sur les soins médicaux, la couverture et les exigences sanitaires, et où les vérifier.",
    body: [
      {
        type: "p",
        text: "La santé est une priorité lorsque l'on prépare un long séjour dans un autre pays. Ce guide ne fournit pas d'informations médicales et ne décrit aucune couverture : il vous aide à préparer vos questions et à identifier les sources officielles.",
      },
      { type: "h2", text: "Des questions utiles" },
      {
        type: "ul",
        items: [
          "De quelle couverture santé ai-je besoin selon ma situation, et comment la vérifier ?",
          "Existe-t-il des recommandations sanitaires en vigueur pour les voyageurs ?",
          "Où se trouvent les centres de soins les plus proches du quartier où je vivrai ?",
          "Comment assurer la continuité d'un traitement que je suis déjà ?",
        ],
      },
      { type: "h2", text: "Où vérifier" },
      {
        type: "p",
        text: "Avant de planifier, identifiez l'institution compétente et consultez ses informations en vigueur. Le Ministerio de Salud est la référence pour les dispositions sanitaires du pays.",
      },
      {
        type: "note",
        text: "Les dispositions sanitaires évoluent. Ce contenu ne constitue pas un conseil médical ni juridique. Consultez toujours les sources officielles et des professionnels de santé.",
      },
    ],
    section: "vivir",
    category: "salud",
    location: "Panamá (national)",
    coverImage: cover("casco"),
    author: AUTHOR,
    sources: [SRC.minsa, SRC.migracion],
    sensitive: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-29",
    readingTime: 5,
    seoTitle: "Santé au Panama : que demander avant d'arriver",
    seoDescription:
      "Questions sur les soins et la couverture santé pour préparer votre arrivée au Panama, et sources officielles où les vérifier.",
    status: "demo",
  },
  {
    translationKey: "transporte",
    locale: "fr",
    title: "Se déplacer au Panama : ce qu'il faut savoir sur les transports",
    slug: "se-deplacer-au-panama",
    excerpt:
      "Transports en commun, conduite et trajets entre régions : des questions à éclaircir auprès des sources officielles.",
    body: [
      {
        type: "p",
        text: "Votre façon de vous déplacer influence l'endroit où vous choisirez de vivre et l'organisation de vos journées. Ce guide vous suggère ce qu'il faut vous renseigner, sans décrire de démarches ni d'exigences.",
      },
      { type: "h2", text: "Les questions à éclaircir" },
      {
        type: "ul",
        items: [
          "Quelles options de transports en commun existent dans le quartier où je vivrai ?",
          "Si je veux conduire, quelle institution informe sur les permis de conduire et leur validité ?",
          "Comment organiser mes trajets entre provinces et vers d'autres régions ?",
        ],
      },
      {
        type: "p",
        text: "Pour les questions de circulation et de conduite, la référence est l'Autoridad de Tránsito y Transporte Terrestre. Consultez ses informations en vigueur avant de prendre vos décisions.",
      },
      {
        type: "note",
        text: "Les règles de circulation et les conditions de transport évoluent. Ce contenu est fourni à titre indicatif et ne constitue pas un conseil juridique.",
      },
    ],
    section: "vivir",
    category: "transporte",
    location: "Panamá (national)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.attt],
    sensitive: false,
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    readingTime: 4,
    seoTitle: "Transports au Panama : ce qu'il faut savoir",
    seoDescription:
      "Questions sur les transports en commun, la conduite et les trajets entre régions au Panama, et où les vérifier officiellement.",
    status: "demo",
  },

  // ───────────────────────── INVERTIR ─────────────────────────
  {
    translationKey: "entorno-negocios",
    locale: "fr",
    title: "L'environnement des affaires au Panama : une approche responsable",
    slug: "environnement-affaires-approche-responsable",
    excerpt:
      "Avant d'investir ou d'entreprendre, identifiez les institutions officielles et faites appel à un conseil professionnel indépendant.",
    body: [
      {
        type: "p",
        text: "Explorer des opportunités d'affaires dans un autre pays demande du temps, des informations vérifiées et un accompagnement professionnel. Ce guide ne donne ni chiffres, ni rendements, ni avantages fiscaux : il propose une méthode pour bien vous informer.",
      },
      { type: "h2", text: "Une approche en trois étapes" },
      {
        type: "ul",
        items: [
          "Identifiez les institutions officielles liées à votre activité, comme le Ministerio de Comercio e Industrias.",
          "Consultez les données officielles du secteur auprès de sources telles que l'Instituto Nacional de Estadística y Censo.",
          "Faites appel à un conseil juridique et comptable indépendant avant d'engager des ressources.",
        ],
      },
      { type: "h2", text: "Signaux d'alerte" },
      {
        type: "p",
        text: "Méfiez-vous des promesses de rendement garanti, des pressions pour décider rapidement et des offres sans documentation vérifiable.",
      },
      {
        type: "note",
        text: "Les réglementations évoluent. Ce contenu ne constitue pas un conseil juridique, fiscal ni financier. Vérifiez toujours auprès des institutions compétentes et de professionnels habilités.",
      },
    ],
    section: "invertir",
    category: "entorno-negocios",
    location: "Panamá (national)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.mici, SRC.inec],
    sensitive: true,
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-10",
    readingTime: 5,
    seoTitle: "Affaires au Panama : une approche responsable",
    seoDescription:
      "Comment aborder l'environnement des affaires au Panama : institutions officielles, conseil professionnel et signaux d'alerte.",
    status: "demo",
  },
];
