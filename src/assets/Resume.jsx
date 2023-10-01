import "./Resume.css";
import React from 'react';

function Resume() {
    const pdfUrl = '/AlejandroEsteveMazaCV.pdf';
    const downloadResume = () => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <section id="resume" className="Resume-container">
            <div className="Resume-title">
                <h2>Resume</h2>
            </div>
            <div className="Resume">
                <iframe src="https://docs.google.com/document/d/1oKdDaLbbBmsTXKk-raCG5xBw1JbLD0et/preview"></iframe>
            </div>
            <button  className="btn-download" onClick={downloadResume}>Download PDF</button>
        </section>
    );
}

export default Resume;
