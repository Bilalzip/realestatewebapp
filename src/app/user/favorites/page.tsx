"use client"
import LeftSidebar from '@/components/LeftSidebar'
import axios from 'axios';
import { error } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
const Page = () => {
  const router = useRouter();
  const [token , settoken] = useState('');
  const [fav , setfav] = useState([]);
  const [property , setproperty] = useState([]);
  useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const tokenString = JSON.parse(storedToken);
          settoken(tokenString);
          gettoken(tokenString);
        
        } else {
          console.error('Token not found in local storage');
        }
      }
  }, [token]);

 
  const gettoken =async (token:string) => {
    
   try {
    const response = await axios.post('/api/users/favorite', {
      token: token,
    });
    console.log(response.data.wish);
    const id = response.data.wish;
    data(id);
  } catch (error: any) {
    console.log(error.message);
  }
    }
      const data = async (data:[]) => {
      const response = await axios.post('/api/property',{
        id:data
      });
      setproperty(response.data.favorites);
    }

  
    const handleremove = async (slug: string) => {
      try {
        
        const response = await axios.post('/api/removefav', { pro: slug, token:token}) 
        console.log(response)
      toast.success(response.data.message)
      setTimeout(() => {
        router.push('/')
      }, 2000);
      
    } catch (error:any) {
        console.error('Error removing project:', error.message);
        toast.error('An error occurred while removing the project');
      }
    };


    type Item = {
      name: string, streetaddress:string, pincode:string, landmark:string, imgarray:[string], slug:string , description:string, price:number , bedrooms:number, bathrooms:number
    }

  return (
    <div className='flex flex-row'>
      <LeftSidebar/>
      <section>
        {
          property.map((item:Item, index)=>(
            <div key={index || item?.slug} className='p-4 w-full md:h-96 h-1/4 flex md:flex-row font-sans flex-col md:justify-between md:m-8 mt-8'>
           <Link href={`/properties/${item?.slug}`}>
           <img className='md:w-auto h-full rounded-md w-full' src={item?.imgarray.length > 0 ? item.imgarray[0] : ''}  alt="villa image" />
           </Link> 
           <div className='flex flex-col md:ml-2 mt-3 md:mt-0 '>
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
            <div className='flex md:flex-col flex-row justify-between mt-4 md:mt-0 md:gap-8 gap-0'>
            <Link href={`/properties/${item?.slug}`}> <button className='bg-blue-600 text-white rounded-md font-semibold px-2 py-3'>Explore</button> </Link>
            <button onClick={() => handleremove(item.slug)} className='bg-blue-600 text-white rounded-md font-semibold  px-2 py-3'> Remove </button>
            </div>
            </div> 
          ))
        }
      </section> 

    </div>
  )
}

export default Page
