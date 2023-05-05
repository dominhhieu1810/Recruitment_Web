import http from "../http-common";

const getAll = (params) => {
  return http.get("/notification", { params });
};
const getAllApproved = (params) => {
  return http.get("/notification/status", { params });
};

const get = id => {
  return http.get(`/notification/${id}`);
};

const create = data => {
  return http.post("/notification", data);
};

const update = (id, data) => {
  return http.put(`/notification/${id}`, data);
};

const remove = id => {
  return http.delete(`/notification/${id}`);
};

const removeAll = () => {
  return http.delete(`/notification`);
};

const findByTitle = title => {
  return http.get(`/notification?title=${title}`);
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