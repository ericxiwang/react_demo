import React from 'react';

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
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;