import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobService from '../../services/job.service';
import Footer from '../Footer';
import AdminNavbar from './AdminNavbar';
import'../employee/Job.scss'
const ManageJob = (props) => {
  const { id } = useParams();

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
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  const getJob = id => {
    JobService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) { getJob(id); }

  }, [id]);

  const updateApproved = status => {
    var data = {
      id: currentJob.id,
      title: currentJob.title,
      address: currentJob.address,
      approved: status,
      salary: currentJob.salary,
      number: currentJob.number,
      form: currentJob.form,
      rank: currentJob.rank,
      gender: currentJob.gender,
      experience: currentJob.experience,
      profession: currentJob.profession,
      area: currentJob.area,
      description: currentJob.description,
      requirement: currentJob.requirement,
      benefit: currentJob.benefit,
      deadline: currentJob.deadline,
      avatar: currentJob.avatar,
      employerId: currentJob.employerId,
    };

    JobService.update(currentJob.id, data)
      .then(response => {
        setCurrentJob({ ...currentJob, approved: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (

    <div className='job'>
      <AdminNavbar />
      {currentJob ? (

        <div className='job-content'>

          <div className='box-header d-flex align-items-center justify-content-between'>
            <div className='box-avatar d-flex align-items-center justify-content-center'>
              <img className='company-logo' src={currentJob.avatar} />
            </div>
            <div className='box-info flex-fill'>
              <h3 className='job-title'>{currentJob.title}</h3>
              <p className='company-name'>{currentJob.name}</p>
              <p className='deadline'><i className="fa-regular fa-clock"></i> Hạn nộp hồ sơ: {currentJob.deadline} </p>
            </div>
            <div className='box-apply d-flex justify-content-end'>
              {currentJob.approved ? (
                <button className='btn apply-button btn-success' onClick={()=>updateApproved(false)}>Unapprove </button>
              ) : (
                <button className='btn apply-button btn-success' onClick={()=>updateApproved(true)}>Approve </button>
              )
              }
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
                      <div className="title col">Number of recruiters</div>
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
              <h5 className='title-benefit'>Benefits</h5>
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

export default ManageJob;