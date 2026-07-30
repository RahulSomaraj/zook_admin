import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

        <div className="mb-8">
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Login
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacy & Cookies Statement
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last Updated: July 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect your name, email address, phone number, account
              information, and other details required to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to manage your account, process orders,
              improve our services, and communicate important updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Data Security
            </h2>
            <p>
              We use appropriate security measures to protect your personal
              information against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Cookies
            </h2>
            <p>
              Cookies help us remember your preferences, improve website
              performance, and provide a better user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services for analytics, hosting,
              and authentication. These services are required to protect your
              information appropriately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, subject to applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy & Cookies Statement,
              please contact our support team.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
