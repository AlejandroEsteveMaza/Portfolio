import "./Contact.css";
import React from 'react';

function Contact() {
  return (
    <div className="Contact-container">
      <h2 className="Contact-title">Contact</h2>
      <h3 className="Contact-subtitle">
        If you are intrested in <span>hiring</span> me, <span>call</span> me,
        <span> email</span> me or <span>connect</span> with me via
        LinkedIn!
      </h3>
      <div className="Contact-card">
        <div className="Contact-link">
          <a href="tel:+34605628264" target="_blank" rel="noreferrer">
            <i className="bx bx-md bxs-phone"></i>
          </a>
          <p>+34 605628264</p>
        </div>
        <div className="Contact-link">
          <a
            href="mailto: alex.esteve98@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bx-md bxs-envelope"></i>
          </a>
          <p>alex.esteve98@gmail.com</p>
        </div>
        <div className="Contact-link">
          <a
            href="https://www.linkedin.com/in/alejandro-esteve-maza/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bx-md bxl-linkedin-square"></i>
          </a>
          <p>Alejandro Esteve Maza</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
