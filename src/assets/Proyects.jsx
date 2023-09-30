import "./Proyects.css";
import React from 'react';

function Proyects() {
  return (
    <section id="projects" className="Proyects-container">
      <div className="Proyects-title">
        <h2>My Projects</h2>
      </div>
      <div className="Proyects-card-container">
        <div className="proyect-1 proyect-container">
          <div className="left">
            <div className="top">
              <h3 className="proyect-title">PROJECT TITLE 1 &#128170;</h3>
              <p className="proyect-description">
                Project Description 1.
              </p>
            </div>
            <div className="bottom">
              <h3>Tech used</h3>
              <div className="proyect-skills">
                <div className="skill-a"></div>
                <div className="skill-c"></div>
                <div className="skill-g"></div>
              </div>
            </div>
          </div>
          <div className="right">
            <a
              className="img-link"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div className="img-proyect-1"></div>
            </a>
            <div className="proyect-links">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bx-globe"></i>
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bxl-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="proyect-2 proyect-container">
          <div className="right">
            <a
              className="img-link"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div className="img-proyect-2"></div>
            </a>
            <div className="proyect-links">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bx-globe"></i>
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bxl-github"></i>
              </a>
            </div>
          </div>
          <div className="left">
            <div className="top">
              <h3 className="proyect-title">PROJECT TITLE 2 🎥</h3>
              <p className="proyect-description">
              Project Description 2.
              </p>
            </div>

            <div className="bottom">
              <h3>Tech used</h3>
              <div className="proyect-skills">
                <div className="skill-a"></div>
                <div className="skill-g"></div>
                <div className="skill-e"></div>
                <div className="skill-f"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="proyect-3 proyect-container">
          <div className="left">
            <div className="top">
              <h3 className="proyect-title">PROJECT TITLE 3 &#127925;</h3>
              <p className="proyect-description">
              Project Description 2.
              </p>
            </div>
            <div className="bottom">
              <h3>Tech used</h3>
              <div className="proyect-skills">
                <div className="skill-a"></div>
                <div className="skill-c"></div>
                <div className="skill-g"></div>
              </div>
            </div>
          </div>
          <div className="right">
            <a
              className="img-link"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div className="img-proyect-3"></div>
            </a>
            <div className="proyect-links">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bx-globe"></i>
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bxl-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="proyect-4 proyect-container">
          <div className="right">
            <a
              className="img-link"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div className="img-proyect-4"></div>
            </a>
            <div className="proyect-links">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bx-globe"></i>
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-sm bxl-github"></i>
              </a>
            </div>
          </div>
          <div className="left">
            <div className="top">
              <h3 className="proyect-title">PROJECT TITLE 4 &#128221;</h3>
              <p className="proyect-description">
              Project Description 4.
              </p>
            </div>

            <div className="bottom">
              <h3>Tech used</h3>
              <div className="proyect-skills">
                <div className="skill-a"></div>
                <div className="skill-c"></div>
                <div className="skill-e"></div>
                <div className="skill-g"></div>
                <div className="skill-h"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Proyects;
