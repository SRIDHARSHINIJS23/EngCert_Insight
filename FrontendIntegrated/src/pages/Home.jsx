import React from 'react';
import '../assets/css/Home.css'; // Importing the common styles
import NavAdmin from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavAdmin />
      <div id="homebg" className="my-slideshow-container">
        <div className="my-slide my-fade active" style={{"color":"black","backgroundColor":"rgba(246, 249, 300, 0.5)"}}>
          <div className="my-numbertext">1 / 1</div>
          <div className='con'>
            <h1>IELTS (International English Language Testing System)</h1>
            <h3>The International English Language Testing System (IELTS) is designed to help you achieve your ambition of working, studying or moving to a country where English is spoken.</h3>
            <h3>Jointly owned by the British Council; IDP IELTS; and Cambridge University Press & Assessment - IELTS combines global presence with a commitment to academic research.</h3>
            <h3>For more than 30 years IELTS has set the standard for English language testing. Trusted by governments, employers and educational institutions - we've helped millions of people to achieve their goals.</h3>
          </div>
        </div>
        <br />
        {/* No dot buttons */}
      </div>
    </div>
  );
};

export default Home;