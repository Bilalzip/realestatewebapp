"use client";
import LeftSidebar from "@/components/LeftSidebar";
import useToken from "@/hooks/useToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, ArrowRight } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [token] = useToken();
  const [property, setProperty] = useState<any>([]);

  useEffect(() => {
    if (token) {
      fetchFavorites(token);
    }
  }, [token]);

  const fetchFavorites = async (userToken: string) => {
    try {
      const response = await axios.post("/api/users/favorite", { token: userToken });
      const favoriteIds = response.data.wish;
      fetchProperties(favoriteIds);
    } catch (error: any) {
      console.error("Error fetching favorites:", error.message);
    }
  };

  const fetchProperties = async (propertyIds: []) => {
    try {
      const response = await axios.post("/api/property", { id: propertyIds });
      setProperty(response.data.favorites);
    } catch (error: any) {
      toast.error("There is an error", error.message);
      console.error("Error fetching properties:", error.message);
    }
  };

  const handleRemove = async (slug: string) => {
    try {
      if (!token) {
        toast.error("User token is missing");
        return;
      }

      const response = await axios.post("/api/removefav", { pro: slug, token });
      toast.success(response.data.message);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Error removing property:", error.message);
      toast.error("An error occurred while removing the property");
    }
  };

  return (
    <div className="flex flex-row md:flex-row min-h-screen bg-gray-100">
      <LeftSidebar />
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Favorite Properties</h1>
        {property.length === 0 ? (
          <p className="text-gray-500 text-lg">You have no favorite properties yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.map((item: any, index: number) => (
              <div
                key={index || item?.slug}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <Link href={`/properties/${item?.slug}`}>
                  <img
                    className="w-full h-56 object-cover"
                    src={item?.imgarray.length > 0 ? item.imgarray[0] : "/placeholder.jpg"}
                    alt={item?.name}
                  />
                </Link>
                
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900">{item?.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold">Location:</span> {item?.landmark}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Pincode:</span> {item?.pincode}
                  </p>
                  <p className="text-blue-700 font-bold text-lg mt-2">${item?.price}</p>
                  
                  <div className="flex justify-between mt-4">
                    <Link href={`/properties/${item?.slug}`}>
                      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                        Explore <ArrowRight className="ml-2" size={16} />
                      </button>
                    </Link>
                    
                    <button
                      onClick={() => handleRemove(item.slug)}
                      className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
