import React, { useState, useEffect } from 'react';
import '../assets/css/AdminCourse.css';
import AdminSidebar from './AdminSidebar';

const ManageCourses = () => {
  const initialCourseState = {
    courseName: '',
    description: '',
    duration: '',
    cost: '',
  };

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedCourse, setEditedCourse] = useState(null);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newCourse, setNewCourse] = useState(initialCourseState);
  const [newCourseErrors, setNewCourseErrors] = useState({});

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    fetch('http://localhost:8080/course/get')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEdit = (course) => {
    setEditedCourse({ ...course });
    setShowEditPopup(true);
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/course/delete/${courseId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Deleted course with id: ${courseId}`);
        // Update the list of courses after deletion
        fetchCourses();
      } else {
        console.error(`Failed to delete course with id: ${courseId}`);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/course/update/${editedCourse.courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCourse),
      });

      if (response.ok) {
        console.log(`Saved edited course: ${editedCourse.courseName}`);
        // Update the list of courses after saving edit
        fetchCourses();
        setShowEditPopup(false);
        setEditedCourse(null);
      } else {
        console.error(`Failed to save edited course: ${editedCourse.courseName}`);
      }
    } catch (error) {
      console.error('Error saving edited course:', error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
    setEditedCourse(null);
  };

  const handleInputChange = (e, key) => {
    setEditedCourse({
      ...editedCourse,
      [key]: e.target.value,
    });
  };

  const handleAddCourse = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewCourse = async () => {
    // Validate form before saving
    const errors = {};
    if (!newCourse.courseName.trim()) {
      errors.courseName = 'Course Name is required';
    }
    // ... (similar updates for other validation rules)

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/course/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCourse),
        });

        if (response.ok) {
          console.log('New course added successfully');
          // Update the list of courses after adding a new course
          fetchCourses();
          setShowAddPopup(false);
          setNewCourse(initialCourseState);
        } else {
          console.error('Failed to add new course');
        }
      } catch (error) {
        console.error('Error adding new course:', error);
      }
    } else {
      setNewCourseErrors(errors);
    }
  };

  const handleCancelAddCourse = () => {
    setShowAddPopup(false);
    setNewCourse(initialCourseState);
    setNewCourseErrors({});
  };

  const handleNewCourseInputChange = (e, key) => {
    setNewCourse({
      ...newCourse,
      [key]: e.target.value,
    });
    // Clear the error for the field being edited
    setNewCourseErrors({
      ...newCourseErrors,
      [key]: '',
    });
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="manage-courses-whole">
      <AdminSidebar />
      <div className="manage-courses-container">
        <h1>Courses</h1>
        <button
          style={{ backgroundColor: "#3498db", marginBottom: "10px" }}
          onClick={handleAddCourse}
        >
          Add Course
        </button>
        <ul className="manage-courses-list">
          {courses.map((course, index) => (
            <li key={index} className="manage-course-item">
              <h2>{course.courseName}</h2>

              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Cost:</strong> {course.cost}</p>
              <div className="manage-course-actions">
                <button style={{ backgroundColor: "#3498db" }} onClick={() => handleEdit(course)}>Edit</button>
                <button style={{ backgroundColor: "#3498db" }} onClick={() => handleDelete(course.courseId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showEditPopup && (
        <div className="manage-course-edit-popup">
          <h2>Edit Course</h2>
          <label>
            Course Name:
            <input
              type="text"
              value={editedCourse.courseName}
              onChange={(e) => handleInputChange(e, 'courseName')}
            />
          </label>
          <label>
            Description:
            <textarea
              value={editedCourse.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </label>
          <label>
            Duration:
            <input
              type="text"
              value={editedCourse.duration}
              onChange={(e) => handleInputChange(e, 'duration')}
            />
          </label>
          <label>
            Cost:
            <input
              type="text"
              value={editedCourse.cost}
              onChange={(e) => handleInputChange(e, 'cost')}
            />
          </label>
          <div className="manage-course-edit-popup-buttons">
            <button style={{ backgroundColor: "#3498db" }} onClick={handleSaveEdit}>Save</button>
            <button style={{ backgroundColor: "#3498db" }} onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="manage-course-edit-popup">
          <h2>Add Course</h2>
          <label>
            Course Name:
            <input
              type="text"
              value={newCourse.courseName}
              onChange={(e) => handleNewCourseInputChange(e, 'courseName')}
              required
            />
            {newCourseErrors.courseName && <span className="error">{newCourseErrors.courseName}</span>}
          </label>
          <label>
            Description:
            <textarea
              value={newCourse.description}
              onChange={(e) => handleNewCourseInputChange(e, 'description')}
              required
            />
            {newCourseErrors.description && <span className="error">{newCourseErrors.description}</span>}
          </label>
          <label>
            Duration:
            <input
              type="text"
              value={newCourse.duration}
              onChange={(e) => handleNewCourseInputChange(e, 'duration')}
              required
            />
            {newCourseErrors.duration && <span className="error">{newCourseErrors.duration}</span>}
          </label>
          <label>
            Cost:
            <input
              type="text"
              value={newCourse.cost}
              onChange={(e) => handleNewCourseInputChange(e, 'cost')}
              required
            />
            {newCourseErrors.cost && <span className="error">{newCourseErrors.cost}</span>}
          </label>
          <div className="manage-course-edit-popup-buttons">
            <button style={{ backgroundColor: "#3498db" }} onClick={handleSaveNewCourse}>Save</button>
            <button style={{ backgroundColor: "#3498db" }} onClick={handleCancelAddCourse}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
