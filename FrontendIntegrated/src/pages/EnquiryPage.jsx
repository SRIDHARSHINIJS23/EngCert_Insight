// EnquiryPage.jsx

import React, { useState, useEffect } from 'react';
import '../assets/css/EnquiryPage.css';
import Sidebar from './Sidebar';
import { FaSearch } from 'react-icons/fa';

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [userEnquiry, setUserEnquiry] = useState('');
  const [isAddEnquiryPopupVisible, setAddEnquiryPopupVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const storedEmail = localStorage.getItem('email');
  const [emailid, setEmailId] = useState(storedEmail);
  console.log("email", storedEmail);

  useEffect(() => {
  // Fetch the user's ID based on the email from local storage
  const fetchUserId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/getByEmail?email=${emailid}`);
      const user = await response.json();
      if (user.id) {
        const userId = user.id;
        console.log(userId);
        // Fetch enquiries associated with the user's ID
        const enquiriesResponse = await fetch(`http://localhost:8080/enquiry/getByStudentId/${userId}`);
        const enquiriesData = await enquiriesResponse.json();

        setEnquiries(enquiriesData);
        setFilteredEnquiries(enquiriesData);
      } else {
        console.error('User ID not found.');
      }
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
    }
  };

  fetchUserId();
}, [emailid]);
 // Empty dependency array ensures this effect runs once on mount

  // Function to get the user ID based on the email
  const getUserIdByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/getByEmail?email=${email}`);
      const user = await response.json();
      return user.id;
    } catch (error) {
      console.error('Failed to get user ID:', error);
      throw error;
    }
  };

  const handleAddEnquiry = async () => {
    if (courseName.trim() && userEnquiry.trim()) {
      try {
        // Retrieve the user's ID based on the email
        const userId = await getUserIdByEmail(emailid);
  
        const newEnquiry = {
          title: courseName.trim(),
          description: userEnquiry.trim(),
          studentId: userId,
        };
  
        // Send POST request to add the enquiry
        const response = await fetch('http://localhost:8080/enquiry/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEnquiry),
        });
  
        const data = await response.json();
  
        // Handle the response if needed
        console.log('Enquiry added successfully:', data);
  
        // Update local state with the new enquiry
        setEnquiries([...enquiries, data]);
        setFilteredEnquiries([...enquiries, data]);
  
        // Close the popup
        setAddEnquiryPopupVisibility(false);
      } catch (error) {
        console.error('Failed to add enquiry:', error);
      }
  
      setCourseName('');
      setUserEnquiry('');
    } else {
      window.alert('Please enter both Course Name and Enquiry before submitting.');
    }
  };

  const handleSearch = () => {
    const filteredEnquiries = enquiries.filter((enquiry) =>
      enquiry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnquiries(filteredEnquiries);
  };

  return (
    <div className="enquiry-page">
      <h1 className="enquiry-heading">Course Enquiries</h1>

      <div className="search-bar">
        <label>
          <input type="text" style={{ width: '390px' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search by Course Name' />
        </label>
        <button style={{ width: '40px', paddingBottom: '3px', backgroundColor: '#fff', height: '50px' }} onClick={handleSearch}><FaSearch /></button>
      </div>

      <div className="add-enquiry-button">
        <button onClick={() => setAddEnquiryPopupVisibility(true)}>Add Enquiry</button>
      </div>
      <table className="enquiry-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnquiries.map((enquiry, index) => (
            <tr key={index}>
              <td>{enquiry.title}</td>
              <td>{enquiry.description}</td>
              <td>{enquiry.response}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddEnquiryPopupVisible && (
        <div className="custom-popup-container">
          <div className="custom-popup-content">
            <h2>Add Enquiry</h2>
            <div className="custom-enquiry-form">
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
              <button style={{ backgroundColor: '#3498db' }} onClick={handleAddEnquiry}>
                Submit Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      <Sidebar />
    </div>
  );
};

export default EnquiryPage;
