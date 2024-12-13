import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingsOfSpecificUser } from "../api/booking";

import BookingDataTable from "../components/BookingDataTable";

const MyBookings = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
      return;
    }
  }, [storedUser]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsOfSpecificUser(storedUser.userId);
        setBooking(response.data.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {booking.length ? (
        <BookingDataTable bookings={booking} />
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
