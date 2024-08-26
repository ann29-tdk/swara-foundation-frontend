import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import DonationList from './DonationList';
import { useAuth0 } from '@auth0/auth0-react';
import DownloadModal from './DownloadModal.jsx';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { logout } = useAuth0();
  const [downloadModalShow, setDownloadModalShow] = useState(false);
  const [emailModalShow, setEmailModalShow] = useState(false); // State for email modal
  const [message, setMessage] = useState('');

  const handleDownload = async (selectedColumns) => {
    try {
      const response = await fetch('https://swara-foundation-backend.onrender.com/api/donations/download/excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columns: selectedColumns })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'donations.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('There was an error downloading the file:', error);
    }
  };

  const sendEmails = async (message) => {
    try {
      const response = await fetch('https://swara-foundation-backend.onrender.com/api/donations/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      toast.success('Emails sent successfully');
    } catch (error) {
      toast.error('Failed to send emails');
    }
  };
  

  const handleSendEmails = () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }
    sendEmails(message);
    setMessage('');
    setEmailModalShow(false);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/admin">Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/completed">Completed</Nav.Link>
              <Nav.Link as={Link} to="/admin/trash">Trash</Nav.Link>
            </Nav>
            <Button 
              onClick={() => logout({ returnTo: window.location.origin })}
              variant="danger"
              className="ms-auto"
            >
              Logout
            </Button>
            <Button 
              onClick={() => setDownloadModalShow(true)}
              variant="primary"
              className="ms-2"
            >
              Download Data
            </Button>
            <Button 
              onClick={() => setEmailModalShow(true)} // Open email modal
              variant="secondary"
              className="ms-2"
            >
              Send Email to All
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="mt-3">
        <Routes>
          <Route path="/" element={<DonationList type="uncompleted" />} />
          <Route path="completed" element={<DonationList type="completed" />} />
          <Route path="trash" element={<DonationList type="trash" />} />
        </Routes>
      </Container>
      <DownloadModal 
        show={downloadModalShow}
        handleClose={() => setDownloadModalShow(false)}
        handleDownload={handleDownload}
      />
      <Modal show={emailModalShow} onHide={() => setEmailModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Email to All</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your custom message here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEmailModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendEmails}>
            Send Emails
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
