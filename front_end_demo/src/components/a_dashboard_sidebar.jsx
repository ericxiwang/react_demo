import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



function A_dashboard_sidebar() {
  return (
    <div className="bg-primary text-white p-3" style={{ width: '200px', height: '90vh' }}>


      <Nav className="flex-column">
        <Nav.Link href="/a_dashboard" className="text-white">Dashboard</Nav.Link>
        <Nav.Link href="/a_workflow" className="text-white">WorkFlow</Nav.Link>
        <Nav.Link href="/project" className="text-white">Project</Nav.Link>
       
      </Nav>
    </div>
  );
}

export default A_dashboard_sidebar;