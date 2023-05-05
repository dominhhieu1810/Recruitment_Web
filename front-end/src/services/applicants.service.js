import http from "../http-common";

const getAll = (params) => {
  return http.get("/applicants", { params });
};
const getAllApproved = (params) => {
  return http.get("/applicants/status", { params });
};

const get = id => {
  return http.get(`/applicants/${id}`);
};

const create = data => {
  return http.post("/applicants", data);
};

const update = (id, data) => {
  return http.put(`/applicants/${id}`, data);
};

const remove = id => {
  return http.delete(`/applicants/${id}`);
};

const removeAll = () => {
  return http.delete(`/applicants`);
};

const findByTitle = title => {
  return http.get(`/applicants?title=${title}`);
};

export default {
  getAll,
  getAllApproved,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};