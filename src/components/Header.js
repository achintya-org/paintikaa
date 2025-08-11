import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PhoneAuth from "./PhoneAuth";
import UploadMedia from "./UploadMedia";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header({ style }) {
  const [user, setUser] = useState(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
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
      borderRadius: 4,
      color: "#fff",
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: "0.9rem",
      marginLeft: 8,
      height: 32,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    rightControls: {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <Link to="/" style={styles.logoLink} aria-label="Go to homepage">
          <img src="/favicon.png" alt="Paintikaa Logo" style={styles.logo} />
          <h2 style={styles.title}>Paintikaa</h2>
        </Link>

        <div style={styles.rightControls}>
          {/* Upload button - same style as login/logout */}
          {user && (
            <Button
              type="text"
              icon={<UploadOutlined />}
              style={styles.button}
              onClick={() => setShowUpload(true)}
            >
              Upload
            </Button>
          )}

          {user ? (
            <Button style={styles.button} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button style={styles.button} onClick={() => setShowPhoneAuth(true)}>
              Login
            </Button>
          )}
        </div>
      </header>

      <PhoneAuth visible={showPhoneAuth} onClose={() => setShowPhoneAuth(false)} />
      <UploadMedia visible={showUpload} onClose={() => setShowUpload(false)} />
    </>
  );
}
