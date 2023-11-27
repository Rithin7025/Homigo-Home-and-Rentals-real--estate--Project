import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom';

function ShowListingsPage() {
    const {currentUser} = useSelector((state) => state.user)
const [listingDetails,setListingDetails] = useState([]);
const [tokenError,setTokenError] = useState(false)
const [listingError,setListingError] = useState(false)
    
 useEffect(()=>{
   const fetchListing = async() => {
    try {
      const res = await axios.get(`/api/listing/listings/${currentUser._id}`)
      console.log(res.data)
      setListingDetails(res.data)
    } catch (error) {
      console.log(error)
      setTokenError(true)
    }
   }
   fetchListing()
 },[])

 const handleDelete = async(listingId) => {
  try {
    console.log('entered handledelete')
    console.log(listingId)
   const res = await axios.delete(`/api/listing/deleteUserListing/${listingId}`);
   console.log('res',res)
   setListingDetails((prev) => prev.filter((listing) => listing._id !== listingId))
  } catch (error) {
    if(error.response.status === 404){
      setListingError('cannot find listing, try refresh or login again')
    }
    if(error.response.status === 401){
      setListingError('cannot authorise , please login again')
    }
    console.log(error)
  }
 }
  return (

    <div className=' md:w-full flex-wrap '>
{        listingError &&        <p className='text-center p-3  text-red-700'>{listingError}</p>
}
    {
      listingDetails && listingDetails.length > 0 && 
      listingDetails.map((listing)=>( 
        
        <div key={listing._id} className='w-full p-5 md:mt-11 md:ml-8 sm:w-1/2 sm:flex-wrap md:w-1/3 lg:w-1/4 xl:w-1/5'>
        <div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          
       <img
        className="w-full h-48 object-cover rounded-t-lg" // Set a fixed height and use object-cover
        src={listing.imageUrls[0]}
        alt=""
      />   
                 
      <div className='flex flex-row'>
          <div className='p-5 w-full'>
            
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{listing.name}</h5>
              <Link to={`/updateListing/${listing._id}`}>
            <button href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              edit
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
              </Link>

            <button onClick={()=>handleDelete(listing._id)} className=' ml-12 text-red-700 font-semibold'> Delete </button>
         
 
 </div> 
 
          </div>
        </div>
      </div> 
      ))
    }

    {
      listingDetails.length === 0 &&  (
        <div className="bg-blue-50 border-l-4 h-screen w-screen border-blue-500 text-blue-700 p-4 mt-4" role="alert">
        <p className="font-bold">No Active Listings</p>
        <p>You currently don't have any active listings.!</p>
        <span className='text-xs text-red-700'>(This may happen if your listings haven't been verified or not created any )</span>
      </div>  
      )
    }

    {
      
      tokenError && (

        <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">&#x26A0; </span>
          <span className="hidden sm:inline">Cannot authorize your token. Please log in again.</span>
          
        </div>
      </div>
      )
    }
     

    </div>

  )
}
   
export default ShowListingsPage