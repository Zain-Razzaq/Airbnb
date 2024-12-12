import express from "express";

import { createBooking } from "../controllers/Booking.js";

const router = express.Router();

// router.post("/insertTemp", insertSampleBookings);
router.post("/new", createBooking);

export default router;
