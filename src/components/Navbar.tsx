import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import { FiAlignJustify } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { AuthUser } from '@/slice/AuthSlice';

const Navbar = () => {
  const token = useSelector((state:any) => state.Auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        dispatch(AuthUser(storedToken));
      }
    };
    getTokenFromLocalStorage();
  }, [dispatch]);

  const onLogout = async () => {
    localStorage.removeItem('token');
    dispatch(AuthUser(null));
    const response = await axios.get('/api/users/logout');
    console.log(response);
  };

  let Links = [
    { name: 'HOME', link: '/' },
    { name: 'Listing', link: '/admin/listing' },
    { name: 'Properties', link: '/properties' },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full md:relative'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
          <Link href='/'>Real Estate Ninjas</Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'
        >
          {open ? <RxCross2 /> : <FiAlignJustify />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-20 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'top-20 ' : 'top-[-490px]'
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>
                {link.name}
              </a>
            </li>
          ))}
          <div className='ml-0 md:ml-4 '>
            {!token ? (
              <>
                <button className='bg-blue-500 p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 '>
                  <Link href='/sign-up'>Signup</Link>
                </button>
                <button className='bg-blue-500 p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 ml-4'>
                  <Link href='/sign-in'>Login</Link>
                </button>
              </>
            ) : (
              <button className='bg-blue-500 p-2 rounded-md font-bold font-serif hover:opacity-100 opacity-90 '>
                <Link href='/signup' onClick={onLogout}>
                  Logout
                </Link>
              </button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
