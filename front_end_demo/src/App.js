import React from 'react';
import API_TEST from './components/api_test';
import './App.css';
import LoginPage from './components/login_form';
import List_reverse from './components/api_list';
import LogoutButton from './components/logout';
import SSE from './components/sse';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Top_banner from './components/header';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';


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
  console.log("App token:", token);
  if (token && token !="" && token !='undefined')  // Check for valid token
  {
    console.log("User is logged in");
    return (
 
    <BrowserRouter>
      {/* Navigation */}
      <div>
        <Top_banner />
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/list_reverse" element={<List_reverse />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/api_test" element={<API_TEST />} />
        <Route path="/sse" element={<SSE />} />
        <Route path="*" element={<Navigate to="/about" replace />} /> {/* Redirects any unmatched path to /404 */}
      </Routes>
    </BrowserRouter>
   
  );
  } 
  else //
  {

    return (
      <div>
        <LoginPage />  // Show login page if not logged in
      </div>
      );
  }


}

export default App;
