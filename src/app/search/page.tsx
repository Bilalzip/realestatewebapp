
"use client"
import LeftSidebar from '@/components/LeftSidebar';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';

const page = () => {

  const searchParams = useSearchParams();
  const search:any = searchParams.get('q');
  const [properties , setproperties] = useState([]);
  const [loading , setloading] = useState(true)
  useEffect(() => {
    const prop = async (data: any) => {
      console.log(data);
      const response = await axios.post('/api/users/search', {
        data: data,
      });
     setproperties(response.data.properties);
     setloading(false);
    };
    prop(search);
    console.log(search);
  }, [search]); 
  
     console.log(properties)

  return (
    <div className='flex flex-row '>
      <LeftSidebar/>
      <div>
        <h1 className='md:text-center ml-1 md:ml-0 text-xl md:text-3xl font-sans  font-bold mt-4'>These are the properties available in {search}</h1>
      <div className=' m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
       {
        loading ? (
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

       properties?.map((item:{imgarray : [string], price:string , bedrooms:string ,bathrooms:string , slug:string, name:string})=>(
        <main className='mt-4'>
        <div className="overflow-hidden shadow-md rounded-md h-fit w-full">
             <img className="w-full h-48 object-cover" src={item.imgarray[0]} alt="Property" />
              <div className='flex flex-row'>
            <div className='m-2'>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{"landmark"}</p>
              <p className="text-lg font-bold text-gray-800">${item.price}</p>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-600">Bedrooms: {item.bedrooms}</p>
                  <p className="text-gray-600">Bathrooms:{item.bathrooms}</p>
                </div>
                <Link href={`/properties/${item.slug}`}>
                <button  className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full ml-4">
                  Explore
                </button>
                </Link>
            </div>
              </div>
            </div>
          </div>
        </main>

       )
       ))
  

       }
       
       </div>    </div></div>
  )
}

export default page
