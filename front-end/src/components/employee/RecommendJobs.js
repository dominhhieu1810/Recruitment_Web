import { Pagination } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobService from '../../services/job.service';
import EmployeeNavbar from './EmployeeNavbar';

import "./RecommendJobs.scss"
import Footer from '../Footer';
import AuthService from '../../services/auth.service';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
const RecommendJobs = (props) => {

    const [jobs, setJobs] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCompanyName, setSearchCompanyName] = useState('')
    const profession = useRef(props.profession)
    const area = useRef(props.area)
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [hidden, setHidden] = useState(true);
    const [active, setActive] = useState('');
    const [filterProfession, setFilterProfession] = useState(props.profession);
    const [filterArea, setFilterArea] = useState(props.area)
    const [filterForm, setFilterForm] = useState('')
    const [filterRank, setFilterRank] = useState('')


    const [currentuser, setCurrentuser] = useState();
    let navigate = useNavigate();
    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);

    };
    const onChangeSearchCompanyName = (e) => {
        const searchCompanyName = e.target.value;
        setSearchCompanyName(searchCompanyName);

    };
    useEffect(() => {
        const user = AuthService.getCurrentUser()
        setCurrentuser(user)
    }, [])

    const getRequestParams = (searchTitle, searchCompanyName, filterProfession, filterArea, filterForm, filterRank, page, pageSize) => {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }
        if (searchCompanyName) {
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
        const params = getRequestParams(props.title, searchCompanyName, props.profession, props.area, filterForm, filterRank, page, pageSize);
        JobService.getAllApprovedDifferentTitle(params)
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


    useEffect(() => {
        //if(filterProfession && filterArea){
        retrieveJobs()

    }, [page, pageSize, props]);



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
            <div className='body-job-content'>
                <div className="list-job col-md" id='list-job'>
                    <h1 style={{ marginBottom: "3%" }}>Recommended Jobs</h1>
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
    );
};

export default RecommendJobs;