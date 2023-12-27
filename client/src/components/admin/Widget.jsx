import React from 'react'
import {KeyboardArrowUp} from '@mui/icons-material'
import {Person3Outlined} from '@mui/icons-material'

function Widget() {
  return (
    <div className='flex w-[250px]  border-l-green-400 border-4  bg-gray-200 h-[120px] justify-between shadow-xl p-2 hover:bg-white'>
        <div className="flex flex-col justify-between">
            <span className='text-lg font-semibold text-gray-500'>Users</span>
            <p className='text-sm font-semibold'>21212</p>
            <span className='text-green-600 text-xs   font-semibold cursor-pointer hover:text-purple-400 underline '>see all users</span>
        </div>
        <div className="flex flex-col justify-between">
            <div className="">

            <KeyboardArrowUp className=' bg-emerald-500' />
            
            <span className='text-green-600'> 20%</span>  
            </div>
            <div className="">
            <Person3Outlined className='ml-7 bg-blue-500 rounded-lg'/>
            </div>
        </div>
    </div>
  )
}

export default Widget