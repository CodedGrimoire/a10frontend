import { useState } from "react";
import { updateProfile } from "firebase/auth";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../firebaseConfig";

export default function DashboardProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus("");
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: form.name.trim(),
        photoURL: form.photoURL || null,
      });
      setStatus("Profile updated successfully.");
    } catch (err) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stack" style={{ gap: "var(--space-6)" }}>
      <SectionHeader
        title="Profile"
        description="Manage your Book Haven profile."
      />

      <Card>
        <div className="profile-head">
          <div className="profile-avatar" aria-label="Profile photo">
            {form.photoURL ? (
              <img src={form.photoURL} alt={form.name || "User"} />
            ) : (
              <span>{(form.name || user?.email || "U")[0]}</span>
            )}
          </div>
          <div className="stack">
            <div className="profile-name">{user?.displayName || user?.email}</div>
            <div className="muted-text">{user?.email}</div>
          </div>
        </div>
        <form className="form-grid" onSubmit={handleSave} style={{ marginTop: "var(--space-4)" }}>
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={error && !form.name ? error : ""}
            required
          />
          <Input
            label="Photo URL"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            hint="Optional"
          />
          <div className="form-actions">
            <Button type="submit" loading={saving}>
              Save Profile
            </Button>
          </div>
          {status && <span className="muted-text">{status}</span>}
          {error && !(!form.name && error) && <span className="error-text">{error}</span>}
        </form>
      </Card>
    </div>
  );
}
