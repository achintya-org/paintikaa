import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
    },
    logoLink: {
      display: "inline-block",
      cursor: "pointer",
      marginRight: "15px",
      textDecoration: "none",
    },
    logo: {
      height: "40px",
      verticalAlign: "middle",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      letterSpacing: "0.05em",
      margin: 0,
      userSelect: "none",
      color: "#fff",
      lineHeight: "40px",
    },
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoLink} aria-label="Go to homepage">
        <img src="/favicon.png" alt="Paintikaa Logo" style={styles.logo} />
      </Link>
      <h2 style={styles.title}>Paintikaa</h2>
    </header>
  );
}
