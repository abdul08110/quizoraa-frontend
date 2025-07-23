import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HeroBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const navigate = useNavigate();
  // Set your actual future datetime for when registration opens
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2); // 2 days from now
  targetDate.setHours(targetDate.getHours() + 14); // and 14 extra hours

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Registration Open!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);
  const handleRegisterClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      navigate('/contest-registration'); // 👈 adjust route as needed
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Test Your<br />Aptitude, Win a<br />Laptop!</h1>
        <p>
          Join our monthly contest for a chance to win a laptop worth ₹25,000.
          Next contest registration opens this Wednesday!
        </p>
        <div className="hero-info-box">
          <div className="hero-info-row">
            <span className="hero-info-icon">🕒</span>
            <span className="hero-info-label">Next Registration Opens:</span>
          </div>
          <div className="hero-info-time">{timeLeft}</div>
          <div className="hero-progress-bar-bg">
            <div className="hero-progress-bar" style={{ width: '0%' }} />
          </div>
          <div className="hero-progress-labels">
            <span>0 registered</span>
            <span>5000 slots</span>
          </div>
        </div>
        <div className="hero-buttons">
          <button onClick={handleRegisterClick} className="hero-btn hero-btn-primary">
            Register Now
          </button>
          <button className="hero-btn hero-btn-secondary">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://i.imgur.com/0y8Ftya.png"
          alt="Quizoraa"
          className="hero-laptop-img"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
