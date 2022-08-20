import React from "react";
import { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../context/UserContext";
const Header = () => {

  const {user, logout} = useContext(UserContext);

  
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>C R E D O - C A R</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {user && user.role === "Manager" ? (
                <NavDropdown title="Manage">
                  <LinkContainer to={`/manage/cars`}>
                    <NavDropdown.Item>Cars</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/manage/rent/cars`}>
                    <NavDropdown.Item>Rented Cars</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                ""
              )}
              {user ? (
                <NavDropdown title={user.email}>
                  <NavDropdown.Item onClick={logout}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login/SignUp</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
