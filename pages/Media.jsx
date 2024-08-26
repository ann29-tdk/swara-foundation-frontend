import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import np1 from '../assets/images/np1.png';
import np2 from '../assets/images/np2.png';
import np3 from '../assets/images/np3.png';


const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover::before {
    content: attr(data-newspaper) " - " attr(data-date);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    font-size: 1rem;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  &.ReactModal__Content--after-open {
    opacity: 1;
    transform: translateY(0);
  }

  &.ReactModal__Content--before-close {
    opacity: 0;
    transform: translateY(-100%);
  }

  img {
    max-width: 90%;
    max-height: 90%;
    margin: auto;
  }
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  cursor: pointer;
  font-size: 24px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  font-family: 'Roboto', sans-serif;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: 'Open Sans', sans-serif;
`;

const Media = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the current image index

  const openModal = (index) => {
    setSelectedImageIndex(index); // Set the index of the image to be displayed
    setModalIsOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close the modal
  };

  const handleKeyDown = (event) => {
    if (modalIsOpen) {
      if (event.key === 'ArrowRight') { // Check if the right arrow key is pressed
        setSelectedImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1 // Loop to the next image or go back to the first image
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Add keydown event listener when the modal is open
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Clean up the event listener when the modal is closed
    };
  }, [modalIsOpen]); // Effect depends on the modal's open state

  const images = [
    { src: np1, newspaper: 'Jagran', date: '24-06-2019' },
    { src: np2, newspaper: 'Jagran', date: '01-07-2019' },
    { src: np3, newspaper: 'Utkarsh Mail', date: '22-07-2019' },
  ];
  

  return (
    <div>
      <Header>
        <Heading>News & Media</Heading>
        <Description>
          Explore our media gallery to see how our NGO is making a difference.
          These stories highlight our work and the impact we're making in the community.
          We are proud of the recognition we’ve received and are excited to share these moments with you.
        </Description>
      </Header>
      <MediaContainer>
        {images.map((image, index) => (
          <ImageWrapper
            key={index}
            data-newspaper={image.newspaper}
            data-date={image.date}
            onClick={() => openModal(index)} // Open modal with the clicked image's index
          >
            <img src={image.src} alt={`Media ${index + 1}`} />
          </ImageWrapper>
        ))}
      </MediaContainer>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        closeTimeoutMS={300}
        className="ReactModal__Content"
      >
        <CloseButton onClick={closeModal} />
        <img src={images[selectedImageIndex].src} alt={`Media ${selectedImageIndex + 1}`} /> {/* Display the selected image */}
      </StyledModal>
    </div>
  );
};

export default Media;
