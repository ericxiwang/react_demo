import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import HEADER from '../components/header'; 
import B_dashboard_main from '../components/b_dashboard_main'
//import A_dashboard_sidebar from '../components/a_dashboard_sidebar'


function B_dashboard_page()
{


 

    return(
<Container fluid>
        <Row>
            <HEADER />
        </Row>
        <Row>
            <Col md={2}>
         
            </Col>
            <Col md={9}>
            <B_dashboard_main />
            </Col>
        </Row>



    </Container>

    );

}

export default B_dashboard_page;