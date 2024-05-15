import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              <FontAwesomeIcon icon={faEnvelope} />{' '}
              <a href="mailto:joel.darguello@gmail.com" className="text-white">
                joel.darguello@gmail.com
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faWhatsapp} />{' '}
              <a href="https://wa.me/0998500498" className="text-white" target="_blank" rel="noopener noreferrer">
                0998500498 - Joel Arguello
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
