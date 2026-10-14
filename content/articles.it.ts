import type { Article, ContentImage, Source } from "@/types/content";

/**
 * Italian DEMO editorial content — translation of the `locale: "es"` items in
 * content/articles.ts. Every item is `status: "demo"`. Same translationKey,
 * dates, categories, images and sources as the Spanish originals.
 */

const CONSULTED = "2026-10-14";
const AUTHOR = "Redazione Tu Destino es Panamá";

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

const IMAGES: Record<ImageKey, { src: string; alt: string; credit: string }> = {
  bahia: {
    src: "/images/panama-city-bahia-aerea.webp",
    alt: "Veduta aerea del distretto finanziario di Ciudad de Panamá e della baia lungo la Cinta Costera",
    credit: "Dronepicr, CC BY 3.0, via Wikimedia Commons",
  },
  canal: {
    src: "/images/canal-esclusas-miraflores.webp",
    alt: "Due navi in transito nelle chiuse di Miraflores del Canale di Panamá",
    credit: "U.S. Department of State, pubblico dominio, via Wikimedia Commons",
  },
  casco: {
    src: "/images/casco-antiguo-fachada.webp",
    alt: "Facciata coloniale con balconi nel Casco Antiguo di Ciudad de Panamá",
    credit: "David Broad, CC BY 3.0, via Wikimedia Commons",
  },
  skyline: {
    src: "/images/skyline-cinta-costera.webp",
    alt: "Skyline di Ciudad de Panamá e la Cinta Costera",
    credit: "dronepicr, CC BY 2.0, via Wikimedia Commons",
  },
  gunaYala: {
    src: "/images/guna-yala-isla.webp",
    alt: "Piccola isola con palme e capanne a Guna Yala",
    credit: "Ayaita, CC BY 3.0, via Wikimedia Commons",
  },
};

function cover(key: ImageKey): ContentImage {
  const img = IMAGES[key];
  return { src: img.src, alt: img.alt, width: 1600, height: 1000, credit: img.credit };
}

export const articlesIt: Article[] = [
  // ───────────────────────── DESCUBRE ─────────────────────────
  {
    translationKey: "regiones-de-panama",
    locale: "it",
    title: "Le regioni di Panamá: un primo sguardo",
    slug: "regioni-di-panama",
    excerpt:
      "Panamá è organizzata in province e comarcas indigene. Un'introduzione per orientarti prima di scegliere cosa scoprire per primo.",
    body: [
      {
        type: "p",
        text: "Panamá è un paese di contrasti racchiuso in un territorio stretto, con coste sul mar dei Caraibi e sull'oceano Pacifico. Capire come è organizzato il suo territorio è un ottimo punto di partenza per pianificare qualsiasi visita o progetto.",
      },
      { type: "h2", text: "Province e comarcas indigene" },
      {
        type: "p",
        text: "Il paese è organizzato in province e comarcas indigene. Le comarcas sono territori con forme di organizzazione proprie, legate ai popoli originari che le abitano.",
      },
      {
        type: "ul",
        items: [
          "Aree urbane come Ciudad de Panamá, con la sua vita commerciale e culturale.",
          "Altopiani e valli nell'entroterra del paese.",
          "Litorali sui Caraibi e sul Pacifico, con isole e arcipelaghi.",
        ],
      },
      {
        type: "p",
        text: "Il Canale di Panamá, che collega l'oceano Atlantico al Pacifico, attraversa l'istmo ed è un riferimento imprescindibile per comprendere la geografia del paese.",
      },
      {
        type: "note",
        text: "Per i dati ufficiali sulla divisione territoriale e sulla popolazione, consulta le pubblicazioni aggiornate dell'Instituto Nacional de Estadística y Censo.",
      },
    ],
    section: "descubre",
    category: "regiones",
    location: "Panamá (nazionale)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTime: 4,
    seoTitle: "Regioni di Panamá: province e comarcas indigene",
    seoDescription:
      "Un'introduzione a come è organizzato il territorio panamense, tra province, comarcas indigene e due coste.",
    status: "demo",
  },
  {
    translationKey: "casco-antiguo",
    locale: "it",
    title: "Casco Antiguo: il quartiere storico di Ciudad de Panamá",
    slug: "casco-antiguo-patrimonio-storico",
    excerpt:
      "Strade, piazze e balconi che raccontano una parte della storia della città. Consigli per visitarlo con calma e rispetto.",
    body: [
      {
        type: "p",
        text: "Il Casco Antiguo, conosciuto anche come Casco Viejo, è il quartiere storico di Ciudad de Panamá. Le sue facciate con balconi, le sue chiese e le sue piazze invitano a esplorarlo a piedi, senza fretta.",
      },
      { type: "h2", text: "Un quartiere vivo" },
      {
        type: "p",
        text: "Oltre al suo valore storico, il Casco Antiguo è un quartiere in cui le persone vivono e lavorano. Visitarlo nel rispetto dei suoi residenti fa parte dell'esperienza.",
      },
      {
        type: "ul",
        items: [
          "Passeggia di primo mattino o nel tardo pomeriggio per goderti le piazze.",
          "Osserva l'architettura: balconi, cortili e dettagli delle facciate.",
          "Rispetta gli spazi privati e le regole dei luoghi religiosi.",
        ],
      },
      {
        type: "note",
        text: "Per conoscere il riconoscimento patrimoniale del sito e la sua descrizione ufficiale, consulta direttamente il portale del Patrimonio Mondiale dell'UNESCO.",
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
    seoTitle: "Casco Antiguo di Panamá: storia e patrimonio",
    seoDescription:
      "Scopri il Casco Antiguo, il quartiere storico di Ciudad de Panamá: architettura, piazze e consigli per visitarlo con rispetto.",
    status: "demo",
  },
  {
    translationKey: "naturaleza-dos-costas",
    locale: "it",
    title: "Natura tra due coste: foresta, Pacifico e Caraibi",
    slug: "natura-tra-due-coste",
    excerpt:
      "Foreste tropicali, spiagge e paesaggi marini in un unico paese. Idee per avvicinarti alla natura panamense in modo responsabile.",
    body: [
      {
        type: "p",
        text: "Panamá ha coste sull'oceano Pacifico e sul mar dei Caraibi, e buona parte del suo territorio è coperta da foresta tropicale. Questa combinazione dà vita a paesaggi molto diversi a distanze relativamente brevi.",
      },
      { type: "h2", text: "Due litorali, due atmosfere" },
      {
        type: "p",
        text: "Il Pacifico e i Caraibi offrono esperienze diverse: cambiano il paesaggio, il clima locale e la vita quotidiana delle comunità costiere. Vale la pena informarti su ciascuna zona prima di scegliere la tua destinazione.",
      },
      { type: "h2", text: "Visitare la foresta in modo responsabile" },
      {
        type: "ul",
        items: [
          "Informati sulle aree protette e sulle loro regole di visita.",
          "Valuta di percorrere i sentieri con guide locali.",
          "Non prelevare piante né animali, e porta via i tuoi rifiuti.",
        ],
      },
      {
        type: "note",
        text: "Le condizioni di accesso a parchi e aree protette possono cambiare. Consulta informazioni ufficiali e aggiornate prima della tua visita.",
      },
    ],
    section: "descubre",
    category: "naturaleza",
    location: "Panamá (nazionale)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.promtur],
    sensitive: false,
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingTime: 5,
    seoTitle: "Natura a Panamá: foresta, Pacifico e Caraibi",
    seoDescription:
      "Foresta tropicale e due coste, Pacifico e Caraibi: idee per scoprire la natura di Panamá in modo responsabile.",
    status: "demo",
  },
  {
    translationKey: "guna-yala",
    locale: "it",
    title: "Guna Yala: isole caraibiche e cultura guna",
    slug: "guna-yala-isole",
    excerpt:
      "La comarca di Guna Yala e le sue isole, conosciute anche come San Blas. Come pianificare una visita rispettosa della comunità.",
    body: [
      {
        type: "p",
        text: "Guna Yala è una comarca indigena sulla costa caraibica di Panamá, abitata dal popolo guna. Le sue isole, conosciute anche come arcipelago di San Blas, sono tra i paesaggi più riconoscibili del paese.",
      },
      { type: "h2", text: "Un territorio con una propria organizzazione" },
      {
        type: "p",
        text: "Visitare Guna Yala significa entrare in un territorio con autorità e regole proprie. L'esperienza è più preziosa quando viene pianificata nel rispetto della cultura e delle decisioni della comunità.",
      },
      {
        type: "ul",
        items: [
          "Informati in anticipo sulle condizioni di accesso in vigore.",
          "Privilegia i servizi offerti dalla comunità stessa.",
          "Chiedi il permesso prima di fotografare le persone.",
          "Riduci i tuoi rifiuti: le isole sono ecosistemi fragili.",
        ],
      },
      {
        type: "note",
        text: "Le condizioni di visita possono cambiare. Verifica le informazioni con fonti ufficiali e con operatori autorizzati prima di partire.",
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
    seoTitle: "Guna Yala (San Blas): isole e cultura guna",
    seoDescription:
      "Guna Yala, comarca indigena dei Caraibi panamensi: come pianificare una visita alle sue isole nel rispetto della comunità guna.",
    status: "demo",
  },

  // ───────────────────────── VIVIR ─────────────────────────
  {
    translationKey: "primeros-pasos",
    locale: "it",
    title: "Primi passi per trasferirti a Panamá: le domande da preparare",
    slug: "primi-passi-trasferirsi-panama",
    excerpt:
      "Prima di pianificare un trasloco, conviene mettere in ordine le tue domande e individuare quali istituzioni sono competenti per il tuo caso.",
    body: [
      {
        type: "p",
        text: "Trasferirsi in un altro paese comporta decisioni personali, familiari e amministrative. Questa guida non descrive pratiche né requisiti: ti aiuta a preparare le domande giuste da porre alle fonti ufficiali.",
      },
      { type: "h2", text: "Individua l'istituzione competente" },
      {
        type: "p",
        text: "Prima di pianificare, individua quale istituzione è competente per la tua situazione e consulta le sue informazioni aggiornate. Per le questioni migratorie, il riferimento è il Servicio Nacional de Migración.",
      },
      { type: "h2", text: "Domande da preparare" },
      {
        type: "ul",
        items: [
          "Qual è lo scopo del mio soggiorno e quale istituzione si occupa di questo caso?",
          "Quali documenti del mio paese d'origine potrebbero essermi richiesti e come si legalizzano?",
          "Ho bisogno di una consulenza professionale indipendente per la mia situazione specifica?",
          "Dove posso verificare che le informazioni che leggo siano aggiornate?",
        ],
      },
      {
        type: "note",
        text: "Condizioni e norme cambiano. Questo contenuto ha valore orientativo e non costituisce consulenza legale né migratoria. Verifica sempre con l'istituzione ufficiale e, se necessario, con un professionista abilitato.",
      },
    ],
    section: "vivir",
    category: "primeros-pasos",
    location: "Panamá (nazionale)",
    coverImage: cover("skyline"),
    author: AUTHOR,
    sources: [SRC.migracion, SRC.minsa],
    sensitive: true,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-15",
    readingTime: 6,
    seoTitle: "Trasferirsi a Panamá: le domande prima di iniziare",
    seoDescription:
      "Quali domande preparare e quali istituzioni ufficiali consultare prima di pianificare un trasferimento a Panamá. Guida orientativa.",
    status: "demo",
  },
  {
    translationKey: "vivienda",
    locale: "it",
    title: "Cercare casa a Panamá: cosa verificare prima di decidere",
    slug: "cercare-casa-panama",
    excerpt:
      "Zona, trasporti, servizi e contratto: un elenco di aspetti da valutare con calma prima di affittare o acquistare.",
    body: [
      {
        type: "p",
        text: "Scegliere dove vivere è una delle prime decisioni quando si arriva in un paese. Più che consigliare zone o prezzi, questa guida suggerisce quali aspetti verificare per prendere una decisione informata.",
      },
      { type: "h2", text: "Aspetti da valutare" },
      {
        type: "ul",
        items: [
          "Vicinanza al luogo di lavoro, alle scuole e ai servizi sanitari.",
          "Opzioni di trasporto disponibili nella zona.",
          "Servizi di base: acqua, elettricità, internet.",
          "Condizioni del contratto e chi risponde di ciascuna spesa.",
        ],
      },
      { type: "h2", text: "Prima di firmare" },
      {
        type: "p",
        text: "Leggi attentamente il contratto, visita l'immobile di persona e, in caso di dubbi, rivolgiti a una consulenza professionale indipendente. Diffida delle offerte che ti chiedono pagamenti senza un documento chiaro.",
      },
      {
        type: "note",
        text: "Le condizioni di mercato e le norme cambiano. Questo contenuto ha valore orientativo e non costituisce consulenza legale né immobiliare.",
      },
    ],
    section: "vivir",
    category: "vivienda",
    location: "Panamá (nazionale)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.inec],
    sensitive: false,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    readingTime: 5,
    seoTitle: "Cercare casa a Panamá: la lista di controllo",
    seoDescription:
      "Cosa verificare prima di affittare o acquistare casa a Panamá: posizione, trasporti, servizi e contratto. Guida orientativa.",
    status: "demo",
  },
  {
    translationKey: "salud",
    locale: "it",
    title: "Salute a Panamá: le domande per preparare il tuo arrivo",
    slug: "salute-domande-arrivo",
    excerpt:
      "Come organizzare le tue domande su assistenza medica, copertura e requisiti sanitari, e dove verificarle.",
    body: [
      {
        type: "p",
        text: "La salute è una priorità quando si pianifica un lungo soggiorno in un altro paese. Questa guida non fornisce informazioni mediche né descrive coperture: ti aiuta a preparare le domande e a individuare le fonti ufficiali.",
      },
      { type: "h2", text: "Domande utili" },
      {
        type: "ul",
        items: [
          "Di quale copertura sanitaria ho bisogno in base alla mia situazione e come posso verificarla?",
          "Esistono raccomandazioni sanitarie in vigore per i viaggiatori?",
          "Dove si trovano i centri di assistenza più vicini alla zona in cui vivrò?",
          "Come gestisco la continuità di una terapia che sto già seguendo?",
        ],
      },
      { type: "h2", text: "Dove verificare" },
      {
        type: "p",
        text: "Prima di pianificare, individua quale istituzione è competente e consulta le sue informazioni aggiornate. Il Ministerio de Salud è il riferimento per le disposizioni sanitarie del paese.",
      },
      {
        type: "note",
        text: "Le disposizioni sanitarie cambiano. Questo contenuto non costituisce un consiglio medico né legale. Consulta sempre le fonti ufficiali e i professionisti sanitari.",
      },
    ],
    section: "vivir",
    category: "salud",
    location: "Panamá (nazionale)",
    coverImage: cover("casco"),
    author: AUTHOR,
    sources: [SRC.minsa, SRC.migracion],
    sensitive: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-29",
    readingTime: 5,
    seoTitle: "Salute a Panamá: cosa chiedere prima di arrivare",
    seoDescription:
      "Domande su assistenza medica e copertura per preparare il tuo arrivo a Panamá, e fonti ufficiali dove verificarle.",
    status: "demo",
  },
  {
    translationKey: "transporte",
    locale: "it",
    title: "Spostarsi a Panamá: cosa sapere sui trasporti",
    slug: "spostarsi-a-panama",
    excerpt:
      "Trasporto pubblico, guida e spostamenti tra le regioni: domande da chiarire con le fonti ufficiali.",
    body: [
      {
        type: "p",
        text: "Il modo in cui ti sposti influisce su dove decidi di vivere e su come organizzi la tua giornata. Questa guida suggerisce su cosa informarti, senza descrivere pratiche né requisiti.",
      },
      { type: "h2", text: "Domande da chiarire" },
      {
        type: "ul",
        items: [
          "Quali opzioni di trasporto pubblico ci sono nella zona in cui vivrò?",
          "Se voglio guidare, quale istituzione fornisce informazioni sulle patenti e sulla loro validità?",
          "Come pianifico i viaggi tra le province e verso altre regioni?",
        ],
      },
      {
        type: "p",
        text: "Per le questioni di traffico e guida, il riferimento è l'Autoridad de Tránsito y Transporte Terrestre. Consulta le sue informazioni aggiornate prima di prendere decisioni.",
      },
      {
        type: "note",
        text: "Le norme sul traffico e le condizioni dei trasporti cambiano. Questo contenuto ha valore orientativo e non costituisce consulenza legale.",
      },
    ],
    section: "vivir",
    category: "transporte",
    location: "Panamá (nazionale)",
    coverImage: cover("canal"),
    author: AUTHOR,
    sources: [SRC.attt],
    sensitive: false,
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    readingTime: 4,
    seoTitle: "Trasporti a Panamá: cosa sapere",
    seoDescription:
      "Domande su trasporto pubblico, guida e viaggi tra le regioni di Panamá, e dove verificarle con fonti ufficiali.",
    status: "demo",
  },

  // ───────────────────────── INVERTIR ─────────────────────────
  {
    translationKey: "entorno-negocios",
    locale: "it",
    title: "Il contesto imprenditoriale a Panamá: come avvicinarsi in modo responsabile",
    slug: "contesto-imprenditoriale-approccio-responsabile",
    excerpt:
      "Prima di investire o avviare un'attività, individua le istituzioni ufficiali e rivolgiti a una consulenza professionale indipendente.",
    body: [
      {
        type: "p",
        text: "Esplorare opportunità di business in un altro paese richiede tempo, informazioni verificate e un accompagnamento professionale. Questa guida non offre cifre, rendimenti né vantaggi fiscali: propone un metodo per informarti bene.",
      },
      { type: "h2", text: "Un approccio in tre passi" },
      {
        type: "ul",
        items: [
          "Individua le istituzioni ufficiali legate alla tua attività, come il Ministerio de Comercio e Industrias.",
          "Consulta i dati ufficiali del settore in fonti come l'Instituto Nacional de Estadística y Censo.",
          "Affidati a una consulenza legale e contabile indipendente prima di impegnare risorse.",
        ],
      },
      { type: "h2", text: "Segnali d'allarme" },
      {
        type: "p",
        text: "Diffida delle promesse di rendimenti garantiti, delle pressioni a decidere in fretta o delle offerte prive di documentazione verificabile.",
      },
      {
        type: "note",
        text: "Le norme cambiano. Questo contenuto non costituisce consulenza legale, fiscale né finanziaria. Verifica sempre con le istituzioni competenti e con professionisti abilitati.",
      },
    ],
    section: "invertir",
    category: "entorno-negocios",
    location: "Panamá (nazionale)",
    coverImage: cover("bahia"),
    author: AUTHOR,
    sources: [SRC.mici, SRC.inec],
    sensitive: true,
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-10",
    readingTime: 5,
    seoTitle: "Fare business a Panamá: un approccio responsabile",
    seoDescription:
      "Come avvicinarti al contesto imprenditoriale di Panamá: istituzioni ufficiali, consulenza professionale e segnali d'allarme.",
    status: "demo",
  },
];
