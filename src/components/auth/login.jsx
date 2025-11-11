// Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Assuming firebaseConfig.js contains your Firebase initialization

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      showToast('Login successful!', 'success');
      // Redirect to the home page after successful login
      window.location.href = '/home'; // Change this to the desired route
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showToast('Invalid credentials', 'error');
    }
  };

  // Define your styles object
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#fef3c7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    card: {
      backgroundColor: '#fffbeb',
      border: '2px solid #fde68a',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 4px 12px rgba(146, 64, 14, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#92400e',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#78350f',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#92400e',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #fde68a',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#fff',
      color: '#1f2937',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    },
    forgotPassword: {
      textAlign: 'right',
      marginTop: '8px',
    },
    forgotLink: {
      color: '#d97706',
      fontSize: '13px',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '10px',
    },
    loginButton: {
      backgroundColor: '#d97706',
      color: 'white',
    },
    googleButton: {
      backgroundColor: '#fff',
      color: '#1f2937',
      border: '2px solid #fde68a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '24px 0',
      color: '#92400e',
      fontSize: '14px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#fde68a',
    },
    dividerText: {
      padding: '0 12px',
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '14px',
      color: '#78350f',
    },
    link: {
      color: '#d97706',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer',
    },
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease',
    },
    toastSuccess: {
      backgroundColor: '#10b981',
    },
    toastError: {
      backgroundColor: '#ef4444',
    },
  };

  return (
    <div style={styles.container}>
      {toast.show && (
        <div
          style={{
            ...styles.toast,
            ...(toast.type === 'success' ? styles.toastSuccess : styles.toastError),
          }}
        >
          {toast.message}
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Welcome Back</h1>
          <p style={styles.subtitle}>Log in to your Book Haven account</p>
        </div>

        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <div style={styles.forgotPassword}>
              <a
                style={styles.forgotLink}
                onClick={() => window.location.href = '/forgot-password'}
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            style={{ ...styles.button, ...styles.loginButton }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
