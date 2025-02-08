"use client"
import LeftSidebar from '@/components/LeftSidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define interface for form data
interface PropertyFormData {
  name: string;
  price: string;
  bedrooms: string;
  description: string;
  streetaddress: string;
  pincode: string;
  state: string;
  bathrooms: string;
  image?: string;
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const router = useRouter();
  const [slug, setSlug] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formdata, setFormdata] = useState<PropertyFormData>({
    name: '',
    price: '',
    bedrooms: '',
    description: '',
    streetaddress: '',
    pincode: '',
    state: '',
    bathrooms: '',
    image: ''
  });
  
  useEffect(() => {
    setSlug(params.slug);
    const fetchProperty = async () => {
      try {
        const response = await axios.post(`/api/property`, { slug: params.slug });
        setData(response.data.property);
        setFormdata({
          name: response.data.property.name || '',
          price: response.data.property.price || '',
          bedrooms: response.data.property.bedrooms?.toString() || '',
          description: response.data.property.description || '',
          streetaddress: response.data.property.streetaddress || '',
          pincode: response.data.property.pincode || '',
          state: response.data.property.state || '',
          bathrooms: response.data.property.bathrooms?.toString() || '',
          image: response.data.property.image || ''
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch property details");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params.slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/editproperty", { formdata: formdata, id: data._id });
      toast.success("Property updated successfully!");
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error("Failed to update property");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.post("/api/deleteproperty", { id: data._id });
        toast.success("Property deleted successfully!");
        router.push('/admin/dashboard');
      } catch (error) {
        toast.error("Failed to delete property");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSidebar />
      
      <div className="flex-1 p-4 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              Delete Property
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Property Name</label>
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formdata.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formdata.bedrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formdata.bathrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  name="streetaddress"
                  value={formdata.streetaddress}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formdata.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formdata.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formdata.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
