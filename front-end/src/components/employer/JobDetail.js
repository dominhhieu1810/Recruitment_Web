import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import JobService from '../../services/job.service';
import UsersService from '../../services/users.service';
import Footer from '../Footer';
import ApplicantsService from '../../services/applicants.service'
import '../employee/Job.scss'
import { appBarClasses } from '@mui/material';
import { useRef } from 'react';
import { Pagination } from '@material-ui/lab';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmployerNavbar from './EmployerNavbar';


const JobDetail = (props) => {
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

  const viewApplicants = () => {
    console.log('check');
    navigate('/applicants/' + id)
  }

  return (

    <div className='job'>
      <EmployerNavbar />
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
                <button className='btn apply-button btn-success' onClick={viewApplicants}><i className="fa-regular fa-paper-plane"></i> Apply for this job </button>
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
      


      <Footer />
    </div>

  );
};

export default JobDetail;