# Gestaltungssystem – Garten Streich

Diese Fassung ersetzt die früheren CRA-/Shadcn- und Platzhaltervorgaben. Maßgeblich sind die freigegebenen Anforderungen zur Astro-Modernisierung.

## Marke und Inhalt

Ruhiger, regionaler Auftritt in Grün und Creme. Die vorhandenen Logos, Unternehmensdaten, Leistungsbeschreibungen, Kontaktdaten und vom Kunden angegebenen Bewertungen bleiben erhalten. Keine erfundenen Referenzen, Personen, Projekte oder Fotos.

Echte, freigegebene Unternehmensfotografie soll später die Markenflächen ergänzen. Bis dahin keine Stockbilder als vermeintliche Arbeitsproben und keine großen technischen Fotoplatzhalter. Die bestehenden Hinweise auf kommende Fotos bleiben als kompakte Inhalte sichtbar.

## Visuelle Regeln

- Figtree lokal als variable Schrift; lesbare Grundschrift, klare Überschriftenhierarchie.
- Creme `#f7f4ec`, helles Papier `#fffefb`, Waldgrün `#0f2e14`.
- Text `#19291d`, Sekundärtext `#4d5b4e`, Blattgrün `#4a6a2c`.
- Fokus und Text-Hover `#076348`; Fehler `#a82018`. Das leuchtende Markenakzentgrün ist keine Farbe für kleinen Text auf hellem Hintergrund.
- Breite, gegliederte Inhaltsbereiche; feine Linien für Leistungslisten; klare Abstände statt zusätzlicher Kartenebenen.
- Primäraktion „Anfrage senden“ führt unmittelbar zum Formular `#anfrage`. Der bestehende Kontaktanker `#kontakt` bleibt erhalten.
- Keine Preloader, Scroll-Hijacking, animierten Seitenwechsel, Parallaxeffekte oder zusätzlichen Animationsbibliotheken.

## Bedienung

Semantisches HTML, native Links, sichtbare Tastaturfokusse und ein Skip-Link. Das mobile Menü ist ein scrollbarer Dialog mit ausreichend großen Bedienelementen, Escape und Rückgabe des Fokus. Ein No-JavaScript-Menü bleibt verfügbar.

Das Formular zeigt erforderliche Angaben, unmittelbar zugeordnete Fehlermeldungen, einen Versandzustand sowie fokussierte Erfolgs- und Fehlerzustände. Datenschutz öffnet in einem neuen Tab, damit die Eingaben erhalten bleiben. Kein Speichern von Anfragen im Browser.

CSS-Übergänge betreffen nur einfache Zustandswechsel. Reduced Motion deaktiviert sie. Layout und Inhalte müssen bei 320 Pixeln, auf Tablets und großen Bildschirmen nutzbar bleiben.

## Technik und Pflege

Gemeinsame Astro-Komponenten und CSS-Tokens statt einer UI-Bibliothek. Inhalte zuerst statisch rendern; JavaScript nur für tatsächliche Interaktion. Neue Bilder mit passenden Abmessungen, responsiven Varianten und geeigneter Ladepriorität einbinden. Die ausführbaren Prüfungen und der Abschlussbericht dokumentieren den jeweils verifizierten Stand.
