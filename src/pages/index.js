import React, { useState } from "react";

// Shared container style
const containerStyle = {
  maxWidth: 800,
  margin: "20px auto",
  padding: 20,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#333",
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  lineHeight: 1.6,
};

// AboutUs Component
export function AboutUs() {
  return (
    <div style={containerStyle}>
      <h1>About Us</h1>
      <p>
        Welcome to Paintikaa, your trusted online marketplace for unique and quality products.
        We strive to provide an exceptional shopping experience with a vast selection,
        competitive pricing, and outstanding customer service.
      </p>
      <p>
        Our mission is to connect customers with top brands and artisans from around the world,
        ensuring convenience, reliability, and satisfaction with every purchase.
      </p>
    </div>
  );
}

// ContactUs Component with styled form
export function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 15,
      marginTop: 20,
    },
    label: {
      fontWeight: "600",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: 4,
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#00bfff",
      boxShadow: "0 0 5px #00bfff",
    },
    textarea: {
      minHeight: 100,
      resize: "vertical",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: 4,
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    button: {
      backgroundColor: "#00bfff",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: 4,
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#008fc7",
    },
    successMsg: {
      color: "green",
      marginTop: 10,
      fontWeight: "600",
    },
  };

  // Manage input focus style toggle (optional)
  const [focused, setFocused] = useState({});

  const handleFocus = (field) => {
    setFocused((f) => ({ ...f, [field]: true }));
  };
  const handleBlur = (field) => {
    setFocused((f) => ({ ...f, [field]: false }));
  };

  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation could go here
    setSubmitted(true);
    // In real app, send data to backend or email service
  };

  return (
    <div style={containerStyle}>
      <h1>Contact Us</h1>
      <p>
        Have questions, feedback, or need support? Reach out to our customer care team using the
        form below, and we'll get back to you promptly.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => handleFocus("name")}
          onBlur={() => handleBlur("name")}
          style={{ ...styles.input, ...(focused.name ? styles.inputFocus : {}) }}
          required
          placeholder="Your full name"
        />

        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          style={{ ...styles.input, ...(focused.email ? styles.inputFocus : {}) }}
          required
          placeholder="you@example.com"
        />

        <label style={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus("message")}
          onBlur={() => handleBlur("message")}
          style={{ ...styles.textarea, ...(focused.message ? styles.inputFocus : {}) }}
          required
          placeholder="Write your message here..."
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
        {submitted && <p style={styles.successMsg}>Thank you! Your message has been sent.</p>}
      </form>
    </div>
  );
}

// PrivacyPolicy Component
export function PrivacyPolicy() {
  return (
    <div style={containerStyle}>
      <h1>Privacy Policy</h1>
      <p>
        At Paintikaa, we value your privacy and are committed to protecting your personal information.
        This policy outlines what data we collect, how we use it, and your rights.
      </p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Personal details you provide during registration and checkout.</li>
        <li>Payment information to process your orders securely.</li>
        <li>Usage data to improve our website and services.</li>
      </ul>
      <h3>How We Use Your Information</h3>
      <ul>
        <li>To process and fulfill your orders.</li>
        <li>To communicate promotions, updates, and support.</li>
        <li>To improve user experience and website functionality.</li>
      </ul>
      <h3>Your Choices</h3>
      <p>
        You can update your account information anytime and opt out of marketing emails.
        We do not sell your personal data to third parties.
      </p>
    </div>
  );
}

// ShippingPolicy Component
export function ShippingPolicy() {
  return (
    <div style={containerStyle}>
      <h1>Shipping Policy</h1>
      <p>
        Paintikaa offers reliable and timely shipping worldwide. Below is an overview of our
        shipping terms and procedures.
      </p>
      <h3>Shipping Options</h3>
      <ul>
        <li>Standard Shipping: 5-7 business days within the country.</li>
        <li>Express Shipping: 2-3 business days (additional charges apply).</li>
        <li>International Shipping: Delivery times vary by destination.</li>
      </ul>
      <h3>Order Processing</h3>
      <p>
        Orders are processed within 1-2 business days after confirmation. You will receive tracking
        information once your order ships.
      </p>
      <h3>Returns & Exchanges</h3>
      <p>
        We accept returns within 30 days of delivery for most products. Items must be in original
        condition. Please contact customer support to initiate a return or exchange.
      </p>
    </div>
  );
}
