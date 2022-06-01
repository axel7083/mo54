import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { BsFillCartFill } from "react-icons/bs";

const Header = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Bus</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/pieces">
                            <Nav.Link>Pieces</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/vehicles">
                            <Nav.Link>Vehicles</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/cart">
                            <Nav.Link><BsFillCartFill/></Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Header;