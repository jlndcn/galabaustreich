import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Seite nicht gefunden | Garten- und Landschaftspflege Streich"
        description="Die aufgerufene Seite wurde nicht gefunden."
        path="/"
      />
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <p className="text-base font-semibold text-muted-foreground">Fehler 404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Seite nicht gefunden</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Die von Ihnen aufgerufene Seite existiert leider nicht. Kehren Sie
          gerne zur Startseite zurück.
        </p>
        <Link
          to="/"
          data-testid="notfound-home-link"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-[color:var(--brand-accent)] px-6 text-base font-semibold text-[color:var(--brand-forest)] transition-colors hover:bg-[color:var(--brand-accent-strong)]"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Zur Startseite
        </Link>
      </section>
    </>
  );
}
