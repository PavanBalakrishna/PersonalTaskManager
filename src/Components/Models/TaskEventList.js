import React,{useState} from 'react'

import {TasksData} from "../../data/TasksData";
import {Container,Row,Col,Table,Modal} from 'react-bootstrap';


export default function TaskEventList({task,setshowTaskEventListModal,showTaskEventListModal,taskevents}) {
    
    return (
       <Container>
           <Row>
               <Col>
               
         
           <Modal show={showTaskEventListModal} onHide={()=>{ setshowTaskEventListModal(false)}}>
                        <Modal.Header closeButton>
                        <Modal.Title>{task.Name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table>
                            <thead>
                        <tr>
                        {/* <th>ID</th> */}
                        <th>StartTime</th>
                        <th>Time Spent</th>
                        <th>Description</th>
                        
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskevents.map((taskevent)=>{
                                return <tr key={taskevent.id} >
                                {/* <td>{task.id}</td> */}
                                <td>{taskevent.StartTime}</td>
                                <td>{taskevent.TimeSpent}</td>
                                <td>{taskevent.Description}</td>

                                </tr>
                            
                            })
                        }
                        </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                     
                        
                        </Modal.Footer>
                </Modal>
                </Col>
           </Row>
       </Container>
    )
}
