import React,{useEffect,useState} from 'react';
import {TasksData} from '../../data/TasksData';
import {Container,Row,Col,Table,Card,ListGroup,ListGroupItem} from 'react-bootstrap';


export default function TaskList({setShowTaskList , subgoal}) {
    const [taskListState, settaskListState] = useState([]);
    useEffect(() => {
        
        settaskListState(TasksData.filter((t)=>{return t.SubGoal_ID === subgoal.id }))
       
    }, [subgoal])
    return (
        <Container>
            <Row>
                <Col>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>{subgoal.Name}</Card.Title>    
                        <Card.Text>
                            {subgoal.Description}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Cycles : {subgoal.Cycles}</ListGroupItem>
                            <ListGroupItem>Total Estimated time : {subgoal.Total}</ListGroupItem>
                            
                        </ListGroup>
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
             <Row>
                <Col>
                <Table striped bordered hover responsive >
                    <thead>
                        <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Source</th>
                        <th>Cycle Time</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskListState.map((task)=>{
                                return <tr key={task.id}>
                                {/* <td>{task.id}</td> */}
                                <td>{task.Name}</td>
                                <td>{task.Description}</td>
                                <td>{task.Source}</td>
                                <td>{task.TimePerCycle}</td>
                                
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
