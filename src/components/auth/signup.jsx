// src/components/auth/Register.jsx
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const provider = new GoogleAuthProvider();

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // show toast
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('Must be at least 6 characters');
    if (!/[A-Z]/.test(password)) errors.push('Must include an uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Must include a lowercase letter');
    return errors;
  };

  // handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passErrors = validatePassword(formData.password);
      if (passErrors.length > 0) newErrors.password = passErrors.join(', ');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      showToast('Registration successful!', 'success');
      window.location.href = '/login';
    } catch (error) {
      showToast('Error during registration: ' + error.message, 'error');
    }
  };

  // handle google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google user:', result.user);
      showToast('Google login successful!', 'success');
      window.location.href = '/';
    } catch (error) {
      showToast('Google login failed: ' + error.message, 'error');
    }
  };

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
    header: { textAlign: 'center', marginBottom: '30px' },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#92400e',
      marginBottom: '8px',
    },
    subtitle: { fontSize: '14px', color: '#78350f' },
    formGroup: { marginBottom: '20px' },
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
      transition: 'border-color 0.2s',
    },
    inputError: { borderColor: '#ef4444' },
    errorText: { color: '#ef4444', fontSize: '12px', marginTop: '4px' },
    passwordHints: {
      fontSize: '12px',
      color: '#78350f',
      marginTop: '6px',
      lineHeight: '1.5',
    },
    hintItem: { display: 'flex', alignItems: 'center', gap: '4px' },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
    },
    registerButton: { backgroundColor: '#d97706', color: 'white' },
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
    dividerLine: { flex: 1, height: '1px', backgroundColor: '#fde68a' },
    dividerText: { padding: '0 12px' },
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
      zIndex: 1000,
      animation: 'slideIn 0.3s ease',
    },
    toastSuccess: { backgroundColor: '#10b981' },
    toastError: { backgroundColor: '#ef4444' },
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
          <h1 style={styles.title}>📚 Join Book Haven</h1>
          <p style={styles.subtitle}>Create your account to start reading</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              required
            />
            {errors.name && <div style={styles.errorText}>{errors.name}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              required
            />
            {errors.email && <div style={styles.errorText}>{errors.email}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              required
            />
            {errors.password && <div style={styles.errorText}>{errors.password}</div>}

            <div style={styles.passwordHints}>
              <div style={styles.hintItem}>
                <span
                  style={{
                    color: formData.password.length >= 6 ? '#10b981' : '#78350f',
                  }}
                >
                  {formData.password.length >= 6 ? '✓' : '○'}
                </span>
                <span>At least 6 characters</span>
              </div>
              <div style={styles.hintItem}>
                <span
                  style={{
                    color: /[A-Z]/.test(formData.password) ? '#10b981' : '#78350f',
                  }}
                >
                  {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                </span>
                <span>One uppercase letter</span>
              </div>
              <div style={styles.hintItem}>
                <span
                  style={{
                    color: /[a-z]/.test(formData.password) ? '#10b981' : '#78350f',
                  }}
                >
                  {/[a-z]/.test(formData.password) ? '✓' : '○'}
                </span>
                <span>One lowercase letter</span>
              </div>
            </div>
          </div>

          <button type="submit" style={{ ...styles.button, ...styles.registerButton }}>
            Register
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button
          style={{ ...styles.button, ...styles.googleButton }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <div style={styles.footer}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
