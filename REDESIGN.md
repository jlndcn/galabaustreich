# Designanpassung und neue Bilder – September 2026

Die Website verwendet den bestätigten React-Projektstand. Die aktuelle Anpassung
orientiert sich bei Typografie, Anordnung und Komposition wieder am ursprünglichen
Design vor dem Editorial-Redesign.

## Aktueller Stand

- Ursprüngliche lokal eingebundene Figtree für Texte und Überschriften.
- Vertraute helle Navigation mit Logo, Navigationsgruppe und Kontaktaktionen;
  deutlich abgesetzter Forest-Green-Footer mit Logo auf Ivory.
- Hero als durchgehendes Foto mit transparentem Forest-Green-Verlauf und
  Ivory-Headline links unten. Mobil wird ein eigener Hochformat-Ausschnitt geladen.
  Beim normalen Scrollen bewegt sich die Headline leicht nach oben und wird
  transparenter; der anschließende Ivory-Bereich überlappt den Hero leicht.
- Einheitliche Abschnittsabstände: 72 px auf Desktop, 48 px auf Smartphones.
  Kurze Leistungsübersicht auf der Startseite, vollständige Texte auf Leistungen.
- „Alle Leistungen ansehen“, „Weitere Leistungen“, Arbeitsgalerie und das
  Gruppenfoto von der Startseite entfernt. Das Gruppenfoto erscheint nur auf Team.
  Ein dezentes, wiederholtes SVG-Blumenmuster ersetzt die Pflanzenranken auf den
  cremigen Startseitenflächen. Weiße und grüne Bereiche bleiben ohne Muster.
  Rosenpflege-Detail im Leistungsüberblick, Brunnen näher am Regionstext.
- Leistungsseite mit mitlaufender Übersicht (mobil horizontal), größeren Bildern
  einem animierten Punkt beim aktuellen Abschnitt und „KI Optimiert“. Keine Kontakt-CTAs im
  Seiteninhalt; gemeinsame Navigation und Footer bleiben erhalten.
- Über uns und die eigenständige Team-Seite mit persönlicheren Texten und den
  aktualisierten Ordnerbildern, ohne zusätzliche Unternehmensdaten.
- Kontaktadresse verlinkt auf das bestehende Google-Unternehmensprofil.
  Ausführlicher Saisonkasten und Formular schließen auf Desktop unten bündig ab.
  Inhalte wechseln nach Monat und Jahreszeit in Europe/Berlin, auch in offen
  gelassenen Tabs (Minutenprüfung sowie Aktualisierung bei Fokus/Rückkehr).
  Keine Textunterstreichungen.
- Über uns: mehr Abstand nach der Hauptüberschrift und abgegrenzte Wertekästen.
  Team: bildschirmfüllendes Gruppenfoto mit Einführungstext in der unteren Ecke,
  anschließend drei Eigenschaften und ein weißes Informationsband mit Rosenmotiv.
  Die sichtbare Überschrift „Unser Team“ entfällt; eine für Screenreader lesbare H1
  erhält die Überschriftenstruktur. Texte werden nacheinander eingeblendet. Nummerierungen und
  Qualifikationsbadges entfernt; der bestätigte fachliche Hintergrund bleibt als Text.
- Durchgehendes Beratungsband über die volle Breite; Bild-/Text-Paare mit gleicher
  Höhe auf breiten Geräten, passende Bildausschnitte und Stapelung auf Smartphones.
- Fotorealistische, farbige Blüten wachsen bei Maus-Hover entlang der Außenseiten
  der bestehenden Wertekarten und bleiben während des Hovers sichtbar;
  ohne Hover-Abhängigkeit auf Touch und ohne Bewegung bei Reduced Motion.
- Telefon-Icon direkt neben WhatsApp: bewegt sich bei Hover/Fokus nach rechts und
  gibt die Telefonnummer frei; reservierter Platz ohne
  Verschiebung der Navigation. Auf Touch direkt erreichbare Telefonnummer.
- Google-Sternebewertung und „Anfrage senden“ aus dem Footer entfernt, ohne Ersatz.
  Übrige Angaben bleiben erhalten; schwebendes WhatsApp in #25D366.
- Weißer Anrufen-Button mit schwarzer Schrift und schwarzem Icon im grünen
  Beratungsband der Startseite.
- Telefonnummer im Kontaktformular verpflichtend, mit Feldfehler und Fokusführung.
  Auch Netlify Function und Vorschau-Backend verlangen die Telefonnummer;
  eine E-Mail-Adresse bleibt optional. Der bestehende SMTP-Versand bleibt erhalten.
- Der Satz zur Witterung und zum Gartenzustand wurde aus dem Saisonkasten entfernt.
- Schwebendes WhatsApp auf allen Seiten außer Datenschutz, Impressum und AGB;
  blendet sich am Footer und bei überdeckten mobilen Inhalten aus.
- Dezenter magnetischer Button-Hover nur bei Mausbedienung ohne Reduced Motion.
- Kontaktversand, Netlify Function, SMTP, URLs, SEO-Verwaltung, Unternehmensdaten
  und Rechtstexte bleiben erhalten. Barrierefreiheitsverbesserungen am Formular,
  Menü und WhatsApp-Button sind weiterhin vorhanden.

## Bildquellen und Austausch

Außerhalb der Leistungsseite stammen alle Inhaltsfotos aus dem aktuellen Ordner
`Bilder/`. Das bestehende Firmenlogo bleibt erhalten.

| Aktuelle Datei in Bilder | Verwendung |
| --- | --- |
| ChatGPT Image 14. Sept. 2026, 10_50_42.png | Hero |
| ChatGPT Image 14. Sept. 2026, 11_13_21.png | Über uns |
| ChatGPT Image 14. Sept. 2026, 10_47_00.png | Ausschließlich Team-Seite |
| ChatGPT Image 14. Sept. 2026, 10_42_40.png | Arbeitskleidung / Unternehmen |
| ChatGPT Image 14. Sept. 2026, 10_53_11.png | Rechtes Foto im unteren Bildpaar auf Über uns |
| ChatGPT Image 14. Sept. 2026, 11_19_53.png | Rosenmotiv auf Team |
| ChatGPT Image 14. Sept. 2026, 11_18_09.png | Rosenpflege-Detail |
| ChatGPT Image 14. Sept. 2026, 10_35_47.png | Gartenbrunnen |

Die zehn generierten Leistungsbilder liegen unter `assets-src/services/`.
Sie wurden mit dem eingebauten `image_gen` erstellt; die vollständigen Prompts
stehen in `assets-src/service-image-prompts.json`. Diese Motive werden ausschließlich
auf `/leistungen` als allgemeine Leistungsvisualisierungen gezeigt.

Das zusätzlich beauftragte dekorative Blütenmotiv liegt als Original unter
`assets-src/decorations/bluetenrahmen.png`; der vollständige Bildprompt steht in
`assets-src/decorations/PROMPT.md`. Die transparente WebP-Ausgabe (ca. 330 kB)
liegt neben dem kleinen SVG-Blumenmuster unter `frontend/src/assets/decorations/`.
Webpack versieht beide mit einem Dateihash. Die Blüten sind rein dekorativ und
werden von Screenreadern ignoriert. Erneut optimieren mit
`python frontend/scripts/prepare-decorations.py` (Pillow; kein Build-Erfordernis).

Die alten ausgelieferten Foto-Varianten wurden gelöscht und aus den aktuellen
Quellen neu erzeugt. Alle optimierten Dateien liegen in `frontend/public/images/`.
Ein Hash im Dateinamen verhindert die Wiederverwendung alter Browser-Cache-Bilder.
Der Bildindex `frontend/src/data/photos.json` dokumentiert auch die Quelldateien.

Erneute Bildvorbereitung nach einer Änderung der Zuordnung:

```sh
python frontend/scripts/prepare-images.py
```

Das lokale Skript benötigt Pillow. Es erzeugt responsive WebP-Dateien, aktualisiert
den Bildindex und entfernt ausschließlich zuvor registrierte, veraltete Varianten
im Ausgabeordner, nachdem die neuen Dateien erfolgreich erzeugt wurden.
Die Dateien werden fertig vorbereitet mitgeliefert; der Netlify-Build benötigt kein Python.

## Performance und Stack

Der WebGL-Abschnitt, sein Renderer und die ausgelieferten Depth-Map-Varianten
wurden auf Wunsch entfernt. Originaldateien bleiben im Bilder-Ordner erhalten.
Keine neue Runtime-Abhängigkeit. Produktionsbuild: ca. 159,9 kB JavaScript und
15 kB CSS gzip. Dies sind Dateigrößen, keine gemessenen Core Web Vitals.

Der aktuelle Stack ist React 19 mit React Router, CRA/CRACO und Tailwind.
Er funktioniert, ist für eine überwiegend statische Unternehmensseite aber
umfangreicher als nötig. CRA ist offiziell abgekündigt:
https://react.dev/blog/2025/02/14/sunsetting-create-react-app

Für einen später ausdrücklich beauftragten Umbau ist statisches Astro mit
gezielten interaktiven Komponenten die passendere Richtung: Inhalte und
Metadaten würden direkt als HTML ausgeliefert und weniger JavaScript benötigen.
https://docs.astro.build/en/concepts/islands/
Ein Wechsel nur zu Vite würde vor allem das Build-Werkzeug modernisieren,
aber allein noch keine statische HTML-Ausgabe der Seiten schaffen.
Der bestätigte React-Stand bleibt in dieser Designrunde bestehen.

## Prüfung

- Produktionsbuild erfolgreich.
- Bild-/Text-Höhen, Überläufe und Footer auf 320, 390, 768, 1024, 1440, 1920,
  2560 und 3440 px geprüft. Telefon-Hover/Fokus ohne Layoutverschiebung,
  Touch-Telefon und dekorative Pflanzenanimation inklusive Reduced Motion geprüft.
- Sieben Seiten plus 404 auf Desktop und Smartphone geprüft: keine JavaScript-
  Fehler, fehlenden Bilder, horizontalen Überläufe oder automatisch erkannten
  WCAG-A/AA-Verstöße.
- Mobile Navigation, Escape/Fokusrückgabe, Anfrage-Vorauswahl, Pflichtfeldfehler
  sowie simulierte Formular-Erfolgs- und Fehlerantworten geprüft.
- Pflichttelefon zusätzlich serverseitig geprüft: fehlende, leere und ungültige
  Nummern abgewiesen, gültige Nummer mit/ohne E-Mail akzeptiert, Datenschutz und
  Honeypot erhalten. SMTP-Transport vollständig simuliert; kein echter Versand.
- Quelldateien und Ausschluss generierter Bilder außerhalb von Leistungen geprüft.
- Alle zwölf Monate und automatischer Wechsel September/Oktober ohne Neuladen geprüft.
- Kein Canvas, keine Depth-Map-Downloads und kein Gruppenfoto auf der Startseite.
- Animierter Positionspunkt, Reduced Motion, Team-Einblendungen und bündige
  Kontaktspalten auf Desktop geprüft.
- Sticky-Leistungsübersicht, Sprunglinks, Bildbeschriftungen, WhatsApp-Ausnahmen,
  magnetischer Hover, Hero-Übergang und vollständig enthaltener Saisonhinweis geprüft.
- Prüfergebnisse und aktuelle Screenshots liegen unter `test_reports/redesign/`.
- Kein echter E-Mail-Versand bei den Tests; keine Veröffentlichung durchgeführt.
