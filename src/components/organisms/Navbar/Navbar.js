import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from './Navbar.module.css';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="https://machinelearningcampuslearn.netlify.app/" className={styles['navbar-brand']}>Machine Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles['navbar-toggler']} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={styles.navlink}>Home</Nav.Link>
            <Nav.Link href="#features" className={styles.navlink}>Features</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
