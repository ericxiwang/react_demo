import React, { useState} from 'react';
import LogoutButton from './components/logout';
export const LoginForm = () => {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  const token = sessionStorage.getItem('token');
        const handleSubmit = () => {
            const opts = {
                method: 'POST',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify({ user_name: user_name, user_password: user_password 

                })
            };
            console.log(opts);
            fetch('https://localhost:8080/api/v1/auth', opts)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                sessionStorage.setItem('token', data.access_token);
                console.log(sessionStorage.getItem('token'));
                // Handle successful login here (e.g., store token, redirect, etc.)
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here (e.g., show error message to user)
            }); 




  };

  return (
    <div className="login-form">
        <h1>Login</h1>
        {token && token !="" && token !='undefined' ? (
            <div>
                <h2>Login Successful!</h2>
                <LogoutButton />
            </div>
        ) : (
        <div>
            <input type='text' placeholder='Username' value={user_name} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={user_password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button> 
            <div>admin@admin.com/1234</div> 
        </div>
        )
    }
    </div>
   
  );
}

export default LoginForm;

