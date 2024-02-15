import React, { useEffect, useState } from 'react';
import '../assets/css/UserCourse.css';  // Make sure to adjust the path accordingly
import Sidebar from './Sidebar';

const UserCourse = () => {
  const [userCourses, setUserCourses] = useState([]);
  
  // Function to retrieve user email from local storage
  const getUserEmailFromLocalStorage = () => {
    const userEmail = localStorage.getItem('email');
    return userEmail;
  };

  useEffect(() => {
    // Fetch user courses based on the email from local storage
    const fetchUserCourses = async () => {
      const userEmail = getUserEmailFromLocalStorage();

      // Make a request to your backend API to get courses by user email
      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/getByEmail?email=${userEmail}`);
        const userData = await response.json();

        // Assuming the courses are available in userData.courses (modify accordingly)
        const userCoursesData = userData.courses || [];
        setUserCourses(userCoursesData);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    fetchUserCourses();
  }, []); // Empty dependency array to ensure it runs only once on component mount

  return (
    <div className="user-course-container">
      <div className="user-courses-list">
        <h1>Enrolled Courses</h1>
        <ul className="course22-items">
          {userCourses.map((course, index) => (
            <li key={index} className="course22-item">
              <h2>{course.courseName}</h2>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Cost:</strong> {course.cost}</p>
              <div className="enroll-button-container">
                <button className="enroll-button">Enrolled</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Sidebar />
    </div>
  );
};

export default UserCourse;
