import React, { useState } from 'react';
import { FaUserAlt, FaBook, FaSignOutAlt,FaBars, FaCertificate, FaQuestion, FaHome, FaPaypal, FaCashRegister } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "../assets/css/side.css";
import { FastRewindOutlined } from '@material-ui/icons';
// import logo from "../assets/images/logo.png";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: "/AdminHome",
      name: "Home",
      icon: <FaHome />
    },
    {
      path: "/AdminAbout",
      name: "About",
      icon: <FastRewindOutlined />
    },
    {
      path: "/AdminProfile",
      name: "User Profiles",
      icon: <FaUserAlt />
    },
    {
      path: "/AdminCourse",
      name: "Courses",
      icon: <FaBook />
    },
    // {
    //   path: "/ucour",
    //   name: "Enrolled",
    //   icon: <FaCertificate />
    // },
    {
      path: "/AdminEnquiry",
      name: "Enquiries",
      icon: <FaQuestion/>
    },
    
    {
      path: "/Admin",
      name: "Logout",
      icon: <FaSignOutAlt />
    }
  ];

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="top-section">
          <div style={{ display: isOpen ? "block" : "none" }} className="sidebar-logo">
            {/* <img src={logo} alt="Logo" style={{width:'80px' , height:'80px'}}/> */}
          </div>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="sidebar-link" activeClassName="sidebar-active">
            <div className="sidebar-icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link-text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;