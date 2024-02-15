// AddEnquiryForm.jsx
import React, { useState } from 'react';
import '../assets/css/EnquiryPage.css';
const AddEnquiry = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState('');
  const [userEnquiry, setUserEnquiry] = useState('');

  const handleSubmit = () => {
    if (courseName.trim() && userEnquiry.trim()) {
      onSubmit({
        courseName: courseName.trim(),
        userEnquiry: userEnquiry.trim(),
      });
      setCourseName('');
      setUserEnquiry('');
    } else {
      window.alert('Please enter both Course Name and Enquiry before submitting.');
    }
  };

  return (
    <div className="custom-enquiry-form">
      <h2>Add Enquiry</h2>
      <label>
        Course Name:
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </label>
      <label>
        Your Enquiry:
        <textarea
          value={userEnquiry}
          onChange={(e) => setUserEnquiry(e.target.value)}
          rows={4}
        />
      </label>
      <button onClick={handleSubmit}>Submit Enquiry</button>
    </div>
  );
};

export default AddEnquiry;
