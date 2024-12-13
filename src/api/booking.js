import axios from "axios";
import { getCurrentUserData } from "./auth";

import {
  BASE_API_URL,
  CONFIRM_BOOKING_API_URL,
  GET_ALL_BOOKINGS_API_URL,
  getDeleteBookingDetailsApiURL,
} from "../apiEndpoints";

export const newBooking = async ({
  listingId,
  checkIn,
  checkOut,
  totalPrice,
}) => {
  const userData = await getCurrentUserData();
  if (!userData || !userData.userId) {
    throw new Error("You need to login first");
  }
  const bookingData = {
    listingId,
    userId: userData.userId,
    startDate: checkIn,
    endDate: checkOut,
    totalPrice,
  };
  return await axios.post(BASE_API_URL + CONFIRM_BOOKING_API_URL, bookingData);
};

export const fetchAllBookings = async () => {
  return await axios.get(BASE_API_URL + GET_ALL_BOOKINGS_API_URL);
};

export const deleteBookingById = async (bookingId) => {
  return await axios.delete(BASE_API_URL + getDeleteBookingDetailsApiURL(bookingId));
};
