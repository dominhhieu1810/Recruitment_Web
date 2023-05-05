import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UsersService from '../../services/users.service';
import Footer from '../Footer';
import EmployeeNavbar from './EmployeeNavbar';

import './EmployeeProfile.scss'
const EmployeeProfile = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialEmployeeState = {
        id: null,
        username: "",
        email: "",
        password: "",
        fullname: "",
        phone: "",
        address: "",
        gender: "",
        birthday: "",
        age: "",
        profession: "",
        avatar: "",
        description: "",
        cv: "",
        jobsapplied: [],

    };
    const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const [cv, setCv] = useState('')
    const [avatar, setAvatar] = useState('')
    const getEmployee = id => {
        UsersService.get(id)
            .then(response => {
                setCurrentEmployee(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id)
            getEmployee(id);
    }, [id]);
    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleFileSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fileAddress', file)
        //console.log(formData);
        axios.post("http://localhost:8080/api/file/upload", formData, {
        }).then(res => {
            const data = res.data.fileCreated.fileAddress
            //console.log(data);
            //setCv(data)
            setCurrentEmployee({ ...currentEmployee, 'avatar': data })
            //console.log('check:',res.data.fileCreated.fileAddress)
        })
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };


    const updateEmployee = () => {

        UsersService.update(currentEmployee.id, currentEmployee)
            .then(response => {
                console.log(response.data);
                alert("Your profile has been updated succesfully")

            })
            .catch(e => {
                console.log(e);
            });
    };




    return (
        <div>
            <EmployeeNavbar />
            <div className='content'>
                {currentEmployee ? (
                    <div className="profile edit-form">
                        <h3>{currentEmployee.username} profile</h3>
                        <form>
                            <div className="form-outline mb-4">
                                <label htmlFor="fullname">Fullname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullname"
                                    name="fullname"
                                    value={currentEmployee.fullname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="table-info row row-cols-2 row-cols-lg-3">
                                <div className="form-outline mb-4">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={currentEmployee.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="gender">Gender</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gender"
                                        name="gender"
                                        value={currentEmployee.gender}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor="birthday">Birthday</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birthday"
                                        name="birthday"
                                        value={currentEmployee.birthday}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor="age">Age</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        value={currentEmployee.age}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor="profession">Profession</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="profession"
                                        name="profession"
                                        value={currentEmployee.profession}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={currentEmployee.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    type="textarea"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={currentEmployee.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label htmlFor="avatar">Avatar</label>
                                <div className='d-flex'>
                                    <input type="file" onChange={onFileChange} />
                                    <button className="btn btn-primary" onClick={handleFileSubmit}>Upload</button>
                                </div>

                            </div>
                        </form>

                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={updateEmployee}
                        >
                            Update
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
};

export default EmployeeProfile;