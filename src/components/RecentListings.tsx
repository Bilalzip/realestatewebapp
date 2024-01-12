
"use client"
import axios from 'axios'
import Link from 'next/link'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'


const RecentListings = () => {

    const [listings , setlistings] = useState([])

    useEffect(()=>{

    const recentListings = async ()=>{
            try {
                const response = await axios.post('/api/admin/recentListings');
                setlistings(response.data.response);
            } catch (error:any) {
                throw new Error(error);
            }
        }
        recentListings();
    
    }, [])

    type Item = {
        name: string, streetaddress:string, pincode:string, landmark:string, imgarray:[string], slug:string , description:string, price:number , bedrooms:number, bathrooms:number
      }
      console.log(listings)
  return (
    <div className='flex flex-col w-fit'>
         <h1 className='text-2xl font-mono font-bold  mt-4 ml-4'>Recent Listings</h1>
             <section>
        {
          listings?.map((item:Item, index)=>(
            <div key={index || item?.slug} className='w-full md:h-96 h-1/4 flex md:flex-row font-sans flex-col md:justify-between md:m-8 mt-8'>
           <Link href={`/properties/${item?.slug}`}>
           <img className='md:w-auto h-full rounded-md w-full' src={item?.imgarray.length > 0 ? item.imgarray[0] : ''}  alt="villa image" />
           </Link> 
           <div className='flex flex-col mt-3 md:mt-0 ml-0 md:ml-12'>
            <h1 className='text-3xl font-semibold '>{item?.name}</h1>
            <div className='mt-4 text-xl flex flex-col '>
         <div className='flex flex-col'>
          <div className='flex flex-row gap-1'> <span className='font-semibold'>Location:</span> 
          <span> {item?.landmark}</span> </div>
         <div className='flex flex-row gap-1'>
         <span className='font-semibold'>Pincode:</span>
           <span>
           {item?.pincode}
            </span>
         </div>
              </div> 
            </div>
            </div>
            <div className='flex md:flex-col flex-row justify-between mt-4 md:mt-0 md:gap-8 gap-0 ml-0 md:ml-16'>
            <Link href={`/properties/${item?.slug}`}> <button className='bg-blue-600 text-white rounded-md font-semibold px-2 py-3'>Explore</button> </Link>
           <Link href={`/admin/editproperty/${item?.slug}`}>
           <button className='bg-blue-600 text-white rounded-md font-semibold  px-6 py-3'> Edit </button>
           </Link>
            </div>
            </div> 
          ))
        }
      </section> 
      
    </div>
  )
}

export default RecentListings
