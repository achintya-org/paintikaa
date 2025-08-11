// PhoneAuth.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  // Initialize reCAPTCHA once
  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        }
      );
    }
  };

  const sendOtp = async () => {
    if (!phoneNumber) {
      setMessage("Enter a valid phone number including country code.");
      return;
    }
    setUpRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setMessage("OTP sent! Check your phone.");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Enter the OTP sent to your phone.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      setMessage(`Phone verified! UID: ${result.user.uid}`);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Phone OTP Login</h2>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ padding: 8, marginBottom: 10, width: "100%" }}
          />
          <button onClick={sendOtp} style={{ padding: 10 }}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: 8, marginBottom: 10, width: "100%" }}
          />
          <button onClick={verifyOtp} style={{ padding: 10 }}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>
      {message && <p>{message}</p>}
    </div>
  );
}
