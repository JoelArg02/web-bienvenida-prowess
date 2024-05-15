import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AlertMessage from '../AlertsMessage/AlertMessage';

const EnvVariableForm = ({ projects, fetchEnvVariables }) => {
  const [fields, setFields] = useState([{ envKey: '', envValue: '' }]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChangeInput = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { envKey: '', envValue: '' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleAddEnvVariables = async (e) => {
    e.preventDefault();
    try {
      const promises = fields.map(async (field) => {
        await addDoc(collection(db, 'envVariables'), {
          project: field.project,
          key: field.envKey,
          value: field.envValue,
        });
      });
      await Promise.all(promises);
      setMessageType('success');
      setMessage('Variables de entorno agregadas exitosamente!');
      fetchEnvVariables();
    } catch (error) {
      console.error(error);
      setMessageType('danger');
      setMessage('Error al agregar las variables de entorno.');
    }
  };

  return (
    <Form onSubmit={handleAddEnvVariables}>
      <AlertMessage message={message} messageType={messageType} setMessage={setMessage} />
      {fields.map((field, index) => (
        <div key={index} className="mb-3">
          <Form.Group controlId={`formEnvKey${index}`}>
            <Form.Label>Clave</Form.Label>
            <Form.Control
              type="text"
              name="envKey"
              value={field.envKey}
              onChange={(e) => handleChangeInput(index, e)}
              placeholder="Ingresa la clave"
            />
          </Form.Group>
          <Form.Group controlId={`formEnvValue${index}`}>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              name="envValue"
              value={field.envValue}
              onChange={(e) => handleChangeInput(index, e)}
              placeholder="Ingresa el valor"
            />
          </Form.Group>
          <Button variant="danger" onClick={() => handleRemoveField(index)}>
            Eliminar Campo
          </Button>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddField}>
        Añadir Campo
      </Button>
      <Button variant="primary" type="submit" style={{ marginLeft: '10px' }}>
        Agregar Variables de Entorno
      </Button>
    </Form>
  );
};

export default EnvVariableForm;
