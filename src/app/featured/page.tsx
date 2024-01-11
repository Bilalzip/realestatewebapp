"use client"
import LeftSidebar from '@/components/LeftSidebar'
import PropertyCard from '@/components/PropertyCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'

const Page = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await axios.get('/api/admin/listing');
          setProperties(response.data.property);
          setLoading(false); 
        } catch (error) {
          console.error("Error fetching properties:", error);
          setLoading(false); 
        }
      };
  
      fetchProperties();
    }, []);
  return (
    <div className='flex flex-row'>
      <LeftSidebar/>
      <div>
        <h1 className='text-3xl font-sans font-bold m-8'>List of featured properties</h1>
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
          properties.map((item: { name: string; _id: number; streetaddress: string; landmark: string; imgarray: []; slug: string }) => (
            <PropertyCard key={item._id} {...item} />
          ))
        )}
      </div>
      </div>
    </div>
  )
}

export default Page
