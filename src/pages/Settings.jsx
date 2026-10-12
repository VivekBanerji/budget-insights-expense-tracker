import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaPalette,
  FaGlobe,
  FaSave,
} from "react-icons/fa";

function Settings() {
  const [name, setName] = useState("Vivek");
  const [email, setEmail] = useState("vivek@example.com");
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("Settings saved for this session!");
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>
        <p>Manage your profile and application preferences.</p>
      </div>

      <form onSubmit={handleSave}>
        {/* Profile */}
        <section className="settings-card">
          <div className="settings-title">
            <FaUser />
            <div>
              <h2>Profile Information</h2>
              <p>Update your personal details.</p>
            </div>
          </div>

          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>

        {/* Preferences */}
        <section className="settings-card">
          <div className="settings-title">
            <FaGlobe />
            <div>
              <h2>Preferences</h2>
              <p>Choose your preferred display settings.</p>
            </div>
          </div>

          <label>Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>

          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Malayalam</option>
            <option>Hindi</option>
          </select>
        </section>

        {/* Appearance */}
        <section className="settings-card">
          <div className="settings-title">
            <FaPalette />
            <div>
              <h2>Appearance</h2>
              <p>Customize your display preferences.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <strong>Dark Mode</strong>
              <p>Enable dark appearance preference.</p>
            </div>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-card">
          <div className="settings-title">
            <FaBell />
            <div>
              <h2>Notifications</h2>
              <p>Manage your notification preferences.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <strong>Budget Alerts</strong>
              <p>Alerts when spending approaches your budget.</p>
            </div>

            <input
              type="checkbox"
              checked={budgetAlerts}
              onChange={(e) => setBudgetAlerts(e.target.checked)}
            />
          </div>

          <div className="settings-option">
            <div>
              <strong>Transaction Notifications</strong>
              <p>Notifications for transaction updates.</p>
            </div>

            <input
              type="checkbox"
              checked={transactionAlerts}
              onChange={(e) =>
                setTransactionAlerts(e.target.checked)
              }
            />
          </div>
        </section>

        <div className="settings-footer">
          <button type="submit" className="settings-save-btn">
            <FaSave /> Save Settings
          </button>

          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default Settings;
