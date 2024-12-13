import { useEffect, useState } from "react";

import { getAllListings } from "../api/listing";
import { fetchAllBookings, getBookingsOfSpecificUser } from "../api/booking";

import ListingDataTable from "../components/ListingDataTable";
import BookingDataTable from "../components/BookingDataTable";
import AddListingForm from "../components/AddListingForm";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState([]);
  const [booking, setBooking] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Load user data from localStorage
    try {
      if (storedUser) {
        // Check if the user has admin privileges
        if (storedUser.role === "admin" || storedUser.role === "host") {
          setUser(storedUser);
        } else {
          setError("You do not have permission to access this page.");
        }
      } else {
        setError("User not authenticated.");
      }
    } catch (e) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch the listing and bookings data from the server
  useEffect(() => {
    if (storedUser.role == "admin") {
      const fetchListing = async () => {
        try {
          const response = await getAllListings();
          setListing(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      const fetchBookings = async () => {
        try {
          const response = await fetchAllBookings();
          setBooking(response.data.data);
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
        }
      };

      fetchListing();
      fetchBookings();
    } else if (storedUser.role == "host") {
      console.log("Fetching bookings");
      const fetchListing = async () => {
        try {
          const response = await getAllListings();
          setListing(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      const fetchBookings = async () => {
        try {
          const response = await getBookingsOfSpecificUser(storedUser.userId);
          setBooking(response.data.data);
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
        }
      };

      fetchListing();
      fetchBookings();
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1 className="flex justify-center text-4xl m-4">
        Welcome to the Admin Page, {user.name}!
      </h1>
      <div>
        <AddListingForm />
      </div>
      <div className="m-4">
        <h1 className="text-2xl my-2">All Listings</h1>
        {listing.length ? (
          <ListingDataTable listings={listing} />
        ) : (
          <p>No listings found.</p>
        )}
      </div>
      <div className="m-4">
        <h1 className="text-2xl my-2">All Bookings</h1>
        {booking.length ? (
          <BookingDataTable bookings={booking} />
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
