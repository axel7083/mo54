import React from 'react'
import {Navbar, Nav, Container, Button, Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { BsFillCartFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {selectCart} from "../store/features/cart/cartSlice";

const Header = () => {

    const navigate = useNavigate();
    const cart = useAppSelector(selectCart);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Bus</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/vehicles">
                            <Nav.Link>Vehicles</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/pieces">
                            <Nav.Link>Pieces</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <Button variant={"info"} onClick={(e) => {
                            navigate("/cart");
                        }}>
                            <BsFillCartFill/>
                            {
                                (cart.length === 0)?(<></>):(<Badge style={{marginLeft: "0.5rem"}} bg="secondary">{cart.length}</Badge>)
                            }

                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Header;