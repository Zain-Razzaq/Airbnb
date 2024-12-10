import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BASE_API } from "../constant";
import { getListingDetailsbyId } from "../api/listing";

import { Button } from "@/components/ui/button";

const ListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Fetch the listing details based on the ID
    const fetchListing = async () => {
      try {
        const response = await getListingDetailsbyId(id);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return (
      <div className=" flex justify-center items-center mt-4 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center m-8">
      <div>
        <img
          src={`../src/${listing.image}`}
          alt={listing.title}
          className="w-full h-80 object-cover rounded-md"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
        <p className="text-gray-600 mb-4">{listing.description}</p>
        <p className="text-gray-600 mb-4">{listing.location}</p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <span>{listing.capacity} Guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{listing.numberOfRooms} Bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{listing.numberOfBathrooms} Bathrooms</span>
          </div>
        </div>
        <p className="font-bold">${listing.price} per night</p>
        <p className="text-gray-600 mb-4">Rating: {listing.rating} out of 5</p>

        <div className="flex gap-2">
          {listing.amenities.map((amenity, index) => {
            return (
              <p className="text-gray-600 mb-4" key={index}>
                {amenity}
              </p>
            );
          })}
        </div>

        <Button
          className="bg-slate-950 text-white px-4 py-2 rounded-md"
          onClick={() => navigate(`/booking/${id}`)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ListingPage;
