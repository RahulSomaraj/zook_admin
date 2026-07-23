import clsx from "clsx";

export default function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border bg-white shadow-card",
        hover && "transition-all duration-200 hover:shadow-hover",
        className
      )}
    >
      {children}
    </div>
  );
}