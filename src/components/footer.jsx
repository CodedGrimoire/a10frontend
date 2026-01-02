import "./Footer.css";
import Container from "./ui/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <Container className="footer-grid">
        <div className="footer-column">
          <div className="footer-logo" aria-hidden="true">
            📚
          </div>
          <div className="footer-title">The Book Haven</div>
          <p className="footer-subtitle">
            Your digital escape into worlds of imagination.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Navigate</h3>
          <div className="footer-links">
            <a href="/" className="footer-nav">
              Home
            </a>
            <a href="/all" className="footer-nav">
              All Books
            </a>
            <a href="/dashboard/add-book" className="footer-nav">
              Add Book
            </a>
            <a href="/dashboard/my-books" className="footer-nav">
              My Books
            </a>
            <a href="/about" className="footer-nav">
              About
            </a>
            <a href="/blog" className="footer-nav">
              Blog
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <div className="footer-contact">
            <a href="mailto:contact@bookhaven.com">contact@bookhaven.com</a>
            <a href="tel:+10000000000">+1 (000) 000-0000</a>
            <span>Global community</span>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Legal</h3>
          <div className="footer-links">
            <a href="/privacy" className="footer-nav">
              Privacy & Terms
            </a>
            <span className="footer-meta">© {currentYear} The Book Haven</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
