import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const styles = {
    mainContent: {
      paddingTop: showHeader ? "60px" : "0", // adjust if header hidden
      paddingBottom: showFooter ? "80px" : "0", // adjust if footer hidden
      overflowY: "auto",
      height: "100vh",
      boxSizing: "border-box",
    },
    toggleBar: {
      position: "fixed",
      top: showHeader ? "60px" : "0",
      right: "10px",
      zIndex: 20,
      background: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "0.9rem",
    },
    toggleButton: {
      margin: "0 5px",
      cursor: "pointer",
      background: "transparent",
      border: "1px solid white",
      color: "white",
      padding: "3px 6px",
      borderRadius: "3px",
    },
  };

  return (
    <Router>
      {showHeader && <Header />}

      {/* Toggle controls */}
      <div style={styles.toggleBar}>
        <button style={styles.toggleButton} onClick={() => setShowHeader(h => !h)}>
          {showHeader ? "Hide Header" : "Show Header"}
        </button>
        <button style={styles.toggleButton} onClick={() => setShowFooter(f => !f)}>
          {showFooter ? "Hide Footer" : "Show Footer"}
        </button>
      </div>

      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </Router>
  );
}
