import React from "react"
export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-[#FAF5F0] justify-between mt-2 p-4 rounded-sm">
     <div className="md:m-12 m-2 ">
       <h1 className="text-6xl font-bold text-black">Looking everywhere <br /> and still feel lost? <br /> We’ll get you home.
</h1>
<p className="font-thin text-3xl text-black mt-4 ">Your Real Estate Ninja will handle every step of the process  when you buy or sell.<br /> Use our search and management dashboard to track everything and everyone <br /> involved in your transaction.</p>
<form className="mt-8">
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a place" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
     </div>
     <div className="relative w-full h-auto overflow-hidden rounded-md bg-yellow-300 hidden md:block">
      <img
        src="https://images.pexels.com/photos/8815932/pexels-photo-8815932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Real Estate Ninjas"
        className="w-full h-full object-cover"
      />
    </div>

    </main>
  )
}
