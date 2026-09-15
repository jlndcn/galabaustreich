import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Leistungen from "@/pages/Leistungen";

// Secondary routes: code-split so the home LCP bundle stays lean.
// Leistungen stays eager so scroll restoration on browser Back works reliably.
const LeistungDetail = lazy(() => import("@/pages/LeistungDetail"));
const UeberUns = lazy(() => import("@/pages/UeberUns"));
const Team = lazy(() => import("@/pages/Team"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));
const AGB = lazy(() => import("@/pages/AGB"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageFallback() {
  return (
    <div
      className="page-route-fallback"
      aria-hidden="true"
      style={{ minHeight: "50vh", background: "var(--brand-cream, #f7f4ec)" }}
    />
  );
}

function LazyPages() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route element={<LazyPages />}>
            <Route path="/leistungen/:slug" element={<LeistungDetail />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/team" element={<Team />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
