import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container logo-${size}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Main Circle Background */}
        <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" filter="url(#shadow)"/>
        
        {/* Speech Bubble 1 (Left) */}
        <path d="M 60 70 L 90 70 L 90 95 L 75 95 L 70 105 L 70 95 L 60 95 Z" 
              fill="white" opacity="0.9" stroke="white" strokeWidth="2"/>
        
        {/* Speech Bubble 2 (Right) */}
        <path d="M 110 85 L 140 85 L 140 110 L 130 110 L 125 120 L 125 110 L 110 110 Z" 
              fill="white" opacity="0.9" stroke="white" strokeWidth="2"/>
        
        {/* Letter T (Stylized) */}
        <text x="100" y="155" fontFamily="Arial, sans-serif" fontSize="70" fontWeight="bold" 
              fill="white" textAnchor="middle" letterSpacing="-2">T</text>
        
        {/* Connecting dots (representing communication) */}
        <circle cx="75" cy="82" r="4" fill="white" opacity="0.8"/>
        <circle cx="85" cy="82" r="3" fill="white" opacity="0.6"/>
        <circle cx="115" cy="97" r="3" fill="white" opacity="0.6"/>
        <circle cx="125" cy="97" r="4" fill="white" opacity="0.8"/>
      </svg>
    </div>
  );
};

export default Logo;
