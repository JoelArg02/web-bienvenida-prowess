import React from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";

const FeaturesForm = ({ features, setPlan, plan }) => {
  const addFeature = () => {
    const newFeature = { name: "", isAvailable: true, planId: plan.id }; // Asumiendo que plan tiene un 'id'.
    setPlan((prevPlan) => ({
      ...prevPlan,
      features: [...prevPlan.features, newFeature],
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setPlan((prevPlan) => {
      const newFeatures = prevPlan.features.map((feature, i) => {
        if (i === index) {
          return { ...feature, [field]: value };
        }
        return feature;
      });
      return { ...prevPlan, features: newFeatures };
    });
  };

  const removeFeature = (index) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      features: prevPlan.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {features.map((feature, index) => (
        <Card className="mb-3" key={index}>
          <Card.Body>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la característica"
                  value={feature.name}
                  onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Disponible"
                  checked={feature.isAvailable}
                  onChange={(e) => handleFeatureChange(index, "isAvailable", e.target.checked)}
                />
              </Col>
              <Col xs={3}>
                <Button variant="danger" onClick={() => removeFeature(index)}>
                  Eliminar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Row className="mt-4">
        <Col>
          <Button variant="success" onClick={addFeature}>
            Añadir Característica
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FeaturesForm;
