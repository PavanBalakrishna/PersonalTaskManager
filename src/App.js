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
import { DataService } from "./Services/Utilities";
import {GoalsContext, SubGoalsContext, TasksContext, TaskEventsContext, ReRenderContext} from'./CustomContextProvider';


window.MasterData=[];




function App() {
  const [masterDataState, setmasterDataState] = useState(false);
  const [startDateState, setstartDateState] = useState();
  const [endDateState, setendDateState] = useState();
  const [goalsDataState, setgoalsDataState] = useState([]);
  const [subgoalsDataState, setsubgoalsDataState] = useState([]);
  const [tasksDataState, settasksDataState] = useState([]);
  const [taskEventsDataState, settaskEventsDataState] = useState([]);
  const [rerenderForm, setrerenderForm] = useState(false);

  

  useEffect(() => {
    
    DataService.GetAllData(startDateState, endDateState).then((data)=>{
      if(data != null){

        setgoalsDataState(window.MasterData.GoalsList);
        setsubgoalsDataState(window.MasterData.SubGoalsList);
        settasksDataState(window.MasterData.TasksList);
        settaskEventsDataState(window.MasterData.TaskEventsList);
        setmasterDataState(true);
        setrerenderForm(!rerenderForm);

      
      }
    });

 
  }, [startDateState, endDateState]);

  return (
    <Router>
      <GoalsContext.Provider value={goalsDataState}>
        <SubGoalsContext.Provider value={subgoalsDataState}>
          <TasksContext.Provider value={tasksDataState}>
            <TaskEventsContext.Provider value={taskEventsDataState}>
              <ReRenderContext.Provider value={{
                rerenderForm:rerenderForm,
                setrerenderForm:setrerenderForm
              }}>
          <Container fluid>
         
            <Row>
              <Col>
              {
              masterDataState &&
              
              <Header  startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} setrerenderForm={setrerenderForm} />
            }
                
              </Col>
            </Row>
            <Row>
            <Switch>
            <Route path="/AddTask">
              {
                masterDataState &&
                <AddTask />
              }
            </Route>
            <Route path="/AddData">
            {
                masterDataState &&
                <AddData />
              }
            </Route>
            <Route path="/">
            {
                masterDataState &&
                <List rerenderForm={rerenderForm} setrerenderForm={setrerenderForm} />
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
          </ReRenderContext.Provider>
          </TaskEventsContext.Provider>
          </TasksContext.Provider>
        </SubGoalsContext.Provider>
      </GoalsContext.Provider>
   
  </Router>
  );
}

export default App;
