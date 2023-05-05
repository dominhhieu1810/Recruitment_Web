import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import "../Sidebar.scss"
import PasswordIcon from '@mui/icons-material/Password';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AuthService from '../../services/auth.service';
const AdminSidebar = (props) => {
    // console.log('call sidebar.js');
    const user = AuthService.getCurrentUser()
    // console.log(currentUser.username);
    return (

        <div className="Sidebar">
            <div className="center">
                <ul>
                    <li className={(props.page === 'manageaccounts') ? "active" : ""}>
                        <ManageAccountsOutlinedIcon className="icon" />
                        <span><Link to={"/manageaccounts"} className="nav-link">
                            Manage Accounts
                        </Link>
                        </span>
                    </li>

                    <li className={(props.page === 'managejobs') ? "active" : ""}>
                        <AssignmentTurnedInOutlinedIcon className="icon" />
                        <span><Link to={"/managejobs"} className="nav-link">
                            Manage Jobs
                        </Link>
                        </span>
                    </li>
                    {/* <li className={(props.page === 'profile') ? "active" : ""}>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li> */}
                </ul>
            </div>
        </div>

    );
};

export default AdminSidebar;