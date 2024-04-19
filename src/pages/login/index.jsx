import { authLogin } from "@/api/services/auth";
import { useAuth } from "@/context/authContext";
import router from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await authLogin(email, password);
      if (token) {
        login(token);
      } else {
        setError("No token received");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        "Error de inicio de sesion. Por favor verifique sus credenciales e inténtelo nuevamente."
      );
    }
  };
  
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "250px" }}
    >
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                isInvalid={!!error}
                required
              />
              <Form.Text className="text-muted">
                Nunca compartiremos su correo electrónico con nadie más.{" "}
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Por favor proporcione un correo electrónico válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                isInvalid={!!error}
                required
              />
              <Form.Control.Feedback type="invalid">
                La contraseña es necesaría
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
