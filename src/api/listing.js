import axios from "axios";

import {
  BASE_API_URL,
  ALL_LISTINGS_API_URL,
  getListingDetailsApiURL,
  getDeleteListingDetailsApiURL,
  NEW_LISTINGS_API_URL,
  getListingsOfSpecificUserApiURL,
} from "../apiEndpoints";

axios.defaults.withCredentials = true;

export const getAllListings = () => {
  return axios.get(`${BASE_API_URL}${ALL_LISTINGS_API_URL}`);
};

export const getListingDetailsbyId = (id) => {
  return axios.get(`${BASE_API_URL}${getListingDetailsApiURL(id)}`);
};

export const deleteListingById = (id) => {
  console.log(id);
  return axios.delete(`${BASE_API_URL}${getDeleteListingDetailsApiURL(id)}`);
};

export const addNewListing = (listingData) => {
  return axios.post(`${BASE_API_URL}${NEW_LISTINGS_API_URL}`, listingData);
};

export const getListingsOfSpecificUser = (id) => {
  return axios.get(`${BASE_API_URL}${getListingsOfSpecificUserApiURL(id)}`);
};
