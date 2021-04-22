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
import Reports from './Components/Pages/Reports'



function App() {
  return (
    <Router>
    <Container fluid>
    <Row>
      <Col>
        <Header>
        </Header>
      </Col>
    </Row>
    <Row>
    <Switch>
        
          <Route path="/AddTask">
            <AddTask />
          </Route>
          <Route path="/Reports">
            <Reports />
          </Route>
          <Route path="/">
            <List />
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
