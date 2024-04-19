import React from "react";
import { Button, Card } from "react-bootstrap";

const PlanFeatures = ({ features }) => {
  if (!Array.isArray(features) || features.length === 0) {
    return <p>No hay características disponibles para mostrar.</p>;
  }

  return (
    <Card>
      <Card.Body>
        {features.map((feature, index) => (
          <div key={index}>
            <p>
              {feature.name} - Disponible: {feature.isAvailable ? "Sí" : "No"}
            </p>
            <Button onClick={() => console.log("Editando feature:", feature)}>
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => console.log("Eliminando feature:", feature)}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default PlanFeatures;
