import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import PhoneAuth from "./PhoneAuth";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header({ style }) {
  const [user, setUser] = useState(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

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
      justifyContent: "space-between",
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
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
    logo: {
      height: "40px",
      marginRight: "12px",
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
    button: {
      background: "transparent",
      border: "1px solid #fff",
      color: "#fff",
      borderRadius: 4,
      fontSize: "0.9rem",
      padding: "4px 12px",
      cursor: "pointer",
      height: 32,
      minWidth: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <Link to="/" style={styles.logoLink} aria-label="Go to homepage">
          <img src="/favicon.png" alt="Paintikaa Logo" style={styles.logo} />
          <h2 style={styles.title}>Paintikaa</h2>
        </Link>

        {user ? (
          <Button
            type="text"
            style={styles.button}
            onClick={handleLogout}
            ghost
          >
            Logout
          </Button>
        ) : (
          <Button
            type="text"
            style={styles.button}
            onClick={() => setShowPhoneAuth(true)}
            ghost
          >
            Login
          </Button>
        )}
      </header>

      <PhoneAuth visible={showPhoneAuth} onClose={() => setShowPhoneAuth(false)} />
    </>
  );
}
