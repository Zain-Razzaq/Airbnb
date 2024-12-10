import BookingModel from "../models/Booking.js";

export const getBookingByIdFromDB = async (bookingId) => {
  try {
    // Fetch the booking by ID and populate related data (listing and guest)
    const booking = await BookingModel.findById(bookingId)
      .populate("listing") // Populate the listing details
      .populate("guest") // Populate the guest (user) details
      .exec(); // Execute the query

    // Check if the booking was found
    if (!booking) {
      return { success: false, message: "Booking not found" };
    }

    // Return the found booking
    return { success: true, data: booking };
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return {
      success: false,
      message: "Error fetching booking details",
      error: error.message,
    };
  }
};

export const getAllBookingsFromDB = async () => {
  try {
    // Fetch all bookings and populate related data (listing and guest)
    const bookings = await BookingModel.find()
      .populate("listing") // Populate the listing details
      .populate("guest") // Populate the guest (user) details
      .exec(); // Execute the query

    // Return the list of bookings
    return { success: true, data: bookings };
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return {
      success: false,
      message: "Error fetching all bookings",
      error: error.message,
    };
  }
};

export const createBookingInDB = async (bookingData) => {
  try {
    // Create a new booking with the provided data
    const newBooking = new BookingModel({
      listing: bookingData.listing,
      guest: bookingData.guest,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      totalPrice: bookingData.totalPrice,
      status: bookingData.status || "pending", // Default to 'pending' if status is not provided
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Return success message with saved booking data
    return { success: true, data: savedBooking };
  } catch (error) {
    console.error("Error adding booking:", error);
    return {
      success: false,
      message: "Error adding booking",
      error: error.message,
    };
  }
};
