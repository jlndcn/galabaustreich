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
- In Cloudflare sollten **beide** Hostnames am Pages-Projekt hängen; HTTPS immer aktiv

## Docs
- CMS: `CMS.md`
