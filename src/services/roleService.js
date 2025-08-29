import mockData from "../mock/roles.json";

let rolesData = JSON.parse(JSON.stringify(mockData));

export const roleService = {
  getRoles: () => {
    return Promise.resolve(rolesData.roles);
  },
  getPermissions: () => {
    return Promise.resolve(rolesData.permissions);
  },
  addRole: (role) => {
    const newRole = { ...role, id: Date.now() };
    rolesData.roles.push(newRole);
    return Promise.resolve(newRole);
  },
  updateRole: (id, updated) => {
    const index = rolesData.roles.findIndex((r) => r.id === id);
    if (index !== -1) {
      rolesData.roles[index] = { ...rolesData.roles[index], ...updated };
    }
    return Promise.resolve(rolesData.roles[index]);
  },
  deleteRole: (id) => {
    rolesData.roles = rolesData.roles.filter((r) => r.id !== id);
    return Promise.resolve(true);
  },
};
