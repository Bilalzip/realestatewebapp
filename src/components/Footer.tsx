import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row md:ml-12 md:mr-12 mt-6 ml-4 mr-4 font-serif h-80 gap-2 bg-[#374151] rounded-md'>
      <div className='md:w-1/3 w-full h-full '>
        <div className='m-4 flex items-center justify-center'>
        <img className='w-1/2 h-1/2 rounded-full' src="https://image.similarpng.com/very-thumbnail/2022/01/Buildings-real-estate-logo-design-on-transparent-background-PNG.png" alt="" />
        </div>
      </div>
      <div className='md:w-1/3 w-full h-full '></div>
      <div className='md:w-1/3 w-full h-full '></div>
    </div>
  )
}

export default Footer
