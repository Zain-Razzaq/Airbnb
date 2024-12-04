import axios from "axios";

import { BASE_API_URL, ALL_CATEGORIES_API_URL } from "../apiEndpoints";

export const getAllCategories = () => {
  return axios.get(`${BASE_API_URL}${ALL_CATEGORIES_API_URL}`);
};
