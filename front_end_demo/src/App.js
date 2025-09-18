import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_TEST from './components/api_test';
import LoginPage from './components/login_page';
import List_reverse from './components/api_list';
import LogoutButton from './components/logout';
import SSE from './components/sse';
import Home from './components/home';
import ProductEdit from './components/product_edit';


//import {Routes, Route, Link, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



function About() {
  const token = sessionStorage.getItem('token');
  if (token && token !="" && token !='undefined') {
  return <h1>About Page</h1>;
  } else {
    return <h1>Please login to view this page.</h1>;
  }
}




function App() {
  
  const token = sessionStorage.getItem('token');
  console.log("Token in App.js:", token);
  const isAuthenticated = !!sessionStorage.getItem("token");
  console.log("======================Is Authenticated:", isAuthenticated);
  

return (
 
    <Router>
 

    
      <Routes>
        {/* public route */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        {/* <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/product_edit" element={<ProductEdit />} /> 
        <Route path="/list_reverse" element={<List_reverse />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/api_test" element={<API_TEST />} />
        <Route path="/sse" element={<SSE />} />


        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirects any unmatched path to /404 */}
      </Routes>
    </Router>
   
 
  );
  


}

export default App;
