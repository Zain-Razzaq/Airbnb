import axios from "axios";

import { BASE_API_URL, ALL_LISTINGS_API_URL } from "../apiEndpoints";

export const getAllListings = () => {
  return axios.get(`${BASE_API_URL}${ALL_LISTINGS_API_URL}`);
};
