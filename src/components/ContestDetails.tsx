import React from 'react';

const ContestDetails: React.FC = () => {
    return (
        <div className="contest-details-card">
            <div className="contest-details-left">
                <div className="contest-month">May 2023<br />Contest</div>
                <div className="contest-date-row">
                    <span className="contest-icon">📅</span>
                    <span>Registration: May 10, 2023</span>
                </div>
                <div className="contest-date-row">
                    <span className="contest-icon">⏰</span>
                    <span>Test Date: May 15, 2023</span>
                </div>
                <div className="contest-date-row">
                    <span className="contest-icon">📆</span>
                    <span>Results: May 16, 2023</span>
                </div>
                <div className="contest-prize-box">
                    <div className="contest-prize-title">Prize</div>
                    <div className="contest-prize-value">Laptop worth<br />₹25,000</div>
                </div>
            </div>
            <div className="contest-details-right">
                <h3>Contest Details</h3>
                <ul className="contest-details-list">
                    <li>20 aptitude questions to be answered in 900 seconds (15 minutes)</li>
                    <li>Entry fee: ₹35 (payable via GPay or PhonePe)</li>
                    <li>Limited to first 5000 registrations</li>
                    <li>Winner determined by highest score and fastest completion time</li>
                </ul>
                <button className="contest-register-btn">Register Now</button>
            </div>
        </div>
    );
};

export default ContestDetails;