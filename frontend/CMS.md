# Headless CMS (Decap CMS) auf Cloudflare Pages

## Für die Redaktion
- Admin: `https://www.garten-streich.de/admin/`
- Login mit **E-Mail + Passwort**
- **Kein GitHub-Konto** nötig
- Speichern erzeugt automatisch einen Commit und einen Cloudflare-Build

## Was ist editierbar?

| Bereich | Ort im Admin |
|---------|--------------|
| Firmendaten / Kontakt / Google-Bewertung | Firmendaten |
| Leistungen | Leistungen |
| Startseiten-Texte | Startseite |
| Über uns / Team | Seiten |
| Bilder austauschen | Bilder → Bild-Slots |
| Impressum / Datenschutz / AGB | Rechtstexte |
| AGB-Parameter | Rechtstexte → AGB-Parameter |
| Saisonhinweise | Saisonhinweise |
| SEO | SEO |
| Alt-Texte Leistungsbilder | Bildtexte Leistungen |

### Rechtstexte – Platzhalter
`{{legalName}}` `{{owner}}` `{{street}}` `{{zip}}` `{{city}}` `{{phone}}` `{{email}}` `{{vatId}}` `{{googleLink}}`  
AGB: `{{paymentDays}}` `{{noticePeriod}}` `{{cancellationLeadDays}}` `{{estimateDeviationPercent}}`

## Einrichtung (Agentur, einmalig)

### 1. GitHub Fine-grained PAT (nur Agentur)
GitHub → Settings → Developer settings → Personal access tokens → Fine-grained token:

- Repository: `jlndcn/galabaustreich`
- Permissions: **Contents: Read and write**, **Metadata: Read**
- Token sicher notieren (nie ins Repo)

### 2. Cloudflare Pages Environment Variables

| Variable | Bedeutung |
|----------|-----------|
| `CMS_EMAIL` | Login-E-Mail der Redaktion |
| `CMS_PASSWORD` | Login-Passwort |
| `CMS_JWT_SECRET` | langer Zufallsstring (Session-Signatur) |
| `GITHUB_TOKEN` | Fine-grained PAT von Schritt 1 |
| `GITHUB_REPO` | `jlndcn/galabaustreich` |

Mehrere Redakteure optional als JSON:

```text
CMS_USERS=[{"email":"redaktion@example.de","password":"..."},{"email":"zweit@example.de","password":"..."}]
```

(Wenn `CMS_USERS` gesetzt ist, reichen `CMS_EMAIL`/`CMS_PASSWORD` nicht mehr allein.)

Bestehende SMTP-Variablen bleiben unverändert.

### 3. Admin öffnen
`https://www.garten-streich.de/admin/` → E-Mail/Passwort → Inhalte speichern.

## Technik / Sicherheit
- Backend: `git-gateway` mit `gateway_url: /api/cms/git/github`
- Login: `POST /api/cms/identity/token` (Passwort → HttpOnly-Cookie + kurzes JWT)
- Session: `GET /api/cms/identity/user` (Cookie), Logout: `POST /api/cms/identity/logout`
- Brute-Force: nach 8 Fehlversuchen / IP ca. 15 Min Sperre (429)
- Decap CMS: selbst gehostet unter `/admin/decap-cms.js` (kein unpkg)
- Speichern: `/api/cms/git/github/*` → GitHub API mit `GITHUB_TOKEN`

## Lokal (optional)
```bash
npx decap-server
# in config.yml kurz: local_backend: true
cd frontend && yarn start
# http://localhost:3000/admin/
```
