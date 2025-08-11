// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const q = query(collection(firestore, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const styles = {
    container: {
      maxWidth: 720,
      margin: "60px auto 40px", // leave space for header
      padding: "0 16px",
    },
    heading: {
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: 24,
      fontWeight: "700",
      color: "#222",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    loadingText: {
      textAlign: "center",
      marginTop: 40,
      fontSize: 18,
      color: "#666",
    },
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Products</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={styles.loadingText}>No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </main>
  );
}
