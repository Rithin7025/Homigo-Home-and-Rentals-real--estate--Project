import React, { useEffect, useState } from 'react'
import verifyIcon from '../../assets/icons/correct.png'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Datatable() {
  const [listing,setListing] = useState([])
  const [loading,setLoading] = useState(false)
  let value = 0
    useEffect(()=>{
    const fetchListings = async() => {
     try {
      setLoading(true)
      const res = await axios.get('/api/listing/getEveryListings')
      console.log(res.data.length)
      setListing(res.data)
      setLoading(false)
     } catch (error) { 
      setLoading(false)
      console.log(error)
     }
    }
    fetchListings()
  },[])


  if(loading){
    return <div className='flex h-screen w-screen items-center justify-center bg-black'>
      <img src="data:image/jpeg;base64,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 " alt="" />
   </div>
  }
  console.log('-------------------------------')
  console.log(listing)  
  console.log('-------------------------------')

  return (
    <div className='p-5'>
 <div className='flex items-center gap-2'>

                        <label className='font-semibold ml-1'>Sort :</label>
                        <select  id="sort_order" className='border  p-3  items-center text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>

                            <option value='regularPrice_desc'className='text-black' >Newest first</option>
                            <option value='regularPrice_asc' className='text-black' >Oldest first</option>
                           
                        </select>

                    </div>

<div className="relative overflow-scroll h-[480px] shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  sticky top-0 z-10">
            <tr className=''>
                
                <th scope="col" className="px-6 py-3">
                    Sl
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

            {
              listing && listing.map((item,index)=>(
<tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 ">
                
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item?.name}
                </th>
                <td className="px-6 py-4">
                    {item?.type}
                </td>
                <td className="px-6 py-4">
                    {item?.userRef}
                </td>
                <td className="px-6 py-4">
                   {item?.regularPrice}
                </td>
                <td className="px-8 py-4 gap-2 items-center  text-center font-semibold flex">
                  {
                    item?.isVerified ? (
                      <>
                      <p className=' text-center uppercase rounded-lg py-1 '>verified </p>
                      <img src={verifyIcon} className='h-4 w-4' alt="notify" />
                      </>
                    ) : 'not verified'
                  }

                </td>
                <td className="px-6 py-4 text-center text-green-500 font-semibold">
                  {!item?.isBlocked ? (
                    <>
                    <p className='bg-green-600 text-center  text-white rounded-lg py-1  shadow-md'>Unblocked</p>
                    </>
                  ) :   <p className='bg-red-600 text-center uppercase text-white rounded-lg py-1  shadow-md'>blocked</p>
                }
                </td>
                <td className="px-6 py-4 justify-center flex first-letter:" >
                <Link to={`/admin/propertyDetailViewOfAdmin/${item?._id}`}>
                   <p className='text-gray-500 hover:text-gray-800 transform hover:scale-100'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-6 h-6 transform hover:scale-100 hover:w-7 hover:h-7 hover:text-blue-900">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
                   </p>
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



export default Datatable