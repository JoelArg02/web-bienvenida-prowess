import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AlertMessage from "../AlertsMessage/AlertMessage";

const CredentialForm = ({ fetchCredentials }) => {
  const [fields, setFields] = useState([
    { email: "", password: "", detail: "", link: "" },
  ]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChangeInput = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { email: "", password: "", detail: "", link: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleAddCredentials = async (e) => {
    e.preventDefault();
    try {
      const promises = fields.map(async (field) => {
        await addDoc(collection(db, "credentials"), {
          email: field.email,
          password: field.password,
          detail: field.detail,
          link: field.link,
        });
      });
      await Promise.all(promises);
      setMessageType("success");
      setMessage("Credenciales agregadas exitosamente!");
      fetchCredentials();
    } catch (error) {
      console.error(error);
      setMessageType("danger");
      setMessage("Error al agregar las credenciales.");
    }
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "800px" }}>
      <AlertMessage
        message={message}
        messageType={messageType}
        setMessage={setMessage}
      />
      <Form onSubmit={handleAddCredentials}>
        {fields.map((field, index) => (
          <div
            key={index}
            className="mb-3 p-3"
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Row>
              <Col>
                <Form.Group controlId={`formEmail${index}`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={field.email}
                    onChange={(e) => handleChangeInput(index, e)}
                    placeholder="Ingresa el correo"
                    style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`formPassword${index}`}>
                  <Form.Label>Clave</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={field.password}
                    onChange={(e) => handleChangeInput(index, e)}
                    placeholder="Ingresa la clave"
                    style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId={`formDetail${index}`}>
                  <Form.Label>Detalle</Form.Label>
                  <Form.Control
                    type="text"
                    name="detail"
                    value={field.detail}
                    onChange={(e) => handleChangeInput(index, e)}
                    placeholder="Ingresa el detalle"
                    style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`formLink${index}`}>
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="url"
                    name="link"
                    value={field.link}
                    onChange={(e) => handleChangeInput(index, e)}
                    placeholder="Ingresa el enlace"
                    style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="danger"
              onClick={() => handleRemoveField(index)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                marginTop: "10px",
              }}
            >
              Eliminar Campo
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={handleAddField}
          style={{ backgroundColor: "#6c757d", color: "#fff" }}
        >
          Añadir Campo
        </Button>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#343a40",
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          Guardar Credenciales
        </Button>
      </Form>
    </Container>
  );
};

export default CredentialForm;
