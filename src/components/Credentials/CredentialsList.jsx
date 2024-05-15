import React, { Component } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

class CredentialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: []
    };
  }

  componentDidMount() {
    this.fetchCredentials();
  }

  async fetchCredentials() {
    try {
      const querySnapshot = await getDocs(collection(db, "credentials"));
      const credentialsData = querySnapshot.docs.map(doc => doc.data());
      this.setState({ credentials: credentialsData });
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }

  render() {
    const { credentials } = this.state;

    return (
      <Container>
        <h2 style={styles.header}>User Credentials</h2>
        <ListGroup style={styles.list}>
          {credentials.map((credential, index) => (
            <ListGroup.Item key={index} style={styles.item}>
              <div style={styles.info}>
                <strong>Cuenta:</strong> {credential.email} <br />
                <strong>Clave:</strong> {credential.password} <br />
                <strong>Uso:</strong> {credential.detail} <br />
                <a href={credential.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  item: {
    background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  itemHover: {
    transform: 'scale(1.02)',
  },
  info: {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '1rem',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    marginTop: '10px',
    display: 'inline-block',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

export default CredentialsList;
