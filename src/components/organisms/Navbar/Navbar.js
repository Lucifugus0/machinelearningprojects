import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles['navbar-brand']}>
          Machine Learning
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles['navbar-toggler']} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Upload</Nav.Link>
            <Nav.Link as={Link} to="/capture">Capture</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
