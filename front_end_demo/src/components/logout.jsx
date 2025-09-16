import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function LogoutButton() {
  const handleLogout = () => {
    // Remove the JWT from session storage
    sessionStorage.removeItem('token');
    // Optionally, redirect the user or update application state
    // For example, navigate to a login page:
    // history.push('/login');
    console.log('JWT removed from session storage.');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;