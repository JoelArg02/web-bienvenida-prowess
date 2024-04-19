import axios from "axios";
import rolesMock from "@/api/utls/mocks/roleMocks";

export const getRoles = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return rolesMock;
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/Role/GetRoles`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  }
};

export const addRole = async (newRole) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    newRole.id = rolesMock.length + 1;
    rolesMock.push(newRole);
    return newRole;
  } else {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/Role/AddRole`,
        newRole
      );
      return response.data;
    } catch (error) {
      console.error("Error adding role:", error);
      throw error;
    }
  }
};

export const updateRole = async (roleId, updatedRole) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const roleIndex = rolesMock.findIndex((role) => role.id === roleId);
    rolesMock[roleIndex] = { ...rolesMock[roleIndex], ...updatedRole };
    return rolesMock[roleIndex];
  } else {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/Role/UpdateRole/${roleId}`,
        updatedRole
      );
      return response.data;
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  }
};

export const deleteRole = async (roleId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const index = rolesMock.findIndex((role) => role.id === roleId);
    rolesMock.splice(index, 1);
    return { status: "Deleted successfully" };
  } else {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/Role/DeleteRole/${roleId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  }
};
