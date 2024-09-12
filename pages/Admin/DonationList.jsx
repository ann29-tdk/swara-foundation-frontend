import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'sonner';
import moment from 'moment';
import FilterForm from '../../components/Admin/FilterForm';
import DonationTable from '../../components/Admin/DonationTable';
import EditDonationModal from '../../components/Admin/EditDonationModal';
import WarningModal from '../../components/Admin/WarningModal';

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`); // Adjust the URL as necessary

const DonationList = ({ type }) => {
  const [donations, setDonations] = useState([]);
  const [monthFilter, setMonthFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [editDonation, setEditDonation] = useState(null);
  const [deleteDonationId, setDeleteDonationId] = useState(null);


  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations', error);
      toast.error('Error fetching donations');
    }
  };

  useEffect(() => {
    fetchDonations();
    socket.on('donationAdded', (newDonation) => {
      setDonations((prevDonations) => [...prevDonations, newDonation]);
      toast.success('New donation added');
      window.location.reload();
    });

    // Cleanup on unmount
    return () => {
      socket.off('donationAdded');
    };
  }, []);

  const deleteDonation = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/delete`);
      fetchDonations();
      toast.success('Moved to trash');
    } catch (error) {
      toast.error('Failed to move to trash');
    }
  };

  const completeDonation = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/complete`);
      fetchDonations();
      toast.success('Marked as completed');
    } catch (error) {
      toast.error('Failed to mark donation as completed');
    }
  };

  const restoreDonation = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/restore`);
      fetchDonations();
      toast.success('Restored from trash');
    } catch (error) {
      toast.error('Failed to restore donation');
    }
  };

  const handleMonthFilterChange = (e) => {
    setMonthFilter(e.target.value);
  };

  const handleYearFilterChange = (e) => {
    setYearFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterDonations = (donations) => {
    let filteredDonations = donations.filter(donation => donation.deleted === (type === 'trash'));

    if (type === 'completed') {
      filteredDonations = filteredDonations.filter(donation => donation.status === 'Completed');
    } else if (type === 'uncompleted') {
      filteredDonations = filteredDonations.filter(donation => donation.status !== 'Completed' && !donation.deleted);
    }

    if (monthFilter !== 'all') {
      filteredDonations = filteredDonations.filter(donation => moment(donation.date).month() + 1 === parseInt(monthFilter));
    }

    if (yearFilter !== 'all') {
      filteredDonations = filteredDonations.filter(donation => moment(donation.date).year() === parseInt(yearFilter));
    }

    if (searchQuery) {
      filteredDonations = filteredDonations.filter(donation =>
        Object.values(donation).some(val =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filteredDonations;
  };

  const handleEdit = (donation) => {
    setEditDonation(donation);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditDonation(null);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${editDonation._id}`, editDonation);
      fetchDonations();
      setShowEditModal(false);
      toast.success('Donation updated successfully');
    } catch (error) {
      toast.error('Failed to update donation');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditDonation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleOpenWarningModal = (id) => {
    setDeleteDonationId(id);
    setShowWarningModal(true);
  };

  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
    setDeleteDonationId(null);
  };

  const handleConfirmDelete = () => {
    deleteDonation(deleteDonationId);
    setShowWarningModal(false);
  };

  const filteredDonations = filterDonations(donations);

  return (
    <div className="m-3">
      <FilterForm 
        monthFilter={monthFilter} 
        yearFilter={yearFilter} 
        handleMonthFilterChange={handleMonthFilterChange} 
        handleYearFilterChange={handleYearFilterChange} 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange}
      />
      <DonationTable 
        donations={filteredDonations} 
        completeDonation={completeDonation} 
        handleEdit={handleEdit} 
        handleOpenWarningModal={handleOpenWarningModal} 
        restoreDonation={restoreDonation} 
        deleteDonation={deleteDonation}
      />
      <EditDonationModal 
        show={showEditModal} 
        handleClose={handleCloseEditModal} 
        handleSaveChanges={handleSaveChanges} 
        handleChange={handleChange} 
        editDonation={editDonation}
      />
      <WarningModal 
        show={showWarningModal} 
        handleClose={handleCloseWarningModal} 
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default DonationList;

