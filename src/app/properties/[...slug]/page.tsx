"use client";
import ImageGallery from "@/components/HelperComps/ImageGallery";
import WeatherAround from "@/components/HelperComps/WeatherAround";
import LeftSidebar from "@/components/LeftSidebar";
import SchoolFinder from "@/components/forms/SchoolFinder";
import MortgageCalculator from "@/components/HelperComps/MortgageCalculator";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaHome, FaBed, FaBath, FaMoneyBill } from "react-icons/fa";
import PropertyMap from "@/components/PropertyMap";

interface Property {
  name: string;
  streetaddress: string;
  pincode: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  imgarray?: string[];
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const categories = ["Pictures", "School", "Weather", "Mortgage", "Location"];
  const [selectedCategory, setSelectedCategory] = useState("Pictures");
  const [property, setProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [zip, setZip] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPropertyDetails(params.slug[0]);
  },[]);
  
  const fetchPropertyDetails = async (slug: string) => {
    try {
      const response = await axios.post(`/api/property`, { slug });
      setZip(response.data.property.pincode);
      setProperty(response.data.property);
      setImages(response.data.property.imgarray || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="flex flex-row md:flex-row min-h-screen bg-gray-100 w-full overflow-x-hidden">
      <LeftSidebar />
      <div className="flex-1 w-1/3 p-6 md:w-1/2 md:p-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            <p className="text-gray-700 text-lg mt-4">Loading property details...</p>
          </div>
        ) : property ? (
          <>
            <div className="bg-white shadow-md p-3 rounded-lg w-full">
              <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> {property.streetaddress}, {property.pincode}
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <FaHome className="text-blue-500" /> {property.state}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <FaBed className="text-blue-500" /> {property.bedrooms} Bedrooms
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <FaBath className="text-blue-500" /> {property.bathrooms} Bathrooms
                </p>
                <p className="flex items-center gap-2 text-green-600 text-lg font-semibold">
                  <FaMoneyBill className="text-green-500" /> ${property.price}
                </p>
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex overflow-x-auto gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`p-2 md:p-4 text-white rounded-md hover:bg-gray-600 transition ${
                    selectedCategory === category ? "bg-gray-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-6">
              {selectedCategory === "Pictures" && <ImageGallery imagedata={images} />}
              {selectedCategory === "School" && <SchoolFinder pincode={property?.pincode} />}
              {selectedCategory === "Weather" && <WeatherAround pin={zip} />}
              {selectedCategory === "Mortgage" && <MortgageCalculator price={property.price} />}
              {selectedCategory === "Location" && <PropertyMap address={property.streetaddress} />}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg">Property not found.</p>
        )}
      </div>
    </section>
  );
};

export default Page;
