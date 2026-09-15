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
| `POST /api/cms/identity/token` | CMS-Login (E-Mail/Passwort) |
| `GET /api/cms/identity/user` | CMS-Session |
| `GET /api/cms/git/settings` | Gateway-Status |
| `* /api/cms/git/github/*` | Git Gateway → GitHub API |

## SPA / Routing
- `public/_redirects`: `/* → /index.html` (200)
- Functions unter `/api/*` und `/.netlify/*` haben Vorrang
- Headers: `public/_headers`

## Docs
- CMS: `CMS.md`
