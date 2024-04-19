import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditPlanModal = ({ show, handleClose, handleSave, plan }) => {
  const [editedPlan, setEditedPlan] = useState({
    plan_name: '',
    plan_description: '',
    id_plans: null
  });

  useEffect(() => {
    if (show && plan) {
      setEditedPlan(plan);
    }
  }, [show, plan]);

  const handleChange = (e) => {
    setEditedPlan({ ...editedPlan, [e.target.name]: e.target.value });
  };

  const saveEditedPlan = () => {
    handleSave(editedPlan);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Plan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del plan"
              name="plan_name"
              value={editedPlan.plan_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción del Plan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              name="plan_description"
              value={editedPlan.plan_description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={saveEditedPlan}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPlanModal;