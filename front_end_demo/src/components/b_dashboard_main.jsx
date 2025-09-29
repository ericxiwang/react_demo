import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Table } from "react-bootstrap";

import { useNavigate, useLocation } from 'react-router-dom';

//import Product_cate_edit from './product_edit'

export const  B_dashboard_main = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const navigate = useNavigate();
    const location = useLocation();
    const keywords = props.project_list_select;



    useEffect(() => {
       fetch("https://localhost:8080/api/v1/b_dashboard_main", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ key_words: keywords }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            setData(data);
            setLoading(false);
            
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
         
       }, [keywords]);


///////////////////////////////////////////
const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get unique categories & statuses for dropdowns
  const categories = [...new Set(data.map((b) => b.bug_category))];
  const statuses = [...new Set(data.map((b) => b.bug_status))];

  // Apply filters
  const filteredBugs = data.filter((bug) => {
    const matchesSearch =
      bug.bug_title.toLowerCase().includes(search.toLowerCase()) ||
      bug.bug_desc.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? bug.bug_status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? bug.bug_category === categoryFilter
      : true;

    return matchesSearch && matchesStatus && matchesCategory;
});

return (

   <div className="container mt-4">
      <h2>Bug List</h2>

      {/* Filter Bar */}
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {/* Bug Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Level</th>
            <th>Status</th>
            <th>Project</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {filteredBugs.map((bug) => (
            <tr key={bug.bug_id}>
              <td>{bug.bug_id}</td>
              <td>{bug.bug_title}</td>
              <td>{bug.bug_desc}</td>
              <td>{bug.bug_category}</td>
              <td>{bug.bug_level}</td>
              <td>{bug.bug_status}</td>
              <td>{bug.bug_project}</td>
              <td>{bug.bug_assignee}</td>
            </tr>
          ))}
          {filteredBugs.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No bugs found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

);

}
export default B_dashboard_main;
