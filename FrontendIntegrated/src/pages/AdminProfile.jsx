import React, { useState, useEffect } from 'react';
import '../assets/css/AdminProfile.css';
import { FaUser } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

const AdminUserProfile = () => {
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [selectedUserCourses, setSelectedUserCourses] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/auth/get')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setUserProfiles(data);
      })
      .catch((error) => console.error('Error fetching user profiles:', error));
  }, []);

  const handleUserClick = (userId, userName) => {
    setSelectedUserName(userName);
    const clickedUser = userProfiles.find((user) => user.id === userId);
    setSelectedUserCourses(clickedUser.courses || []);
  };

  const closePopup = () => {
    setSelectedUserName(null);
    setSelectedUserCourses([]);
  };

  const handleDeleteClick = (event, userId) => {
    event.stopPropagation();

    fetch(`http://localhost:8080/api/v1/auth/delete/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setUserProfiles((prevUserProfiles) => prevUserProfiles.filter((user) => user.id !== userId));
          setSelectedUserName(null); // Clear selected user name
          setSelectedUserCourses([]); // Clear selected user courses
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="admin-user-profile-container">
      <h1 style={{ color: '#333' }}>User Profiles</h1>
      <div className="user-profile-list">
        {userProfiles.map((user) => (
          <div key={user.id} className="user-profile" onClick={() => handleUserClick(user.id, user.name)}>
            <div className="user-avatar">
              <FaUser size={50} />
            </div>
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <button className="delete-button" onClick={(e) => handleDeleteClick(e, user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AdminSidebar />

      {selectedUserName && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{`${selectedUserName}'s Enrolled Courses`}</h2>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <div className="course-cards">
              {selectedUserCourses.map((course, index) => (
                <div key={index} className="course-card">
                  <h3>{course.courseName}</h3>
                  <h4>Duration:</h4>{course.duration}
                  <h4>Cost:</h4>{course.cost}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserProfile;
