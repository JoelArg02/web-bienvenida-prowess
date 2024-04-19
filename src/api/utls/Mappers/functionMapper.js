export const mapFunctionData = (func) => {
  return {
    id_function: func.id,
    function_name: func.name,
    function_description: func.description || "No description provided",
  };
};

export const mapFunctionList = (functions) => {
  return functions.map(mapFunctionData);
};
