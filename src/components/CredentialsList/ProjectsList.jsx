import React, { useState } from 'react';
import { Accordion, ListGroup, Button, Form, Col, Row } from 'react-bootstrap';

const ProjectsList = ({ projects, envVariables, handleDownloadEnvFile, handleCopyEnvVariables, handleEditEnvVariable, handleDeleteEnvVariable }) => {
  const [editing, setEditing] = useState({});

  const handleChange = (index, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: value },
    }));
  };

  return (
    <ListGroup style={{ marginBottom: '20px' }}>
      {projects.map((project, projectIndex) => {
        const projectEnvVars = envVariables.filter(envVar => envVar.project === project.name);
        return (
          <Accordion.Item eventKey={projectIndex.toString()} key={projectIndex} style={{ backgroundColor: '#f8f9fa', color: '#212529' }}>
            <Accordion.Header>{project.name}</Accordion.Header>
            <Accordion.Body>
              <div className="mt-2">
                <Button
                  variant="secondary"
                  onClick={() => handleDownloadEnvFile(project.name, '.env.local')}
                  className="mr-2"
                  style={{ backgroundColor: '#6c757d', color: '#f8f9fa', marginRight: '10px' }}
                >
                  Descargar .env.local
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDownloadEnvFile(project.name, '.env.development')}
                  className="mr-2"
                  style={{ backgroundColor: '#6c757d', color: '#f8f9fa', marginRight: '10px' }}
                >
                  Descargar .env.development
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleCopyEnvVariables(project.name)}
                  style={{ backgroundColor: '#6c757d', color: '#f8f9fa' }}
                >
                  Copiar Variables
                </Button>
              </div>
              <div className="mt-2">
                <strong>Variables de Entorno:</strong>
                <ul>
                  {projectEnvVars.map((envVar, index) => (
                    <li key={index}>
                      {editing[index] ? (
                        <Form>
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                value={editing[index].key}
                                onChange={(e) => handleChange(index, 'key', e.target.value)}
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                value={editing[index].value}
                                onChange={(e) => handleChange(index, 'value', e.target.value)}
                              />
                            </Col>
                            <Col>
                              <Button
                                variant="success"
                                onClick={() => {
                                  handleEditEnvVariable(envVar.id, editing[index].key, editing[index].value);
                                  setEditing((prev) => ({ ...prev, [index]: undefined }));
                                }}
                              >
                                Guardar
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => setEditing((prev) => ({ ...prev, [index]: undefined }))}
                                className="ml-2"
                              >
                                Cancelar
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      ) : (
                        <>
                          {envVar.key}={envVar.value}
                          <Button
                            variant="link"
                            onClick={() => setEditing((prev) => ({ ...prev, [index]: envVar }))}
                            style={{ marginLeft: '10px', color: '#007bff', textDecoration: 'none' }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => handleDeleteEnvVariable(envVar.id)}
                            style={{ marginLeft: '10px', color: '#dc3545', textDecoration: 'none' }}
                          >
                            Eliminar
                          </Button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </ListGroup>
  );
};

export default ProjectsList;
