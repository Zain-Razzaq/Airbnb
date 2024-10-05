// src/components/ListingCard.jsx
import React from "react";
import { Card } from "@/components/ui/card";

import { UserIcon } from "@heroicons/react/24/solid";

const ListingCard = ({
  image,
  title,
  type,
  guests,
  bedrooms,
  bathrooms,
  pricePerNight,
  rating,
}) => {
  return (
    <Card className="max-w-sm shadow-sm hover:shadow-lg ">
      <img
        // src={image}
        src={`src/assets/img/${image}`}
        alt={title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{type}</p>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{bathrooms} Bathrooms</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">${pricePerNight} / night</p>
            <p className="text-sm text-gray-500">Includes taxes and fees</p>
          </div>
          <div>
            <p className="text-lg text-center font-bold">{rating}</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
