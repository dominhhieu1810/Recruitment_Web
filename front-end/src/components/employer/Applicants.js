import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import UsersService from '../../services/users.service';
import EmployerNavbar from './EmployerNavbar';
import EmployerSidebar from './EmployerSidebar';
import ApplicantsService from '../../services/applicants.service';
import './Applicants.scss'
import notificationService from '../../services/notification.service';
import AuthService from '../../services/auth.service';
const Applicants = (props) => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const usersRef = useRef();
  const userid = useRef();
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [reload, setReload] = useState();
  const pageSizes = [3, 6, 9];

  const initialEmployerState = {
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
    scale: "",

  };
  const [currentEmployer, setCurrentEmployer] = useState(initialEmployerState);

  usersRef.current = applicants;
  userid.current = AuthService.getCurrentUser().id;
  const getEmployer = id => {
    UsersService.get(id)
      .then(response => {
        setCurrentEmployer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (userid.current)
      getEmployer(userid.current);
  }, [userid.current]);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (id, searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["employeeName"] = searchTitle;
    }
    if (id) {
      params["jobId"] = id;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveUsers = () => {
    const params = getRequestParams(id, searchTitle, page, pageSize);

    ApplicantsService.getAll(params)
      .then((response) => {
        const { applicants, totalPages } = response.data;

        setApplicants(applicants);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveUsers()
    return () => {

    }
  }, [page, pageSize]);

  const refreshList = () => {
    retrieveUsers();
  };

  const findByTitle = () => {
    setPage(1);
    retrieveUsers();
  };

  const openCv = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;
    const cv = usersRef.current[rowIndex].cv;
    console.log(id);
    //console.log('check: ', typeof( usersRef.current[rowIndex]));
    //props.history.pushState("/user/" + id);
    // UsersService.updateAppliedJob("642045d272d4ae2c80c7c400",{'jobsapplied':[`641ede641feee6127ac5c640`]})
    //       .then(response => {
    //           console.log(response.data);
    //           //setMessage("The tutorial was updated successfully!");
    //       })
    //       .catch(e => {
    //           console.log(e);
    //       });
    navigate(cv)
  };

  // const deleteUser = (rowIndex) => {
  //   const id = usersRef.current[rowIndex].id;

  //   UsersService.remove(id)
  //     .then((response) => {
  //       navigate("/adminhome");

  //       let newUsers = [...usersRef.current];
  //       newUsers.splice(rowIndex, 1);

  //       setUsers(newUsers);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // const PushData = () => {
  //   UsersService.updateAppliedJob("642045d272d4ae2c80c7c400", { 'jobsapplied': [`641ede641feee6127ac5c640`] })
  //     .then(response => {
  //       console.log(response.data);
  //       //setMessage("The tutorial was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const updateAccept = (rowIndex, status) => {
    const id = usersRef.current[rowIndex].id;
    console.log(usersRef.current[rowIndex]);
    var data = {

      status: status,

    };
    var notification = {
      title: 'Notification from '+ usersRef.current[rowIndex].employerFullname,
      userAvatar: usersRef.current[rowIndex].employerAvatar,
      userId: usersRef.current[rowIndex].employeeId,
      content: 'Your CV has been approved by '+ usersRef.current[rowIndex].employerFullname,
      read: false,
    }
    notificationService.create(notification)
    ApplicantsService.update(id, data)
      .then(response => {
        // setCurrentJob({ ...currentJob, approved: status });
        refreshList()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "employeeName",


      },
      {
        Header: "Status",
        accessor: "acctions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div>
              <span>
                {usersRef.current[rowIdx].status ? (
                  <button className='btn apply-button btn-warning' onClick={() => updateAccept(rowIdx, false)}>Unapproved </button>
                ) : (
                  <button className='btn apply-button btn-success' onClick={() => updateAccept(rowIdx, true)}>Approved</button>
                )
                }
              </span>
              {/* <span onClick={() => deleteUser(rowIdx)}>
                  <i className="fas fa-trash action"></i>
                  
                </span> */}
            </div>
          );
        },
      },
      // {
      //   Header: "Status",
      //   accessor: "published",
      //   Cell: (props) => {
      //     return props.value ? "Published" : "Pending";
      //   },
      // },
      {
        Header: "View Cv",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div>
              <span>
                <a href={usersRef.current[rowIdx].cv} target="_blank"><i className="fa-solid fa-eye"></i></a>
                {/* <i><RemoveRedEyeOutlinedIcon className="icon"/></i> */}
              </span>
              {/* <span onClick={() => deleteUser(rowIdx)}>
                  <i className="fas fa-trash action"></i>
                  
                </span> */}
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
    data: applicants,
  });
  return (
    <div>
      <EmployerNavbar />
      <div className='d-flex'>
        <EmployerSidebar page='postedjob' />
        <div className="applicants">
          <div className="search-box">
            <div className=" input-group mb-3">
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

          <div className="list-aplicants">


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

export default Applicants;