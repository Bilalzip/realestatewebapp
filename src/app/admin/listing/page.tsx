"use client"
import ImageUploadForm from '@/components/ImageUploadForm'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {

  const [hide , sethide ] = useState(false);

  const [id, setId] = useState('')

  const [basic , setbasic ] = useState({
    name:'', streetaddress:"", pincode:'', landmark:'', description:'',price:'', bedrooms:'', bathrooms:'', state:''
  })
  const onchange = (e:any) =>{
    const {name , value } = e.target;
    setbasic({...basic, [name]:value});
   }
  const SaveBasicInfo = async (e:any)=>{
    e.preventDefault()
    const response = await axios.post('/api/admin/listing', basic);
    toast.success(response.data.message);
    setId(response.data.save._id);

    sethide(!hide);
  }
  console.log(basic)
  return (
    <div className='flex items-center justify-center md:justify-start md:items-start mt-6 md:ml-12 flex-col m-4'>
      <h1 className='text-4xl font-mono font-semibold text-black '>List Your Property</h1>

      { <div className='w-full'>
          <form  onSubmit={SaveBasicInfo} className={`w-full md:w-auto mt-8 text-xl font-thin font-sans ${hide ? "hidden duration-100 " : "block"}`}>
            <h1 className='mt-4 mb-4 text-2xl font-serif font-semibold'>Enter Basic Details</h1>
      
        <div className="mb-4 md:flex md:justify-between gap-6">
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label  className="block mr-0 md:mr-2">Name</label>
            <input required type="text" id="name" name='name' value={basic.name} onChange={onchange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block">Street Address</label>
            <input required type="text" id="address" name='streetaddress' value={basic.streetaddress} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block">STATE (e.g ,CA)</label>
            <input required placeholder='State Name like "CA"' type="text" id="state" maxLength={2} autoCapitalize='on' name='state' value={basic.state} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label  className="block">Pin Code</label>
            <input required type="text"id="address" name= 'pincode' value={basic.pincode} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block mr-0 md:mr-2">LandMark</label>
            <input required type="text" id="address" name="landmark" value={basic.landmark} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block mr-0 md:mr-2">Tentative Price $</label>
            <input required type="text" id="address" name="price" value={basic.price} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block mr-0 md:mr-2">Bedrooms</label>
            <input type="text" id="address" name="bedrooms" value={basic.bedrooms} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
          <div className="mb-2 md:mb-0 flex md:flex-row flex-col md:items-center items-start">
            <label className="block mr-0 md:mr-2">Bathrooms</label>
            <input type="text" id="address" name="bathrooms" value={basic.bathrooms} onChange={onchange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mt-2 md:mt-0" />
          </div>
        </div>
                <div className="w-full font-sans border border-black mt-8 mb-8 p-8">
        <label className="text-3xl font-semibold font-sans mb-4 block">
          Describe your property
        </label>
        <textarea
        name='description'
        value={basic.description}
        onChange={onchange}
          className="w-full h-40 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your property description..."
        ></textarea>
    </div>

    <div className='flex justify-center items-center'>
              <button type='submit' className='w-44 px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700'>
          Save
        </button>
                </div>
      </form>
      <div className={`w-full flex items-center justify-center bg-gray-400 bg-opacity-10 mt-4 mb-4 p-8 ${!hide ? "hidden" : "block"}`}>
      <button onClick={(e)=>{sethide(!hide)}} type='submit' className="w-24 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Edit</button>
      </div>
</div>}
      <ImageUploadForm imgid = {id}/>
      
    </div>
  )
}

export default Page
