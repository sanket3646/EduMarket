// app/privacy-policy/page.tsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4 text-gray-700">
          At EduPlatform, your privacy is important to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect the following information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Personal details like name, email, and contact information.</li>
          <li>Payment information (processed securely through Razorpay).</li>
          <li>Usage data such as pages visited and interaction with our platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          The information we collect is used to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Provide and improve our services.</li>
          <li>Process transactions and payments securely.</li>
          <li>Communicate updates, offers, and important notices.</li>
          <li>Ensure compliance with legal and regulatory requirements.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
        <p className="text-gray-700 mb-4">
          We do not sell or rent your personal information. We may share your information with:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Service providers (like Razorpay) to process payments securely.</li>
          <li>Legal authorities if required by law.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Security</h2>
        <p className="text-gray-700 mb-4">
          We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy periodically. The latest version will always be available on our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, please contact us at 
          <a href="mailto:support@eduplatform.com" className="text-indigo-600 underline ml-1">support@eduplatform.com</a>.
        </p>
      </div>
    </div>
  );
}
