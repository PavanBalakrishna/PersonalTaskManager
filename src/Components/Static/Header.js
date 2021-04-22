import React from 'react'
import {Navbar,Nav,Container,Row,Col} from 'react-bootstrap';

import {Link}  from "react-router-dom";

export default function Header() {
  

    return (
        <Container fluid>
            <Row>
            <Col>
        <Navbar collapseOnSelect expand="lg" sticky="top" >
            <Navbar.Brand href="/">Personal Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">List</Nav.Link> 
                    <Nav.Link as={Link} to="/AddTask">Add Task</Nav.Link>  
                     <Nav.Link as={Link} to="/Reports">Reports</Nav.Link> 
                </Nav>
              
            </Navbar.Collapse>
</Navbar>
</Col>
</Row>

</Container>
    )
}
