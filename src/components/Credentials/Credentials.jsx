import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import AlertMessage from "../AlertsMessage/AlertMessage";
import CredentialForm from "./CredentialForm";
import CredentialsList from "./CredentialsList";
import EnvVariableForm from "./EnvVariableForm";
import ProjectForm from "./ProjectForm";

const Credentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [envVariables, setEnvVariables] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchCredentials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "credentials"));
      setCredentials(querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnvVariables = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "envVariables"));
      setEnvVariables(querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCredentials();
    fetchEnvVariables();
    fetchProjects();
  }, []);

  return (
    <Container style={{ marginTop: "50px", maxWidth: "800px" }}>
      <h1>Gestión de Credenciales</h1>
      <AlertMessage
        message={message}
        messageType={messageType}
        setMessage={setMessage}
      />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestión de Credenciales</Accordion.Header>
          <Accordion.Body>
            <CredentialForm
              fetchCredentials={fetchCredentials}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Gestión de Variables de Entorno</Accordion.Header>
          <Accordion.Body>
            <EnvVariableForm
              projects={projects}
              fetchEnvVariables={fetchEnvVariables}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Proyectos</Accordion.Header>
          <Accordion.Body>
            <ProjectForm
              fetchProjects={fetchProjects}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Credentials;
