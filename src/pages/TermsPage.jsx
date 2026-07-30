import { Link } from "react-router-dom";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last Updated: July 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this platform, you agree to these Terms and
              Conditions. If you do not agree, please discontinue using the
              application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. User Accounts
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of
              their account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Products & Orders
            </h2>
            <p>
              Product information, pricing and availability may change without
              prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Vendor Responsibilities
            </h2>
            <p>
              Vendors must ensure all product information is accurate and
              complies with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Privacy
            </h2>
            <p>
              Personal information is handled according to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              The platform is not responsible for indirect or consequential
              damages resulting from the use of the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Changes to Terms
            </h2>
            <p>
              These terms may be updated periodically. Continued use of the
              platform indicates acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Contact
            </h2>
            <p>
              For questions regarding these Terms & Conditions, please contact
              our support team.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}