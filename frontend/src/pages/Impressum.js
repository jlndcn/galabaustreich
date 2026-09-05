import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";

export default function Impressum() {
  return (
    <>
      <Seo
        title={seoPages.impressum.title}
        description={seoPages.impressum.description}
        path={seoPages.impressum.path}
      />
      <LegalLayout eyebrow="Rechtliches" title="Impressum">
        <LegalSection title="Angaben gemäß § 5 DDG">
          <p>
            <strong>{site.legalName}</strong>
            <br />
            Inhaberin: {site.owner}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            {site.address.country}
          </p>
          <p>Rechtsform: {site.legalForm}</p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>
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

        <LegalSection title="Umsatzsteuer-Identifikationsnummer">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a
            Umsatzsteuergesetz:
            <br />
            {site.vatId}
          </p>
        </LegalSection>

        <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          <p>
            {site.owner}
            <br />
            Anschrift wie oben.
          </p>
        </LegalSection>

        <LegalSection title="EU-Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </LegalSection>

        <LegalSection title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
