import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CredentialsList = ({ credentials }) => {
  return (
    <ListGroup style={{ marginBottom: '20px' }}>
      {credentials.map((credential, index) => (
        <ListGroup.Item key={index}>
          <strong>Cuenta:</strong> {credential.account} <br />
          <strong>Clave:</strong> {credential.password} <br />
          <strong>Uso:</strong> {credential.usage}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CredentialsList;
