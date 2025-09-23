import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_TEST from './components/api_test';
import LoginPage from './components/login_page';
import List_reverse from './components/api_list';
import LogoutButton from './components/logout';
import SSE from './components/sse';
import A_dashboard_page from './pages/a_dashboard_page';
import B_dashboard_page from './pages/b_dashboard_page';
import ProductEdit from './components/product_edit';

import TestPage from './components/test'

import A_dashboard_workflow from './components/a_dashboard_workflow';
//import {Routes, Route, Link, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";




function App() {
  
  const token = sessionStorage.getItem('token');
  console.log("Token in App.js:", token);
  const isAuthenticated = !!sessionStorage.getItem("token");
  console.log("======================Is Authenticated:", isAuthenticated);
  

return (
 
    <Router>
 

    
      <Routes>

    
        <Route path="/a_dashboard" element={<A_dashboard_page />} />
        <Route path="/a_dashboard_workflow" element={<A_dashboard_workflow />} />




        <Route path="/a_stat" element={<ProductEdit />} /> 
        <Route path="/b_dashboard" element={<B_dashboard_page />} />    
        <Route path="/b_stat" element={<List_reverse />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/api_test" element={<API_TEST />} />
        <Route path="/sse" element={<SSE />} />
        <Route path="/test" element={<TestPage />} />

        <Route path="*" element={<Navigate to="/a_dashoboard_page" replace />} /> {/* Redirects any unmatched path to /404 */}
      </Routes>
    </Router>
   
 
  );
  


}

export default App;
