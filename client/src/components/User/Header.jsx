import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom' ; //to navigate route
import { useSelector } from 'react-redux';
export default function Header() {
  const  {currentUser} = useSelector((state) => state.user)


  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between max-w-6xl mx-auto p-3'>
        <Link to='/'>

        <h1 className='font-bold text-sm sm:text-xl flex'>
            <span className='text-slate-500'>Homi</span>
            <span className='text-slate-700'>go</span>
        </h1>
        </Link>

        <form className='bg-slate-100 p-2 rounded-full flex items-center'>
            <input type="text" placeholder='   search ...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
           <FaSearch className='text-slate-600 '  />
        </form>
        <ul className='flex gap-4 '>
            <Link to='/'>

            <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (<img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>) : <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>Sign in</li>
 }
            </Link>
        </ul>
        </div>
    </header>
  )
}
