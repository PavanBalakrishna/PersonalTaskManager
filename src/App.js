import React,{useState} from 'react'
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




function App() {
  const [startDateState, setstartDateState] = useState();
  const [endDateState, setendDateState] = useState();
  return (
    <Router>
    <Container fluid>
    <Row>
      <Col>
        <Header  startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} />
      </Col>
    </Row>
    <Row>
    <Switch>
        
          <Route path="/AddTask">
            <AddTask />
          </Route>
          
          <Route path="/">
            <List startDateState={startDateState} endDateState={endDateState} setstartDateState={setstartDateState} setendDateState={setendDateState} />
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
  </Router>
  );
}

export default App;
