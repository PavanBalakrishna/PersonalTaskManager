import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col,Button,Card,ListGroup,ListGroupItem,Form,Alert} from 'react-bootstrap';
import {FileService} from '../../Services/Utilities';
import CustomProgressBar from '../CustomFIelds/CustomProgressBar';
import {GoalsContext,SubGoalsContext,TasksContext} from '../../CustomContextProvider'

export default function AddData() {
    const [showGoal, setshowGoal] = useState(false);
    const [showSubGoal, setshowSubGoal] = useState(false);
    const [showTask, setshowTask] = useState(false);
    const [goalliststate, setgoalliststate] = useState(useContext(GoalsContext));
    const [subgoalliststate, setsubgoalliststate] = useState(useContext(SubGoalsContext));
    const [taskliststate, settaskliststate] = useState(useContext(TasksContext));
        
    
    
    const [selectedSubGoalGoal, setselectedSubGoalGoal] = useState();
    const [selectedTaskGoal, setselectedTaskGoal] = useState();
    const [selectedTaskSubGoal, setselectedTaskSubGoal] = useState();
    

    const [addedGoal, setaddedGoal] = useState({});
    const [addedSubGoal, setaddedSubGoal] = useState({});
    const [addedTask, setaddedTask] = useState({});

    const [goalAddedSuccessfully, setgoalAddedSuccessfully] = useState(false);
    const [subgoalAddedSuccessfully, setsubgoalAddedSuccessfully] = useState(false);
    const [taskAddedSuccessfully, settaskAddedSuccessfully] = useState(false);
    

    const showAddGoalSetion = ()=>{
        setaddedGoal({});
        setshowGoal(true);
        setshowSubGoal(false);
        setgoalAddedSuccessfully(false);
    }

    
    const AddGoal = ()=>{
        FileService.SaveTaskEventsToAWS('data/Goals.json',[...goalliststate,addedGoal]);
        setgoalAddedSuccessfully(true);
      }

      const showAddSubGoalSetion = ()=>{
        setaddedSubGoal({});
        setshowGoal(false);
        setshowSubGoal(true);
        setsubgoalAddedSuccessfully(false);
    }

    
    const AddSubGoal = ()=>{
        var sgAdd = {...addedSubGoal,Goal_ID:selectedSubGoalGoal.id};
        FileService.SaveTaskEventsToAWS('data/SubGoals.json',[...subgoalliststate,sgAdd]);
        setsubgoalAddedSuccessfully(true);
      }




      const showAddTaskSetion = ()=>{
        setaddedTask({});
        setshowTask(true);
        settaskAddedSuccessfully(false);
    }

    
    const AddTask = ()=>{
        var tAdd = {...AddTask,SubGoal_ID:selectedSubGoalGoal.id};
        FileService.SaveTaskEventsToAWS('data/Tasks.json',[...subgoalliststate,tAdd]);
        settaskAddedSuccessfully(true);
      }


    const handleChange = (e,type) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if(type='Goal'){
            setaddedGoal({ ...addedGoal, [name]: value });
        }else if (type='SubGoal'){
            setaddedSubGoal({ ...addedSubGoal, [name]: value });
        }else if (type='Task'){
            setaddedTask({ ...addedTask, [name]: value });
        }
            
    
      }


    return (
        <Container>
            <Row>
                <Col>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>Add Data</Card.Title>    
                    
                    <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Button className='mr-5' onClick={showAddGoalSetion} >Add Goal</Button>
                                <Button className='mr-5' onClick={showAddSubGoalSetion}>Add Subgoal</Button>
                                <Button className='mr-5' onClick={showAddTaskSetion}>Add Task</Button>
                            </ListGroupItem>
                     
                        </ListGroup>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <Col sm='6'>
                    {
                        showGoal &&
                        <>
                            <h3>Add a new Goal</h3>
                            {
                                    !goalAddedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                                         
                                                             <Form.Label>Goal Name</Form.Label>
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.Name} ></Form.Control>
                                                             <Form.Label>Goal Description</Form.Label>
                                                             <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.Description} ></Form.Control>
                                                             <Form.Label>Goal Category</Form.Label>
                                                             <Form.Control name='Category' as='select' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.Category} >
                                                                 <option>Study</option>
                                                                 <option>Work</option>
                                                                 <option>Personal</option>
                                                             </Form.Control>
                                                             <Form.Label>Start Date</Form.Label>
                                                             <Form.Control name='StartDate' type='date' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.StartDate} ></Form.Control>
                                                             <Form.Label>End Date</Form.Label>
                                                             <Form.Control name='EndDate' type='date' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.EndDate} ></Form.Control>
                                                             <Button variant='success' onClick={AddGoal}>Add Goal</Button>
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                goalAddedSuccessfully && 

                                <Alert  variant='success'>
                                    Goal Added Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
            <Row>
                <Col sm='6'>
                    {
                        showSubGoal &&
                        <>
                            <h3>Add a new Sub Goal</h3>
                            {
                                    !goalAddedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                    
                                    
                                                             <Form.Label>Select Goal</Form.Label>
                                                             <Form.Control as='select' onChange={(e)=>{
                                                                 if(e.target.value != 0){
                                                                    setselectedSubGoalGoal(goalliststate.filter((g)=>{return  g.id == e.target.value})[0]);

                                                                 }
                                                                    
                                                                 }} >
                                                                
                                                                {
                                                                    
                                                                    goalliststate.map((g)=>{
                                                                        
                                                                        return <option value={g.id} key={g.id}>{g.Name}</option>
                                                                    })
                                                                }
                                                             </Form.Control>
                                                         
                                                             <Form.Label>SubGoal Name</Form.Label>
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.Name} ></Form.Control>
                                                             <Form.Label>Goal Description</Form.Label>
                                                             <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.Description} ></Form.Control>
                                                             <Form.Label>Cycles</Form.Label>
                                                             <Form.Control name='Cycles' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={addedGoal.Cycles} ></Form.Control>
                                                             <Form.Label>TotalTime</Form.Label>
                                                             <Form.Control name='TotalTime' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={addedGoal.TotalTime} ></Form.Control>
                                                             <Button variant='success' onClick={AddSubGoal}>Add Subgoal</Button>
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                goalAddedSuccessfully && 

                                <Alert  variant='success'>
                                    Goal Added Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
        </Container>
    )
}
