import axios from "axios";

import { BASE_API_URL, ALL_CATEGORIES_API_URL } from "../apiEndpoints";

axios.defaults.withCredentials = true;

export const getAllCategories = () => {
  return axios.get(`${BASE_API_URL}${ALL_CATEGORIES_API_URL}`);
};
