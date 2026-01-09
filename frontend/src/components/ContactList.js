import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactList.css';

// API URL - Use relative path for production, environment variable for development
const API_URL = process.env.REACT_APP_API_URL || 'https://talk-sapce.vercel.app';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteStatus, setDeleteStatus] = useState({ id: null, loading: false });

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch all contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/api/contacts`);
      
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      setError('Failed to load contacts. Please try again later.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      setDeleteStatus({ id, loading: true });
      const response = await axios.delete(`${API_URL}/api/contacts/${id}`);

      if (response.data.success) {
        // Remove contact from UI instantly
        setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
      }
    } catch (err) {
      alert('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', err);
    } finally {
      setDeleteStatus({ id: null, loading: false });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="contact-list-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="contact-list-container">
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button className="retry-btn" onClick={fetchContacts}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (contacts.length === 0) {
    return (
      <div className="contact-list-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Contacts Yet</h3>
          <p>Submitted contacts will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list-container">
      <div className="list-header">
        <h2>Submitted Contacts</h2>
        <div className="contact-count">
          {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td data-label="Name" className="name-cell">
                  {contact.name}
                </td>
                <td data-label="Email" className="email-cell">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </td>
                <td data-label="Phone" className="phone-cell">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </td>
                <td data-label="Message" className="message-cell">
                  {contact.message ? (
                    <span className="message-text" title={contact.message}>
                      {contact.message}
                    </span>
                  ) : (
                    <span className="no-message">No message</span>
                  )}
                </td>
                <td data-label="Date" className="date-cell">
                  {formatDate(contact.createdAt)}
                </td>
                <td data-label="Actions" className="actions-cell">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(contact._id)}
                    disabled={deleteStatus.id === contact._id && deleteStatus.loading}
                  >
                    {deleteStatus.id === contact._id && deleteStatus.loading ? (
                      <span className="spinner-small"></span>
                    ) : (
                      '🗑️'
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="cards-wrapper">
        {contacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <div className="card-header">
              <h3>{contact.name}</h3>
              <button
                className="delete-btn"
                onClick={() => handleDelete(contact._id)}
                disabled={deleteStatus.id === contact._id && deleteStatus.loading}
                aria-label="Delete contact"
              >
                {deleteStatus.id === contact._id && deleteStatus.loading ? (
                  <span className="spinner-small"></span>
                ) : (
                  '🗑️'
                )}
              </button>
            </div>
            
            <div className="card-body">
              <div className="card-row">
                <span className="card-label">Email:</span>
                <a href={`mailto:${contact.email}`} className="card-value">
                  {contact.email}
                </a>
              </div>
              
              <div className="card-row">
                <span className="card-label">Phone:</span>
                <a href={`tel:${contact.phone}`} className="card-value">
                  {contact.phone}
                </a>
              </div>
              
              {contact.message && (
                <div className="card-row">
                  <span className="card-label">Message:</span>
                  <span className="card-value">{contact.message}</span>
                </div>
              )}
              
              <div className="card-row">
                <span className="card-label">Date:</span>
                <span className="card-value card-date">
                  {formatDate(contact.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
