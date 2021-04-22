import React,{useState,useEffect} from 'react'
import {GoalsData} from "../../data/GoalsData";
import {SubGoalsData} from "../../data/SubGoalsData";
import {TasksData} from "../../data/TasksData";
import {Container,Row,Col,Card,Form,Button,Modal,ListGroup,ListGroupItem} from 'react-bootstrap';
import AddTaskModal from '../Models/AddTaskModal'
import {DataService} from '../../Services/Utilities'

export default function AddTask() {
    
    const [goalliststate, setgoalliststate] = useState(GoalsData);
    const [subgoalliststate, setsubgoalliststate] = useState();
    const [taskliststate, settaskliststate] = useState();
    const [showButton, setshowButton] = useState(false);
    const [selectedGoal, setselectedGoal] = useState();
    const [showAddTaskForm, setshowAddTaskForm] = useState(false);
    
    const [selectedSubGoal, setselectedSubGoal] = useState();
    const [showSubGoals, setshowSubGoals] = useState(false);

    const [selectedTask, setselectedTask] = useState();
    const [showTasks, setshowTasks] = useState(false);

        //Function to show add task modal
        const AddTaskButtonClick=()=>{


            setshowAddTaskForm(true);
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
                    <AddTaskModal selectedTask={selectedTask} showAddTaskForm={showAddTaskForm} setshowAddTaskForm={setshowAddTaskForm}></AddTaskModal>

                }
          
        </Container>
    )
}
