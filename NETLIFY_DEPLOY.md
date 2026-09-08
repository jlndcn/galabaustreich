# Deployment auf Netlify – garten-streich.de

## Struktur
- `frontend/` – React-App (Create React App). Build: `yarn build` → `frontend/build`
- `frontend/netlify/functions/contact.mjs` – Netlify Function für das Kontaktformular (nodemailer, STRATO-SMTP)
- `netlify.toml` (Repo-Root) – Build-Einstellungen, `/api/* → Functions`, SPA-Redirect, Security-Header

Das Frontend sendet das Formular ausschließlich per HTTPS-POST an `/api/contact`.
SMTP wird **nur** serverseitig in der Netlify Function gesprochen – niemals im Browser.

## Environment Variables (Netlify → Site configuration → Environment variables)
| Variable        | Wert                        |
|-----------------|-----------------------------|
| `SMTP_HOST`     | `smtp.strato.de`            |
| `SMTP_PORT`     | `465` (SSL/TLS)             |
| `SMTP_USER`     | `info@garten-streich.de`    |
| `SMTP_PASSWORD` | *(nur in Netlify hinterlegen)* |
| `CONTACT_TO`    | `info@garten-streich.de`    |

Nicht setzen bzw. leer lassen: `REACT_APP_BACKEND_URL` (dann wird relativ `/api/contact` verwendet).
`.env`-Dateien sind über `.gitignore` vom Repository ausgeschlossen.

## Verhalten der Function
- Nur `POST` (sonst `405`), JSON-Body, serverseitige Validierung + Längenbegrenzung, unsichtbarer Honeypot (`website`)
- Benachrichtigung: `From: Garten Streich Website <info@garten-streich.de>`, `To: CONTACT_TO`,
  `Reply-To: <Besucher-E-Mail>`, `Subject: Neue Anfrage über garten-streich.de`
- Eingangsbestätigung an den Besucher, wenn eine E-Mail-Adresse angegeben wurde
- Fehler werden ohne interne Details beantwortet (`400`, `502`, `503`, `405`)

## Schritte
1. Repository mit Netlify verbinden (Build läuft automatisch über `netlify.toml`).
2. Environment Variables wie oben setzen (SMTP-Passwort nur dort).
3. Domain `garten-streich.de` in Netlify hinzufügen, HTTPS aktivieren.
4. Testanfrage über das Formular senden und Eingang in Outlook prüfen („Antworten“ geht direkt an den Kunden).

## Preview-Umgebung (Emergent)
Dort läuft stattdessen das FastAPI-Backend (`backend/server.py`, gleiche Env-Namen). Anfragen werden zusätzlich in
MongoDB gespeichert und sind über `GET /api/contact` (Header `X-Admin-Token`) einsehbar.
