import React,{useState} from 'react'
import {Container,Row,Col,Table,Card,Button,ListGroup,ListGroupItem,Form,ProgressBar} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';

export default function Reports() {
    const [startDateState, setstartDateState] = useState();
    const [endDateState, setendDateState] = useState();
    const [goallistState, setgoallistState] = useState();
    const [showReport, setshowReport] = useState(false);
    

    const ResetDates= ()=>{
        setstartDateState('');
        setendDateState('');
        setshowReport(false);
    }
    const GetReport = ()=>{
       
        DataService.FetchMasterData(startDateState, endDateState).then((masterData)=>{
            setgoallistState(masterData.GoalsList);
            setshowReport(true);
        })

    };

    return (
        <Container>
            <Row>
                <Col sum='4'>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>Reports</Card.Title>    
                        <Card.Text>
                            Choose a date range for the report
                        </Card.Text>
                        <ListGroup>
                            <ListGroupItem>
                                <Form.Group>
                                    <input type='date' name='StartDate' value={startDateState} onChange={(e)=>{ setstartDateState(e.target.value)}} />
                                    
                                </Form.Group>
                                <Form.Group>
                                <input type='date' name='EndDate' value={endDateState} onChange={(e)=>{  setendDateState(e.target.value)}} />
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant='info' onClick={GetReport}>Report Report</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant='warning' onClick={ResetDates}>Reset</Button>
                            </ListGroupItem>
                        </ListGroup>
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            {
                showReport &&
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
                        goallistState.map((goal)=>{
                            return (<>
                            <tr  key={goal.id} >
                            {/* <td>{goal.id}</td> */}
                            <td>{goal.Name}</td>
                            <td>{goal.Description}</td>
                            <td>{goal.Category}</td>
                            <td>{new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</td>
                            <td>{new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</td>
                            </tr>

                            
                                    <tr >
                                        <td>
                                            <ProgressBar animated now={goal.Percentage} label={goal.Percentage}></ProgressBar>
                                        </td>
                                    </tr>
        
                            
                            
                            </>)
                        })
                    }
                    </tbody>
                </Table>

                </Col>
            </Row>
            }
        </Container>
    )
}
