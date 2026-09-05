import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";

export default function Datenschutz() {
  return (
    <>
      <Seo
        title={seoPages.datenschutz.title}
        description={seoPages.datenschutz.description}
        path={seoPages.datenschutz.path}
      />
      <LegalLayout
        title="Datenschutzerklärung"
        lead="Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten wir bei der Nutzung unserer Website und bei der Kontaktaufnahme verarbeiten, zu welchen Zwecken dies geschieht und welche Rechte Ihnen zustehen."
        stand="September 2026"
      >
        <LegalSection title="1. Verantwortlicher">
          <p>
            Verantwortlich für die Datenverarbeitung im Sinne der
            Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p>
            <strong>{site.legalName}</strong>
            <br />
            Inhaberin: {site.owner}
            <br />
            {site.address.street}, {site.address.zip} {site.address.city}
            <br />
            Telefon:{" "}
            <a href={site.phone.href} className="link-underline">
              {site.phone.display}
            </a>
            <br />
            E-Mail:{" "}
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
          </p>
          <p>
            Anfragen zum Datenschutz richten Sie bitte an die oben genannten
            Kontaktdaten.
          </p>
        </LegalSection>

        <LegalSection title="2. Allgemeine Hinweise">
          <p>
            Personenbezogene Daten sind alle Informationen, mit denen Sie
            persönlich identifiziert werden können, zum Beispiel Name,
            Anschrift, Telefonnummer oder E-Mail-Adresse. Wir verarbeiten
            Ihre Daten ausschließlich im Rahmen der gesetzlichen Bestimmungen,
            insbesondere der DSGVO, des Bundesdatenschutzgesetzes (BDSG) und
            des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes
            (TDDDG).
          </p>
          <p>
            Diese Website kann grundsätzlich ohne Angabe personenbezogener
            Daten genutzt werden. Personenbezogene Daten verarbeiten wir nur,
            wenn Sie sie uns freiwillig mitteilen – etwa bei einer
            Kontaktaufnahme oder über unser Anfrageformular – oder soweit dies
            für den technischen Betrieb der Website erforderlich ist.
          </p>
        </LegalSection>

        <LegalSection title="3. Hosting und Server-Logfiles">
          <p>
            Diese Website wird bei einem externen Dienstleister gehostet. Beim
            Aufruf unserer Website werden automatisch Informationen in
            sogenannten Server-Logfiles gespeichert, die Ihr Browser an den
            Server übermittelt. Dies sind:
          </p>
          <ul>
            <li>IP-Adresse des zugreifenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Seite bzw. Datei und übertragene Datenmenge</li>
            <li>Referrer-URL (zuvor besuchte Seite)</li>
            <li>Browsertyp und -version sowie verwendetes Betriebssystem</li>
          </ul>
          <p>
            Die Verarbeitung dient dem sicheren und stabilen Betrieb der
            Website, der Fehleranalyse sowie der Abwehr von Angriffen.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an einer sicheren und funktionsfähigen Website). Die
            Logfiles werden nur so lange gespeichert, wie dies für die
            genannten Zwecke erforderlich ist, und anschließend gelöscht oder
            anonymisiert. Eine Zusammenführung dieser Daten mit anderen
            Datenquellen findet nicht statt.
          </p>
          <p>
            Soweit der Hosting-Anbieter in unserem Auftrag personenbezogene
            Daten verarbeitet, erfolgt dies auf Grundlage eines Vertrags über
            Auftragsverarbeitung nach Art. 28 DSGVO.
          </p>
        </LegalSection>

        <LegalSection title="4. Kontaktaufnahme per Telefon oder E-Mail">
          <p>
            Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir
            die von Ihnen mitgeteilten Daten (z. B. Name, Telefonnummer,
            E-Mail-Adresse, Inhalt Ihrer Anfrage), um Ihre Anfrage zu
            bearbeiten und zu beantworten sowie für den Fall von
            Anschlussfragen.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre
            Anfrage auf den Abschluss oder die Durchführung eines Vertrags
            gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Beantwortung von Anfragen). Die Daten werden
            gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich
            sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </LegalSection>

        <LegalSection title="5. Anfrageformular" id="kontaktformular">
          <p>
            Auf unserer Startseite bieten wir ein Anfrageformular als
            zusätzlichen Kontaktweg an. Wenn Sie es nutzen, verarbeiten wir
            folgende Angaben:
          </p>
          <ul>
            <li>Name (Pflichtangabe)</li>
            <li>Telefonnummer und/oder E-Mail-Adresse (mindestens eine Angabe erforderlich)</li>
            <li>Ort des Gartens bzw. Grundstücks (freiwillige Angabe)</li>
            <li>Inhalt Ihrer Nachricht (Pflichtangabe)</li>
            <li>Zeitpunkt der Übermittlung und die Seite, von der das Formular gesendet wurde</li>
          </ul>
          <p>
            Die Daten werden verschlüsselt übertragen und in einer
            zugangsgeschützten Datenbank gespeichert, damit wir Ihre Anfrage
            bearbeiten und uns bei Ihnen melden können. Ihre IP-Adresse wird
            nicht zusammen mit Ihrer Anfrage gespeichert. Zur Abwehr
            automatisierter Missbrauchsversuche wird die Anzahl der Absendungen
            je Verbindung lediglich kurzzeitig und ohne dauerhafte Speicherung
            technisch begrenzt.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung
            vorvertraglicher Maßnahmen auf Ihre Anfrage), im Übrigen Art. 6
            Abs. 1 lit. f DSGVO. Mit dem Absenden des Formulars bestätigen Sie,
            diese Datenschutzerklärung zur Kenntnis genommen zu haben.
          </p>
          <p>
            Die über das Formular übermittelten Daten werden gelöscht, sobald
            Ihre Anfrage abschließend bearbeitet ist und kein Vertrag zustande
            kommt, spätestens jedoch sechs Monate nach der letzten
            Kommunikation. Kommt es zu einem Auftrag, gelten die
            Aufbewahrungsfristen gemäß Abschnitt 7.
          </p>
        </LegalSection>

        <LegalSection title="6. Kontakt über WhatsApp">
          <p>
            Wir bieten Ihnen die Möglichkeit, uns über den Messenger-Dienst
            WhatsApp zu kontaktieren. Anbieter ist WhatsApp Ireland Limited,
            4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland (ein
            Unternehmen der Meta-Gruppe). Wenn Sie uns über WhatsApp
            kontaktieren, verarbeiten wir Ihre Telefonnummer, Ihren
            Profilnamen sowie die Inhalte Ihrer Nachrichten zur Bearbeitung
            Ihrer Anfrage (Art. 6 Abs. 1 lit. b und f DSGVO).
          </p>
          <p>
            Bei der Nutzung von WhatsApp werden Daten – insbesondere
            Metadaten wie Telefonnummer, Geräte- und Verbindungsdaten – durch
            WhatsApp verarbeitet; dabei kann es zu einer Übermittlung in
            Drittländer, insbesondere in die USA, kommen. Die Nachrichteninhalte
            sind Ende-zu-Ende-verschlüsselt. Die Nutzung von WhatsApp ist
            freiwillig; alternativ erreichen Sie uns jederzeit telefonisch, per
            E-Mail oder über unser Anfrageformular. Weitere Informationen
            finden Sie in der Datenschutzrichtlinie von WhatsApp unter{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy-eea"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              www.whatsapp.com/legal/privacy-policy-eea
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Verarbeitung im Rahmen von Angeboten und Aufträgen">
          <p>
            Erteilen Sie uns einen Auftrag oder fordern Sie ein Angebot an,
            verarbeiten wir die hierfür erforderlichen Daten (insbesondere
            Name, Anschrift des Grundstücks, Kontaktdaten, Angaben zu den
            gewünschten Leistungen sowie Rechnungs- und Zahlungsdaten) zur
            Angebotserstellung, Vertragsdurchführung und Abrechnung.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
          </p>
          <p>
            Rechnungs- und Buchungsbelege bewahren wir aufgrund handels- und
            steuerrechtlicher Vorgaben (insbesondere § 147 AO, § 257 HGB) für
            die gesetzlich vorgeschriebene Dauer von bis zu zehn Jahren auf
            (Art. 6 Abs. 1 lit. c DSGVO). Soweit erforderlich, geben wir Daten
            an unsere Steuerberatung, unser Kreditinstitut oder – bei
            Zahlungsverzug – an Inkassodienstleister bzw. Gerichte weiter.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies, Analyse- und Tracking-Dienste">
          <p>
            Unsere Website setzt keine eigenen Cookies ein und verwendet keine
            Analyse-, Tracking- oder Marketing-Werkzeuge. Es werden keine
            Nutzungsprofile erstellt und keine Daten zu Werbezwecken an Dritte
            weitergegeben.
          </p>
        </LegalSection>

        <LegalSection title="9. Schriftarten">
          <p>
            Die auf dieser Website verwendeten Schriftarten sind lokal auf
            unserem Server gespeichert. Beim Aufruf der Website wird keine
            Verbindung zu Servern von Schriftanbietern (z. B. Google Fonts)
            aufgebaut.
          </p>
        </LegalSection>

        <LegalSection title="10. Links zu externen Angeboten (Google, WhatsApp, EU-Plattform)">
          <p>
            Unsere Website enthält Verweise auf unser Unternehmensprofil bei
            Google bzw. Google Maps (Anbieter: Google Ireland Limited, Gordon
            House, Barrow Street, Dublin 4, Irland), auf WhatsApp sowie auf die
            Plattform der EU-Kommission zur Online-Streitbeilegung. Diese
            Dienste sind nicht in unsere Website eingebettet; es werden erst
            dann Daten an den jeweiligen Anbieter übertragen, wenn Sie einen
            solchen Link aktiv anklicken. Ab diesem Zeitpunkt gelten die
            Datenschutzbestimmungen des jeweiligen Anbieters, z. B.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              policies.google.com/privacy
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="11. Weitergabe von Daten">
          <p>
            Eine Übermittlung Ihrer personenbezogenen Daten an Dritte erfolgt
            nur, wenn dies zur Vertragsdurchführung erforderlich ist (z. B.
            an Steuerberatung oder Kreditinstitut), wenn Sie eingewilligt
            haben, wenn wir gesetzlich dazu verpflichtet sind oder wenn ein
            Dienstleister in unserem Auftrag Daten verarbeitet (z. B. Hosting).
            Ein Verkauf Ihrer Daten findet nicht statt.
          </p>
        </LegalSection>

        <LegalSection title="12. Speicherdauer">
          <p>
            Soweit in dieser Datenschutzerklärung keine speziellere
            Speicherdauer genannt ist, verbleiben Ihre personenbezogenen Daten
            bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie
            ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
            widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen
            rechtlich zulässigen Gründe für die Speicherung haben (z. B. steuer-
            oder handelsrechtliche Aufbewahrungsfristen).
          </p>
        </LegalSection>

        <LegalSection title="13. Datensicherheit">
          <p>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung vertraulicher Inhalte eine TLS/SSL-Verschlüsselung. Eine
            verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
            des Browsers von „http://“ auf „https://“ wechselt, sowie am
            Schloss-Symbol in Ihrer Browserzeile. Wir treffen darüber hinaus
            angemessene technische und organisatorische Maßnahmen, um Ihre
            Daten gegen Verlust, Missbrauch und unberechtigten Zugriff zu
            schützen.
          </p>
        </LegalSection>

        <LegalSection title="14. Ihre Rechte">
          <p>Ihnen stehen im Rahmen der gesetzlichen Bestimmungen folgende Rechte zu:</p>
          <ul>
            <li>Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO, siehe Abschnitt 15)</li>
            <li>
              Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die
              Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO)
            </li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die
            unter Abschnitt 1 genannten Kontaktdaten.
          </p>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
            zu beschweren (Art. 77 DSGVO). Die für uns zuständige Aufsichtsbehörde
            ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein
            (ULD), Holstenstraße 98, 24103 Kiel,{" "}
            <a
              href="https://www.datenschutzzentrum.de"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              www.datenschutzzentrum.de
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="15. Widerspruchsrecht">
          <p>
            <strong>
              Soweit wir Ihre personenbezogenen Daten auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse) verarbeiten, haben
              Sie das Recht, aus Gründen, die sich aus Ihrer besonderen
              Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung
              einzulegen. Wir verarbeiten Ihre Daten dann nicht mehr, es sei
              denn, wir können zwingende schutzwürdige Gründe für die
              Verarbeitung nachweisen, die Ihre Interessen, Rechte und
              Freiheiten überwiegen, oder die Verarbeitung dient der
              Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
            </strong>
          </p>
        </LegalSection>

        <LegalSection title="16. Keine automatisierte Entscheidungsfindung">
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich Profiling
            im Sinne von Art. 22 DSGVO findet nicht statt.
          </p>
        </LegalSection>

        <LegalSection title="17. Änderung dieser Datenschutzerklärung">
          <p>
            Wir passen diese Datenschutzerklärung an, sobald sich die
            Rechtslage, unsere Leistungen oder die eingesetzten technischen
            Dienste ändern. Es gilt jeweils die auf dieser Seite
            veröffentlichte aktuelle Fassung.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
