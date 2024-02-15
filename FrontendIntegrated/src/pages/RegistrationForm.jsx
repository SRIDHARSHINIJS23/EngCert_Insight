// RegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import '../assets/css/RegistrationForm.css'; // Import the CSS file for styling
import axios from 'axios';

const RegistrationForm = ({ onRegister, onCancel, courseId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    email: '',
  });

  const [studentId, setStudentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (formData.email.trim()) {
      setIsLoading(true);
      axios.get(`http://localhost:8080/api/v1/auth/getByEmail?email=${formData.email}`)
        .then(response => {
          setStudentId(response.data.id);
        })
        .catch(error => {
          console.error('Error fetching student_id:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [formData.email]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMessage('');
    } else if (!studentId) {
      setErrorMessage('Student ID is not available.');
    } else {
      axios.put(`http://localhost:8080/api/v1/auth/enroll/${studentId}/${courseId}`)
        .then(response => {
          onRegister();
        })
        .catch(error => {
          console.error('Error updating User table:', error);
          if (error.response) {
            if (error.response.status === 404) {
              setFormErrors({
                ...formErrors,
                email: 'Provided email is not registered',
              });
              setErrorMessage('User with this email is not registered');
            } else if (error.response.status === 400 && error.response.data.includes('already enrolled')) {
              setFormErrors({
                ...formErrors,
                email: 'User is already enrolled in this course',
              });
              setErrorMessage('User is already enrolled in this course. Custom error message.');
            } else {
              console.error('Server error:', error.message);
              setErrorMessage('An error occurred. Please try again later.');
            }
          }
        });
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <div className="error-message">{formErrors.firstName}</div>
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="error-message">{formErrors.email}</div>
      </label>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="registration-buttons">
        <button onClick={handleSubmit} disabled={isLoading} className="submit-button">
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
