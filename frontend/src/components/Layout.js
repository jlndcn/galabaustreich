import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { useMagneticButtons } from "@/hooks/useMagneticButtons";

export const Layout = () => {
  useMagneticButtons();
  return (
    <div className="App">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster theme="light" position="top-center" closeButton />
    </div>
  );
};
