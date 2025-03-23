import "./Resume.css";
import React from 'react';

function Resume() {
    const googleDriveFileId = '1IurDW4tSqNSTeM-J0Xy9jEGdrHIH8KpB';
    const googleDrivePreviewUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;
    const googleDriveDownloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

    const downloadResume = () => {
        window.open(googleDriveDownloadUrl, '_blank');
    };

    return (
        <section id="resume" className="Resume-container">
            <div className="Resume-title">
                <h2>Resume</h2>
            </div>
            <div className="Resume">
                <iframe src={googleDrivePreviewUrl}></iframe>
            </div>
            <button className="btn-download" onClick={downloadResume}>Download PDF</button>
        </section>
    );
}

export default Resume;