import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_URL_2 = "http://localhost:8080/api";
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
const getAll = (params) => {
  return axios.get(API_URL_2+"/user", { params },{ headers: authHeader() });
};
const remove = id => {
  return axios.delete(API_URL_2+`/user/${id}`,{ headers: authHeader() });
};

const get = id => {
  return axios.get(API_URL_2+`/user/${id}`,{ headers: authHeader() });
};
// const getUserBoard = () => {
//   return axios.get(API_URL + "employee", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "employer", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

const UserService = {
  // getPublicContent,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
  get,
  getAll,
  remove,
};

export default UserService;
