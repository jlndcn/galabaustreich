import { Seo } from "@/components/Seo";
import { LegalDocument } from "@/components/LegalDocument";
import { seoPages } from "@/data/seo";
import impressum from "@/content/legal/impressum.json";

export default function Impressum() {
  return (
    <>
      <Seo
        title={seoPages.impressum.title}
        description={seoPages.impressum.description}
        path={seoPages.impressum.path}
      />
      <LegalDocument doc={impressum} />
    </>
  );
}
