import React,{useEffect,useState} from 'react'
import {SubGoalsData} from '../../data/SubGoalsData'
import {Container,Row,Col,Table,Button,Card,ListGroup,ListGroupItem,Collapse} from 'react-bootstrap';
import TaskList from './TaskList'

export default function SubGoalsList({setShowGoalsList , goal}) {
    const [SubGoalsState, setSubGoalsState] = useState(SubGoalsData);
    const [selectedsubgoal, setselectedsubgoal] = useState({});
    const [ShowTasksState, setShowTasks] = useState(false);
    const ShowTasks=(subgoal)=>{
        setselectedsubgoal(subgoal);
        setShowTasks(!ShowTasksState);
        
    } 

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
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Description</th>
                <th>Total Cycles</th>
                <th>Total Estimated Time</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    SubGoalsState.map((subgoal)=>{
                        return <><tr key={subgoal.id} onClick={() => ShowTasks(subgoal)}  aria-controls="tasklist-show" aria-expanded={ShowTasksState}>
                        {/* <td>{subgoal.id}</td> */}
                        <td>{subgoal.Name}</td>
                        <td>{subgoal.Description}</td>
                        <td>{subgoal.Cycles}</td>
                        <td>{subgoal.Total}</td>
                        
                        </tr>
                       </>
                    })
                }
                </tbody>
            </Table>
            </Col>
        </Row>
        {
            ShowTasksState &&
            <Row>
            <Col sm='12'>
            <Collapse in={ShowTasksState} timeout='5000'>
                    <TaskList id='tasklist-show' subgoal={selectedsubgoal}>
                    </TaskList>
                </Collapse>
            </Col>
            </Row>
        }
    </Container>

    )
}
