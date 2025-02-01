import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12 border-t-4 border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 border-l-4 border-blue-500 pl-4">
          &copy; {new Date().getFullYear()} Real Estate Co. All rights reserved.
        </p>
        
        <div className="flex space-x-6 mt-4 md:mt-0 border-r-4 border-blue-500 pr-4 py-2">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
