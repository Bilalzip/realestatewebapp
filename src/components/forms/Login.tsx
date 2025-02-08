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
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-8 transform hover:scale-[1.01] transition-transform">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <FaEnvelope className="text-gray-400" />
                <input
                  value={login.email}
                  className="w-full py-3 px-3 focus:outline-none text-gray-700 bg-transparent"
                  id="email"
                  name="email"
                  onChange={onChange}
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <FaLock className="text-gray-400" />
                <input
                  value={login.password}
                  className="w-full py-3 px-3 focus:outline-none text-gray-700 bg-transparent"
                  id="password"
                  name="password"
                  onChange={onChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
