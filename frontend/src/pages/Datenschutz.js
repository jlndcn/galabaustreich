import { Seo } from "@/components/Seo";
import { LegalDocument } from "@/components/LegalDocument";
import { seoPages } from "@/data/seo";
import datenschutz from "@/content/legal/datenschutz.json";

export default function Datenschutz() {
  return (
    <>
      <Seo
        title={seoPages.datenschutz.title}
        description={seoPages.datenschutz.description}
        path={seoPages.datenschutz.path}
      />
      <LegalDocument doc={datenschutz} />
    </>
  );
}
