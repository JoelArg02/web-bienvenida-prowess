import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PlanForm from "./components/PlanForm";

const AddPlanModal = ({ show, handleClose, handleSave }) => {
  const [plan, setPlan] = useState({
    name: "",
    description: "",
    monthlyPrice: "",
    annualPrice: "",
    isactive: true,
    image: "https://via.placeholder.com/150",
    features: [],
  });

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const savePlan = () => {
    handleSave(plan);
    setPlan({
      name: "",
      description: "",
      monthlyPrice: "",
      annualPrice: "",
      isactive: true,
      image: "https://via.placeholder.com/150",
      features: [],
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir un nuevo plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <PlanForm plan={plan} handleChange={handleChange} setPlan={setPlan} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={savePlan}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPlanModal;
