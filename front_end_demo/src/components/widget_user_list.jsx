import React, { useEffect, useState } from "react";
import { Form, Card } from "react-bootstrap";

function UserSelect() {
const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


     useEffect(() => {
        fetch('https://localhost:8080/api/v1/all_user',{method:'POST'})
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       console.log("User List:", data);
       setUsers(data);
   
   
       
     })
     .catch(error => {
       setError(error);
       setLoading(false);
     });
     }, []);


  const userDetails = users.find((u) => u.id.toString() === selectedUser);

  return (
    <div>
      <Form.Select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Choose a User --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.user_name}
          </option>
        ))}
      </Form.Select>

      {userDetails && (
        <Card className="mt-3 shadow-sm">
          <Card.Body>
            <Card.Title>{userDetails.user_name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {userDetails.email} <br />
              <strong>User ID:</strong> {userDetails.id}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
export default UserSelect;