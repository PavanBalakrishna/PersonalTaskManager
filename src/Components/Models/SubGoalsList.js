import React,{useEffect,useState,useContext} from 'react'
import {Container,Row,Col,Table,Button,Card,ListGroup,ListGroupItem,Collapse} from 'react-bootstrap';
import TaskList from './TaskList'
import CustomPieChart from '../CustomFIelds/CustomPieChart';

import CustomProgressBar from '../CustomFIelds/CustomProgressBar';
import UpdateData from './UpdateData';
import {ReRenderContext} from '../../CustomContextProvider';




export default function SubGoalsList({setShowGoalsList , goal}) {
    const ReRenderContextObject = useContext(ReRenderContext);
    
    const [SubGoalsState, setSubGoalsState] = useState(window.MasterData.SubGoalsList);
    const [selectedsubgoal, setselectedsubgoal] = useState({});
    const [ShowTasksState, setShowTasks] = useState(false);
    const [subgoalchartData, setsubgoalchartData] = useState();
    const [subgoalCompletechartData, setsubgoalCompletechartData] = useState();
    const [showProgressBar, setshowProgressBar] = useState(false);
    
    
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [updateItem, setupdateItem] = useState();
    const [updateType, setupdateType] = useState();


    const SetUpdateModal = (Item, Type)=>{
        setupdateItem(Item);
        setupdateType(Type);
        setshowUpdateModal(true);
    }
    
    const ShowTasks=(subgoal)=>{
        setselectedsubgoal(subgoal);
        setShowTasks(true);
        
    } 

    useEffect(async () => {

        let filteredGoals =window.MasterData.SubGoalsList.filter((sg)=>{return sg.Goal_ID===goal.id});
        setSubGoalsState(filteredGoals);

        let sgChartData=[];
        filteredGoals.forEach(sg => {
            let localvalue = (sg.TotalTime != '' ? parseFloat(sg.TotalTime) : 0);
            sgChartData.push({name:sg.Name, value:localvalue})
        });
        setsubgoalchartData(sgChartData);

        let spentsgChartData=[];
        filteredGoals.forEach(sg => {
            let localvalue = (sg.TotalTimeSpent != '' ? parseFloat(sg.TotalTimeSpent) : 0);
            if(sg.TotalTimeSpent != 0 ){
                spentsgChartData.push({name:sg.Name, value:localvalue});
            }
            
        });
        setsubgoalCompletechartData(spentsgChartData);


        let filteredSubGoals = window.MasterData.SubGoalsList.filter((sg)=>{return sg.Goal_ID===goal.id});
            setSubGoalsState(filteredSubGoals);
            setshowProgressBar(true);
        


    }, [goal,ReRenderContextObject.rerenderForm])
    
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
                        <Container fluid>
                            <Row>
                                <Col sm='4'>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Category : {goal.Category}</ListGroupItem>
                                    <ListGroupItem>Time Spent : {goal.TotalTimeSpent}</ListGroupItem>
                                    <ListGroupItem>Start date : {new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</ListGroupItem>
                                    <ListGroupItem>End date : {new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</ListGroupItem>
                                </ListGroup>
                                <Button variant="danger" onClick={BackToGoalList} >Go back</Button>
                                </Col>
                             
                                <Col sm='4'>
                                    
                                    <CustomPieChart chartData={subgoalchartData} color='#ac39ac'>
                                    </CustomPieChart>
                                </Col>
                                <Col sm='4'>
                                    
                                    <CustomPieChart chartData={subgoalCompletechartData} color='#008000'>
                                    </CustomPieChart>
                                </Col>
                            </Row>
                        </Container>
                       
                        
                    </Card.Body>
                </Card>
        </Col>
        </Row>
        <Row>
            <Col sm='5'>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                 <th>Description</th>
                <th>Total Cycles</th>
                <th>Total Time</th> 
                <th>Total Time Spent</th> 
                </tr>
            </thead>
            <tbody>
                {
                    SubGoalsState.map((subgoal)=>{
                        return <><tr  key={subgoal.id}  aria-controls="tasklist-show" aria-expanded={ShowTasksState}>
                        {/* <td>{subgoal.id}</td> */}
                        <td className='click-tr' onClick={() => ShowTasks(subgoal)} >{subgoal.Name}</td>
                        <td>{subgoal.Description}</td>
                        <td>{subgoal.Cycles}</td> 
                        <td>{subgoal.TotalTime}</td>
                        <td>{subgoal.TotalTimeSpent}</td>
                        <td><Button vaiant='info' onClick={()=>{SetUpdateModal(subgoal,'SubGoal')}}>Update</Button></td>
                        </tr>
                        {
                            showProgressBar &&
                            
                            <tr className='click-tr' onClick={() => ShowTasks(subgoal)}  aria-controls="tasklist-show" aria-expanded={ShowTasksState}>
                                <td>
                                    <CustomProgressBar goal={subgoal}></CustomProgressBar>
                                </td>
                            </tr>
                        }
                       </>
                    })
                }
                </tbody>
            </Table>
            </Col>
            {
            ShowTasksState &&
            
            <Col sm='7'>
            <Collapse in={ShowTasksState} timeout='5000'>
                    <TaskList id='tasklist-show' subgoal={selectedsubgoal} >
                    </TaskList>
                </Collapse>
            </Col>
            
        }
        </Row>
        <UpdateData Item={updateItem} Type={updateType} showUpdateModal={showUpdateModal} setshowUpdateModal={setshowUpdateModal} >
              </UpdateData>
       
    </Container>

    )
}
