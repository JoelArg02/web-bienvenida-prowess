import React from "react";
import { Row } from "react-bootstrap";
import FormInput from "./FormInput";
import FeaturesForm from "./FeaturesForm";

const PlanForm = ({ plan, handleChange, setPlan }) => {
  const inputs = [
    {
      label: "Nombre del Plan",
      type: "text",
      placeholder: "Nombre del plan",
      name: "name",
    },
    {
      label: "Descripción del Plan",
      type: "text",
      placeholder: "Descripción",
      name: "description",
    },
    {
      label: "Precio del Plan Mensual",
      type: "number",
      placeholder: "Precio",
      name: "monthlyPrice",
    },
    {
      label: "Precio del Plan Anual",
      type: "number",
      placeholder: "Precio",
      name: "annualPrice",
    },
  ];

  return (
    <Row>
      {inputs.map((input) => (
        <FormInput
          key={input.name}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          name={input.name}
          value={plan[input.name]}
          onChange={handleChange}
        />
      ))}
      <FeaturesForm features={plan.features} setPlan={setPlan} plan={plan} />
    </Row>
  );
};

export default PlanForm;
