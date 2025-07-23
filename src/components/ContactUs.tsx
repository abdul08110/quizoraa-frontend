import React from 'react';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const ContactUs: React.FC = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-col">
        <h3>Quizoraa</h3>
        <p>
          Test your aptitude skills and win exciting prizes in our monthly contests.
        </p>
      </div>
      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/rewards">Rewards</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Contact Us</h3>
        <p>support@brainbattle.com</p>
        <p>
          <span role="img" aria-label="phone">📞</span> +91 9876543210
        </p>
        <p>
          <span role="img" aria-label="location">📍</span> 123 Tech Park,<br />
          Bangalore,<br />
          Karnataka, India
        </p>
      </div>
      <div className="footer-col">
        <h3>Follow Us</h3>
        <div className="footer-social">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </div>
    <hr className="footer-divider" />
    <div className="footer-bottom">
      <span>© 2023 Quizoraa. All rights reserved.</span>
      <div className="footer-policies">
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Refund Policy</a>
      </div>
    </div>
  </footer>
);

export default ContactUs;