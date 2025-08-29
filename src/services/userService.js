import mockData from "../mock/data.json";

// Keep an in-memory copy so we can modify it
let users = JSON.parse(JSON.stringify(mockData.users));

export async function listUsers() {
  await new Promise((r) => setTimeout(r, 150));
  return users;
}

export async function getUserById(id) {
  await new Promise((r) => setTimeout(r, 100));
  return users.find((u) => u.id === id);
}

export async function createUser(newUser) {
  await new Promise((r) => setTimeout(r, 100));
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = { id, status: "Active", lastLogin: null, ...newUser };
  users.push(user);
  return user;
}

export async function updateUser(id, updates) {
  await new Promise((r) => setTimeout(r, 100));
  let userToUpdate;
  users = users.map((u) => {
    if (u.id === id) {
      userToUpdate = { ...u, ...updates };
      return userToUpdate;
    }
    return u;
  });
  return userToUpdate;
}

export async function resetPassword(id) {
  await new Promise((r) => setTimeout(r, 100));
  const user = users.find(u => u.id === id);
  if (user) {
    // In a real app, you'd send a reset email. Here we just confirm.
    console.log(`Password reset for ${user.email}`);
  }
  return { id, message: `Password reset initiated for user ${id}.` };
}

export async function getActivityLogs(id) {
  await new Promise((r) => setTimeout(r, 100));
  return [
    { action: "login", timestamp: "2025-08-20 09:15" },
    { action: "updated profile", timestamp: "2025-08-21 14:30" },
    { action: "changed password", timestamp: "2025-08-23 17:45" },
  ];
}
