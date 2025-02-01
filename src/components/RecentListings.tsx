"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const RecentListings = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const response = await axios.post('/api/admin/recentListings')
        setListings(response.data.response)
      } catch (error: any) {
        console.error('Error fetching listings:', error)
      }
    }
    fetchRecentListings()
  }, [])

  type Item = {
    name: string
    streetaddress: string
    pincode: string
    landmark: string
    imgarray: [string]
    slug: string
    description: string
    price: number
    bedrooms: number
    bathrooms: number
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Recent Listings</h1>
      <section className='space-y-8'>
        {listings?.map((item: Item, index) => (
          <div
            key={index || item?.slug}
            className='flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300'
          >
            <Link href={`/properties/${item?.slug}`} className='md:w-1/2'>
              <img
                className='w-full h-64 object-cover md:h-full'
                src={item?.imgarray.length > 0 ? item.imgarray[0] : ''}
                alt='Villa image'
              />
            </Link>
            <div className='p-6 flex flex-col justify-between md:w-1/2'>
              <div>
                <h2 className='text-2xl font-semibold text-gray-900'>{item?.name}</h2>
                <p className='text-gray-600 mt-2'>
                  <strong>Location:</strong> {item?.landmark}
                </p>
                <p className='text-gray-600'>
                  <strong>Pincode:</strong> {item?.pincode}
                </p>
              </div>
              <div className='flex space-x-4 mt-6'>
                <Link href={`/properties/${item?.slug}`}>
                  <button className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
                    Explore
                  </button>
                </Link>
                <Link href={`/admin/editproperty/${item?.slug}`}>
                  <button className='bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition'>
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default RecentListings
