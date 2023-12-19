"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import Menues from '@/constants/index'
import Link from 'next/link'
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = ({}) => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      const storedToken:any = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    getTokenFromLocalStorage();
  }, []); 


  const OnLogout = async () => {
    localStorage.removeItem('token');
    setToken(null);
    const response = await axios.get('/api/users/logout');
    console.log(response)
  }

  
  
  return (
    <div className='flex md:flex-row flex-col md:items-center justify-between bg-gray-700 overflow-hidden shadow-sm shadow-white'>
      <div className='m-4'>
   <Link href='/'> <img src='https://alchemy-project-front-end.vercel.app/assets/logo.8bf6daac.svg' className='text-2xl font-serif font-bold text-white'/></Link>  
      </div>
      <div className='flex items-center gap-2 text-white text-2xl font-sans'>
     <Link href = '/properties' > <button className='font-bold p-2  rounded-md'>
        Properties
      </button></Link>
     
      <button className='font-bold p-2 rounded-md'>
        About
      </button>
      <button className='font-bold p-2  rounded-md'>
        FaQs
      </button>
    </div>
      <div className="buttons flex flex-row md:mr-4 mr:0 ml-4 mt-4 mb-4 sm:items-center ">


        {
          !token ? (
            <>
            <button className='bg-white p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 '><Link href='/signup'>Signup</Link></button>
        <button className='bg-white p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 ml-4'><Link href='/login'>Login</Link></button>
            </>
            
           
          ) : (
            <button className='bg-white p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 '><Link href='/signup' onClick={OnLogout}>Logout</Link></button>
 
          )
        }
       
      </div>
    </div>
  )
}

export default Navbar
