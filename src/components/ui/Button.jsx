export default function Button({
  variant = "primary",
  size = "md",
  as: Component = "button",
  className = "",
  children,
  loading = false,
  disabled = false,
  ...props
}) {
  const classes = [
    "ui-button",
    variant,
    size === "sm" ? "small" : "",
    size === "lg" ? "large" : "",
    className,
    loading ? "loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && <span className="ui-spinner" aria-hidden="true" />}
    </Component>
  );
}
