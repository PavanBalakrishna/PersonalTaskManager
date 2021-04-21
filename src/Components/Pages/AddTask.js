import React,{useState} from 'react'
import {GoalsData} from "../../data/GoalsData";
import {SubGoalsData} from "../../data/SubGoalsData";
import {TasksData} from "../../data/TasksData";
import {Container,Row,Col,Card,Form,Button,Modal,ListGroup,ListGroupItem} from 'react-bootstrap';
import FileService from '../../Services/FileService';

export default function AddTask() {
    const [goalliststate, setgoalliststate] = useState(GoalsData);
    const [subgoalliststate, setsubgoalliststate] = useState();
    const [taskliststate, settaskliststate] = useState();

    const [selectedGoal, setselectedGoal] = useState();
    
    const [selectedSubGoal, setselectedSubGoal] = useState();
    const [showSubGoals, setshowSubGoals] = useState(false);

    const [selectedTask, setselectedTask] = useState();
    const [showTasks, setshowTasks] = useState(false);

    const [addedTask, setaddedTask] = useState();

    const [showButton, setshowButton] = useState(false);

    const [showAddTaskForm, setshowAddTaskForm] = useState(false);

    const [addTaskTime, setaddTaskTime] = useState();
    const [addTaskDescription, setaddTaskDescription] = useState();

    const [currentTaskList, setcurrentTaskList] = useState()

    //Function to show add task modal
    const AddTaskButtonClick=()=>{


        setshowAddTaskForm(true);
    }

    const AddTask=()=>{
        fetch('./data/TaskEvents.json')
        .then(resp => resp.json())
        .then(taskdata => {
            let taskeventid = taskdata.length+1;
            let newtaskevent ={};
            newtaskevent.id=taskeventid;
            newtaskevent.Task_ID=selectedTask.id;
            newtaskevent.TimeSpent=addTaskTime;
            newtaskevent.StartTime=new Date().toUTCString();
            newtaskevent.Description=addTaskDescription;

            taskdata.push(newtaskevent);
            
            

            FileService.SaveTaskEventsToAWS(taskdata);
            setshowAddTaskForm(false);
            
        });

        
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>Add a Task</Card.Title>    
                        <Card.Text>
                            
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <Col sm='3'>
                 <Form.Group>
                     <Form.Label>Select Goal</Form.Label>
                     <Form.Control as='select' onChange={(e)=>{
                         if(e.target.value != 0){
                            setselectedGoal(goalliststate.filter((g)=>{return  g.id == e.target.value})[0]);
                            setsubgoalliststate(SubGoalsData.filter((sg)=>{return  sg.Goal_ID == e.target.value}));
                            setshowTasks(false);
                            setshowButton(false);
                            setshowSubGoals(true);
                         }else{
                            setshowTasks(false);
                            setshowButton(false);
                            setshowSubGoals(false);
                         }
                            
                         }} >
                        <option value='0' >---</option>
                        {
                            
                            goalliststate.map((g)=>{
                                
                                return <option value={g.id} key={g.id}>{g.Name}</option>
                            })
                        }
                     </Form.Control>
                 </Form.Group>    
                </Col>
                {
                    showSubGoals &&
                    <Col sm='3'>
                        <Form.Group>
                            <Form.Label>Select Sub Goal</Form.Label>
                            <Form.Control as='select' onChange={(e)=>{
                                if(e.target.value != 0){
                                    setselectedSubGoal(subgoalliststate.filter((g)=>{return  g.id == e.target.value})[0]);
                                    settaskliststate(TasksData.filter((t)=>{return  t.SubGoal_ID == e.target.value}));
                                    setshowButton(false);
                                    setshowTasks(true);
                                }else{
                                    setshowButton(false);
                                    setshowTasks(false);
                                }
                                    
                                }} >
                                <option value='0' >---</option>
                                {
                                    
                                    subgoalliststate.map((g)=>{
                                        
                                        return <option value={g.id} key={g.id}>{g.Name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>    
                </Col>
                }
                {
                    showTasks &&
                    <Col sm='3'>
                        <Form.Group>
                            <Form.Label>Select Task</Form.Label>
                            <Form.Control as='select' onChange={(e)=>{
                                if(e.target.value != 0){
                                    setselectedTask(taskliststate.filter((t)=>{return  t.id == e.target.value})[0]);
                                    setshowButton(true);
                                }else{
                                    setshowButton(false);
                                }
                                    
                                }} >
                                <option value='0' >---</option>
                                {
                                    
                                    taskliststate.map((g)=>{
                                        
                                        return <option value={g.id} key={g.id}>{g.Name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>    
                </Col>
                }
                
            </Row>
         
           
            {
                    showButton && 
                    <Row style={{marginTop:'30px'}}>
                        <Col sm='3'>
                        </Col>
                    <Col sm='3'>
                    
                    <Form.Group>
                        
                         <Button variant='success' className='form-control' onClick={AddTaskButtonClick}>
                             Add
                         </Button>
                        </Form.Group>      
                    
                </Col>
                </Row>
                }
                {
                    showAddTaskForm && 

                    <Modal show={showAddTaskForm} onHide={()=>{ setshowAddTaskForm(false)}}>
                        <Modal.Header closeButton>
                        <Modal.Title>{selectedTask.Name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card>
                            <Card.Body>
                                <Card.Text>
                                    {selectedTask.Description}
                                </Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Source : {selectedTask.Source}</ListGroupItem>
                                        <ListGroupItem>TimePerCycle : {selectedTask.TimePerCycle}</ListGroupItem>
                                    </ListGroup>
                                    <Form.Group >
                                        <Form.Label>Time Spent (Hours)</Form.Label>
                                        <Form.Control type="number" placeholder="0" onChange={(e)=>{setaddTaskTime(e.target.value)}} />
                                        <Form.Label>Activity Details</Form.Label>
                                        <Form.Control as="textarea" placeholder="" onChange={(e)=>{setaddTaskDescription(e.target.value)}} />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{ setshowAddTaskForm(false) }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={AddTask}>
                            Add Task
                        </Button>
                        </Modal.Footer>
                </Modal>
                }
          
        </Container>
    )
}
