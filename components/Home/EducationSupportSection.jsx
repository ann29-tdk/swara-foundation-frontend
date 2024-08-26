import HomeText from "../../assets/images/HomeText.png"

import React, { useState, useEffect } from 'react';

const EducationSupportSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1012);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1012);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fullText = `Childhood is often celebrated as the most joyous phase of life, characterized by carefree days and a sense of security. However, this ideal does not reflect the harsh reality for many children who are out of school. Various factors, such as challenging socio-economic conditions and a lack of awareness in communities where education is not a priority, contribute to children dropping out of school.

Attending school not only secures a dignified future but also provides children with a safe environment to express themselves, learn, share, and grow. Unfortunately, children who drop out of school are often forced into child labor, early marriages, or become victims of child trafficking.

The Swara Foundation, through its initiative, is dedicated to helping children from underprivileged backgrounds continue their education. Our goal is to create a brighter future and a better life for these children. Currently, we are based in Delhi and are providing education directly to children in need. Despite numerous challenges, these young champions remain resilient, dreaming and striving for a better future.

With your support, we can nurture their dreams by providing accessible and quality education. Join us in ensuring a happy and safe childhood for all!`;

  const reducedText = `Childhood is often celebrated as the most joyous phase of life, characterized by carefree days and a sense of security. However, this ideal does not reflect the harsh reality for many children who are out of school. Various factors, such as challenging socio-economic conditions and a lack of awareness in communities where education is not a priority, contribute to children dropping out of school.

Attending school not only secures a dignified future but also provides children with a safe environment to express themselves, learn, share, and grow. Unfortunately, children who drop out of school are often forced into child labor, early marriages, or become victims of child trafficking.

The Swara Foundation, through its initiative, is dedicated to helping children from underprivileged backgrounds continue their education.`;

  const sectionStyle = {
    width: '100%',
    padding: '2rem 1rem',
    backgroundColor: 'white',
  };

  const headingStyle = {
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const paraStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    textAlign: 'justify'
  };

  const imgStyle = {
    height: '300px',
    width: '300px',
    objectFit: 'cover'
  };

  return (
    <div style={sectionStyle}>
      <h1 style={headingStyle}>Ensuring Every Child's Right to Education: The Swara Foundation's Mission</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <p style={paraStyle}>
              {isMobile ? reducedText : fullText}
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={HomeText}
              style={imgStyle}
              alt="Educational support"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSupportSection;
