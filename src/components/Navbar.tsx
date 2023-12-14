"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import Menues from '@/constants/index'
import Link from 'next/link'
import Cookies from 'js-cookie';



const Navbar = () => {

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      console.log('Token found:', token);
    } else {
      console.log('Token not found. Redirecting to login...');
      
    }
  }, []);

  return (
    <div className='flex md:flex-row flex-col md:items-center justify-between bg-gray-700 overflow-hidden shadow-sm shadow-white'>
      <div className='m-4'>
      <img src='https://alchemy-project-front-end.vercel.app/assets/logo.8bf6daac.svg' className='text-2xl font-serif font-bold text-white'/>
      </div>
      <div className='flex items-center'>
      <input
        className=" px-2 py-1 text-xl md:text-2xl rounded-l-lg text-white"
        type="text"
        placeholder="Search..."
      />
      <button className="bg-green-400 text-xl md:text-2xl text-white p-2 rounded-r-lg">
        <FaSearch />
      </button>
    </div>
      <div className="buttons flex flex-row md:mr-4 mr:0 ml-4 mt-4 mb-4 sm:items-center ">
        <button className='bg-white p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 '><Link href='/signup'>Signup</Link></button>
        <button className='bg-white p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 ml-4'><Link href='/login'>Login</Link></button>
      </div>
    </div>
  )
}

export default Navbar
