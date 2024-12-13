// bookingController.js

import {
  createBookingInDB,
  getBookingByIdFromDB,
  getAllBookingsFromDB,
  deleteBookingByIdFromDB,
} from "../database/bookingData.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { listingId, userId, startDate, endDate, totalPrice } = req.body;

    const newBooking = await createBookingInDB({
      listingId,
      userId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getBookingByIdFromDB(id);

    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookingsFromDB();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBookingByIdFromDB(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      booking: deletedBooking,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
