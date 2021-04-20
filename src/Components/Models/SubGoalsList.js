import React,{useEffect,useState} from 'react'
import {SubGoalsData} from '../../data/SubGoalsData'
import {Container,Row,Col,Table,Button,Card,ListGroup,ListGroupItem} from 'react-bootstrap';

export default function SubGoalsList({setShowGoalsList , goal}) {
    const [SubGoalsState, setSubGoalsState] = useState(SubGoalsData)
    useEffect(() => {
        setSubGoalsState(()=> SubGoalsData.filter((sg)=>{return sg.Goal_ID===goal.id}))
    }, [goal])
    
    const BackToGoalList= ()=>{
        setShowGoalsList(true);
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>{goal.Name}</Card.Title>    
                        <Card.Text>
                            {goal.Description}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Category : {goal.Category}</ListGroupItem>
                            <ListGroupItem>Start date : {new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</ListGroupItem>
                            <ListGroupItem>End date : {new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</ListGroupItem>
                        </ListGroup>
                        <Button variant="danger" onClick={BackToGoalList} >Go back</Button>
                    </Card.Body>
                </Card>
        </Col>
        </Row>
        <Row>
            <Col>
            <Table striped bordered hover >
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Total Cycles</th>
                <th>Total Estimated Time</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    SubGoalsState.map((subgoal)=>{
                        return <tr key={subgoal.id}>
                        <td>{subgoal.id}</td>
                        <td>{subgoal.Name}</td>
                        <td>{subgoal.Description}</td>
                        <td>{subgoal.Cycles}</td>
                        <td>{subgoal.Total}</td>
                        <td></td>
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
