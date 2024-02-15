import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import '../assets/css/Course.css';
import NavAdmin from '../components/NavBar';
import { Link } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import { FaSearch } from 'react-icons/fa';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleEnroll = (courseName) => {
    console.log(`Enrolling in ${courseName}`);
  };

  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

 // Empty dependency array to run once on component mount

 useEffect(() => {
  axios.get('http://localhost:8080/course/get')
  .then(response => {
    setCourses(response.data);
    setFilteredCourses(response.data);
  })
  .catch(error => {
    console.error('Error fetching courses:', error);
  });
 
}, []);
  return (
    <div className="whole">
      <div className="courses-container">
        <h1>Courses Offered</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Course Name"
          />
          <button onClick={handleSearch} style={{ "width": "70px" }}>
            Search
          </button>
        </div>
        <ul className="courses-list">
          {filteredCourses.map((course, index) => (
            <li key={index} className="course-item">
              <h2>{course.courseName}</h2>
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Cost:</strong> {course.cost}</p>
              <div>
              <Link to={`/coursedes/${course.courseId}`}>

                  <button
                    className="enroll-button"
                    onClick={() => handleEnroll(course.courseName)}
                  >
                    Enroll
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Sidebar />
    </div>
  );
}

export default Course;


