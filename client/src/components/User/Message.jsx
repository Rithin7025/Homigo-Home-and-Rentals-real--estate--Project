import React from 'react'
import doubleCheck from '../../assets/icons/double-check.png'
import {format} from 'timeago.js'



function Message({message,isOwn}) {
    const containerClasses = isOwn ? 'flex justify-end' : 'flex justify-start';
    const messageClasses = `bg-gray-300 max-w-lg p-2 ml-3 mt-3 rounded-lg  ${isOwn ? 'bg-green-300' : 'bg-blue-300'}`;
  return (
    <div className={containerClasses}>
     <div className={messageClasses}>
        <p className='mr-2 ml-2 '> {message?.text}</p>
       <div className='flex'>

        <span className='text-[10px] ml-auto mr-2'>{format(message?.createdAt)}</span>
       <img src={doubleCheck}  className='h-3 w-3'/>
        
        </div> 
     </div>
    </div>
  )
}

export default Message