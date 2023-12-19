import GraphsComponent from '@/components/GraphsComponent'
import LeftSidebar from '@/components/LeftSidebar'
import RecentListingsComponent from '@/components/RecentListingsComponent'
import TotalStatsComponent from '@/components/TotalStatsComponent'
import React from 'react'

const page = () => {
  return (

    <main className='flex flex-row'>
        <LeftSidebar/>

<div className="container mx-auto p-4">
     
     <TotalStatsComponent />

   
     <GraphsComponent />

     
     <RecentListingsComponent />
   </div>
    </main>
   
  )
}

export default page
