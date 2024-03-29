"use client"
import ImageGallery from '@/components/HelperComps/ImageGallery';
// import Neighborhood from '@/components/HelperComps/Neighborhood';
import WeatherAround from '@/components/HelperComps/WeatherAround';
import LeftSidebar from '@/components/LeftSidebar';
import SchoolFinder from '@/components/forms/SchoolFinder';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: any) => {
  console.log(params)
  const Categories = [
    {
      name: 'Pictures',
    },
    {
      name: 'School',
    },
    {
      name: 'Weather',
    },
    // {
    //   name: 'Neighborhood',
    // },
  ];

  const [slug, setSlug] = useState('');
  const [property, setProperty] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Pictures');
  const [zip , setzip ] = useState<string>("")

  const [city , setcity] = useState("");

  useEffect(() => {
    setSlug(params);
    const fetchDet = async () => {
      try {
        const response = await axios.post(`/api/property`, slug);
         console.log(response)
        setzip(response.data.property.pincode)
        setProperty(response.data.property);
        if (response.data.property && response.data.property.imgarray) {
          const data = response.data.property.imgarray;
          setImages(data);
        } else {
          console.error('imgarray is missing in the response data');
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDet();
  }, [params, slug]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };


     console.log(zip)
  return (
    <section className='flex flex-row'>
      <LeftSidebar />
      <div className='flex flex-col ml-2 md:ml-36 mr-4'>
        <div className='flex flex-row md:p-4 gap-2 overflow-auto mt-4 md:mt-2 w-60 md:w-full'>
          {Categories.map((item, index) => (
            <button
              key={index}
              className={`p-2 md:p-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 items-center ${
                selectedCategory === item.name ? 'bg-gray-600' : ''
              }`}
              onClick={() => handleCategoryClick(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        {selectedCategory === 'Pictures' && <ImageGallery imagedata={images} />}
        {selectedCategory === 'School' && <SchoolFinder sz = {property}/>}
        {selectedCategory === 'Weather' && <WeatherAround pin = {zip}/>}
        {/* {selectedCategory === 'Neighborhood' && <Neighborhood />} */}
      </div>
    </section>
  );
};

export default Page;
