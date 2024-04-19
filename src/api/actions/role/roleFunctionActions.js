import {
  getFunctions,
  addFunction,
  editFunction,
  deleteFunction,
  getFunctionsByRoleId,
  addFunctionToRole,
  removeFunctionFromRole,
  getAvailableFunctions,
  getFunctionDetailsById,
} from "../../services/role/roleFunctionServices";
import {
  mapFunctionList,
  mapFunctionData,
} from "@/api/utls/Mappers/functionMapper";

export const fetchFunctions = async (roleId, setFunctions) => {
  try {
    const functionsAssociations = await getFunctionsByRoleId(roleId);
    const functionDetailsPromises = functionsAssociations.map((assoc) =>
      getFunctionDetailsById(assoc.functionId)
    );
    const functionsDetails = await Promise.all(functionDetailsPromises);
    const mappedFunctions = mapFunctionList(functionsDetails);

    setFunctions(mappedFunctions);
  } catch (error) {
    console.error("Failed to fetch and map functions for role:", error);
  }
};

export const fetchAvailableFunctions = async (setAvailableFunctions) => {
  try {
    const availableFunctionsData = await getAvailableFunctions();
    const mappedAvailableFunctions = mapFunctionList(availableFunctionsData);
    setAvailableFunctions(mappedAvailableFunctions);
  } catch (error) {
    console.error("Failed to fetch and map available functions:", error);
  }
};

export const handleAddFunction = async (roleId, functionId, setFunctions) => {
  try {

    await addFunctionToRole(roleId, functionId);
    await fetchFunctions(roleId, setFunctions);
  } catch (error) {
    console.error("Failed to add function to role:", error);
  }
};

export const handleRemoveFunction = async (
  roleId,
  functionId,
  setFunctions
) => {
  try {
    await removeFunctionFromRole(roleId, functionId);
    await fetchFunctions(roleId, setFunctions);
  } catch (error) {
    console.error("Failed to remove function from role:", error);
  }
};

export const handleCreateNewFunction = async (
  newFunction,
  setAvailableFunctions
) => {
  try {
    const formattedFunction = mapFunctionData(newFunction);
    await addFunction(formattedFunction);
    await fetchAvailableFunctions(setAvailableFunctions);
  } catch (error) {
    console.error("Failed to create new function:", error);
  }
};

export const handleEditExistingFunction = async (
  functionId,
  updatedFunction,
  setAvailableFunctions
) => {
  try {
    const formattedFunction = mapFunctionData(updatedFunction);
    await editFunction(functionId, formattedFunction);
    await fetchAvailableFunctions(setAvailableFunctions);
  } catch (error) {
    console.error("Failed to edit function:", error);
  }
};

export const handleDeleteFunction = async (
  functionId,
  setAvailableFunctions
) => {
  try {
    await deleteFunction(functionId);
    await fetchAvailableFunctions(setAvailableFunctions);
  } catch (error) {
    console.error("Failed to delete function:", error);
  }
};
