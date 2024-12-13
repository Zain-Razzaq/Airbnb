import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { getListingDetailsbyId } from "../api/listing";

import { newBooking } from "../api/booking.js";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getListingDetailsbyId(id);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError("Both check-in and check-out dates are required.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    setTotalPrice(days * property.price);
    setError("");
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    // send a post to server
    try {
      await newBooking({
        listingId: id,
        checkIn,
        checkOut,
        totalPrice,
      }).then(() => {
        toast({
          title: "Booking Successfull",
          description:
            "Your booking has been confirmed! Check your email for details.",
          type: "success",
        });
        navigate("/");
      });
    } catch (e) {
      toast({
        title: "Error Occurred",
        description: e.response?.data.message,
        type: "error",
      });
    }
  };

  if (!property) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto m-8 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-gray-400 mb-4">
        Book Your Stay at <p className="text-gray-800">{property.title}</p>
      </h1>
      <p className="text-gray-600 mb-4">{property.description}</p>
      <p className="text-lg text-gray-600 mb-2">
        Price per day: <span className="font-semibold">${property.price}</span>
      </p>

      {/* Booking Form */}
      <form
        onSubmit={handleBooking}
        className="space-y-4 md:flex md:gap-4 md:items-end"
      >
        <div className="w-full md:w-1/3">
          <label htmlFor="checkIn" className="block text-gray-700 font-medium">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3">
          <label htmlFor="checkOut" className="block text-gray-700 font-medium">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {error && (
          <p className="w-full text-red-500 text-sm mt-2 md:mt-0">{error}</p>
        )}

        <div className="w-full md:w-auto">
          <Button type="submit">Calculate Total Price</Button>
        </div>
      </form>

      {/* Booking Summary */}
      {totalPrice > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-bold text-gray-800">Booking Summary</h2>
          <p className="text-gray-700">Property: {property.title}</p>
          <p className="text-gray-700">
            Total Price: <span className="font-semibold">${totalPrice}</span>
          </p>
        </div>
      )}

      {/* Personal Info Form */}
      {totalPrice > 0 && (
        <form
          onSubmit={handleConfirmBooking}
          className="mt-6 space-y-4 p-4 bg-white shadow rounded-md"
        >
          <div className="w-full md:w-auto">
            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
