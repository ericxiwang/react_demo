import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/a_dashboard.css';
import React, { useState, useEffect } from 'react';


export default function A_workflow_badge() {

    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
     useEffect(() => {
            fetch('https://localhost:8080/api/v1/a_workflow_badge',{method:'POST'})
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => {
            console.log("User List:", data);
            setCount(data);
     

       
       
           
         })
         .catch(error => {
           setError(error);
           setLoading(false);
         });
         }, []);
    
    


    return ( <div className="a_workflow_page">
        
        
                <div>
                    <ListGroup as="div"  className="a_workflow_sub_page" horizontal>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start ">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">NEW TICKETS</div>
                        <div >----------------------------------</div>
                       
                        All new tickets
                        </div>   
                    </ListGroup.Item>
                    <ListGroup.Item>
                       
                        <Badge className="badge-custom" bg="danger" pill>
                        {count && count.NewTickets }
                        </Badge>
                    </ListGroup.Item>    
                    </ListGroup> 
                </div> 
                <div>
                    <ListGroup as="div"  className="a_workflow_sub_page" horizontal>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">IN PROGRESS</div>
                        <div >----------------------------------</div>
                        Tickets being processed
                        </div>   
                    </ListGroup.Item>
                    <ListGroup.Item>
                       
                        <Badge className="badge-custom" bg="info" pill>
                        {count && count.InProgressTickets }
                        </Badge>
                    </ListGroup.Item>    
                    </ListGroup> 
                </div> 
                <div>
                    <ListGroup as="div"  className="a_workflow_sub_page" horizontal>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">REVIEW</div>
                        <div >----------------------------------</div>
              
                        Tickets pending review 
                        </div>   
                    </ListGroup.Item>
                    <ListGroup.Item>
                       
                        <Badge className="badge-custom" bg="warning" pill>
                        {count && count.ReviewTickets }
                        </Badge>
                    </ListGroup.Item>    
                    </ListGroup> 
                </div>   
                <div>
                    <ListGroup as="div"  className="a_workflow_sub_page" horizontal>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">DONE</div>
                        <div >----------------------------------</div>
                        Tickets completed
                        </div>   
                    </ListGroup.Item>
                    <ListGroup.Item>
         
                        <Badge className="badge-custom" bg="success" pill>
                        {count && count.DoneTickets }
                        </Badge>
                    </ListGroup.Item>    
                    </ListGroup> 
                </div>      
                    
            </div>
    );
}   