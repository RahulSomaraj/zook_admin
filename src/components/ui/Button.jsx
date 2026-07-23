import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-[17px]",
  };

  const variants = {
    primary:
      "bg-primary text-white shadow-primary hover:bg-primary-dark",

    secondary:
      "border border-primary bg-white text-primary hover:bg-primary-pale",

    ghost:
      "border border-border bg-white text-charcoal hover:bg-surface",

    success:
      "bg-success text-white hover:brightness-95",

    danger:
      "bg-error text-white hover:brightness-95",
  };

  return (
    <button
      type={type}
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}