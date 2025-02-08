import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiStar } from "react-icons/ci";

interface PropertyCardProps {
  name: string;
  streetaddress: string;
  landmark: string;
  imgarray: string[];
  slug: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ name, streetaddress, landmark, imgarray, slug }) => {
  const [token, setToken] = useState<string | null>(null);
  const [wish, setWish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleWish = async () => {
    if (!token) {
      toast.error("You need to log in first!");
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post('/api/users/favorite', {
        token: token,
        slug: slug,
      });
      toast.success(response.data.message);
      router.push('/user/favorites');
    } catch (error: any) {
      console.error('Error adding to favorites:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 h-96 w-[300px]">
      <Link href={`/properties/${slug}`}>
        <img className="w-full h-48 object-cover cursor-pointer" src={imgarray[0]} alt="Property" />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm">{landmark}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">$1,000,000</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-600">Bedrooms: 4</p>
            <p className="text-sm text-gray-600">Bathrooms: 4</p>
          </div>
          <Link href={`/properties/${slug}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-all">Explore</button>
          </Link>
        </div>
      </div>
      <button
        onClick={handleWish}
        onMouseEnter={() => setWish(true)}
        onMouseLeave={() => setWish(false)}
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition-all"
      >
        <CiStar />
      </button>
      {wish && (
        <div className="absolute top-4 right-12 bg-white shadow-md px-3 py-1 text-xs rounded-md text-gray-700">
          Favorite
        </div>
      )}
    </div>
  );
};

export default PropertyCard;