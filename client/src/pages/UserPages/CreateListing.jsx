import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
       <h1 className='font-semibold text-center my-7 text-3xl'>Add Property</h1> 
       <form className='flex flex-col sm:flex-row gap-4'>

        {/**right div */}
        <div className='flex flex-col gap-4 flex-1'>
            
            <input type="text" placeholder='Name' id='name' maxLength='62' minLength='10'  className='border p-3 rounded-lg' required/>
            <textarea type="text" placeholder='Description' id='description'   className='border p-3 rounded-lg' required/>
            <input type="text" placeholder='Address' id='adress'   className='border p-3 rounded-lg' required/>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                     <input type='checkbox' id="sale" className='w-5' />
                     <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                     <input type='checkbox' id="rent" className='w-5' />
                     <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                     <input type='checkbox' id="parking" className='w-5' />
                     <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                     <input type='checkbox' id="furnished" className='w-5' />
                     <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                     <input type='checkbox' id="offer" className='w-5' />
                     <span>Offer</span>
                </div>
                
            </div>
            <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                <input  type="number" id='bedrooms' min='1'  max='10' className='p-3 border border-gray-300 rounded-lg' required/>
                <p>Beds</p>
                 </div>
                <div className='flex items-center gap-2'>
                <input  type="number" id='bathrooms' min='1'  max='10' className='p-3 border border-gray-300 rounded-lg' required/>
                <p>Baths</p>
                </div>
                <div className='flex items-center gap-2'>
                <input  type="number" id='regularPrice' min='1'  max='10' className='p-3 border border-gray-300 rounded-lg' required/>
                <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>(₹ / month)</span>
                </div>
                 </div>
                <div className='flex items-center gap-2'>
                <input  type="number" id='discountPrice' min='1'  max='10' className='p-3 border border-gray-300 rounded-lg' required/>
                <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>(₹ / month)</span>

                </div>
                 </div>
                </div>
        </div>

         {/**left div */}
        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'> Images : 
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (Max 6)</span>
            </p>
        <div className='flex gap-4'>
            <input type="file" className='border w-full  border-gray-400 rounded p-3' id='image/*' multiple />
            <button className='rounded hover:shadow-lg p-3 text-green-700 border border-green-700 disabled:opacity-80' >Upload</button>
        </div>
        <hr className='bg-gray-300'/>
        <p className='text-red-700'>Here Upload any Legal documents of your property here </p>
        <div className='flex gap-4'>
            <input type="file" className='border w-full border-gray-400 rounded p-3' id='image/*' multiple />
            <button className='rounded hover:shadow-lg p-3 text-green-700 border border-green-700 disabled:opacity-80 text-white bg-green-700' >Upload </button>
        </div>
        <button className='p-3 rounded-lg bg-slate-800 text-white font-semibold uppercase hover:opacity-90 hover:shadow-lg disabled:opacity-80'>Add property</button>
        </div>
       </form>
    </main>
  )
}
