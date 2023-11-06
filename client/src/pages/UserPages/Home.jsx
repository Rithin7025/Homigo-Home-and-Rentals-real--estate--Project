import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      {/**top */}

        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect </span><br />
           place with ease</h1>
           <div className='text-gray-400 text-xs sm:text-sm'>
            Homigo helps you find the best choice with your desired budget
            <br />
            we have a wide range of properties to chose from
           </div>

           <div>
            <Link to={'/search '} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's Homigo . . .
            </Link>
           </div>
        </div>
      {/**swiper */}
      {/**listings */}
    </div>
  )
}

export default Home