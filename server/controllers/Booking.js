// bookingController.js

import {
  createBookingInDB,
  getBookingByIdFromDB,
  getAllBookingsFromDB,
  deleteBookingByIdFromDB,
  getBookingsOfSpecificUserFromDB,
} from "../database/bookingData.js";

import {
  validateAdminToken,
  validateHost,
  validateUser,
} from "./userTokenValidation.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { listingId, userId, startDate, endDate, totalPrice } = req.body;
    const user = validateUser(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

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
// export const getBookingById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const booking = await getBookingByIdFromDB(id);

//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    // only for admin
    const host = validateAdminToken(req, res);
    if (!host) {
      return res.status(403).send({ message: "You must be an administrator" });
    }
    const bookings = await getAllBookingsFromDB();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsOfSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = validateUser(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const bookings = await getBookingsOfSpecificUserFromDB(id);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    // admin or host or creator of bookings\
    const admin = validateAdminToken(req, res);
    if (!admin) {
      const host = validateHost(req, res);
      if (!host) {
        res.status(403).send({ message: "Invalid host" });
      }
      const booking = await getBookingByIdFromDB(id);
      if (
        !booking &&
        booking.guest.toString() != host.id.toString() &&
        booking.listing.hostId.toString() != host.id.toString()
      ) {
        return res.status(403).json({ message: "Invalid booking" });
      }
    }

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
