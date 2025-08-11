import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Shipping Policy", path: "/shipping-policy" },
];

export default function Footer() {
  const styles = {
    footer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px 20px",
      flexWrap: "wrap",
      gap: "15px",
      boxSizing: "border-box",
      height: "60px",
      userSelect: "none",
      zIndex: 10,
      backdropFilter: "saturate(180%) blur(8px)",
      WebkitBackdropFilter: "saturate(180%) blur(8px)",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "0.9rem",
      margin: "0 8px",
      transition: "color 0.2s ease-in-out",
    },
  };

  return (
    <footer style={styles.footer}>
      {footerLinks.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.color = "#00bfff")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
        >
          {name}
        </Link>
      ))}
    </footer>
  );
}
