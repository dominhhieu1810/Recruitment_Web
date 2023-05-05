import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventBus from '../../common/EventBus';
import AuthService from '../../services/auth.service';
import Logo from "../../Logo.png"
import './EmployerNavbar.scss'
const EmployerNavbar = () => {
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
        setCurrentUser(undefined);
    };
    return (
        <nav className="employernavbar navbar navbar-default navbar-fixed-top navbar-sticky-function navbar-expand-md">
            <div className="container-fluid">
                <a className="navbar-brand" href="/employerhome">
                    <img className='logo' alt='logo' src={Logo} />
                </a>

                <div className="collapse navbar-collapse flex-fill" id="navbarSupportedContent">
                    <ul className=" navbar-nav me-auto mb-lg-0">

                        {/* {currentUser ? (

                            <li className="nav-item">
                                <Link to={"/joblists"} className={"job-list nav-link"}>
                                    Job List
                                </Link>
                            </li>


                        ) : (<li></li>)}
                        {currentUser ? (

                            <li className="nav-item">
                                <Link to={"/uploadcv/" + currentUser.id} className={"job-list nav-link"}>
                                    Upload CV
                                </Link>
                            </li>


                        ) : (<li></li>)}
                        {currentUser ? (


                            <li className="nav-item">
                                <Link to={"/createcv/"} className="job-list nav-link">
                                    Create CV
                                </Link>
                            </li>

                        ) : (<li></li>)} */}

                    </ul>
                    {currentUser ? (
                        <div className="d-flex">
                            <ul className=" navbar-nav me-auto mb-2 mb-lg-0">
                                {/* <li className="nav-item">
                                    <Link
                                        to={"/employeeprofile/" + currentUser.id}
                                        className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <div className="dropdown">
                                        <a
                                            className="btn dropdown-toggle"
                                            href="#"
                                            role="button"
                                            id="dropdownMenuLink"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {currentUser.username}
                                        </a>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li>
                                                <a className="dropdown-item" href={"/employerprofile/" + currentUser.id}>
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href={"/employernotifications/" + currentUser.id}>
                                                    Notifications
                                                </a>
                                            </li>
                                            
                                            <li >
                                                <a href="/employerlogin" className="dropdown-item" onClick={logOut} style={{color:"red"}}>
                                                Log out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <ul className="unlogin navbar-nav me-auto mb-2 mb-lg-0">
                                <li className=" nav-item">
                                    <Link to={"/employerregister"} className="sign-up nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className=" nav-item">
                                    <Link to={"/employerlogin"} className="log-in nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className=" nav-item">
                                    <Link to={"/employeelogin"} className="employee-web nav-link">
                                        Apply Jobs
                                    </Link>
                                </li>

                            </ul>
                        </div>)
                    }
                </div>
            </div>
        </nav>
    );
};

export default EmployerNavbar;