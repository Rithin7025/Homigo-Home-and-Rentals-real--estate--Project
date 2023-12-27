import React, { useState } from 'react'
import verifyIcon from '../../assets/icons/correct.png'


function Datatable() {
  const [listing,setListing] = useState([])


  return (
    <div className='p-5'>
<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span class="relative flex gap-2 items-center px-5 py-2.5 transition-all ease-in duration-75 bg-blue-600 text-white rounded-md group-hover:bg-opacity-0">
Sort by
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

</span>
</button>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    sl
                </th>
                <th scope="col" className="px-6 py-3">
                    Property name
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Owner id
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Verification Status
                </th>
                <th scope="col" className="px-6 py-3">
                     Status Indicator
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="">View</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   5
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-8 py-4 gap-2 items-center  text-center font-semibold flex">
                    <p className=' text-center uppercase rounded-lg py-1 '>verified </p>
                    <img src={verifyIcon} className='h-4 w-4' alt="notify" />

                </td>
                <td className="px-6 py-4 text-center text-green-500 font-semibold">
                    <p className='bg-green-600 text-center uppercase text-white rounded-lg py-1  shadow-md'>Unblocked</p>
                </td>
                <td className="px-6 py-4 justify-center flex first-letter:" >
                   <p className='text-gray-500 hover:text-gray-800'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                   </p>
                </td>
            </tr>
           
        </tbody>
    </table>
</div>
    </div>
  )
}



export default Datatable