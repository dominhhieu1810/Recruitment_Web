import { Pagination } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';

import "./EmployeeNotifications.scss"
import Footer from '../Footer';
import AuthService from '../../services/auth.service';
import notificationService from '../../services/notification.service';
const EmployeeNotifications = (props) => {

  const { id } = useParams();

  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentuser, setCurrentuser] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  let navigate = useNavigate();

  
  const [currentNotificaiton, setCurrentNotificaion] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    setCurrentuser(user)
  }, [])
  //console.log(currentuser);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    console.log(searchTitle);
  };

  const getRequestParams = (searchTitle, id, page, pageSize) => {
    let params = {};
    console.log(id);
    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (id) {
      params["userId"] = id;
    }
    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveNotifications = () => {
    const params = getRequestParams(searchTitle, id, page, pageSize);
    // console.log(new Date().getDate() - new Date('2023-03-15T13:29:15.524486Z').getDate());
    notificationService.getAll(params)
      .then((response) => {
        const { notification, totalPages } = response.data;

        setNotifications(notification);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveNotifications, [page, pageSize]);

  const refreshList = () => {

    retrieveNotifications();
    setCurrentNotification(null);
    setCurrentIndex(-1);
  };

  const setActiveNotification = (notification, index) => {
    setCurrentNotification(notification);
    setCurrentIndex(index);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const readNotification = (notification) => {
    var data = {
      read: true
    }
    notificationService.update(notification.id, data)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteNotification = (notification) => {
    console.log('check');
    notificationService.remove(notification.id)
    .then((response) => {
      refreshList();
  })
  .catch((e) => {
      console.log(e);
  });
  }
  return (
    <div>
      <EmployeeNavbar />
      <div className='body'>
        <div className="d-flex search-notification bd-highlight">
          <input
            type="text"
            className="form-control input-search"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className=" search-button ">
            <button
              className="search-btn btn btn-success"
              type="button"
              onClick={retrieveNotifications}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </div>
        <div className="NotificationsList">
          <div className='body-content'>
            <div className="list-notification col-md" id='list-notification'>
              <h1 style={{ marginBottom: "3%" }}>Notifications</h1>

              <ul className="notification-body">
                {notifications &&
                  notifications.map((notification, index) => (
                    (notification.read) ? (
                      <li
                        className={
                          "notification-items " + (index === currentIndex) + ' ' + 'read'
                        }
                        onMouseEnter={() => setActiveNotification(notification, index)}
                        onMouseLeave={() => setActiveNotification(null, null)}
                        
                        key={index}
                      >
                        <div className='notification-item'>
                          <div className='box-header d-flex'>
                            <div className='avatar d-flex align-items-center justify-content-center' onClick={() => readNotification(notification)}>
                              <img className='company-logo' src={notification.userAvatar} />
                            </div>
                            <div className='d-flex notification-body' onClick={() => readNotification(notification)}>
                              <div className='notification-title w-100' >
                                <h5 className=''>{notification.title}</h5>
                                <p className='company-name'>{notification.content}</p>
                                <br />
                                <p><i className="fa-solid fa-clock"></i> {(Math.abs(new Date().getTime() - new Date(notification.createdAt).getTime()) / 3600000).toFixed() + " hours ago"}</p>
                              </div>
                              <div className='delete-notification' onClick={()=>deleteNotification(notification)}>
                                <i className="fa-solid fa-trash-can" ></i>
                              </div>
                            </div>

                          </div>

                        </div>

                      </li>
                    ) : (
                      <li
                        className={
                          "notification-items " + (index === currentIndex) + ' ' + 'unread'
                        }
                        onMouseEnter={() => setActiveNotification(notification, index)}
                        onMouseLeave={() => setActiveNotification(null, null)}
                        
                        key={index}
                      >
                        <div className='notification-item'>
                          <div className='box-header d-flex'>
                            <div className='avatar d-flex align-items-center justify-content-center' onClick={() => readNotification(notification)}>
                              <img className='company-logo' src={notification.userAvatar} />
                            </div>
                            <div className='d-flex notification-body' onClick={() => readNotification(notification)}>
                              <div className='notification-title w-100' >
                                <h5 className=''>{notification.title}</h5>
                                <p className='company-name'>{notification.content}</p>
                                <br />
                                <p><i className="fa-solid fa-clock"></i> {(Math.abs(new Date().getTime() - new Date(notification.createdAt).getTime()) / 3600000).toFixed() + " hours ago"}</p>
                              </div>
                              <div className='delete-notification' onClick={()=>deleteNotification(notification)}>
                                <i className="fa-solid fa-trash-can" ></i>
                              </div>
                            </div>

                          </div>

                        </div>

                      </li>
                    )
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
      </div>
      <Footer />
    </div>)
};

export default EmployeeNotifications;