import React from 'react'

const ImageGallery = () => {
  return (
    <div className='w-full md:w-fit grid md:grid-cols-2 grid-cols-1 gap-2 md:mr-16 mt-4'>
      <img src = "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg" className='shadow-md shadow-black '/>
      <img src = "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg" className='shadow-md shadow-black '/>
      <img src = "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg" className='shadow-md shadow-black '/>
      <img src = "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg" className='shadow-md shadow-black '/>
    </div>
  )
}

export default ImageGallery
