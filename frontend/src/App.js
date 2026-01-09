/**
 * TalkSpace - Main Application Component
 * 
 * Integration Features:
 * - ContactForm: Submit new contacts with validation
 * - ContactList: Display and manage submitted contacts
 * - Auto-refresh: List updates automatically after form submission
 * - No page reload: Seamless user experience
 */

import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Logo from './components/Logo';
import './App.css';

function App() {
  // State to trigger ContactList refresh via key prop
  const [refreshList, setRefreshList] = useState(0);

  // Callback: Increment state to trigger list re-fetch
  const handleContactSubmitted = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <div className="App">
      {/* Contact Submission Form */}
      <div className="container">
        <div className="header">
          <div className="header-content">
            <Logo size="medium" />
            <div className="header-text">
              <h1>TalkSpace</h1>
              <p>Connect with us - We'd love to hear from you!</p>
            </div>
          </div>
        </div>
        <ContactForm onContactSubmitted={handleContactSubmitted} />
      </div>
      
      {/* Contact List - Auto-refreshes via key prop */}
      <div className="container">
        <ContactList key={refreshList} />
      </div>
    </div>
  );
}

export default App;
