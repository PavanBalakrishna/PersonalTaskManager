import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col,Table,Card} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';
import CustomProgressBar from '../CustomFIelds/CustomProgressBar';
import {GoalsContext} from '../../CustomContextProvider'




export default function GoalsList({ClickGoal, startDateState, endDateState,setstartDateState, setendDateState}) {

    const GetGoalProgress = ()=>{
        DataService.FetchMasterData(startDateState, endDateState, setstartDateState, setendDateState).then((masterdata)=>{
            setgoallistState(masterdata.GoalsList);
            setshowProgressBar(true);
        });
        
    }

    const [goallistState, setgoallistState] = useState(useContext(GoalsContext));
    const [showProgressBar, setshowProgressBar] = useState(false);
    

    useEffect(()=>{
        GetGoalProgress();
    },[startDateState,endDateState ])
    
    
    
    
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
                        goallistState.map((goal)=>{

                            return (<>
                            <tr className='click-tr' key={goal.id} onClick={()=> {ClickGoal(goal)}}>
                            {/* <td>{goal.id}</td> */}
                            <td>{goal.Name}</td>
                            <td>{goal.Description}</td>
                            <td>{goal.Category}</td>
                            <td>{new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</td>
                            <td>{new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</td>
                            </tr>
                            {
                                    showProgressBar &&
                            
                                    <tr className='click-tr'>
                                        <td>
                                            <CustomProgressBar goal={goal}></CustomProgressBar>
                                        </td>
                                    </tr>
        
                            }
                            
                            </>)
                        })
                    }
                    </tbody>
                </Table>

                </Col>
            </Row>
        </Container>
            )
       
    
}
