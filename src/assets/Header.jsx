import { useState } from "react";
import "./Header.css";
import { Link } from "react-scroll";
import React from 'react';

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
    setAnimate(!animate);
  };

  const handleLinkClick = () => {
    setIsActive(false);
    setAnimate(!animate);
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-h2">AEM</h2>
          <ul className="nav-ul">
            <li>
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="resume"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                RESUME
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                CONTACT
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={handleHamburgerClick}>
            <div className={`bar1 ${animate ? "firstAnimateBar1" : ""}`}></div>
            <div className={`bar2 ${animate ? "firstAnimateBar2" : ""}`}></div>
            <div className={`bar3 ${animate ? "firstAnimateBar3" : ""}`}></div>
          </div>
        </nav>
      </header>
      <nav className={`mobile-nav ${isActive ? "active" : ""}`}>
        <a href="#home" onClick={handleLinkClick}>
          HOME
        </a>
        <a href="#about" onClick={handleLinkClick}>
          ABOUT
        </a>
        <a href="#resume" onClick={handleLinkClick}>
          RESUME
        </a>
        <a href="#contact" onClick={handleLinkClick}>
          CONTACT
        </a>
      </nav>
    </>
  );
}

export default Header;
