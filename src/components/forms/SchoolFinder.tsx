"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import Image from "next/image";

const SchoolFinder = (data:any) => {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = async (lat: number, lng: number) => {
    try {
      const response = await axios.post('/api/maps', {
        location: { lat, lng }
      });

      if (response.data.results) {
        setSchools(response.data.results);
      } else {
        setError("No schools found nearby.");
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
      setError("Failed to fetch nearby schools.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const geoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: data.pincode,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            },
          }
        );

        if (
          geoResponse.data.status === "OK" &&
          geoResponse.data.results.length > 0
        ) {
          const location = geoResponse.data.results[0].geometry.location;
          console.log("Coordinates:", location);
          await fetchSchools(location.lat, location.lng);
        } else {
          setError("Invalid ZIP Code. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setError("Failed to get location. Try again later.");
        setLoading(false);
      }
    };
    
    if (data) {
      fetchCoordinates();
    }
  }, [data]);
  

  return (
    <div className="flex flex-wrap justify-center items-center p-4">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center w-full">{error}</p>
      ) : schools.length > 0 ? (
        schools.map((school: any) => (
          <div
            key={school.place_id}
            className="w-96 bg-white shadow-lg rounded-xl overflow-hidden m-4 border border-gray-300 hover:shadow-xl transition duration-300"
          >
            {/* School Image */}
            <div className="h-48 w-full bg-gray-200 relative">
              {school.photos ? (
                <Image
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${school.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                  alt={school.name}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* School Info */}
            <div className="p-4 h-48 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{school.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{school.vicinity}</p>
              </div>

              <div>
                {/* Rating */}
                {school.rating && (
                  <p className="text-yellow-500 mt-2">
                    ⭐ {school.rating} ({school.user_ratings_total} reviews)
                  </p>
                )}

                {/* School Type */}
                <p className="mt-2">
                  {school.business_status === "OPERATIONAL" ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Operational
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ❌ Temporarily Closed
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center w-full">No schools found nearby.</p>
      )}
    </div>
  );
};

export default SchoolFinder;
