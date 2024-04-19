import axios from "axios";
import rolesFunctionMock from "@/api/utls/mocks/roleFunctionMocks";
import roleFunctionAssociationsMock from "@/api/utls/mocks/roleFunctionAssociation";

export const getFunctions = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return rolesFunctionMock;
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

export const addFunction = async (newFunction) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    newFunction.id = rolesFunctionMock.length + 1;
    rolesFunctionMock.push(newFunction);
    return newFunction;
  } else {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/function/AddFunction`,
        newFunction
      );
      return response.data;
    } catch (error) {
      console.error("Error adding function to role", error);
      throw error;
    }
  }
};

export const editFunction = async (functionId, updatedFunction) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const index = rolesFunctionMock.findIndex((func) => func.id === functionId);
    if (index !== -1) {
      rolesFunctionMock[index] = {
        ...rolesFunctionMock[index],
        ...updatedFunction,
      };
      return rolesFunctionMock[index];
    } else {
      throw new Error("Function not found");
    }
  } else {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}api/function/UpdateFunction/${functionId}`,
        updatedFunction
      );
      return response.data;
    } catch (error) {
      console.error("Error updating function:", error);
      throw error;
    }
  }
};

export const deleteFunction = async (functionId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const index = rolesFunctionMock.findIndex((func) => func.id === functionId);
    if (index !== -1) {
      rolesFunctionMock.splice(index, 1);
      return { status: "Deleted successfully" };
    } else {
      throw new Error("Function not found");
    }
  } else {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/function/DeleteFunction/${functionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting function:", error);
      throw error;
    }
  }
};

export const getFunctionsByRoleId = async (roleId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const filteredFunctions = roleFunctionAssociationsMock.filter(
      (func) => func.roleId === roleId
    );
    return filteredFunctions;
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/role/GetFunctionsByRole/${roleId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching functions for role ${roleId}:`, error);
      throw error;
    }
  }
};

export const getFunctionDetailsById = async (functionId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const functionDetails = rolesFunctionMock.find(
      (func) => func.id === functionId
    );
    if (!functionDetails) {
      throw new Error("Function not found");
    }
    return functionDetails;
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/function/GetFunctionDetails/${functionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching function details:", error);
      throw error;
    }
  }
};

export const addFunctionToRole = async (roleId, functionId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    roleFunctionAssociationsMock.push({ roleId, functionId });
    return { status: "Function added to role successfully" };
  } else {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/role/AddFunctionToRole`,
        { roleId, functionId }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding function to role:", error);
      throw error;
    }
  }
};

export const removeFunctionFromRole = async (roleId, functionId) => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const index = roleFunctionAssociationsMock.findIndex(
      (func) => func.roleId === roleId && func.functionId === functionId
    );
    if (index !== -1) {
      roleFunctionAssociationsMock.splice(index, 1);
      return { status: "Function removed from role successfully" };
    } else {
      console.error("Function not found in role:", roleId, functionId);
      throw new Error("Function not found in role");
    }
  } else {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/role/RemoveFunctionFromRole/${roleId}/${functionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing function from role:", error);
      throw error;
    }
  }
};

export const getAvailableFunctions = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return rolesFunctionMock;
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/function/GetAvailableFunctions`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available functions from API:", error);
      throw error;
    }
  }
};
