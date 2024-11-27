import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Muhammad Muiz. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/about" className="footer-link">About Us</a>
          </li>
          <li>
            <a href="/contact" className="footer-link">Contact</a>
          </li>
          <li>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </li>
        </ul>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
