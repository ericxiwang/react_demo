import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
function LogoutButton() {

  const navigate = useNavigate();
  const handleLogout = () => {

    // Remove the JWT from session storage

    console.log("before logout=====>",sessionStorage.getItem('token'))
    sessionStorage.removeItem('token');
    // Optionally, redirect the user or update application state
    // For example, navigate to a login page:
    // history.push('/login');
    console.log("after logout=====>",sessionStorage.getItem('token'))
    console.log('JWT removed from session storage.');
    navigate("/login");



  };
  const handleClose = () => {
     navigate(-1);

  }

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow p-4" style={{ minWidth: "350px" }}>
            <Card.Body>
              <h3 className="text-center mb-4">Logout</h3>


                <div className="d-grid">
                    <div className="mb-3 text-center">
                    <Button className="me-1 btn-warning " style={{width : '200px'}} onClick={handleLogout}>
                      Logout
                    </Button>
                    </div>
               
              
                    <div className="mb-3 text-center">
                    <Button className="me-1 btn-success"  style={{width : '200px'}} onClick={handleClose}>
                      Close
                    </Button>
                    </div>
                </div>
          
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

export default LogoutButton;