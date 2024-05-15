import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Container, Accordion } from "react-bootstrap";
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
      setEnvVariables(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
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

  const handleDownloadEnvFile = (projectName, fileName) => {
    const projectEnvVars = envVariables.filter(
      (envVar) => envVar.project === projectName
    );
    const envFileContent = projectEnvVars
      .map((envVar) => `${envVar.key}=${envVar.value}`)
      .join("\n");
    const blob = new Blob([envFileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Eliminar el enlace después de hacer clic
    URL.revokeObjectURL(link.href); // Revocar el objeto URL para liberar memoria
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

  const handleEditEnvVariable = async (id, newKey, newValue) => {
    try {
      const envVarRef = doc(db, "envVariables", id);
      await updateDoc(envVarRef, { key: newKey, value: newValue });
      setMessageType("success");
      setMessage("Variable de entorno actualizada exitosamente.");
      fetchEnvVariables(); // Refrescar la lista de variables
    } catch (error) {
      console.error(error);
      setMessageType("danger");
      setMessage("Error al actualizar la variable de entorno.");
    }
  };

  const handleDeleteEnvVariable = async (id) => {
    try {
      await deleteDoc(doc(db, "envVariables", id));
      setMessageType("success");
      setMessage("Variable de entorno eliminada exitosamente.");
      fetchEnvVariables(); // Refrescar la lista de variables
    } catch (error) {
      console.error(error);
      setMessageType("danger");
      setMessage("Error al eliminar la variable de entorno.");
    }
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "800px" }}>
      <h1>Gestión de Credenciales</h1>
      <AlertMessage
        message={message}
        messageType={messageType}
        setMessage={setMessage}
      />
      <Accordion>
        <ProjectsList
          projects={projects}
          envVariables={envVariables}
          handleDownloadEnvFile={handleDownloadEnvFile}
          handleCopyEnvVariables={handleCopyEnvVariables}
          handleEditEnvVariable={handleEditEnvVariable}
          handleDeleteEnvVariable={handleDeleteEnvVariable}
        />
      </Accordion>
    </Container>
  );
};

export default Credentials;
