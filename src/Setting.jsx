import "./Setting.css";

function Setting() {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your library account and preferences.</p>
      </div>

      <div className="settings-container">

        {/* Account Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">👤</div>

            <div>
              <h2>Account Settings</h2>
              <p>Manage your personal information.</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <button className="save-button">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🔔</div>

            <div>
              <h2>Notifications</h2>
              <p>Choose which notifications you want to receive.</p>
            </div>
          </div>

          <div className="setting-option">
            <div>
              <h3>Due Date Reminders</h3>
              <p>Get notified when a borrowed book is almost due.</p>
            </div>

            <input type="checkbox" defaultChecked />
          </div>

          <div className="setting-option">
            <div>
              <h3>New Books</h3>
              <p>Receive notifications about newly added books.</p>
            </div>

            <input type="checkbox" />
          </div>
        </div>

        {/* Appearance */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🎨</div>

            <div>
              <h2>Appearance</h2>
              <p>Customize the look of your library dashboard.</p>
            </div>
          </div>

          <div className="setting-option">
            <div>
              <h3>Dark Mode</h3>
              <p>Use a darker appearance for the dashboard.</p>
            </div>

            <input type="checkbox" />
          </div>
        </div>

        {/* Language */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🌐</div>

            <div>
              <h2>Language</h2>
              <p>Select your preferred language.</p>
            </div>
          </div>

          <div className="form-group">
            <label>Language</label>

            <select>
              <option>English</option>
              <option>Persian</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Setting;