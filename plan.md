# plan.md (UPDATED)

## 1) Objectives
- Deliver a complete, modern, trustworthy, responsive **German-only** company website for **Garten-und Landschaftspflege B.Streich** (Marke: **Streich**) as a **React SPA** on the existing stack (**React + FastAPI**, MongoDB present but not required for v1).
- Maintain strict content fidelity: **use the provided German texts/claims**; **do not invent** services, qualifications, history, reviews, opening hours, staff names/photos.
- Implement strong **Local SEO** for **Lübeck, Scharbeutz, Ostholstein** (natural wording, no keyword-stuffing) via:
  - per-page titles/descriptions, canonical URLs, Open Graph
  - JSON-LD structured data
  - `sitemap.xml` + `robots.txt`
- Respect the image constraint: **no photos** → use premium **brand-consistent gradient/texture placeholder surfaces** with fixed aspect ratios (avoid CLS).
- Use the **client-provided logo** (PNG) and provide an **exchangeable logo slot** via `/frontend/public/*` assets.

**Status:** V1 complete, polished, and tested (100% pass).

## 2) Implementation Steps

### Phase 1: Core function/feature POC (Isolation) — skipped
- No external integrations/AI/auth/payments/forms; complexity is straightforward; proceed directly to build.

### Phase 2: V1 App Development (React SPA + minimal FastAPI)
**User stories (UX-critical)**
1. Visitor understands **Wer/Was/Wo** (Streich, Leistungen, Region) within seconds on the Startseite.
2. Visitor can contact via **Anruf / WhatsApp / E-Mail** with one tap (header + CTAs).
3. Visitor can scan the **3 wichtigsten Leistungen** (Gartenpflege, Heckenrückschnitt, Baumfällungen) and jump to `/leistungen`.
4. Visitor can read all **10 Leistungen** with clear structure (H2 sections) and consistent claims.
5. Visitor can find **Impressum/Datenschutz/AGB** quickly via footer; NAP is consistent site-wide.

**Frontend foundation (implemented)**
- Central configs/data modules:
  - `src/data/site.js` (NAP: legalName, address, phone, email, WhatsApp; areaServed only Lübeck/Ostholstein; **domain configurable** `site.domain` set to `https://garten-streich.de`)
  - `src/data/services.js` (single source of truth for the **10 services** with claims + descriptions, highlights)
  - `src/data/seo.js` (per-route SEO metadata + JSON-LD builder)
- Design system:
  - `src/index.css` brand tokens mapped to shadcn HSL tokens (cream canvas, forest greens, ink, #0FBB82 accent)
  - IntersectionObserver-based **Reveal** animation (Soft Organic Motion, respects `prefers-reduced-motion`)
- SEO head management:
  - Custom `Seo` component (React 19 friendly; no Helmet dependency) for per-page title/description/canonical/OG
  - `robots` meta auto-switch: **noindex** on preview/staging host; intended **index** on `garten-streich.de`
  - JSON-LD included on Startseite only

**Components (implemented)**
- `Logo` (exchangeable public assets: `logo-header.webp`, `logo-hero.webp`, `logo*.png`)
- `Header` (sticky; desktop nav + contact cluster; mobile Sheet menu with large touch targets)
- `Footer` (dark forest; consistent NAP + legal links)
- `ContactActions` + recurring `ContactCTA` block (tel / wa.me / mailto; **no forms**)
- `BrandSurface` premium placeholder panels (fixed ratios to avoid CLS)
- `ServiceCard` (key/teaser variants)
- `ScrollToTop` (route changes + anchor scrolling)
- `LegalLayout` for legal pages

**Pages (implemented; exactly 7 + 404 route)**
- `/` Startseite
  - H1: **"Garten- und Landschaftspflege in und um Lübeck"**
  - Intro text close to the provided wording
  - 3 highlighted key services (Gartenpflege, Heckenrückschnitt, Baumfällungen)
  - Teaser grid of remaining services + internal links
- `/leistungen`
  - H1: **"Unsere Leistungen rund um Garten und Grünflächen"**
  - Intro with natural Lübeck/Ostholstein mention
  - Quick-jump chips
  - Exactly 10 services as H2 sections, claims/texts faithful
  - "Weitere Leistungen" mention only: Hausmeisterdienste; Terrassen- & Außenflächenreinigung
  - Mid + end recurring contact CTA
- `/ueber-uns` (confirmed facts only: Bianca Streich, Einzelunternehmen, Scharbeutz, Lübeck/Ostholstein)
- `/team` (familiär; general qualifications only; no names/photos)
- `/impressum` (includes USt-IdNr **DE415720615**; **no Steuernummer/Wirtschafts-IdNr**; no invented register/authority)
- `/datenschutz` (preliminary, honest placeholder; minimal external services)
- `/agb` (in Vorbereitung; no invented clauses)
- `*` 404 NotFound page (not indexed on preview due to robots meta)

**Backend (FastAPI)**
- Left minimal; no required API calls from frontend (site is static content SPA).

### Phase 3: Technical SEO finalization + polish
**User stories**
1. Search engines can discover the 7 pages via `sitemap.xml` and see correct canonical URLs.
2. Site feels fast and stable (no layout jumps; calm motion).
3. Admin can change the domain once (`site.domain`) and canonicals/OG/JSON-LD update.
4. NAP is consistent everywhere; contact CTAs always available.
5. Logo assets can be swapped by replacing files in `/frontend/public/`.

**Tasks (implemented)**
- Static SEO files in `/public`:
  - `sitemap.xml` (7 URLs, pointing to `https://garten-streich.de/...`)
  - `robots.txt`
  - `manifest.json`
- Generated brand assets from client logo:
  - `favicon.ico`, `favicon-64.png`, `logo192.png`, `logo512.png`, `og-image.jpg`
  - optimized logo variants: `logo-header.webp`, `logo-hero.webp`, `logo-transparent.png`
- **Self-hosted fonts** for privacy + performance:
  - WOFF2 latin subset stored in `/public/fonts/`
  - `public/fonts.css` loaded from `index.html` + preload of key files
- Verified per-route SEO head + JSON-LD:
  - correct titles/descriptions/canonical/OG
  - staging auto noindex; production host intended index

**Testing (completed)**
- `testing_agent_v3` iteration_1: **100% frontend pass**, 0 issues
  - all routes render
  - desktop + mobile nav works
  - tel / WhatsApp / mailto links correct
  - Leistungen anchors + quick-jump work
  - footer NAP correct
  - SEO head present per route, JSON-LD on home only
  - Impressum contains USt-Id and does not contain Steuernummer
  - static files serve: `/robots.txt`, `/sitemap.xml`, `/fonts.css`

### Phase 4+: Optional enhancements (only if requested)
**User stories**
1. Admin can swap in **real photos** later without redesign (placeholders already sized).
2. Admin can add a contact form (only if explicitly approved).
3. Admin can manage texts via CMS/admin UI (then use MongoDB).
4. Add Google Business Profile link (only if provided/confirmed).
5. Convert/replace logo with final vector (SVG/PDF/AI) when delivered.

## 3) Next Actions
- **Delivery-ready** (no pending engineering tasks for V1).
- When the client is ready:
  1. Confirm final production domain (or update `src/data/site.js` → `site.domain`).
  2. Provide final legal texts for **Datenschutz** and **AGB** (replace placeholders).
  3. Provide real images (team/garden) if desired; swap placeholder surfaces.
  4. Provide final vector logo (optional) and replace `/public/logo-*.webp/png` assets.

## 4) Success Criteria
- Exactly 7 pages (+ 404), German-only, all required texts/claims present and not rewritten into aggressive marketing.
- No invented facts (no hours, no reviews, no extra locations, no staff names/photos).
- Contact actions work everywhere (tel/mail/WhatsApp) on desktop and mobile.
- Technical SEO in place: correct titles/descriptions, canonicals, OG, JSON-LD, `sitemap.xml`, `robots.txt`.
- Performance: stable layout (no CLS), fast navigation, subtle motion with reduced-motion support.
- Swappable assets: logo and image areas can be replaced without redesign (placeholders only, no photos in V1).
