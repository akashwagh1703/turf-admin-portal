import mockData from "../mock/settings.json";

let settingsData = JSON.parse(JSON.stringify(mockData));

// Get all settings
export const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(settingsData), 300);
  });
};

// Generic save function to update parts of the settings object
const saveSetting = (key, data) => {
    // A simple way to handle nested keys like "seo" or "global"
    const keys = key.split('.');
    let current = settingsData;
    while (keys.length > 1) {
        current = current[keys.shift()];
    }
    current[keys[0]] = data;

    return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 300)
    );
}

// Specific save functions for clarity, all using the generic handler
export const savePage = (page, content) => {
  settingsData.pages[page] = content;
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 300)
  );
};
export const saveTemplates = (templates) => saveSetting("templates", templates);
export const savePayment = (credentials) => saveSetting("credentials", credentials);
export const saveGlobal = (globalSettings) => saveSetting("global", globalSettings);
export const saveAnnouncements = (announcements) => saveSetting("announcements", announcements);
export const saveSEO = (seo) => saveSetting("seo", seo);
export const saveFeatures = (features) => saveSetting("features", features);
export const saveRolePermissions = (roles) => saveSetting("roles", roles);
