export const LegalLayout = ({ eyebrow, title, lead, children }) => (
  <div data-testid="legal-page">
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-4 text-4xl sm:text-5xl">{title}</h1>
      {lead && <p className="mt-6 leading-relaxed text-foreground/75">{lead}</p>}
      <div className="mt-10 space-y-10">{children}</div>
    </section>
  </div>
);

export const LegalSection = ({ title, children }) => (
  <section className="space-y-3">
    {title && <h2 className="text-xl sm:text-2xl">{title}</h2>}
    <div className="space-y-3 leading-relaxed text-foreground/80">{children}</div>
  </section>
);
