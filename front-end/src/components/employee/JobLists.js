import { Pagination } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobService from '../../services/job.service';
import EmployeeNavbar from './EmployeeNavbar';

import "./JobList.scss"
import Footer from '../Footer';
import AuthService from '../../services/auth.service';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
const JobLists = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState('')
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState('');
  // let date;
  // const pageSizes = [10];const 

  const [filterProfession, setFilterProfession] = useState("");
  const [filterArea, setFilterArea] = useState("")
  const [filterForm, setFilterForm] = useState('')
  const [filterRank, setFilterRank] = useState('')


  const [currentuser, setCurrentuser] = useState();
  let navigate = useNavigate();
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    console.log(searchTitle);
  };
  const onChangeSearchCompanyName = (e) => {
    const searchCompanyName = e.target.value;
    setSearchCompanyName(searchCompanyName);

  };
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    setCurrentuser(user)
  }, [])
  //console.log(currentuser);

  const getRequestParams = (searchTitle,searchCompanyName, filterProfession, filterArea, filterForm, filterRank, page, pageSize) => {
    let params = {};
    console.log(searchCompanyName);
    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if(searchCompanyName){
      params["name"] = searchCompanyName;
    }
    if (filterProfession) {
      params["profession"] = filterProfession;
    }
    if (filterArea) {
      params["area"] = filterArea;
    }
    if (filterForm) {
      params["form"] = filterForm;
    }
    if (filterRank) {
      params["rank"] = filterRank;
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
    const params = getRequestParams(searchTitle, searchCompanyName, filterProfession, filterArea, filterForm, filterRank, page, pageSize);
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
    //console.log(filterProfession);
  }
  const handleAreaChange = (e) => {
    setFilterArea(e.target.value);
    //console.log(filterArea);
  }
  const handleFormChange = (e) => {
    setFilterForm(e.target.value);
    //console.log(filterArea);
  }
  const handleRankChange = (e) => {
    setFilterRank(e.target.value);
    //console.log(filterArea);
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

  return (
    <div>
      <EmployeeNavbar page={'joblists'} />
      <div className="JobLists">

        {/* <div className=" col-md"> */}
        <div className="d-flex search-job bd-highlight">
          <div className='search-content flex-grow-1'>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
              onClick={() => setHidden(s => !s)}
            />
            {!hidden ? <div className='advance-search'>
              <div style={{ marginTop: "3%" }} className='d-flex'>
                <h5 className='flex-grow-1'>Advance search</h5>
                <p style={{ color: "green" }} onClick={() => setHidden(s => !s)}> Thu gọn</p>
              </div>
              <div className='form-outline mb-4'>
                <label >Company's name</label>
                <input
                  type="text"
                  className="form-control"
                  value={searchCompanyName}
                  onChange={onChangeSearchCompanyName}

                />
              </div>

              <div className="table-info row row-cols-2 row-cols-lg-2">
                
                <div className="form-outline mb-4">
                  <label >Profession</label>
                  <input className="form-control filter-profession" list="datalistOptions1" id="exampleDataList1"  onChange={handleProfessionChange}></input>
                  <datalist id="datalistOptions1">
                    <option value="">Tất cả ngành nghề</option>
                    <option value="An toàn lao động">An toàn lao động</option>
                    <option value="Bán hàng ký thuật">Bán hàng ký thuật</option>
                    <option value="Bán lẻ">Bán lẻ</option>
                    <option value="Báo chí">Báo chí</option>
                    <option value="Bảo hiểm">Bảo hiểm</option>
                    <option value="Sửa chữa">Sửa chữa</option>
                    <option value="Bất động sản">Bất động sản</option>
                    <option value="Phiên dịch">Phiên dịch</option>
                    <option value="Bưu chính">Bưu chính</option>
                    <option value="Chứng khoán">Chứng khoán</option>
                    <option value="Cơ khí">Cơ khí</option>
                    <option value="Công nghệ cao">Công nghệ cao</option>
                    <option value="Công nghệ ô tô">Công nghệ ô tô</option>
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Hoá chất">Hoá chất</option>
                    <option value="Dệt may">Dệt may</option>
                    <option value="Địa chất">Địa chất</option>
                    <option value="Dịch vụ khách hàng">Dịch vụ khách hàng</option>
                    <option value="Điện">Điện</option>
                    <option value="Điện tử viễn thông">Điện tử viễn thông</option>
                    <option value="Du lịch">Du lịch</option>
                    <option value="Dược phẩm">Dược phẩm</option>
                    <option value="Giáo dục">Giáo dục</option>
                    <option value="Hàng cao cấp">Hàng cao cấp</option>
                    <option value="Hàng gia dụng">Hàng gia dụng</option>
                    <option value="Hàng hải">Hàng hải</option>
                    <option value="Hàng không">Hàng không</option>
                    <option value="Hàng tiêu dùng">Hàng tiêu dùng</option>
                    <option value="Hành chính">Hành chính</option>
                    <option value="Hoá học">Hoá học</option>
                    <option value="Hoạch định">Hoạch định</option>
                    <option value="In ấn">In ấn</option>
                    <option value="It phần mềm">It phần mềm</option>
                    <option value="It phần cứng">It phần cứng</option>
                    <option value="Kế toán">Kế toán</option>
                    <option value="Khách sạn">Khách sạn</option>
                    <option value="Kiến trúc">Kiến trúc</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Luật">Luật</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Môi trường">Môi trường</option>
                    <option value="Mỹ phẩm">Mỹ phẩm</option>
                    <option value="Mỹ thuật">Mỹ thuật</option>
                    <option value="Ngân hàng">Ngân hàng</option>
                    <option value="Phi lợi nhuận">Phi lợi nhuận</option>
                    <option value="Nhân sự">Nhân sự</option>
                    <option value="Nông">Nông</option>
                    <option value="Quản lý chất lượng">Quản lý chất lượng</option>
                    <option value="Quản lý điều hành">Quản lý điều hành</option>
                    <option value="Sản phẩm công nghiệp">Sản phẩm công nghiệp</option>
                    <option value="Sản xuất">Sản xuất</option>
                    <option value="Spa">Spa</option>
                    <option value="Tài chính">Tài chính</option>
                    <option value="Thiết kế">Thiết kế</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Thư ký">Thư ký</option>
                    <option value="Thực phẩm">Thực phẩm</option>
                    <option value="Tổ chức sự kiện">Tổ chức sự kiện</option>
                    <option value="Tư vấn">Tư vấn</option>
                    <option value="Vận tải">Vận tải</option>
                    <option value="Xây dựng">Xây dựng</option>
                    <option value="Xuất nhập khẩu">Xuất nhập khẩu</option>
                    <option value="Y tế">Y tế</option>
                  </datalist>
                </div>
                <div className="form-outline mb-4">
                  <label >Form of work</label>
                  <input className="form-control" list="formlist" id="formdatalist"  onChange={handleFormChange}></input>
                  <datalist id="formlist">
                    <option value="Toàn thời gian" />
                    <option value="Bán thời gian" />
                    <option value="Thực tập" />

                  </datalist>
                </div>
                <div className="form-outline mb-4">
                  <label >Rank</label>
                  <input className="form-control" list="ranklist" id="rankdatalist"  onChange={handleRankChange}></input>
                  <datalist id="ranklist">
                    <option value="Nhân viên" />
                    <option value="Trưởng nhóm" />
                    <option value="Trưởng / Phó phòng" />
                    <option value="Quản lý /  Giám sát" />
                    <option value="Trưởng chi nhánh" />
                    <option value="Phó giám đốc" />
                    <option value="Giám đốc" />
                    <option value="Thực tập sinh" />


                  </datalist>
                </div>
                <div className="form-outline mb-4">
                  <label >Area</label>
                  <input className="form-control filter-profession" list="datalistOptions2" id="exampleDataList2" onChange={handleAreaChange}></input>
                  <datalist id="datalistOptions2">
                    <option value="">Tất cả địa điểm</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa-Vũng Tàu">Bà Rịa-Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Phương">Bình Phương</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Cửu Long">Cửu Long</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hoà Bình">Hoà Bình</option>
                    <option value="Khánh Hoà">Khánh Hoà</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Miền Bắc">Miền Bắc</option>
                    <option value="Miền Nam">Miền Nam</option>
                    <option value="Miền Trung">Miền Trung</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value=">Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Thái Bình">Thái Bình</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Thanh Hoá">Thanh Hoá</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Tiền Giang">Tiền Giang</option>
                    <option value="Toàn Quốc">Toàn Quốc</option>
                    <option value="Trà Vinh">Trà Vinh</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                    <option value="Yên Bái">Yên Bái</option>
                    <option value="Nước Ngoài">Nước Ngoài</option>
                  </datalist>
                </div>

              </div> </div> : null}

          </div>
          <div className=" search-button ">
            <button
              className="search-btn btn btn-success"
              type="button"
              onClick={retrieveJobs}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </div>
        


        <div className='body-job-content'>
          <div className="list-job col-md" id='list-job'>
            <h1 style={{ marginBottom: "3%" }}>Recruitments</h1>
            {/* <div className="box-smart-list-location d-flex">
              <div data-city_id="0" className={(active==="")?" active box-smart-item":" box-smart-item"} onClick={()=>handleJobarea('')}>
                Ngẫu Nhiên
              </div>
              <div data-city_id="1" className={(active==="Hà Nội")?" active box-smart-item":" box-smart-item"} onClick={()=>handleJobarea('Hà Nội')}>
                Hà Nội
              </div>
              <div data-city_id="2" className={(active==="Hồ Chí Minh")?" active box-smart-item":" box-smart-item"} onClick={()=>handleJobarea('Hồ Chí Minh')}>
                Thành phố Hồ Chí Minh
              </div>
              <div data-city_id="41" className={(active==="Miền Bắc")?" active box-smart-item":" box-smart-item"} onClick={()=>handleJobarea('Miền Bắc')}>
                Miền Bắc
              </div>
              <div data-city_id="42" className={(active==="Miền Nam")?" active box-smart-item":" box-smart-item"} onClick={()=>handleJobarea('Miền Nam')}>
                Miền Nam
              </div>
            </div> */}
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
                        <div className='bodyJob'>
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
        </div>





      </div>
      <Footer />
    </div>
  );
};

export default JobLists;