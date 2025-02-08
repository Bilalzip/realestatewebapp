"use client";
import ImageUploadForm from '@/components/ImageUploadForm';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface BasicPropertyInfo {
  name: string;
  streetaddress: string;
  pincode: string;
  landmark: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  state: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
  };
}

const Page = () => {
  const [hide, setHide] = useState(false);
  const [id, setId] = useState('');
  const [basic, setBasic] = useState<BasicPropertyInfo>({
    name: '',
    streetaddress: '',
    pincode: '',
    landmark: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    state: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasic(prev => ({ ...prev, [name]: value }));
  };
  
  const saveBasicInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<ApiResponse>('/api/admin/listing', basic);

      if (response.data.success) {
        toast.success(response.data.message);
        
        if (!response.data.data?._id) {
          throw new Error("Missing property ID in response");
        }
        
        setId(response.data.data._id);
        setHide(true);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong while saving");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          List Your Property
        </h1>

        {!hide ? (
          <form onSubmit={saveBasicInfo} className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name</label>
                <input 
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  name="name" 
                  value={basic.name} 
                  onChange={onChange} 
                  placeholder="Enter property name" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="streetaddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                <input 
                  id="streetaddress"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  name="streetaddress" 
                  value={basic.streetaddress} 
                  onChange={onChange} 
                  placeholder="Enter street address" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input 
                  id="state"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  name="state" 
                  value={basic.state} 
                  onChange={onChange} 
                  placeholder="e.g. CA" 
                  required 
                  maxLength={2} 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pin Code</label>
                <input 
                  id="pincode"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  name="pincode" 
                  value={basic.pincode} 
                  onChange={onChange} 
                  placeholder="Enter pin code" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                <input 
                  id="landmark"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  name="landmark" 
                  value={basic.landmark} 
                  onChange={onChange} 
                  placeholder="Enter nearby landmark" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input 
                  id="price"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="number" 
                  name="price" 
                  value={basic.price} 
                  onChange={onChange} 
                  placeholder="Enter price in USD" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input 
                  id="bedrooms"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="number" 
                  name="bedrooms" 
                  value={basic.bedrooms} 
                  onChange={onChange} 
                  placeholder="Number of bedrooms" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input 
                  id="bathrooms"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="number" 
                  name="bathrooms" 
                  value={basic.bathrooms} 
                  onChange={onChange} 
                  placeholder="Number of bathrooms" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                name="description" 
                value={basic.description} 
                onChange={onChange} 
                placeholder="Describe your property in detail..." 
                rows={4}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md"
            >
              Save & Continue
            </button>
          </form>
        ) : (
          <ImageUploadForm imgid={id} />
        )}
      </div>
    </div>
  );
};

export default Page;
