const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: '#fef3c7',
      color: '#1f2937',
      padding: '24px 0',
      
      borderTop: '2px solid #fde68a',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap',
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    brandTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#92400e',
      margin: 0,
    },
    divider: {
      color: '#9ca3af',
      margin: '0 8px',
    },
    tagline: {
      fontSize: '14px',
      color: '#4b5563',
      margin: 0,
    },
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    link: {
      color: '#4b5563',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'color 0.2s',
    },
    dot: {
      color: '#d1d5db',
    },
    copyright: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0,
    },
  };

  const handleLinkHover = (e) => {
    e.target.style.color = '#b45309';
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = '#4b5563';
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <h2 style={styles.brandTitle}>📚 The Book Haven</h2>
            <span style={styles.divider}>|</span>
            <p style={styles.tagline}>Your digital escape into worlds of imagination</p>
          </div>

          {/* Social Media Links */}
          <div style={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Facebook
            </a>
            <span style={styles.dot}>•</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              X
            </a>
            <span style={styles.dot}>•</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Instagram
            </a>
          </div>

          {/* Copyright */}
          <p style={styles.copyright}>© {currentYear} The Book Haven</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;