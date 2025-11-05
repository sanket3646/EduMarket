// app/refundpolicy/page.tsx
import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Refund Policy</h1>

        <p className="mb-4 text-gray-700">
          At EduPlatform, we strive to provide high-quality educational materials and services. However, if you are not completely satisfied with your purchase, please read our refund policy below.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Eligibility for Refund</h2>
        <p className="text-gray-700 mb-4">
          Refunds are only available under the following conditions:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>The material purchased is defective or inaccessible.</li>
          <li>The purchase was made in error and reported within 24 hours.</li>
          <li>Other situations as approved by EduPlatform’s support team.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Non-Refundable Items</h2>
        <p className="text-gray-700 mb-4">
          Please note that the following items are generally non-refundable:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Downloaded or accessed digital materials.</li>
          <li>Services already provided or completed courses.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Refund Process</h2>
        <p className="text-gray-700 mb-4">
          To request a refund, please contact our support team at 
          <a href="mailto:support@eduplatform.com" className="text-indigo-600 underline ml-1">support@eduplatform.com</a> 
          with your order details. Our team will review your request and notify you of the decision within 3–5 business days.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Refund Method</h2>
        <p className="text-gray-700 mb-4">
          Approved refunds will be processed to the original payment method used during purchase. Processing times may vary depending on your bank or payment provider.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          For any questions regarding our refund policy, please reach out to us at 
          <a href="mailto:support@eduplatform.com" className="text-indigo-600 underline ml-1">support@eduplatform.com</a>.
        </p>
      </div>
    </div>
  );
}
