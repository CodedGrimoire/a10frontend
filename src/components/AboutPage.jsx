import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";
import "./main.css";

export default function AboutPage() {
  return (
    <Container className="section-shell">
      <Card className="surface-block">
        <SectionHeader
          title="About The Book Haven"
          description="A reader-driven library where community-curated titles stay front and center."
        />
        <div className="stack" style={{ gap: "var(--space-4)" }}>
          <div>
            <h3>Our mission</h3>
            <p className="muted-text">
              Connect readers through a clean, fast experience for discovering and sharing books. Every title is contributed by the community and remains easy to browse with search, filters, and helpful metadata.
            </p>
          </div>
          <div>
            <h3>What you can do</h3>
            <ul className="muted-text" style={{ paddingLeft: "18px" }}>
              <li>Browse latest, top-rated, genre spotlights, and related picks.</li>
              <li>Add and manage your own books from the dashboard with ratings and summaries.</li>
              <li>Read and post comments on book detail pages.</li>
              <li>Stay current with a responsive UI and dark/light themes.</li>
            </ul>
          </div>
          <div>
            <h3>Why it works</h3>
            <p className="muted-text">
              The Book Haven emphasizes clarity: structured cards, meaningful stats, and fast navigation, backed by Firebase auth and a consistent design system.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
