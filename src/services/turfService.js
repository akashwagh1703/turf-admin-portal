import mock from "../mock/turfs.json";

let data = JSON.parse(JSON.stringify(mock));

// Get all turfs
export async function getTurfs(user) {
  await new Promise((r) => setTimeout(r, 200));
  const key = user?.role?.toLowerCase() || "staff";

  // If user is manager, return only their turfs
  if (key === "manager") {
    return data.turfs.filter((turf) => turf.ownerId === user.id);
  }

  // Otherwise (admin or others) return all turfs
  return data.turfs;
}

// Add a new turf
export async function addTurf(newTurf) {
  await new Promise((r) => setTimeout(r, 200));
  const turfWithId = { ...newTurf, id: Date.now() };
  data.turfs.push(turfWithId);
  return turfWithId;
}

// Update an existing turf by ID
export async function updateTurf(id, updatedTurf) {
  await new Promise((r) => setTimeout(r, 200));
  const index = data.turfs.findIndex((t) => t.id === id);
  if (index !== -1) {
    data.turfs[index] = { ...data.turfs[index], ...updatedTurf, id };
    return data.turfs[index];
  }
  return null;
}

// Toggle turf status (active/inactive)
export async function toggleStatus(id, status) {
  await new Promise((r) => setTimeout(r, 200));
  const turf = data.turfs.find((t) => t.id === id);
  if (turf) {
    turf.status = status;
    return { id, status };
  }
  return null;
}

// Approve or disapprove turf
export async function approveTurf(id, approved) {
  await new Promise((r) => setTimeout(r, 200));
  const turf = data.turfs.find((t) => t.id === id);
  if (turf) {
    turf.approved = approved;
    return { id, approved };
  }
  return null;
}
