"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthUser } from '@/slice/AuthSlice';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, setLogin] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', login);
      localStorage.setItem('admin', response.data.isadmin);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      dispatch(AuthUser(JSON.stringify(response.data.token)));
      toast.success('Successfully logged in');
      router.push('/properties');
    } catch (error) {
      toast.error('Invalid credentials, please try again');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-500" />
              <input
                value={login.email}
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
                value={login.password}
                className="w-full py-2 px-3 focus:outline-none"
                id="password"
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Dont have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
