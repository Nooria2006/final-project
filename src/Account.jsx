
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  Pencil,
  BookOpen,
  Heart,
  Bookmark,
  LockKeyhole,
  Bell,
  Settings,
  LogOut,
  Save,
  X,
  LibraryBig,
  CheckCircle,
} from "lucide-react";

import "./Account.css";

const defaultProfile = {
  name: "Nooria",
  email: "nooria@example.com",
  phone: "+93",
  role: "Student",
  profession: "Web Developer & Student",
};

function Account({ setCurrentPage }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("myLibraryProfile");
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("myLibraryNotifications") !== "false";
  });

  const [form, setForm] = useState(profile);

  useEffect(() => {
    localStorage.setItem("myLibraryProfile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(
      "myLibraryNotifications",
      String(notifications)
    );
  }, [notifications]);

  const getStoredBooks = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const favorites = getStoredBooks("myLibraryFavorites");

  const handleEdit = () => {
    setForm(profile);
    setEditMode(true);
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedProfile = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      profession: form.profession.trim(),
    };

    if (!updatedProfile.name || !updatedProfile.email) {
      setMessage("Please enter your name and email.");
      return;
    }

    setProfile(updatedProfile);
    setEditMode(false);
    setMessage("Your profile has been saved successfully!");
  };

  const handleSetting = (setting) => {
    if (setting === "notifications") {
      setNotifications((previous) => !previous);
      setMessage(
        notifications
          ? "Notifications have been turned off."
          : "Notifications have been turned on."
      );
    }

    if (setting === "password") {
      setMessage(
        "Password changes will be available when a real login system is added."
      );
    }

    if (setting === "settings") {
      if (setCurrentPage) {
        setCurrentPage("settings");
      } else {
        setMessage("Open Settings from the sidebar to manage your preferences.");
      }
    }

    if (setting === "logout") {
      setMessage(
        "This project does not have a real login system yet, so you are still signed in."
      );
    }
  };

  return (
    <main className="account-page">
      <header className="account-header">
        <div>
          <small className="account-breadcrumb">
            <LibraryBig size={15} />
            My Library <span>/</span> My Account
          </small>

          <h1>My Account</h1>

          <p>Manage your profile and track your reading journey.</p>
        </div>

        <div className="account-header-icon">
          <UserRound size={27} />
        </div>
      </header>

      {message && (
        <div className="account-message" role="status">
          <CheckCircle size={19} />
          <span>{message}</span>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <section className="profile-card">
        <div className="profile-avatar">
          <UserRound size={42} />
          <span className="online-indicator" />
        </div>

        <div className="profile-info">
          <span className="profile-label">MY PROFILE</span>
          <h2>{profile.name}</h2>
          <p>
            <Mail size={16} />
            {profile.email}
          </p>
          <p>
            <GraduationCap size={17} />
            {profile.profession || "Library Member"}
          </p>
          <span className="profile-role">{profile.role}</span>
        </div>

        <button
          type="button"
          className="edit-button"
          onClick={handleEdit}
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </section>

      {editMode && (
        <section className="account-section edit-profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">YOUR DETAILS</span>
              <h2>Edit Your Profile</h2>
            </div>
          </div>

          <form className="account-edit-form" onSubmit={handleSave}>
            <label>
              Full Name
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </label>

            <label>
              Role
              <select
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value })
                }
              >
                <option>Student</option>
                <option>Teacher</option>
                <option>Librarian</option>
                <option>Web Developer</option>
              </select>
            </label>

            <label className="edit-full-width">
              Profession / Description
              <input
                type="text"
                value={form.profession}
                onChange={(event) =>
                  setForm({ ...form, profession: event.target.value })
                }
                placeholder="What do you do?"
              />
            </label>

            <div className="edit-form-actions edit-full-width">
              <button
                type="button"
                className="cancel-edit-button"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-profile-button">
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="account-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">PROFILE DETAILS</span>
            <h2>Personal Information</h2>
          </div>

          <button
            type="button"
            className="text-action"
            onClick={handleEdit}
          >
            <Pencil size={15} /> Edit
          </button>
        </div>

        <div className="information-grid">
          <div className="information-box">
            <div className="information-icon">
              <UserRound size={19} />
            </div>
            <span>Full Name</span>
            <strong>{profile.name}</strong>
          </div>

          <div className="information-box">
            <div className="information-icon">
              <Mail size={19} />
            </div>
            <span>Email Address</span>
            <strong>{profile.email}</strong>
          </div>

          <div className="information-box">
            <div className="information-icon">
              <Phone size={19} />
            </div>
            <span>Phone Number</span>
            <strong>{profile.phone || "Not provided"}</strong>
          </div>

          <div className="information-box">
            <div className="information-icon">
              <GraduationCap size={19} />
            </div>
            <span>Role</span>
            <strong>{profile.role}</strong>
          </div>
        </div>
      </section>

      <section className="account-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">YOUR READING JOURNEY</span>
            <h2>Library Activity</h2>
          </div>

          <span className="activity-note">Your library overview</span>
        </div>

        <div className="activity-grid">
          <div className="activity-card activity-blue">
            <div className="activity-top">
              <span className="activity-icon">
                <BookOpen size={23} />
              </span>
              <span className="activity-tag">Collection</span>
            </div>
            <h3>—</h3>
            <p>Total Books</p>
            <small>Connect your book collection to track this number.</small>
          </div>

          <div className="activity-card activity-purple">
            <div className="activity-top">
              <span className="activity-icon">
                <LibraryBig size={23} />
              </span>
              <span className="activity-tag">Reading</span>
            </div>
            <h3>—</h3>
            <p>Borrowed Books</p>
            <small>Track your borrowed books in your library.</small>
          </div>

          <div className="activity-card activity-pink">
            <div className="activity-top">
              <span className="activity-icon">
                <Heart size={23} />
              </span>
              <span className="activity-tag">Favorites</span>
            </div>
            <h3>{favorites.length}</h3>
            <p>Favorite Books</p>
            <small>Books you have saved as favorites.</small>
          </div>

          <div className="activity-card activity-green">
            <div className="activity-top">
              <span className="activity-icon">
                <Bookmark size={23} />
              </span>
              <span className="activity-tag">Saved</span>
            </div>
            <h3>—</h3>
            <p>Saved Books</p>
            <small>Saved-book tracking can be connected later.</small>
          </div>
        </div>
      </section>

      <section className="account-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">PREFERENCES</span>
            <h2>Account Settings</h2>
          </div>
        </div>

        <div className="settings-list">
          <button
            type="button"
            onClick={() => handleSetting("password")}
          >
            <span className="settings-icon settings-lock">
              <LockKeyhole size={20} />
            </span>
            <span className="settings-text">
              <strong>Change Password</strong>
              <small>Update your account password</small>
            </span>
            <span className="settings-arrow">›</span>
          </button>

          <button
            type="button"
            onClick={() => handleSetting("notifications")}
          >
            <span className="settings-icon settings-bell">
              <Bell size={20} />
            </span>
            <span className="settings-text">
              <strong>Notifications</strong>
              <small>
                Notifications are {notifications ? "enabled" : "disabled"}
              </small>
            </span>
            <span
              className={`notification-switch ${
                notifications ? "switch-on" : ""
              }`}
              aria-label={notifications ? "On" : "Off"}
            >
              <span />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSetting("settings")}
          >
            <span className="settings-icon settings-preferences">
              <Settings size={20} />
            </span>
            <span className="settings-text">
              <strong>Library Settings</strong>
              <small>Manage your library preferences</small>
            </span>
            <span className="settings-arrow">›</span>
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={() => handleSetting("logout")}
          >
            <span className="settings-icon settings-logout">
              <LogOut size={20} />
            </span>
            <span className="settings-text">
              <strong>Logout</strong>
              <small>Sign out from your account</small>
            </span>
            <span className="settings-arrow">›</span>
          </button>
        </div>
      </section>

      <footer className="account-footer">
        <p>© 2026 My Library. All rights reserved.</p>
        <span>Made for readers, built with care. ♡</span>
      </footer>
    </main>
  );
}

export default Account;
