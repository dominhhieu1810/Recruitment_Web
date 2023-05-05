import EmployerNavbar from './EmployerNavbar';
import EmployerSidebar from './EmployerSidebar';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobService from '../../services/job.service';
import { useRef } from 'react';
import { useTable } from 'react-table';
import './PostedJob.scss'
import Footer from '../Footer';
const PostedJob = (props) => {
    const { id } = useParams();
    const [jobs, setJobs] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const jobsRef = useRef();
    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    jobsRef.current = jobs;

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (id, searchTitle, page, pageSize) => {
        let params = {};
        if (id) {
            params["employerId"] = id
        }

        if (searchTitle) {
            params["title"] = searchTitle;
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
        const params = getRequestParams(id, searchTitle, page, pageSize);

        JobService.getAll(params)
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
        retrieveJobs()
        return () => {

        }
    }, [page, pageSize]);

    const refreshList = () => {
        retrieveJobs();
    };

    const findByTitle = () => {
        setPage(1);
        retrieveJobs();
    };

    const openUser = (rowIndex) => {
        const id = jobsRef.current[rowIndex].id;
        console.log('check: ', id);
        //props.history.pushState("/user/" + id);
        navigate('/applicants/' + id)
    };
    const openJob = (rowIndex) => {
        const id = jobsRef.current[rowIndex].id;
        //props.history.pushState("/user/" + id);
        navigate("/jobdetail/" + id)
    }

    const deleteJob = (rowIndex) => {
        const jobid = jobsRef.current[rowIndex].id;
        
        JobService.remove(jobid)
            .then((response) => {
                navigate("/postedjob/"+id);

                let newJobs = [...jobsRef.current];
                newJobs.splice(rowIndex, 1);

                setJobs(newJobs);
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

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",


            },
            // {
            //     Header: "Email",
            //     accessor: "email",
            // },
            {
                Header: "Status",
                accessor: "approved",
                Cell: (props) => {
                    return props.value ? "Approved" : "Pending";
                },
            },
            {
                Header: "View Job",
                accessor: "viewJob",
                Cell: (props) => {
                    const rowIdx = props.row.id;

                    return (
                        <div>
                            <span onClick={() => openJob(rowIdx)}>
                                <i className="fa-solid fa-eye"></i>

                            </span>
                        </div>
                    );
                },
            },
            {
                Header: "View applicants",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;

                    return (
                        <div>
                            <span onClick={() => openUser(rowIdx)}>
                                <i className="fa-solid fa-people-group"></i>

                            </span>
                        </div>
                    );
                },
            },
            {
                Header: "Delete Job",
                accessor: "delete",
                Cell: (props) => {
                    const rowIdx = props.row.id;

                    return (
                        <div>
                            <span onClick={()=>deleteJob(rowIdx)} >
                                <i className="fa-solid fa-trash" ></i>

                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: jobs,
    });
    return (
        <div>
            <EmployerNavbar />
            <div className='d-flex'>
                <EmployerSidebar page="postedjob" />
                <div className="posted-job row-cols-1">
                    <div className="search-box ">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={findByTitle}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className=" list-job">


                        <table
                            className="table table-striped table-bordered"
                            {...getTableProps()}
                        >
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="mt-3">
                            {"Items per Page: "}
                            <select onChange={handlePageSizeChange} value={pageSize}>
                                {pageSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>

                            <Pagination
                                className="my-3"
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
            </div>
            <Footer/>
        </div>
    );
};

export default PostedJob