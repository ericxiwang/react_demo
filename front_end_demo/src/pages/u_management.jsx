import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import HEADER from '../components/header'; 
//import ProEditSideBar from './pro_edit_side_bar';
import Table from 'react-bootstrap/Table';
import { Nav } from 'react-bootstrap';





function User_management() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cate_name, setCate_name] = useState("");
    const [cate_desc, setCate_desc] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [page_reload, setPage_reload] = useState(true);
  

    ///////////////////////////////////////////
    const [dataFromChild, setDataFromChild] = useState('');

    const handleChildData = (data) => {
      setDataFromChild(data);
    };



    ///////////////////////////////////////////
  


  useEffect(() => {
    fetch('https://localhost:8080/api/v1/all_user',{method:'POST'})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Data in Product Edit:", data);
    setData(data);
    setLoading(false);
    setPage_reload(true); // Set to true after data is loaded, allowing re-fetch if needed

    
  })
  .catch(error => {
    setError(error);
    setLoading(false);
  }); 
  }, [page_reload]);

    const Add_new_item = () => {
  
      fetch('https://localhost:8080/api/v1/product_cate_list/add',
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"new_cate":[{ name:cate_name, description: cate_desc }]}),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Add new item response:", data);
        setPage_reload(false);
        console.log(page_reload); // Toggle to trigger useEffect
    
        
      // Optionally, refresh the list or give feedback to the user here
      // window.location.reload();
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
      
        console.log("Add new item clicked");
        
      };





  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  console.log("Columns:", columns);
  return (


    <Container fluid>
      <Row>
        <HEADER />
      </Row>

      <Row>
  
        <Col>
          <div>
          <h2>Cate_list</h2>
        
          <Table bordered>
      
              <thead>
                <tr>
                {columns && Array.isArray(columns) && columns.map(col => (
                  <th key={col} style={{border: "1px solid #ddd", padding: "8px",background: "#f4f4f4"}}>{col.toLocaleUpperCase()}</th>
                ))}
                </tr>
              </thead>
              <tbody>
              { data && data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col} style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {typeof row[col] === "object" && row[col] !== null
                        ? JSON.stringify(row[col])
                        : row[col] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
          </Table>     
        </div> 
        </Col>
        <Col xs={4}>
        <Form>
                        <Form.Group className="mb-3" controlId="formCate_name">
                          <Form.Label>cate_name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter cate name"
                            value={cate_name}
                            onChange={(e) => setCate_name(e.target.value)}
                            required
                          />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="formCate_desc">
                          <Form.Label>cate_desc</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={cate_desc}
                            onChange={(e) => setCate_desc(e.target.value)}
                            required
                          />
                        </Form.Group>
        
                        <div className="d-grid">
                          <Button onClick={() => Add_new_item()}>Edit</Button>
                        </div>
        </Form>

        {/*
        <Form.Label>cate_name</Form.Label>
        <Form.Control type="text" placeholder="Category Name" value={cate_name} onChange={(e) => setCate_name(e.target.value)} />
        <br />
        <Form.Label>cate_desc</Form.Label>
        <Form.Control type="text" placeholder="Category Description" value={cate_desc} onChange={(e) => setCate_desc(e.target.value)} />
        <br />
        <button onClick={() => Add_new_item()}>Edit</button>
        */}
        </Col>
      </Row>

      
        
     
    </Container>
  );
}   


export default User_management;