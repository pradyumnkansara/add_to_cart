import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/MainContext';

export default function Navmenu() {
    let { cart, setcart } = useContext(cartContext)
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid className='justify-content-between'>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                        <Nav
                            className=" my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className='nav-link' to={'/'}>Home</Link>
                            <Link className='nav-link' to={'/product'}>
                                Product
                            </Link>
                            <Link to={'/cart'}>
                                <Button variant="outline-success">Cart({cart.length})</Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
