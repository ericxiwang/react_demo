import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Header from "../components/header";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    user_name: "",
    email: "",
    group_id: "",
  });

  const [newUser, setNewUser] = useState({
    user_name: "",
    email: "",
    group_id: 1,
    user_password: "",
  });

  // ✅ Fetch users from Flask API
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/v1/user_ops/all", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Unable to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =============================
  // Edit handlers
  // =============================
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData(user);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch("/api/v1/user_ops/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchUsers();
        setShowEdit(false);
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // =============================
  // Delete handler
  // =============================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch("/api/v1/user_ops/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // =============================
  // Add user handlers
  // =============================
  const handleAddUser = () => {
    setNewUser({ user_name: "", email: "", group_id: 1, user_password: "" });
    setShowAdd(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddSave = async () => {
    try {
      const res = await fetch("/api/v1/user_ops/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setShowAdd(false);
        await fetchUsers();
      } else {
        alert("Failed to add user");
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h3 className="mb-3">User List</h3>

        {/* Add User Button */}
        <Button variant="success" className="mb-3" onClick={handleAddUser}>
          ➕ Add User
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Group ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.user_name}</td>
                  <td>{u.email}</td>
                  <td>{u.group_id}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* 🪟 Edit Modal */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Group ID</Form.Label>
                <Form.Control
                  name="group_id"
                  type="number"
                  value={formData.group_id}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 🪟 Add Modal */}
        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  name="user_name"
                  value={newUser.user_name}
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Group ID</Form.Label>
                <Form.Control
                  name="group_id"
                  type="number"
                  value={newUser.group_id}
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="user_password"
                  type="password"
                  value={newUser.user_password}
                  onChange={handleAddChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddSave}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserList;
