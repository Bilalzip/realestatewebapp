"use client"
import ImageGallery from '@/components/HelperComps/ImageGallery';
import PropertyMenu from '@/components/HelperComps/PropertyMenu';
import LeftSidebar from '@/components/LeftSidebar'
import axios from 'axios';
import React, { useEffect } from 'react'

const page = ({params}:any) => {
  return (
    <section className='flex flex-row'>
       <LeftSidebar/>
      <div className='flex flex-col ml-2 md:ml-36 mr-4'>
      <PropertyMenu/>
      <ImageGallery/>
      </div>
    </section>
  )
}

export default page
