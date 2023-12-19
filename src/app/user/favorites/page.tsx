"use client"
import LeftSidebar from '@/components/LeftSidebar'
import axios from 'axios';
import { error } from 'console';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
const Page = () => {
  const [token , settoken] = useState('');
  const [fav , setfav] = useState([]);
  const [property , setproperty] = useState([]);


  useEffect(()=>{
    const gettoken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const tokenString = JSON.parse(storedToken);
        console.log(tokenString)
        settoken(token)
        try {
          const response = await axios.post('/api/users/favorite', {
            token: tokenString
          });
          console.log(response.data.wish)
          const id = response.data.wish
          data(id);
        } catch (error:any) {
          console.log(error.message)
        }


      } else {
        console.error('Token not found in local storage');
      }
    }
    gettoken();
},[token])

      const data = async (data:[]) => {
        console.log(data)
      const response = await axios.post('/api/property',{
        id:data
      });
      console.log(response.data)
      setproperty(response.data.favorites);
    }
    console.log(property)

    type Item = {
      name: string, streetaddress:string, pincode:string, landmark:string, imgarray:[string], slug:string , description:string, price:number , bedrooms:number, bathrooms:number
    } 
    const handleremove = (e:any)=>{

      e.preventDefault();

    }
  return (
    <div className='flex flex-row'>
      <LeftSidebar/>

      
      <main>
        {
          property.map((item:Item, index)=>(
            <div key={index || item.slug} className='md:w-fit w-fit md:p-4 p-4 md:h-1/3 h-1/4 flex md:flex-row font-sans flex-col md:justify-between md:m-4 m-0'>
           <Link href={`/properties/${item.slug}`}>
           <img className='md:w-auto h-full rounded-md ' src={item.imgarray.length > 0 ? item.imgarray[0] : ''}  alt="villa image" />
           </Link> 
           <div className='flex flex-col md:ml-2 mt-3 md:mt-0 '>
            <h1 className='text-3xl font-semibold '>{item.name}</h1>
            <div className='mt-4 text-xl flex flex-col '>
         <div className='flex flex-col'>
          <div className='flex flex-row gap-1'> <span className='font-semibold'>Location:</span> 
          <span> {item.landmark}</span> </div>
         <div className='flex flex-row gap-1'>
         <span className='font-semibold'>Pincode:</span>
           <span>
           {item.pincode}
            </span>
         </div>
              </div> 
              <span className='mt-1 md:mt-0 flex flex-row gap-1'>
                <span className='font-semibold'>Street Address:</span> <span>{item.streetaddress}</span>
              </span>
            </div>
            </div>
            <div className='flex md:flex-col flex-row justify-between mt-4 md:mt-0 md:gap-8 gap-0'>
            <Link href={`/properties/${item.slug}`}> <button className='bg-blue-600 text-white rounded-md font-semibold px-2 py-3'>Explore</button> </Link>
            <button onClick={handleremove} className='bg-blue-600 text-white rounded-md font-semibold  px-2 py-3'> Remove </button>
            </div>
            </div> 
          ))
        }
      </main>

    </div>
  )
}

export default Page
