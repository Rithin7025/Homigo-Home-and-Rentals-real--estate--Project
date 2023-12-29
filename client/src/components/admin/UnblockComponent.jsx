import {useState} from 'react'
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';


function unBlockComponent({property,propertyId}) {

    const [load,setLoad] = useState(false)
    console.log(property)
    console.log(propertyId)

    const handleBlockPropertyClick = async() =>{
        console.log('clicked')
        try {
          
  
            const res = await axios.patch(`/api/listing/blockProperty/${propertyId}`)
            setLoad(prev=> !prev)
            setError(null)
  
         
        } catch (error) {
          if(error.response.status === 401){
            setError('no valid id')
          }else{
            setError(error.message)
          }
          
        }
  
      }
  return (
    <div>
          <div className=' h-[120px] border border-red-600 rounded-lg mt-1 border-l-4 w-full'>
              <div className='flex'>
                <p className='text-gray-500 p-3 text-sm'>property id: </p>
                <p className=' pr-3 pt-3 font-mono text-sm'>{property._id} </p>
              </div>
              <div className='flex'>
                <p className='text-gray-500 text-sm pl-3'>Created at  : </p>
                <p className=' pl-3 pr-3 font-mono text-sm'>{format(property.createdAt)} </p>
              </div>

              <div className='flex justify-center'>
                <p></p>
                {
                  property.isBlocked ? (<button className='p-2  text-white font-semibold uppercase rounded-xl w-[180px] h-9 mt-2 flex items-center justify-center bg-green-700 hover:bg-green-950 transition ease-in-out delay-150 hover:scale-105 duration-300 shadow-xl'>Unblock property</button>) : (<button onClick={handleBlockPropertyClick} className='p-2 ml-4 text-white font-semibold uppercase rounded-xl w-[180px] h-9 mt-2 flex items-center justify-center bg-red-700 hover:bg-red-600 transition ease-in-out delay-150 hover:scale-105 duration-300 shadow-xl'> Block property</button>)
                }         
              </div>
              
              
            </div>
    </div>
  )
}

export default unBlockComponent