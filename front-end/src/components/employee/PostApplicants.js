import React, { useState } from "react";
import JobService from "../../services/job.service";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import applicantsService from "../../services/applicants.service";

//import './PostJob.scss'
const PostJob = () => {
    const [currentUserAvatar, setCurrentUserAvatar] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [currentUserCompanyName, setCurrentUserCompanyName] = useState();
    //const [currentUserScale, setCurrentUserScale] = useState();
    const [currentUserCompanyIntro, setCurrentUserCompanyIntro] = useState();
    const [currentUserCompanyAddress, setCurrentUserCompanyAddress] = useState();
    useEffect(() => {
        // const userAvatar = AuthService.getCurrentUser().avatar;
        // if (userAvatar) {
        //     setCurrentUserAvatar(userAvatar);
        // }
        // else {
        //     setCurrentUserAvatar("https://images.yourstory.com/cs/images/companies/download-2023-03-16T125825-1678951734972.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff")
        // }
        // const userId = AuthService.getCurrentUser().id;

        // setCurrentUserId(userId);



    }, [])
    const initialJobState = {
        id: null,
        jobId: "",
        employeeId: "",
        cv: "",
        status: false,
        // title: "",
        // //name: currentUserCompanyName,
        // address: "",
        // approved: false,
        // salary: "",
        // number: "",
        // form: "",
        // rank: "",
        // gender: "",
        // experience: "",
        // profession: "",
        // area: "",
        // description: "",
        // requirement: "",
        // benefit: "",
        // deadline: "",

    };
    //const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);
    const [job, setJob] = useState(initialJobState)
    const handleInputChange = event => {
        const { name, value } = event.target;
        setJob({ ...job, [name]: value });
    };

    const saveJob = () => {
        var data = {
            jobId: job.jobId,
            employeeId: job.employeeId,
            cv: job.cv,


        };

        applicantsService.create(data)
            .then(response => {
                setJob({
                    id: response.data.id,
                    jobId: response.data.jobId,
                    employeeId: response.data.employeeId,
                    cv: response.data.cv,

                    status: response.data.status,

                });
                // setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    //   const newTutorial = () => {
    //     setTutorial(initialTutorialState);
    //     setSubmitted(false);
    //   };

    return (
        <div>
            {/* <EmployerNavbar /> */}
            <div className="d-flex">
                {/* <EmployerSidebar /> */}
                <div className='post-job submit-form'>
                    <div className="form-outline mb-4">
                        <label >JobId</label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobId"
                            value={job.jobId}
                            onChange={handleInputChange}
                            //validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >employeeId</label>
                        <input
                            type="text"
                            className="form-control"
                            name="employeeId"
                            value={job.employeeId}
                            onChange={handleInputChange}
                            //validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >cv</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cv"
                            value={job.cv}
                            onChange={handleInputChange}
                            //validations={[required]}
                            required
                        />
                    </div>
                    {/* <div className="form-outline mb-4">
                        <label >Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={job.title}
                            onChange={handleInputChange}
                            //validations={[required]}
                            required
                        />
                    </div>
                    <div className="table-info row row-cols-2 row-cols-lg-3">
                        <div className="form-outline mb-4">
                            <label >Salary</label>
                            <input
                                type="text"
                                className="form-control"
                                name="salary"
                                value={job.salary}
                                onChange={handleInputChange}
                                //validations={[required]}
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label >Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="number"
                                value={job.number}
                                onChange={handleInputChange}
                                //validations={[required]}
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label >Form of work</label>
                            <input
                                type="text"
                                className="form-control"
                                name="form"
                                value={job.form}
                                onChange={handleInputChange}
                                // validations={[required]}
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label >Rank</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rank"
                                value={job.rank}
                                onChange={handleInputChange}
                                // validations={[required]}
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label >Gender</label>
                            <input
                                type="text"
                                className="form-control"
                                name="gender"
                                value={job.gender}
                                onChange={handleInputChange}
                                // validations={[required]}
                                required
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label >Experience</label>
                            <input
                                type="text"
                                className="form-control"
                                name="experience"
                                value={job.experience}
                                onChange={handleInputChange}
                                // validations={[required]}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-outline mb-4">
                        <label >Profession</label>
                        <input
                            type="text"
                            className="form-control"
                            name="profession"
                            value={job.profession}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >Area</label>
                        <input
                            type="text"
                            className="form-control"
                            name="area"
                            value={job.area}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >Address</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="address"
                            value={job.address}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label >Description</label>
                        <textarea
                            type="textarea"
                            className="form-control"
                            name="description"
                            value={job.description}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >Requirement</label>
                        <textarea
                            type="textarea"
                            className="form-control"
                            name="requirement"
                            value={job.requirement}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >Benefit</label>
                        <textarea
                            type="textarea"
                            className="form-control"
                            name="benefit"
                            value={job.benefit}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label >Dealine</label>
                        <input
                            type="date"
                            className="form-control"
                            name="deadline"
                            value={job.deadline}
                            onChange={handleInputChange}
                            // validations={[required]}
                            required
                        />
                    </div> */}

                    {/* <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </button>
                </div> */}
                    <button onClick={saveJob} className="btn btn-success">
                        Submit
                    </button>
                    {/* {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )} */}
                    {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </div>
            </div>
        </div>
    );
};

export default PostJob;
