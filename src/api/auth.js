import axios from "axios";
import { BASE_API_URL, SIGNUP_API_URL, LOGIN_API_URL } from "../apiEndpoints";

axios.defaults.withCredentials = true;

export const registerNewUser = (user) => {
  return axios.post(`${BASE_API_URL}${SIGNUP_API_URL}`, user);
};

export const userLogin = (user) => {
  return axios.post(`${BASE_API_URL}${LOGIN_API_URL}`, user);
};

export const getCurrentUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};
