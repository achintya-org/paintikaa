import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { AboutUs, ContactUs, PrivacyPolicy, ShippingPolicy } from "./pages";
import Home from "./pages/Home.js";

import Header from "./components/Header";
import Footer from "./components/Footer";

function AppContent() {
  const location = useLocation();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  // Reset header/footer visible to true on every route change
  useEffect(() => {
    setShowHeaderFooter(true);
  }, [location]);

  // Toggle header/footer visibility on click/touch outside header/footer/links/buttons
  useEffect(() => {
    const toggleVisibility = (e) => {
      const clickedInsideHeader = e.target.closest("header");
      const clickedInsideFooter = e.target.closest("footer");
      const clickedOnLinkOrButton =
        e.target.tagName === "A" || e.target.closest("a") || e.target.tagName === "BUTTON";

      if (!clickedInsideHeader && !clickedInsideFooter && !clickedOnLinkOrButton) {
        setShowHeaderFooter((v) => !v);
      }
    };

    window.addEventListener("click", toggleVisibility);
    window.addEventListener("touchstart", toggleVisibility);

    return () => {
      window.removeEventListener("click", toggleVisibility);
      window.removeEventListener("touchstart", toggleVisibility);
    };
  }, []);

  const styles = {
    mainContent: {
      paddingTop: 60, // fixed padding to prevent content shift
      paddingBottom: 80, // fixed padding to prevent content shift
      overflowY: "auto",
      height: "100vh",
      boxSizing: "border-box",
      transition: "opacity 0.3s ease",
    },
  };

  return (
    <>
      <Header
        style={{
          visibility: showHeaderFooter ? "visible" : "hidden",
          opacity: showHeaderFooter ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </main>

      <Footer
        style={{
          visibility: showHeaderFooter ? "visible" : "hidden",
          opacity: showHeaderFooter ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
