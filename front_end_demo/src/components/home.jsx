import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MySidebar from './side_bar';
import Top_banner from './header';
export const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
   
   useEffect(() => {
     fetch('https://localhost:8080/api/v1/product_list',{method:'POST'})
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
      
       setData(data);
       setLoading(false);
       console.log("Data in Home:", data);


       
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
    
    
    <Container fluid>
      <Row>
        <Top_banner />
      </Row>
      <Row>
        <Col>
          <div className="p-1 mb-2 bg-primary text-white" style={{ textAlign: 'center' }}>
            <h3>Welcome to the Home Page</h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2}><MySidebar /></Col>
        
     <Col>
       <div>
      <h2>My List</h2>
     
      <Table striped bordered hover variant="primary">
          {data && data.map(item => (
            <tr key={item.name}>
              <td bordered>ID: {item.id}</td>
              <td>{item.count}</td>
              <td>Name: {item.name}</td>
              <td>{item.description}</td>
            
            </tr>
     
          ))} 
      </Table>     
    </div> </Col>
        
        
      </Row>
    </Container>
  );
}   

export default Home;