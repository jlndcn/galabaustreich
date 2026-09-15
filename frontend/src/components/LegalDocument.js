import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { applyPlaceholders, contentVars } from "@/lib/content";

function MarkdownBody({ source }) {
  const text = applyPlaceholders(source, contentVars());
  return (
    <ReactMarkdown
      components={{
        a: ({ href = "", children }) => {
          const external = /^https?:\/\//i.test(href);
          if (!external && href.startsWith("/")) {
            return (
              <Link to={href} className="link-underline">
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              className="link-underline"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
        h3: ({ children }) => <h3>{children}</h3>,
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        p: ({ children }) => <p>{children}</p>,
        strong: ({ children }) => <strong>{children}</strong>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

/**
 * Renders a CMS legal document: title/lead/stand + list of markdown sections.
 * Firmendaten werden über {{placeholders}} aus site.json / terms.json eingesetzt.
 */
export function LegalDocument({ doc }) {
  if (!doc) return null;
  const lead = doc.lead ? applyPlaceholders(doc.lead) : undefined;
  return (
    <LegalLayout title={doc.title} lead={lead} stand={doc.stand || undefined}>
      {(doc.sections || []).map((section) => (
        <LegalSection
          key={section.id || section.title}
          title={section.title}
          id={section.anchor || undefined}
        >
          <MarkdownBody source={section.body || ""} />
        </LegalSection>
      ))}
    </LegalLayout>
  );
}
