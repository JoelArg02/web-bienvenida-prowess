import Head from "next/head";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Bienvenido a Pet Club Administrator APP</title>
      </Head>
      <Container
        style={{ marginTop: "13%" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Row>
          <Col xs={12} md={8} lg={6} className="mx-auto text-center">
            <h1 className="display-3">
              ¡Bienvenido a Pet Club Administrator APP!
            </h1>
            <p className="lead my-4">Modifica los planes de PetClub</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              Inicio
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
