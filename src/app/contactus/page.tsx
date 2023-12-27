"use client"
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Functional component
const ContactForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  
    const submitForm = async ()=>{
        const response = await axios.post('/api/contact', formData);
        console.log(response);
        toast.success(response.data.message);
    }

  // Handle input changes
  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormData({
      fullName: '',
      email: '',
      message: '',
    });
    submitForm();
  };

 

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fullName'>
            Full Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='fullName'
            type='text'
            placeholder='Full Name'
            name='fullName'
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
            Message
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='message'
            placeholder='Your Message'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
