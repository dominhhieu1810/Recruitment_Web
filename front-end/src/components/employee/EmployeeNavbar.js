import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventBus from '../../common/EventBus';
import AuthService from '../../services/auth.service';
import Logo from "../../Logo.png"
import "./EmployeeNavbar.scss"
import { useRef } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
const EmployeeNavbar = (prop) => {
    console.log('check:', prop.page);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    //const [active, setActive] = useState('joblist')
    const active = useRef('joblist')
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
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };
    const handleActive = (value) => {
        active.current = value
        console.log(active);
        //setActive(value)
    }
    return (
        <nav className="employeenavbar navbar navbar-default navbar-fixed-top navbar-sticky-function navbar-expand-md">
            <div className="container-fluid">
                <a className="navbar-brand" href="/employeehome">
                    <img className='logo' alt='logo' src={Logo} />
                </a>

                <div className="collapse navbar-collapse flex-fill" id="navbarSupportedContent">
                    <ul className=" navbar-nav me-auto mb-lg-0">

                        {currentUser ? (

                            <li className="nav-item">
                                <Link to={"/joblists"} className={(prop.page === 'joblists') ? "active job-list nav-link" : "job-list nav-link"}>
                                    Job List
                                </Link>
                            </li>


                        ) : (<li></li>)}
                        {currentUser ? (

                            <li className="nav-item">
                                <Link to={"/uploadcv/" + currentUser.id}  className={(prop.page === 'uploadcv') ? "active job-list nav-link" : "job-list nav-link"}>
                                    Upload CV
                                </Link>
                            </li>


                        ) : (<li></li>)}
                        {currentUser ? (


                            <li className="nav-item">
                                <Link to={"/createcv/"} className={(prop.page === 'createcv') ? "active job-list nav-link" : "job-list nav-link"}>
                                    Create CV
                                </Link>
                            </li>

                        ) : (<li></li>)}

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
                                                <a className="dropdown-item" href={"/employeeprofile/" + currentUser.id}>
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href={"/appliedjobs/" + currentUser.id}>
                                                    Applied Jobs
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href={"/savedjobs/" + currentUser.id}>
                                                    Saved Jobs
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href={"/employeenotifications/" + currentUser.id}>
                                                    Notifications
                                                </a>
                                            </li>
                                            
                                            <li >
                                                <a href="/employeelogin" className="dropdown-item" onClick={logOut} style={{color:"red"}}>
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
                                    <Link to={"/employeeregister"} className="sign-up nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className=" nav-item">
                                    <Link to={"/employeelogin"} className="log-in nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className=" nav-item">
                                    <Link to={"/employerlogin"} className="employer-web nav-link">
                                        Post Jobs
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

export default EmployeeNavbar;