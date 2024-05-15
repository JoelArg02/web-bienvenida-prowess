import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import AlertMessage from "../../components/AlertsMessage/AlertMessage";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { setUser, setUserDetails } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setMessageType("success");
        setMessage("¡Registro exitoso!");
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setMessageType("success");
        setMessage(
          `¡Inicio de sesión exitoso! Bienvenido ${userCredential.user.email}`
        );
      }

      const token = await userCredential.user.getIdToken();
      const decodedToken = jwtDecode(token);
      setUser(userCredential.user);
      setUserDetails(decodedToken);
      navigate("/credentials");
    } catch (error) {
      setMessageType("danger");
      setMessage(error.message);
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h1>{isRegister ? "Registrarse" : "Iniciar Sesión"}</h1>
      <AlertMessage
        message={message}
        messageType={messageType}
        setMessage={setMessage}
      />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            style={{ marginBottom: "10px" }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            style={{ marginBottom: "20px" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleAuth}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </Button>
        <Button
          variant="link"
          onClick={() => setIsRegister(!isRegister)}
          style={{ width: "100%" }}
        >
          {isRegister ? "Cambiar a Iniciar Sesión" : "Cambiar a Registrarse"}
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;
