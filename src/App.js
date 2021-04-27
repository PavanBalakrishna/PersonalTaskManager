import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Static/Header'
import Footer from './Components/Static/Footer'
import List from './Components/Pages/List'
import AddTask from './Components/Pages/AddTask'
import AddData from './Components/Pages/AddData'
import { FileService } from "./Services/Utilities";
import {GoalsContext, SubGoalsContext, TasksContext, TaskEventsContext} from'./CustomContextProvider';

window.MasterGoalsData=[];
window.MasterSubGoalsData=[];
window.MasterTasksData=[];



function App() {
  
  const [masterGoalsSet, setmasterGoalsSet] = useState(false);
  const [masterSubGoalsSet, setmasterSubGoalsSet] = useState(false);
  const [masterTasksSet, setmasterTasksSet] = useState(false);
  const [masterTaskEVentsSet, setmasterTaskEVentsSet] = useState(false);
  const [startDateState, setstartDateState] = useState();
  const [endDateState, setendDateState] = useState();
  const [goalsDataState, setgoalsDataState] = useState([]);
  const [subgoalsDataState, setsubgoalsDataState] = useState([]);
  const [tasksDataState, settasksDataState] = useState([]);
  const [taskEventsDataState, settaskEventsDataState] = useState([]);
  

  useEffect(() => {
    FileService.GetListFromAWS('data/Goals.json',(list ,err)=>{
      if(list != null){
   
        window.MasterGoalsData=list;
        setgoalsDataState(list);
        setmasterGoalsSet(true);
      }
    })
  }, []);

  useEffect(() => {
    FileService.GetListFromAWS('data/SubGoals.json',(list ,err)=>{
      if(list != null){
        window.MasterSubGoalsData=list;
        setsubgoalsDataState(list);
        setmasterSubGoalsSet(true);
      }
    })
  }, []);

  useEffect(() => {
    FileService.GetListFromAWS('data/Tasks.json',(list ,err)=>{
      if(list != null){
        window.MasterTasksData=list;
        settasksDataState(list);
        setmasterTasksSet(true);
      }
    })
  }, []);

  
  useEffect(() => {
    FileService.GetListFromAWS('data/TaskEvents.json',(list ,err)=>{
      if(list != null){
        window.MasterTaskEventsData=list;
        settaskEventsDataState(list);
        setmasterTaskEVentsSet(true);
      }
    })
  }, []);


  return (
    <Router>
      <GoalsContext.Provider value={goalsDataState}>
        <SubGoalsContext.Provider value={subgoalsDataState}>
          <TasksContext.Provider value={tasksDataState}>
            <TaskEventsContext.Provider value={taskEventsDataState}>
          <Container fluid>
            <Row>
              <Col>
                <Header  startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} />
              </Col>
            </Row>
            <Row>
            <Switch>
            <Route path="/AddTask">
              {
                masterGoalsSet && masterSubGoalsSet && masterTasksSet && masterTaskEVentsSet &&
                <AddTask />
              }
            </Route>
            <Route path="/AddData">
            {
                masterGoalsSet && masterSubGoalsSet && masterTasksSet && masterTaskEVentsSet &&
                <AddData />
              }
            </Route>
            <Route path="/">
            {
                masterGoalsSet && masterSubGoalsSet && masterTasksSet && masterTaskEVentsSet &&
                <List startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} />
              }
            </Route>
       
      
                </Switch>
            </Row>
            <Row>
            <Col>
              <Footer>

              </Footer>
              </Col>
            </Row>
          </Container>
          </TaskEventsContext.Provider>
          </TasksContext.Provider>
        </SubGoalsContext.Provider>
      </GoalsContext.Provider>
   
  </Router>
  );
}

export default App;
