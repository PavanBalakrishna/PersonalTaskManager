import React from 'react'
import {GoalsData} from '../../data/GoalsData'
import {Container,Row,Col,Table} from 'react-bootstrap';

export default function GoalsList({ClickGoal}) {


    
    return (
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Goal List </h3>
                    </Col>
                </Row>
            <Row>
                <Col>
                <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
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
                            <td>{goal.id}</td>
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
