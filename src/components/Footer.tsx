import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row md:ml-12 md:mr-12 mt-6 ml-4 mr-4 font-serif h-full md:h-80 gap-2 bg-[#374151] rounded-md'>
      <div className='md:w-1/3 w-full h-full '>
        <div className='m-4 flex items-center justify-center'>
        <img className='w-1/2 h-1/2 rounded-full' src="https://image.similarpng.com/very-thumbnail/2022/01/Buildings-real-estate-logo-design-on-transparent-background-PNG.png" alt="" />
        </div>
      </div>
      <div className='md:w-1/3 w-full h-full md:ml-0 flex justify-center'>
        <li className='text-xl flex flex-col mt-6 text-white font-serif gap-4'>
          <ul><Link href = '/contactus'> Contact us</Link></ul>
        </li>
        
      </div>
      <div className='md:w-1/3 w-full h-full text-xl text-white mt-6 md:ml-0 p-4 text-center'>
       <p>Discover the ultimate real estate experience with us, the <span className='font-bold'>Real Estate Ninjas</span>. Your go-to for seamless property transactions.</p>
      </div>
    </div>
  )
}

export default Footer
