// src/components/Credentials/Credentials.js
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const Credentials = () => {
  const [companyName, setCompanyName] = useState('');
  const [credentials, setCredentials] = useState([]);

  const fetchCredentials = async () => {
    const querySnapshot = await getDocs(collection(db, 'credentials'));
    setCredentials(querySnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleAddCredential = async () => {
    try {
      await addDoc(collection(db, 'credentials'), {
        companyName,
      });
      fetchCredentials();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Manage Credentials</h1>
      <Form>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddCredential}>
          Add Credential
        </Button>
      </Form>
      <ListGroup>
        {credentials.map((credential, index) => (
          <ListGroup.Item key={index}>{credential.companyName}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Credentials;
