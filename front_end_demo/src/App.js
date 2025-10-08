import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JS_DEMO from './components/js_demo';
import LoginPage from './components/login_page';
import List_reverse from './components/api_list';
import LogoutButton from './components/logout';
import SSE from './components/sse';
import A_dashboard_page from './pages/a_dashboard_page';
import A_workflow_page from './pages/a_workflow_page';
import B_dashboard_page from './pages/b_dashboard_page';
import ProductEdit from './components/product_edit';
import TestPage from './components/test'
import User_management from './pages/u_management';

//import {Routes, Route, Link, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/protect_route'



function App() {
  
  //const token = sessionStorage.getItem('token');
  //console.log("Token in App.js:", token);
  const isAuthenticated = !!sessionStorage.getItem("token");
  console.log("======================Is Authenticated:", isAuthenticated);



return (
 
    
      <Routes>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/a_dashboard" element={<ProtectedRoute><A_dashboard_page /></ProtectedRoute>} />
          <Route path="/a_workflow" element={ <ProtectedRoute><A_workflow_page /></ProtectedRoute>} />
          <Route path="/a_stat" element={<ProtectedRoute><ProductEdit /></ProtectedRoute>} /> 
          <Route path="/b_dashboard" element={<ProtectedRoute><B_dashboard_page /></ProtectedRoute>} />    
          <Route path="/b_stat" element={<ProtectedRoute><List_reverse /></ProtectedRoute>} />
          <Route path="/u_management" element={<ProtectedRoute><User_management /></ProtectedRoute>} />      
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/js_demo" element={<JS_DEMO />} />
          <Route path="/sse" element={<SSE />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<Navigate to="/a_dashboard" replace />} /> {/* Redirects any unmatched path to /404 */}
          <Route path="/" element={<Navigate to="/a_dashboard" replace />} /> {/* Redirects any unmatched path to /404 */}
    


      </Routes>

   
 
  );



}

export default App;
