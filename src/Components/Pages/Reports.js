import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Table,Card,Button,ListGroup,ListGroupItem} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';

export default function Reports() {
    const [masterdataState, setmasterdataState] = useState();
    const [weeklyGoal, setmasterdataState] = useState();
    useEffect(()=>{
        DataService.FetchMasterData().then((masterData)=>{
            setmasterdataState(masterData);
        })

    },[])

    return (
        <Container>
            <Row>
                <Col sum='4'>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>Reports</Card.Title>    
                        <Card.Text>
                            Select a report type
                        </Card.Text>
                        <ListGroup>
                            <ListGroupItem>
                                <Button variant='info'>Weekly Report</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant='info'>Weekly Report</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant='info'>Weekly Report</Button>
                            </ListGroupItem>
                        </ListGroup>
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}
