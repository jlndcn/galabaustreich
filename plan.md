# plan.md (UPDATED)

## 1) Objectives
- Deliver a complete, modern, trustworthy, responsive **German-only** company website for **Garten-und Landschaftspflege B.Streich** (Marke: **Streich**) as a **React SPA** on the existing stack (**React + FastAPI**, MongoDB available).
- Maintain strict content fidelity for business facts: **do not invent** services, qualifications, history, reviews, opening hours, staff names/photos, prices, or project references.
- Implement strong **Local SEO** for **Lübeck, Scharbeutz, Ostholstein** (natural wording) via:
  - per-page titles/descriptions, canonical URLs, Open Graph
  - JSON-LD structured data
  - `sitemap.xml` + `robots.txt`
- Respect the image constraint: **no photos** → use restrained brand surfaces only where needed, with fixed aspect ratios (avoid CLS).
- Use the **client-provided logo** (PNG) and keep an **exchangeable logo slot** via `/frontend/public/*` assets.
- Ensure **clear readability**: reduce decorative labels/"eyebrows" and avoid tile-heavy layouts; use a highly legible typeface.
- Provide contact via **phone, email, WhatsApp**, plus (as requested) a **lean inquiry form** (no booking/payment).

**Status:** V1 delivered earlier. Phase 5 enhancements implemented (design clarity, readable font, final legal pages, Google link integration, contact form + API). Pending: regression test run and policy/analytics alignment check.

---

## 2) Implementation Steps

### Phase 1: Core function/feature POC (Isolation) — skipped
- Proceeded directly to build due to low complexity.

### Phase 2: V1 App Development (React SPA + minimal FastAPI)
**User stories (UX-critical)**
1. Visitor understands **Wer/Was/Wo** (Streich, Leistungen, Region) within seconds on the Startseite.
2. Visitor can contact via **Anruf / WhatsApp / E-Mail** with one tap (header + CTAs).
3. Visitor can scan the **3 wichtigsten Leistungen** and jump to `/leistungen`.
4. Visitor can read all **10 Leistungen** with clear structure and consistent claims.
5. Visitor can find **Impressum/Datenschutz/AGB** quickly; NAP is consistent site-wide.

**Frontend foundation (implemented)**
- Central configs/data modules:
  - `src/data/site.js` (NAP; areaServed; **domain configurable** `site.domain` = `https://garten-streich.de`)
  - `src/data/services.js` (single source of truth for the **10 services** + furtherServices)
  - `src/data/seo.js` (per-route SEO metadata + JSON-LD builder)
- Design system:
  - `src/index.css` brand tokens + improved readability defaults
  - IntersectionObserver-based **Reveal** animation (respects `prefers-reduced-motion`)
- SEO head management:
  - Custom `Seo` component (no Helmet) for title/description/canonical/OG
  - `robots` meta auto-switch: **noindex** on preview/staging; intended **index** on `garten-streich.de`

**Components (implemented)**
- `Logo` (public assets: `logo-header.webp`, `logo-hero.webp`, `logo*.png`)
- `Header` (sticky; desktop nav + contact cluster; mobile Sheet)
- `Footer` (NAP + legal links + Google link)
- `ContactActions` (tel / WhatsApp / mail)
- `ContactCTA` (full-bleed, high-contrast band)
- `ServiceCard` (now non-tile: hairline-separated entries)
- `ContactForm` (lean inquiry form on Home)
- `ScrollToTop`
- `LegalLayout`

**Pages (implemented; exactly 7 + 404 route)**
- `/` Startseite
- `/leistungen`
- `/ueber-uns`
- `/team`
- `/impressum`
- `/datenschutz`
- `/agb`
- `*` 404

**Backend (FastAPI)**
- V1 originally minimal.

### Phase 3: Technical SEO finalization + polish
**User stories**
1. Search engines can discover the pages via `sitemap.xml` and see correct canonical URLs.
2. Site feels fast and stable (no layout jumps; calm motion).
3. Admin can change the domain once (`site.domain`) and canonicals/OG/JSON-LD update.
4. NAP is consistent everywhere.

**Tasks (implemented)**
- Static SEO files in `/public`: `sitemap.xml`, `robots.txt`, `manifest.json`
- Generated brand assets: favicons + `og-image.jpg`
- Self-hosted fonts (privacy/performance)

**Testing (completed for V1, pre-Phase-5)**
- `testing_agent_v3` iteration_1: **100% frontend pass**, 0 issues.

---

### Phase 5: Readability + Legal + Google + Inquiry Form (requested) — COMPLETED (tested: iteration_2, backend 12/12, frontend 46/46)
**User stories**
1. Visitors can read the site comfortably (clear font, less visual noise).
2. Legal pages are final (Datenschutz + AGB), consistent with actual features.
3. Google presence is linked for stronger local visibility.
4. Users can send a short inquiry without calling (form), while still offering phone/WhatsApp/email.

**Design/UX changes (implemented)**
- **Typography:** switched to **Figtree variable** (self-hosted) for headings and body.
  - Files: `/frontend/public/fonts/figtree-variable*.woff2`
  - CSS: `/frontend/public/fonts.css`, referenced in `public/index.html` with preload.
- **Reduced “eyebrows” and tiles:** removed reliance on `.eyebrow` labels and replaced tile-heavy blocks with clearer, hairline-separated lists and simple columns.
  - Home: key services as column blocks; additional services as list; dedicated contact section with form.
  - Leistungen: sticky TOC + section list; simplified sections; fewer decorative surfaces.
  - Über uns: facts via `dl` (no cards), values as simple columns.
  - Team: simple columns and list.
  - Footer: plain column layout, improved legibility.

**Google-Unternehmensprofil integration (implemented)**
- Added `site.google.profileUrl` (currently `null`) + fallback `mapsUrl` (Maps search by business name/address).
- Exposed `googleLink` used in:
  - Footer, Home contact section, Impressum
- SEO/JSON-LD:
  - `hasMap` uses `googleLink`
  - `sameAs` is included **only if** `profileUrl` is set

**Inquiry form + API (implemented)**
- Frontend: `ContactForm` on `/` at `#kontakt` / `#anfrage`
  - Validations: name, message, at least one of phone/email, consent checkbox
  - Sonner toasts for success/failure
- Backend:
  - `POST /api/contact` stores request in MongoDB (`contact_requests`)
  - Anti-spam: honeypot field (`website`), in-memory per-IP rate limit (**5/hour**)
  - `GET /api/contact` protected via `X-Admin-Token` header (token stored in `backend/.env` as `CONTACT_ADMIN_TOKEN`)

**Legal texts (implemented)**
- `/datenschutz`: replaced placeholder with a full policy (sections incl. hosting/logs, phone/email contact, form processing, WhatsApp, external links, rights; Stand September 2026).
- `/agb`: replaced placeholder with full AGB for gardening/landscape services incl. Widerrufsbelehrung; includes adjustable `terms` object.

**Known alignment issue / follow-up**
- Tracking is removed from `public/index.html` (no analytics / generator scripts). Production remains tracking-frei.

### Phase 6: E-Mail-Benachrichtigung, Google-Profil, Tracking-frei, Saisonhinweise — COMPLETED (tested: iteration_3, 25/25)
- **E-Mail (SMTP, user choice)**: `backend/mailer.py` (stdlib smtplib, async via to_thread, STARTTLS/SSL/none). `POST /api/contact` triggers a BackgroundTask: notification to `MAIL_TO` (Reply-To = customer e-mail) + confirmation to the customer if e-mail given (user chose "Ja"). Flags `notification_sent` / `confirmation_sent` stored on the record. Graceful degradation when SMTP env is empty. Env placeholders appended to `backend/.env`: `SMTP_HOST, SMTP_PORT=587, SMTP_USER, SMTP_PASSWORD, SMTP_SECURITY=starttls, MAIL_FROM, MAIL_TO=info@garten-streich.de`. Protected `GET /api/contact/mail-status` (X-Admin-Token). **Open: user must supply real SMTP credentials; then `sudo supervisorctl restart backend`.**
- **Google-Profil**: user-provided Knowledge-Panel URL stored in `site.google.profileUrl` (stripped `authuser`); used for all Google links + `hasMap` + `sameAs` in JSON-LD.
- **Tracking-frei**: `public/index.html` contains no analytics or generator scripts.
- **Saisonhinweise**: `src/data/seasons.js` (month -> service ids + note, based on general horticultural practice and § 39 BNatSchG cutting season) + `SeasonHint` component in Home contact section.
- Datenschutz §5 updated (e-mail notification + Eingangsbestätigung).

### Phase 7: Logo, Navbar, Footer, Kacheln, Sterne, saisonale Top-3, mehr CTA, Netlify-Kontaktformular — IMPLEMENTED (pending regression test)
- **Logo**: user-provided transparent PNG (`/app/assets-src/logo-new.png` = master). Generated: `logo-header.webp` (480x360), `logo-hero.webp`, `logo-transparent.png`, `logo.png`, `favicon.ico`/`favicon-64.png` + `logo192/512.png` (Holstentor-Emblem-Ausschnitt), `og-image.jpg`. Old `logo-header.png` removed.
- **Navbar** (`Header.js`): white bar, logo left, pill navigation (cream group, white active pill), phone number + WhatsApp round icon + "Anfrage senden" CTA (→ `/#kontakt`); mobile: phone button + Sheet with logo, nav, CTA, ContactActions, GoogleRating, legal links.
- **Footer** (`Footer.js`): light (white) so the logo renders; columns Kontakt/Anschrift/Seiten/Rechtliches, GoogleRating inline, CTA; bottom bar with "Made and hosted by diaconuit.de" (`site.madeBy`).
- **Google rating**: manual values in `site.google.rating = 5.0`, `reviewCount = 6` (user-provided); `GoogleRating`/`Stars` component (inline/block), shown in hero, footer, mobile menu, contact tile.
- **Contact section** (Home): `ContactTiles` (Anrufen / WhatsApp / E-Mail / Google-Sterne) + address + SeasonHint; form column with prefill via `/?leistung=<id>#kontakt`.
- **Seasonal top-3** (`getSeasonalTop` in `seasons.js`): Home "Unsere gefragtesten Leistungen im <Monat>" picks the 3 most relevant services for the current month; teaser list = remaining services.
- **More CTA**: hero (Anfrage senden + phone), dark CTA band after top services, per-service "Diese Leistung anfragen" on /leistungen, `FloatingWhatsApp` button (all pages), header/footer CTAs. Toaster moved to top-center.
- **Netlify** (production target): `/app/netlify.toml` (base=frontend, publish=build, functions=netlify/functions, `/api/*` → functions, SPA redirect, headers, `REACT_APP_BACKEND_URL=""`), `frontend/netlify/functions/contact.mjs` (nodemailer 10, STRATO 465 SSL, env-only config, POST-only, validation + limits, honeypot, From=SMTP_USER "Garten Streich Website", Reply-To=visitor, subject "Neue Anfrage über garten-streich.de", confirmation mail, no internal details in errors). Verified locally against a fake TLS SMTP server (all cases). `ContactForm` posts to relative `/api` when `REACT_APP_BACKEND_URL` is empty. `.gitignore` now excludes `.env` files. Docs: `/app/NETLIFY_DEPLOY.md`, `backend/.env.example`.
- FastAPI mailer aligned (From name, subject, `CONTACT_TO`, 465 → SSL auto).
- Datenschutz §3 (Netlify/diaconuit, SCC) and §5 (STRATO mail server, honeypot) updated.

---

## 3) Next Actions
- Run a **full regression test** (frontend routes + mobile nav + SEO tags + inquiry form flow + backend contact endpoints).
- Enter real SMTP credentials into `backend/.env` and restart backend; verify via `GET /api/contact/mail-status` and a test inquiry.
- Client inputs:
  1. (done) Google Business Profile URL configured.
  2. Confirm final production domain (or update `site.domain`) and regenerate sitemap/robots if domain changes.
  3. Optional: provide final vector logo and real photos (if desired).

---

## 4) Success Criteria
- Exactly **7 pages** (+ 404), **German-only**.
- No invented business facts; services remain the defined set.
- Contact options work everywhere:
  - tel / mail / WhatsApp links
  - **lean inquiry form** submits successfully and stores inquiries
- Local SEO:
  - correct titles/descriptions, canonicals, OG, JSON-LD
  - `sitemap.xml`, `robots.txt`
- Readability:
  - clear font (Figtree), high contrast, minimal decorative labels, reduced tile usage
- Privacy consistency:
  - legal text matches actual deployed scripts/services (no contradiction).
- Performance:
  - stable layout (no CLS), fast navigation, subtle motion with reduced-motion support.
