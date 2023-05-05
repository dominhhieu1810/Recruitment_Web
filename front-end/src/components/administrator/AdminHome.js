import React, { useState, useEffect } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
 
import ManageAccounts from "./ManageAccounts";


// import UserService from "../services/user.service";

const AdminHome = () => {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
    
      
      <ManageAccounts/>
      
      
  );
};

export default AdminHome;
