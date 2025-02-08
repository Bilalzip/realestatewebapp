/* eslint-disable react/jsx-key */
"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "@/components/PropertyCard";
import { Loader, Filter } from "lucide-react";
import Link from "next/link";
import LeftSidebar from "@/components/LeftSidebar";

// Add interface for Property type
interface Property {
  _id: string;
  name: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  streetaddress: string;
  imgarray?: string[];
  slug?: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("latest");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: 0,
    bathrooms: 0,
  });

  const [showFilters, setShowFilters] = useState(false); // Toggle Sidebar

  useEffect(() => {
    const cachedResults = localStorage.getItem("searchResults");

    if (cachedResults) {
      const data = JSON.parse(cachedResults);
      setProperties(data);
      setFilteredProperties(data);
      setLoading(false);
    } else {
      fetchProperties();
    }
  }, [query]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/properties", { query });
      setProperties(response.data.properties);
      setFilteredProperties(response.data.properties);
      localStorage.setItem("searchResults", JSON.stringify(response.data.properties)); // Store in cache
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sorting
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    let sortedProperties = [...filteredProperties];

    if (value === "price-low") {
      sortedProperties.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (value === "price-high") {
      sortedProperties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (value === "bedrooms") {
      sortedProperties.sort((a, b) => parseInt(b.bedrooms) - parseInt(a.bedrooms));
    } else {
      sortedProperties = [...properties]; // Default (latest listings)
    }

    setFilteredProperties(sortedProperties);
  };

  // Function to apply filters
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      return (
        parseFloat(property.price) >= filters.minPrice &&
        parseFloat(property.price) <= filters.maxPrice &&
        parseInt(property.bedrooms) >= filters.bedrooms &&
        parseInt(property.bathrooms) >= filters.bathrooms
      );
    });
    setFilteredProperties(filtered);
  };

  // Add function to generate slug
  const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-[#FAF5F0] flex flex-col md:flex-row">
      {/* Filter Toggle Button (Only on Mobile) */}
      <button
        className="md:hidden flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg mx-4 mt-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="mr-2" /> {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Left Sidebar (Filters) - Hidden on Mobile unless toggled */}
      <div
        className={`w-full md:w-1/4 bg-white shadow-md p-6 transition-transform ${
          showFilters ? "block" : "hidden md:block"
        }`}
      >
        
        {/* Sorting Section */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Sort By</h2>
          <select
            onChange={handleSort}
            value={sortOption}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="latest">Latest Listings</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bedrooms">Bedrooms: Most to Least</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Price Range</h2>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max"
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </div>

        {/* Bedrooms & Bathrooms Filter */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Bedrooms</h2>
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Bathrooms</h2>
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mt-2"
          />
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Apply Filters
        </button>
      </div>

      {/* Right Content Area (Properties) */}
      <div className="w-full md:w-3/4 p-6">
        <h1 className="text-3xl font-bold text-black">Search Results for "{query}"</h1>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader className="animate-spin" size={40} />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {filteredProperties.map((property) => (
              <Link
                href={`/properties/${generateSlug(property.name)}`}
                key={property._id}
                className="block border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
              >
                <img
                  src={property.imgarray?.[0] || "/placeholder.jpg"}
                  alt={property.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="mt-3 text-lg font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.streetaddress}</p>
                <p className="text-blue-600 font-bold">${property.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-6">No properties found matching your search.</p>
        )}
      </div>
    </div>
  );
}
export default Page;