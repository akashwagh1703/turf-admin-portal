// src/services/dashboardService.js
import data from "../mock/dashboard.json";

export async function overview(role = "staff") {
  await new Promise((r) => setTimeout(r, 220));
  const key = role?.toLowerCase() || "staff"; // normalize role
  // console.log(data[key])
  return data[key]?.kpis || {};
}

export async function extra(role = "staff") {
  await new Promise((r) => setTimeout(r, 220));
  const key = role?.toLowerCase() || "staff"; // normalize role
  return {
    charts: data[key]?.charts || {},
    upcomingBookings: data[key]?.upcomingBookings || [],
    schedule: data[key]?.schedule || [],
    supportRequests: data[key]?.supportRequests || [],
  };
}

// keep recentBookings as is, if you have a bookings array in data.json
export async function recentBookings(limit = 5) {
  await new Promise((r) => setTimeout(r, 220));
  return data.bookings ? data.bookings.slice(0, limit) : [];
}
