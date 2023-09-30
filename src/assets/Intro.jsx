import "./Intro.css";
import React from 'react';

function Intro() {
  return (
    <section id="home" className="intro-section">
      <div className="intro-top">
        <div className="intro-title">
          <h1>Full Stack Developer.</h1>
          <p className="intro-p">
            Hi, I'm <span>Alejandro Esteve Maza</span>. <br />A passionate Full Stack
            Developer from Spain.
          </p>
          <ul className="intro-ul">
            <li>
              <a
                className="intro-links"
                href="https://www.linkedin.com/in/alejandro-esteve-maza/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-md bxl-linkedin-square"></i>
              </a>
            </li>
            <li>
              <a
                className="intro-links"
                href="https://github.com/AlejandroEsteveMaza"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-md bxl-github"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="intro-img"></div>
      </div>
      <div className="intro-skills">
        <div>
          <h3>My Skills</h3>
        </div>
        <div className="skills">
          <div className="skill-a"></div>
          <div className="skill-b"></div>
          <div className="skill-c"></div>
          <div className="skill-d"></div>
          <div className="skill-e"></div>
          <div className="skill-f"></div>
          <div className="skill-g"></div>
          <div className="skill-h"></div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
