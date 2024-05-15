import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AlertMessage from '../AlertsMessage/AlertMessage';

const EnvVariableForm = ({ projects, fetchEnvVariables }) => {
  const [project, setProject] = useState('');
  const [envKey, setEnvKey] = useState('');
  const [envValue, setEnvValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAddEnvVariable = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'envVariables'), {
        project,
        key: envKey,
        value: envValue,
      });
      setMessageType('success');
      setMessage('Variable de entorno agregada exitosamente!');
      fetchEnvVariables();
    } catch (error) {
      console.error(error);
      setMessageType('danger');
      setMessage('Error al agregar la variable de entorno.');
    }
  };

  return (
    <Form onSubmit={handleAddEnvVariable}>
      <AlertMessage message={message} messageType={messageType} setMessage={setMessage} />
      <Form.Group controlId="formProject">
        <Form.Label>Proyecto</Form.Label>
        <Form.Control
          as="select"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((proj, index) => (
            <option key={index} value={proj.name}>
              {proj.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formEnvKey">
        <Form.Label>Clave</Form.Label>
        <Form.Control
          type="text"
          value={envKey}
          onChange={(e) => setEnvKey(e.target.value)}
          placeholder="Ingresa la clave"
          style={{ marginBottom: '10px' }}
        />
      </Form.Group>
      <Form.Group controlId="formEnvValue">
        <Form.Label>Valor</Form.Label>
        <Form.Control
          type="text"
          value={envValue}
          onChange={(e) => setEnvValue(e.target.value)}
          placeholder="Ingresa el valor"
          style={{ marginBottom: '20px' }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '20px' }}>
        Agregar Variable de Entorno
      </Button>
    </Form>
  );
};

export default EnvVariableForm;
