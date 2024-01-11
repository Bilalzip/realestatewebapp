"use client"
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";

import React, { useEffect, useState } from 'react'
import { FcAbout } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { FaBlog } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { MdOutlineFeaturedVideo } from "react-icons/md";
import Image from 'next/image'
import Link from 'next/link'
const LeftSidebar = () => {

  const[admin , setadmin]=useState(false);
  const [open , setopen] = useState(true);
   useEffect(()=>{
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem('admin');
      setopen(false);
      if (isAdmin === "true") {
        setadmin(true);
      }
     }
   },[])
     
   

    const sidebarLinks = [

        {
          name:"Dashboard",
          link: '/admin/dashboard',
          icon: <MdDashboard />
        },
        {
          name: "Properties",
          link: "/properties",
          icon: <FaHome />,
        },
        {
          name: "About Us",
          link: "/about-us",
          icon: <FcAbout />,
        },
        {
          name: "Favorites",
          link: "/user/favorites",
          icon: <CiHeart />,
        },
        {
          name: "Contact Us",
          link: "/contactus",
          icon: <IoIosContacts />,
        },
        {
          name: "Featured Property",
          link: "/featured",
          icon: <MdOutlineFeaturedVideo />,
        },
        {
          name: "List Property",
          link: "/admin/listing",
          icon: <RiAdminFill /> ,
          hidden: !admin,
        },
      ]; 
  return (
   <>
     <div className={`bg-[#332E3C] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 ml-1 md:ml-2 rounded-bl-lg rounded-tr-md rounded-br-md mt-4`}>
        <div className={`py-3 flex justify-end`}>
        <HiMenuAlt3 size={26} className='cursor-pointer' onClick={()=>setopen(!open)}/>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
        {  sidebarLinks.map((item, index) => (
            <Link className="group" href={item.link} key={index}>
              <div className={`text-gray-100 hover:text-gray-300 mb-8 ${item.hidden ? 'hidden' : ''}`}>
                <div className="flex items-center">
              <span className="text-2xl"> {item.icon}</span>
              <span
              style={{transitionDelay: `${index +3}00ms`}}
              className={`ml-2 whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden mt-2"}`}>{item.name}</span>
              <span className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                {item.name}
              </span>
                </div>
              </div>
            </Link>
          )) }
        </div>
     </div>
     </>
  
  )
}

export default LeftSidebar
