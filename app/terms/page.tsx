// app/terms/page.tsx
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>

        <p className="mb-4 text-gray-700">
          Welcome to EduPlatform! These Terms & Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of Our Services</h2>
        <p className="text-gray-700 mb-4">
          You may use our platform only for lawful purposes. You agree not to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Engage in any activity that may harm or interfere with the platform.</li>
          <li>Upload or share illegal, offensive, or copyrighted content without authorization.</li>
          <li>Attempt to access other users’ accounts or data without permission.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Purchases</h2>
        <p className="text-gray-700 mb-4">
          By purchasing materials through EduPlatform, you agree to pay all applicable fees and follow any instructions provided. All sales are final unless otherwise stated in our Refund Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content, materials, and resources available on EduPlatform are owned by us or our partners and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          EduPlatform is not responsible for any direct or indirect damages arising from your use of our services. We strive to provide accurate and up-to-date content but do not guarantee completeness or accuracy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We may update these Terms & Conditions at any time. The latest version will always be available on our website. Continued use of our platform constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          For questions about these Terms & Conditions, please contact us at 
          <a href="mailto:support@eduplatform.com" className="text-indigo-600 underline ml-1">support@eduplatform.com</a>.
        </p>
      </div>
    </div>
  );
}
