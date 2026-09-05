import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";

export default function AGB() {
  return (
    <>
      <Seo
        title={seoPages.agb.title}
        description={seoPages.agb.description}
        path={seoPages.agb.path}
      />
      <LegalLayout
        eyebrow="Rechtliches"
        title="Allgemeine Geschäftsbedingungen"
        lead="Unsere Allgemeinen Geschäftsbedingungen befinden sich derzeit in Vorbereitung und werden an dieser Stelle veröffentlicht, sobald sie vorliegen."
      >
        <LegalSection title="Aktueller Stand">
          <p>
            Bis zur Veröffentlichung der AGB gelten die jeweils individuell mit
            Ihnen getroffenen Vereinbarungen. Gerne besprechen wir die
            Rahmenbedingungen einer Zusammenarbeit persönlich mit Ihnen.
          </p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>
            Bei Fragen erreichen Sie uns unter:
          </p>
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
      </LegalLayout>
    </>
  );
}
