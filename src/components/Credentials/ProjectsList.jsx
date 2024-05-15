import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const ProjectsList = ({ projects, envVariables, handleDownloadEnvFile, handleCopyEnvVariables }) => {
  return (
    <ListGroup style={{ marginBottom: '20px' }}>
      {projects.map((project, index) => (
        <ListGroup.Item key={index}>
          <strong>Proyecto:</strong> {project.name}
          <div className="mt-2">
            <Button variant="secondary" onClick={() => handleDownloadEnvFile(project.name)} className="mr-2">
              Descargar .env
            </Button>
            <Button variant="secondary" onClick={() => handleCopyEnvVariables(project.name)}>
              Copiar Variables
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ProjectsList;
