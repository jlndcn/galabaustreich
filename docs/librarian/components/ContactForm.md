# Component: ContactForm

## Erklärung

Die Komponente `ContactForm` liegt unter `frontend/src/components/ContactForm.astro`.

Sie enthält 1 Formular(e) und 7 Felder.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `ContactForm`
- Pfad: `frontend/src/components/ContactForm.astro`

### Imports / Dependencies

- `../data/site`
- `./Icon.astro`

### Inputs / Props

_Nicht dokumentiert — keine belegten Einträge._

### Forms

- **form** action=`/api/contact` method=`post`

### Form Fields

- **name** type=text required=true maxlength=120 honeypot=false
- **phone** type=tel required=false maxlength=40 honeypot=false
- **email** type=email required=false maxlength=160 honeypot=false
- **location** type=text required=false maxlength=160 honeypot=false
- **message** type=text required=true maxlength=4000 honeypot=false
- **website** type=text required=false maxlength=— honeypot=true
- **consent** type=checkbox required=true maxlength=— honeypot=false

### Outputs / Side Effects / HTTP

_Nicht dokumentiert — keine belegten Einträge._

### Runtime / Fehler / Security

- Honeypot-Feld `website`

## Evidence

- **component** ContactForm.astro: `frontend/src/components/ContactForm.astro:1`
- **import** frontend/src/components/ContactForm.astro imports ../data/site: `frontend/src/components/ContactForm.astro:1` — `import { site } from '../data/site'; import Icon from './Icon.astro'; --- <div id="anfrage" class=`
- **import** frontend/src/components/ContactForm.astro imports ./Icon.astro: `frontend/src/components/ContactForm.astro:2` — `import Icon from './Icon.astro'; --- <div id="anfrage" class="inquiry-panel" aria-labelledby="inqu`
- **form** form form in frontend/src/components/ContactForm.astro: `frontend/src/components/ContactForm.astro:17` — `<form 
    id="contact-form"
    action="/api/contact"
    method="post"
    data-test>`
- **form_field** form.name: `frontend/src/components/ContactForm.astro:29` — `<input id="inquiry-name" name="name" autocomplete="name"`
- **form_field** form.phone: `frontend/src/components/ContactForm.astro:43` — `<input id="inquiry-phone" name="phone" type="tel" au`
- **form_field** form.email: `frontend/src/components/ContactForm.astro:56` — `<input id="inquiry-email" name="email" type="email"`
- **form_field** form.location: `frontend/src/components/ContactForm.astro:72` — `<input id="inquiry-location" name="location" autocomplete="addre`
- **form_field** form.message: `frontend/src/components/ContactForm.astro:81` — `<textarea id="inquiry-message" name="message" rows="5"`
- **form_field** form.website: `frontend/src/components/ContactForm.astro:97` — `<input id="inquiry-website" name="website" tabindex="-1" autocomplete="off" /> </div> <d`
- **form_field** form.consent: `frontend/src/components/ContactForm.astro:102` — `<input type="checkbox" id="inquiry-consent" name="consent"`
