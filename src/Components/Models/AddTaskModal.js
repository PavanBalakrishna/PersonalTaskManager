import React,{useState} from 'react'
import {Card,Form,Button,Modal,ListGroup,ListGroupItem,Alert} from 'react-bootstrap';
import {FileService} from '../../Services/Utilities';


export default function AddTaskModal({selectedTask ,showAddTaskForm, setshowAddTaskForm}) {
    const [addTaskTime, setaddTaskTime] = useState();
    const [addTaskDescription, setaddTaskDescription] = useState();
    const [showSuccess, setshowSuccess] = useState(false);
    const [showError, setshowError] = useState(false);

    const HideModal = ()=>{
        setshowError(false);
        setshowSuccess(false);
        setshowAddTaskForm(false);
    }

    
    const AddTaskToTaskList = () => {
        let taskeventid = window.MasterData.TaskEventsList.length+1;
        let newtaskevent ={};
        newtaskevent.id=taskeventid;
        newtaskevent.Task_ID=selectedTask.id;
        newtaskevent.TimeSpent= parseFloat(addTaskTime);
        newtaskevent.StartTime=new Date().toUTCString();
        newtaskevent.Description=addTaskDescription;

        window.MasterData.TaskEventsList.push(newtaskevent);
        
        

            FileService.SaveDataToAWS("data/TaskEvents.json",window.MasterData.TaskEventsList, (data,err)=>{
                if(err != null){
                    setshowError(true);
                    setshowSuccess(false);
                }else{
                    
                    setshowError(false);
                    setshowSuccess(true);
                }
            }
        );
            
        
        
    };

    return (
        
        <Modal show={showAddTaskForm} onHide={HideModal}>
        <Modal.Header closeButton>
        <Modal.Title>{selectedTask.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card>
            
                {
                    (!showSuccess && !showError) && 
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
                    
                }
                {
                    showSuccess && 
                    <Alert  variant='success'>
                        Task Added Successfully
                    </Alert>
                }
                  {
                    showError && 
                    <Alert  variant='danger'>
                        Failed to add task
                    </Alert>
                }
               
                
            </Card>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={HideModal}>
            Close
        </Button>
        {
            (!showSuccess && !showError) && 
            <Button variant="primary" onClick={AddTaskToTaskList}>
                Add Task
            </Button>
        }
       
        </Modal.Footer>
</Modal>
    )
}
