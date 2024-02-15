import React, { useState } from 'react';
import '../assets/css/Home.css'; // Importing the common styles
import NavAdmin from '../components/NavBar';
import AdminSidebar from './AdminSidebar';

const AdminHome = () => {
  const [editMode, setEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState({
    title: 'IELTS (International English Language Testing System)',
    description:
      'The International English Language Testing System (IELTS) is designed to help you achieve your ambition of working, studying, or moving to a country where English is spoken. Jointly owned by the British Council; IDP IELTS; and Cambridge University Press & Assessment - IELTS combines global presence with a commitment to academic research.For more than 30 years IELTS has set the standard for English language testing. Trusted by governments, employers and educational institutions - we have helped millions of people to achieve their goals.',
  });

  const handleSaveChanges = () => {
    // Implement your save changes logic here
    console.log('Changes saved:', editableContent);
    setEditMode(false);
  };

  return (
    <div>
      {/* <NavAdmin /> */}
      <AdminSidebar/>
      <div id="homebg"  className={`my-slideshow-container ${editMode ? 'editable' : ''}`}>
        <div className="my-slide my-fade active"style={{"backgroundColor":"rgba(246, 249, 300, 0.5)","color":"black"}}>
          <div className="my-numbertext">1 / 1</div>
          <div className='con'>
            <h1
              contentEditable={editMode}
              onBlur={(e) => setEditableContent({ ...editableContent, title: e.target.innerText })}
            >
              {editableContent.title}
            </h1>
            <h3
              contentEditable={editMode}
              onBlur={(e) => setEditableContent({ ...editableContent, description: e.target.innerText })}
            >
              {editableContent.description}
            </h3>
          </div>
          <div className="buttons-container">
            {editMode ? (
              <button onClick={handleSaveChanges}>Save Changes</button>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
        </div>
        <br />
        {/* No dot buttons */}
      </div>
    </div>
  );
};

export default AdminHome;