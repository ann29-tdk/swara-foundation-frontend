import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className="nav nav-pills nav-fill bg-warning mb-5 d-none d-md-flex">
        <a className="nav-link" href="#our-story">Our Story</a>
        <a className="nav-link" href="#vision">Vision</a>
        <a className="nav-link" href="#mission">Mission</a>
        <a className="nav-link" href="#how-we-work">How We Work</a>
      </nav>
      <div className="d-md-none mb-5">
        <div className="nav flex-column nav-pills text-center">
          <a className="nav-link bg-warning" href="#our-story">Our Story</a>
          <a className="nav-link bg-warning" href="#vision">Vision</a>
          <a className="nav-link bg-warning" href="#mission">Mission</a>
          <a className="nav-link bg-warning" href="#how-we-work">How We Work</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
