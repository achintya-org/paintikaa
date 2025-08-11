// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  const { title, description, price, mediaUrls } = product;

  const styles = {
    card: {
      position: "relative",
      width: "100%",
      maxWidth: 700,
      marginBottom: 24,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
      backgroundColor: "#111",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    mediaContainer: {
      display: "flex",
      overflowX: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#888 transparent",
    },
    mediaItem: {
      flex: "0 0 auto",
      maxHeight: 500,
      maxWidth: 500,
      objectFit: "cover",
      borderRadius: 0,
      marginRight: 8,
      backgroundColor: "#222",
    },
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
      padding: "16px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: "700",
      margin: 0,
    },
    description: {
      fontSize: "0.9rem",
      opacity: 0.8,
      margin: 0,
      maxHeight: 48,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    price: {
      fontWeight: "600",
      fontSize: "1.1rem",
      color: "#ffd700",
    },
    button: {
      backgroundColor: "#ffd700",
      border: "none",
      borderRadius: 4,
      padding: "6px 14px",
      fontWeight: "600",
      cursor: "pointer",
      color: "#111",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.mediaContainer}>
        {mediaUrls.map((url, i) => {
          const isVideo = /\.(mp4|webm)$/i.test(url);
          return isVideo ? (
            <video
              key={i}
              src={url}
              controls
              style={styles.mediaItem}
              preload="metadata"
            />
          ) : (
            <img
              key={i}
              src={url}
              alt={title + " media " + (i + 1)}
              style={styles.mediaItem}
              loading="lazy"
            />
          );
        })}
      </div>
      <div style={styles.overlay}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <div style={styles.bottomRow}>
          <span style={styles.price}>₹ {price.toFixed(2)}</span>
          <button
            style={styles.button}
            onClick={() => alert(`Buy ${title} - Not implemented`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
