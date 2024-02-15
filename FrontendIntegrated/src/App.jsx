// App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Course from './pages/Course';
import Coursedes from './pages/Coursedes';
import Profile from './pages/Profile';
import Usercourse from './pages/Usercourse';
import Sidebar from './pages/Sidebar';
import EnquiryPage from './pages/EnquiryPage';
import AdminLogin from './pages/AdminLogin';
import AdminCourse from './pages/Course';
import ManageCourses from './pages/AdminCourse';
import AdminEnquiry from './pages/AdminEnquiry';
import AdminUserProfile from './pages/AdminProfile';
import AdminAbout from './pages/AdmiAbout';
import AdminHome from './pages/AdminHome';
import AdminPayment from './pages/AdminPayment';

function App() {
  return (
    <Router>
      {/* <AdminLogin/> */}
      {/* <Course /> */}
      <>
        {/* <Sidebar/> */}
        {/* <Sidebar/> */}
        {/* <Login/> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/pro" element={<Profile/>}/>
          <Route path="/ucour" element={<Usercourse/>}/>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Course" element={<Course />} />
          <Route path="/coursedes/:courseId" element={<Coursedes/>} />

          {/* <Route path="/Coursedes:courseId" element={<Coursedes />} /> */}
          <Route path="/Admin" element={<AdminLogin />} />
          <Route path="/AdminCourse" element={<ManageCourses />} />
          <Route path="/AdminEnquiry" element={<AdminEnquiry />} />
          <Route path="/AdminProfile" element={<AdminUserProfile />} />
          <Route path="/AdminAbout" element={<AdminAbout />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminPayment" element={<AdminPayment />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
