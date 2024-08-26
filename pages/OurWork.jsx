import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import pp from '../assets/images/pp.png';
import pp10 from '../assets/images/pp10.png';
import pp7 from '../assets/images/pp7.png';
import pp9 from '../assets/images/pp9.png';
import pp11 from '../assets/images/pp11.png';
import ppp from '../assets/images/ppp.png';
import bd from '../assets/images/bd.png';
import bd1 from '../assets/images/bd1.png';
import pp4 from '../assets/images/pp4.png';
import pp5 from '../assets/images/pp5.png';
import pp6 from '../assets/images/pp6.png';
import pp13 from '../assets/images/pp13.png';
import vr1 from '../assets/images/vr1.png';
import vr2 from '../assets/images/vr2.jpg';
import vr3 from '../assets/images/vr3.png';
import vr4 from '../assets/images/vr4.png';
import vr5 from '../assets/images/vr5.jpg';
import vr6 from '../assets/images/vr6.png';
import banner from '../assets/images/banner.jpg';
import cc03 from '../assets/images/cc03.png';
import cc02 from '../assets/images/cc02.png';
import ccc from '../assets/images/ccc.png';

// Styled components definitions

const FullWidthCarousel = styled(Carousel)`
  .carousel-item {
    height: 100vh;
    min-height: 300px;
    position: relative;
    overflow: hidden;
  }

  .carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
  }

  .carousel-item .dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .carousel-item:hover .dark-overlay {
    opacity: 1;
  }

  .carousel-caption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    opacity: 1;
  }

  .carousel-caption h3, .carousel-caption p {
    color: white;
  }
`;

const OurWorkContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 40px;
  &:before {
    content: "";
    display: block;
    width: 80px;
    height: 2px;
    background-color: #333;
    margin: 0 auto 20px;
  }
`;

const Quote = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Roboto', sans-serif;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
  font-family: 'Open Sans', sans-serif;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
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

  &:hover::after {
    content: attr(data-description);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    font-size: 1rem;
    opacity: 1;
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

const UpcomingActivities = styled.div`
  text-align: center;
`;

const OurWork = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isUpcomingImage, setIsUpcomingImage] = useState(false);

  const openModal = (index, isUpcoming = false) => {
    setSelectedImageIndex(index);
    setIsUpcomingImage(isUpcoming);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (modalIsOpen) {
      const arrayLength = isUpcomingImage ? upcomingImages.length : images.length;

      if (event.key === 'ArrowRight') {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === arrayLength - 1 ? 0 : prevIndex + 1
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === 0 ? arrayLength - 1 : prevIndex - 1
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen, isUpcomingImage]);

  const images = [
    { src: pp, description: 'Helping community members stay hydrated during intense heat.' },
    { src: pp10, description: 'Helping community members stay hydrated during intense heat.' },
    { src: pp7, description: 'Helping community members stay hydrated during intense heat.' },
    { src: pp9, description: 'Helping community members stay hydrated during intense heat.' },
    { src: pp11, description: 'Helping community members stay hydrated during intense heat.' },
    { src: ppp, description: 'Helping community members stay hydrated during intense heat.' },
    { src: bd, description: 'Highlighting the importance of education in modern India.' },
    { src: bd1, description: 'Highlighting the importance of education in modern India.' },
    { src: pp4, description: 'Highlighting the importance of education in modern India.' },
    { src: pp5, description: 'Highlighting the importance of education in modern India.' },
    { src: pp6, description: 'Highlighting the importance of education in modern India.' },
    { src: pp13, description: 'Highlighting the importance of education in modern India.' },
    { src: vr1, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
    { src: vr2, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
    { src: vr3, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
    { src: vr4, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
    { src: vr5, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
    { src: vr6, description: 'Promoting reforestation. Cultivating a greener and sustainable future.' },
  ];

  const upcomingImages = [
    { src: banner, description: 'Upcoming activities.' },
  ];

  const carouselImages = [
    { src: cc03, caption: 'Our Impact', description: 'Brightening futures and spreading smiles. See how your support transforms lives.' },
    { src: cc02, caption: 'Changing Lives', description: 'Bringing hope and joy to young lives. Witness the difference we make together.' },
    { src: ccc, caption: 'Together We Achieve', description: 'Collaboration and support are key to our success. Discover how our joint efforts are achieving remarkable results.' },
  ];

  return (
    <>
      <FullWidthCarousel controls={false} indicators interval={3000} pause="hover">
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={`Slide ${index + 1}`}
            />
            <div className="dark-overlay">
              <Carousel.Caption>
                <h3>{image.caption}</h3>
                <p>{image.description}</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </FullWidthCarousel>
      <OurWorkContainer>
        <Section>
          <Quote>"The strength of the community is each individual member. The strength of each member is the community."</Quote>
          <Description>We are dedicated to improving the lives of underprivileged communities. Below are some snapshots of our recent activities and events. Click on the images to view them in full size.</Description>
        </Section>
        <Section>
          <GalleryContainer>
            {images.map((image, index) => (
              <ImageWrapper
                key={index}
                data-description={image.description}
                onClick={() => openModal(index)}
              >
                <img src={image.src} alt={`Work ${index + 1}`} />
              </ImageWrapper>
            ))}
          </GalleryContainer>
        </Section>
        <Section>
          <UpcomingActivities>
            <GalleryContainer>
              {upcomingImages.map((img, index) => (
                <ImageWrapper
                  key={index}
                  data-description={img.description}
                  onClick={() => openModal(index, true)}
                >
                  <img src={img.src} alt={`Work ${index + 1}`} />
                </ImageWrapper>
              ))}
            </GalleryContainer>
            <h3>Upcoming Activities</h3>
            <p>Swara Foundation is organizing a donation camp to collect essential items for those in need. We invite you to join us in this noble cause by donating gently used clothes, shoes, toys, and stationery. Your contributions will go a long way in bringing smiles to the faces of the less fortunate. Every item you donate will be carefully distributed to those who need it most, helping to improve their lives and brighten their days. Let’s come together to make a difference and spread joy. For more information, please contact us at <span style={{ color: 'blue' }}>swarafoundationdel@gmail.com</span>
            </p>
          </UpcomingActivities>
        </Section>
        <StyledModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          closeTimeoutMS={300}
          className="ReactModal__Content"
        >
          <CloseButton onClick={closeModal} />
          <img
            src={isUpcomingImage ? upcomingImages[selectedImageIndex].src : images[selectedImageIndex].src}
            alt={`Work ${selectedImageIndex + 1}`}
          />
        </StyledModal>
      </OurWorkContainer>
    </>
  );
};

export default OurWork;
