import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

import { useNavigate, useLocation } from 'react-router-dom';

//import Product_cate_edit from './product_edit'

export const  B_dashboard_main = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
       console.log("--hello")
         
       }, []);
return (

    <div>
<div>
    
</div>
<div>

</div>
</div>

);

}
export default B_dashboard_main;
