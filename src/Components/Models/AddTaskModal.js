import React,{useState} from 'react'
import {GoalsData} from "../../data/GoalsData";
import {SubGoalsData} from "../../data/SubGoalsData";
import {TasksData} from "../../data/TasksData";
import {Container,Row,Col,Card,Form,Button,Modal,ListGroup,ListGroupItem} from 'react-bootstrap';
import FileService from '../../Services/FileService';


export default function AddTaskModal({selectedTask ,showAddTaskForm, setshowAddTaskForm}) {
    const [addedTask, setaddedTask] = useState();

    

    

    const [addTaskTime, setaddTaskTime] = useState();
    const [addTaskDescription, setaddTaskDescription] = useState();




    const AddTask=()=>{
        fetch('./data/TaskEvents.json')
        .then(resp => resp.json())
        .then(taskdata => {
            let taskeventid = taskdata.length+1;
            let newtaskevent ={};
            newtaskevent.id=taskeventid;
            newtaskevent.Task_ID=selectedTask.id;
            newtaskevent.TimeSpent= parseFloat(addTaskTime);
            newtaskevent.StartTime=new Date().toUTCString();
            newtaskevent.Description=addTaskDescription;

            taskdata.push(newtaskevent);
            
            

            FileService.SaveTaskEventsToAWS(taskdata);
            setshowAddTaskForm(false);
            
        });

        
    }


    return (
        
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
    )
}
