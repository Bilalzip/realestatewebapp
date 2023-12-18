"use client"
import ImageGallery from '@/components/HelperComps/ImageGallery';
import PropertyMenu from '@/components/HelperComps/PropertyMenu';
import LeftSidebar from '@/components/LeftSidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: any) => {

 
  const [slug, setSlug] = useState('');
  const [property, setProperty] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setSlug(params);
    const fetchDet = async () => {
      try {
        const response = await axios.post(`/api/property`, slug);
        console.log(response.data.property);
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
  console.log(images)
  return (
    <section className='flex flex-row'>
      <LeftSidebar />
      <div className='flex flex-col ml-2 md:ml-36 mr-4'>
        <PropertyMenu />
        <ImageGallery imagedata = {images}/>
        
      </div>
    </section>
  );
};

export default Page;
