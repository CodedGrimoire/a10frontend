// src/components/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // lightweight icon library

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();

  // where to go after login (default = home)
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  // inline styles kept from your version
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
      position: "relative",
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
      padding: "12px 40px 12px 12px",
      border: "2px solid #fde68a",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "#fff",
      color: "#1f2937",
      boxSizing: "border-box",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "38px",
      cursor: "pointer",
      color: "#92400e",
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
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Welcome Back</h1>
          <p style={styles.subtitle}>Log in to your Book Haven account</p>
        </div>

        <form onSubmit={handleSubmit}>
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <div
              style={styles.eyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            <div style={styles.forgotPassword}>
              {/* preserve 'from' when going to forgot-password */}
              <Link to="/forgot-password" state={{ from }} style={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit" style={{ ...styles.button, ...styles.loginButton }}>
            Login
          </button>
        </form>

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
          Continue with Google
        </button>

        <div style={styles.footer}>
          Don&apos;t have an account?{" "}
         
         <Link to="/register" state={location.state} style={styles.link}>
  Register
</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
