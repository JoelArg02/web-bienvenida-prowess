import React, { useEffect, useState } from "react";
import { ListGroup, Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  fetchFunctions,
  handleRemoveFunction,
  fetchAvailableFunctions,
  handleAddFunction,
  handleEditExistingFunction
} from "@/api/actions/role/roleFunctionActions";

const RoleFunctions = ({ roleId }) => {
  const [functions, setFunctions] = useState([]);
  const [availableFunctions, setAvailableFunctions] = useState([]);

  useEffect(() => {
    fetchFunctions(roleId, setFunctions);
    fetchAvailableFunctions(setAvailableFunctions);
  }, [roleId]);

  return (
    <ListGroup variant="flush">
      {functions.map((func) => (
        <ListGroup.Item key={func.id_function}>
          {func.function_name}
          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              handleRemoveFunction(roleId, func.id_function, setFunctions)
            }
            className="float-right"
          >
            Quitar
          </Button>
          <Button
            variant="info"
            size="sm"
            className="float-right mr-2"
            onClick={() =>
              handleEditExistingFunction(
                func.id_function,
                func,
                setAvailableFunctions
              )
            }
          >
            Editar
          </Button>
        </ListGroup.Item>
      ))}
      <DropdownButton id="dropdown-basic-button" title="Añadir Función">
        {availableFunctions.map((func) => (
          <Dropdown.Item
            key={func.id_function}
            onClick={() =>
              handleAddFunction(roleId, func.id_function, setFunctions)
            }
          >
            {func.function_name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </ListGroup>
  );
};

export default RoleFunctions;
