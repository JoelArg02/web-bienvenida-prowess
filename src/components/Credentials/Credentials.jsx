import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container } from "react-bootstrap";
import CredentialForm from "./CredentialForm";
import EnvVariableForm from "./EnvVariableForm";
import ProjectForm from "./ProjectForm";
import CredentialsList from "./CredentialsList";
import AlertMessage from "../AlertsMessage/AlertMessage";

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
      <CredentialForm
        fetchCredentials={fetchCredentials}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Lista de Credenciales</h2>
      <CredentialsList credentials={credentials} />
      <h2>Gestión de Variables de Entorno</h2>
      <EnvVariableForm
        projects={projects}
        fetchEnvVariables={fetchEnvVariables}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Proyectos</h2>
      <ProjectForm
        fetchProjects={fetchProjects}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </Container>
  );
};

export default Credentials;
