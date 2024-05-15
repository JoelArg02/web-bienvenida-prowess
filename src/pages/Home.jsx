import React from "react";
import { Container,Card, Accordion, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <h1>Bienvenido a Prowess Agricola</h1>
      <p>Por favor, lee detenidamente.</p>

      <Accordion defaultActiveKey="0" className="mt-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Iniciar Proyecto en ReactJS</Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                <Card.Title>1. Instalar Node.js</Card.Title>
                <Card.Text>
                  Node.js es un entorno de ejecución para JavaScript que te
                  permite ejecutar código JavaScript fuera de un navegador.
                  Primero, necesitas instalar Node.js en tu computadora. Puedes
                  descargarlo e instalarlo desde el siguiente enlace:
                </Card.Text>
                <Card.Link
                  href="https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi"
                  target="_blank"
                >
                  Descargar Node.js
                </Card.Link>
                <Card.Text className="mt-3">
                  Sigue las instrucciones del instalador para completar la
                  instalación.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>2. Instalar Yarn</Card.Title>
                <Card.Text>
                  Yarn es un gestor de paquetes que facilita la instalación y
                  gestión de dependencias en tus proyectos. Para instalar Yarn
                  de manera global en tu sistema, abre una terminal (o símbolo
                  del sistema en Windows) y ejecuta el siguiente comando:
                </Card.Text>
                <pre>
                  <code>npm install --global yarn</code>
                </pre>
                <CopyToClipboard text="npm install --global yarn">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text>
                  En caso de que yarn -v unicamente funcione desde el CMD donde
                  instalaste deberas abrir el powerShell de windows como
                  adminsitrador y pegar esto:
                </Card.Text>
                <pre>
                  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope
                  CurrentUser
                </pre>

                <CopyToClipboard text="Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>3. Configurar Variables de Entorno</Card.Title>
                <Card.Text>
                  Un archivo <code>.env</code> se usa para definir variables de
                  entorno que tu aplicación necesita. Estas variables pueden
                  incluir claves API, URLs de bases de datos, y otros valores
                  sensibles. Coloca el archivo <code>.env</code> en la raíz de
                  tu proyecto. Un ejemplo de archivo <code>.env</code> podría
                  verse así:
                </Card.Text>
                <pre>
                  <code>
                    REACT_APP_API_KEY=your_api_key{"\n"}
                    REACT_APP_AUTH_DOMAIN=your_auth_domain{"\n"}
                    REACT_APP_PROJECT_ID=your_project_id
                  </code>
                </pre>
                <CopyToClipboard text="REACT_APP_API_KEY=your_api_key\nREACT_APP_AUTH_DOMAIN=your_auth_domain\nREACT_APP_PROJECT_ID=your_project_id">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Estas variables estarán disponibles en tu aplicación React
                  mediante <code>process.env.REACT_APP_VARIABLE_NAME</code>.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>4. Instalar Dependencias</Card.Title>
                <Card.Text>
                  Navega a la carpeta de tu proyecto usando la terminal y
                  ejecuta el siguiente comando para instalar todas las
                  dependencias necesarias:
                </Card.Text>
                <pre>
                  <code>yarn install</code>
                </pre>
                <CopyToClipboard text="yarn install">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>5. Iniciar la Aplicación</Card.Title>
                <Card.Text>
                  Para iniciar tu aplicación de React, ejecuta el siguiente
                  comando en la terminal:
                </Card.Text>
                <pre>
                  <code>yarn start</code>
                </pre>
                <CopyToClipboard text="yarn start">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Esto iniciará el servidor de desarrollo y abrirá tu aplicación
                  en tu navegador en <code>http://localhost:3000</code>.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>6. Construir para Producción</Card.Title>
                <Card.Text>
                  Cuando estés listo para desplegar tu aplicación de React, usa
                  el siguiente comando para crear una versión optimizada:
                </Card.Text>
                <pre>
                  <code>yarn build</code>
                </pre>
                <CopyToClipboard text="yarn build">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Esto crea una carpeta <code>build</code> con todos los
                  archivos optimizados para producción. Puedes desplegar estos
                  archivos en cualquier servidor web.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>7. Ponerlo en linea</Card.Title>
                <Card.Text>
                  Una vez que se haya realizado el build, la carpeta que generá
                  se podrá subir al web hosting del proyecto en la carpeta de
                  Agricola, una vez realizado eso el proyecto estará en liena.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Iniciar Proyecto en React Native con Expo
          </Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                <Card.Title>1. Instalar Node.js</Card.Title>
                <Card.Text>
                  Node.js es un entorno de ejecución para JavaScript que te
                  permite ejecutar código JavaScript fuera de un navegador.
                  Primero, necesitas instalar Node.js en tu computadora. Puedes
                  descargarlo e instalarlo desde el siguiente enlace:
                </Card.Text>
                <Card.Link
                  href="https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi"
                  target="_blank"
                >
                  Descargar Node.js
                </Card.Link>
                <Card.Text className="mt-3">
                  Sigue las instrucciones del instalador para completar la
                  instalación.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>2. Instalar Expo CLI</Card.Title>
                <Card.Text>
                  Expo CLI es una herramienta para crear y gestionar proyectos
                  de React Native de manera fácil. Para instalar Expo CLI de
                  manera global en tu sistema, abre una terminal y ejecuta el
                  siguiente comando:
                </Card.Text>
                <pre>
                  <code>npm install -g expo-cli</code>
                </pre>
                <CopyToClipboard text="npm install -g expo-cli">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>3. Configurar Variables de Entorno</Card.Title>
                <Card.Text>
                  Un archivo <code>.env</code> se usa para definir variables de
                  entorno que tu aplicación necesita. Estas variables pueden
                  incluir claves API, URLs de bases de datos, y otros valores
                  sensibles. Coloca el archivo <code>.env</code> en la raíz de
                  tu proyecto. Un ejemplo de archivo <code>.env</code> podría
                  verse así:
                </Card.Text>
                <pre>
                  <code>
                    EXPO_API_KEY=your_api_key{"\n"}
                    EXPO_AUTH_DOMAIN=your_auth_domain{"\n"}
                    EXPO_PROJECT_ID=your_project_id
                  </code>
                </pre>
                <CopyToClipboard text="EXPO_API_KEY=your_api_key\nEXPO_AUTH_DOMAIN=your_auth_domain\nEXPO_PROJECT_ID=your_project_id">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Estas variables estarán disponibles en tu aplicación Expo
                  mediante <code>process.env.EXPO_VARIABLE_NAME</code>.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>4. Instalar Dependencias</Card.Title>
                <Card.Text>
                  Navega a la carpeta de tu proyecto usando la terminal y
                  ejecuta el siguiente comando para instalar todas las
                  dependencias necesarias:
                </Card.Text>
                <pre>
                  <code>yarn install</code>
                </pre>
                <CopyToClipboard text="yarn install">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>5. Iniciar la Aplicación</Card.Title>
                <Card.Text>
                  Para iniciar tu aplicación de Expo, ejecuta el siguiente
                  comando en la terminal:
                </Card.Text>
                <pre>
                  <code>expo start</code>
                </pre>
                <CopyToClipboard text="expo start">
                  <Button variant="outline-primary">Copiar</Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Esto iniciará el servidor de desarrollo y abrirá tu aplicación
                  en Expo Go en tu dispositivo o en un emulador.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>6. Construir para Producción</Card.Title>
                <Card.Text>
                  Cuando estés listo para desplegar tu aplicación de React
                  Native con Expo, usa el siguiente comando para crear una
                  versión optimizada:
                </Card.Text>
                <pre>
                  <code>expo build:android</code>
                  {"\n"}o{"\n"}
                  <code>expo build:ios</code>
                </pre>
                <CopyToClipboard text="expo build:android">
                  <Button variant="outline-primary">
                    Copiar Comando Android
                  </Button>
                </CopyToClipboard>
                <CopyToClipboard text="expo build:ios">
                  <Button variant="outline-primary" className="ml-2">
                    Copiar Comando iOS
                  </Button>
                </CopyToClipboard>
                <Card.Text className="mt-3">
                  Esto generará los archivos necesarios para desplegar tu
                  aplicación en las respectivas tiendas de aplicaciones.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Home;
