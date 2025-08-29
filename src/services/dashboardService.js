import mock from "../mock/dashboard.json";

let data = JSON.parse(JSON.stringify(mock));

export async function getDashboardData(role = "staff") {
  await new Promise((r) => setTimeout(r, 300));
  const key = role?.toLowerCase() || "staff";
  return data[key] || {};
}

export async function recentBookings(limit = 5) {
  await new Promise((r) => setTimeout(r, 220));
  return data.admin?.recentBookings ? data.admin.recentBookings.slice(0, limit) : [];
}
