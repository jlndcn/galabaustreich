// Shared layout for the legal pages (Impressum, Datenschutz, AGB).
export const LegalLayout = ({ title, lead, stand, children }) => (
  <div data-testid="legal-page">
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-4xl sm:text-5xl">{title}</h1>
      {lead && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{lead}</p>
      )}
      {stand && (
        <p data-testid="legal-stand" className="mt-4 text-sm text-muted-foreground">
          Stand: {stand}
        </p>
      )}
      <div className="legal-copy mt-12 space-y-10">{children}</div>
    </section>
  </div>
);

export const LegalSection = ({ title, children, id }) => (
  <section id={id} className="space-y-3">
    {title && <h2 className="text-xl sm:text-2xl">{title}</h2>}
    <div className="space-y-3 leading-relaxed">{children}</div>
  </section>
);
