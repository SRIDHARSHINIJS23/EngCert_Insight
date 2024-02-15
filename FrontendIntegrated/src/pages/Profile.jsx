import React, { useState, useEffect } from 'react';
import '../assets/css/Profile.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Profile = () => {
  const loggedData = useSelector(state => state.user.user);
  const userEmail = loggedData.email;

  const [userDetails, setUserDetails] = useState({
    id: 0,
    name: '',
    email: userEmail,
    address: '',
    role: '',  // Add role field
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/update/${userDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userDetails.name,
          address: userDetails.address,
          role: userDetails.role,
        }),
      });

      if (response.ok) {
        console.log('Update successful');
        setIsEditing(false); // Set isEditing to false after a successful update
      } else {
        console.log('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/getByEmail?email=${userEmail}`);
        if (response.ok) {
          const user = await response.json();
          setUserDetails({
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,  // Set the role field from the fetched data
          });
        } else {
          console.log('Failed to fetch user details:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  return (
    <div className={`profile-container ${isEditing ? 'editing' : ''}`}>
      <Sidebar />
      <div className="profile-fields1">
        <h2>{userDetails.name}</h2>
        <div>Email: {userDetails.email}</div>
        <div className="field1">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="field1">
          <label>Email:</label>
          <span>{userDetails.email}</span>
        </div>
        <div className="field1">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="profile-buttons">
        <div className="save-edit-buttons">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              &nbsp;
              <button className="edit-button" style={{ padding: '2px 100px' }} onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
