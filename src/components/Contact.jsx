import { useState } from "react";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStatus("Thanks for reaching out! We'll respond soon.");
    }, 500);
  };

  return (
    <Container className="section-shell">
      <Card>
        <SectionHeader
          title="Contact"
          description="Questions or feedback about The Book Haven? Reach us anytime."
        />
        <div className="contact-grid">
          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <p className="muted-text">
              Email: <a href="mailto:contact@bookhaven.com">contact@bookhaven.com</a>
            </p>
            <p className="muted-text">Phone: +1 (000) 000-0000</p>
            <p className="muted-text">Community hub: Global online</p>
          </div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="field">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="ui-input"
                rows={4}
                required
              />
            </div>
            {error && <span className="error-text">{error}</span>}
            {status && <span className="muted-text">{status}</span>}
            <div className="form-actions">
              <Button type="submit" loading={sending}>
                Send message
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}
