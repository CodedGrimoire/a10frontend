import React, { useState } from "react";

import "./auth.css";
import { sendPasswordResetEmail } from "firebase/auth";

import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebaseConfig";
import Container from "../ui/Container";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <Container className="section-shell">
      <Toaster position="top-right" />
      <Card className="auth-card">
        <SectionHeader
          title="Reset Password"
          description="Enter your email to receive reset instructions"
        />

        <form onSubmit={handleReset} className="auth-form">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" variant="primary">
            Send Reset Link
          </Button>
        </form>

        <div className="auth-footer">
          Remembered your password?{" "}
          <Link to="/login" className="link-strong">
            Go back to Login
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
