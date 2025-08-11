import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const styles = {
    footer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "10px",
      textAlign: "center",
      zIndex: 10,
    },
    footerNav: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    footerLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "0.9rem",
    }
  };

  return (
    <footer style={styles.footer}>
      <nav style={styles.footerNav}>
        <Link to="/about-us" style={styles.footerLink}>About Us</Link>
        <Link to="/contact-us" style={styles.footerLink}>Contact Us</Link>
        <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
        <Link to="/shipping-policy" style={styles.footerLink}>Shipping Policy</Link>
      </nav>
      <p style={{ marginTop: "10px" }}>© {new Date().getFullYear()} Paintikaa</p>
    </footer>
  );
}
