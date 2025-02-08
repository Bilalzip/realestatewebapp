"use client"
import LeftSidebar from "@/components/LeftSidebar";
import PropertyCard from "@/components/PropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/admin/listing");
        console.log("Fetched Properties:", response.data);
        
        if (response.data && response.data.data) {
          setProperties(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    
    fetchProperties();
  }, []);

  console.log("Properties State:", properties);

  return (
    <section className="flex gap-6 mt-1 ml-1">
      <LeftSidebar />
      <div className="m-3 text-xl text-gray-900 font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          properties?.map((item: { name: string; _id: number; streetaddress: string; landmark: string; imgarray: []; slug: string }) => (
            <PropertyCard key={item._id} {...item} />
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
