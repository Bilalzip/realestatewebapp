import Image from 'next/image';
import React from 'react';

const ImageGallery = ({ imagedata }) => {
  const uniqueUrls = new Set(imagedata);

  return (
    <div className='grid md:grid-cols-3 grid-cols-1 mt-4 gap-4'>
      {[...uniqueUrls].map((item, index) => (
        <img
          key={index}
          src={item}
          className='object-cover w-full h-48 md:h-96 rounded-md shadow-md shadow-black'
          alt={`Image ${index}`}
        
        />
      ))}
    </div>
  );
};

export default ImageGallery;
