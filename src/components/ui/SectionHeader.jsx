export default function SectionHeader({ title, description, action }) {
  return (
    <div className="ui-section-header">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
