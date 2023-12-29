import { MoreVert } from '@mui/icons-material'

import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Featured() {
    const percentage = 56;

  return (

    <div className='w-5/12 bg-gray-100 gap-2 shadow-xl'>
        <div className="flex justify-between p-2">
            <h1 className='font-semibold text-lg p-2 text-center text-slate-600'>Total Revenue of This Month</h1>
            <MoreVert className='text-slate-600'/> 
        </div>
 <div className="flex flex-col  justify-center items-center ">
            <div className='w-[340px] flex gap-4'>
                
<CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '22px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}
/>
<CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '22px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}
/>
            </div>
            <p className='font-semibold text-slate-400'></p>
            <p className='text-[30px] font-bold mb-2'>$ 450</p>

            < div className='mx-auto items-center justify-center w-4/6 '>

            <p className='text-center text-gray-500 mb-8 '>previous transactions in processing 
              Last payments May not be included </p>
            </div>

            <div className='flex w-full justify-between px-6 py-4 '>
                <div className='flex flex-col items-center'>
                    <p className='font-semibold text-slate-700'>Today</p>
                    <p className='text-green-700 font-bold'>$ 450</p>
                    
                </div>  
                <div className='flex flex-col items-center'>
                    <p className='font-semibold text-slate-700'>Last week</p>
                    <p className='text-red-700 font-bold'>$ 450</p>

                </div>
                <div className='flex flex-col items-center text-slate-700'>
                    <p className='font-semibold'>Last month</p>
                    <p className='text-blue-900 font-bold'>$ 450</p>

                </div>
               
            </div>
            
        </div>
    </div>
  )
}

export default Featured