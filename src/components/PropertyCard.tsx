import React from 'react'

const PropertyCard = () => {
  return (
    <div className="max-w-md mx-auto overflow-hidden shadow-md rounded-md">
    <img className="w-full h-48 object-cover" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Property" />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Home</h2>
      <p className="text-gray-600 mb-2">London</p>
      <p className="text-lg font-bold text-gray-800">$1000000</p>

      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-600">Bedrooms: 4</p>
          <p className="text-gray-600">Bathrooms:4</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Explore
        </button>
      </div>
    </div>
  </div>
  )
}

export default PropertyCard
