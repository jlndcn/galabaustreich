import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";

// Central, adjustable contract parameters used in the AGB text.
const terms = {
  paymentDays: 14,
  noticePeriod: "vier Wochen zum Monatsende",
  cancellationLeadDays: 2,
  estimateDeviationPercent: 15,
};

export default function AGB() {
  return (
    <>
      <Seo
        title={seoPages.agb.title}
        description={seoPages.agb.description}
        path={seoPages.agb.path}
      />
      <LegalLayout
        title="Allgemeine Geschäftsbedingungen"
        lead={`Allgemeine Geschäftsbedingungen der ${site.legalName}, Inhaberin ${site.owner}, ${site.address.street}, ${site.address.zip} ${site.address.city} (nachfolgend „Auftragnehmer“) für Leistungen der Garten- und Landschaftspflege.`}
        stand="September 2026"
      >
        <LegalSection title="§ 1 Geltungsbereich">
          <ol>
            <li>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
              Verträge über Leistungen der Garten- und Landschaftspflege sowie
              damit zusammenhängende Arbeiten – insbesondere Garten- und
              Grünflächenpflege, Hecken- und Gehölzpflege, Rasenpflege, Beet-
              und Staudenpflege, Neupflanzungen, Baumfällungen,
              Gartenumgestaltung, saisonale Gartenarbeiten, Objekt- und
              Grundstückspflege, Winterdienst, Hausmeisterdienste sowie
              Terrassen- und Außenflächenreinigung –, die zwischen dem
              Auftragnehmer und dem Kunden (nachfolgend „Auftraggeber“)
              geschlossen werden.
            </li>
            <li>
              Die AGB gelten gegenüber Verbrauchern (§ 13 BGB) und Unternehmern
              (§ 14 BGB). Soweit einzelne Regelungen nur für eine dieser
              Gruppen gelten, ist dies ausdrücklich gekennzeichnet.
            </li>
            <li>
              Abweichende, entgegenstehende oder ergänzende Bedingungen des
              Auftraggebers werden nur Vertragsbestandteil, wenn der
              Auftragnehmer ihrer Geltung ausdrücklich in Textform zugestimmt
              hat.
            </li>
            <li>
              Individuelle Vereinbarungen zwischen den Parteien haben Vorrang vor
              diesen AGB.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 2 Angebote, Kostenvoranschläge und Vertragsschluss">
          <ol>
            <li>
              Angebote des Auftragnehmers sind freibleibend, sofern sie nicht
              ausdrücklich als verbindlich bezeichnet sind. Kostenvoranschläge
              sind unverbindlich; sie beruhen auf den bei der Besichtigung
              erkennbaren Gegebenheiten und den Angaben des Auftraggebers.
            </li>
            <li>
              Der Vertrag kommt durch die Annahme des Angebots durch den
              Auftraggeber (in Textform, per E-Mail, WhatsApp oder mündlich)
              und die Bestätigung durch den Auftragnehmer oder spätestens mit
              Beginn der Arbeiten zustande.
            </li>
            <li>
              Zeichnet sich während der Ausführung ab, dass ein
              Kostenvoranschlag wesentlich (in der Regel um mehr als{" "}
              {terms.estimateDeviationPercent} %) überschritten wird, zeigt
              der Auftragnehmer dies dem Auftraggeber unverzüglich an (§ 650
              BGB). Der Auftraggeber kann den Vertrag in diesem Fall kündigen;
              bereits erbrachte Leistungen sind zu vergüten.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 3 Leistungsumfang und Ausführung">
          <ol>
            <li>
              Art und Umfang der Leistungen ergeben sich aus dem Angebot bzw.
              der Auftragsbestätigung. Nicht ausdrücklich aufgeführte
              Leistungen sind nicht geschuldet.
            </li>
            <li>
              Der Auftragnehmer führt die Arbeiten fachgerecht nach den
              anerkannten Regeln der gärtnerischen Fachpraxis und unter
              Beachtung der einschlägigen Vorschriften aus. Er ist berechtigt,
              sich zur Erfüllung fachkundiger Dritter zu bedienen.
            </li>
            <li>
              Änderungen und Zusatzleistungen bedürfen einer Vereinbarung und
              werden gesondert vergütet. Ohne Vereinbarung gilt hierfür die
              übliche Vergütung.
            </li>
            <li>
              Die Entsorgung von anfallendem Grünschnitt, Holz, Wurzelwerk und
              sonstigen Materialien ist nur geschuldet, wenn dies vereinbart
              ist. Entsorgungskosten werden gesondert berechnet, sofern sie
              nicht im Angebot enthalten sind.
            </li>
            <li>
              Pflanzen sind Naturprodukte. Geringfügige Abweichungen in Größe,
              Form, Wuchs und Farbe gegenüber Abbildungen oder Beschreibungen
              stellen keinen Mangel dar.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 4 Termine, Ausführungsfristen und Witterung">
          <ol>
            <li>
              Termine und Ausführungsfristen sind unverbindlich, sofern sie
              nicht ausdrücklich als verbindlich vereinbart wurden.
            </li>
            <li>
              Arbeiten im Freien sind witterungsabhängig. Bei ungeeigneten
              Witterungsbedingungen (z. B. Frost, Dauerregen, Sturm, Nässe,
              starke Hitze) sowie bei vegetations- oder naturschutzrechtlichen
              Einschränkungen (z. B. Schnittzeitenregelung nach § 39 Abs. 5
              BNatSchG für Hecken und Gehölze) können sich Termine verschieben.
              Der Auftragnehmer informiert den Auftraggeber und stimmt einen
              neuen Termin ab. Ansprüche des Auftraggebers wegen solcher
              Verschiebungen bestehen nicht.
            </li>
            <li>
              Ereignisse höherer Gewalt, Krankheit, Lieferengpässe oder andere
              vom Auftragnehmer nicht zu vertretende Umstände verlängern die
              Fristen angemessen.
            </li>
            <li>
              Beim Winterdienst werden Einsatzkriterien, Leistungszeiten und
              die zu betreuenden Flächen im jeweiligen Winterdienstvertrag
              festgelegt.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 5 Mitwirkungspflichten des Auftraggebers">
          <ol>
            <li>
              Der Auftraggeber stellt sicher, dass das Grundstück zum
              vereinbarten Termin zugänglich ist und die Arbeiten ungehindert
              ausgeführt werden können.
            </li>
            <li>
              Soweit erforderlich, stellt der Auftraggeber Strom- und
              Wasseranschluss unentgeltlich zur Verfügung.
            </li>
            <li>
              Der Auftraggeber weist den Auftragnehmer vor Beginn der Arbeiten
              auf unterirdische Leitungen, Bewässerungsanlagen, Drainagen,
              Mähroboter-Begrenzungskabel, Grenzverläufe, Gefahrenstellen und
              sonstige Besonderheiten hin. Für Schäden, die auf unterlassenen
              oder unrichtigen Hinweisen beruhen, haftet der Auftragnehmer
              nicht.
            </li>
            <li>
              Erforderliche Genehmigungen und Zustimmungen (z. B.
              Fällgenehmigungen nach kommunalen Baumschutzsatzungen, Zustimmung
              von Eigentümern, Eigentümergemeinschaften oder Nachbarn) holt der
              Auftraggeber ein, sofern nichts anderes vereinbart wurde. Der
              Auftragnehmer unterstützt auf Wunsch bei der Beurteilung.
            </li>
            <li>
              Der Auftraggeber versichert, Eigentümer des Grundstücks oder zur
              Beauftragung der Arbeiten berechtigt zu sein.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 6 Preise und Zahlung">
          <ol>
            <li>
              Es gelten die im Angebot bzw. in der Auftragsbestätigung genannten
              Preise. Gegenüber Verbrauchern sind alle Preise Endpreise
              einschließlich der gesetzlichen Umsatzsteuer; gegenüber
              Unternehmern verstehen sich die Preise zuzüglich der gesetzlichen
              Umsatzsteuer.
            </li>
            <li>
              Die Abrechnung erfolgt je nach Vereinbarung nach Aufwand (Stunden-
              bzw. Einsatzsätze) oder zu einem Pauschalpreis. Material, Pflanzen,
              Maschinen- und Geräteeinsatz, Anfahrt und Entsorgung werden
              gesondert berechnet, soweit sie nicht im Angebot enthalten sind.
            </li>
            <li>
              Rechnungen sind innerhalb von {terms.paymentDays} Tagen nach
              Rechnungsdatum ohne Abzug zahlbar. Bei Dauerpflegeverträgen
              erfolgt die Abrechnung in den vereinbarten Zeitabständen.
            </li>
            <li>
              Bei umfangreicheren Aufträgen kann der Auftragnehmer angemessene
              Abschlagszahlungen für erbrachte Leistungen und gelieferte
              Materialien verlangen (§ 632a BGB).
            </li>
            <li>
              Bei Zahlungsverzug gelten die gesetzlichen Regelungen,
              insbesondere zu Verzugszinsen (§ 288 BGB) und Mahnkosten.
            </li>
            <li>
              Der Auftraggeber kann nur mit unbestrittenen oder rechtskräftig
              festgestellten Forderungen aufrechnen. Ein Zurückbehaltungsrecht
              steht ihm nur wegen Ansprüchen aus demselben Vertragsverhältnis zu.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 7 Abnahme">
          <ol>
            <li>
              Bei Werkleistungen (z. B. Neupflanzungen, Gartenumgestaltung,
              Baumfällungen) ist der Auftraggeber verpflichtet, die Leistung
              nach Fertigstellung abzunehmen. Wegen unwesentlicher Mängel kann
              die Abnahme nicht verweigert werden.
            </li>
            <li>
              Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht
              innerhalb einer angemessenen, vom Auftragnehmer gesetzten Frist
              nach Fertigstellungsanzeige die Abnahme unter Angabe mindestens
              eines Mangels verweigert (§ 640 Abs. 2 BGB). Gegenüber
              Verbrauchern gilt dies nur, wenn der Auftragnehmer mit der
              Aufforderung zur Abnahme in Textform auf diese Folgen hingewiesen
              hat.
            </li>
            <li>
              Nimmt der Auftraggeber die Leistung in Gebrauch, ohne Mängel
              anzuzeigen, steht dies der Abnahme gleich.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 8 Gewährleistung">
          <ol>
            <li>Es gelten die gesetzlichen Mängelrechte, soweit nachfolgend nichts anderes bestimmt ist.</li>
            <li>
              Pflanzen sind Lebewesen. Für das Anwachsen von Pflanzen und den
              Erfolg von Rasensaaten steht der Auftragnehmer nur ein, wenn eine
              Fertigstellungs- und Entwicklungspflege durch den Auftragnehmer
              ausdrücklich vereinbart wurde. Andernfalls geht die Pflege –
              insbesondere die ausreichende Wässerung – mit Übergabe auf den
              Auftraggeber über.
            </li>
            <li>
              Keine Mängel sind Schäden oder Ausfälle, die auf unterlassene
              oder unsachgemäße Pflege durch den Auftraggeber, Witterung
              (insbesondere Trockenheit, Frost, Sturm), Wild-, Schädlings- oder
              Krankheitsbefall, Vandalismus oder Eingriffe Dritter
              zurückzuführen sind.
            </li>
            <li>
              Offensichtliche Mängel an Pflegeleistungen (z. B. Schnitt- oder
              Mäharbeiten) sind dem Auftragnehmer innerhalb angemessener Frist
              anzuzeigen, damit sie nachgebessert werden können. Unternehmer
              haben offensichtliche Mängel unverzüglich, spätestens innerhalb
              von sieben Tagen nach Ausführung, in Textform anzuzeigen.
            </li>
            <li>
              Gegenüber Unternehmern beträgt die Verjährungsfrist für
              Mängelansprüche ein Jahr ab Abnahme, soweit das Gesetz nicht
              zwingend längere Fristen vorsieht. Gegenüber Verbrauchern gelten
              die gesetzlichen Verjährungsfristen.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 9 Haftung">
          <ol>
            <li>
              Der Auftragnehmer haftet unbeschränkt für Schäden aus der
              Verletzung des Lebens, des Körpers oder der Gesundheit, für
              Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen, für
              Ansprüche nach dem Produkthaftungsgesetz sowie im Umfang einer
              übernommenen Garantie.
            </li>
            <li>
              Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur bei
              Verletzung wesentlicher Vertragspflichten (Pflichten, deren
              Erfüllung die ordnungsgemäße Durchführung des Vertrags erst
              ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig
              vertrauen darf), begrenzt auf den vertragstypischen,
              vorhersehbaren Schaden.
            </li>
            <li>
              Für Schäden an nicht angezeigten Leitungen, Anlagen oder
              Gegenständen im Arbeitsbereich (§ 5 Abs. 3) haftet der
              Auftragnehmer nicht, sofern er die gebotene Sorgfalt beachtet hat.
            </li>
            <li>
              Beim Winterdienst besteht kein Anspruch auf eine jederzeitige
              vollständige Schnee- und Eisfreiheit der betreuten Flächen. Die
              Haftung beschränkt sich auf die vertraglich vereinbarten Flächen
              und Einsatzzeiten.
            </li>
            <li>
              Die vorstehenden Haftungsbeschränkungen gelten auch für die
              persönliche Haftung der Mitarbeiter, Vertreter und
              Erfüllungsgehilfen des Auftragnehmers.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 10 Laufzeit und Kündigung von Dauerpflegeverträgen">
          <ol>
            <li>
              Verträge über regelmäßig wiederkehrende Leistungen (z. B. Objekt-
              und Grundstückspflege, laufende Rasen- und Gartenpflege,
              Winterdienst) laufen für die vereinbarte Dauer. Ist keine Dauer
              vereinbart, gelten sie als unbefristet geschlossen.
            </li>
            <li>
              Unbefristete Dauerpflegeverträge können von beiden Seiten mit
              einer Frist von {terms.noticePeriod} in Textform gekündigt werden,
              sofern nichts anderes vereinbart ist.
            </li>
            <li>
              Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
              bleibt unberührt.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 11 Kündigung von Einzelaufträgen und Terminabsagen">
          <ol>
            <li>
              Der Auftraggeber kann einen Werkvertrag bis zur Vollendung der
              Leistung jederzeit kündigen (§ 648 BGB). In diesem Fall ist der
              Auftragnehmer berechtigt, die vereinbarte Vergütung zu verlangen;
              er muss sich jedoch anrechnen lassen, was er infolge der
              Aufhebung des Vertrags an Aufwendungen erspart oder durch
              anderweitige Verwendung seiner Arbeitskraft erwirbt.
            </li>
            <li>
              Sagt der Auftraggeber einen vereinbarten Termin aus Gründen, die
              er zu vertreten hat, weniger als {terms.cancellationLeadDays}{" "}
              Werktage vorher ab, kann der Auftragnehmer die bis dahin
              entstandenen und nicht anderweitig verwertbaren Aufwendungen
              (z. B. bereits beschaffte Pflanzen und Materialien) in Rechnung
              stellen.
            </li>
            <li>
              Das gesetzliche Widerrufsrecht von Verbrauchern (§ 12) bleibt von
              diesen Regelungen unberührt.
            </li>
          </ol>
        </LegalSection>

        <LegalSection title="§ 12 Widerrufsrecht für Verbraucher">
          <p>
            Verbrauchern steht bei Verträgen, die außerhalb von Geschäftsräumen
            (z. B. bei einem Termin vor Ort) oder im Fernabsatz (z. B. per
            Telefon, E-Mail oder WhatsApp) geschlossen werden, ein gesetzliches
            Widerrufsrecht nach Maßgabe der folgenden Belehrung zu.
          </p>
          <p>
            Kein Widerrufsrecht besteht bei Verträgen, bei denen der
            Verbraucher den Auftragnehmer ausdrücklich aufgefordert hat, ihn
            aufzusuchen, um dringende Reparatur- oder Instandhaltungsarbeiten
            vorzunehmen (§ 312g Abs. 2 Nr. 11 BGB), etwa bei der Beseitigung
            von Sturmschäden.
          </p>

          <h3>Widerrufsbelehrung</h3>
          <p>
            <strong>Widerrufsrecht.</strong> Sie haben das Recht, binnen
            vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
            Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie
            uns ({site.legalName}, {site.address.street}, {site.address.zip}{" "}
            {site.address.city}, Telefon {site.phone.display}, E-Mail{" "}
            {site.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der
            Post versandter Brief oder eine E-Mail) über Ihren Entschluss,
            diesen Vertrag zu widerrufen, informieren. Sie können dafür das
            unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht
            vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus,
            dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor
            Ablauf der Widerrufsfrist absenden.
          </p>
          <p>
            <strong>Folgen des Widerrufs.</strong> Wenn Sie diesen Vertrag
            widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen
            ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren
            Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
            Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
            wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden
            Ihnen wegen dieser Rückzahlung Entgelte berechnet. Haben Sie
            verlangt, dass die Dienstleistungen während der Widerrufsfrist
            beginnen sollen, so haben Sie uns einen angemessenen Betrag zu
            zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von
            der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags
            unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
            Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen
            entspricht.
          </p>
          <p>
            <strong>Vorzeitiges Erlöschen des Widerrufsrechts.</strong> Das
            Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von
            Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht
            haben und mit der Ausführung der Dienstleistung erst begonnen
            haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben und
            gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr
            Widerrufsrecht bei vollständiger Vertragserfüllung durch uns
            verlieren.
          </p>

          <h3>Muster-Widerrufsformular</h3>
          <p>
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
            dieses Formular aus und senden Sie es zurück.)
          </p>
          <ul>
            <li>
              An: {site.legalName}, {site.address.street}, {site.address.zip}{" "}
              {site.address.city}, E-Mail: {site.email}
            </li>
            <li>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
              abgeschlossenen Vertrag über die Erbringung der folgenden
              Dienstleistung: …
            </li>
            <li>Bestellt am (*) / erhalten am (*): …</li>
            <li>Name des/der Verbraucher(s): …</li>
            <li>Anschrift des/der Verbraucher(s): …</li>
            <li>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): …</li>
            <li>Datum: …</li>
          </ul>
          <p>(*) Unzutreffendes streichen.</p>
        </LegalSection>

        <LegalSection title="§ 13 Datenschutz">
          <p>
            Der Auftragnehmer verarbeitet personenbezogene Daten des
            Auftraggebers ausschließlich zur Durchführung des Vertrags und im
            Rahmen der gesetzlichen Bestimmungen. Einzelheiten ergeben sich aus
            unserer{" "}
            <Link to="/datenschutz" className="link-underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="§ 14 Schlussbestimmungen">
          <ol>
            <li>
              Es gilt das Recht der Bundesrepublik Deutschland. Gegenüber
              Verbrauchern gilt diese Rechtswahl nur, soweit ihnen dadurch nicht
              der Schutz zwingender Bestimmungen des Rechts des Staates entzogen
              wird, in dem sie ihren gewöhnlichen Aufenthalt haben.
            </li>
            <li>
              Ist der Auftraggeber Unternehmer, juristische Person des
              öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen,
              ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus dem
              Vertragsverhältnis der Sitz des Auftragnehmers.
            </li>
            <li>
              Der Auftragnehmer ist nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </li>
            <li>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder
              werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              Anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung.
            </li>
          </ol>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
