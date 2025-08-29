import mockData from '../mock/data.json';

const KEY = 'turf.admin.session';
const USERS = mockData.users;

export async function login(email, password) {
  // Simulate API
  await new Promise(r => setTimeout(r, 400));
  
  const found = USERS.find(u => u.email === email && u.password === password);
  
  if (!found) throw new Error('Invalid credentials');
  
  const token = btoa(`${found.email}:${Date.now()}`);
  const session = { 
    token, 
    user: { 
      id: found.id, 
      name: found.name, 
      email: found.email, 
      role: found.role 
    } 
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function logout() {
  localStorage.removeItem(KEY);
}
