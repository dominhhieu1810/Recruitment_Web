import http from "../http-common";

const getAll = (params) => {
  return http.get("/user", { params });
};
// const getApplicants = () => {
//   return http.get("/applicants",{ params });
// };
const getAllUsers = (params) => {
  return http.get("/users",{ params });
};
const remove = id => {
  return http.delete(`/user/${id}`);
};

const get = id => {
  return http.get(`/user/${id}`);
};
const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};
const updateAppliedJob = (id, data) => {
  return http.put(`/user/job/${id}`, data)
}
const updateSavedJob = (id, data) => {
  return http.put(`/user/saved/${id}`, data)
}
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("users"));
};
export default {
  getAll,
  //getApplicants,
  getAllUsers,
  get,
  getCurrentUser,
  //   create,
  update,
  remove,
  updateAppliedJob,
  updateSavedJob,
  //   removeAll,
  //   findByTitle
};