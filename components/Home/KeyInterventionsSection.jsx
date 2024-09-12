import React from 'react';
import h1 from '../../assets/images/h-1.png'
import h2 from '../../assets/images/h-2.png'
import h3 from '../../assets/images/h-3.png'
import h4 from '../../assets/images/h-4.png'

const KeyInterventionsSection = () => {
  const sectionStyle = {
    width: '100%',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa'
  };

  const headingStyle = {
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const imgStyle = {
    maxWidth: '80%',
    height: '350px',
    width:'400px'
  };

  const rowStyle = {
    marginTop: '2rem',
    marginBottom: '2rem'
  };

  return (
    <div className="section-3" style={sectionStyle}>
      <h1 className="heading" style={headingStyle}>Key Interventions under Swara Foundation</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <img
              src={h1}
              style={imgStyle}
              alt="Education Support"
            />
          </div>
          <div className="col">
            <img
              src={h2}
              style={imgStyle}
              alt="Food Sharing"
            />
          </div>
        </div>
        <div className="row" style={rowStyle}>
          <div className="col">
            <img
              src={h3}
              style={imgStyle}
              alt="Education Support"
            />
          </div>
          <div className="col">
            <img
              src={h4}
              style={imgStyle}
              alt="Plantation Drive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInterventionsSection;
