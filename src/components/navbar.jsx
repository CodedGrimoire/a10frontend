
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";

import "./Navbar.css";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import Container from "./ui/Container";
import Button from "./ui/Button";

const publicLinks = [
  { label: "Home", path: "/" },
  { label: "All Books", path: "/all" },
  { label: "Book of the Week", path: "/book-week" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
];

const protectedLinks = [
  { label: "Home", path: "/" },
  { label: "All Books", path: "/all" },
  { label: "Add Book", path: "/add", protected: true },
  { label: "My Books", path: "/my", protected: true },
  { label: "Book of the Week", path: "/book-week" },
];

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const linksToRender = user ? protectedLinks : publicLinks;
  const isActive = (path) => location.pathname === path;

  const handleKeyToggle = (e, setter) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setter((prev) => !prev);
    }
  };

  return (
    <header className="nav-shell">
      <div className="nav-bg" />
      <Container className="nav-bar">
        <Link to="/" className="nav-logo">
          <img
            src="https://bodleianshop.co.uk/cdn/shop/files/9781851246304BookCurses3Dcopy.jpg?v=1721145114"
            alt="The Book Haven logo"
            className="nav-logo-image"
          />
          <span>The Book Haven</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {linksToRender.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? "nav-link active" : "nav-link"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
              <Button
                variant="ghost"
                size="sm"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                {theme === "light" ? "Dark" : "Light"}
              </Button>

          {loading ? (
            <span className="nav-loading">Loading…</span>
          ) : user ? (
            <div className="nav-user-shell">
              <button
                className="nav-user"
                aria-label="Open profile menu"
                onClick={() => setProfileOpen((p) => !p)}
                onKeyDown={(e) => handleKeyToggle(e, setProfileOpen)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || user.email
                    )}`
                  }
                  alt="User avatar"
                  className="nav-avatar"
                />
                <div className="nav-user-meta">
                  <span className="nav-user-name">
                    {user.displayName || user.email}
                  </span>
                  <span className="nav-user-email">{user.email}</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="nav-dropdown" role="menu">
                  <Link to="/my" className="dropdown-item" role="menuitem">
                    Profile
                  </Link>
                  <Link to="/my" className="dropdown-item" role="menuitem">
                    Dashboard
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={logout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth">
              <Button as={Link} to="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button as={Link} to="/register" size="sm" variant="primary">
                Register
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
