"use client"
import React from 'react';
import axios from 'axios'
import {useRouter} from "next/navigation";
import {toast} from 'react-hot-toast';

const Signup = () => {

  const router = useRouter();
  const [signup, setsignup] = React.useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  const onChange = (e:any) => {
    const { name, value } = e.target;
    setsignup({ ...signup, [name]: value });
  };

  // Sending Data to Api
  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", signup);
      console.log(response.data);
      toast.success("Signup Successful");
      router.push("/login")

    } catch (error) {
      toast.error("Some thing goes wrong")
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form  onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-semibold mb-6">Signup</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
          Full Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fullname"
          type="text"
          value={signup.name}
          name="name"
          placeholder="Full Name"
          onChange={onChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          value={signup.username}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={onChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          value={signup.email}
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
          value={signup.password}
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
          type="submit" // Change type to "submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Signup;
