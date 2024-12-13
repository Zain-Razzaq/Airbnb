import express from "express";

import {
  createBooking,
  getAllBookings,
  deleteBookingById,
  getBookingsOfSpecificUser,
} from "../controllers/Booking.js";

const router = express.Router();

// router.post("/insertTemp", insertSampleBookings);
router.post("/new", createBooking);
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBookingById);
router.get("/user/:id", getBookingsOfSpecificUser);

export default router;
