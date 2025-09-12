// frontend/src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Wings Cafe Inventory System</h4>
          <p>Efficient stock management for your cafe business</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@wingscafe.ls</p>
          <p>Phone: +266 59452460</p>
          <p>Address: Maseru, Lesotho</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/sales">Sales</a></li>
            <li><a href="/reporting">Reports</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Wings Cafe. All rights reserved. | Version 1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;