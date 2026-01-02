import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className = "", label, hint, error, success = false, disabled = false, ...props },
  ref
) {
  const classes = ["ui-input", className];
  if (error) classes.push("error");
  if (success) classes.push("success");
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        {...props}
      />
      {hint && !error && <small className="muted-text">{hint}</small>}
      {error && <small style={{ color: "#dc2626" }}>{error}</small>}
    </div>
  );
});

export default Input;
