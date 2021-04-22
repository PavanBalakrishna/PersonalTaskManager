import React,{useState,useEffect} from 'react'
import {GoalsData} from '../../data/GoalsData'
import {SubGoalsData} from '../../data/SubGoalsData'
import {TasksData} from '../../data/TasksData'
import {Container,Row,Col,Table,Card,ProgressBar} from 'react-bootstrap';


export default function GoalsList({ClickGoal}) {

    const GetGoalProgress = ()=>{
        fetch('./data/TaskEvents.json')
        .then(resp => resp.json())
        .then(taskeventsdata => {
            let progressGoalList = [];

            GoalsData.forEach(g => {
                let pglist = {
                    id:g.id,
                    TotalTime:0,
                    TotalTimeSpent:0,
                    Percent:0
                }
                let tasklist=[]
                let sglist = SubGoalsData.filter(sg => sg.Goal_ID == g.id);
                sglist.forEach(sg=>{
                    //Adding total time
                    pglist.TotalTime += sg.Total;

                    let ltsklist = TasksData.filter(t => t.SubGoal_ID == sg.id);

                    ltsklist.forEach(t=>{
                        let gsgtelist = taskeventsdata.filter(te=> te.Task_ID == t.id);

                        gsgtelist.forEach(lte=>{
                            pglist.TotalTimeSpent += parseFloat(lte.TimeSpent);
                        })
                    })
                    
                    
                })
                pglist.Percent = parseInt((pglist.TotalTimeSpent*100)/pglist.TotalTime);
                progressGoalList.push(pglist);
            });
            setprogressDataState(progressGoalList);
        });
    }

    const [progressDataState, setprogressDataState] = useState(GetGoalProgress());
    const [goallistState, setgoallistState] = useState(GoalsData);
    const [showProgressBar, setshowProgressBar] = useState(false);

    useEffect(()=>{
        
        if(progressDataState != null){
            let goalsDataWithProgress =[];
            progressDataState.forEach(te=>{
                goallistState.filter(g=>{
                    if(te.id == g.id){
                        let combinedgoal = {...g,...te};
                        goalsDataWithProgress.push(combinedgoal);
                    }
                })
            })

            setgoallistState(goalsDataWithProgress)
            setshowProgressBar(true);
        }
        
    },[progressDataState])
    
    
    
    
    return (
            <Container fluid>
                <Row>
                    <Col>
                    <Card>
                    
                    <Card.Body>
                    <Card.Title>Goals</Card.Title>    
                        
                    </Card.Body>
                </Card>
                    </Col>
                </Row>
            <Row>
                <Col>
                <Table striped bordered responsive hover>
                <thead>
                    <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        goallistState.map((goal)=>{
                            let progressvalue = 100;
                            

                            return (<>
                            <tr key={goal.id} onClick={()=> {ClickGoal(goal)}}>
                            {/* <td>{goal.id}</td> */}
                            <td>{goal.Name}</td>
                            <td>{goal.Description}</td>
                            <td>{goal.Category}</td>
                            <td>{new Date(goal.StartDate).getFullYear()+'/'+(new Date(goal.StartDate).getMonth()+1)+'/'+new Date(goal.StartDate).getDate()}</td>
                            <td>{new Date(goal.EndDate).getFullYear()+'/'+(new Date(goal.EndDate).getMonth()+1)+'/'+new Date(goal.EndDate).getDate()}</td>
                            </tr>
                            {
                                    showProgressBar &&
                            
                                    <tr>
                                        <td>
                                            <ProgressBar now={goal.Percent} label={goal.Percent}></ProgressBar>
                                        </td>
                                    </tr>
        
                            }
                            
                            </>)
                        })
                    }
                    </tbody>
                </Table>

                </Col>
            </Row>
        </Container>
            )
       
    
}
