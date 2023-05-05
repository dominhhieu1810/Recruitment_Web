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
import AuthService from '../../services/auth.service';
const EmployerSidebar = (props) => {
    
    
    const [currentEmployerId, setCurrentEmployerId] = useState(null);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentEmployerId(user.id)
        }
    }, []);
    //console.log(currentUser.username);
    return (

        <div className="Sidebar">
            <div className="center">
                <ul>
                    <li className={(props.page === 'profile') ? "active" : ""}>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span><Link to={"/employerprofile/"+currentEmployerId} className=" nav-link">
                        Profile
                        </Link></span>
                    </li>
                    {/* <li>
                        <PasswordIcon className="icon" />
                        <span>Change Password</span>
                    </li> */}
                    <li className={(props.page === 'postjob') ? "active" : ""}>
                        <IosShareIcon className="icon" />
                        <span><Link to={"/PostJob/"+currentEmployerId} className="nav-link">
                        Post a job
                        </Link></span>
                    </li>
                    <li className={(props.page === 'postedjob') ? "active" : ""}>
                        <WorkOutlineIcon className="icon" />
                        <span><Link to={"/postedjob/"+currentEmployerId} className="nav-link">
                        Posted jobs
                        </Link></span>
                    </li>
                    {/* <li>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li> */}
                </ul>
            </div>
        </div>

    );
};

export default EmployerSidebar;