import { useState, useEffect } from "react";

import { BASE_API } from "../constant";

import Categories from "@/components/Categories";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API}/listings`);
        const fetchedData = await response.json();
        setData(fetchedData);
        const initialListings =
          selectedCategory === "All"
            ? fetchedData
            : fetchedData.filter((listing) => listing.category === selectedCategory);
        setListings(initialListings);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    if (!data.length) {
      fetchData();
    } else {
      // Filter the listings based on category for subsequent renders
      const filteredListings =
        selectedCategory === "All"
          ? data
          : data.filter((listing) => listing.category === selectedCategory);
      setListings(filteredListings);
    }
  }, [selectedCategory, data]);
  

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
              <ListingCard key={listing.id} {...listing} />
            ))
          ) : (
            <div className="">No listings found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
