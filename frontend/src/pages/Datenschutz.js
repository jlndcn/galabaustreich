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
        eyebrow="Rechtliches"
        title="Datenschutz"
        lead="Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutzinformationen geben einen ersten Überblick. Die endgültige Fassung wird auf Grundlage der tatsächlich eingesetzten Dienste erstellt und vor Veröffentlichung geprüft."
      >
        <LegalSection title="Verantwortlicher">
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
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
        </LegalSection>

        <LegalSection title="Kontaktaufnahme">
          <p>
            Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, werden
            Ihre Angaben zur Bearbeitung Ihrer Anfrage und für den Fall von
            Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter. Die Verarbeitung erfolgt zur Durchführung
            vorvertraglicher Maßnahmen bzw. auf Grundlage unseres berechtigten
            Interesses an der Beantwortung Ihrer Anfrage.
          </p>
          <p>
            Bitte beachten Sie, dass bei der Nutzung von WhatsApp die
            Datenschutzbestimmungen des jeweiligen Anbieters gelten.
          </p>
        </LegalSection>

        <LegalSection title="Keine Formulare, kein Tracking">
          <p>
            Diese Website verzichtet bewusst auf Kontaktformulare,
            Terminbuchungen und Online-Zahlungen. Datenschutzrelevante externe
            Dienste werden so weit wie möglich reduziert. Ein zusätzliches
            Marketing- oder Analyse-Tracking findet durch uns nicht statt.
          </p>
        </LegalSection>

        <LegalSection title="Hosting und Server-Logfiles">
          <p>
            Beim Aufruf dieser Website werden durch den Hosting-Anbieter
            technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit des
            Zugriffs, aufgerufene Seite) in Server-Logfiles verarbeitet. Dies
            dient dem sicheren und stabilen Betrieb der Website.
          </p>
        </LegalSection>

        <LegalSection title="Ihre Rechte">
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen das
            Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten, ein Widerspruchsrecht
            gegen die Verarbeitung sowie ein Recht auf Datenübertragbarkeit.
            Zudem steht Ihnen ein Beschwerderecht bei einer
            Datenschutzaufsichtsbehörde zu.
          </p>
        </LegalSection>

        <LegalSection title="Hinweis">
          <p>
            Dies ist eine vorläufige Datenschutzinformation. Sie wird
            entsprechend den tatsächlich eingesetzten Diensten ergänzt und
            aktualisiert.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
