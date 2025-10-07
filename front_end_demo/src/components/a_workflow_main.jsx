import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal,Card,Form } from "react-bootstrap";
import '../css/a_workflow.css';


export const  A_workflow_main = () => {
    const [users, setUsers] = useState();
    const [selectedEmail, setSelectedEmail] = useState("");
    const [tickets, setTickets] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
    setSelectedEmail(e.target.value);
    console.log(e.target.value);
    };

    

    useEffect(() => {
        fetch('/api/v1/all_user',{method:'POST'})
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => {
          // console.log("User List:", data);
           setUsers(data);
       
       
           
         })
         .catch(error => {
           setError(error);
           setLoading(false);
         });
         }, []);

         ///////////////////ticket list fetch///////////////////////
         console.log("selectedEmail:", selectedEmail);


    useEffect(() => {
        console.log("Fetching tickets for:", selectedEmail);
     
        fetch(`/api/v1/a_workflow_ticketlist//${selectedEmail}`,
            {
                method:'GET',
                headers: {
                "Content-Type": "application/json"
               // "Authorization": `Bearer ${sessionStorage.getItem("token")}`
              },
             // mode: "cors"
            })
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => {
          console.log("tickets:", data);
           setTickets(data);
       
       
           
         })
         .catch(error => {
           setError(error);
           setLoading(false);
         });
         }, [selectedEmail]);





return (
    <div className="a_workflow">
        <div className="a_workflow_radio">

            <Form>
            <h3>Select User</h3>
            <Form.Check
               
                type="radio"
                name="user"
                label="All Tickets"
                value="all"
                checked={selectedEmail === "all"}
                onChange={handleChange}
                />
            {users && users.map((user) => (
                <Form.Check
                key={user.id}
                type="radio"
                name="user"
                label={user.user_name}
                value={user.email}
                checked={selectedEmail === user.email}
                onChange={handleChange}
                />
               
            ))}
             

    
            </Form>
            {selectedEmail && <p>Selected User: {selectedEmail}</p>}



        
        </div>
        <div className="a_workflow_ticketlist">
    <div className="p-3 table-wrapper">
      <h3>Task List</h3>
        <Table striped bordered hover table-sm>
          <thead>
            <tr>
              <th style={{ width:50}}>ID</th>
              <th style={{ width:300}}>Title</th>
              <th style={{ width:100}}>Type</th>
              <th style={{ width:100}}>Status</th>
              <th style={{ width:200}}>Submitter</th>
              <th style={{ width:200}}>Assignee</th>
             
            </tr>
          </thead>
        </Table>
      <div class="table-body-scroll">
        <Table striped bordered hover  responsive>
          <tbody>
            {tickets && tickets.map((task) => (
              <tr key={task.id}>
                <td style={{ width:50}}>{task.id}</td>
                <td style={{ width:300}}>{task.title}</td>
                <td style={{ width:100}}>{task.type || "-"}</td>
                <td style={{ width:100}}>{task.status}</td>
                <td style={{ width:200}}>{task.submitter}</td>
                <td style={{ width:200}}>{task.assignee}</td>
          
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  
    </div>
        </div>
            
    </div>
);
}   