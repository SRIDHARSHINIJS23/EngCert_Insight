// AdminEnquiry.jsx
import React, { useState, useEffect } from 'react';
import '../assets/css/AdminEnquiry.css'; // Import your CSS file
import { FaPen, FaTrash } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [editedEnquiry, setEditedEnquiry] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch enquiries from the backend when the component mounts
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:8080/enquiry/get');
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const handleEditAnswer = (enquiry) => {
    setEditedEnquiry(enquiry);
    setShowPopup(true);
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    try {
      const response = await fetch(`http://localhost:8080/enquiry/delete/${enquiryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Deleted enquiry with id: ${enquiryId}`);
        // Update the list of enquiries after deletion
        fetchEnquiries();
      } else {
        console.error(`Failed to delete enquiry with id: ${enquiryId}`);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const handleSaveAnswer = async () => {
    try {
      const response = await fetch(`http://localhost:8080/enquiry/updateResponse/${editedEnquiry.enquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: editedEnquiry.response }),
      });

      if (response.ok) {
        console.log('Saved answer successfully');
        // Update the list of enquiries after saving answer
        fetchEnquiries();
        setEditedEnquiry({});
        setShowPopup(false);
      } else {
        console.error('Failed to save answer');
      }
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedEnquiry({});
    setShowPopup(false);
  };

  const handleAnswerChange = (newAnswer) => {
    setEditedEnquiry((prevEnquiry) => ({ ...prevEnquiry, response: newAnswer }));
  };

  return (
    <div className='admin-enquiry-whole'>
      <AdminSidebar />
      <div className="admin-enquiry-container">
        <div className="enquiries-section">
          <h1 style={{ "color": "#333" }}>Enquiries</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Coursename</th>
              <th>Enquiry</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.enquiryId}>
                <td>{enquiry.studentId}</td>
                <td>{enquiry?enquiry.description:'Loading...'}</td>
                <td>{enquiry?enquiry.title:'Loading'}</td>
                <td>{enquiry.response || 'N/A'}</td>
                <td>
                  <button style={{ "width": "50px", "backgroundColor": "#3498db" }} onClick={() => handleEditAnswer(enquiry)}><FaPen /></button>
                  <button style={{ "width": "50px", "backgroundColor": "#dc3545", "marginLeft": "5px" }} onClick={() => handleDeleteEnquiry(enquiry.enquiryId)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup integrated directly into AdminEnquiry */}
        {showPopup && (
          <div className="popup-container">
            <h2>Edit Answer</h2>
            <label>
              Answer:
              <input
                type="text"
                value={editedEnquiry.response || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleSaveAnswer}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiry;
