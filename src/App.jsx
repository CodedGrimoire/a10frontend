// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import MH from "./components/maincontent";
import AllBooks from "./components/Allbooks";
import MY from "./components/mybooks";
import ADD from "./components/addbooks";

import Error from "./components/Error";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import BookDetails from "./components/bookdetail";
import FP from "./components/auth/forgotpass";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import DashboardProfile from "./components/dashboard/DashboardProfile";
import Contact from "./components/Contact";
import Help from "./components/Help";
import Privacy from "./components/Privacy";
import AboutPage from "./components/AboutPage";
import Blog from "./components/Blog";
import BookWeekPage from "./components/BookWeekPage";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function PrivateRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p style={{ padding: "var(--space-4)" }}>Loading...</p>;

  if (!user) {
  
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
  if (requireAdmin && ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<MH />} />
          <Route path="/all" element={<AllBooks />} />
          <Route path="/forgot-password" element={<FP />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/book-week" element={<BookWeekPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>

        {/* private dashboard without public navbar */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route
            path="add-book"
            element={
              <PrivateRoute>
                <ADD />
              </PrivateRoute>
            }
          />
          <Route
            path="my-books"
            element={
              <PrivateRoute>
                <MY />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <DashboardProfile />
              </PrivateRoute>
            }
          />
          {ADMIN_EMAIL && (
            <Route
              path="admin"
              element={
                <PrivateRoute requireAdmin>
                  <DashboardHome adminView />
                </PrivateRoute>
              }
            />
          )}
        </Route>
        <Route path="/my" element={<Navigate to="/dashboard/my-books" replace />} />
        <Route path="/add" element={<Navigate to="/dashboard/add-book" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
