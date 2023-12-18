"use client"
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ImageUploadForm = ({imgid}) => {

  const [hide , sethide ] = useState(false)

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    const previews = selectedImages.map((image) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target?.result);
        reader.readAsDataURL(image);
      });
    });
    Promise.all(previews).then((results) => setPreviewImages(results));
  };
  const Cloudniary = async (data)=>{
    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     const short =  response.data.secure_url;
      return short;

    } catch (error) {
      setTimeout(() => {
        toast.error("we were not able to store images on cloud")
      }, 5000);
      console.error('Error while uploading images:', error);
    }
  }
      
  const saveurlarray = async (data) => {
    try {
      const response = await axios.post('/api/admin/listimage', {
        propertyId: imgid,
        imgarray: data,
      });
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      toast.error("Unable to Assost images");
      console.log(error);
    }
  };


      const handleSubmit = async (e) => {

       setTimeout(() => {
        if(!imgid){
          return(
            toast.error("Please provide basic details")
          )
         }
       }, 2000);
        const newpath = [];
      e.preventDefault();
      for (let image of images){
      const formData = new FormData();
      formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      formData.append('upload_preset', 'realstate');
      formData.append('file', image);
      const cloud = await Cloudniary(formData);
      console.log(cloud)
      newpath.push(cloud);
      saveurlarray(newpath);
    }
    sethide(!hide)
    
  };
  return (
    <div className='flex items-center justify-center md:justify-start md:items-start mt-6 flex-col w-full'>
      <div className='w-full border border-black m-2'>
      <form onSubmit={handleSubmit} className={`w-full md:w-auto mt-8 text-xl font-thin font-sans  ${hide ? "hidden duration-100 " : "block"}`} >
      <h1 className='text-2xl font-mono font-semibold text-black ml-2 '>Upload Images of Property</h1>
        <div className='mb-4 mt-4'>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
          />
        </div>

        {previewImages.length > 0 && (
          <div className='flex flex-wrap'>
            {previewImages.map((preview, index) => (
              <div key={index} className='w-full md:w-1/3 p-2'>
                <img src={preview} alt={`Preview ${index + 1}`} className='w-full h-auto rounded' />
              </div>
            ))}
          </div>
        )}
              <div className='flex justify-center items-center'>
              <button type='submit' className='mb-2 w-44 px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700'>
          Save
        </button>
                </div> 
        
      </form>

      <div className={`w-full flex items-center justify-center bg-gray-400 bg-opacity-10 mt-4 mb-4 p-8 ${!hide ? "hidden" : "block"}`}>
      <button onClick={(e)=>{sethide(!hide)}} type='submit' className="w-24 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Edit</button>
      </div>
      </div>
      
    </div>
  );
};

export default ImageUploadForm;
