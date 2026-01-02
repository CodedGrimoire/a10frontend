import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Navbar from "../navbar";
import "./dashboard.css";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const sidebarLinksUser = [
  { label: "Dashboard Home", path: "/dashboard" },
  { label: "Profile", path: "/dashboard/profile" },
  { label: "My Books", path: "/dashboard/my-books" },
  { label: "Add Book", path: "/dashboard/add-book" },
];

const sidebarLinksAdmin = [
  { label: "Admin Overview", path: "/dashboard/admin" },
  { label: "All Books", path: "/all" },
  { label: "Add Book", path: "/dashboard/add-book" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = ADMIN_EMAIL && user?.email === ADMIN_EMAIL;
  const sidebarLinks = isAdmin
    ? [...sidebarLinksUser, ...sidebarLinksAdmin]
    : sidebarLinksUser;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-shell">
      <Navbar />

      <div className="dashboard-body">
        <div className="dash-toggle-row">
          <Container className="dash-toggle-container">
            <button
              className="dash-toggle"
              aria-label="Toggle sidebar"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </Container>
        </div>
        <aside className={`dashboard-sidebar ${menuOpen ? "open" : ""}`}>
          <nav className="sidebar-nav">
            {sidebarLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? "sidebar-link active" : "sidebar-link"}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="sidebar-logout"
            >
              Logout
            </Button>
          </nav>
        </aside>

        <main className="dashboard-main">
          <Container className="section-shell">
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}
