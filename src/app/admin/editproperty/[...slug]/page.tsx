"use client"
import LeftSidebar from '@/components/LeftSidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {Bars} from 'react-loader-spinner';

const Page = ({ params }: any) => {
  const [slug, setSlug] = useState('');
  const [data, setData] = useState<any>([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formdata, setFormdata] = useState({
    name: '',
    price: '',
    bedrooms: '',
    description: '',
    streetaddress: '',
    pincode: '',
    state: '',
    bathrooms: '',
  });

  useEffect(() => {
    setSlug(params);
    const fetchProperty = async () => {
      try {
        const response = await axios.post(`/api/property`, slug);
        console.log(response)
        setData(response.data.property);
        toast.success("Edit the details of the property")
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };
const handleSubmit = async(e:any)=>{
e.preventDefault();
  const response = await axios.post("/api/editproperty", {formdata: formdata , id : data._id});
  console.log(response);
  setEdit(!edit)
}
  return (
    <div className='flex flex-row'>
      <LeftSidebar />

      { !loading ? (
      <div className={`md:m-16 ml-3 mt-6 m-4 text-white ${!edit ? 'bg-yellow-700' : 'bg-[#332E3C] text-white md:w-1/3 w-full'} md:w-1/4 w-full h-fit md:p-8 p-2 rounded-md`}>
        <button
          onClick={handleEdit}
          className={`bg-black  w-20 h-12 rounded-md relative md:left-64 md:bottom-6 left-2 bottom-0 ${!edit ? 'block' : 'hidden'}`}
        >
          Edit
        </button>

        {!edit ? (  
          <div className='flex flex-col gap-3'>
            <div>
              <span>Name: </span>
              {data?.name}
            </div>
            <div>
              <span>Price: </span>
              {data?.price}
            </div>
            <div>
              <span>Bedrooms: </span>
              {data?.bedrooms}
            </div>
            <div>
              <span>Description: </span>
              {data?.description}
            </div>
            <div>
              <span>Street Address: </span>
              <span>{data?.streetaddress}</span>
            </div>
            <div>
              <span>Pincode: </span>
              <span>{data?.pincode}</span>
            </div>
            <div>
              <span>State : </span>
              <span>{data?.state}</span>
            </div>
            <div>
              <span>Bedrooms : </span>
              <span>{data?.bedrooms}</span>
            </div>
            <div>
              <span>Bathrooms : </span>
              <span>{data?.bathrooms}</span>
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 text-black'>
              <label>Name</label>
              <input
                className='h-8 rounded-md'
                type='text'
                name='name'
                value={formdata.name}
                onChange={handleChange}
              />
              <label htmlFor='price'>Price</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='price'
                name='price'
                value={formdata.price}
                onChange={handleChange}
              />
              <label htmlFor='bedrooms'>Bedrooms</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='bedrooms'
                name='bedrooms'
                value={formdata.bedrooms}
                onChange={handleChange}
              />
              <label htmlFor='description'>Description</label>
              <textarea
                className='rounded-md'
                id='description'
                name='description'
                rows={3}
                value={formdata.description}
                onChange={handleChange}
              ></textarea>
              <label htmlFor='streetaddress'>Street Address</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='streetaddress'
                name='streetaddress'
                value={formdata.streetaddress}
                onChange={handleChange}
              />
              <label htmlFor='pincode'>Pincode</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='pincode'
                name='pincode'
                value={formdata.pincode}
                onChange={handleChange}
              />
              <label htmlFor='state'>State</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='state'
                name='state'
                value={formdata.state}
                onChange={handleChange}
              />
              <label htmlFor='bathrooms'>Bathrooms</label>
              <input
                className='h-8 rounded-md'
                type='text'
                id='bathrooms'
                name='bathrooms'
                value={formdata.bathrooms}
                onChange={handleChange}
              />
              <button type='submit' className='bg-black text-white rounded-md py-3 px-6'>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>) : ( <div className='m-4'>

        <Bars 
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                         />
      </div>  ) }
    </div>
  );
};

export default Page;
