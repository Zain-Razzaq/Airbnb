import { useState, useEffect } from "react";

import { getAllListings } from "../api/listing";

import Categories from "@/components/Categories";
import ListingCard from "../components/ListingCard";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState([]);
  const [data, setData] = useState([]);

  // Fetch data on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllListings();
        const fetchedData = response.data;
        setData(fetchedData);
        setListings(fetchedData); // Initially set all listings
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); // Only run on initial render

  // Filter listings when the selected category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setListings(data);
    } else {
      const filteredListings = data.filter(
        (listing) => listing.category === selectedCategory
      );
      setListings(filteredListings);
    }
  }, [selectedCategory, data]); // Re-run filtering when category or data changes

  return (
    <>
      <div className="container mx-auto py-8">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
          {listings.length ? (
            listings.map((listing) => (
              <ListingCard key={listing._id} {...listing} />
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
