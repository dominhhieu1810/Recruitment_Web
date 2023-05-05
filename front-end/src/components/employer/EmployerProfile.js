import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UsersService from '../../services/users.service';
import Footer from '../Footer';
import EmployerNavbar from './EmployerNavbar';
import EmployerSidebar from './EmployerSidebar';
import './EmployerProfile.scss'
const EmployerProfile = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();
    
    const initialEmployerState = {
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
        scale: "",

    };
    const [currentEmployer, setCurrentEmployer] = useState(initialEmployerState);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const [cv, setCv] = useState('')
    const [avatar, setAvatar] = useState('')
    const getEmployer = id => {
        UsersService.get(id)
            .then(response => {
                setCurrentEmployer(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id)
            getEmployer(id);
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
            setCurrentEmployer({ ...currentEmployer, 'avatar': data })
            //console.log('check:',res.data.fileCreated.fileAddress)
        })
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEmployer({ ...currentEmployer, [name]: value });
    };


    const updateEmployer = () => {
        console.log(currentEmployer.cv);
        //setCurrentEmployer({ ...currentEmployer ,'cv':cv,'avatar':avatar});
        UsersService.update(currentEmployer.id, currentEmployer)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };



    return (
        <div>
            <EmployerNavbar />
            <div className='d-flex'>
                <EmployerSidebar page='profile'/>
                <div className='content'>
                    {currentEmployer ? (
                        <div className="profile edit-form">
                            <h3>{currentEmployer.username}'s profile</h3>
                            <form>
                                <div className="form-outline mb-4">
                                    <label htmlFor="fullname">Company's name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        name="fullname"
                                        value={currentEmployer.fullname}
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
                                            value={currentEmployer.phone}
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
                                            value={currentEmployer.profession}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="scale">Scale</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="scale"
                                            name="scale"
                                            value={currentEmployer.scale}
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
                                        value={currentEmployer.address}
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
                                        value={currentEmployer.description}
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
                                onClick={updateEmployer}
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
            </div>

            <Footer />
        </div>
    )
};

export default EmployerProfile;