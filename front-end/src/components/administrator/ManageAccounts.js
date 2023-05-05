import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import UsersService from '../../services/users.service';
import UserService from '../../services/user.service';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
const ManageAccounts = (props) => {
  //const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const usersRef = useRef();
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const pageSizes = [3, 6, 9];

  usersRef.current = users;

  const onChangeSearchUsername = (e) => {
    const searchUsername = e.target.value;
    setSearchUsername(searchUsername);
  };

  const getRequestParams = (searchUsername, page, pageSize) => {
    let params = {};

    if (searchUsername) {
      params["username"] = searchUsername;
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
    const params = getRequestParams(searchUsername, page, pageSize);

    UsersService.getAllUsers(params)
      .then((response) => {
        const { users, totalPages } = response.data;

        setUsers(users);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
  };

  useEffect(() => {
    retrieveUsers()
    return () => {

    }
  }, [page, pageSize]);


  const findByUsername = () => {
    setPage(1);
    retrieveUsers();
  };

  const deleteUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    UsersService.remove(id)
      .then((response) => {
        navigate("/adminhome");

        let newUsers = [...usersRef.current];
        newUsers.splice(rowIndex, 1);

        setUsers(newUsers);
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
        Header: "Username",
        accessor: "username",


      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Delete",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div>
              <span onClick={() => deleteUser(rowIdx)}>
                  <i className="fas fa-trash action"></i>
                  
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
    data: users,
  });
  return (
    <div>
      <AdminNavbar />
      <div className='d-flex'>
        <AdminSidebar page='manageaccounts' />
        <div className="applicants">
          <div className="search-box">
            <div className=" input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={searchUsername}
                onChange={onChangeSearchUsername}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={findByUsername}
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

export default ManageAccounts;