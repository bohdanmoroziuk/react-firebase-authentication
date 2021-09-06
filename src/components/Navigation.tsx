import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import * as ROUTES from 'constants/routes';

const Navigation: FC = () => (
  <Navbar bg="light" variant="light">
    <Container>
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
        <Nav.Link as={NavLink} to={ROUTES.LANDING} exact>Landing</Nav.Link>
        <Nav.Link as={NavLink} to={ROUTES.HOME}>Home</Nav.Link>
        <Nav.Link as={NavLink} to={ROUTES.ACCOUNT}>Account</Nav.Link>
        <Nav.Link as={NavLink} to={ROUTES.ADMIN}>Admin</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
