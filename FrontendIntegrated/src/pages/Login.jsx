
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import { login } from '../Features/userSlice';
import { useDispatch } from 'react-redux';
import user_icon from '../assets/images/icons8-user-30.png';
import email_icon from '../assets/images/icons8-email-30.png';
import phone_icon from '../assets/images/icons8-phone-30.png';
import password_icon from '../assets/images/icons8-password-30.png';
import Home from './Home';

// ... (existing import statements)

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',  // Change 'username' to 'name'
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':  // Change 'username' to 'name'
        if (action === 'Sign Up' && !value.trim()) {
          error = 'Name is required';  // Change 'Username' to 'Name'
        }
        break;
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

  const handleSubmit = async () => {
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

      try {
        if (action === "Login") {
          const data = {
            email: formData.email,
            password: formData.password,
          };
          const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();

          if (response.ok) {
            console.log('Login successful');
            localStorage.setItem('email', formData.email);
            localStorage.setItem('userId', responseData.userId);
            localStorage.setItem('token', responseData.authenticationResponse);
            dispatch(login({ email: formData.email, ...responseData.authenticationResponse }));
            navigate('/pro');
          } else {
            console.log('Login failed:', responseData.message);
            setErrors({ email: 'Invalid email or password' });
          }
          
        } else if (action === "Sign Up") {
          const response = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json();

          if (response.ok) {
            console.log('Registration successful');
            
            navigate('/');
          } else {
            console.log('Registration failed:', responseData.message);
            setErrors({ email: 'Email is already registered' });
          }
        }
      } catch (error) {
        console.error('Error during login/registration:', error);
        setErrors({ email: 'An error occurred. Please try again.' });
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
          <div className='text1'>{action}</div>
          <div className='underline1'></div>
        </div>
        <br></br>
        <div className='inputs1'>
          {action === "Login" ? null :
            <>
              <div className='input1'>
                <img src={user_icon} alt="Name" />
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}  // Change 'username' to 'name'
                  required
                  onChange={(e) => {
                    handleInputChange('name', e.target.value);  // Change 'username' to 'name'
                  }}
                />
              </div>
                {errors.name && <span className="error-message">{errors.name}</span>}  {/* Change 'username' to 'name' */}
            </>
          }
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
            className={action === "Login" ? "submit gray" : "submit"}
            onDoubleClick={handleSubmit}
            onClick={()=>{setAction("Sign Up")}}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onDoubleClick={handleSubmit}
            onClick={()=>{setAction("Login")}}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
