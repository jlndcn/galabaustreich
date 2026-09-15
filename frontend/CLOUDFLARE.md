# Cloudflare Pages – garten-streich.de

## Pages-Einstellungen
| Einstellung | Wert |
|-------------|------|
| Root directory | `frontend` |
| Build command | `yarn build` |
| Build output directory | `build` |
| Compatibility date | ≥ `2026-08-04` (siehe `wrangler.toml`: `2026-09-01`) |

## Environment Variables

### Kontaktformular (SMTP)
| Variable | Beispiel |
|----------|----------|
| `SMTP_HOST` | `smtp.strato.de` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@garten-streich.de` |
| `SMTP_PASSWORD` | *(nur in Cloudflare)* |
| `CONTACT_TO` | `info@garten-streich.de` |

### CMS (Passwort-Login, kein GitHub für die Kundin)
| Variable | Bedeutung |
|----------|-----------|
| `CMS_EMAIL` | Redaktions-Login |
| `CMS_PASSWORD` | Redaktions-Passwort |
| `CMS_JWT_SECRET` | Zufallsgeheimnis für Sessions |
| `GITHUB_TOKEN` | Fine-grained PAT (nur Agentur) |
| `GITHUB_REPO` | `jlndcn/galabaustreich` |

Optional statt Einzel-Login: `CMS_USERS` als JSON-Liste.

Keine Secrets im Repository. `REACT_APP_BACKEND_URL` leer lassen.

## Endpoints
| Pfad | Zweck |
|------|--------|
| `POST /api/contact` | Kontaktformular |
| `POST /api/cms/identity/token` | CMS-Login (E-Mail/Passwort, Rate-Limit) |
| `GET /api/cms/identity/user` | CMS-Session (HttpOnly-Cookie) |
| `POST /api/cms/identity/logout` | CMS-Logout |
| `GET /api/cms/git/settings` | Gateway-Status |
| `* /api/cms/git/github/*` | Git Gateway → GitHub API |

## Routing & Headers
- Client-Routen werden von der React-App gerendert; API unter `/api/*` über Pages Functions
- Keine Catch-all-`/* → /index.html`-Regel in `_redirects` (Schutz für Sitemap und andere Statik)
- Apex → www: `functions/_middleware.js` + Einträge in `public/_redirects`
- Headers: `public/_headers`

## Canonical-Domain
Produktive Adresse: **https://www.garten-streich.de**

- `site.domain` / Canonicals / OG / JSON-LD / Sitemap / robots zeigen auf `www`
- Apex `garten-streich.de` → dauerhaft **301** auf `www`
- Repo-seitig: `functions/_middleware.js` + `public/_redirects` (greifen **nur**, wenn der Apex-Traffic Cloudflare Pages erreicht)

## DNS: Apex → www (manuell, STRATO)

**Ist-Zustand (Stand Abnahme):** Nameserver bei STRATO (`*.rzone.de`).  
`www` → CNAME `galabaustreich.pages.dev` (Cloudflare Pages, OK).  
Apex `@` → A `217.160.0.216` (STRATO-Parking: „Domain reserved“; HTTPS bricht ab).  
Deshalb erreichen Middleware/`_redirects` den Apex nie – Fix ist DNS/Weiterleitung, nicht weiterer App-Code.

Cloudflare Pages kann einen **Apex nur mit Cloudflare als DNS-Zone** anbinden (CNAME-Flattening). Mit DNS bei STRATO gibt es **keine** stabile A-IP auf Pages.

### Option A – empfohlen: Zone zu Cloudflare, dann 301 im Repo

1. Domain in Cloudflare hinzufügen (Zone), Nameserver bei STRATO auf die Cloudflare-NS umstellen.
2. Pages → Custom domains: `www.garten-streich.de` **und** `garten-streich.de` aktiv.
3. DNS in Cloudflare: `www` und Apex auf das Pages-Projekt (CF legt Apex per Flattening an).
4. Nach Aktivierung: Apex-Requests laufen über Pages → bestehendes `_middleware.js` / `_redirects` liefern **301** auf `https://www.garten-streich.de/…`.
5. Prüfen: `curl -sI https://garten-streich.de/` → `301` + `location: https://www.garten-streich.de/`.

### Option B – DNS bleibt bei STRATO: Domain-Weiterleitung

Wenn die Zone nicht zu Cloudflare soll:

1. STRATO-Kundencenter → Domain `garten-streich.de` → **Domain-Weiterleitung** / Redirect.
2. Ziel: `https://www.garten-streich.de/` (Pfad möglichst mitnehmen), Typ **permanent / 301**.
3. Apex-A-Record der Parking-Seite entfernen bzw. durch die Weiterleitung ersetzen (kein Parking mehr).
4. `www`-CNAME auf `galabaustreich.pages.dev` unverändert lassen.
5. Prüfen wie oben mit `curl -sI`.

Ohne A oder B bleibt der Apex auf der STRATO-Parking-Seite – unabhängig von `_redirects` und Middleware.

## Docs
- CMS: `CMS.md`
