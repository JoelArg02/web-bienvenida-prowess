import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container } from "react-bootstrap";
import ProjectsList from "./ProjectsList";
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

  const handleDownloadEnvFile = (projectName) => {
    const projectEnvVars = envVariables.filter(
      (envVar) => envVar.project === projectName
    );
    const envFileContent = projectEnvVars
      .map((envVar) => `${envVar.key}=${envVar.value}`)
      .join("\n");
    const blob = new Blob([envFileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${projectName}.env`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEnvVariables = (projectName) => {
    const projectEnvVars = envVariables.filter(
      (envVar) => envVar.project === projectName
    );
    const envFileContent = projectEnvVars
      .map((envVar) => `${envVar.key}=${envVar.value}`)
      .join("\n");
    navigator.clipboard
      .writeText(envFileContent)
      .then(() => {
        setMessageType("success");
        setMessage("Variables de entorno copiadas al portapapeles.");
      })
      .catch((error) => {
        console.error(error);
        setMessageType("danger");
        setMessage("Error al copiar las variables de entorno.");
      });
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "800px" }}>
      <h1>Gestión de Credenciales</h1>

      <ProjectsList
        projects={projects}
        envVariables={envVariables}
        handleDownloadEnvFile={handleDownloadEnvFile}
        handleCopyEnvVariables={handleCopyEnvVariables}
      />
    </Container>
  );
};

export default Credentials;
