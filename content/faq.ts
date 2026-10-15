import type { Locale, RouteKey } from "@/lib/i18n";

/**
 * FAQ — single source of truth for the FAQ section AND the assistant's knowledge
 * (lib/assistant/knowledge.ts). Answers only restate what the site already says
 * (dictionaries, Vivir/Invertir pages, referenced official institutions). No visas,
 * tax advantages, returns, deadlines, prices or legal procedures are stated here.
 * Edit an answer here and both the page and the assistant follow.
 */
export interface FaqEntry {
  id: string;
  q: string;
  a: string[];
  /** Site sections the answer points to (rendered as links, also offered by the assistant). */
  links?: RouteKey[];
  /** Show the WhatsApp contact next to this answer. */
  whatsapp?: boolean;
  /** Show the official institutions next to this answer. */
  institutions?: boolean;
}

const es: FaqEntry[] = [
  {
    id: "descubrir",
    q: "¿Qué puedo descubrir en Panamá?",
    a: [
      "Ciudades, paisajes, cultura y formas de vivir. En Ciudad de Panamá, la bahía, el Casco Antiguo con sus fachadas coloniales y la Cinta Costera frente al Pacífico; el Canal y las esclusas de Miraflores; las islas de Guna Yala en el Caribe, la isla de Coiba o las tierras altas de Chiriquí.",
      "El país combina bosques, islas y dos litorales: el Caribe y el Pacífico. La sección Descubre Panamá reúne artículos para empezar.",
    ],
    links: ["discover"],
  },
  {
    id: "estrategico",
    q: "¿Por qué Panamá es un destino estratégico?",
    a: [
      "Panamá es un istmo entre dos océanos y entre las Américas. El Canal y su entorno ocupan un lugar central en la vida económica del país, ligado al tránsito de personas y mercancías entre continentes.",
      "Para cifras o datos concretos, consulta siempre las fuentes oficiales.",
    ],
    links: ["invest"],
  },
  {
    id: "vivir",
    q: "¿Qué ventajas ofrece Panamá para vivir?",
    a: [
      "Cada situación es distinta y las condiciones pueden cambiar, por eso no prometemos ventajas concretas. El país ofrece diversidad de regiones y estilos de vida —ciudad, montaña, costas y comunidades con identidades propias— y una comunidad internacional de personas de distintos orígenes.",
      "En Vivir en Panamá encontrarás guías prácticas por temas (primeros pasos, vivienda, costo de vida, educación, salud, transporte, servicios y trámites) para formular las preguntas correctas e identificar la institución competente.",
    ],
    links: ["live"],
  },
  {
    id: "invertir",
    q: "¿Qué oportunidades existen para invertir en Panamá?",
    a: [
      "La sección Invertir presenta de forma factual el contexto, sectores para explorar (logística y transporte, comercio y distribución, servicios profesionales, turismo y hospitalidad, agroindustria, tecnología e innovación) y oportunidades publicadas por fuentes identificables.",
      "No son recomendaciones de inversión ni garantizan resultados. Antes de cualquier proyecto, contrasta la información con fuentes oficiales y cuenta con asesoría jurídica, contable y fiscal independiente.",
    ],
    links: ["invest", "opportunities"],
  },
  {
    id: "conectividad",
    q: "¿Cómo está conectado Panamá con el resto del mundo?",
    a: [
      "Panamá está ligado al tránsito internacional de personas y mercancías: el Canal une el Atlántico y el Pacífico, y su posición entre las Américas lo convierte en un punto de paso entre continentes.",
      "Para rutas, frecuencias o datos actualizados, consulta a los operadores y las fuentes oficiales.",
    ],
    links: ["invest"],
  },
  {
    id: "informacion",
    q: "¿Qué información ofrece Tu Destino es Panamá?",
    a: [
      "Información, orientación y conexiones útiles para descubrir el país, preparar una nueva etapa de vida o explorar posibilidades de negocio: guías prácticas con fecha de actualización y fuentes oficiales, profesionales referenciados, oportunidades con fuente identificable y recursos.",
      "Es contenido informativo: no constituye asesoría jurídica, migratoria, fiscal ni financiera.",
    ],
    links: ["explore", "about"],
  },
  {
    id: "orientacion",
    q: "¿Puedo recibir orientación para preparar mi proyecto en Panamá?",
    a: [
      "Sí. Cuéntanos tu situación y tu objetivo con el formulario de contacto: revisamos tu mensaje, te respondemos por correo electrónico con una primera orientación y, si procede, te indicamos fuentes oficiales o profesionales adecuados.",
      "Es una orientación, no una asesoría profesional.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "contacto",
    q: "¿Cómo puedo contactar con Tu Destino es Panamá?",
    a: [
      "Por el formulario de la página de contacto o por WhatsApp al +507 6575 0380. También puedes seguirnos en Instagram y LinkedIn desde el pie de página.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "idiomas",
    q: "¿La información está disponible en varios idiomas?",
    a: [
      "Sí: el sitio está disponible en español, inglés, francés, alemán e italiano. Puedes cambiar de idioma en cualquier momento con el selector de la barra de navegación.",
    ],
  },
  {
    id: "oficial",
    q: "¿Dónde puedo consultar información oficial antes de tomar una decisión?",
    a: [
      "En las propias instituciones. En Vivir en Panamá encontrarás instituciones de referencia: el Servicio Nacional de Migración, el Ministerio de Salud (MINSA), la Autoridad de Tránsito y Transporte Terrestre (ATTT) y el Instituto Nacional de Estadística y Censo (INEC).",
      "Tu Destino es Panamá no está afiliado a estas instituciones. Verifica siempre la información vigente y consulta a un profesional habilitado.",
    ],
    links: ["live"],
    institutions: true,
  },
];

const en: FaqEntry[] = [
  {
    id: "descubrir",
    q: "What can I discover in Panama?",
    a: [
      "Cities, landscapes, culture and ways of life. In Panama City, the bay, Casco Antiguo with its colonial façades and the Cinta Costera on the Pacific; the Canal and the Miraflores Locks; the Guna Yala islands in the Caribbean, Coiba island or the Chiriquí highlands.",
      "The country combines forests, islands and two coastlines: the Caribbean and the Pacific. The Discover Panama section gathers articles to get started.",
    ],
    links: ["discover"],
  },
  {
    id: "estrategico",
    q: "Why is Panama a strategic destination?",
    a: [
      "Panama is an isthmus between two oceans and between the Americas. The Canal and its surroundings are central to the country's economic life, which is tied to the movement of people and goods between continents.",
      "For figures or specific data, always check the official sources.",
    ],
    links: ["invest"],
  },
  {
    id: "vivir",
    q: "What does Panama offer for living there?",
    a: [
      "Every situation is different and conditions can change, so we don't promise specific advantages. The country offers a diversity of regions and lifestyles — city, mountains, coasts and communities with their own identities — and an international community of people from different backgrounds.",
      "In Live in Panama you'll find practical guides by topic (first steps, housing, cost of living, education, health, transport, services and paperwork) to ask the right questions and identify the competent institution.",
    ],
    links: ["live"],
  },
  {
    id: "invertir",
    q: "What investment opportunities exist in Panama?",
    a: [
      "The Invest section presents the context factually, sectors to explore (logistics and transport, trade and distribution, professional services, tourism and hospitality, agribusiness, technology and innovation) and opportunities published by identifiable sources.",
      "These are not investment recommendations and guarantee no results. Before any project, check the information against official sources and get independent legal, accounting and tax advice.",
    ],
    links: ["invest", "opportunities"],
  },
  {
    id: "conectividad",
    q: "How is Panama connected to the rest of the world?",
    a: [
      "Panama is tied to the international movement of people and goods: the Canal links the Atlantic and the Pacific, and its position between the Americas makes it a crossing point between continents.",
      "For routes, frequencies or up-to-date data, check with operators and official sources.",
    ],
    links: ["invest"],
  },
  {
    id: "informacion",
    q: "What information does Tu Destino es Panamá offer?",
    a: [
      "Useful information, guidance and connections to discover the country, prepare a new chapter of life or explore business possibilities: practical guides with update dates and official sources, listed professionals, opportunities with an identifiable source, and resources.",
      "It is informational content: it does not constitute legal, immigration, tax or financial advice.",
    ],
    links: ["explore", "about"],
  },
  {
    id: "orientacion",
    q: "Can I get guidance to prepare my project in Panama?",
    a: [
      "Yes. Tell us about your situation and goal through the contact form: we review your message, reply by email with initial guidance and, where relevant, point you to official sources or suitable professionals.",
      "It is guidance, not professional advice.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "contacto",
    q: "How can I contact Tu Destino es Panamá?",
    a: [
      "Through the form on the contact page or on WhatsApp at +507 6575 0380. You can also follow us on Instagram and LinkedIn from the footer.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "idiomas",
    q: "Is the information available in several languages?",
    a: [
      "Yes: the site is available in Spanish, English, French, German and Italian. You can switch language at any time with the selector in the navigation bar.",
    ],
  },
  {
    id: "oficial",
    q: "Where can I check official information before making a decision?",
    a: [
      "With the institutions themselves. In Live in Panama you'll find reference institutions: the National Migration Service, the Ministry of Health (MINSA), the Land Transit and Transport Authority (ATTT) and the National Institute of Statistics and Census (INEC).",
      "Tu Destino es Panamá is not affiliated with these institutions. Always check the current information and consult a qualified professional.",
    ],
    links: ["live"],
    institutions: true,
  },
];

const fr: FaqEntry[] = [
  {
    id: "descubrir",
    q: "Que peut-on découvrir au Panama ?",
    a: [
      "Des villes, des paysages, une culture et des modes de vie. À Panama City, la baie, le Casco Antiguo et ses façades coloniales, la Cinta Costera face au Pacifique ; le Canal et les écluses de Miraflores ; les îles de Guna Yala dans les Caraïbes, l’île de Coiba ou les hautes terres de Chiriquí.",
      "Le pays associe forêts, îles et deux littoraux : les Caraïbes et le Pacifique. La rubrique Découvrir le Panama réunit des articles pour commencer.",
    ],
    links: ["discover"],
  },
  {
    id: "estrategico",
    q: "Pourquoi le Panama est-il une destination stratégique ?",
    a: [
      "Le Panama est un isthme entre deux océans et entre les Amériques. Le Canal et son environnement occupent une place centrale dans la vie économique du pays, lié au transit de personnes et de marchandises entre les continents.",
      "Pour des chiffres ou des données précises, consultez toujours les sources officielles.",
    ],
    links: ["invest"],
  },
  {
    id: "vivir",
    q: "Qu’offre le Panama pour y vivre ?",
    a: [
      "Chaque situation est différente et les conditions peuvent évoluer : nous ne promettons donc aucun avantage précis. Le pays offre une diversité de régions et de modes de vie — ville, montagne, côtes et communautés aux identités propres — et une communauté internationale de personnes d’origines diverses.",
      "Dans Vivre au Panama, vous trouverez des guides pratiques par thème (premiers pas, logement, coût de la vie, éducation, santé, transport, services et démarches) pour poser les bonnes questions et identifier l’institution compétente.",
    ],
    links: ["live"],
  },
  {
    id: "invertir",
    q: "Quelles opportunités d’investissement existent au Panama ?",
    a: [
      "La rubrique Investir présente de façon factuelle le contexte, des secteurs à explorer (logistique et transport, commerce et distribution, services professionnels, tourisme et hôtellerie, agro-industrie, technologie et innovation) et des opportunités publiées par des sources identifiables.",
      "Ce ne sont pas des recommandations d’investissement et aucun résultat n’est garanti. Avant tout projet, vérifiez auprès des sources officielles et faites-vous accompagner par des conseils juridiques, comptables et fiscaux indépendants.",
    ],
    links: ["invest", "opportunities"],
  },
  {
    id: "conectividad",
    q: "Comment le Panama est-il relié au reste du monde ?",
    a: [
      "Le Panama est lié au transit international de personnes et de marchandises : le Canal relie l’Atlantique et le Pacifique, et sa position entre les Amériques en fait un point de passage entre les continents.",
      "Pour les liaisons, les fréquences ou des données à jour, renseignez-vous auprès des opérateurs et des sources officielles.",
    ],
    links: ["invest"],
  },
  {
    id: "informacion",
    q: "Quelles informations propose Tu Destino es Panamá ?",
    a: [
      "Des informations, une orientation et des contacts utiles pour découvrir le pays, préparer une nouvelle étape de vie ou explorer des possibilités d’affaires : guides pratiques datés avec sources officielles, professionnels référencés, opportunités à la source identifiable et ressources.",
      "Il s’agit de contenu informatif : il ne constitue pas un conseil juridique, migratoire, fiscal ou financier.",
    ],
    links: ["explore", "about"],
  },
  {
    id: "orientacion",
    q: "Puis-je être orienté pour préparer mon projet au Panama ?",
    a: [
      "Oui. Décrivez votre situation et votre objectif via le formulaire de contact : nous lisons votre message, vous répondons par e-mail avec une première orientation et, si besoin, vous indiquons des sources officielles ou des professionnels adaptés.",
      "Il s’agit d’une orientation, pas d’un conseil professionnel.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "contacto",
    q: "Comment contacter Tu Destino es Panamá ?",
    a: [
      "Par le formulaire de la page contact ou par WhatsApp au +507 6575 0380. Vous pouvez aussi nous suivre sur Instagram et LinkedIn depuis le pied de page.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "idiomas",
    q: "Les informations sont-elles disponibles en plusieurs langues ?",
    a: [
      "Oui : le site est disponible en espagnol, anglais, français, allemand et italien. Vous pouvez changer de langue à tout moment avec le sélecteur de la barre de navigation.",
    ],
  },
  {
    id: "oficial",
    q: "Où consulter des informations officielles avant de décider ?",
    a: [
      "Auprès des institutions elles-mêmes. Dans Vivre au Panama, vous trouverez des institutions de référence : le Service national de migration, le ministère de la Santé (MINSA), l’Autorité du transit et des transports terrestres (ATTT) et l’Institut national de la statistique et du recensement (INEC).",
      "Tu Destino es Panamá n’est pas affilié à ces institutions. Vérifiez toujours l’information en vigueur et consultez un professionnel habilité.",
    ],
    links: ["live"],
    institutions: true,
  },
];

const de: FaqEntry[] = [
  {
    id: "descubrir",
    q: "Was kann ich in Panama entdecken?",
    a: [
      "Städte, Landschaften, Kultur und Lebensweisen. In Panama-Stadt die Bucht, der Casco Antiguo mit seinen Kolonialfassaden und die Cinta Costera am Pazifik; der Kanal und die Miraflores-Schleusen; die Inseln von Guna Yala in der Karibik, die Insel Coiba oder das Hochland von Chiriquí.",
      "Das Land verbindet Wälder, Inseln und zwei Küsten: die Karibik und den Pazifik. Der Bereich Panama entdecken bündelt Artikel für den Einstieg.",
    ],
    links: ["discover"],
  },
  {
    id: "estrategico",
    q: "Warum ist Panama ein strategischer Standort?",
    a: [
      "Panama ist eine Landenge zwischen zwei Ozeanen und zwischen den Amerikas. Der Kanal und sein Umfeld stehen im Zentrum des Wirtschaftslebens, das mit dem Verkehr von Menschen und Waren zwischen den Kontinenten verbunden ist.",
      "Für Zahlen oder konkrete Daten prüfen Sie immer die offiziellen Quellen.",
    ],
    links: ["invest"],
  },
  {
    id: "vivir",
    q: "Was bietet Panama zum Leben?",
    a: [
      "Jede Situation ist anders und Bedingungen können sich ändern, daher versprechen wir keine konkreten Vorteile. Das Land bietet vielfältige Regionen und Lebensstile — Stadt, Berge, Küsten und Gemeinschaften mit eigener Identität — und eine internationale Gemeinschaft von Menschen unterschiedlicher Herkunft.",
      "Unter In Panama leben finden Sie praktische Leitfäden nach Themen (erste Schritte, Wohnen, Lebenshaltungskosten, Bildung, Gesundheit, Verkehr, Dienstleistungen und Behördengänge), um die richtigen Fragen zu stellen und die zuständige Institution zu finden.",
    ],
    links: ["live"],
  },
  {
    id: "invertir",
    q: "Welche Investitionsmöglichkeiten gibt es in Panama?",
    a: [
      "Der Bereich Investieren stellt sachlich den Kontext vor, Sektoren zum Erkunden (Logistik und Transport, Handel und Vertrieb, professionelle Dienstleistungen, Tourismus und Gastgewerbe, Agrarwirtschaft, Technologie und Innovation) sowie Chancen, die von identifizierbaren Quellen veröffentlicht wurden.",
      "Dies sind keine Anlageempfehlungen und es werden keine Ergebnisse garantiert. Prüfen Sie vor jedem Projekt die offiziellen Quellen und holen Sie unabhängige rechtliche, buchhalterische und steuerliche Beratung ein.",
    ],
    links: ["invest", "opportunities"],
  },
  {
    id: "conectividad",
    q: "Wie ist Panama mit der Welt verbunden?",
    a: [
      "Panama ist mit dem internationalen Verkehr von Menschen und Waren verbunden: Der Kanal verbindet Atlantik und Pazifik, und die Lage zwischen den Amerikas macht das Land zu einem Durchgangspunkt zwischen den Kontinenten.",
      "Für Verbindungen, Frequenzen oder aktuelle Daten wenden Sie sich an die Betreiber und offiziellen Quellen.",
    ],
    links: ["invest"],
  },
  {
    id: "informacion",
    q: "Welche Informationen bietet Tu Destino es Panamá?",
    a: [
      "Nützliche Informationen, Orientierung und Kontakte, um das Land zu entdecken, einen neuen Lebensabschnitt vorzubereiten oder Geschäftsmöglichkeiten zu erkunden: datierte praktische Leitfäden mit offiziellen Quellen, gelistete Fachleute, Chancen mit identifizierbarer Quelle und Ressourcen.",
      "Es handelt sich um informative Inhalte, keine rechtliche, migrationsrechtliche, steuerliche oder finanzielle Beratung.",
    ],
    links: ["explore", "about"],
  },
  {
    id: "orientacion",
    q: "Kann ich Orientierung für mein Projekt in Panama erhalten?",
    a: [
      "Ja. Beschreiben Sie Ihre Situation und Ihr Ziel über das Kontaktformular: Wir prüfen Ihre Nachricht, antworten per E-Mail mit einer ersten Orientierung und nennen Ihnen gegebenenfalls offizielle Quellen oder geeignete Fachleute.",
      "Es ist eine Orientierung, keine professionelle Beratung.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "contacto",
    q: "Wie kann ich Tu Destino es Panamá kontaktieren?",
    a: [
      "Über das Formular auf der Kontaktseite oder per WhatsApp unter +507 6575 0380. Über die Fußzeile können Sie uns auch auf Instagram und LinkedIn folgen.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "idiomas",
    q: "Sind die Informationen in mehreren Sprachen verfügbar?",
    a: [
      "Ja: Die Website ist auf Spanisch, Englisch, Französisch, Deutsch und Italienisch verfügbar. Sie können die Sprache jederzeit über die Auswahl in der Navigationsleiste wechseln.",
    ],
  },
  {
    id: "oficial",
    q: "Wo finde ich offizielle Informationen, bevor ich entscheide?",
    a: [
      "Bei den Institutionen selbst. Unter In Panama leben finden Sie Referenzinstitutionen: den Nationalen Migrationsdienst, das Gesundheitsministerium (MINSA), die Behörde für Landverkehr (ATTT) und das Nationale Institut für Statistik und Zensus (INEC).",
      "Tu Destino es Panamá ist mit diesen Institutionen nicht verbunden. Prüfen Sie stets die aktuellen Informationen und wenden Sie sich an eine zugelassene Fachperson.",
    ],
    links: ["live"],
    institutions: true,
  },
];

const it: FaqEntry[] = [
  {
    id: "descubrir",
    q: "Cosa posso scoprire a Panamá?",
    a: [
      "Città, paesaggi, cultura e stili di vita. A Ciudad de Panamá, la baia, il Casco Antiguo con le sue facciate coloniali e la Cinta Costera sul Pacifico; il Canale e le chiuse di Miraflores; le isole di Guna Yala nei Caraibi, l’isola di Coiba o gli altopiani di Chiriquí.",
      "Il paese unisce foreste, isole e due coste: i Caraibi e il Pacifico. La sezione Scopri Panamá raccoglie articoli per iniziare.",
    ],
    links: ["discover"],
  },
  {
    id: "estrategico",
    q: "Perché Panamá è una destinazione strategica?",
    a: [
      "Panamá è un istmo tra due oceani e tra le Americhe. Il Canale e il suo contesto occupano un posto centrale nella vita economica del paese, legato al transito di persone e merci tra i continenti.",
      "Per cifre o dati specifici, consulta sempre le fonti ufficiali.",
    ],
    links: ["invest"],
  },
  {
    id: "vivir",
    q: "Cosa offre Panamá per viverci?",
    a: [
      "Ogni situazione è diversa e le condizioni possono cambiare, per questo non promettiamo vantaggi specifici. Il paese offre diversità di regioni e stili di vita — città, montagna, coste e comunità con identità proprie — e una comunità internazionale di persone di origini diverse.",
      "In Vivere a Panamá trovi guide pratiche per tema (primi passi, casa, costo della vita, istruzione, salute, trasporti, servizi e pratiche) per porre le domande giuste e individuare l’istituzione competente.",
    ],
    links: ["live"],
  },
  {
    id: "invertir",
    q: "Quali opportunità di investimento esistono a Panamá?",
    a: [
      "La sezione Investire presenta in modo fattuale il contesto, i settori da esplorare (logistica e trasporti, commercio e distribuzione, servizi professionali, turismo e ospitalità, agroindustria, tecnologia e innovazione) e le opportunità pubblicate da fonti identificabili.",
      "Non sono raccomandazioni di investimento e non garantiscono risultati. Prima di qualsiasi progetto, verifica con le fonti ufficiali e affidati a una consulenza legale, contabile e fiscale indipendente.",
    ],
    links: ["invest", "opportunities"],
  },
  {
    id: "conectividad",
    q: "Come è collegata Panamá al resto del mondo?",
    a: [
      "Panamá è legata al transito internazionale di persone e merci: il Canale unisce l’Atlantico e il Pacifico, e la sua posizione tra le Americhe la rende un punto di passaggio tra i continenti.",
      "Per collegamenti, frequenze o dati aggiornati, consulta gli operatori e le fonti ufficiali.",
    ],
    links: ["invest"],
  },
  {
    id: "informacion",
    q: "Quali informazioni offre Tu Destino es Panamá?",
    a: [
      "Informazioni, orientamento e contatti utili per scoprire il paese, preparare una nuova fase di vita o esplorare possibilità di business: guide pratiche datate con fonti ufficiali, professionisti segnalati, opportunità con fonte identificabile e risorse.",
      "È un contenuto informativo: non costituisce consulenza legale, migratoria, fiscale o finanziaria.",
    ],
    links: ["explore", "about"],
  },
  {
    id: "orientacion",
    q: "Posso ricevere orientamento per preparare il mio progetto a Panamá?",
    a: [
      "Sì. Raccontaci la tua situazione e il tuo obiettivo con il modulo di contatto: esaminiamo il tuo messaggio, ti rispondiamo via e-mail con un primo orientamento e, se opportuno, ti indichiamo fonti ufficiali o professionisti adeguati.",
      "È un orientamento, non una consulenza professionale.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "contacto",
    q: "Come posso contattare Tu Destino es Panamá?",
    a: [
      "Tramite il modulo della pagina contatti o su WhatsApp al +507 6575 0380. Puoi anche seguirci su Instagram e LinkedIn dal piè di pagina.",
    ],
    links: ["contact"],
    whatsapp: true,
  },
  {
    id: "idiomas",
    q: "Le informazioni sono disponibili in più lingue?",
    a: [
      "Sì: il sito è disponibile in spagnolo, inglese, francese, tedesco e italiano. Puoi cambiare lingua in qualsiasi momento con il selettore nella barra di navigazione.",
    ],
  },
  {
    id: "oficial",
    q: "Dove posso consultare informazioni ufficiali prima di decidere?",
    a: [
      "Presso le istituzioni stesse. In Vivere a Panamá trovi le istituzioni di riferimento: il Servizio nazionale di migrazione, il Ministero della Salute (MINSA), l’Autorità del transito e dei trasporti terrestri (ATTT) e l’Istituto nazionale di statistica e censimento (INEC).",
      "Tu Destino es Panamá non è affiliato a queste istituzioni. Verifica sempre le informazioni in vigore e consulta un professionista abilitato.",
    ],
    links: ["live"],
    institutions: true,
  },
];

export const FAQ: Record<Locale, FaqEntry[]> = { es, en, fr, de, it };
