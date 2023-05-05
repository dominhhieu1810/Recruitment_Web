import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UsersService from '../../services/users.service';
import Footer from '../Footer';
import EmployeeNavbar from './EmployeeNavbar';


const UploadCV = (props) => {
    const { id } = useParams();
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
    
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };


    const updateEmployee = () => {
        console.log(currentEmployee.cv);
        //setCurrentEmployee({ ...currentEmployee ,'cv':cv,'avatar':avatar});
        UsersService.update(currentEmployee.id, currentEmployee)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const onFileChange = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
        
    }
    const handleFileSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fileAddress', file)
        axios.post("http://localhost:8080/api/file/upload", formData, {
        }).then(res => {
            const data = res.data.fileCreated.fileAddress
            setCurrentEmployee({ ...currentEmployee, 'cv': data })
        })
    }


    return (
        <div>
            <EmployeeNavbar page={'uploadcv'}/>
            <div className='content'>
                {currentEmployee ? (
                    <div className="profile edit-form">
                        <h3>Upload your CV</h3>
                        <form>
                            <div className="form-outline mb-4">
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
                            Submit
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
};

export default UploadCV;