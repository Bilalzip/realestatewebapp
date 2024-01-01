"use client"
import LeftSidebar from '@/components/LeftSidebar'
import TotalStatsComponent from '@/components/TotalStatsComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


type StatsType= {
  totalusers:number; totalproperties:number
}
const Page = () => {

  const [data, setdata] = useState<StatsType>({
    totalusers:0,
    totalproperties:0
  })

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.post('/api/totalstats');
      console.log();

      if (response.data.Data.UserData[0].totalUsers > 0) {
        setdata({
          totalusers: parseInt(response.data.Data.UserData[0].totalUsers),
          totalproperties: parseInt(response.data.Data.PropertyData[0].totalProperties)
        });
      }
    };

    fetchdata();
  }, []); 
  return (

    <main className='flex flex-row'>
        <LeftSidebar/>
     <div className="container mx-auto p-4">
     <TotalStatsComponent  statsdata = {data} />
      </div>
      </main>
   
  )
}

export default Page;
