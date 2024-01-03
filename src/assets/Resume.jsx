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
                <iframe src="https://drive.google.com/file/d/1TNmlqYql13guORa9xN_zHIcp-cxn_wz6/preview"></iframe>
            </div>
            <button  className="btn-download" onClick={downloadResume}>Download PDF</button>
        </section>
    );
}

export default Resume;
