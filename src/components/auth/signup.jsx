import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import "./auth.css";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";
import Container from "../ui/Container";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const demoUserEmail = import.meta.env.VITE_DEMO_USER_EMAIL || "";
  const demoUserPassword = import.meta.env.VITE_DEMO_USER_PASSWORD || "";
  const demoAdminEmail = import.meta.env.VITE_DEMO_ADMIN_EMAIL || "";
  const demoAdminPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "";

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassword = (password) => {
    const errs = [];

    if (!/[A-Z]/.test(password)) errs.push("One uppercase letter");
    if (password.length < 6) errs.push("At least 6 characters");

    if (!/[a-z]/.test(password)) errs.push("One lowercase letter");
    return errs;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    const passErrors = validatePassword(formData.password);
    if (formData.password === "") newErrors.password = "Password is required";
    else if (passErrors.length > 0) newErrors.password = "Missing: " + passErrors.join(", ");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }
    setLoadingState(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      toast.success("Registration successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (error) {
      toast.error("Error during registration: " + error.message);
    } finally {
      setLoadingState(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingState(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    } finally {
      setLoadingState(false);
    }
  };

  const passwordIsValid =
    formData.password.length >= 6 && /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password);

  const formIsValid = formData.name.trim() !== "" && formData.email.trim() !== "" && passwordIsValid;

  return (
    <Container className="section-shell">
      <Toaster position="top-right" />

      <Card className="auth-card">
        <SectionHeader
          title="📚 Join Book Haven"
          description="Create your account to start reading"
        />

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
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
                className={`ui-input ${errors.password ? "input-error" : ""}`}
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
            {errors.password && <div className="error-text">{errors.password}</div>}
            <div className="password-hints">
              <div className={`hint-item ${/[A-Z]/.test(formData.password) ? "valid" : ""}`}>
                {/[A-Z]/.test(formData.password) ? "✓" : "•"} One uppercase letter
              </div>
              <div className={`hint-item ${/[a-z]/.test(formData.password) ? "valid" : ""}`}>
                {/[a-z]/.test(formData.password) ? "✓" : "•"} One lowercase letter
              </div>
              <div className={`hint-item ${formData.password.length >= 6 ? "valid" : ""}`}>
                {formData.password.length >= 6 ? "✓" : "•"} At least 6 characters
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!formIsValid || loadingState}
            loading={loadingState}
            className={!formIsValid ? "btn-disabled" : ""}
          >
            Register
          </Button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <Button variant="ghost" onClick={handleGoogleLogin} loading={loadingState}>
          Continue with Google
        </Button>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" state={location.state} className="link-strong">
            Login
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
