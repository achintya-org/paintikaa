import React from "react";

export default function Header() {
  const styles = {
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "10px",
      textAlign: "center",
      zIndex: 10,
    }
  };

  return (
    <header style={styles.header}>
      <h2>My Gallery</h2>
    </header>
  );
}
