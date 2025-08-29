import mock from "../mock/bookings.json";

let data = JSON.parse(JSON.stringify(mock));

// Fetch bookings based on user role
export async function getBookings(user, turfs = []) {
  await new Promise((r) => setTimeout(r, 200));
  const key = user?.role?.toLowerCase() || "staff";

  if (key === "manager") {
    const ownerTurfIds = turfs.map((t) => t.id);
    return data.bookings.filter((b) => ownerTurfIds.includes(b.turfId));
  }

  // Admin or others see all bookings
  return data.bookings;
}

// Update booking status
export async function updateBookingStatus(id, status) {
  await new Promise((r) => setTimeout(r, 200));
  const booking = data.bookings.find(b => b.id === id);
  if (booking) {
    booking.status = status;
  }
  return { id, status };
}
