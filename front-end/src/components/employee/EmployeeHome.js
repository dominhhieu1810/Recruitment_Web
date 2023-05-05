import { Pagination } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobService from '../../services/job.service';
import EmployeeNavbar from './EmployeeNavbar';

import "./EmployeeHome.scss"
import Footer from '../Footer';
import AuthService from '../../services/auth.service';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const EmployeeHome = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterProfession, setFilterProfession] = useState("");
  const [filterArea, setFilterArea] = useState("")
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [active, setActive] = useState('');
  // let date;
  // const pageSizes = [10];
  const [currentuser, setCurrentuser] = useState();
  let navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    console.log(searchTitle);
  };
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    setCurrentuser(user)
  }, [])
  //console.log(currentuser);

  const getRequestParams = (searchTitle, filterProfession, filterArea, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (filterProfession) {
      params["profession"] = filterProfession;
    }
    if (filterArea) {
      params["area"] = filterArea;
    }
    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveJobs = () => {
    const params = getRequestParams(searchTitle, filterProfession, filterArea, page, pageSize);
    // console.log(new Date().getDate() - new Date('2023-03-15T13:29:15.524486Z').getDate());
    JobService.getAllApproved(params)
      .then((response) => {
        const { jobs, totalPages } = response.data;

        setJobs(jobs);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveJobs, [page, pageSize]);

  const refreshList = () => {

    retrieveJobs();
    setCurrentJob(null);
    setCurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  const removeAllJobs = () => {
    JobService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleProfessionChange = (e) => {
    setFilterProfession(e.target.value);
    console.log(filterProfession);
  }
  const handleAreaChange = (e) => {
    setFilterArea(e.target.value);
    console.log(filterArea);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const viewjob = () => {
    navigate("/job/" + currentJob.id)
  }
  const handleJobarea = (value) => {

    const params = getRequestParams(searchTitle, filterProfession, value, page, pageSize);
    // console.log(new Date().getDate() - new Date('2023-03-15T13:29:15.524486Z').getDate());
    JobService.getAllApproved(params)
      .then((response) => {
        const { jobs, totalPages } = response.data;

        setJobs(jobs);
        setCount(totalPages);
        setActive(value);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const searchJob = () =>{
    navigate("/joblists_2/"+searchTitle);
  }
  const popularJob = (profession)=> {
    navigate("/joblists_3/"+profession);
  }
  return (
    <div>
      <EmployeeNavbar />
      <div className="JobLists">

        <div className=" col-md">
          <div className="search-title-job input-group">
            <input
              type="text"
              className="search-item form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />

            <div className=" search-item input-group-append">
              <button
                className="search-btn btn btn-success"
                type="button"
                onClick={searchJob}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>
        </div>


        <section className='create-cv' id="">
          <div className="container">
            <div className="row d-flex  justify-content-center">
              <div className="box-content col-md-5">
                <div className="box-create-cv mb-16">
                  <div className="box-item">
                    <h4>Create CV online </h4>

                    <a href={(currentuser) ? "/createcv" : "/employeelogin"} className="btn btn-success btn-search-job" ><i className="fa-solid fa-plus"></i> Create CV </a>
                  </div>
                  <div className="box-image d-flex align-items-center justify-content-center">
                    <img src="https://www.topcv.vn/v4/image/welcome/mau_cv.png?v=1.0.0" alt="Tao CV online an tuong" title="Tạo CV online ấn tượng" className="img-responsive" />
                  </div>
                </div>
              </div>
              <div className=" box-content col-md-5">
                <div className="box-create-cv">
                  <div className="box-item">
                    <h4>Use existing CV </h4>
                    <a href={(currentuser) ? "/uploadcv/" + currentuser.id : "/employeelogin"} className="btn btn-success btn-search-job" > <i className="fa-solid fa-upload"></i> Upload CV </a>
                  </div>
                  <div className="box-image box-upload d-flex align-items-center justify-content-center">
                    <img src="https://www.topcv.vn/v4/image/welcome/upload-cv.png?v=1.0.0" title="Sử dụng CV theo ngành nghề" alt="Su dung CV theo nganh nghe" className="img-responsive" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className='body-content'>
          <div className="list-job col-md" id='list-job'>
            <h1 style={{ marginBottom: "3%" }}>Tin tuyển dụng</h1>
            <div className="box-smart-list-location d-flex">
              <div data-city_id="0" className={(active === "") ? " active box-smart-item" : " box-smart-item"} onClick={() => handleJobarea('')}>
                Ngẫu Nhiên
              </div>
              <div data-city_id="1" className={(active === "Hà Nội") ? " active box-smart-item" : " box-smart-item"} onClick={() => handleJobarea('Hà Nội')}>
                Hà Nội
              </div>
              <div data-city_id="2" className={(active === "Hồ Chí Minh") ? " active box-smart-item" : " box-smart-item"} onClick={() => handleJobarea('Hồ Chí Minh')}>
                Thành phố Hồ Chí Minh
              </div>
              <div data-city_id="41" className={(active === "Miền Bắc") ? " active box-smart-item" : " box-smart-item"} onClick={() => handleJobarea('Miền Bắc')}>
                Miền Bắc
              </div>
              <div data-city_id="42" className={(active === "Miền Nam") ? " active box-smart-item" : " box-smart-item"} onClick={() => handleJobarea('Miền Nam')}>
                Miền Nam
              </div>
            </div>
            <ul className="job-body">
              {jobs &&
                jobs.map((job, index) => (

                  <li
                    className={
                      "job-items " + (index === currentIndex)
                    }
                    onMouseEnter={() => setActiveJob(job, index)}
                    onMouseLeave={() => setActiveJob(null, null)}
                    onClick={viewjob}
                    key={index}
                  >
                    <div className='job-item'>
                      <div className='box-header d-flex'>
                        <div className='avatar d-flex align-items-center justify-content-center'>
                          <img className='company-logo' src={job.avatar} />
                        </div>
                        <div className='jobbody'>
                          <h5 className='job-title'>{job.title}</h5>
                          <p className='company-name'>{job.name}</p>
                        </div>

                      </div>
                      <div className='label-content d-flex align-items-center'>

                        <label className='label-item flex-fill salary'><i className="icon fa-solid fa-coins"></i>{job.salary}</label>
                        <label className='label-item flex-fill form'><i className="icon fa-solid fa-business-time"></i>{job.form}</label>
                        <label className='label-item flex-fill deadline'><i className="icon fa-solid fa-clock"></i>{new Date(job.deadline).getDate() ? "Còn " + (Math.abs(new Date().getTime() - new Date(job.deadline).getTime()) / 86400000).toFixed() + " ngày" : (job.deadline)}</label>
                      </div>

                    </div>

                  </li>
                ))}
            </ul>
            <Pagination
              className="pagination d-flex align-items-center justify-content-center my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>
          <div className='job-slide'>
            <h2 className='title-slide'> Top Jobs</h2>
            <Slider {...settings}>
              <div>
                <div className="d-flex justify-content-evenly mb-3">
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Marketing')}>
                    <div className="icon d-flex justify-content-center align-items-center "><i className="fa-solid fa-briefcase"></i>
                    </div>
                    <div className="text_ellipsis">
                      <h4 className="name_category">Marketing</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Ngân Hàng')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i></div>
                    <div className="text_ellipsis"><h4 className="name_category">Ngân Hàng</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Nhân Sự')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i>
                    </div> <div className="text_ellipsis">
                      <h4 className="name_category">Nhân Sự</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-evenly mb-3">
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Hành Chính')}>
                    <div className="icon d-flex justify-content-center align-items-center "><i className="fa-solid fa-briefcase"></i>
                    </div>
                    <div className="text_ellipsis">
                      <h4 className="name_category">Hành Chính</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('It Phần Mềm')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i></div>
                    <div className="text_ellipsis"><h4 className="name_category">It Phần Mềm</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Kế Toán')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i>
                    </div> <div className="text_ellipsis">
                      <h4 className="name_category">Kế Toán</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              <div className="d-flex justify-content-evenly mb-3">
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Kinh Doanh')}>
                    <div className="icon d-flex justify-content-center align-items-center "><i className="fa-solid fa-briefcase"></i>
                    </div>
                    <div className="text_ellipsis">
                      <h4 className="name_category">Kinh Doanh</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Bất Động Sản')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i></div>
                    <div className="text_ellipsis"><h4 className="name_category">Bất Động Sản</h4>
                    </div>
                  </div>
                  <div className="box-item d-flex align-items-center" onClick={()=>popularJob('Dịch Vụ Khách Hàng')}>
                    <div className="icon d-flex justify-content-center align-items-center"><i className="fa-solid fa-briefcase"></i>
                    </div> <div className="text_ellipsis">
                      <h4 className="name_category">Dịch Vụ Khách Hàng</h4>
                    </div>
                  </div>
                </div>
              </div>

            </Slider>
          </div>
        </div>






      </div>
      <Footer />
    </div>
  );
};


export default EmployeeHome;
