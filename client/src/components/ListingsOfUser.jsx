import {useState} from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn,} from 'react-icons/md'
import PropertyDeleteConfirmation from './modals/PropertyDeleteConfirmation'



export default function ListingsOfUser({listing,onDelete}) {


    const handleDelete = async(listingId,e) => {
      e.preventDefault()
        try {
          onDelete(listingId)
        } catch (error) {
          
          console.log(error)
        }
       }
  return (
    <div>
        <div className='bg-white shadow-md md:ml-3 hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full  sm:w-[280px]'>
            <img src={listing.imageUrls[0]} alt="cover photo" className='h-[200px] sm:h-[180px] w-full object-cover hover:scale-105 transition-all duration-300'/>
        <div className='p-3 flex flex-col gap-2 w-full '>
            <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
            <div className='flex items-center gap-2'>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-1'>{listing.description}</p>
            <p className='text-slate-500 mt-1 font-semibold '>
                {
                    listing.offer ? listing.discountedPrice.toLocaleString('en-US')  : listing.regularPrice.toLocaleString('en-US')
                }
                {listing.type === 'rent' && '/month'}
            </p>
            <div className='text-slate-700 flex gap-4'>

                <div className='font-bold text-xs '>
                    {listing.bedrooms > 1  ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
                </div>
                <div className='font-bold text-xs'>
                    {listing.bathroms > 1  ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }
                </div>
            </div>
        </div>
        <div className='flex flex-row justify-between'>
        <Link to={`/updateListing/${listing._id}`}>
            <button  className="inline-flex items-center px-3 py-2 mb-3 ml-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              edit
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
               </Link>
           <button type='button' onClick={(e)=>handleDelete(listing._id,e)} className='p-3 px-3 py-2 mb-3 mr-3  text-red-700 font-semibold'> Delete </button>

        </div>
    </div>
    </div>
  )
}
