import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {

    // Remove the JWT from session storage

    console.log("before logout=====>",sessionStorage.getItem('token'))
    sessionStorage.removeItem('token');
    // Optionally, redirect the user or update application state
    // For example, navigate to a login page:
    // history.push('/login');
    console.log("after logout=====>",sessionStorage.getItem('token'))
    console.log('JWT removed from session storage.');
    navigate("/login");



  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;