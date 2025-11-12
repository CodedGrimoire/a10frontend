// src/pages/Error.jsx (or wherever you keep route components)
// If you're on Next.js pages router, name it `pages/404.js`.
// If you're on Next.js app router, create `app/not-found.jsx` with this component body.

import React from 'react';

const Error = () => {
  const styles = {
    wrap: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0b0b',
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: '760px',
      background: '#111',
      border: '1px solid #222',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      color: '#dddee0ff',
    },
    imageBox: {
      position: 'relative',
      width: '100%',
      paddingBottom: '56.25%', 
      overflow: 'hidden',
      background: '#000',
    },
    img: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    body: {
      padding: '20px',
      textAlign: 'center',
    },
    badge: {
      display: 'inline-block',
      padding: '6px 10px',
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '999px',
      marginBottom: '10px',
      color: '#d1d5db',
    },
    title: {
      fontSize: '28px',
      lineHeight: 1.2,
      margin: '6px 0 8px',
      color: '#f9fafb',
    },
    subtitle: {
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '18px',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    btnPrimary: {
      background: '#f97316',
      border: '1px solid #ea580c',
      color: '#111827',
      padding: '10px 16px',
      borderRadius: '10px',
      fontWeight: 600,
      textDecoration: 'none',
    },
    btnGhost: {
      background: 'transparent',
      border: '1px solid #374151',
      color: '#e5e7eb',
      padding: '10px 16px',
      borderRadius: '10px',
      fontWeight: 600,
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.wrap}>
      <main style={styles.card} role="main" aria-labelledby="error-title">
        <div style={styles.imageBox}>
          <img
            src="/error.jpeg"  // ensure the image is at /public/error.jpeg
            alt="Lost in the reel — scene not found"
            style={styles.img}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div style={styles.body}>
          <span style={styles.badge} aria-hidden="true">404 • Not Found</span>
          <h1 id="error-title" style={styles.title}>This page went off-script.</h1>
          <p style={styles.subtitle}>
            The scene you’re looking for isn’t in this cut. Try heading back to the homepage.
          </p>

          <div style={styles.actions}>
            {/* Works in any router/environment */}
            <a href="/" style={styles.btnPrimary}>Go Home</a>

            {/* Optional: back button using history if available */}
            <button
              type="button"
              style={styles.btnGhost}
              onClick={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
