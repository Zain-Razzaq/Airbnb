export const BASE_API_URL = "http://localhost:3000";

export const LOGIN_API_URL = "/auth/login";
export const SIGNUP_API_URL = "/auth/register";

export const ALL_LISTINGS_API_URL = "/listing/all";
export const NEW_LISTINGS_API_URL = "/listing/add";
export const getListingDetailsApiURL = (id) => `/listing/${id}`;
export const getDeleteListingDetailsApiURL = (id) => `/listing/delete/${id}`;

export const ALL_CATEGORIES_API_URL = "/categorie/all";

export const CONFIRM_BOOKING_API_URL = "/booking/new";
export const GET_ALL_BOOKINGS_API_URL = "/booking/all";
export const getDeleteBookingDetailsApiURL = (id) => `/booking/delete/${id}`;
