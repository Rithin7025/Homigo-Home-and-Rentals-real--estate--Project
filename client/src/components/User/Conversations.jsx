import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Conversations({conversation}) {

const [friendData,setFriendData] = useState(null)
const {currentUser} = useSelector((state)=> state.user)



useEffect(()=>{
  console.log(conversation)
  const friendId = conversation.members.find((user)=> user  !== currentUser._id )
  console.log(currentUser._id)
  console.log(friendId)
  const fetchfriendData = async() => {
     const res = await axios.get(`/api/user/getUser/${friendId}`)
     if(res){
       setFriendData(res.data)
       console.log(res.data)
        console.log(friendData)
     }
  }
  fetchfriendData()

},[currentUser])
  return (
    <div>
        <div className="flex p-3 gap-3 items-center hover:bg-slate-300 bg-neutral-100  hover:cursor-pointer  border-gray-400">
        
        <img className='w-10 h-10 border-4 rounded-full object-cover' src={friendData?.avatar} alt="" />
       <div className='w-full justify-between flex items-center'>

        <div className='flex flex-col'>
        <span className='font-semibold text-sm'>{friendData && friendData?.userName }</span>
        <span className='text-xs text-gray-500'>message</span>
        </div>
        
        <span className='text-xs text-gray-500 mr-3'>8 : 30 AM </span>
       </div>

        </div>
       
      
    </div>
  )
}

export default Conversations