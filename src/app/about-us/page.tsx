import React from 'react';

const page = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Us</h1>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-blue-600">Real Estate Co.</span>, your trusted partner in finding the perfect home. 
          We believe in making the process of buying, selling, and renting properties seamless and stress-free.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our mission is to empower individuals and families by providing easy access to high-quality properties. 
          We are dedicated to offering reliable listings, expert advice, and exceptional customer service to help you make the best real estate decisions.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li>Verified property listings with accurate details</li>
          <li>Expert real estate consultation and guidance</li>
          <li>User-friendly platform for easy browsing and filtering</li>
          <li>Secure transactions and trusted customer support</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our team of experienced real estate professionals is dedicated to helping you find your dream property. 
          We work tirelessly to ensure that your journey with us is smooth, transparent, and rewarding.
        </p>
        
        <div className="flex justify-center mt-8">
          <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
