import clsx from "clsx";

export default function Badge({ children, variant = "default" }) {
  const variants = {
    approved: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    suspended: "bg-red-50 text-red-700 border border-red-200",
    default: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        variants[variant] || variants.default
      )}
    >
      {children}
    </span>
  );
}