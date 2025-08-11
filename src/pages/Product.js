// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const docRef = doc(firestore, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
  if (!product) return <p style={{ textAlign: "center", marginTop: 40 }}>Product not found.</p>;

  const styles = {
    container: {
      maxWidth: 900,
      margin: "80px auto 40px", // leave space for header
      padding: "0 16px",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    mediaContainer: {
      display: "flex",
      overflowX: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#888 transparent",
      marginBottom: 24,
    },
    mediaItem: {
      flex: "0 0 auto",
      maxHeight: 700,
      maxWidth: 700,
      objectFit: "cover",
      borderRadius: 0,
      marginRight: 12,
      backgroundColor: "#222",
    },
    title: {
        color: 'black',
      fontSize: "2.4rem",
      fontWeight: "700",
      marginBottom: 16,
    },
    description: {
        color: 'black',
      fontSize: "1.1rem",
      opacity: 0.85,
      marginBottom: 16,
    },
    price: {
      fontWeight: "700",
      fontSize: "1.5rem",
      color: "#d35400",
      marginBottom: 24,
    },
    buyButton: {
      backgroundColor: "#grey",
      border: "none",
      borderRadius: 6,
      padding: "10px 24px",
      fontWeight: "700",
      cursor: "pointer",
      color: "#white",
      fontSize: "1.1rem",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <main style={styles.container}>
              <h1 className="title" style={styles.title}>{product.title}</h1>

      <div style={styles.mediaContainer}>
        
      {product.mediaUrls.map((url, i) => {
        const isVideo = /\.(mp4|webm)(\?|$)/i.test(url);
        return isVideo ? (
            <video
            key={i}
            src={url}
            controls
            style={styles.mediaItem}
            preload="metadata"
            muted
            playsInline
            />
        ) : (
            <img
            key={i}
            src={url}
            alt={`${product.title} media ${i + 1}`}
            style={styles.mediaItem}
            loading="lazy"
            />
        );
        })}
      </div>

      <p style={styles.description}>{product.description}</p>
      <div style={styles.price}>₹ {product.price.toFixed(2)}</div>
      <button
        style={styles.buyButton}
        onClick={() => alert(`Buy ${product.title} - Not implemented`)}
      >
        Buy Now
      </button>
    </main>
  );
}
