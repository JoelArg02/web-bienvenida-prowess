import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AddRoleModal = ({ show, onHide, onSubmit }) => {
  const [roleName, setRoleName] = useState("");

  const handleSubmit = () => {
    onSubmit({ name: roleName });
    setRoleName("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Nuevo Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Introduce el nombre del rol"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const EditRoleModal = ({ show, onHide, onSubmit, initialRole }) => {
  const [roleName, setRoleName] = useState(initialRole?.name || "");

  useEffect(() => {
    if (show) {
      setRoleName(initialRole?.name || "");
    }
  }, [initialRole, show]);

  const handleSubmit = () => {
    onSubmit({ ...initialRole, name: roleName });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Introduce el nuevo nombre del rol"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const AddFunctionModal = ({ show, onHide, onSubmit }) => {
  const [functionName, setFunctionName] = useState("");

  const handleSubmit = () => {
    onSubmit({ name: functionName });
    setFunctionName("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Nuevo Funcion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la funcion</Form.Label>
            <Form.Control
              type="text"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              placeholder="Introduce de la funcion"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRoleModal;