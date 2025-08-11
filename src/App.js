import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AboutUs, ContactUs, PrivacyPolicy, ShippingPolicy } from "./pages";
import Home  from "./pages/Home.js";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => setShowHeaderFooter((v) => !v);

    window.addEventListener("click", toggleVisibility);
    window.addEventListener("touchstart", toggleVisibility);

    return () => {
      window.removeEventListener("click", toggleVisibility);
      window.removeEventListener("touchstart", toggleVisibility);
    };
  }, []);

  const styles = {
    mainContent: {
      paddingTop: showHeaderFooter ? "60px" : "0",
      paddingBottom: showHeaderFooter ? "80px" : "0",
      overflowY: "auto",
      height: "100vh",
      boxSizing: "border-box",
      transition: "padding 0.3s ease",
    },
  };

  return (
    <Router>
      {showHeaderFooter && <Header />}

      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </main>

      {showHeaderFooter && <Footer />}
    </Router>
  );
}
