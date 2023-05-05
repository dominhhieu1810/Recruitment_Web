import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import JobService from '../../services/job.service';
import UsersService from '../../services/users.service';
import Footer from '../Footer';
import EmployeeNavbar from './EmployeeNavbar';
import ApplicantsService from '../../services/applicants.service'
import './Job.scss'
import { appBarClasses } from '@mui/material';
import { useRef } from 'react';
import { Pagination } from '@material-ui/lab';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobLists_2 from './RecommendJobs';
import RecommendJobs from './RecommendJobs';
import CompanyJobs from './CompanyJobs'
import notificationService from '../../services/notification.service';
const Job = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  let userId = useRef("")
  let cv = useRef("")
  const initialJobState = {
    id: null,
    title: "",
    address: "",
    approved: true,
    salary: "",
    number: "",
    form: "",
    rank: "",
    gender: "",
    experience: "",
    profession: "",
    area: "",
    description: "",
    requirement: "",
    benefit: "",
    deadline: "",
    avatar: "",
    employerId: "",

  };
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
    jobssaved: [],

  };
  const initialApplicants = {
    id: null,
    jobId: "",
    employeeId: "",
    cv: "",
    status: false

  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  //const [currentUser, setCurrentUser] = useState(undefined)
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [noti, setNoti] = useState();

  const [jobs, setJobs] = useState([]);
  const [currentJobCompany, setCurrentJobCompany] = useState(null);
  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      userId.current = AuthService.getCurrentUser().id;
    }
  })


  useEffect(() => {
    getEmployee(userId.current)
  }, [])

  const getJob = id => {
    JobService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log('currentJob: ', response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };
  const getEmployee = currentEmployeeId => {
    UsersService.get(currentEmployeeId)
      .then(response => {
        setCurrentEmployee(response.data);

        console.log('check cv:', currentEmployee);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) { getJob(id); }

  }, [id]);


  // console.log('check3: ', company);
  //  
  // const applyJob = () => {
  //   console.log(currentEmployeeId);
  //   if (currentEmployee) {
  //     UsersService.updateAppliedJob(currentEmployeeId, { 'jobsapplied': [`${id}`] })
  //       .then(response => {
  //         console.log(response.data);
  //         //setMessage("The tutorial was updated successfully!");
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //     //getEmployee(currentEmployeeId);
  //     console.log(currentEmployee.jobsapplied);
  //   }
  //   else {
  //     navigate("/employeelogin")
  //   }
  // }

  const savejob = () => {
    console.log('check', userId.current);
    if (userId.current) {
      UsersService.updateSavedJob(userId.current, { 'jobssaved': [`${id}`] })
      JobService.updateSavedUser(id, { 'savedUser': [`${userId.current}`] })
        .then(response => {
          console.log(response.data);
          //setMessage("The tutorial was updated successfully!");
          alert('You have successfully saved this recruitment');
          window.location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      navigate("/employeelogin")
    }
  }


  const saveApplicants = () => {
    var data = {
      jobId: id,
      employeeId: userId.current,
      employeeName: currentEmployee.fullname,
      employerFullname: currentJob.name,
      employerAvatar: currentJob.avatar,
      cv: currentEmployee.cv,
      status: false,
    };
    var notification = {
      title: 'Notification from '+ currentEmployee.fullname,
      userAvatar: currentEmployee.avatar,
      userId: currentJob.employerId,
      content:currentEmployee.fullname+ 'has applied for your job "'+currentJob.title+'"',
      read: false,
  };

  
    if (userId.current) {
      notificationService.create(notification)
      UsersService.updateAppliedJob(userId.current, { 'jobsapplied': [`${id}`] })
      JobService.updateAppliedUser(id, { 'appliedUser': [`${userId.current}`] })
      ApplicantsService.create(data)
        .then(response => {
          setApplicants({
            id: response.data.id,
            jobId: response.data.jobId,
            employeeId: response.data.employeeId,
            employeeName: response.data.employeeName,
            employerFullname: response.data.employerFullname,
            employerAvatar: response.data.employerAvatar,
            cv: response.data.cv,
            status: response.data.status,
          });
          // setSubmitted(true);
          console.log(response.data);
          window.location.reload()
          alert("You have successfully applied for this job")
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      navigate("/employeelogin")
    }
  };


  return (

    <div className='job'>
      <EmployeeNavbar />
      {currentJob ? (

        <div className='job-content'>

          <div className='box-header d-flex align-items-center justify-content-between'>
            <div className='box-avatar d-flex align-items-center justify-content-center'>
              <img className='company-logo' src={currentJob.avatar} />
            </div>
            <div className='box-info flex-fill'>
              <h3 className='job-title'>{currentJob.title}</h3>
              <p className='company-name'>{currentJob.name}</p>
              <p className='deadline'><i className="fa-regular fa-clock"></i> Deadline: {currentJob.deadline} </p>
            </div>
            <div className='box-apply '>
              {userId.current
                ? (currentEmployee.jobsapplied.includes(id) 
                ? (<button className='btn apply-button btn-info' ><i className="fa-regular fa-paper-plane"></i> You have applied for this job </button>)
                  : (<button className='btn apply-button btn-success' onClick={saveApplicants}><i className="fa-regular fa-paper-plane"></i> Apply for this job </button>))

                : (<button className='btn apply-button btn-success' onClick={saveApplicants}><i className="fa-regular fa-paper-plane"></i> Apply for this job </button>)
                }
              {userId.current
              ? (currentEmployee.jobssaved.includes(id) ? (
                <button className='btn save-button btn-light' ><i className="fa-solid fa-heart" style={{color:'red'}}></i> You have saved this job </button>)
                : (<button className='btn save-button btn-light' onClick={savejob}><i className="fa-solid fa-heart" ></i> Save this job </button>))

              : (<button className='btn save-button btn-light' onClick={savejob}><i className="fa-solid fa-heart" ></i> Save this job </button>)}
            </div>

          </div>

          <div className='box-main'>
            <h3 style={{ fontWeight: 'bold' }}>Job Details</h3>

            <div className='general-information'>
              <div className='title-table'>General information</div>
              <div className="table-info row row-cols-2 row-cols-lg-3">

                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-money-bill-wave"></i></div>
                    <div className='info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Salary</div>
                      <div className=" col">{currentJob.salary}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-people-group"></i></div>
                    <div className=' info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Mumber of recruiters</div>
                      <div className="col">{currentJob.number}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-briefcase"></i></div>
                    <div className='info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Form of work</div>
                      <div className="col">{currentJob.form}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-medal"></i></div>
                    <div className='info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Rank</div>
                      <div className="col">{currentJob.rank}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-venus-mars"></i></div>
                    <div className='info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Gender</div>
                      <div className="col">{currentJob.gender}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className='info-item d-flex align-items-center'>
                    <div className='info-icon d-flex align-items-center justify-content-center'><i className="fa-solid fa-calendar-days"></i></div>
                    <div className='info-content row row-cols-1 row-cols-lg-1'>
                      <div className="title col">Experience</div>
                      <div className="col">{currentJob.experience}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='work-address'>
              <div className='title-address'>Address</div>
              <div className='address-info' >{currentJob.address}</div>
            </div>

            <div className='job-description'>
              <h5 className='title-description'>Descriptions</h5>
              <div className='description-info'> {currentJob.description}</div>
            </div>

            <div className='job-requirement'>
              <h5 className='title-requirement'>Requirements</h5>
              <div className='requirement-info'> {currentJob.requirement}</div>
            </div>

            <div className='job-benefit'>
              <h5 className='title-benefit'>Benefits </h5>
              <div className='benefit-info'> {currentJob.benefit}</div>
            </div>
          </div>

          <div className='box-company'>
            <h3 style={{ fontWeight: 'bold' }}> {currentJob.name}'s information</h3>
            <div className="col">
              <div className='info-company d-flex'>
                <div className='info-icon d-flex justify-content-center'><i className="icon fa-regular fa-building"></i></div>
                <div className='info-content row row-cols-1 row-cols-lg-1'>
                  <div className="title col">Introduction</div>
                  <div className=" col">{currentJob.companyIntro}</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className='info-company d-flex'>
                <div className='info-icon d-flex justify-content-center'><i className="icon fa-solid fa-user-plus"></i></div>
                <div className='info-content row row-cols-1 row-cols-lg-1'>
                  <div className="title col">Scale</div>
                  <div className=" col">{currentJob.companyScale}</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className='info-company d-flex'>
                <div className='info-icon d-flex justify-content-center'><i className="icon fa-solid fa-location-dot"></i></div>
                <div className='info-content row row-cols-1 row-cols-lg-1'>
                  <div className="title col">Address</div>
                  <div className="col">{currentJob.companyAddress}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      ) : (
        <div>
        </div>
      )}
      <CompanyJobs title={currentJob.title} name={currentJob.name} />

      <RecommendJobs title={currentJob.title} profession={currentJob.profession} area={currentJob.area} />


      <Footer />
    </div>

  );
};

export default Job;