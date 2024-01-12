"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react"
export default function Home() {
  const router = useRouter();

        const [search , setsearch] = useState('');
        const handlesearch = (e:any)=>{
          e.preventDefault();
          router.push(`/search/?q=${search}`);
        }
  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-[#FAF5F0] justify-between mt-2 p-4 rounded-sm">
     <div className="md:m-12 m-2 md:mt-0 mt-16">
       <h1 className="text-5xl font-bold text-black">Real Estate Ninjas<br /> By MOHD BILAL
</h1>
<p className="font-thin text-2xl text-black mt-4">Real Estate Ninjas is an innovative platform crafted by the visionary Mohd Bilal. <br /> With an unwavering commitment to excellence, this marketplace is dedicated to enhancing <br /> the experience of acquiring and transferring properties.</p>
<form onSubmit={handlesearch} className="p-4">
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>{const {value} = e.target; setsearch(value) }} type="search" id="default-search" name='search' value={search} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a place" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
     </div>
     <div className="relative w-full h-auto mt-12 overflow-hidden rounded-md bg-yellow-300 hidden md:block">
      <img
        src="https://images.pexels.com/photos/8815932/pexels-photo-8815932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Real Estate Ninjas"
        className="w-full h-full object-cover"
      />
    </div>
    </main>
  )
}
