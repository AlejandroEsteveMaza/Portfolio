import "./Resume.css";
import React from 'react';

function Resume() {
    return (
        <section id="resume" className="Resume-container">
            <div className="Resume-title">
                <h2>Resume</h2>
            </div>
            <div className="Resume">
                <iframe src="public\aemCV.pdf"></iframe>
            </div>
        </section>
    );
}

export default Resume;
