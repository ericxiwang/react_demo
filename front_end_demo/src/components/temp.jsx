import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form
} from "react-bootstrap";

const initialTickets = {
  DoneTickets: [
    { id: 4, title: "dashboard stuck", desc: "CSS error", status: "done", submitter: "admin", type: "bug" },
    { id: 6, title: "k8s cluster upgrade", desc: "upgrade kubeadm,kubectl etc", status: "done", submitter: "admin", type: "task" }
  ],
  InProgressTickets: [
    { id: 3, title: "system backup", desc: "new feature, for storage backup in vm", status: "inprogress", submitter: "admin", type: "story" },
    { id: 7, title: "nginx config", desc: "add rtmp plugin to nginx service", status: "inprogress", submitter: "admin", type: "task" }
  ],
  NewTickets: [
    { id: 1, title: "login page fix", desc: "login page html optimize", status: "new", submitter: "admin", type: "bug" },
    { id: 2, title: "performance improve", desc: "sys load speed up", status: "new", submitter: "admin", type: "task" },
    { id: 5, title: "disk compression", desc: "work with system backup feature", status: "new", submitter: "admin", type: "task" }
  ],
  ReviewTickets: [
    { id: 8, title: "kafka topic refine", desc: "refine kafka partiation and topic", status: "review", submitter: "admin", type: "task" }
  ]
};

// map status → group key
const statusToGroup = {
  new: "NewTickets",
  inprogress: "InProgressTickets",
  review: "ReviewTickets",
  done: "DoneTickets"
};

export default function TicketBoard() {
  const [tickets, setTickets] = useState(initialTickets);
  const [show, setShow] = useState(false);
  ///////////// add new //////////////
  const [isNew, setIsNew] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});

  const handleShowEdit = (ticket) => {
    setSelectedTicket(ticket);
    setFormData(ticket);
    setIsNew(false);
    setShow(true);
  };

  const handleShowNew = () => {
    setSelectedTicket(null);
    setFormData({
      id: Date.now(), // unique ID
      title: "",
      desc: "",
      status: "new",
      submitter: "admin",
      type: "task"
    });
    setIsNew(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedTicket(null);
    setIsNew(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedTickets = { ...tickets };

    if (isNew) {
      // Add new ticket
      const groupKey = statusToGroup[formData.status];
      updatedTickets[groupKey] = [...updatedTickets[groupKey], formData];
    } else {
      // Edit existing ticket
      const oldGroupKey = Object.keys(updatedTickets).find((key) =>
        updatedTickets[key].some((t) => t.id === selectedTicket.id)
      );

      updatedTickets[oldGroupKey] = updatedTickets[oldGroupKey].filter(
        (t) => t.id !== selectedTicket.id
      );

      const newGroupKey = statusToGroup[formData.status];
      updatedTickets[newGroupKey] = [...updatedTickets[newGroupKey], formData];
    }

    setTickets(updatedTickets);
    handleClose();
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleShowNew}>
            + Add Ticket
          </Button>
        </Col>
      </Row>

      <Row>
        {Object.entries(tickets).map(([groupName, groupTickets]) => (
          <Col key={groupName}>
            <h3>{groupName.replace(/([A-Z])/g, " $1")}</h3>
            {groupTickets.map((ticket) => (
              <Card key={ticket.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {ticket.type} | By: {ticket.submitter}
                  </Card.Subtitle>
                  <Button variant="info" onClick={() => handleShowEdit(ticket)}>
                    Details
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        ))}
      </Row>

      {/* Popup Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNew ? "Add Ticket" : "Edit Ticket"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="desc"
                  rows={3}
                  value={formData.desc || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type || ""}
                  onChange={handleChange}
                >
                  <option value="bug">Bug</option>
                  <option value="task">Task</option>
                  <option value="story">Story</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="inprogress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            {isNew ? "Add Ticket" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
