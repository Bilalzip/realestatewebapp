"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { Bars } from 'react-loader-spinner';

interface ImageUploadFormProps {
  imgid?: string;
}

interface PreviewFile extends File {
  preview: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

interface ListImagePayload {
  propertyId: string;
  imgarray: string[];
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ imgid }) => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(acceptedFiles);
    const previews = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })) as PreviewFile[];
    setPreviewImages(previews);
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  });

  const uploadToCloudinary = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'realstate');
    try {
      const response = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
      return undefined;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!imgid) {
      toast.error('Please provide basic details first');
      return;
    }
    setLoading(true);
    
    try {
      const uploadedUrls = (await Promise.all(images.map(uploadToCloudinary)))
        .filter((url): url is string => url !== undefined);

      const payload: ListImagePayload = {
        propertyId: imgid,
        imgarray: uploadedUrls
      };

      await axios.post('/api/admin/listimage', payload);
      toast.success('Images uploaded successfully');
      router.push('/properties');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to associate images: ${error.message}`);
        console.error(error);
      } else {
        toast.error('Failed to associate images');
        console.error('An unknown error occurred:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl min-h-[90vh] flex flex-col gap-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
        Upload Property Images
      </h1>

      <div 
        {...getRootProps()} 
        className="relative border-2 border-dashed border-blue-400 p-8 rounded-xl 
          bg-blue-50/50 backdrop-blur-sm transition-all duration-300 
          hover:border-blue-500 hover:bg-blue-50/80 cursor-pointer
          min-h-[40vh] flex flex-col items-center justify-center gap-4"
      >
        <input {...getInputProps()} />
        <svg 
          className="w-16 h-16 text-blue-500 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="text-center">
          <p className="text-lg text-gray-700 font-medium">
            Drag & drop your images here
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to browse from your computer
          </p>
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewImages.map((file, index) => (
            <div key={index} className="relative group">
              <img 
                src={file.preview} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-48 rounded-lg shadow-md object-cover transition-transform 
                  duration-300 group-hover:scale-[1.02]" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">Image {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleSubmit} 
        className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl 
          font-semibold text-lg transition-all duration-300 transform 
          hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || previewImages.length === 0}
      >
        {loading ? (
          <div className='flex items-center justify-center gap-2'>
            <Bars height="24" width="24" color="#fff" ariaLabel="loading" />
            <span>Uploading...</span>
          </div>
        ) : 'Upload Images'}
      </button>
    </div>
  );
};

export default ImageUploadForm;
