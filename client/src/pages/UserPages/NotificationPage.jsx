import React from 'react'
import verifyIcon from '../../assets/icons/correct.png'
import { Link } from 'react-router-dom'

function NotificationPage() {
  return (
    <div className='max-w-2xl mx-auto'>
       
        <h1 className='p-5 text-center my-4 font-bold text-3xl text-slate-900'>Homi<span className='text-slate-700'>go</span> </h1>
            <div className='bg-slate-3  00 h-7 w-full' ></div>
           <div className='bg-white h-80 w-auto rounded-lg flex flex-col justify-center items-center shadow-2xl'>
            <div className=''>

                 <h1 className='text-lg text-center font-bold p-5 font-serif'>Notification : </h1>
                 <img src={verifyIcon} className='h-7 w-7 mx-auto' alt="notify" />
            </div>

                 <p className='mt-8 text-lg text-center font-medium'>Congrats Your Submission has been recorded</p>
                 <p className='mt-8 text-center text-xs text-slate-800'>(your property will be listed once oru team verfies it , it usually takes 2 to 3 days)</p>
                 <Link to={'/'}>
                 <button type="button" className= " my-10 ml-2 text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Let's homigo.. </button>
                 </Link>
           </div>
         </div>
      
  )
}

export default NotificationPage