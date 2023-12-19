"use client"
import Hospital from '@/components/HelperComps/Hospital';
import ImageGallery from '@/components/HelperComps/ImageGallery';
import Neighborhood from '@/components/HelperComps/Neighborhood';
import LeftSidebar from '@/components/LeftSidebar';
import SchoolFinder from '@/components/forms/SchoolFinder';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: any) => {
  const Categories = [
    {
      name: 'Pictures',
    },
    {
      name: 'School',
    },
    {
      name: 'Hospital',
    },
    {
      name: 'Neighborhood',
    },
  ];

  const [slug, setSlug] = useState('');
  const [property, setProperty] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Pictures');
  const [zip , setzip ] = useState('')

  useEffect(() => {
    setSlug(params);
    const fetchDet = async () => {
      try {
        const response = await axios.post(`/api/property`, slug);
        setProperty(response.data.property);
        if (response.data.property && response.data.property.imgarray) {
          const data = response.data.property.imgarray;
          setImages(data);
        } else {
          console.error('imgarray is missing in the response data');
        }

        if (response.data.property.pincode){
          setzip(response.data.property.pincode)
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
        {selectedCategory === 'School' && <SchoolFinder/>}
        {selectedCategory === 'Hospital' && <Hospital />}
        {selectedCategory === 'Neighborhood' && <Neighborhood />}
      </div>
    </section>
  );
};

export default Page;
