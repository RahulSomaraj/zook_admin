import { Link } from "react-router-dom";
import { usePolicies } from "../hooks/usePolicies";

export default function TermsPage() {
  const { data, isLoading, isError } = usePolicies({
    type: "terms_and_conditions",
    isActive: true,
  });

  const policy = data?.data?.items?.[0];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

        <Link
          to="/login"
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          ← Back to Login
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mt-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          {policy?.updatedAt
            ? `Last Updated: ${new Date(policy.updatedAt).toLocaleDateString()}`
            : "Last Updated: -"}
        </p>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">
            Unable to load Terms & Conditions.
          </p>
        ) : (
          <div className="whitespace-pre-wrap leading-8 text-gray-700">
            {policy?.body || "No Terms & Conditions available."}
          </div>
        )}
      </div>
    </div>
  );
}