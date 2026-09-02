import React from "react";

const PrivacyPolicyComponent = () => {
  return (
    <div
      className="bg-white text-[black] max-w-4xl mx-auto p-6 md:p-10 rounded-lg shadow-md"
      style={{ fontFamily: "Inter" }}
    >

      <div className="border-t-2 border-gray-200 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
          Zabbot Privacy Policy
        </h1>
        <p className="font-semibold mb-4">Effective Date: June 15, 2025</p>
        <p className="mb-6">
          Zabbot respects your privacy. This policy explains what data we
          collect, why, and how we protect it.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Account info: Name, email, password (encrypted).</li>
              <li>Usage data: Course progress, learning preferences.</li>
              <li>
                Optional: Voice recordings (if you choose to use pronunciation
                features).
              </li>
              <li>Cookies: To improve user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. How We Use It</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To deliver personalized lessons.</li>
              <li>To improve our AI pronunciation tools.</li>
              <li>
                To communicate with you about your account or new features.
              </li>
              <li>We do not sell or rent your personal data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Data Sharing</h2>
            <p className="mb-2">
              We may share anonymized data with research partners or linguists
              to improve heritage language learning.
            </p>
            <p>
              We do not share your personal data with third parties without your
              consent, except to comply with law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Data Storage</h2>
            <p>
              Your data is stored securely. You can request deletion of your
              account and associated data at any time by contacting
              support@zabbot.com.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">
              5. Children&apos;s Privacy
            </h2>
            <p>
              We don&apos;t knowingly collect data from children under 13
              without parental consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Contact Us</h2>
            <p className="mb-2">
              Contact us at privacy@zabbot.com or write to:
            </p>
            <p>
              Zabbot LLC
              <br />
              418 Broadway STE R,
              <br />
              Albany, NY 12207
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
