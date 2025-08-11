import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p className="mb-4">
        We aim to deliver your products quickly and efficiently.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Orders are processed within 1-2 business days.</li>
        <li>Delivery times vary between 3-7 business days depending on location.</li>
        <li>Free shipping is available for orders over ₹999.</li>
      </ul>
      <p className="mt-4">
        For urgent orders, please reach out to us at shipping@example.com.
      </p>
    </div>
  );
}
