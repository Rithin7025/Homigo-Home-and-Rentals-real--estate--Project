import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {

  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
     <form className='flex flex-col gap-4'>
      <input type="text"  placeholder='  Name' id='username' className='border rounded-lg p-3 focus:outline-none'/>
      <input type="email"  placeholder='  Email' id='email' className='border rounded-lg p-3 focus:outline-none'/>
      <input type="tel"  placeholder='  Mobile Number' id='mobile' className='border rounded-lg p-3 focus:outline-none appearance-none' />
      <input type="password"  placeholder='  Password' id='password' className='border rounded-lg p-3 focus:outline-none'/>
      <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>sign up</button>
     </form>

     <div className='flex gap-2 mt-5 ml-1'>
      <p>Already have an account?</p>
      <Link to ={'/sign-in'}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
     </div>
    </div>
  )
}

export default SignUp