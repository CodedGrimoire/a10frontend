export default function Skeleton({ className = "", style, height = 14 }) {
  return (
    <div
      className={["ui-skeleton", className].filter(Boolean).join(" ")}
      style={{ height, ...style }}
    />
  );
}
