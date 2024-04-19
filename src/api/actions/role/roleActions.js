import { getRoles, addRole, updateRole, deleteRole } from "../../services/role/roleServices";
import { mapRoleList, mapRoleData } from "@/api/utls/Mappers/roleMapper";

export const fetchRoles = async (setRoles) => {
  try {
    const rolesData = await getRoles();
    const mappedRoles = mapRoleList(rolesData);
    setRoles(mappedRoles);
  } catch (error) {
    console.error("Failed to fetch and map roles:", error);
  }
};

export const handleAddRole = async (newRole, setRoles) => {
  try {
    const addedRole = await addRole(mapRoleData(newRole));
    await fetchRoles(setRoles);
  } catch (error) {
    console.error("Failed to add role:", error);
  }
};

export const handleEditRole = async (roleToUpdate, setRoles) => {
  try {
    const updatedRole = await updateRole(
      roleToUpdate.id,
      mapRoleData(roleToUpdate)
    );
    await fetchRoles(setRoles);
  } catch (error) {
    console.error("Failed to update role:", error);
  }
};

export const handleDeleteRole = async (roleId, setRoles) => {
  try {
    const deletedStatus = await deleteRole(roleId);
    await fetchRoles(setRoles);
  } catch (error) {
    console.error("Failed to delete role:", error);
  }
};
