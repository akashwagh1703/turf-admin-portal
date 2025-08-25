import { useEffect, useState } from "react";
import * as settingsService from "../services/settingsService.js";

// Tabs Component
function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    "Pages",
    "Notifications",
    "Payment Gateway",
    "Global Settings",
    "Announcements",
    "Theme & Branding",
    "SEO & Features",
    "Role Permissions",
  ];
  return (
    <ul className="nav nav-tabs mb-3">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab}>
          <button
            className={`nav-link ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Page Editor
function PageEditor({ pages, setPages }) {
  const [selectedPage, setSelectedPage] = useState(Object.keys(pages)[0] || "");

  const handleChange = (e) =>
    setPages({ ...pages, [selectedPage]: e.target.value });

  return (
    <div>
      <select
        className="form-select w-auto mb-2"
        value={selectedPage}
        onChange={(e) => setSelectedPage(e.target.value)}
      >
        {Object.keys(pages).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <textarea
        className="form-control"
        rows={8}
        value={pages[selectedPage]}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={() =>
          settingsService.savePage(selectedPage, pages[selectedPage])
        }
      >
        Save Page
      </button>
    </div>
  );
}

// Notification Templates
function NotificationTemplates({ templates, setTemplates }) {
  const handleChange = (type, key, value) => {
    setTemplates({
      ...templates,
      [type]: { ...templates[type], [key]: value },
    });
  };

  return (
    <div>
      {Object.keys(templates).map((type) => (
        <div key={type}>
          <h6>{type}</h6>
          {Object.keys(templates[type]).map((key) => (
            <div className="mb-2" key={key}>
              <label className="form-label">{key}</label>
              <textarea
                className="form-control"
                rows={2}
                value={templates[type][key]}
                onChange={(e) => handleChange(type, key, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <button
        className="btn btn-primary"
        onClick={() => settingsService.saveTemplates(templates)}
      >
        Save Templates
      </button>
    </div>
  );
}

// Payment Gateway
function PaymentGateway({ credentials, setCredentials }) {
  const handleChange = (type, key, value) => {
    setCredentials({
      ...credentials,
      [type]: { ...credentials[type], [key]: value },
    });
  };

  return (
    <div>
      {Object.keys(credentials).map((type) => (
        <div key={type}>
          <h6>{type}</h6>
          {Object.keys(credentials[type]).map((key) => (
            <div className="mb-2" key={key}>
              <label className="form-label">{key}</label>
              <input
                type="text"
                className="form-control"
                value={credentials[type][key]}
                onChange={(e) => handleChange(type, key, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <button
        className="btn btn-primary"
        onClick={() => settingsService.savePayment(credentials)}
      >
        Save Payment Credentials
      </button>
    </div>
  );
}

// Global Settings
function GlobalSettings({ settings, setSettings }) {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });

  return (
    <div>
      {Object.keys(settings).map((key) => (
        <div className="mb-2" key={key}>
          <label className="form-label">{key}</label>
          <input
            type="text"
            className="form-control w-auto"
            value={settings[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
      <button
        className="btn btn-primary"
        onClick={() => settingsService.saveGlobal(settings)}
      >
        Save Global Settings
      </button>
    </div>
  );
}

// Announcements
function Announcements({ announcements, setAnnouncements }) {
  const handleChange = (index, value) => {
    const updated = [...announcements];
    updated[index] = value;
    setAnnouncements(updated);
  };
  const addAnnouncement = () => setAnnouncements([...announcements, ""]);

  return (
    <div>
      {announcements.map((a, i) => (
        <input
          type="text"
          className="form-control mb-2"
          key={i}
          value={a}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
      <button
        className="btn btn-sm btn-secondary me-2"
        onClick={addAnnouncement}
      >
        + Add Announcement
      </button>
      <button
        className="btn btn-primary"
        onClick={() => settingsService.saveAnnouncements(announcements)}
      >
        Save Announcements
      </button>
    </div>
  );
}

// Theme & Branding
function ThemeBranding({ theme, setTheme }) {
  const handleChange = (key, value) => setTheme({ ...theme, [key]: value });

  return (
    <div>
      <div className="mb-2">
        <label className="form-label">Platform Name</label>
        <input
          className="form-control"
          value={theme.platformName || ""}
          onChange={(e) => handleChange("platformName", e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Logo URL</label>
        <input
          className="form-control"
          value={theme.logo || ""}
          onChange={(e) => handleChange("logo", e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => settingsService.saveTheme(theme)}
      >
        Save Theme
      </button>
    </div>
  );
}

// SEO & Features
function SEOFeatures({ seo, features, setSEO, setFeatures }) {
  const handleSEOChange = (key, value) => setSEO({ ...seo, [key]: value });
  const handleFeatureChange = (key, value) =>
    setFeatures({ ...features, [key]: value });

  return (
    <div>
      <h6>SEO Settings</h6>
      {Object.keys(seo).map((key) => (
        <div className="mb-2" key={key}>
          <label className="form-label">{key}</label>
          <input
            className="form-control"
            value={seo[key]}
            onChange={(e) => handleSEOChange(key, e.target.value)}
          />
        </div>
      ))}
      <h6 className="mt-3">Feature Toggles</h6>
      {Object.keys(features).map((key) => (
        <div className="form-check mb-2" key={key}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={features[key]}
            onChange={(e) => handleFeatureChange(key, e.target.checked)}
          />
          <label className="form-check-label">{key}</label>
        </div>
      ))}
      <button
        className="btn btn-primary mt-2"
        onClick={() => {
          settingsService.saveSEO(seo);
          settingsService.saveFeatures(features);
        }}
      >
        Save SEO & Features
      </button>
    </div>
  );
}

// Role Permissions
function RolePermissions({ roles, setRoles }) {
  const handleChange = (role, key, value) =>
    setRoles({
      ...roles,
      [role]: { ...roles[role], [key]: value },
    });

  return (
    <div>
      {Object.keys(roles).map((role) => (
        <div key={role} className="mb-3">
          <h6>{role}</h6>
          {Object.keys(roles[role]).map((key) => (
            <div className="form-check" key={key}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={roles[role][key]}
                onChange={(e) => handleChange(role, key, e.target.checked)}
              />
              <label className="form-check-label">{key}</label>
            </div>
          ))}
        </div>
      ))}
      <button
        className="btn btn-primary"
        onClick={() => {
          Object.keys(roles).forEach((role) =>
            settingsService.saveRolePermissions(role, roles[role])
          );
        }}
      >
        Save Role Permissions
      </button>
    </div>
  );
}

// Main Component
export default function ContentSettings() {
  const [activeTab, setActiveTab] = useState("Pages");
  const [pages, setPages] = useState({});
  const [templates, setTemplates] = useState({});
  const [credentials, setCredentials] = useState({});
  const [settings, setSettings] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [theme, setTheme] = useState({});
  const [seo, setSEO] = useState({});
  const [features, setFeatures] = useState({});
  const [roles, setRoles] = useState({});

  useEffect(() => {
    settingsService.getSettings().then((data) => {
      setPages(data.pages || {});
      setTemplates(data.templates || {});
      setCredentials(data.credentials || {});
      setSettings(data.global || {});
      setAnnouncements(data.announcements || []);
      setTheme(data.theme || {});
      setSEO(data.seo || {});
      setFeatures(data.features || {});
      setRoles(data.roles || {});
    });
  }, []);

  return (
    <div className="container-fluid">
      <h5 className="mb-3">Content & Settings Management</h5>
      <p className="text-muted">
        Manages all global settings and static content of the platform.
      </p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="card shadow-sm p-3">
        {activeTab === "Pages" && (
          <PageEditor pages={pages} setPages={setPages} />
        )}
        {activeTab === "Notifications" && (
          <NotificationTemplates
            templates={templates}
            setTemplates={setTemplates}
          />
        )}
        {activeTab === "Payment Gateway" && (
          <PaymentGateway
            credentials={credentials}
            setCredentials={setCredentials}
          />
        )}
        {activeTab === "Global Settings" && (
          <GlobalSettings settings={settings} setSettings={setSettings} />
        )}
        {activeTab === "Announcements" && (
          <Announcements
            announcements={announcements}
            setAnnouncements={setAnnouncements}
          />
        )}
        {activeTab === "Theme & Branding" && (
          <ThemeBranding theme={theme} setTheme={setTheme} />
        )}
        {activeTab === "SEO & Features" && (
          <SEOFeatures
            seo={seo}
            features={features}
            setSEO={setSEO}
            setFeatures={setFeatures}
          />
        )}
        {activeTab === "Role Permissions" && (
          <RolePermissions roles={roles} setRoles={setRoles} />
        )}
      </div>
    </div>
  );
}
