import React from 'react';

const ContentSection = ({ id, title, text, imgSrc, reverse }) => {
  return (
    <section id={id} className="mb-5">
      <div className={`row align-items-center ${reverse ? 'flex-md-row-reverse' : ''}`}>
        <div className="col-md-6">
          <img src={imgSrc} alt={title} className="img-fluid" style={{width:"500px", height:"500px"}}/>
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
