import React from "react";
import { useState, useEffect } from "react";

import data from "@/dummyData.json";

import Categories from "@/components/Categories";
import ListingCard from "./ListingCard";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const list = data.data;
    console.log(list);
    if (selectedCategory === "All") {
      setListings(list);
    } else {
      setListings(
        list.filter((listing) => listing.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <>
      <div className="container mx-auto py-8">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {listings.length ? (
            listings.map((listing) => (
              <ListingCard
                key={listing.id}
                image={listing.image}
                title={listing.title}
                type={listing.type}
                guests={listing.guests}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                pricePerNight={listing.pricePerNight}
                rating={listing.rating}
              />
            ))
          ) : (
            <div className="">No listings found</div>
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
