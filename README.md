# Tu Destino es Panamá

Plataforma editorial + guía práctica + portal (profesionales, oportunidades) para públicos internacionales que descubren Panamá, preparan una instalación o exploran posibilidades de negocio. Cinco idiomas: español (por defecto), inglés, francés, alemán e italiano.

> Estado: **primer entregable en local**. No hay dominio confirmado, ni despliegue, ni push.

## Stack

- Next.js 16.4 (App Router, Turbopack, Cache Components) · React 19 · TypeScript estricto
- Tailwind CSS v4 (tokens en `app/globals.css`)
- Fuentes: Manrope (títulos) + Inter (texto) vía `next/font`
- Sin librerías de animación, de i18n ni de validación: todo es propio y ligero

## Comandos

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm run start -- -p 3011 -H 0.0.0.0   # build de producción accesible en la red local
npm run lint
npx tsc --noEmit
./scripts/build-hero-video.sh --help                  # montaje del video hero (ver docs/higgsfield-prompts.md)
```

## Variables de entorno

Ver `.env.example`. Puntos clave:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Vacía** hasta que el cliente confirme el dominio. Mientras esté vacía: sin canonical / hreflang absolutos, sin imágenes OG, `sitemap.xml` vacío y `robots.txt` bloquea la indexación. |
| `NEXT_PUBLIC_SHOW_DEMO_CONTENT` | Contenido `status: "demo"` (siempre con insignia «Demo»). Por defecto **visible** (fase de demostración al cliente). Para el lanzamiento público: `false` y redesplegar. |
| `CONTACT_WEBHOOK_URL` (+ `_CONOCER`, `_VIVIR`, `_INVERTIR`, `_EMPRESA`, `_OTRA`, `CONTACT_WEBHOOK_SECRET`) | Entrega de formularios (CRM, Make/Zapier, servicio de correo…). Sin endpoint, la API responde 503 y el formulario muestra un error conservando los datos. |
| `CONTACT_DRY_RUN` | Solo en desarrollo: valida sin enviar y la interfaz dice explícitamente que **no** se envió. |

## Arquitectura

```
app/
  [locale]/                 layout raíz (html lang), home, 404 localizado, error boundary
    [...path]/              resolvedor único de todas las rutas traducidas y fichas
    x-404/                  destino interno de proxy.ts para URLs desconocidas
  api/contact/route.ts      validación servidor, honeypot, rate limit, entrega
  global-not-found.tsx      404 fuera de /es y /en
  sitemap.ts robots.ts manifest.ts icon.png apple-icon.png
proxy.ts                    solo "/": redirige a /es (o /en si el navegador prefiere inglés)
components/
  layout/  Header, DesktopNavigation, MobileNavigation, LanguageSwitcher, Footer, PageHeader, Logo
  home/    HeroVideo (+ HeroVideoPlayer), secciones de la home, FinalCTA
  explore/ ExploreListing (búsqueda/filtros/orden/paginación en URL), SearchBar, FilterBar,
           FilterDrawer, Pagination, GuideCard, ProfessionalCard, OpportunityCard, VideoCard
  forms/   ContactForm (contacto e inversión)
  ui/      Button, Badge/DemoBadge, SectionHeading, Icon, EmptyState/LoadingState/ErrorState/Callout,
           Breadcrumb, SourceList, LastUpdated, JsonLd, ShareButtons, TrackedLink
  views/   vistas de página (compartidas por las dos rutas traducidas)
content/   datos locales (todos status "demo")
data/      media-sources.json (procedencia y licencias de las fotos)
lib/       i18n, diccionarios ES/EN, content (única puerta a /content), seo, validation, analytics,
           server/delivery, server/rate-limit
docs/      media-sources.md, higgsfield-prompts.md, cms-comparison.md
media/     originales de las fotos y clips Higgsfield (no se publican; ver .gitignore)
public/    brand/ (logo oficial + derivados WebP), images/, video/ (pósters)
```

### Multilingüe (ES · EN · FR · DE · IT)

- **Fuente de verdad:** `lib/i18n.ts` — lista de idiomas, metadatos (nombre, bandera, `lang`, `og:locale`, formato de fecha) y la **tabla de rutas** con el slug traducido de cada página (`/es/descubre`, `/en/discover`, `/fr/decouvrir`, `/de/entdecken`, `/it/scopri`…).
- **Textos de interfaz:** un diccionario tipado por idioma en `lib/dictionaries/{es,en,fr,de,it}.ts` (el tipo `Dictionary` obliga a traducir todas las claves). `lib/dictionaries/system.ts` solo cubre la página 404 y el error de cliente.
- **Contenido:** `content/*.ts` (ES+EN) y `content/*.{fr,de,it}.ts`, agregados en `content/index.ts`. Cada elemento comparte un `translationKey` entre idiomas → hreflang y selector de idioma apuntan a la misma ficha traducida.
- **Enrutado:** `app/[locale]/page.tsx` (inicio) + **un solo resolvedor** `app/[locale]/[...path]/page.tsx` que traduce el slug a la vista mediante la tabla de rutas. Todas las rutas se prerenderizan (`generateStaticParams`).
- **404 reales:** `proxy.ts` compara cada URL con `lib/routing.ts` (rutas + slugs visibles); lo desconocido se reescribe a la 404 localizada con estado HTTP 404.
- **Persistencia:** el idioma vive en la URL. Al elegir un idioma se guarda la cookie `NEXT_LOCALE` para que `/` abra en ese idioma; si no hay cookie se usa `Accept-Language`, y por defecto el español.
- **Selector:** `components/layout/LanguageSelector.tsx` (mismo componente en móvil y escritorio, banderas SVG en `components/ui/Flag.tsx`).
- **Añadir un idioma:** entrada en `locales`/`localeMeta`, columna en `routes`, diccionario y archivos de contenido.

### Contenido y anti-alucinación

- `lib/content.ts` es el único módulo que lee `/content`; un adaptador CMS lo sustituirá (ver `docs/cms-comparison.md`).
- `status`: `demo` (ejemplo, siempre etiquetado) · `draft` (nunca se muestra) · `published` (verificado, fechado, con fuentes).
- Una oportunidad sin `sourceUrl` válida u organismo identificable no se muestra nunca.
- Guías sensibles (`sensitive: true`): aviso legal + fuentes oficiales + fecha de actualización.
- Los textos demo no contienen cifras, procedimientos, plazos, requisitos ni ventajas fiscales.

### Paleta

Tokens en `app/globals.css`: `ink` (texto), `blue-800` (enlaces/acciones, azul del logo), `red-600` (CTA principal), `ocean-deep`/`ocean-950` (superficies oscuras: pie, bandas, fondo del hero), `ocean` (acentos pequeños), `ocean-mist` y `sand` (superficies claras).

### Logo

**Versión blanca pendiente:** al recibirla, colóquela en `public/brand/logo-light.svg` (o `.webp`/`.png`). Se detecta en el build (`lib/brand.ts`) y se usa en el header sobre el hero y en el pie, sin cambiar código. Mientras tanto se muestra el logo a color sin placa (contraste bajo sobre fondo oscuro).

`public/brand/tu-destino-es-panama-logo.svg` es el archivo oficial, sin modificar. **Atención:** ese SVG envuelve una imagen PNG de 1564×468 (684 KB); no es vectorial. Para el rendimiento, la interfaz usa `public/brand/logo-480.webp` / `logo-800.webp`, exportados 1:1 desde ese archivo (mismos píxeles y proporción, sin recoloreado). Los favicons usan el emblema recortado del mismo archivo. 

### Analítica

`lib/analytics.ts` emite los eventos del brief (`hero_primary_cta_click`, `search_submit`, `contact_submit_success`…) hacia `window.dataLayer` si existe. No hay proveedor conectado. Nunca se envía el contenido de los campos (la búsqueda solo envía la longitud del texto).

### Seguridad

Cabeceras (`next.config.ts`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, HSTS. Validación y saneamiento en servidor, honeypot, límite de 5 envíos / 10 min por IP (hash). **El rate limit es en memoria por instancia**: en producción serverless hay que sustituirlo por un almacén compartido (Redis/Upstash). CSP pendiente (requiere nonces).

## Pendiente / accesos necesarios

Ver la sección final del informe de entrega y `docs/higgsfield-prompts.md`.
