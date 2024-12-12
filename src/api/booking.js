import axios from "axios";
import { getCurrentUserData } from "./auth";

import { BASE_API_URL, CONFIRM_BOOKING_API_URL } from "../apiEndpoints";

export const newBooking = async ({
  listingId,
  checkIn,
  checkOut,
  totalPrice,
}) => {
  const bookingData = {
    listingId,
    userId: await getCurrentUserData().userId,
    startDate: checkIn,
    endDate: checkOut,
    totalPrice,
  };
  console.log(bookingData);
  return await axios.post(BASE_API_URL + CONFIRM_BOOKING_API_URL, bookingData);
};
