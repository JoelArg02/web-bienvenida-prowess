import { Nav, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import styles from "./Header.module.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  

  const toggleWidth = () => {
    setIsExpanded(!isExpanded);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.text}
    </Tooltip>
  );

  return (
    <div
      className={isExpanded ? styles.headerExpanded : styles.headerCollapsed}
    >
      <Nav
        className="flex-column bg-light vh-100 text-dark"
        style={{ width: "100%" }}
      >
        <div className={`text-center py-3 ${styles.logoContainer}`}>
          <Image
            src="https://via.placeholder.com/80"
            alt="Logo"
            className={
              isExpanded ? styles.logoImageExpanded : styles.logoImageCollapsed
            }
            roundedCircle
            fluid
          />
        </div>

        {currentUser ? (
          <>
            {["Inicio", "Acerca", "Planes","Administración", "Contacto", "Cerrar Sesión"].map((text, index) => (
              <OverlayTrigger
                key={text}
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ text })}
              >
                <Nav.Link
                  href={["/", "/about", "/plans","/admin", "/contact", "/logout"][index]}
                  className={`text-dark ${styles.navLink}`}
                >
                  <FontAwesomeIcon
                    icon={[faHome, faUser, faBriefcase, faEnvelope, faEnvelope, faClose][index]}
                    className={`mx-3 ${
                      isExpanded ? styles.icon : styles.iconCollapsed
                    }`}
                  />
                  <span className={isExpanded ? "" : "d-none"}>{text}</span>
                </Nav.Link>
              </OverlayTrigger>
            ))}
          </>
        ) : (
          <>
            {["Inicio", "Iniciar Sesión", "Acerca", "Contacto"].map(
              (text, index) => (
                <OverlayTrigger
                  key={text}
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ text })}
                >
                  <Nav.Link
                    href={["/", "/login", "/about", "/contact"][index]}
                    className={`text-dark ${styles.navLink}`}
                  >
                    <FontAwesomeIcon
                      icon={[faHome, faUser, faBriefcase, faEnvelope][index]}
                      className={`mx-3 ${
                        isExpanded ? styles.icon : styles.iconCollapsed
                      }`}
                    />
                    <span className={isExpanded ? "" : "d-none"}>{text}</span>
                  </Nav.Link>
                </OverlayTrigger>
              )
            )}
          </>
        )}

        <button
          onClick={toggleWidth}
          className={`btn btn-outline-secondary mt-auto mb-3 ${styles.toggleButton}`}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronLeft : faChevronRight}
            className="fa-lg"
          />
        </button>
      </Nav>
    </div>
  );
};

export default Header;
