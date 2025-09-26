import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/a_dashboard.css';

//import { useNavigate, useLocation } from 'react-router-dom';
import HEADER from '../components/header';  
import A_workflow_badge from '../components/a_workflow_badge';



import A_dashboard_sidebar from '../components/a_dashboard_sidebar'
import { useLocation } from 'react-router-dom';




export const  A_dashboard_page = () => {
    const location = useLocation();

    console.log(location.pathname); // e.g., "/about"

    useEffect(() => {
       console.log("helloaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
         
       }, []);
return (

    <Container fluid>
        <Row>
            <HEADER />
        </Row>
        <Row>
            <Col md={1}>
            <A_dashboard_sidebar />
            </Col>
            <Col md={11}>
            
           <A_workflow_badge />

              
          
             
           
         

            
            </Col>
        </Row>



    </Container>



);

}


export default A_dashboard_page;