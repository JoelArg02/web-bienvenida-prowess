import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { AddRoleModal, EditRoleModal, AddFunctionModal } from "./RoleModals";
import {
  fetchRoles,
  handleAddRole,
  handleEditRole,
  handleDeleteRole,
} from "@/api/actions/role/roleActions";
import { handleCreateNewFunction, setAvailableFunctions } from "@/api/actions/role/roleFunctionActions";
import RoleFunctions from "./RoleFunctions";

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddModalFunction, setShowAddModalFunction] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles(setRoles);
  }, []);

  return (
    <Container className="my-5">
      <Row className="mb-3">
        <Col>
          <h2>Gestión de Roles</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Añadir Nuevo Rol
          </Button>
        </Col>
        <Col>
          <h2>Funciones</h2>
          <Button
            variant="primary"
            onClick={() => setShowAddModalFunction(true)}
          >
            Añadir Nueva Function
          </Button>
        </Col>
      </Row>
      <Row>
        {roles.map((role) => (
          <Col md={4} key={role.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{role.name}</Card.Title>
                <Card.Text>
                  <RoleFunctions roleId={role.id} />
                </Card.Text>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setSelectedRole(role);
                    setShowEditModal(true);
                  }}
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteRole(role.id, setRoles)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <AddRoleModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={(newRole) => handleAddRole(newRole, setRoles)}
      />
      <EditRoleModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        initialRole={selectedRole}
        onSubmit={(updatedRole) => handleEditRole(updatedRole, setRoles)}
      />

      <AddFunctionModal
        show={showAddModalFunction}
        onHide={() => setShowAddModalFunction(false)}
        onSubmit={(newFunction) =>
          handleCreateNewFunction(newFunction, setAvailableFunctions)
        }
      />
    </Container>
  );
};

export default RolesList;
