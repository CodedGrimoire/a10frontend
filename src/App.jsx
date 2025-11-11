// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import MH from "./components/maincontent";
import AllBooks from "./components/Allbooks";
import MY from "./components/mybooks";
import ADD from "./components/addbooks";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import BookDetails from "./components/bookdetail";

import { useAuth } from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-4">loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* public */}
            <Route path="/" element={<MH />} />
            <Route path="/all" element={<AllBooks />} />

            {/* private */}
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MY />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <ADD />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-details/:id"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />

            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
