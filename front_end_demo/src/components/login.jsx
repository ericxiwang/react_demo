import React, { useState} from 'react';
import LogoutButton from './logout';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
export const LoginForm = () => {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  const token = sessionStorage.getItem('token');
        const handleSubmit = () => {
            const opts = {
                method: 'POST',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify({ user_name: user_name, user_password: user_password 

                })
            };
            console.log(opts);
            fetch('https://localhost:8080/api/v1/auth', opts)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                sessionStorage.setItem('token', data.access_token);
                console.log(sessionStorage.getItem('token'));
                // Handle successful login here (e.g., store token, redirect, etc.)
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here (e.g., show error message to user)
            }); 




  };

  return (
    <div className="login-form">
        <h1>Login</h1>
        {token && token !=="" && token !='undefined' ? (
            <div>
                <h2>Login Successful!</h2>
                <LogoutButton />
            </div>
        ) : (
        <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow p-4" style={{ minWidth: "350px" }}>
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={user_name}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        )
    }
    </div>
   
  );
}

export default LoginForm;

