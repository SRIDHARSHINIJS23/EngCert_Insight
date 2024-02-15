import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/NavBar.css'; // Import your CSS file

function NavAdmin() {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <>
      <nav>
        <h3 style={{ fontFamily: 'monospace', color: 'white', fontSize: '25px' }}>
          British English Certification
        </h3>
        <div>
          <div id="mobile" onClick={handleToggleMenu}>
          <button style={{"backgroundColor":"rgb(5, 5, 110)","width":"70px"}}><i className="fas fa-bars"></i>
      </button>
          </div>
          <ul id="navbar" className={isMenuVisible ? 'active' : ''}>
            <li><Link to="/" onClick={handleToggleMenu}>Home</Link></li>
            <li><Link to="/About" onClick={handleToggleMenu}>About us</Link></li>
            <li><Link to="/Login" onClick={handleToggleMenu}>Login/Sign Up</Link></li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavAdmin;
