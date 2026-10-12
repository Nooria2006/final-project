
import "./account.css";

function Account() {
  return (
    <main className="account-page">

      {/* Header */}
      <header className="account-header">
        <div>
          <small>🏠 / My Account</small>
          <h2>My Account</h2>
        </div>
      </header>

      {/* Profile */}
      <section className="profile-card">

        <div className="profile-photo">
          👤
        </div>

        <div className="profile-info">
          <h1>Nooria</h1>
          <p>📧 nooria@example.com</p>
          <p>🌐 Web Developer & Student</p>
        </div>

        <button className="edit-button">
          ✏️ Edit Profile
        </button>

      </section>

      {/* Account Information */}
      <section className="account-section">

        <h2>Personal Information</h2>

        <div className="information-grid">

          <div className="information-box">
            <span>Full Name</span>
            <strong>Nooria</strong>
          </div>

          <div className="information-box">
            <span>Email</span>
            <strong>nooria@example.com</strong>
          </div>

          <div className="information-box">
            <span>Phone</span>
            <strong>+93 XXX XXX XXX</strong>
          </div>

          <div className="information-box">
            <span>Role</span>
            <strong>Student</strong>
          </div>

        </div>

      </section>

      {/* Library Activity */}
      <section className="account-section">

        <h2>Library Activity</h2>

        <div className="activity-grid">

          <div className="activity-card">
            <span className="activity-icon">📚</span>
            <h3>120</h3>
            <p>Total Books</p>
          </div>

          <div className="activity-card">
            <span className="activity-icon">📖</span>
            <h3>35</h3>
            <p>Borrowed Books</p>
          </div>

          <div className="activity-card">
            <span className="activity-icon">❤️</span>
            <h3>15</h3>
            <p>Favorite Books</p>
          </div>

          <div className="activity-card">
            <span className="activity-icon">🔖</span>
            <h3>15</h3>
            <p>Saved Books</p>
          </div>

        </div>

      </section>

      {/* Account Settings */}
      <section className="account-section">

        <h2>Account Settings</h2>

        <div className="settings-list">

          <button>
            🔒
            <span>
              <strong>Change Password</strong>
              <small>Update your account password</small>
            </span>
          </button>

          <button>
            🔔
            <span>
              <strong>Notifications</strong>
              <small>Manage your notifications</small>
            </span>
          </button>

          <button>
            ⚙️
            <span>
              <strong>Settings</strong>
              <small>Manage your account settings</small>
            </span>
          </button>

          <button className="logout-button">
            🚪
            <span>
              <strong>Logout</strong>
              <small>Sign out from your account</small>
            </span>
          </button>

        </div>

      </section>

      {/* Footer */}
      <footer className="account-footer">
        <p>© 2026 My Library. All Rights Reserved.</p>
      </footer>

    </main>
  );
}

export default Account;