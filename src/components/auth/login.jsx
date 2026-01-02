import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Container from "../ui/Container";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import Input from "../ui/Input";
import Button from "../ui/Button";
import "./auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const location = useLocation();

  const googleProvider = new GoogleAuthProvider();
  const demoUserEmail = import.meta.env.VITE_DEMO_USER_EMAIL || "";
  const demoUserPassword = import.meta.env.VITE_DEMO_USER_PASSWORD || "";
  const demoAdminEmail = import.meta.env.VITE_DEMO_ADMIN_EMAIL || "";
  const demoAdminPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "";

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoadingState(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      toast.success("Login successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (error) {
      toast.error(error?.code ? error.code.replace("auth/", "") : "Invalid credentials");
    } finally {
      setLoadingState(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingState(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful!");

      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (error) {
      toast.error(error?.code ? error.code.replace("auth/", "") : "Google login failed");
    } finally {
      setLoadingState(false);
    }
  };

  const fillDemo = (type) => {
    if (type === "admin") {
      if (!demoAdminEmail || !demoAdminPassword) {
        toast.error("Demo Admin is not configured");
        return;
      }
      setFormData({ email: demoAdminEmail, password: demoAdminPassword });
      toast.success("Demo Admin credentials filled");
      return;
    }
    if (!demoUserEmail || !demoUserPassword) {
      toast.error("Demo User is not configured");
      return;
    }
    setFormData({ email: demoUserEmail, password: demoUserPassword });
    toast.success("Demo User credentials filled");
  };

  return (
    <Container className="section-shell">
      <Toaster position="top-right" />
      <Card className="auth-card">
        <SectionHeader title="📚 Welcome Back" description="Log in to your Book Haven account" />

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="field password-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="ui-input"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="forgot-link">
              <Link to="/forgot-password" state={{ from }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="auth-actions">
            <Button type="button" variant="ghost" size="sm" onClick={() => fillDemo("user")}>
              Demo User
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => fillDemo("admin")}>
              Demo Admin
            </Button>
          </div>

          <Button type="submit" variant="primary" loading={loadingState} disabled={loadingState}>
            Login
          </Button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <Button variant="ghost" onClick={handleGoogleLogin} loading={loadingState}>
          Continue with Google
        </Button>

        <div className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/register" state={location.state} className="link-strong">
            Register
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
