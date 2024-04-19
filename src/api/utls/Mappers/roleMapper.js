export const mapRoleData = (role) => {
  return {
    id: role.id,
    name: role.name,
    description: role.description || 'No description available',
  };
};

export const mapRoleList = (roles) => {
  return roles.map(mapRoleData);
};
