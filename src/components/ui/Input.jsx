import clsx from "clsx";

export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      className={clsx(
        "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-dark placeholder:text-light focus:border-primary focus:outline-none",
        className
      )}
      {...props}
    />
  );
}