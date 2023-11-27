import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function AdminHeader() {
  return (
    <div className='bg-neutral-200  h-16  px-6 flex justify-between items-center' >
        <div className='relative'>
             <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2  -translate-y-1/2 ml-2 left-3'/>
            <input type="text" placeholder='Search'  className='text-sm px-4 pl-11 pr-7 focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-200 rounded-full'/>
        </div>
        <div>buttons</div>
    </div>
  )
}
