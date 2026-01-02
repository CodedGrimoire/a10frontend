export default function Badge({ tone = "info", className = "", children }) {
  const classes = ["ui-badge", tone, className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}
