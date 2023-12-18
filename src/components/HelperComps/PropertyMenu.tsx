import Link from 'next/link';
import React from 'react';

const PropertyMenu = () => {
  const Categories = [
    {
      name: 'Pictures',
      link: '/pictures',
    },
    {
      name: 'School',
      link: '/school',
    },
    {
      name: 'Hospital',
      link: '/hospital',
    },
    {
      name: 'Neighborhood',
      link: '/neighborhood',
    },
   { name: 'Message',
    link: '/Message',
  },
  ];

  return (
    <div className='flex flex-row md:p-4 gap-2 overflow-auto mt-4 md:mt-2 w-60 md:w-full'>
      {Categories.map((item, index) => (
        <Link
          key={index}
          className='p-2 md:p-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 items-center'
          href={item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default PropertyMenu;
