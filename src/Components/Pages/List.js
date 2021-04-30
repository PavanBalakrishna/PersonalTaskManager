import React,{useState} from 'react'
import GoalsList from "../Models/GoalsList";
import SubGoalsList from '../Models/SubGoalsList'
import {Container} from 'react-bootstrap'



export default function List() {
  const [showGoalsList, setShowGoalsList] = useState(true);
    const [currentGoal, setcurrentGoal] = useState();
    const ClickGoal=(goal)=>{
        setcurrentGoal(goal);
        setShowGoalsList(false);
    }
    if(showGoalsList){
      return (
        <Container fluid>
          <GoalsList ClickGoal={ClickGoal} ></GoalsList>
        </Container>
      )
    }else{
      return (
        <Container fluid>
          <SubGoalsList setShowGoalsList={setShowGoalsList} goal={currentGoal} ></SubGoalsList>
      </Container>
      )
    }
}
