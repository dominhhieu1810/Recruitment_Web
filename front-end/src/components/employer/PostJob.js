import React, { useState } from "react";
import JobService from "../../services/job.service";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import EmployerNavbar from "./EmployerNavbar";
import EmployerSidebar from "./EmployerSidebar";
import './PostJob.scss'
import usersService from "../../services/users.service";
import { useRef } from "react";
import { Select } from "antd";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
const PostJob = () => {
    const { id } = useParams();

    const [currentUserAvatar, setCurrentUserAvatar] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [currentEmployer, setCurrentEmployer] = useState();
    const userId = useRef();

    const [salary, setSalary] = useState();
    const [form, setForm] = useState();
    const [area, setArea] = useState();
    const [profession, setProfession] = useState();
    const [rank, setRank] = useState();
    userId.current = AuthService.getCurrentUser().id;
    
    useEffect(() => {
        getEmployer(id)
    }, [])
    // useEffect(() => {
    //     console.log(currentEmployer);
    //         // const userAvatar = currentEmployer.avatar;
    //         // if (userAvatar) {
    //         //     setCurrentUserAvatar(userAvatar);
    //         // }
    //         // else {
    //         //     setCurrentUserAvatar("https://images.yourstory.com/cs/images/companies/download-2023-03-16T125825-1678951734972.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff")
    //         // }


    //     }, [])

    //console.log('check avatar', currentUserAvatar);
    const getEmployer = (id) => {
        usersService.get(id)
            .then(response => {
                setCurrentEmployer(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    console.log('check employer', currentEmployer);
    const initialJobState = {
        id: null,
        title: "",
        name: "",
        address: "",
        approved: false,
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
        companyIntro: "",
        companyScale: "",
        companyAddress: "",
        avatar: "",
        employerId: userId.current,
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
            title: job.title,
            name: currentEmployer.fullname,
            salary: salary,
            number: job.number,
            form: form,
            rank: rank,
            gender: job.gender,
            experience: job.experience,
            profession: profession,
            area: area,
            address: job.address,
            description: job.description,
            requirement: job.requirement,
            benefit: job.benefit,
            deadline: job.deadline,
            companyIntro: currentEmployer.description,
            companyScale: currentEmployer.scale,
            companyAddress: currentEmployer.address,
            employerId: userId.current,
            avatar: currentEmployer.avatar
        };

        JobService.create(data)
            .then(response => {
                setJob({
                    id: response.data.id,
                    title: response.data.title,
                    name: response.data.name,
                    salary: response.data.salary,
                    number: response.data.number,
                    form: response.data.form,
                    rank: response.data.rank,
                    gender: response.data.gender,
                    experience: response.data.experience,
                    profession: response.data.profession,
                    area: response.data.area,
                    address: response.data.address,
                    description: response.data.description,
                    requirement: response.data.requirement,
                    benefit: response.data.benefit,
                    deadline: response.data.deadline,
                    companyIntro: response.data.companyIntro,
                    companyScale: response.data.scale,
                    companyAddress: response.data.companyAddress,
                    approved: response.data.approved,
                    avatar: response.data.avatar,
                    employerId: response.data.employerId,
                });
                // setSubmitted(true);
                alert("You have successfully posted a recruitment");
                window.location.reload();
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
            <EmployerNavbar  />
            <div className="d-flex">
                <EmployerSidebar page="postjob"/>
                <div className='post-job submit-form'>
                    <h1 className="title">Post a Job</h1>
                    <div className="form-outline mb-4">
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
                            <input className="form-control" list="salarylist" id="salarydatalist" onChange={(e) => setSalary(e.target.value)}></input>
                            <datalist id="salarylist">
                                <option value="Dưới 3 triệu" />
                                <option value="3 - 5 triệu" />
                                <option value="5 - 7 triệu" />
                                <option value="7 - 10 triệu" />
                                <option value="10 - 12 triệu" />
                                <option value="12 - 15 triệu" />
                                <option value="15 - 20 triệu" />
                                <option value="20 - 25 triệu" />
                                <option value="25 - 30 triệu" />
                                <option value="Trên 30 triệu" />
                                <option value="Thoả thuận" />
                            </datalist>


                            {/* 

                            <input
                                type="text"
                                className="form-control"
                                name="salary"
                                value={job.salary}
                                onChange={handleInputChange}
                                //validations={[required]}
                                required
                            /> */}
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
                            <input className="form-control" list="formlist" id="formdatalist"  onChange={(e) => setForm(e.target.value)}></input>
                            <datalist id="formlist">
                                <option value="Toàn thời gian" />
                                <option value="Bán thời gian" />
                                <option value="Thực tập" />

                            </datalist>
                        </div>
                        <div className="form-outline mb-4">
                            <label >Rank</label>
                            <input className="form-control" list="ranklist" id="rankdatalist"  onChange={(e) => setRank(e.target.value)}></input>
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
                        <input className="form-control" list="professionlist" id="professiondatalist"  onChange={(e) => setProfession(e.target.value)}></input>
                        <datalist id="professionlist">
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
                        <label >Area</label>
                        <input className="form-control" list="arealist" id="areadatalist"  onChange={(e) => setArea(e.target.value)}></input>
                        <datalist id="arealist">
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
                    </div>

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
            <Footer/>
        </div>
    );
};

export default PostJob;
