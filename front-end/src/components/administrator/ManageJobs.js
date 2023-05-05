import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobService from '../../services/job.service';
import AdminNavbar from '../administrator/AdminNavbar';
import AdminSidebar from '../administrator/AdminSidebar';
import { useRef } from 'react';
import { useTable } from 'react-table';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import notificationService from '../../services/notification.service';

import adminAvatar from '../../administrator_avatar.png';
const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const jobsRef = useRef();
    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    const pageSizes = [3, 6, 9];

    jobsRef.current = jobs;

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};

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
        const params = getRequestParams(searchTitle, page, pageSize);

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
        navigate('/managejob/' + id)
    };

    const deleteJob = (rowIndex) => {
        const id = jobsRef.current[rowIndex].id;
        const employerId = jobsRef.current[rowIndex].employerId;
        const title = jobsRef.current[rowIndex].title 
        const content = 'Công việc "'+ title+ '" đã bị xoá bởi người quản trị'
        const avatar = adminAvatar
        //console.log(employerId);
        var data = {
            title: 'Notification from Administrator',
            userAvatar: adminAvatar,
            userId: employerId,
            content:content,
            read: false,
        };

        notificationService.create(data)
        JobService.remove(id)
            .then((response) => {
                navigate("/managejobs/");

                let newJobs = [...jobsRef.current];
                newJobs.splice(rowIndex, 1);

                setJobs(newJobs);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    // const PushData = () => {
    //     UsersService.updateAppliedJob("642045d272d4ae2c80c7c400", { 'jobsapplied': [`641ede641feee6127ac5c640`] })
    //         .then(response => {
    //             console.log(response.data);
    //             //setMessage("The tutorial was updated successfully!");
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

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
                Header: "View job",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;

                    return (
                        <div>
                            <span >
                                <a href={'/managejob/' + jobsRef.current[rowIdx].id} target="_blank"><i className="fa-regular fa-file"></i></a>

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
            <AdminNavbar />
            <div className='d-flex'>
                <AdminSidebar page='managejobs' />
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
        </div>
    );
};

export default ManageJobs;