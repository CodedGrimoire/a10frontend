// src/components/auth/Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      showToast("Login successful!", "success");
      window.location.href = "/"; // go to home
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showToast("Invalid credentials", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("google user:", result.user);
      showToast("Login successful!", "success");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      showToast("Google login failed", "error");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#fef3c7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    card: {
      backgroundColor: "#fffbeb",
      border: "2px solid #fde68a",
      borderRadius: "12px",
      padding: "40px",
      maxWidth: "450px",
      width: "100%",
      boxShadow: "0 4px 12px rgba(146, 64, 14, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#92400e",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#78350f",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#92400e",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "2px solid #fde68a",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "#fff",
      color: "#1f2937",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
    },
    forgotPassword: {
      textAlign: "right",
      marginTop: "8px",
    },
    forgotLink: {
      color: "#d97706",
      fontSize: "13px",
      textDecoration: "none",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "10px",
    },
    loginButton: {
      backgroundColor: "#d97706",
      color: "white",
    },
    googleButton: {
      backgroundColor: "#fff",
      color: "#1f2937",
      border: "2px solid #fde68a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "24px 0",
      color: "#92400e",
      fontSize: "14px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#fde68a",
    },
    dividerText: {
      padding: "0 12px",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "14px",
      color: "#78350f",
    },
    link: {
      color: "#d97706",
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer",
    },
    toast: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "16px 24px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 1000,
      animation: "slideIn 0.3s ease",
    },
    toastSuccess: {
      backgroundColor: "#10b981",
    },
    toastError: {
      backgroundColor: "#ef4444",
    },
  };

  return (
    <div style={styles.container}>
      {toast.show && (
        <div
          style={{
            ...styles.toast,
            ...(toast.type === "success"
              ? styles.toastSuccess
              : styles.toastError),
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
                onClick={() => (window.location.href = "/forgot-password")}
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

        {/* divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* google */}
        <button
          style={{ ...styles.button, ...styles.googleButton }}
          onClick={handleGoogleLogin}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
              fill="#4285F4"
            />
            <path
              d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
              fill="#34A853"
            />
            <path
              d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
              fill="#FBBC05"
            />
            <path
              d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* footer link */}
        <div style={styles.footer}>
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            style={styles.link}
          >
            Register
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
