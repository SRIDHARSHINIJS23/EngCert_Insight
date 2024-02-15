import React from 'react';
import '../assets/css/About.css';
import NavAdmin from '../components/NavBar';

function About() {
  return (
    <>
      <NavAdmin />
      <body>
        <div id="about11">
          <div id="about-h">
            <h1 className="main-heading">Your Gateway to Mastering British English</h1>
            <p className="intro-text">
              Welcome to British English Certification, your premier destination for achieving proficiency in British English. We are dedicated to delivering unparalleled language education that transcends borders and empowers learners worldwide.
            </p>
            <br></br>
            <h2>Shaping Language Excellence</h2>
            <p>
              Our overarching mission is to equip individuals with the skills and confidence to communicate effectively in British English. We are committed to crafting courses that make the journey of learning enjoyable, interactive, and rewarding.
            </p>
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
              <h2>Why Choose British English Certification?</h2>
              <ul>
                <li><strong>Expert Instructors:</strong> Our seasoned and certified instructors guide you through every facet of the language learning process.</li>
                <li><strong>Comprehensive Curriculum:</strong> British English Certification boasts a meticulously designed curriculum covering grammar intricacies, rich vocabulary, nuanced pronunciation, and cultural subtleties.</li>
                <li><strong>Interactive Learning:</strong> Our courses incorporate interactive lessons, engaging quizzes, and practical exercises for a holistic understanding and application of English language concepts.</li>
                <li><strong>Flexible Learning:</strong> Life is dynamic, and so is our approach to education. Our flexible learning options enable you to set your pace, allowing you to learn at your convenience from the comfort of your home.</li>
              </ul>
            </div>
            <br></br>
            <div id="Whatmakesusbetter">
              <h2>What Sets Us Apart?</h2>
              <ul>
                <li><strong>British English Focus:</strong> Dive into the richness of British English with courses specifically tailored to its unique nuances. Immerse yourself in the language as it is spoken in the United Kingdom.</li>
                <li><strong>Supportive Community:</strong> Become part of a dynamic community of learners. Connect with fellow students, share experiences, and practice your English in a supportive and inclusive environment.</li>
                <li><strong>Certification:</strong> Achieve recognition for your language prowess with our certification upon successful course completion. This credential not only validates your proficiency but also opens doors to a myriad of academic and professional opportunities.</li>
              </ul>
              <p>
                <strong>A Vibrant Learning Experience Awaits</strong>
                <br />
                With a focus on excellence, British English Certification stands as a beacon for those seeking to master British English. Our courses are not just about learning a language; they are a gateway to cultural understanding, global communication, and personal growth.
              </p>
            </div>
            <br></br>
            {/* Contact Section */}
            <div id="Contact" className="contact-section">
              <h2>Contact Us</h2>
              <p>
                Have questions or need assistance? Feel free to reach out to us. Our support team is here to help.
              </p>
              {/* Contact Details */}
              <div className="contact-details">
                <p><strong>Address:</strong> 123 Main Street, Cityville, Country</p>
                <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                <p><strong>Email:</strong> info@yourcompany.com</p>
                <p><strong>Website:</strong> www.yourwebsite.com</p>
                <p><strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>
              </div>
              {/* Map */}
              <div className="map">
                {/* You can embed a map or provide a link to your location on a map service */}
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
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

export default About;
