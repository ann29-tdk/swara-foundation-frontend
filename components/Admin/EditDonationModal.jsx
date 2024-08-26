import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 800px;
    margin: 1.75rem auto;
  }

  .modal-content {
    border-radius: 15px;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-body {
    padding: 20px 10px;
  }

  .modal-footer {
    border-top: none;
    padding: 10px 10px;
  }
`;

const ClassyForm = styled(Form)`
  .form-group {
    margin-bottom: 1rem;
  }

  .form-label {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  .form-control {
    border-radius: 0.5rem;
    box-shadow: none;
    border: 1px solid #ccc;
    padding: 10px;
  }

  .form-control:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const EditDonationModal = ({ show, handleClose, handleSaveChanges, handleChange, editDonation }) => {
  return (
    <StyledModal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Donation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editDonation && (
          <ClassyForm>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editDonation.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    as="select"
                    value={editDonation.weight}
                    onChange={handleChange}
                  >
                    <option value="0-5kg">0-5 kg</option>
                    <option value="5-10kg">5-10 kg</option>
                    <option value="10-20kg">10-20 kg</option>
                    <option value="20+kg">20+ kg</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="date">
                  <Form.Label>Date of Pickup</Form.Label>
                  <Form.Control
                    type="date"
                    value={editDonation.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="timeSlot">
                  <Form.Label>Time Slot</Form.Label>
                  <Form.Control
                    as="select"
                    value={editDonation.timeSlot}
                    onChange={handleChange}
                  >
                    <option value="7-8">7-8 AM</option>
                    <option value="8-9">8-9 AM</option>
                    <option value="9-10">9-10 AM</option>
                    <option value="10-11">10-11 AM</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={editDonation.status}
                    onChange={handleChange}
                  >
                    <option value="Uncomplete">Uncomplete</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="completedAt">
                  <Form.Label>Completed At</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={editDonation.completedAt ? moment(editDonation.completedAt).format('YYYY-MM-DDTHH:mm') : ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="attendedBy">
                  <Form.Label>Attended By</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.attendedBy}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="pickupRemarks">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDonation.pickupRemarks}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
          </ClassyForm>
        )}
      </Modal.Body>
    </StyledModal>
  );
};

export default EditDonationModal;
