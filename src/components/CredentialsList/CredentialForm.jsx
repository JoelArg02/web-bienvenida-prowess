import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AlertMessage from '../AlertsMessage/AlertMessage';

const CredentialForm = ({ fetchCredentials }) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [usage, setUsage] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAddCredential = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'credentials'), { account, password, usage });
      setMessageType('success');
      setMessage('Credencial agregada exitosamente!');
      fetchCredentials();
    } catch (error) {
      console.error(error);
      setMessageType('danger');
      setMessage('Error al agregar la credencial.');
    }
  };

  return (
    <Form onSubmit={handleAddCredential}>
      <AlertMessage message={message} messageType={messageType} setMessage={setMessage} />
      <Form.Group controlId="formAccount">
        <Form.Label>Cuenta</Form.Label>
        <Form.Control
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Ingresa la cuenta"
          style={{ marginBottom: '10px' }}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Clave</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa la clave"
          style={{ marginBottom: '10px' }}
        />
      </Form.Group>
      <Form.Group controlId="formUsage">
        <Form.Label>Uso</Form.Label>
        <Form.Control
          type="text"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          placeholder="Ingresa el uso"
          style={{ marginBottom: '20px' }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '20px' }}>
        Agregar Credencial
      </Button>
    </Form>
  );
};

export default CredentialForm;
