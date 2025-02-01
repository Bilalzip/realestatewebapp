"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';

const Signup: React.FC = () => {
  const router = useRouter();
  const [signup, setSignup] = useState<{ name: string; email: string; password: string; username: string }>({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/signup', signup);
      toast.success('Signup Successful');
      router.push('/login');
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaUser className="text-gray-500" />
              <input
                value={signup.name}
                className="w-full py-2 px-3 focus:outline-none"
                id="fullname"
                name="name"
                onChange={onChange}
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaUserCircle className="text-gray-500" />
              <input
                value={signup.username}
                className="w-full py-2 px-3 focus:outline-none"
                id="username"
                name="username"
                onChange={onChange}
                type="text"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-500" />
              <input
                value={signup.email}
                className="w-full py-2 px-3 focus:outline-none"
                id="email"
                name="email"
                onChange={onChange}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-500" />
              <input
                value={signup.password}
                className="w-full py-2 px-3 focus:outline-none"
                id="password"
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
