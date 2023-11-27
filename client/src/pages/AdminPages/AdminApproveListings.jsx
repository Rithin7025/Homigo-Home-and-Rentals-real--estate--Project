import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdminApproveListings() {
  const [data,setData] = useState([]);

  useEffect(()=>{
    const fetchData = async() => {
        console.log()
       const res = await axios.get('/api/admin/getUnverifiedListings')
       console.log(res.data)
       setData(res.data);
    }

    fetchData();
  },[])
  return (
    <div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Property name
                </th>
                <th scope="col" className="px-6 py-3">
                    UserId
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            
            {
              data.map((property)=>(
                <tr key={property._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {property.name}
                </th>
                <td className="px-6 py-4 items-center">
                    {property.userRef}
                </td>
                <td className="px-6 py-4">
                    {property.type}
                </td>
                <td className="px-6 py-4">
                    {property.regularPrice}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/admin/propertyDetailsPage/${property._id}`}>
                    <button className='text-blue-700 font-semibold hover:bg-slate-200 p-3 rounded-xl shadow-xl bg-slate-100'>click</button>
                    {/* <a href="#  " className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a> */}
                  </Link>
                </td>
            </tr>
              ))
            }
            
        </tbody>
    </table>
</div>

      
    </div>
  )
}
