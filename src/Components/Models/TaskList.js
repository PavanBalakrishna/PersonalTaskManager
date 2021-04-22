import React,{useEffect,useState} from 'react';
import {TasksData} from '../../data/TasksData';
import TaskEventList from './TaskEventList';
import {Container,Row,Col,Table,Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
import {FileService} from '../../Services/Utilities';
import AddTaskModal from '../Models/AddTaskModal'


export default function TaskList({setShowTaskList , subgoal}) {
    const [taskListState, settaskListState] = useState([]);
    const [showTaskEventListModal, setshowTaskEventListModal] = useState(false);
    const [selectedTask, setselectedTask] = useState();
    const [taskEventList, settaskEventList] = useState();
    const [showAddTaskForm, setshowAddTaskForm] = useState(false);

        
    useEffect(() => {
        
        settaskListState(TasksData.filter((t)=>{return t.SubGoal_ID === subgoal.id }))
       
    }, [subgoal])

    const GetTaskEvents =(taskdata,localselectedTask) => {
        settaskEventList(taskdata.filter(te => te.Task_ID == localselectedTask.id));
        setselectedTask(localselectedTask);
        setshowTaskEventListModal(true);
    };

      //Function to show add task modal
      const AddTaskButtonClick=(localselectedTask)=>{

        setselectedTask(localselectedTask);
        setshowAddTaskForm(true);
    }
    const ShowTaskEventList=(selectedtask)=>{
        FileService.GetListFromAWS("data/TaskEvents.json",(response)=>{GetTaskEvents(response,selectedtask)});
        
       

        
    }

    return (
        <Container>
            <Row>
                <Col>
                <Card>
                    
                    <Card.Body>
                    <Card.Title>{subgoal.Name}</Card.Title>    
                        <Card.Text>
                            {subgoal.Description}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Cycles : {subgoal.Cycles}</ListGroupItem>
                            <ListGroupItem>Total Estimated time : {subgoal.TotalTime}</ListGroupItem>
                            
                        </ListGroup>
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
             <Row>
                <Col>
                <Table striped bordered hover responsive >
                    <thead>
                        <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Source</th>
                        <th>Cycle Time</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskListState.map((task)=>{
                                return <tr key={task.id} >
                                {/* <td>{task.id}</td> */}
                                <td>{task.Name}</td>
                                <td>{task.Description}</td>
                                <td>{task.Source}</td>
                                <td>{task.TimePerCycle}</td>
                                <td><Button variant='info' onClick={()=>{ShowTaskEventList(task)}}>View Events</Button></td>
                                <td><Button variant='success' onClick={() => { AddTaskButtonClick(task) }}>Add Task Event</Button></td>
                                </tr>
                            
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row> 
            {
                showTaskEventListModal &&
                <TaskEventList task={selectedTask} setshowTaskEventListModal={setshowTaskEventListModal} showTaskEventListModal={showTaskEventListModal} taskevents={taskEventList}>

                </TaskEventList>
            }
            {
                showAddTaskForm && 
                <AddTaskModal selectedTask={selectedTask} showAddTaskForm={showAddTaskForm} setshowAddTaskForm={setshowAddTaskForm}></AddTaskModal>
            }
        </Container>
    )
}
