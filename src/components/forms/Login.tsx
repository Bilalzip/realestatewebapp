"use client"
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';
import Navbar from '../Navbar';
import jwt from 'jsonwebtoken'
import {AuthUser} from "@/slice/AuthSlice"
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {

  const dispatch = useDispatch();

    const router = useRouter();
    const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onChange = (e:any) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", login);
      console.log(response.data.isadmin)
      localStorage.setItem('admin', response.data.isadmin);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(AuthUser( JSON.stringify(response.data.token)));
      toast.success("Successfully logged in");
      router.push('/properties')
    } catch (error:any) {
      toast.error("Something goes wrong")
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div className='hidden'>
      </div>
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          value={login.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          onChange={onChange}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          value={login.password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
