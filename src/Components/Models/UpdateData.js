import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col,Button,Card,ListGroup,ListGroupItem,Form,Alert,Modal} from 'react-bootstrap';
import {FileService} from '../../Services/Utilities';
import {ReRenderContext} from '../../CustomContextProvider';


export default function UpdateData({Item,Type, showUpdateModal,setshowUpdateModal}) {
    const ReRenderContextObject = useContext(ReRenderContext);
    const [showGoal, setshowGoal] = useState(false);
    const [showSubGoal, setshowSubGoal] = useState(false);
    const [showTask, setshowTask] = useState(false);
    const [goalliststate, setgoalliststate] = useState(window.MasterData.GoalsList);
    const [subgoalliststate, setsubgoalliststate] = useState(window.MasterData.SubGoalsList);
    const [taskliststate, settaskliststate] = useState(window.MasterData.TasksList);
        
    
    
    const [selectedSubGoalGoal, setselectedSubGoalGoal] = useState();
    const [selectedTaskGoal, setselectedTaskGoal] = useState();
    const [selectedTaskSubGoal, setselectedTaskSubGoal] = useState();
    
    

    const [updateedGoal, setupdateedGoal] = useState({});
    const [updateedSubGoal, setupdateedSubGoal] = useState({});
    const [updateedTask, setupdateedTask] = useState({});

    const [goalUpdateedSuccessfully, setgoalUpdateedSuccessfully] = useState(false);
    const [subgoalUpdateedSuccessfully, setsubgoalUpdateedSuccessfully] = useState(false);
    const [taskUpdateedSuccessfully, settaskUpdateedSuccessfully] = useState(false);
    

  

    
    const UpdateGoal = ()=>{
        
        for(var i=0;i < window.MasterData.GoalsList.length;i++){
            if(window.MasterData.GoalsList[i].id === updateedGoal.id){
                window.MasterData.GoalsList[i] = updateedGoal;
            }
        }
 
        
        FileService.SaveDataToAWS('data/Goals.json',window.MasterData.GoalsList,(response, err)=>{
            if(response != null){
                
                setgoalliststate(window.MasterData.GoalsList);
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
                setgoalUpdateedSuccessfully(true);
                
            }
        });
        
      }

    
    const UpdateSubGoal = ()=>{
        
        
        var sgUpdate = {...updateedSubGoal,Goal_ID:selectedSubGoalGoal.id,TotalTime:parseFloat(updateedSubGoal.TotalTime),Cycles:(updateedSubGoal.Cycles == '' ? 1 : parseInt(updateedSubGoal.Cycles))};
        

        for(var i=0;i < window.MasterData.SubGoalsList.length;i++){
            if(window.MasterData.SubGoalsList[i].id === updateedSubGoal.id){
                window.MasterData.SubGoalsList[i] = updateedSubGoal;
            }
        }

        

        FileService.SaveDataToAWS('data/SubGoals.json',window.MasterData.SubGoalsList,(response, err)=>{
            if(response != null){
                
                
                setsubgoalliststate(window.MasterData.SubGoalsList);
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
                setsubgoalUpdateedSuccessfully(true);
                
            }
        });
        
   
      }

    
    const UpdateTask = ()=>{
        
        
            var tUpdate = {...updateedTask,SubGoal_ID:selectedTaskSubGoal.id,TimePerCycles:(updateedTask.TimePerCycles=='' ? 1 : parseFloat(updateedTask.TimePerCycles))};       
       
  

            for(var i=0;i < window.MasterData.TasksList.length;i++){
                if(window.MasterData.TasksList[i].id === tUpdate.id){
                    window.MasterData.TasksList[i] = tUpdate;
                }
            }
    
           
        
        FileService.SaveDataToAWS('data/Tasks.json',window.MasterData.TasksList,(response, err)=>{
            if(response != null){

                settaskliststate(window.MasterData.TasksList);
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
                settaskUpdateedSuccessfully(true);

            }
        });
        
      }


    const handleChange = (e,type) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if(type === 'Goal'){
            setupdateedGoal({ ...updateedGoal, [name]: value });
        }else if (type === 'SubGoal'){
            setupdateedSubGoal({ ...updateedSubGoal, [name]: value });
        }else if (type === 'Task'){
            setupdateedTask({ ...updateedTask, [name]: value });
        }
      }

      useEffect(()=>{
        
        if(Type === 'Goal'){
            setupdateedGoal(Item);
            setgoalUpdateedSuccessfully(false);
            setshowGoal(true);
            setshowSubGoal(false);
            setshowTask(false);
            

        }else if (Type === 'SubGoal'){
               
            setupdateedSubGoal(Item);
            setsubgoalUpdateedSuccessfully(false);
            let selectedgoal = goalliststate.filter((g)=>{return  g.id == Item.Goal_ID})[0];
            setselectedSubGoalGoal(selectedgoal);
            setshowSubGoal(true);
            setshowTask(false);
            setshowGoal(false);
        }else if (Type === 'Task'){
                  
            
            setupdateedTask(Item);
            settaskUpdateedSuccessfully(false);
            let tsubgoal = subgoalliststate.filter((sg)=>{return  sg.id == Item.SubGoal_ID})[0];
            let tgoal = goalliststate.filter((g)=>{return  g.id == tsubgoal.Goal_ID})[0];
            setselectedTaskSubGoal(tsubgoal);
            setselectedTaskGoal(tgoal);
            setshowGoal(false);
            setshowSubGoal(false);
            setshowTask(true);
        }

      },[Item,showUpdateModal])


    return (
        <Modal show={showUpdateModal}>
        <Container>

            <Row>
                <Col>
                    {
                        showGoal &&
                        <>
                            <h3>Update Goal - {Item.Name} </h3>
                            {
                                    !goalUpdateedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                                         
                                                             <Form.Label>Name</Form.Label>
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'Goal')} value={updateedGoal.Name} ></Form.Control>
                                                             <Form.Label>Description</Form.Label>
                                                             <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'Goal')} value={updateedGoal.Description} ></Form.Control>
                                                             <Form.Label>Goal Category</Form.Label>
                                                             <Form.Control name='Category' as='select' onChange={(e) => handleChange(e,'Goal')} value={updateedGoal.Category} >
                                                                 <option>Study</option>
                                                                 <option>Work</option>
                                                                 <option>Personal</option>
                                                             </Form.Control>
                                                             <Form.Label>Start Date</Form.Label>
                                                             <Form.Control name='StartDate' type='date' onChange={(e) => handleChange(e,'Goal')} value={updateedGoal.StartDate} ></Form.Control>
                                                             <Form.Label>End Date</Form.Label>
                                                             <Form.Control name='EndDate' type='date' onChange={(e) => handleChange(e,'Goal')} value={updateedGoal.EndDate} ></Form.Control>
                                                             <Form.Group>
                                                             <Button  variant='warning' onClick={()=>{setshowUpdateModal(false)}}>Close</Button>
                                                                <Button className='float-right'variant='success' onClick={UpdateGoal}>Update Goal</Button>
                                                             </Form.Group>
                                                             
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                goalUpdateedSuccessfully && 

                                <Alert  variant='success'>
                                    Goal Updateed Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        showSubGoal &&
                        <>
                            <h3>Update Sub Goal - {Item.Name}</h3>
                            {
                                    !subgoalUpdateedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                    
                                    
                                                             <Form.Label>Select Goal</Form.Label>
                                                             <Form.Control as='select' value={selectedSubGoalGoal.id} onChange={(e)=>{
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
                                                             <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'SubGoal')} value={updateedSubGoal.Name} ></Form.Control>
                                                             <Form.Label>Description</Form.Label>
                                                             <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'SubGoal')} value={updateedSubGoal.Description} ></Form.Control>
                                                             <Form.Label>Cycles</Form.Label>
                                                             <Form.Control name='Cycles' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={updateedSubGoal.Cycles} ></Form.Control>
                                                             <Form.Label>TotalTime</Form.Label>
                                                             <Form.Control name='TotalTime' type='number' onChange={(e) => handleChange(e,'SubGoal')} value={updateedSubGoal.TotalTime} ></Form.Control>
                                                             
                                                                <Form.Group>
                                                                <Button  variant='warning' onClick={()=>{setshowUpdateModal(false)}}>Close</Button>
                                                                    <Button className='float-right' variant='success' onClick={UpdateSubGoal}>Update Subgoal</Button>
                                                                </Form.Group>
                                                             
                                                             
                                                             
                                                             </>
                                                         }
                                                            
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                subgoalUpdateedSuccessfully && 

                                <Alert  variant='success'>
                                    Sub Goal Updateed Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
            <Row>
                <Col >
                    {
                        showTask &&
                        <>
                            <h3>Update Task - {Item.Name}</h3>
                            {
                                    !taskUpdateedSuccessfully &&

                                    <Form>
                                <Form.Group>
                                    
                                    
                                                             <Form.Label>Select Goal</Form.Label>
                                                             <Form.Control as='select' value={selectedTaskGoal.id} onChange={(e)=>{
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
                                                                 <Form.Control as='select' value={selectedTaskSubGoal.id} onChange={(e)=>{
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
                                                                    <Form.Control name='Name' type='input' onChange={(e) => handleChange(e,'Task')} value={updateedTask.Name} ></Form.Control>
                                                                    <Form.Label>Task Description</Form.Label>
                                                                    <Form.Control name='Description' as='textarea' onChange={(e) => handleChange(e,'Task')} value={updateedTask.Description} ></Form.Control>
                                                                    <Form.Label>Source</Form.Label>
                                                                    <Form.Control name='Source' type='input' onChange={(e) => handleChange(e,'Task')} value={updateedTask.Source} ></Form.Control>
                                                                    <Form.Label>TimePerCycle</Form.Label>
                                                                    <Form.Control name='TimePerCycle' type='number' onChange={(e) => handleChange(e,'Task')} value={updateedTask.TimePerCycle} ></Form.Control>
                                                                    <Form.Group>
                                                                    <Button variant='warning' onClick={()=>{setshowUpdateModal(false)}}>Close</Button>
                                                                        <Button className='float-right' variant='success' onClick={()=>UpdateTask()}>Update Task</Button>
                                                                         
                                                                    </Form.Group>
                                                                    
                                                                </>
                                                            }
                                                             
                                                         
                                </Form.Group>
                            </Form>
                                    
                            }
                            {
                                taskUpdateedSuccessfully && 

                                <Alert  variant='success'>
                                    Task Updateed Successfully
                                </Alert>

                            }
                            
                        </>
                    }
                </Col>
            </Row>
                    <Row>
                        <Col>
                        {
                            (goalUpdateedSuccessfully || subgoalUpdateedSuccessfully || taskUpdateedSuccessfully) &&
                            <Button variant='warning' onClick={()=>{setshowUpdateModal(false)}}>Close</Button>
                        }
                        </Col>
                    </Row>

        </Container>
        </Modal>
    )
}
