import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";

const faqs = [
  {
    q: "How do I add a book?",
    a: "Use the dashboard Add Book page. You need to be signed in to submit titles.",
  },
  {
    q: "How are ratings handled?",
    a: "Ratings come from user submissions and are displayed on details and listings. Minimum 1, maximum 5.",
  },
  {
    q: "Is my data private?",
    a: "We only store the book data you submit along with your account email for ownership.",
  },
];

export default function Help() {
  return (
    <Container className="section-shell">
      <Card>
        <SectionHeader
          title="Help & Support"
          description="Common questions about using The Book Haven."
        />
        <div className="stack" style={{ gap: "var(--space-3)" }}>
          {faqs.map((item) => (
            <div key={item.q} className="faq-item">
              <h3>{item.q}</h3>
              <p className="muted-text">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
