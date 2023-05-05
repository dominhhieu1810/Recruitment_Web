import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import AuthService from "./services/auth.service";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import EmployeeRegister from "./components/employee/EmployeeRegister";
import EmployerRegister from "./components/employer/EmployerRegister";

// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";
import PostJob from './components/employer/PostJob'
import EventBus from "./common/EventBus";


import EmployeeHome from "./components/employee/EmployeeHome";
import EmployeeLogin from "./components/employee/EmployeeLogin";
import EmployerLogin from "./components/employer/EmployerLogin";
import AdminHome from "./components/administrator/AdminHome";
import AdminRegister from "./components/administrator/AdminRegister";
import AdminLogin from "./components/administrator/AdminLogin";
import EmployerHome from "./components/employer/EmployerHome";
import ManageAccounts from "./components/administrator/ManageAccounts";
import ManageJobs from "./components/administrator/ManageJobs";
import JobLists from "./components/employee/JobLists";
import Job from "./components/employee/Job";
import ManageJob from "./components/administrator/ManageJob";
import EmployeeProfile from "./components/employee/EmployeeProfile";
import PostedJob from "./components/employer/PostedJob";
import Applicants from "./components/employer/Applicants";
import UploadCV from "./components/employee/UploadCV";
import EmployerProfile from "./components/employer/EmployerProfile";
import PostApplicants from "./components/employee/PostApplicants";
import Body from "./components/CreateCV/Body/Body";
import SimpleSlider from "./components/employee/SimpleSlide";
import EmployeeNotifications from "./components/employee/EmployeeNotifications";
import EmployerNotifications from "./components/employer/EmployerNotifications";
import SavedJobs from "./components/employee/SavedJobs";
import AppliedJobs from "./components/employee/AppliedJobs";
import JobLists_2 from "./components/employee/JobList_2";
import JobLists_3 from "./components/employee/JobList_3";
import JobDetail from "./components/employer/JobDetail";

const App = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    // setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      

      <div className="" style={{margin:"none", padding:"none"}}>
        <Routes>
          <Route path="/" element={<EmployeeHome />} />
          
          
          
          //employee
          <Route path="/employeehome" element={<EmployeeHome />} />
          <Route path="/employeeregister" element={<EmployeeRegister />} />
          <Route path="/employeelogin" element={<EmployeeLogin />} />
          <Route path="/joblists" element={<JobLists />} />
          <Route path="/joblists_2/:title" element={<JobLists_2 />} />
          <Route path="/joblists_3/:profession" element={<JobLists_3 />} />
          <Route path="/job/:id" element={<Job/>} />
          <Route path="employeeprofile/:id" element={<EmployeeProfile/>} />
          <Route path="/uploadcv/:id" element={<UploadCV/>} />
          <Route path="/employeenotifications/:id" element={<EmployeeNotifications/>} />
          <Route path="/savedjobs/:id" element={<SavedJobs/>} />
          <Route path="/appliedjobs/:id" element={<AppliedJobs/>} />

          //employer
          <Route path="/employerhome" element={<EmployerHome />} />
          <Route path="/employerregister" element={<EmployerRegister />} />
          <Route path="/employerlogin" element={<EmployerLogin />} />
          <Route path="/PostJob/:id" element={<PostJob />} />
          <Route path="/postedjob/:id" element={<PostedJob />} />
          <Route path="/applicants/:id" element={<Applicants />} />
          <Route path="employerprofile/:id" element={<EmployerProfile/>} />
          <Route path="/employernotifications/:id" element={<EmployerNotifications/>} />
          <Route path="/jobdetail/:id" element={<JobDetail/>} />

          //admin
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/manageaccounts" element={<ManageAccounts />} />
          <Route path="/managejobs" element={<ManageJobs/>} />
          <Route path="/managejob/:id" element={<ManageJob/>} />
          
          <Route path="/postapplicants" element={<PostApplicants/>} />
          <Route path="/createcv" element={<Body/>} />

          <Route path="/slide" element={<SimpleSlider/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
