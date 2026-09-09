# Abschlussbericht – lokale Vorbereitung für Git und Netlify

Stand: 9. September 2026. Ausschließlich im Worktree `C:\Users\Julian\galabaustreich-astro` gearbeitet. Keine Commits, kein Push, kein Deployment und keine echten E-Mails. Das ursprüngliche Repository wurde nicht bearbeitet. Die bereits vorhandene Astro-Migration bleibt erhalten.

## Lokal vollständig erledigt

- Alle sieben Inhaltsseiten sowie die 404-Seite auf Inhalt, responsive Darstellung, Überschriften, Navigation, interne Links und Sprungziele geprüft. Unternehmens-, Leistungs-, Navigations-, SEO- und Saisondaten entsprechen weiterhin dem gesicherten Ausgangsstand. Es wurden keine Unternehmensangaben, Fotos, Referenzen oder Bewertungen erfunden.
- Veraltete EU-ODR-Verweise aus Impressum und Datenschutz entfernt. Anschriften von Netlify und WhatsApp anhand ihrer offiziellen Angaben aktualisiert. Die unbelegte Behauptung einer Versandbegrenzung durch die Function durch die tatsächlich vorhandenen Schutzmaßnahmen ersetzt. Der ursprüngliche Inhaltsdatensatz bleibt unverändert; jede Textkorrektur ist in `frontend/tests/fixtures/content-corrections.ts` ausdrücklich erfasst.
- Der in der Astro-Umstellung fehlende schwebende WhatsApp-Button ist wieder auf allen Seiten vorhanden. Er funktioniert ohne JavaScript, besitzt einen zugänglichen Namen, eine 56-Pixel-Touchfläche und Abstand zur Safe Area. Auf kleinen Displays wird er während der Formulareingabe ausgeblendet; die letzte Fußzeile bleibt erreichbar.
- Formular einschließlich Pflichtfeldern, Telefon oder E-Mail als Kontaktweg, Datenschutzhinweis, Leistungsvorauswahl, Honeypot, Doppelabsendung, Erfolgszustand, Rücksetzen und Fokusführung geprüft. Bei Netzfehlern, Timeout, HTML-Fehlerantworten und fehlgeschlagenem Versand bleibt der Entwurf erhalten.
- Function gehärtet: falsche Feldtypen, überlange Angaben, Steuerzeichen, mehrdeutige Empfängeradressen und ungültige SMTP-Konfiguration werden abgewiesen. Request-Limit von 32 KiB auch ohne verlässlichen Content-Length-Header. Benachrichtigung und optionale Eingangsbestätigung bleiben erhalten. Port 465 verwendet TLS; andere Ports erzwingen STARTTLS. Tests verwenden ausschließlich simulierte Transporte und synthetische Adressen.
- Eindeutige Titel und Beschreibungen, Canonicals, vollständig gerenderte JSON-LD-Unternehmensdaten, Sitemap mit exakt sieben kanonischen URLs, robots.txt und Open Graph geprüft. Das vorhandene OG-Bild ist 1200 × 630 Pixel groß; Bildtyp, Abmessungen und Alternativtexte sind ergänzt. Die 404-Seite ist Noindex und besitzt keinen falschen Startseiten-Canonical.
- Produktion und Vorschau getrennt gebaut und geprüft. Nur Produktion ist indexierbar; Vorschauen erhalten Noindex, gesperrte robots.txt und einen zusätzlichen X-Robots-Tag. Keine laufende Astro-Serveranwendung erforderlich.
- Netlify-TOML und lokale Pfade geprüft. Ungeeignete Slash-Weiterleitungsregeln entfernt, da Netlify die Pfade bereits vor dem Regelvergleich normalisiert. Statische Dateiausgabe, API-Weiterleitung, echter 404-Fallback sowie Cache- und Sicherheitsheader bleiben erhalten.
- Secret-Scan über Projektdateien einschließlich versteckter und ignorierter Build-/Reportdateien, Git-Index und alle erreichbaren historischen Git-Blobs: keine bestätigten Secrets, Passwörter oder API-Keys; keine lokalen `.env`-Dateien und keine getrackten sensitiven Dateipfade gefunden. Die wenigen Muster-Treffer waren ein dynamischer Shell-Lookup, eine Paketversion und historische UI-Testkennungen.
- `.gitignore` um lokale Netlify-Zustände, weitere Environment-/Backup-Dateien, Authentifizierungsdateien und Zertifikatsschlüssel ergänzt. Repräsentative Pfade werden automatisch auf wirksamen Ausschluss geprüft. SMTP-Werte werden ausschließlich aus serverseitigen Environment Variables gelesen.

## Prüfnachweise

| Prüfung | Ergebnis |
| --- | --- |
| Saubere Installation aus npm-Lockfile | Bestanden; keine Versionsänderungen |
| Unit- und Function-Tests | 29 bestanden; kein echter SMTP-Verkehr |
| Vollständige Browserprüfung | 186 bestanden in Chrome, Firefox und WebKit |
| Responsive | Alle Seiten bei 1440 × 1000, 390 × 844 und 768 × 1024; zusätzlich 320, 1024 und 1920 Pixel Breite, Menü im Querformat |
| Accessibility | Keine axe-Verstöße in den geprüften WCAG-A/AA-Regeln bis 2.2; Tastatur, Skip-Link, Menüfokus, Fehlerzustände und Reduced Motion geprüft |
| Inhaltsvergleich | Ausgangstexte erhalten, ausschließlich dokumentierte Rechtstextkorrekturen berücksichtigt |
| Vorschau-Build | 8 HTML-Seiten; Noindex, robots.txt und Header bestanden |
| Produktionsbuild, Formatierung und Abhängigkeits-Audit | Bestanden; Astro-Check ohne Fehler/Warnungen/Hinweise, 8 Seiten, Formatprüfung sauber, `npm audit` ohne Schwachstellen |
| Performance | Lighthouse 13.4.1: Startseite mobil 99/99/100, Desktop 100/100/100; alle sechs weiteren Seiten mobil 99–100; Accessibility, Best Practices und SEO jeweils 100; TBT/CLS 0 |

Automatische Accessibility-Tests ersetzen keine vollständige Prüfung mit Screenreader und physischen Geräten. Der lokale HTTP-Testserver prüft den Website-Build und keine tatsächlich laufende Netlify-CDN-Konfiguration. Der Secret-Scan ist heuristisch: Fremde Dependencies, disposable Browserprofile und Binärinhalte sind ausgenommen; er ist keine Garantie gegen jedes denkbare Secret.

Die Backend-Verzeichnisse enthalten keine ausführbaren Python-Testfälle. Die frühere Vorschauanwendung wurde nicht gestartet. `compare-baseline.mjs` ist das historische Werkzeug zum Erstellen des bereits gesicherten CRA-Vergleichsdatensatzes und wurde nicht erneut ausgeführt.

## Noch vom Kunden benötigte Inhalte und Freigaben

1. **Echte Projekt- und Teamfotos** einschließlich Nutzungsfreigabe, Zuordnung und kurzen Bildbeschreibungen. Sichtbar offen bleiben die Bereiche „Einblicke in unsere Arbeit“ auf der Startseite und „Gesichter im Team“ auf der Teamseite. Für persönliche Porträts fehlen freigegebene Namen, Rollen und Texte. Die bestehenden Rollenbeschreibungen wurden erhalten.
2. **Rechtstextfreigabe anhand der tatsächlichen Betriebsabläufe.** Insbesondere die bestehenden AGB-Konditionen bestätigen: 14 Tage Zahlungsziel, vier Wochen Kündigungsfrist zum Monatsende, zwei Werktage Terminabsage und die Angabe von 15 % bei Kostenvoranschlägen. Vertragsabschluss, Widerruf, Gewährleistung und Haftungsregelungen fachlich freigeben lassen. Die Ausfüllpunkte im Muster-Widerrufsformular sind beabsichtigte Formularfelder und keine fehlenden Unternehmensangaben.
3. **Datenschutzangaben bestätigen:** tatsächlich vereinbarte Auftragsverarbeitung mit Hosting-/Betreuungsdienstleistern, Löschung von Anfragen spätestens sechs Monate nach letzter Kommunikation, unterlagenabhängige Aufbewahrungsfristen sowie eingesetzte WhatsApp-/E-Mail-Prozesse. Die lokal überprüfbaren technischen Inkonsistenzen sind bereits korrigiert; betriebliche Zusagen lassen sich nicht aus Quellcode beweisen.
4. **Vorhandene Unternehmensangaben zur Veröffentlichung freigeben:** Kontaktdaten, Anschrift, USt-ID, Qualifikationen und die manuell gepflegte Google-Bewertung von 5,0 bei sechs Bewertungen. Diese Angaben stammen aus dem Bestand und wurden nicht neu verifiziert oder verändert. Die JSON-LD-Angabe zur Gründerin ist ebenfalls als bestehende Unternehmensangabe zu bestätigen.
5. **SMTP-Konfiguration und endgültige Domain organisatorisch bestätigen.** Zugangsdaten direkt in Netlify hinterlegen; nicht in Dokumente, Git oder den Chat kopieren. Bestehende Zieldomain: `garten-streich.de`.

## Erst nach Netlify-Deployment prüfbare Punkte

- Tatsächliches Netlify-Function-Bundling und Laufzeit, Erreichbarkeit von `/api/contact` und `/.netlify/functions/contact`, Verfügbarkeit der Environment Variables im richtigen Kontext/Scope.
- DNS, primäre Domain, HTTPS, HTTP-/www-Weiterleitungen, Verhalten der Slash- und `.html`-Varianten ohne Weiterleitungsschleifen, Direktaufrufe und tatsächliche HTTP-404-Antworten.
- Sicherheits- und Cache-Header am CDN; Noindex in Deploy Previews; Indexierbarkeit, Canonicals, Sitemap und robots.txt auf der endgültigen Domain; keine indexierbaren Vorschau-Duplikate.
- Tatsächliche SMTP-Zustellung, Eingangsbestätigung, Antwortadresse, Spamordner und SPF/DKIM/DMARC. Ein echter Mailtest bleibt gesondert zu autorisieren und mit Testempfängern abzustimmen.
- Reale mobile WhatsApp-App-Übergabe, Verhalten mit Bildschirmtastatur und Gerätesafe-Areas auf iOS/Android, Screenreader-Prüfung sowie Performance über echtes Netz/CDN. Social-Media-Vorschauen und spätere Search-Console-/Felddaten erst am veröffentlichten Ziel prüfen.
- Eine zusätzliche CDN-seitige Versandbegrenzung ist nicht konfiguriert. Falls sie eingesetzt werden soll, Netlify-Kontoeinstellungen und beide Function-Zugänge prüfen; die Datenschutzerklärung behauptet diese Begrenzung nicht mehr.

## Dateien und Nachweise

- [Entwicklung und wiederholbare Testbefehle](frontend/README.md)
- [Netlify-Konfiguration und spätere Abnahme](NETLIFY_DEPLOY.md)
- [Playwright-Bericht](frontend/playwright-report/index.html)
- [Produktionsnachweis](frontend/reports/build-production.json), [Vorschaunachweis](frontend/reports/build-preview.json)
- [Secret-Scan](frontend/reports/security-scan.json), [Abhängigkeits-Audit](frontend/reports/npm-audit.json)
- [Performance-Messungen](frontend/reports/performance/summary.json), [Screenshots](frontend/reports/screenshots/)

Reports, Screenshots und Build-Ausgaben bleiben lokal und sind durch Git-Ignore ausgeschlossen. Quellcode, Tests und Dokumentation sind im Worktree zur späteren Durchsicht vorbereitet. Commit, Push und Deployment stehen weiterhin aus.

Quellen zu den sachlichen Korrekturen: [EU-Kommission zur eingestellten ODR-Plattform](https://consumer-redress.ec.europa.eu/site-relocation_en), [Netlify-Anschrift](https://www.netlify.com/privacy/), [WhatsApp-Anschrift](https://www.whatsapp.com/legal/privacy-policy-eea), [Netlify-URL-Normalisierung](https://docs.netlify.com/manage/routing/redirects/redirect-options/#trailing-slash), [Function-Environment-Variables](https://docs.netlify.com/build/functions/environment-variables/).
