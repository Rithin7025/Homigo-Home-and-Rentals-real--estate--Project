import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminHome() {

const [userData,setUserData] = useState([]);





useEffect(()=>{
  const fetchData = async()=>{
    try {
      const response = await axios.get('/api/admin/listUsers');
      console.log(response.data)
      setUserData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData();
},[])


  return (
    <div className="bg-white mb-0 p-4">
  <table className="w-full bg-light border border-gray-300">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-4 py-2 border border-gray-300">No.</th>
        <th className="px-4 py-2 border border-gray-300">Name</th>
        <th className="px-4 py-2 border border-gray-300">Email</th>
        <th className="px-4 py-2 border border-gray-300">Verified</th>
        <th className="px-4 py-2 border border-gray-300">Phone</th>
        <th className="px-4 py-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {/** using curly braces inside map have to specify return staement explicitely*/}

      {
        userData.map((users,index) => (
          <tr key={users._id}>
          <td className=" border border-gray-300">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="font-semibold mb-1">{index+1}</p>
              </div>
            </div>
          </td>
          <td className="px-4 py-2 border border-gray-300">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="font-semibold mb-1">{users.userName}</p>
              </div>
            </div>
          </td>
          <td className="px-4 py-2 border border-gray-300">
            <p className="font-normal mb-1">{users.email}</p>
          </td>
          <td className="px-4 py-2 border border-gray-300">
           { users.isVerified ? <span className="inline-block bg-green-500 text-white px-2 py-1 rounded-full  w-24 text-center">
              verified
            </span>
            : 
            <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-full w-24 text-center">
            Unverified
           </span>}
  
          </td>
          <td className="px-4 py-2 border border-gray-300">{users.phone}</td>
          <td className="px-4 py-2 border border-gray-300">
            <button className="text-blue-500 underline">Edit</button>
            
          </td>
        </tr>
        ))
      }
    </tbody>
  </table>
</div>
    

  )
}
