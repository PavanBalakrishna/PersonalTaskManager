import React,{useState} from 'react'
import {Container,Row,Col,Table,Card,Button,ListGroup,ListGroupItem,Form,ProgressBar} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';

export default function ReportsBar({startDateState, endDateState,setstartDateState, setendDateState}) {
    // const [startDateState, setstartDateState] = useState();
    // const [endDateState, setendDateState] = useState();
    // const [goallistState, setgoallistState] = useState();
    // const [showReport, setshowReport] = useState(false);
    

    const ResetDates= ()=>{
        setstartDateState('');
        setendDateState('');
        // setshowReport(false);
    }
    const GetReport = ()=>{
       
        
        // DataService.FetchMasterData(startDateState, endDateState).then((masterData)=>{
        //     setgoallistState(masterData.GoalsList);
        //     setshowReport(true);
        // })

    };

    const SetDates = (dateValue,isStartdate)=>{
        if(isStartdate){
            setstartDateState(dateValue);
            if(endDateState == null || (new Date(endDateState) < new Date(startDateState)))
                    setendDateState(dateValue);
        }else{
            setendDateState(dateValue);
        }
    }

    return (
        <Container>
            <Row>
                <Col sum='12'>
                    <Form.Group>
                        <input className="mr-sm-2"  type='date' name='StartDate' placeholder='Start Date' value={startDateState} onChange={(e)=>{ SetDates(e.target.value ,true)}} />     
                        <input className="mr-sm-2"  type='date' name='EndDate' placeholder='End Date' value={endDateState} onChange={(e)=>{  SetDates(e.target.value,false)}} />
                        
                    </Form.Group>
                                
                </Col>
            </Row>

            {/* <Row>
                <Col sum='12'>
                    <Form.Group>
                        <input className="mr-sm-2"  type='date' name='EndDate' placeholder='End Date' value={endDateState} onChange={(e)=>{  SetDates(e.target.value,false)}} />
                    </Form.Group>
                                
                </Col>
            </Row>
            */}
            <Row>
                <Col sum='12'>
                    <Form.Group>
                        
                         <Button variant='warning' onClick={ResetDates}>Reset</Button>
                    </Form.Group>
                                
                </Col>
            </Row> 
        </Container>
    )
}
