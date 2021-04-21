import {Container,Row,Col} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Static/Header'
import Footer from './Components/Static/Footer'
import Home from './Components/Pages/Home'
import AddTask from './Components/Pages/AddTask'



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
          <Route path="/List">
            <Home />
          </Route>
          <Route path="/">
            <AddTask />
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
