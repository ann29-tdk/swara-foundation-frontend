import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DownloadModal = ({ show, handleClose, handleDownload }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const columns = [
    { name: 'First Name', key: 'firstName' },
    { name: 'Last Name', key: 'lastName' },
    { name: 'Email', key: 'email' },
    { name: 'Phone', key: 'phone' },
    { name: 'Description', key: 'description' },
    { name: 'Weight', key: 'weight' },
    { name: 'Address', key: 'address' },
    { name: 'Pincode', key: 'pincode' },
    { name: 'Date of Pickup', key: 'date' },
    { name: 'Time Slot', key: 'timeSlot' },
    { name: 'Status', key: 'status' },
    { name: 'Completed At', key: 'completedAt' },
    { name: 'Attended By', key: 'attendedBy' },
    { name: 'Remarks', key: 'pickupRemarks' }
  ];

  const handleCheckboxChange = (key) => {
    setSelectedColumns(prev =>
      prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
    );
    setSelectAll(columns.length === (selectedColumns.length + 1));
  };

  const handleSelectAllChange = () => {
    if (!selectAll) {
      setSelectedColumns(columns.map(col => col.key));
      setSelectAll(true);
    } else {
      setSelectedColumns([]);
      setSelectAll(false);
    }
  };

  const handleDownloadClick = () => {
    handleDownload(selectedColumns);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Columns to Download</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          {columns.map((col) => (
            <Form.Check
              key={col.key}
              type="checkbox"
              label={col.name}
              checked={selectedColumns.includes(col.key)}
              onChange={() => handleCheckboxChange(col.key)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadClick}>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadModal;
