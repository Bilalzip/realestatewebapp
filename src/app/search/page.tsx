
"use client"
import LeftSidebar from '@/components/LeftSidebar';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

const Page = () => {

  const searchParams = useSearchParams();
  const search: any = searchParams.get('q');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Sort By");
  const [sortedProperties, setSortedProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (data: string) => {
      try {
        const response = await axios.post('/api/users/search', {
          data: data,
        });
          setProperties(response.data.properties);
          setSortedProperties(response.data.properties);
          setLoading(false);
          toast.success('we got the search results')
      } catch (error: any) {
        console.error(error);
        toast.error("There is an error")
      }
    };
  
    fetchData(search);
  }, [search]);
 
  


 // Function to handle sorting based on the selected option
 const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedOption = event.target.value;
  setSortOption(selectedOption);

  let sortedArray = [...properties];
  if (selectedOption === "Price") {
    sortedArray.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (selectedOption === "Bedrooms") {
    sortedArray.sort((a,b) => parseInt(a.bedrooms, 10) - parseInt(b.bedrooms, 10));
  } else if (selectedOption === "Bathrooms") {
    sortedArray.sort((a,b) => parseInt(a.bathrooms, 10) - parseInt(b.bathrooms, 10));
  }

  setSortedProperties(sortedArray);
};


  return (
    <div className='flex flex-row '>
      <LeftSidebar/>
      <div>
      <div className='flex flex-row gap-3 ml-4 mt-4 p-4 md:w-[1/2] w-fit'>
      <div>
        <select
      value={sortOption}
      onChange={handleSortChange}
        className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
         <option>Sort By</option>
          <option>Price</option>
          <option>Bedrooms</option>
          <option>Bathrooms</option>
        </select>
      </div>
    </div>
    
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

          sortedProperties?.map((item:{imgarray : [string], price:string , bedrooms:string ,bathrooms:string , slug:string, name:string})=>(
        <main className='mt-4' key = {item.name}>
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

export default Page
