import React from 'react'
import {GoalsData} from '../../data/GoalsData'
import {Container,Row,Col,Table,Card} from 'react-bootstrap';

export default function GoalsList({ClickGoal}) {


    
    return (
            <Container fluid>
                <Row>
                    <Col>
                    <Card>
                    
                    <Card.Body>
                    <Card.Title>Goals</Card.Title>    
                        
                    </Card.Body>
                </Card>
                    </Col>
                </Row>
            <Row>
                <Col>
                <Table striped bordered responsive hover>
                <thead>
                    <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        GoalsData.map((goal)=>{
                            return <tr key={goal.id} onClick={()=> {ClickGoal(goal)}}>
                            {/* <td>{goal.id}</td> */}
                            <td>{goal.Name}</td>
                            <td>{goal.Description}</td>
                            <td>{goal.Category}</td>
                            <td>{new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</td>
                            <td>{new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</td>
                            </tr>
                        
                        })
                    }
                    </tbody>
                </Table>

                </Col>
            </Row>
        </Container>
            )
       
    
}
