import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/css/Coursedes.css';
import RegistrationForm from './Registrationform';

function Coursedes() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [course, setCourse] = useState(null);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  let { courseId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/course/get/${courseId}`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);

  const handleEnrollClick = () => {
    setPopupVisibility(true);
  };

  const handlePopupClose = () => {
    setPopupVisibility(false);
  };

  const handleRegistrationComplete = () => {
    setRegistrationCompleted(true);
    setPopupVisibility(false);
  };

  return (
    <>
      <div className='Coursedes-container'>
        <div className='Coursedes-con1'>
          <div className='Coursedes-con2'>
            <h1>{course ? course.courseName : 'British English Grammar Mastery'}</h1>
            <br></br>
            <h3>Description</h3>
            <p>{course ? course.description : 'Loading...'}</p>
            <br></br>
            
            <h3>Duration</h3>
            <p>{course ? course.duration : 'Loading...'}</p>
            <br></br>
            
            <h3>Cost</h3>
            <p>{course ? course.cost : 'Loading...'}</p>
            <div className="buttons-container1">
              {!enrolled && !registrationCompleted && (
                <button type="button" onClick={handleEnrollClick} disabled={enrolled}>
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && !registrationCompleted && (
        <div className="custom-popup">
          <div className="popup-content">
          <RegistrationForm
              onRegister={handleRegistrationComplete}
              onCancel={handlePopupClose}
              courseId={courseId} // Pass courseId to RegistrationForm
            />            
            <div className="popup-buttons">
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && registrationCompleted && (
        <div className="custom-popup">
          <div className="popup-content">
            <h2>Registration Completed</h2>
            <p>You have successfully registered for the course.</p>
            <div className="popup-buttons">
              <button type="button" onClick={handlePopupClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Coursedes;
