import React from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash, FaUndo, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';

const DonationTable = ({ donations, completeDonation, handleEdit, handleOpenWarningModal, restoreDonation, deleteDonation }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date of Request</th>
          <th>Description</th>
          <th>Weight</th>
          <th>Address</th>
          <th>Date of Pickup</th>
          <th>Time Slot</th>
          <th>Status</th>
          <th>Completed At</th>
          <th>Attended By</th>
          <th>Remarks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {donations.map(donation => (
          <tr key={donation._id}>
            <td>{donation.firstName}</td>
            <td>{donation.lastName}</td>
            <td>{donation.email}</td>
            <td>{donation.phone}</td>
            <td>{moment(donation.dateOfRequest).format('DD-MM-YYYY h:mm A')}</td>
            <td>{donation.description}</td>
            <td>{donation.weight}</td>
            <td>{donation.address}-{donation.pincode}</td>
            <td>{moment(donation.date).format('DD-MM-YYYY')}</td>
            <td>{donation.timeSlot.split('-').map(time =>
              moment(time, 'HH').format('h A')
            ).join(' - ')}</td>
            <td>{donation.status}</td>
            <td>{donation.completedAt ? moment(donation.completedAt).format('DD-MM-YYYY h:mm A') : ''}</td>
            <td>{donation.attendedBy}</td>
            <td>{donation.pickupRemarks}</td>
            <td style={{ whiteSpace: 'nowrap' }}>
              {donation.status !== 'Completed' && !donation.deleted && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-complete-${donation._id}`}>Mark as complete</Tooltip>}
                >
                  <span>
                    <FaCheck
                      style={{ cursor: 'pointer', color: 'green', marginRight: '8px' }}
                      onClick={() => completeDonation(donation._id)}
                    />
                  </span>
                </OverlayTrigger>
              )}
              {!donation.deleted && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-edit-${donation._id}`}>Edit row</Tooltip>}
                >
                  <span>
                    <FaEdit
                      style={{ cursor: 'pointer', color: 'orange', marginRight: '8px' }}
                      onClick={() => handleEdit(donation)}
                    />
                  </span>
                </OverlayTrigger>
              )}
              {!donation.deleted && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-trash-${donation._id}`}>Move to trash</Tooltip>}
                >
                  <span>
                    <FaTrash
                      style={{ cursor: 'pointer', color: 'red', marginRight: '8px' }}
                      onClick={() => handleOpenWarningModal(donation._id)}
                    />
                  </span>
                </OverlayTrigger>
              )}
              {donation.deleted && (
                <>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-restore-${donation._id}`}>Restore donation</Tooltip>}
                  >
                    <span>
                      <FaUndo
                        style={{ cursor: 'pointer', color: 'blue', marginRight: '8px' }}
                        onClick={() => restoreDonation(donation._id)}
                      />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-delete-${donation._id}`}>Delete permanently</Tooltip>}
                  >
                    <span>
                      <FaTrashAlt
                        style={{ cursor: 'pointer', color: 'darkred' }}
                        onClick={() => deleteDonation(donation._id)}
                      />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DonationTable;
