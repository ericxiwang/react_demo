import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal,Card,Form } from "react-bootstrap";

import UserSelect from './widget_user_list';

const statusToGroup = {
  new: "NewTickets",
  inprogress: "InProgressTickets",
  review: "ReviewTickets",
  done: "DoneTickets"
};

export const A_dashoboard_main = () => {
   console.log("show token=====",sessionStorage.getItem("token"))
    const [tickets_data, setTickets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formData, setFormData] = useState({});
//////////////////////////////////////////////////////////
    const [isNew, setIsNew] = useState(false);
//////////////////////child callback///////////////////////////////


    const [selectedUser, setSelectedUser] = useState("");
    console.log("Selected User in A_dashboard_main:", selectedUser);

////////////////////////////////////////////////////////////
////////////////////validation///////////////////////////////
    const [validated, setValidated] = useState(false);
 

  const handleShowEdit = (ticket) => {
    setSelectedTicket(ticket);
    setFormData(ticket);
    setIsNew(false);
    setShow(true);
  };

  const handleShowNew = () => {
    setSelectedTicket(null);
    setFormData({
      ticket_id: Date.now(), // unique ID
      ticket_title: "",
      ticket_desc: "",
      ticket_status: "new",
      ticket_submitter: "admin",
      ticket_type: "task",
      ticket_assignee: "", // Use data from child component
      ticket_datetime: (new Date()).toDateString() // current timestamp
    });
    setIsNew(true);
    setShow(true);
    //console.log("Data from Child in New:",dataFromChild);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedTicket(null);
    setIsNew(false);
  };

  const handleChange = (e) => {
    console.log("E TARGET NAME:",e.target.name);
    console.log("E TARGET VALUE:",e.target.value);
    console.log("formData before change:",formData);
    console.log("selectedTicket before change:",selectedTicket);
    console.log("isNew before change:",isNew);
    //console.log("dataFromChild before change:",dataFromChild);
    
      // If the
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (event) => {
    //if (!selectedTicket) return;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    else
      {
         setValidated(true);
             const updatedTickets = { ...tickets_data };

    if (isNew) {
      // Add new ticket

      console.log("Selected User in A_dashboard_main:>>>>>>>>>>>>>>>>>>>>>>>>", selectedUser);

      const groupKey = statusToGroup[formData.ticket_status];
      updatedTickets[groupKey] = [...updatedTickets[groupKey], formData];
      
      formData.ticket_assignee = selectedUser.toString();
 
      console.log("add neewwwwwwwwwwwwwwwwwwwwwwwwwwwwww",formData);
      
      fetch('/api/v1/a_dashboard_ops/new',
      {
        method:'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })
      .then(response =>{

        setTickets(updatedTickets);
        handleClose();


      })
     .catch(error => {
       setError(error);
       setLoading(false);
     });

    }
    else {

    // find old group
    const oldGroupKey = Object.keys(updatedTickets).find((key) =>
      updatedTickets[key].some((t) => t.ticket_id === selectedTicket.ticket_id)
    );

    // remove from old group
    updatedTickets[oldGroupKey] = updatedTickets[oldGroupKey].filter(
      (t) => t.ticket_id !== selectedTicket.ticket_id
    );

    // add to new group
    const newGroupKey = statusToGroup[formData.ticket_status];

    updatedTickets[newGroupKey] = [...updatedTickets[newGroupKey], formData];


      console.log(formData);
     fetch('/api/v1/a_dashboard_ops/edit',
      {
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      .then(response =>{

        setTickets(updatedTickets);
        handleClose();


      })
     .catch(error => {
       setError(error);
       setLoading(false);
     });

    }
      }
  };

   useEffect(() => {
   
     fetch('/api/v1/a_dashboard_main',{
      method:'POST'
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(tickets_data => {

 
       setTickets(tickets_data);
       setLoading(false);
     console.log("AAAAAAAA",tickets_data);
  

     })
     .catch(error => {
       setError(error);
       setLoading(false);
     });
     
   }, []);

  //if (loading) return <p>Loading data...</p>;
  //if (data.length === 0) return <p>No data available.</p>;
  //if (error) return <p>Error loading data: {error.message}</p>;

  return (
      /* Loop for each group and each ticket */
  <div className="a_dashboard">
  
  
      

          <div className = "col-sm-5 a_dashboard_sub">
            <div>
            <h5>New Tickets       | <Button variant="danger" size='sm'  onClick={handleShowNew}> <b>+ CREATE NEW TICKEY +</b></Button></h5>
            </div>
              <div className = 'inner-scroll'>
              {tickets_data && tickets_data.NewTickets.map((ticket) => (
                
                
                <Card key={ticket.ticket_id} className="mb-3 custom-card-new">
                  <Card.Body>
                    <Card.Title className="a_card">{ticket.ticket_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted a_sub_card" style={{ fontSize: '0.8rem' }}>
                      {ticket.ticket_type.toUpperCase()} | By: {ticket.ticket_submitter}  | Assignee: {ticket.ticket_assignee}
                    </Card.Subtitle>
                    <Button variant="danger" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                    <text className="mb-2 text-muted  a_sub_card"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created: {ticket.ticket_datetime}</text>
                  </Card.Body>
                </Card>
              
              ))}
              </div>
          </div>

          <div className = "col-sm-5 a_dashboard_sub">
          <div><h4>In Progress</h4></div>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.InProgressTickets.map((ticket) => (
    
                <Card key={ticket.ticket_id} className="mb-3 custom-card-inprogress">
                  <Card.Body>
                    <Card.Title className="a_card">{ticket.ticket_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted  a_sub_card">
                      {ticket.ticket_type} | By: {ticket.ticket_submitter}
                    </Card.Subtitle>
                    <Button variant="info" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                    <text className="mb-2 text-muted  a_sub_card"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created: {ticket.ticket_datetime}</text>
                    
                    
                  </Card.Body>
                </Card>
              
              ))}
            </div>
          </div>
          <div className = "col-sm-5 a_dashboard_sub">
          <h4>Review</h4>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.ReviewTickets.map((ticket) => (
                
                
                <Card key={ticket.ticket_id} className="mb-3 custom-card-review">
                  <Card.Body>
                    <Card.Title className="a_card">{ticket.ticket_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted  a_sub_card">
                      {ticket.ticket_type} | By: {ticket.ticket_submitter}
                    </Card.Subtitle>
                    <Button variant="warning" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                    <text className="mb-2 text-muted  a_sub_card"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created: {ticket.ticket_datetime}</text>
                  </Card.Body>
                </Card>
              
              ))}
            </div>
          </div>
          <div className = "col-sm-5 a_dashboard_sub"> 
          <h4>Done</h4>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.DoneTickets.map((ticket) => (
                
                
                <Card key={ticket.ticket_id} className="mb-3 custom-card-done">
                  <Card.Body>
                    <Card.Title className="a_card">{ticket.ticket_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted  a_sub_card">
                      {ticket.ticket_type} | By: {ticket.ticket_submitter}
                    </Card.Subtitle>
                    <Button variant="success" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                    <text className="mb-2 text-muted  a_sub_card"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created: {ticket.ticket_datetime}</text>
                  </Card.Body>
                </Card>
              
              ))}
            </div>
          </div>
      
   
    {/* Loop end */} 



     {/* Popup Modal with Edit Form */}
     <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData && (
            <Form noValidate validated={validated}>
              <div >
                <input type='hidden' defaultValue={formData.ticket_id}></input>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="ticket_title"
                  value={formData.ticket_title || ""}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Please input a title.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="ticket_desc"
                  rows={3}
                  value={formData.ticket_desc || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="ticket_type"
                  value={formData.ticket_type || ""}
                  onChange={handleChange}
                >
                  <option value="task">Task</option>
                  <option value="bug">Bug</option>  
                  <option value="story">Story</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="ticket_status"
                  value={formData.ticket_status || ""}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="inprogress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>
            {isNew ? 
              <Form.Group className="mb-3">
                <Form.Label>User List</Form.Label>
               <UserSelect  onSelectChange={setSelectedUser}/>
              </Form.Group> : null}

             
              
              

              
            </Form>
          )}
        </Modal.Body>
        <text className="mb-2 text-muted  a_sub_card"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created: {formData.ticket_datetime}</text>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            {isNew ? "Add Ticket" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

  </div>
  </div>


  );
}   

export default A_dashoboard_main;