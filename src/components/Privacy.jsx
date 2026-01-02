import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";

export default function Privacy() {
  return (
    <Container className="section-shell">
      <Card>
        <SectionHeader
          title="Privacy & Terms"
          description="How The Book Haven handles your data and content."
        />
        <div className="stack" style={{ gap: "var(--space-4)" }}>
          <div>
            <h3>What we collect</h3>
            <p className="muted-text">
              We store the books you add, along with your account email and optional profile name/photo. No payment or location data is collected.
            </p>
          </div>
          <div>
            <h3>How we use it</h3>
            <p className="muted-text">
              Your submissions are shown to other readers. Your email is used for authentication and to attribute books you create. We do not sell or share your personal data.
            </p>
          </div>
          <div>
            <h3>Control & removal</h3>
            <p className="muted-text">
              You can delete your books from My Books. To remove your account data, contact us at contact@bookhaven.com and we will process the request promptly.
            </p>
          </div>
          <div>
            <h3>Security</h3>
            <p className="muted-text">
              Authentication is handled by Firebase; passwords are never stored in this frontend. We encourage using strong, unique passwords.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
