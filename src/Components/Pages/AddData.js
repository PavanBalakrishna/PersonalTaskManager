import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col,Button,Card,ListGroup,ListGroupItem,Form,Alert} from 'react-bootstrap';
import {FileService} from '../../Services/Utilities';
import CustomProgressBar from '../CustomFIelds/CustomProgressBar';
//import {GoalsContext,SubGoalsContext,TasksContext} from '../../CustomContextProvider'

export default function AddData() {
    const [showGoal, setshowGoal] = useState(false);
    const [showSubGoal, setshowSubGoal] = useState(false);
    const [showTask, setshowTask] = useState(false);
    const [goalliststate, setgoalliststate] = useState(window.MasterData.GoalsList);
    const [subgoalliststate, setsubgoalliststate] = useState(window.MasterData.SubGoalsList);
    const [taskliststate, settaskliststate] = useState(window.MasterData.TasksList);
        
    
    
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
        setselectedSubGoalGoal();
        setselectedTaskGoal();
        setselectedTaskSubGoal();
        setaddedGoal({});
        setshowGoal(true);
        setshowSubGoal(false);
        setshowTask(false);
        setgoalAddedSuccessfully(false);
    }

    
    const AddGoal = ()=>{
        addedGoal.id = goalliststate.length + 1;
        FileService.SaveDataToAWS('data/Goals.json',[...goalliststate,addedGoal],(response, err)=>{
            if(response != null){
                window.MasterData.GoalsList = [...window.MasterData.GoalsList, addedGoal];
                setgoalliststate(window.MasterData.GoalsList);
                setgoalAddedSuccessfully(true);
            }
        });
        
      }

      const showAddSubGoalSetion = ()=>{
        setselectedSubGoalGoal();
        setselectedTaskGoal();
        setselectedTaskSubGoal();
        setaddedSubGoal({});
        setshowGoal(false);
        setshowSubGoal(true);
        setshowTask(false);
        setsubgoalAddedSuccessfully(false);
    }

    
    const AddSubGoal = ()=>{
        var sgAdd = {...addedSubGoal,id:subgoalliststate.length + 1,Goal_ID:selectedSubGoalGoal.id,TotalTime:parseFloat(addedSubGoal.TotalTime),Cycles:(addedSubGoal.Cycles == '' ? 1 : parseInt(addedSubGoal.Cycles))};
        FileService.SaveDataToAWS('data/SubGoals.json',[...subgoalliststate,sgAdd],(response, err)=>{
            if(response != null){
                
                window.MasterData.SubGoalsList=[...window.MasterData.SubGoalsList,sgAdd];
                setsubgoalliststate(window.MasterData.SubGoalsList);
                setsubgoalAddedSuccessfully(true);
            }
        });
        
      }




      const showAddTaskSetion = ()=>{
        setselectedSubGoalGoal();
        setselectedTaskGoal();
        setselectedTaskSubGoal();
        setaddedTask({});
        setshowGoal(false);
        setshowSubGoal(false);
        setshowTask(true);

        settaskAddedSuccessfully(false);
    }

    
    const AddTask = ()=>{
        var tAdd = {...addedTask,id:taskliststate.length + 1,SubGoal_ID:selectedTaskSubGoal.id,TimePerCycles:(addedTask=='' ? 1 : parseFloat(addedTask.TimePerCycles))};
        FileService.SaveDataToAWS('data/Tasks.json',[...taskliststate,tAdd],(response, err)=>{
            if(response != null){
                
                
                window.MasterData.TasksList=[...window.MasterData.TasksList,tAdd];
                settaskliststate(window.MasterData.TasksList);
                settaskAddedSuccessfully(true);

            }
        });
        
      }


    const handleChange = (e,type) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if(type === 'Goal'){
            setaddedGoal({ ...addedGoal, [name]: value });
        }else if (type === 'SubGoal'){
            setaddedSubGoal({ ...addedSubGoal, [name]: value });
        }else if (type === 'Task'){
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
                                <Button className='mr-5 mb-2' onClick={showAddGoalSetion} >Add Goal</Button>
                                <Button className='mr-5  mb-2' onClick={showAddSubGoalSetion}>Add Subgoal</Button>
                                <Button className='mr-5  mb-2' onClick={showAddTaskSetion}>Add Task</Button>
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
                                                         
                                                             <Form.Label>Name</Form.Label>
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'Goal')} value={addedGoal.Name} ></Form.Control>
                                                             <Form.Label>Description</Form.Label>
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
                                                             <Form.Group>
                                                                <Button variant='success' onClick={AddGoal}>Add Goal</Button>
                                                             </Form.Group>
                                                             
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
                                    !subgoalAddedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                    
                                    
                                                             <Form.Label>Select Goal</Form.Label>
                                                             <Form.Control as='select' onChange={(e)=>{
                                                                 if(e.target.value != ''){
                                                                    setselectedSubGoalGoal(goalliststate.filter((g)=>{return  g.id == e.target.value})[0]);

                                                                 }}} >
                                                                     <option value='' >--------</option>
                                                                {
                                                                    goalliststate.map((g)=>{
                                                                        
                                                                        return <option value={g.id} key={g.id}>{g.Name}</option>
                                                                    })
                                                                }
                                                             </Form.Control>
                                                         
                                                         {
                                                             selectedSubGoalGoal &&
                                                             <>
                                                                 <Form.Label>Name</Form.Label>
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.Name} ></Form.Control>
                                                             <Form.Label>Description</Form.Label>
                                                             <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.Description} ></Form.Control>
                                                             <Form.Label>Cycles</Form.Label>
                                                             <Form.Control name='Cycles' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.Cycles} ></Form.Control>
                                                             <Form.Label>TotalTime</Form.Label>
                                                             <Form.Control name='TotalTime' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={addedSubGoal.TotalTime} ></Form.Control>
                                                             <Form.Group>
                                                                <Button variant='success' onClick={AddSubGoal}>Add Subgoal</Button>
                                                             </Form.Group>
                                                             
                                                             </>
                                                         }
                                                            
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                subgoalAddedSuccessfully && 

                                <Alert  variant='success'>
                                    Sub Goal Added Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
            <Row>
                <Col sm='6'>
                    {
                        showTask &&
                        <>
                            <h3>Add a Task</h3>
                            {
                                    !taskAddedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                    
                                    
                                                             <Form.Label>Select Goal</Form.Label>
                                                             <Form.Control as='select' onChange={(e)=>{
                                                                 setselectedTaskSubGoal();
                                                                 if(e.target.value != ''){
                                                                    setselectedTaskGoal(goalliststate.filter((g)=>{return  g.id == e.target.value})[0]);                                                                    

                                                                 }
                                                                    
                                                                 }} >
                                                                <option value='' >--------</option>
                                                                {
                                                                    
                                                                    goalliststate.map((g)=>{
                                                                        
                                                                        return <option value={g.id} key={g.id}>{g.Name}</option>
                                                                    })
                                                                }
                                                             </Form.Control>
                                                             {
                                                                 selectedTaskGoal &&
                                                                <>
                                                                 <Form.Label>Select Sub Goal</Form.Label>
                                                                 <Form.Control as='select' onChange={(e)=>{
                                                                     if(e.target.value != ''){
                                                                        setselectedTaskSubGoal(subgoalliststate.filter((g)=>{return  g.id == e.target.value})[0]);
    
                                                                     }
                                                                        
                                                                     }} >
                                                                    <option value='' >--------</option>
                                                                    {
                                                                        
                                                                        subgoalliststate.map((g)=>{
                                                                            if(g.Goal_ID === selectedTaskGoal.id){
                                                                                return <option value={g.id} key={g.id}>{g.Name}</option>
                                                                            }
                                                                            
                                                                        })
                                                                    }
                                                                 </Form.Control>
                                                                 </>
                                                             
                                                             }
                                                            {
                                                                selectedTaskSubGoal &&
                                                                <>
                                                                    <Form.Label>Task Name</Form.Label>
                                                                    <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'Task')} value={addedTask.Name} ></Form.Control>
                                                                    <Form.Label>Task Description</Form.Label>
                                                                    <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'Task')} value={addedTask.Description} ></Form.Control>
                                                                    <Form.Label>Source</Form.Label>
                                                                    <Form.Control name='Source' type='input' onChange={(e) => handleChange(e,'Task')} value={addedTask.Source} ></Form.Control>
                                                                    <Form.Label>TimePerCycle</Form.Label>
                                                                    <Form.Control name='TimePerCycle' type='number' onChange={(e) => handleChange(e,'Task')} value={addedTask.TimePerCycle} ></Form.Control>
                                                                    <Form.Group>
                                                                        <Button variant='success' onClick={AddTask}>Add Task</Button>
                                                                    </Form.Group>
                                                                    
                                                                </>
                                                            }
                                                             
                                                         
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                taskAddedSuccessfully && 

                                <Alert  variant='success'>
                                    Task Added Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
        </Container>
    )
}
