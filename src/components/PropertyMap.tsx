import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";


const PropertyMap = ({ address }: { address: string }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const GOOGLE_MAPS_API_KEY  = "AIzaSyCQN_B3gYbMuPZZqIr1OnMU9N1uh-pkWic";

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${GOOGLE_MAPS_API_KEY}`
        );
        
        if (response.data.status === "OK") {
          const location = response.data.results[0].geometry.location;
          setCoordinates({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Geocoding API error:", response.data.status);
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    };

    if (address) {
      fetchCoordinates();
    }
  }, [address]);
  console.log(process.env.GOOGLE_MAPS_API)

  return (
    <div className="h-96 w-full rounded-lg shadow-md overflow-hidden">
      {coordinates ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
          defaultCenter={coordinates}
          defaultZoom={14}
        />
      ) : (
        <p className="text-center text-gray-600">Fetching location...</p>
      )}
    </div>
  );
};

export default PropertyMap;
