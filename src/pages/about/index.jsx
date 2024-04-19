import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-3">Acerca de Mí</h1>
      <p className="text-center mb-4">
        Texto
      </p>
      <Row className="justify-content-center">
        <Col md={6}>
          <ul className="list-unstyled">
            <li className="mb-2">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Quito, Ecuador
            </li>
            <li className="mb-2">
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              +593 2 345 6789
            </li>
            <li className="mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              nombre@dominio.com
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
