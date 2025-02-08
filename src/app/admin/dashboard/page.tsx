"use client"
import LeftSidebar from '@/components/LeftSidebar'
import RecentListings from '@/components/RecentListings'
import TotalStatsComponent from '@/components/TotalStatsComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Add interface for API response
interface ApiResponse {
  Data: {
    UserData: [{
      totalUsers: string;
    }];
    PropertyData: [{
      totalProperties: string;
    }];
  }
}

type StatsType = {
  totalusers: number;
  totalproperties: number;
}

const Page = () => {

  const [data, setdata] = useState<StatsType>({
    totalusers:0,
    totalproperties:0
  })

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post<ApiResponse>('/api/totalstats');
        
        // Safely check if all required data exists
        if (response?.data?.Data?.UserData?.[0]?.totalUsers) {
          setdata({
            totalusers: parseInt(response.data.Data.UserData[0].totalUsers),
            totalproperties: parseInt(response.data.Data.PropertyData[0].totalProperties)
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Optionally set some error state here
      }
    };

    fetchdata();
  }, []); 
  return (

    <main className='flex flex-row'>
        <LeftSidebar/>
     <div className="container mx-auto p-4">
     <TotalStatsComponent  statsdata = {data} />
     <RecentListings/>
     <div>

     </div>
      </div>
      </main>
   
  )
}

export default Page;
