// AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import user_icon from '../assets/images/icons8-user-30.png';
import email_icon from '../assets/images/icons8-email-30.png';
import password_icon from '../assets/images/icons8-password-30.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (fieldName, value) => {
    const error = validateField(fieldName, value);
    setErrors({ ...errors, [fieldName]: error });
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid. Submitting...");
      setErrors({});

      // Check if the provided credentials are for the admin
      if (formData.email === 'admin@gmail.com' && formData.password === 'admin@123') {
        console.log('Redirecting to admin home page...');
        navigate('/AdminHome');
      } else {
        console.log('Admin login failed: Invalid credentials');
        setErrors({ email: 'Invalid email or password' });
      }
    } else {
      setErrors(newErrors);
      console.log("Form is invalid. Please check the errors.");
    }
  };

  return (
    <div className='total'>
      <div className='container1'>
        <div className='header1'>
          <div className='text1'>Login</div>
          <div className='underline1'></div>
        </div>
        <br></br>
        <div className='inputs1'>
          <div className='input1'>
            <img src={email_icon} alt="Email" />
            <input
              type="email"
              placeholder='Email' required
              value={formData.email}
              onChange={(e) => {
                handleInputChange('email', e.target.value);
              }}
            />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
          <div className='input1'>
            <img src={password_icon} alt="Password" />
            <input
              type="password"
              placeholder='Password' required
              value={formData.password}
              onChange={(e) => {
                handleInputChange('password', e.target.value);
              }}
            />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="submit-container1">
          <div
            className="submit"
            onDoubleClick={handleSubmit}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
