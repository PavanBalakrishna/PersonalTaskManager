import React,{useState} from 'react'
import {Navbar,Nav,Container,Row,Col,Form,Button} from 'react-bootstrap';
import {Link}  from "react-router-dom";
import ReportsBar from '../Models/ReportsBar';
import Summary from '../Models/Summary';


export default function Header({startDateState, endDateState,setstartDateState, setendDateState, setrerenderForm}) {
    const [showReport, setshowReport] = useState(false)

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
                    <Nav.Link as={Link} to="/AddData">Add Data</Nav.Link>  
                     
                </Nav>
                <Nav>
                <Form inline>
                    <ReportsBar startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} setrerenderForm={setrerenderForm} ></ReportsBar>
                 </Form>
                </Nav>  
                <Nav>
                    <Button variant='success' onClick={(e)=>{setshowReport(true)}}>Show Report</Button>
                    <Summary  showReport={showReport} setshowReport={setshowReport}/>
                </Nav>
            </Navbar.Collapse>
            
</Navbar>
</Col>
</Row>

</Container>
    )
}
