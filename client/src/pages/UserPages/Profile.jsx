import React from 'react'
import {useSelector} from 'react-redux'

function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
       <img className='mt-2 self-center rounded-full h-24 w-24 object-cover hover:cursor-pointer' src={currentUser.avatar} alt="#file" />
        <input type="text" placeholder='username' id='username' className='rounded-lg border p-3'/>
        <input type="email" placeholder='email' id='email' className='rounded-lg border p-3'/>
        <button className='bg-green-700 text-white uppercase p-3 font-semibold  rounded-lg'>Update</button>
        <button className='bg-gray-800 text-white uppercase p-3 font-semibold  rounded-lg'>Create listing</button>
      </form>
      <div className='py-5 flex justify-between'>
        <span className='text-red-700 font-medium '>Delete Account ?  </span>
        <span className='text-red-700 font-medium'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile