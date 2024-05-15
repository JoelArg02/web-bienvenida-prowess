import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import AlertMessage from "../AlertsMessage/AlertMessage";

const EnvVariableForm = ({ projects, fetchEnvVariables }) => {
  const [project, setProject] = useState("");
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleAddEnvVariable = async (e) => {
    e.preventDefault();
    try {
      // Obtener el ID del proyecto basado en el nombre seleccionado
      const q = query(collection(db, "projects"), where("name", "==", project));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("El proyecto no existe.");
      }

      const projectDoc = querySnapshot.docs[0];
      const projectRef = projectDoc.ref;

      const batch = envVariables.map((envVar) =>
        addDoc(collection(projectRef, "envVariables"), {
          key: envVar.key,
          value: envVar.value,
        })
      );

      await Promise.all(batch);

      setMessageType("success");
      setMessage("Variables de entorno agregadas exitosamente!");
      fetchEnvVariables();
    } catch (error) {
      console.error(error);
      setMessageType("danger");
      setMessage(error.message || "Error al agregar las variables de entorno.");
    }
  };

  const handleEnvVariableChange = (index, field, value) => {
    const newEnvVariables = [...envVariables];
    newEnvVariables[index][field] = value;
    setEnvVariables(newEnvVariables);
  };

  const handleAddRow = () => {
    setEnvVariables([...envVariables, { key: "", value: "" }]);
  };

  return (
    <Form onSubmit={handleAddEnvVariable}>
      <AlertMessage
        message={message}
        messageType={messageType}
        setMessage={setMessage}
      />
      <Form.Group controlId="formProject">
        <Form.Label>Proyecto</Form.Label>
        <Form.Control
          as="select"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          style={{
            marginBottom: "10px",
            backgroundColor: "#f8f9fa",
            color: "#212529",
          }}
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((proj, index) => (
            <option key={index} value={proj.name}>
              {proj.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {project &&
        envVariables.map((envVar, index) => (
          <Form.Group
            key={index}
            controlId={`formEnvVariable-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Form.Control
              type="text"
              value={envVar.key}
              onChange={(e) =>
                handleEnvVariableChange(index, "key", e.target.value)
              }
              placeholder="Ingresa la clave"
              style={{
                marginRight: "10px",
                backgroundColor: "#f8f9fa",
                color: "#212529",
              }}
            />
            <Form.Control
              type="text"
              value={envVar.value}
              onChange={(e) =>
                handleEnvVariableChange(index, "value", e.target.value)
              }
              placeholder="Ingresa el valor"
              style={{
                marginRight: "10px",
                backgroundColor: "#f8f9fa",
                color: "#212529",
              }}
            />
            {index === envVariables.length - 1 ? (
              <Button
                variant="secondary"
                onClick={handleAddRow}
                style={{ backgroundColor: "#6c757d", color: "#f8f9fa" }}
              >
                +
              </Button>
            ) : null}
          </Form.Group>
        ))}

      {project && (
        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#343a40",
            color: "#f8f9fa",
            marginTop: "20px",
          }}
        >
          Agregar Variable de Entorno
        </Button>
      )}
    </Form>
  );
};

export default EnvVariableForm;
