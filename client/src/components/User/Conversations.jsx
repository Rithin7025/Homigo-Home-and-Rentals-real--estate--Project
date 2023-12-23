import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Conversations({conversation,owner}) {
 
const [friendData,setFriendData] = useState(null)
const {currentUser} = useSelector((state)=> state.user)
const ownerId = owner
const [backgroundColor,setBackgroundColor]= useState('')





useEffect(()=>{
  console.log(conversation)
  const friendId = conversation.members.find((user)=> user  !== currentUser._id )
  console.log(friendId)
  console.log(ownerId)
  const fetchfriendData = async() => {
     const res = await axios.get(`/api/user/getUser/${friendId}`)

     if(res){
       setFriendData(res.data)
       console.log(res.data)
        console.log(friendData)
        const color = ownerId == friendId ? 'bg-slate-300' : 'bg-neutral-100'
        setBackgroundColor(color)
     }
  }
  fetchfriendData()

},[currentUser])


console.log(backgroundColor)
  return (
    <div>
        <div className={`flex p-3 gap-3 items-center hover:bg-slate-300 bg-neutral-100 hover:cursor-pointer  border-gray-400`}>
        
        <img className='w-10 h-10 border-4 rounded-full object-cover' src={friendData?.avatar} alt="" />
       <div className='w-full justify-between flex items-center'>

        <div className='flex flex-col'>
        <span className='font-semibold text-sm'>{friendData && friendData?.userName }</span>
        <span className='text-xs text-gray-500'></span>
        </div>
        
        <span className='text-xs text-gray-500 mr-3'> </span>
       
       </div>

        </div>
       
      
    </div>
  )
}

export default Conversations