"use client"
import LeftSidebar from "@/components/LeftSidebar";
import PropertyCard from "@/components/PropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";
import {Bars} from 'react-loader-spinner';
const Page = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/admin/listing');
        setProperties(response.data.property);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="flex gap-6 mt-1 ml-1">
      <LeftSidebar />
      <div className="m-3 text-xl text-gray-900 font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          // Display loader while fetching data
                    <Bars
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                         />
        ) : (
          // Display property cards once data is fetched
          properties.map((item: { name: string; _id: number; streetaddress: string; landmark: string; imgarray: []; slug: string }) => (
            <PropertyCard key={item._id} {...item} />
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
