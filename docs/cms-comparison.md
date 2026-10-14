# Comparativa de CMS — Tu Destino es Panamá

> **Estado: NINGÚN CMS está conectado.** El contenido vive en archivos locales. Elegir, contratar y conectar un CMS requiere la **validación del cliente** y **sus credenciales** (cuenta, proyecto, base de datos, tokens). Este documento es una recomendación, no una implementación.

Fecha: 2026-10-14. Las versiones de paquetes citadas se comprobaron con `npm view` ese día. **No se citan precios**: los planes cambian a menudo y deben consultarse en la web de cada proveedor en el momento de decidir.

## 1. Necesidades del proyecto

Fuente: `types/content.ts`.

| Colección | Campos principales | Notas |
|-----------|--------------------|-------|
| **Article** | `translationKey`, `title`, `slug`, `locale`, `excerpt`, `body` (bloques `p`/`h2`/`ul`/`note`, sin HTML), `section`, `category`, `location`, `coverImage` (con `credit`), `author`, `sources[]`, `sensitive`, `publishedAt`, `updatedAt`, `readingTime`, `seoTitle`, `seoDescription`, `status` | Temas sensibles (legal, migración, impuestos, salud, finanzas) → fuentes y aviso obligatorios |
| **Professional** | `translationKey`, `locale`, `name`, `slug`, `logo`, `coverImage`, `category`, `location`, `description`, `services[]`, `email`, `phone`, `website`, `verifiedAt`, `sponsored`, `status` | `verifiedAt` vacío = no verificado |
| **Opportunity** | `translationKey`, `locale`, `title`, `slug`, `category`, `location`, `description`, `organization`, `sourceUrl` (obligatorio), `publishedAt`, `deadline`, `contactMethod`, `status` | Sin fuente no se muestra |
| **VideoResource** | `translationKey`, `locale`, `title`, `slug`, `description`, `thumbnail`, `videoUrl`, `category`, `location`, `publishedAt`, `status` | `videoUrl` vacío hasta tener vídeo con licencia |
| **ContactRequest** | `name`, `email`, `country`, `requestType`, `message`, `locale`, `createdAt`, `status` (`new`/`routed`/`closed`) | **Datos personales**, no contenido editorial |

`Source` = `label`, `url`, `publisher`, `consultedAt`, `official`. (`InvestorRequest` también existe en los tipos y se trata como `ContactRequest`.)

Requisitos transversales:

- **Bilingüe ES/EN.** El modelo actual usa *un documento por idioma* enlazado por `translationKey` (localización a nivel de documento), lo que permite traducciones no simétricas.
- **Flujo editorial** `demo` → `draft` → `published`. `demo` no es un estado estándar en ningún CMS: será un campo propio en todos los casos. `draft`/`published` sí puede apoyarse en el sistema nativo de borradores.
- **Fuentes y fechas** (`sources[].consultedAt`, `updatedAt`, `verifiedAt`) como campos obligatorios con validación.
- **Next.js 16 App Router** (el proyecto usa `next@16.4.0`, React 19).
- **Equipo editorial pequeño y no técnico.**

## 2. Tabla comparativa

| Criterio | Sanity | Strapi | Contentful | Payload |
|----------|--------|--------|------------|---------|
| Tipo | SaaS (datos en Content Lake de Sanity); Studio de código abierto | Código abierto, autoalojado (existe oferta cloud) | SaaS puro | Código abierto, autoalojado **dentro de la propia app Next.js** (existe oferta cloud) |
| Integración Next.js 16 | `next-sanity` 13.3.4 declara `next ^16`. Studio embebible en una ruta de la app | API REST/GraphQL desde un servidor aparte; integración genérica por `fetch` | SDK `contentful` independiente del framework; integración por `fetch` | `@payloadcms/next` 3.90.2 declara `next >=16.3.3 <17` (16.4.0 entra). Admin y API locales en la misma app |
| Localización | Por documento (plugin oficial de internacionalización de documentos) o por campo. Encaja con `translationKey` | Plugin i18n integrado (por entrada/locale) | Locales nativos por campo; muy maduro | Localización nativa por campo (`localized: true`); por documento posible con un campo propio |
| Borradores / estados | Borradores y publicación nativos; `demo` como campo | Draft & Publish nativo (v5); `demo` como campo | Draft/Published nativo, workflows avanzados según plan | Versiones y borradores nativos (`_status`); `demo` como campo; control de acceso por código |
| Validación (fuentes obligatorias, URLs) | Reglas de validación en el esquema (código) | Validación básica en el admin; reglas avanzadas en código | Validaciones configurables en la UI | Validación por función en cada campo (TypeScript) |
| Hosting / modelo de coste | Plan gratuito con límites; planes de pago por usuarios y uso | Gratis si se autoaloja (pagas servidor + BD); cloud de pago | Plan gratuito limitado; planes de pago con saltos importantes; orientado a empresa | Gratis si se autoaloja (pagas BD + almacenamiento de archivos); cloud de pago |
| Residencia de datos | Infraestructura del proveedor; región a confirmar con Sanity | Total control (donde lo alojes) | Infraestructura del proveedor; opciones de región según plan | Total control (tu BD: Postgres, MongoDB o SQLite) |
| Curva de aprendizaje editorial | Baja: Studio cómodo, vista previa, colaboración en tiempo real | Baja-media: admin clásico | Baja: UI pulida, pero el modelado es rígido | Baja-media: admin limpio, generado a partir del código |
| Curva técnica | Media (GROQ, esquemas) | Media (servidor aparte, migraciones, actualizaciones) | Baja-media | Media (BD, migraciones, almacenamiento de medios en serverless) |
| Operación | Ninguna (gestionado) | Servidor + BD + copias + actualizaciones | Ninguna | BD + almacenamiento de archivos + copias; despliegue junto con la web |
| ContactRequest (datos personales) | Posible, pero no es su función; no recomendado | Adecuado (es una BD) | No recomendado | Adecuado (colección con acceso restringido) |
| Dependencia (lock-in) | Media: datos exportables (NDJSON), consultas GROQ propietarias | Baja | Alta: modelo y API propietarios, migración costosa | Baja: código abierto, datos en tu propia BD |

## 3. Valoración

**Sanity.** La mejor experiencia editorial "lista para usar" para un equipo no técnico: Studio intuitivo, vista previa, sin servidores que mantener. `next-sanity` ya soporta Next 16. El modelo por documento con `translationKey` encaja con su plugin de internacionalización de documentos. Contras: datos en la nube del proveedor (confirmar región si el cliente tiene requisitos), coste que crece con usuarios y uso, y GROQ como lenguaje propio. No es el lugar adecuado para guardar `ContactRequest`.

**Strapi.** Sólido y gratuito si se autoaloja, pero exige **un segundo servidor** (Node + BD) distinto de la web, con su propio ciclo de actualizaciones. Para un equipo pequeño sin perfil técnico dedicado, ese coste operativo pesa más que sus ventajas.

**Contentful.** Muy maduro y con localización excelente, pero pensado para empresa: el salto entre el plan gratuito y los de pago es grande, los límites de modelado se notan pronto y el lock-in es el más alto de los cuatro. Sobredimensionado para este proyecto.

**Payload.** Se instala **dentro de la misma app Next.js** (`/admin` + API local), con tipos TypeScript generados que pueden coincidir con `types/content.ts`, borradores y localización nativos, y datos en una BD del cliente (control total de residencia, sin coste de licencia). Es la mejor opción para `ContactRequest`. Contras: alguien tiene que operar la BD, las copias de seguridad y el almacenamiento de imágenes (en un despliegue serverless se necesita BD y almacenamiento externos); su compatibilidad depende de rangos concretos de Next (hoy `>=16.3.3 <17`), así que cada actualización de Next debe esperar a Payload.

## 4. Recomendación

**Sanity**, salvo que el cliente exija autoalojamiento o residencia de datos propia.

Razones:

1. El equipo editorial es pequeño y no técnico, y por ahora no hay nadie asignado a operar una base de datos, copias de seguridad y almacenamiento de medios. Sanity elimina esa carga.
2. Su modelo de internacionalización por documento encaja con el `translationKey` ya definido, y sus borradores nativos cubren `draft`/`published` (con `demo` como campo propio).
3. El riesgo de lock-in es moderado y está acotado por la arquitectura (ver §5).

`ContactRequest` (e `InvestorRequest`) **no debe ir a Sanity**: son datos personales. Deben enviarse por correo transaccional o a un CRM/BD aparte, con su propia política de privacidad.

**Cuándo elegir Payload en su lugar:** si el cliente requiere que los datos estén en su propia infraestructura, quiere evitar costes por usuario a largo plazo, o dispone de alguien técnico que mantenga BD y copias. En ese caso Payload es la mejor alternativa, y además resuelve el almacenamiento de `ContactRequest` en el mismo sistema.

Antes de decidir, el cliente debe validar: número de editores, requisitos de residencia de datos, presupuesto mensual aceptable (consultar precios vigentes), y quién gestionará cuentas y accesos.

## 5. Punto de sustitución

La arquitectura prevé que **`lib/content.ts` sea el único módulo que lee `/content`** (archivos locales). Los componentes solo consumen sus funciones y los tipos de `types/content.ts`, nunca los archivos directamente.

> Implementado: `lib/content.ts` (marcado `server-only`) es el único módulo que importa `/content/*.ts`. Además filtra por `status` (los contenidos `demo` solo se muestran en desarrollo o con `NEXT_PUBLIC_SHOW_DEMO_CONTENT=true`; los `draft` nunca) y descarta toda oportunidad sin fuente u organismo identificable.

Conectar un CMS consiste en:

1. Crear un adaptador (p. ej. `lib/content.sanity.ts` o `lib/content.payload.ts`) que exporte **las mismas funciones y firmas** que `lib/content.ts` y devuelva los mismos tipos.
2. Mapear los documentos del CMS a `Article`, `Professional`, `Opportunity`, `VideoResource` (incluida la conversión del texto enriquecido del CMS a `ArticleBlock[]`, sin HTML crudo).
3. Mantener los filtros de seguridad en el adaptador: nunca devolver `draft`; devolver `demo` solo si `NEXT_PUBLIC_SHOW_DEMO_CONTENT=true`; no devolver oportunidades sin `sourceUrl`.
4. Sustituir `lib/content.ts` por el adaptador (o seleccionar por variable de entorno). Ningún componente debería cambiar.
5. Configurar revalidación (webhook del CMS → revalidación de rutas en Next.js).

Nada de esto está hecho: requiere la elección del cliente y sus credenciales.
