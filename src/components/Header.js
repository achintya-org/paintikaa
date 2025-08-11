import React from "react";
import { Link } from "react-router-dom";

export default function Header({ style }) {
  const styles = {
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      zIndex: 10,
      height: "60px",
      boxSizing: "border-box",
      userSelect: "none",
      backdropFilter: "saturate(180%) blur(8px)",
      WebkitBackdropFilter: "saturate(180%) blur(8px)",
      transition: "opacity 0.3s ease, visibility 0.3s ease",
      ...style,
    },
    logoLink: {
      display: "flex",       // make Link a flex container
      alignItems: "center",  // vertically center content
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",      // inherit white color
    },
    logo: {
      height: "40px",
      marginRight: "12px",   // spacing between logo and text
      display: "block",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      letterSpacing: "0.05em",
      margin: 0,
      userSelect: "none",
      lineHeight: "40px",
    },
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoLink} aria-label="Go to homepage">
        <img src="/favicon.png" alt="Paintikaa Logo" style={styles.logo} />
        <h2 style={styles.title}>Paintikaa</h2>
      </Link>
    </header>
  );
}
