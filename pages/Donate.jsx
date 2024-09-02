import qr from "../assets/images/upi.png"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';
import moment from 'moment/moment';
import { Alert } from 'react-bootstrap';

const DonateContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.05rem;
  margin-bottom: 30px;
`;

const DonateSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const DonateHalf = styled.div`
  flex: 1 1 45%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const LeftHalf = styled(DonateHalf)`
  height: auto;
`;

const RightHalf = styled(DonateHalf)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const QRCode = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CheckButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const CheckSection = styled.div`
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputGroupText = styled.span`
  padding: 10px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const WarningText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
  transform: translate(10px, 20px);
  @media (max-width: 768px) {
    transform: translateX(1px);
  }
`;

const Donate = () => {
  const [pincode, setPincode] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isValidPincode, setIsValidPincode] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
    weight: '',
    address: '',
    pincode: '',
    date: '',
    timeSlot: ''
  });
  const [phoneValid, setPhoneValid] = useState(true);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [selectedDate, setSelectedDate] = useState(formData.date);

  const navigate = useNavigate();
  const validPincodes = [
    110010, 110016, 110021, 110023, 110028, 110029, 110030, 110037, 110038, 110043,
    110045, 110046, 110047, 110057, 110061, 110064, 110067, 110068, 110070, 110071,
    110072, 110073, 110074, 110075, 110077, 110078
  ];

  useEffect(() => {
    // Update currentHour whenever the component mounts or when the date changes to today
    if (selectedDate === new Date().toISOString().split('T')[0]) {
      setCurrentHour(new Date().getHours());
    }
  }, [selectedDate]);

  const handlePincodeCheck = () => {
    if (validPincodes.includes(parseInt(pincode))) {
      setIsValidPincode(true);
      setShowForm(true);
      setFormData(prevState => ({
        ...prevState,
        pincode: pincode
      }));
    } else {
      setIsValidPincode(false);
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    if (id === 'phone') {
      if (!value.match('^[0-9]{10}$')) {
        setPhoneValid(false);
      } else {
        setPhoneValid(true);
        toast.success('Phone Number is valid!');
      }
    }

    if (id === 'date') {
      setSelectedDate(value);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.get('https://swara-foundation-backend.onrender.com/api/donations/check-availability', {
        params: { date: formData.date, timeSlot: formData.timeSlot, pincode: formData.pincode }
      });
      return response.data.available;
    } catch (error) {
      console.error('Error checking availability', error);
      toast.error('Error checking availability');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected date is today
    const today = new Date().toISOString().split('T')[0];
    if (formData.date === today) {
      const selectedHour = parseInt(formData.timeSlot.split('-')[0]);
      if (currentHour >= selectedHour) {
        toast.error('The selected time slot has already passed. Please choose a different time slot.');
        return;
      }
    }

    // Immediately clear the fields upon submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      description: '',
      weight: '',
      address: '',
      pincode: '',
      date: '',
      timeSlot: ''
    });

    // Check availability before proceeding with the submission to the server
    const isAvailable = await checkAvailability();
    if (!isAvailable) {
      toast.error('Time slot already booked, please choose another.');
      return;
    }

    try {
      const response = await axios.post('https://swara-foundation-backend.onrender.com/api/donations', formData);
      console.log('Server response:', response);
  
      if (response.status === 201) {
        toast.success('Form submitted successfully!');
        // Delay the navigation to give users feedback before they are redirected
        setTimeout(() => {
          navigate('/'); // Navigate to home or confirmation page
        }, 2000);
      } else {
        toast.error('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  // Helper function to check if a time slot should be disabled
  const isDisabled = (startHour) => {
    // If the selected date is today and the current time has passed the start hour, disable the slot
    if (selectedDate === new Date().toISOString().split('T')[0]) {
      return currentHour >= startHour;
    }
    // If the selected date is not today, do not disable any slots
    return false;
  };

  return (
    <DonateContainer>
      <Heading>Help Us Empower Lives: Give Today</Heading>
      <Description>Your generous donations of clothing, monetary contributions, or books can create a profound impact on those in need. As an established organization dedicated to making a difference, we invite you to support our mission by contributing items in usable condition. We accept a variety of essential items, including <b>clothing, toys, shoes, blankets, stationery, bedsheets, non-perishable food, school supplies, water bottles, and lunchboxes</b>. Join us in our ongoing efforts to uplift and support our community—your contributions truly make a difference.</Description>
      <DonateSection>
        <LeftHalf>
          <SubHeading>Importance of Donation</SubHeading>
          <QRCode src={qr} alt="UPI QR Code" />
          <Description>Scan the QR code to donate. Your generosity helps us reach more people in need.</Description>
        </LeftHalf>
        <RightHalf>
          <SubHeading>Check Availability in Your Area</SubHeading>
          <CheckSection>
            <form>
              <StyledInput 
                type="text" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                placeholder="Enter your 6-digit pincode" 
              />
              <CheckButton type="button" onClick={handlePincodeCheck}>Check</CheckButton>
            </form>
            {isValidPincode === false && (
              <Alert variant="warning">Sorry, we are not available in your area yet. Ship your donations here: A-18, GROUND FLOOR, VIKAS VIHAR, KAKROLA, DWARKA SECTOR-15, NEW DELHI-110078</Alert>
            )}
          </CheckSection>
          {showForm && (
            <form className="donation-form mt-3" onSubmit={handleSubmit}>
              <SubHeading>Donation Form</SubHeading>
              <FormGrid>
                <StyledSelect id="title" value={formData.title} onChange={handleChange} required>
                  <option value="">Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Other">Other</option>
                </StyledSelect>
                <StyledInput type="text" id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <StyledInput type="text" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <StyledInput type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <StyledInput type="tel" id="phone" placeholder="(+91 IN) Phone Number" value={formData.phone} onChange={handleChange} required />
                {!phoneValid && (
                  <WarningText>Phone number must be exactly 10 digits.</WarningText>
                )}
                <FullWidth>
                  <StyledInput type="text" id="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                </FullWidth>
                <StyledInput type="text" id="pincode" placeholder="Pincode" value={formData.pincode} readOnly hidden />
                <FullWidth>
                  <StyledTextarea id="description" placeholder="Description about donation" value={formData.description} onChange={handleChange} required />
                </FullWidth>
                <StyledSelect id="weight" value={formData.weight} onChange={handleChange} required>
                  <option value="">Select weight</option>
                  <option value="0-5kg">0-5 kg</option>
                  <option value="5-10kg">5-10 kg</option>
                  <option value="10-20kg">10-20 kg</option>
                  <option value="20+kg">20+ kg</option>
                </StyledSelect>
                <StyledSelect id="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                  <option value="">Select time slot</option>
                  <option value="11-13" disabled={isDisabled(11)}>11 AM - 1 PM</option>
                  <option value="13-15" disabled={isDisabled(13)}>1 PM - 3 PM</option>
                  <option value="15-17" disabled={isDisabled(15)}>3 PM - 5 PM</option>
                  <option value="17-19" disabled={isDisabled(17)}>5 PM - 7 PM</option>
                </StyledSelect>
                <FullWidth>
                  <StyledInput type="date" id="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                </FullWidth>
              </FormGrid>
              <SubmitButton type="submit" disabled={formData.phone.length !== 10}>Submit</SubmitButton>
            </form>
          )}
        </RightHalf>
      </DonateSection>
    </DonateContainer>
  );
};

export default Donate;
