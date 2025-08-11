import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect, use, and protect
        your information.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>We collect personal details such as your name, email, and address for order fulfillment.</li>
        <li>We do not sell your data to third parties.</li>
        <li>Cookies are used to enhance your shopping experience.</li>
      </ul>
      <p className="mt-4">
        For any questions regarding your data, please contact us at privacy@example.com.
      </p>
    </div>
  );
}
