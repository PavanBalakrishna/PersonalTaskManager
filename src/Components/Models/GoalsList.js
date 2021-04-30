import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col,Table,Card,Button} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';
import CustomProgressBar from '../CustomFIelds/CustomProgressBar';
import UpdateData from './UpdateData';
import {ReRenderContext} from '../../CustomContextProvider';



export default function GoalsList({ClickGoal}) {

    const GetGoalProgress = ()=>{
        setgoallistState(window.MasterData.GoalsList);
        setshowProgressBar(true);
      
        
    }

    const ReRenderContextObject = useContext(ReRenderContext);

    const [goallistState, setgoallistState] = useState(window.MasterData.GoalsList);
    const [showProgressBar, setshowProgressBar] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [updateItem, setupdateItem] = useState();
    const [updateType, setupdateType] = useState();

    const SetUpdateModal = (Item, Type)=>{
        setupdateItem(Item);
        setupdateType(Type);
        setshowUpdateModal(true);
    }

    useEffect(()=>{
        GetGoalProgress();
    },[ReRenderContextObject.rerenderForm])
    
    
    
    
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
                    <td>Total Time Completed(Hours)</td>
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
                            <tr >
                            {/* <td>{goal.id}</td> */}
                            <td className='click-tr' key={goal.id} onClick={()=> {ClickGoal(goal)}}>{goal.Name}</td>
                            <td>{goal.TotalTimeSpent}</td>
                            <td>{goal.Description}</td>
                            <td>{goal.Category}</td>
                            <td>{new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</td>
                            <td>{new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</td>
                            <td><Button vaiant='info' onClick={()=>{SetUpdateModal(goal,'Goal')}}>Update</Button></td>
                            
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
            <UpdateData Item={updateItem} Type={updateType} showUpdateModal={showUpdateModal} setshowUpdateModal={setshowUpdateModal}>
              </UpdateData>
        </Container>
            )
       
    
}
