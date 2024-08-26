import AboutHeader from "../../assets/images/AboutHeader.jpg"

import React from 'react';

const OverlaySection = () => {
  return (
    <div className="position-relative w-100 vh-100 d-flex justify-content-end align-items-center bg-dark">
      <img 
        src={AboutHeader}
        alt="Background" 
        className="img-fluid position-absolute w-100 h-100" 
        style={{ objectFit: 'cover', opacity: 0.5 }}
      />
      <div className="position-relative d-flex justify-content-center align-items-center text-white mr-2">
        <h1>Empowering Dreams, Enriching Lives</h1>
      </div>
    </div>
  );
};

export default OverlaySection;
