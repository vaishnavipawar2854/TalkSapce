import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

// API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || '';

const ContactForm = ({ onContactSubmitted }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Error state
  const [errors, setErrors] = useState({});

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply specific formatting/validation based on field
    let formattedValue = value;
    
    if (name === 'name') {
      // Only allow letters, spaces, hyphens, and apostrophes
      formattedValue = value.replace(/[^a-zA-Z\s\-']/g, '');
    } else if (name === 'phone') {
      // Remove non-numeric characters except +, (, ), -, and space
      formattedValue = value.replace(/[^\d\+\(\)\-\s]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Real-time validation
    if (formattedValue.trim()) {
      validateField(name, formattedValue);
    } else {
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }

    // Clear submit status message when user starts editing
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  // Real-time field validation
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          error = 'Name cannot exceed 100 characters';
        } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
          error = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        break;

      case 'email':
        if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!validatePhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;

      case 'message':
        if (value.length > 500) {
          error = 'Message cannot exceed 500 characters';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // Validate email format (enhanced)
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.trim());
  };

  // Validate phone format (enhanced - supports multiple formats)
  const validatePhone = (phone) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Must have 10-15 digits
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };

  // Validate form (comprehensive)
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    } else if (!/^[a-zA-Z\s\-']+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      } else if (digitsOnly.length > 15) {
        newErrors.phone = 'Phone number cannot exceed 15 digits';
      } else {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Message validation (optional but limit length)
    if (formData.message && formData.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for submit button (comprehensive)
  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.name.trim().length <= 100 &&
      /^[a-zA-Z\s\-']+$/.test(formData.name.trim()) &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.phone.trim() &&
      validatePhone(formData.phone) &&
      formData.message.length <= 500 &&
      Object.keys(errors).every(key => !errors[key])
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Send data to backend
      const response = await axios.post(`${API_URL}/api/contacts`, formData);

      if (response.data.success) {
        // Show success message
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for contacting us! We\'ll get back to you soon.'
        });

        // Reset form
        resetForm();

        // Notify parent component to refresh the list
        if (onContactSubmitted) {
          onContactSubmitted();
        }

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: '', message: '' });
        }, 5000);
      }
    } catch (error) {
      // Handle error
      let errorMessage = 'Something went wrong. Please try again.';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Submit Status Message */}
        {submitStatus.message && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="your.email@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone">
            Phone <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="123-456-7890"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message">
            Message
            <span className="optional"> (Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            placeholder="Tell us what you'd like to discuss..."
            rows="5"
          />
          <div className="char-count">
            {formData.message.length}/500 characters
          </div>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
