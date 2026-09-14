import { Component } from "react";
import { site } from "@/data/site";

// Catches render errors so the site never shows a blank screen.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("App render error:", error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            background: "#f7f4ec",
            color: "#0f2e14",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Die Seite konnte gerade nicht geladen werden.
            </h1>
            <p style={{ marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Bitte laden Sie die Seite neu. Wenn es eilt, erreichen Sie uns unter{" "}
              <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                height: "44px",
                padding: "0 1.25rem",
                borderRadius: "999px",
                border: "none",
                background: "#0fbb82",
                color: "#0f2e14",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Seite neu laden
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
