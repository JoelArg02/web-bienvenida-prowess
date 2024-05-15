import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AlertMessage from '../AlertsMessage/AlertMessage';

const ProjectForm = ({ fetchProjects }) => {
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), { name: project });
      setMessageType('success');
      setMessage('Proyecto agregado exitosamente!');
      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessageType('danger');
      setMessage('Error al agregar el proyecto.');
    }
  };

  return (
    <Form onSubmit={handleAddProject}>
      <AlertMessage message={message} messageType={messageType} setMessage={setMessage} />
      <Form.Group controlId="formNewProject">
        <Form.Label>Nuevo Proyecto</Form.Label>
        <Form.Control
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Ingresa el nombre del proyecto"
          style={{ marginBottom: '20px' }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '20px' }}>
        Agregar Proyecto
      </Button>
    </Form>
  );
};

export default ProjectForm;
