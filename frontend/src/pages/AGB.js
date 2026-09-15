import { Seo } from "@/components/Seo";
import { LegalDocument } from "@/components/LegalDocument";
import { seoPages } from "@/data/seo";
import agb from "@/content/legal/agb.json";

export default function AGB() {
  return (
    <>
      <Seo
        title={seoPages.agb.title}
        description={seoPages.agb.description}
        path={seoPages.agb.path}
      />
      <LegalDocument doc={agb} />
    </>
  );
}
