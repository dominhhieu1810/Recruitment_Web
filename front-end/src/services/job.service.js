import http from "../http-common";

const getAll = (params) => {
  return http.get("/job", { params });
};
const getAllApproved = (params) => {
  return http.get("/job/approved", { params });
};
const getAllApprovedDifferentTitle = (params) => {
  return http.get("/job/differenttitle", { params });
}

const get = id => {
  return http.get(`/job/${id}`);
};

const create = data => {
  return http.post("/job", data);
};

const update = (id, data) => {
  return http.put(`/job/${id}`, data);
};

const updateSavedUser = (id, data) => {
  return http.put(`/job/saved/${id}`, data);
};

const updateAppliedUser = (id, data) => {
  return http.put(`/job/applied/${id}`, data);
};


const remove = id => {
  return http.delete(`/job/${id}`);
};

const removeAll = () => {
  return http.delete(`/job`);
};

const findByTitle = title => {
  return http.get(`/job?title=${title}`);
};

export default {
  getAll,
  getAllApproved,
  getAllApprovedDifferentTitle,
  get,
  create,
  update,
  updateSavedUser,
  updateAppliedUser,
  remove,
  removeAll,
  findByTitle
};
