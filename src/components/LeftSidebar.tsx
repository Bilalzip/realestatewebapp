"use client";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHome, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const LeftSidebar = () => {
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("admin");
      setOpen(false);
      if (isAdmin === "true") {
        setAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    router.push("/login"); // Redirect to login after logout
  };

  const sidebarLinks = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "Properties",
      link: "/properties",
      icon: <FaHome size={22} />,
    },
    {
      name: "Favorites",
      link: "/user/favorites",
      icon: <CiHeart size={22} />,
    },
    {
      name: "List Property",
      link: "/admin/listing",
      icon: <RiAdminFill size={22} />,
      hidden: !admin,
    },
    {
      name: "My Account",
      link: "/user/account",
      icon: <FaUserCircle size={22} />,
    },
    {
      name: "Logout",
      action: handleLogout, // Instead of a link, we perform an action
      icon: <FaSignOutAlt size={22} />,
      isButton: true, // Indicates this is a button, not a link
    },
  ];

  return (
    <div className={`bg-[#332E3C] min-h-screen flex flex-col ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 ml-1 md:ml-2 rounded-bl-lg rounded-tr-md rounded-br-md mt-4`}>
      
      {/* Sidebar Menu */}
      <div>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {sidebarLinks.map((item, index) => (
            item.isButton ? (
              <button 
                key={index} 
                onClick={item.action} 
                className="text-gray-100 hover:text-gray-300 flex items-center gap-2 p-2 rounded-md transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className={`ml-2 whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden mt-2"}`}>
                  {item.name}
                </span>
              </button>
            ) : (
              <Link className="group" href={item?.link!} key={index}>
                <div className={`text-gray-100 hover:text-gray-300 flex items-center gap-2 p-2 rounded-md transition ${item.hidden ? "hidden" : ""}`}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`ml-2 whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden mt-2"}`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
