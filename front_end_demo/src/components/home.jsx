import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MySidebar from './side_bar';

export const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="p-1 mb-2 bg-primary text-white" style={{ textAlign: 'center' }}>
            <h3>Welcome to the Home Page</h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2}><MySidebar /></Col>
        <Col xs={9}>2 of 2</Col>

      </Row>
    </Container>
  );
}   

export default Home;