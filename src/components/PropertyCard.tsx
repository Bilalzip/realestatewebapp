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
  imgarray: string[] | [];
  slug:string
}
const PropertyCard: React.FC<PropertyCardProps> = ({ name, streetaddress, landmark, imgarray,slug }) => {
  const [token , settoken] = useState('');
  const [slugs ,setslugs] = useState('')
  const router = useRouter();
  useEffect(() => {
    const gettoken = () => {
     
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const tokenString = JSON.parse(storedToken);
        settoken(tokenString);
        setslugs(slug);
      } else {
        console.error('Token not found in local storage');
      }
    };
  
    gettoken();
  }, [slug]);
  
  const handlewish = async () => {
    try {
      const response = await axios.post('/api/users/favorite', {
        token: token,
        slug: slugs,
      });
      console.log(response.data.message);
      toast.success(response.data.message);
      router.push('/user/favorites')
    } catch (error:any) {
      console.error('Error adding to favorites:', error.message);
    }
  };
  

  const [wish , setwish] = useState(false)

  const onMouseEnter = (e:any)=>{
     setwish(!wish)
}

const onMouseleave = (e:any)=>{
  setwish(!wish)
}


  return (
    <main>

<div className="overflow-hidden shadow-md rounded-md h-fit w-full">
    <img className="w-full h-48 object-cover" src={imgarray[0]} alt="Property" />
    <div className='flex flex-row'>
    <div className='m-2'>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{landmark}</p>
      <p className="text-lg font-bold text-gray-800">$1000000</p>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-600">Bedrooms: 4</p>
          <p className="text-gray-600">Bathrooms:4</p>
        </div>
        <Link href={`/properties/${slug}`}>
        <button  className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full ml-4">
          Explore
        </button>
        </Link>
    </div>


      <div className='text-5xl ml-2 mt-2 '>
      <button onClick={handlewish} onMouseEnter={onMouseEnter}  onMouseLeave={onMouseleave} className='hover:text-red-600'><CiStar /></button>
      </div>


      </div>
    </div>
  </div>
  <div className={`text-sm p-2 whitespace-pre duration-500 rounded-md h-fit w-fit text-black shadow-sm shadow-black mt-4 ${!wish ? 'absolute -left-52 duration-500 translate-x-28'  : 'block' }  `}>
        Favorite
      </div>
    </main>
    
  );
};

export default PropertyCard;
