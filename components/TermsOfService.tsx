import React from "react";

const TermsOfServiceComponent = () => {
  return (
    <div
      className="bg-white text-[black] max-w-4xl mx-auto p-6 md:p-10 rounded-lg shadow-md"
      style={{ fontFamily: "Inter" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        Zabbot Terms of Service
      </h1>

      <div className="mb-8">
        <p className="font-semibold mb-4">Effective Date: June 15, 2025</p>
        <p className="mb-6">
          Welcome to Zabbot! By creating an account or using our platform, you
          agree to the following terms:
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Eligibility</h2>
            <p>
              You must be 8 years or older to use Zabbot. If you&apos;re under
              18, you need permission from a parent or guardian.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Use of Service</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Use Zabbot for personal, non-commercial language learning.
              </li>
              <li>Not share your login with others.</li>
              <li>
                Respect community standards when participating in forums or
                events.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Account Security</h2>
            <p>
              You&apos;re responsible for maintaining the confidentiality of
              your password and account activity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Content Ownership</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Zabbot owns or licenses all instructional content and materials.
              </li>
              <li>
                You retain ownership of anything you upload (e.g. recordings or
                comments), but grant us permission to use it to improve
                services.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">
              5. Payments and Subscriptions
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Some features require payment. You&apos;ll be clearly informed
                before any charges.
              </li>
              <li>Subscriptions auto-renew unless canceled.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Termination</h2>
            <p>
              We may suspend or terminate accounts that violate our policies or
              applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Modifications</h2>
            <p>
              We may update these terms, and will notify you via email or app if
              major changes are made.
            </p>
          </div>
        </div>
      </div>

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

export default TermsOfServiceComponent;
