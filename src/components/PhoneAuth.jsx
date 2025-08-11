import React, { useState } from "react";
import { Modal, Input, Button, Typography, message as antdMessage } from "antd";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const { Title, Text } = Typography;

export default function PhoneAuth({ visible, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize reCAPTCHA once
  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
        }
      );
    }
  };

  const sendOtp = async () => {
    if (!phoneNumber) {
      antdMessage.error("Enter a valid phone number including country code.");
      return;
    }
    setLoading(true);
    setUpRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      antdMessage.success("OTP sent! Check your phone.");
    } catch (error) {
      console.error(error);
      antdMessage.error(error.message);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!otp) {
      antdMessage.error("Enter the OTP sent to your phone.");
      return;
    }
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      antdMessage.success(`Phone verified! UID: ${result.user.uid}`);
      onClose(); // Close modal on success
    } catch (error) {
      console.error(error);
      antdMessage.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>Phone OTP Login</Title>}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      {!confirmationResult ? (
        <>
          <Input
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            size="large"
            style={{ marginBottom: 16 }}
            autoFocus
          />
          <Button
            type="primary"
            onClick={sendOtp}
            loading={loading}
            block
          >
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            size="large"
            style={{ marginBottom: 16 }}
            autoFocus
          />
          <Button
            type="primary"
            onClick={verifyOtp}
            loading={loading}
            block
          >
            Verify OTP
          </Button>
        </>
      )}

      <div id="recaptcha-container" />
    </Modal>
  );
}
