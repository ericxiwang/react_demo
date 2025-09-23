import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal,Card,Form } from "react-bootstrap";

const statusToGroup = {
  new: "NewTickets",
  inprogress: "InProgressTickets",
  review: "ReviewTickets",
  done: "DoneTickets"
};

export const A_dashoboard_main = () => {
    const [tickets_data, setTickets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formData, setFormData] = useState({});
//////////////////////////////////////////////////////////
    const [isNew, setIsNew] = useState(false);

  const handleShowEdit = (ticket) => {
    setSelectedTicket(ticket);
    setFormData(ticket);
    setIsNew(false);
    setShow(true);
  };

  const handleShowNew = () => {
    setSelectedTicket(null);
    setFormData({
      id: Date.now(), // unique ID
      title: "",
      desc: "",
      status: "new",
      submitter: "admin",
      type: "task"
    });
    setIsNew(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedTicket(null);
    setIsNew(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    //if (!selectedTicket) return;

    const updatedTickets = { ...tickets_data };

    if (isNew) {
      // Add new ticket

      
      const groupKey = statusToGroup[formData.status];
      updatedTickets[groupKey] = [...updatedTickets[groupKey], formData];
      console.log("add neewwwwwwwwwwwwwwwwwwwwwwwwwwwwww",formData);
      fetch('https://localhost:8080/api/v1/a_dashboard_ops/new',
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
    else {

    // find old group
    const oldGroupKey = Object.keys(updatedTickets).find((key) =>
      updatedTickets[key].some((t) => t.id === selectedTicket.id)
    );

    // remove from old group
    updatedTickets[oldGroupKey] = updatedTickets[oldGroupKey].filter(
      (t) => t.id !== selectedTicket.id
    );

    // add to new group
    const newGroupKey = statusToGroup[formData.status];

    updatedTickets[newGroupKey] = [...updatedTickets[newGroupKey], formData];


      console.log(formData);
     fetch('https://localhost:8080/api/v1/a_dashboard_ops/edit',
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
  };



   useEffect(() => {
     fetch('https://localhost:8080/api/v1/a_dashboard_main',{method:'POST'})
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
                
                
                <Card key={ticket.id} className="mb-3 custom-card-new">
                  <Card.Body>
                    <Card.Title>{ticket.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ticket.type.toUpperCase()} | By: {ticket.submitter}  | Assignee: {ticket.assignee}
                    </Card.Subtitle>
                    <Button variant="danger" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              
              ))}
              </div>
          </div>

          <div className = "col-sm-5 a_dashboard_sub">
          <div><h4>In Progress</h4></div>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.InProgressTickets.map((ticket) => (
    
                <Card key={ticket.id} className="mb-3 custom-card-inprogress">
                  <Card.Body>
                    <Card.Title>{ticket.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ticket.type} | By: {ticket.submitter}
                    </Card.Subtitle>
                    <Button variant="info" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              
              ))}
            </div>
          </div>
          <div className = "col-sm-5 a_dashboard_sub">
          <h4>Review</h4>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.ReviewTickets.map((ticket) => (
                
                
                <Card key={ticket.id} className="mb-3 custom-card-review">
                  <Card.Body>
                    <Card.Title>{ticket.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ticket.type} | By: {ticket.submitter}
                    </Card.Subtitle>
                    <Button variant="warning" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              
              ))}
            </div>
          </div>
          <div className = "col-sm-5 a_dashboard_sub"> 
          <h4>Done</h4>
            <div className = 'inner-scroll'>
              {tickets_data && tickets_data.DoneTickets.map((ticket) => (
                
                
                <Card key={ticket.id} className="mb-3 custom-card-done">
                  <Card.Body>
                    <Card.Title>{ticket.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ticket.type} | By: {ticket.submitter}
                    </Card.Subtitle>
                    <Button variant="success" size="sm" onClick={() => handleShowEdit(ticket)}>
                      Details
                    </Button>
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
            <Form>
              <div >
                <input type='hidden' defaultValue={formData.id}></input>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="desc"
                  rows={3}
                  value={formData.desc || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type || ""}
                  onChange={handleChange}
                >
                  <option value="bug">Bug</option>
                  <option value="task">Task</option>
                  <option value="story">Story</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="inprogress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>


              
            </Form>
          )}
        </Modal.Body>
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