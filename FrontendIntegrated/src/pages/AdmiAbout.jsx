// AdminAbout.js

import React, { useState } from 'react';
import '../assets/css/About.css';
import AdminSidebar from './AdminSidebar';

function AdminAbout() {
  const [editableContent, setEditableContent] = useState({
    mainHeading: 'Your Gateway to Mastering British English',
    introText: 'Welcome to British English Certification, your premier destination for achieving proficiency in British English. We are dedicated to delivering unparalleled language education that transcends borders and empowers learners worldwide.',
    shapingLanguageHeading: 'Shaping Language Excellence',
    shapingLanguageText: 'Our overarching mission is to equip individuals with the skills and confidence to communicate effectively in British English. We are committed to crafting courses that make the journey of learning enjoyable, interactive, and rewarding.',
    whyChooseUsHeading: 'Why Choose British English Certification?',
    whyChooseUsList: [
      'Expert Instructors: Our seasoned and certified instructors guide you through every facet of the language learning process.',
      'Comprehensive Curriculum: British English Certification boasts a meticulously designed curriculum covering grammar intricacies, rich vocabulary, nuanced pronunciation, and cultural subtleties.',
      'Interactive Learning: Our courses incorporate interactive lessons, engaging quizzes, and practical exercises for a holistic understanding and application of English language concepts.',
      'Flexible Learning: Life is dynamic, and so is our approach to education. Our flexible learning options enable you to set your pace, allowing you to learn at your convenience from the comfort of your home.',
    ],
    whatSetsUsApartHeading: 'What Sets Us Apart?',
    whatSetsUsApartList: [
      'British English Focus: Dive into the richness of British English with courses specifically tailored to its unique nuances. Immerse yourself in the language as it is spoken in the United Kingdom.',
      'Supportive Community: Become part of a dynamic community of learners. Connect with fellow students, share experiences, and practice your English in a supportive and inclusive environment.',
      'Certification: Achieve recognition for your language prowess with our certification upon successful course completion. This credential not only validates your proficiency but also opens doors to a myriad of academic and professional opportunities.',
    ],
    vibrantLearningText: 'A Vibrant Learning Experience Awaits\n\nWith a focus on excellence, British English Certification stands as a beacon for those seeking to master British English. Our courses are not just about learning a language; they are a gateway to cultural understanding, global communication, and personal growth.',
    contactHeading: 'Contact Us',
    contactText: 'Have questions or need assistance? Feel free to reach out to us. Our support team is here to help.',
    contactDetails: [
      'Address: 123 Main Street, Cityville, Country',
      'Phone: +1 (123) 456-7890',
      'Email: info@yourcompany.com',
      'Website: www.yourwebsite.com',
      'Working Hours: Monday to Friday, 9:00 AM - 5:00 PM',
    ],
    mapLink: 'https://maps.google.com',
  });

  const [editMode, setEditMode] = useState(false);

  const handleContentChange = (key, value) => {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    // Implement your save changes logic here
    console.log('Changes saved:', editableContent);
    setEditMode(false); // Exit edit mode after saving changes
  };

  return (
    <>
      {/* <NavAdmin /> */}
      <AdminSidebar/>
      <body>
      <div id="about11">
          <div className="edit-buttons">
            {editMode ? (
              <>
                <button style={{ backgroundColor: '#3498db' }} onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button style={{ backgroundColor: '#3498db' }} onClick={handleToggleEditMode}>
                  Cancel
                </button>
              </>
            ) : (
              <button style={{ backgroundColor: '#3498db' }} onClick={handleToggleEditMode}>
                Edit
              </button>
            )}
          </div>
          <div id="about-h">
            <h1
              className="main-heading"
              dangerouslySetInnerHTML={{ __html: editableContent.mainHeading }}
              contentEditable={editMode}
              onBlur={(e) => handleContentChange('mainHeading', e.target.innerHTML)}
            ></h1>
            <p
              className="intro-text"
              dangerouslySetInnerHTML={{ __html: editableContent.introText }}
              contentEditable={editMode}
              onBlur={(e) => handleContentChange('introText', e.target.innerHTML)}
            ></p>
            <br></br>
            <h2>{editableContent.shapingLanguageHeading}</h2>
            <p
              dangerouslySetInnerHTML={{ __html: editableContent.shapingLanguageText }}
              contentEditable={editMode}
              onBlur={(e) => handleContentChange('shapingLanguageText', e.target.innerHTML)}
            ></p>
            <br></br>
            <div className="buttons-container2">
              <button className="main-button"><a href="#Whyus">Why Choose Us?</a></button>
              <button className="main-button"><a href="#Whatmakesusbetter">What Makes Us Better?</a></button>
              <button className="main-button"><a href="#Contact">Contact Us</a></button>
            </div>

            <div id="Whyus">
              <br></br>
              <br></br>
              <br></br>
              <h2>{editableContent.whyChooseUsHeading}</h2>
              <ul>
                {editableContent.whyChooseUsList.map((item, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                    contentEditable={editMode}
                    onBlur={(e) => handleContentChange(`whyChooseUsList.${index}`, e.target.innerHTML)}
                  ></li>
                ))}
              </ul>
            </div>
            <br></br>
            <div id="Whatmakesusbetter">
              <h2>{editableContent.whatSetsUsApartHeading}</h2>
              <ul>
                {editableContent.whatSetsUsApartList.map((item, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                    contentEditable={editMode}
                    onBlur={(e) => handleContentChange(`whatSetsUsApartList.${index}`, e.target.innerHTML)}
                  ></li>
                ))}
              </ul>
              <p
                dangerouslySetInnerHTML={{ __html: editableContent.vibrantLearningText }}
                contentEditable={editMode}
                onBlur={(e) => handleContentChange('vibrantLearningText', e.target.innerHTML)}
              ></p>
            </div>
            <br></br>
            {/* Contact Section */}
            <div id="Contact" className="contact-section">
              <h2>{editableContent.contactHeading}</h2>
              <p
                dangerouslySetInnerHTML={{ __html: editableContent.contactText }}
                contentEditable={editMode}
                onBlur={(e) => handleContentChange('contactText', e.target.innerHTML)}
              ></p>
              {/* Contact Details */}
              <div className="contact-details">
                {editableContent.contactDetails.map((item, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                    contentEditable={editMode}
                    onBlur={(e) => handleContentChange(`contactDetails.${index}`, e.target.innerHTML)}
                  ></p>
                ))}
              </div>
              {/* Map */}
              <div className="map">
                {/* You can embed a map or provide a link to your location on a map service */}
                <a href={editableContent.mapLink} target="_blank" rel="noopener noreferrer">
                  View on Map
                </a>
              </div>
              {/* End of Map */}
            </div>
           
          </div>
        </div>
      </body>
    </>
  );
}

export default AdminAbout;
