export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  isPending = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  ariaLabel,
  className = "",
  ...props
}) {
  const isDisabled = disabled || isPending;
  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-5 py-3 text-lg",
  };

  const variants = {
    primary:
      "bg-(--brand-600) text-(--text-on-buttons) focus-visible:ring-(--brand-600)",

    secondary: " text-(--grey-800) focus-visible:ring-(--grey-800)",

    danger:
      "bg-(--danger-600) text-(--text-on-buttons) focus-visible:ring-(--danger)",

    google: "bg-(--grey-100) text-(--grey-800) border border-(--grey-300)",

    github: "bg-(--github-color) text-(--text-on-buttons)",

    ghost: "bg-transparent text-(--brand-600) hover:bg-(--brand-50)",

    card: "bg-transparent text-(--brand-500) hover:text-(--brand-600)",
  };

 const base =
  `inline-flex items-center gap-2 rounded-lg font-medium transition ` +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "select-none whitespace-nowrap cursor-pointer";

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isPending}
      aria-label={ariaLabel}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:opacity-90 active:scale-95"}
        ${className}
      `}
      {...props}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </button>
  );
}
