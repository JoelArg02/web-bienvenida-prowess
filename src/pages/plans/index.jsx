import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Row, Table } from "react-bootstrap";
import PlanFeatures from "./PlanFeatures";
import {
  fetchPlans,
  handleAddPlan,
  handleToggleActivation,
  handleUpdatePlan,
} from "@/api/actions/plan";
import {
  faEdit,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import AddPlanModal from "../../components/modals/add-plans";
import EditPlanModal from "../../components/modals/edit-plans";

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState({});
  const [token, setToken] = useState("");
  const [openFeatures, setOpenFeatures] = useState({});
  const toggleFeatures = (id) => {
    setOpenFeatures((prev) => {
      const newState = {};
      for (const planId of plans.map((plan) => plan.id_plan)) {
        newState[planId] = planId === id ? !prev[id] : false;
      }
      return newState;
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    fetchPlans(setPlans);
  }, []);

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setShowEditModal(true);
  };

  const toggleActivation = (id, plan_isActive) => {
    handleToggleActivation(id, plan_isActive, token, setPlans);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h1 className="text-center mb-4" style={{ color: "#4F4F4F" }}>
            Planes Disponibles
          </h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Añadir Plan
          </Button>
          <AddPlanModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={(plan) =>
              handleAddPlan(plan, setPlans, setShowModal, token)
            }
          />
          <EditPlanModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            handleSave={(plan) =>
              handleUpdatePlan(plan, setShowEditModal, setPlans, token)
            }
            plan={editingPlan}
          />
          <Table striped bordered hover style={{ border: "1px solid #BDBDBD" }}>
            <thead style={{ backgroundColor: "#E0E0E0", color: "#333" }}>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
                <th>Características</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <React.Fragment key={plan.id_plan}>
                  <tr
                    style={{
                      backgroundColor: plan.plan_isActive
                        ? "#F7F7F7"
                        : "#EBEBEB",
                      color: plan.plan_isActive ? "#212529" : "#737373",
                    }}
                  >
                    <td>{plan.plan_name}</td>
                    <td>{plan.plan_description}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => openEditModal(plan)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </Button>
                      <Button
                        variant={
                          plan.plan_isActive
                            ? "outline-success"
                            : "outline-secondary"
                        }
                        onClick={() => {
                          toggleActivation(plan.id_plan, !plan.plan_isActive);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={plan.plan_isActive ? faToggleOn : faToggleOff}
                        />
                        {plan.plan_isActive ? " Desactivar" : " Activar"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => toggleFeatures(plan.id_plan)}
                        aria-controls="example-collapse-text"
                        aria-expanded={openFeatures[plan.id_plan]}
                      >
                        Ver/Esconder Características
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <Collapse in={openFeatures[plan.id_plan]}>
                        <div id="example-collapse-text">
                          <PlanFeatures features={plan.features || []} />
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
