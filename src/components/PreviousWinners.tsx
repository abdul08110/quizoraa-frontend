import React from 'react';

const winners = [
  {
    month: 'April 2023 Contest',
    name: 'Rahul Sharma',
    location: 'Mumbai, Maharashtra',
    score: '19/20',
    time: '8:45',
  },
  {
    month: 'March 2023 Contest',
    name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    score: '20/20',
    time: '9:12',
  },
  {
    month: 'February 2023 Contest',
    name: 'Arjun Kumar',
    location: 'Bangalore, Karnataka',
    score: '18/20',
    time: '7:58',
  },
];

const PreviousWinners: React.FC = () => (
  <div className="previous-winners">
    <h2>Previous Winners</h2>
    <div className="previous-winners-grid">
      {winners.map((winner, idx) => (
        <div className="winner-card-new" key={idx}>
          <div className="winner-card-header">{winner.month}</div>
          <div className="winner-avatar-new">
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="32" fill="#e6e0ff"/>
              <circle cx="32" cy="28" r="12" fill="#b3a6f7"/>
              <ellipse cx="32" cy="48" rx="16" ry="8" fill="#b3a6f7"/>
            </svg>
          </div>
          <div className="winner-name-new">{winner.name}</div>
          <div className="winner-location-new">{winner.location}</div>
          <hr className="winner-divider" />
          <div className="winner-score-row">
            <span className="winner-score-label">Score: <b>{winner.score}</b></span>
            <span className="winner-time-label">Time: <b>{winner.time}</b></span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PreviousWinners;