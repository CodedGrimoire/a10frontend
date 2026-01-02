import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";
import "./main.css";

const posts = [
  {
    title: "Curation updates",
    summary: "We refined latest and top-rated feeds so community picks surface faster, with genre and rating filters applied everywhere.",
    date: "2024-12-01",
  },
  {
    title: "Dashboard improvements",
    summary: "New overview stats, genre chart, and recent activity table help you track contributions without digging through lists.",
    date: "2024-11-15",
  },
  {
    title: "Accessibility & theming",
    summary: "Stronger focus states, dark-mode contrast fixes, and keyboard-friendly menus keep navigation fast for all users.",
    date: "2024-10-20",
  },
];

export default function Blog() {
  return (
    <Container className="section-shell">
      <SectionHeader
        title="Product updates"
        description="Highlights from the latest changes across The Book Haven."
      />
      <div className="card-grid listing-grid">
        {posts.map((post) => (
          <Card key={post.title} className="book-card modern">
            <div className="stack" style={{ gap: "var(--space-3)" }}>
              <div className="muted-text">{post.date}</div>
              <h3>{post.title}</h3>
              <p className="muted-text">{post.summary}</p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
