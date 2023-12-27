import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Conversations({conversation,owner}) {
  console.log(conversation.unreadCount)
  const unreadCount = conversation.unreadCount;
  const [friendData,setFriendData] = useState(null)
  const {currentUser} = useSelector((state)=> state.user)
  console.log(conversation.members)
  console.log(currentUser._id)
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


  return (
    <div>
        <div className={`flex p-3 gap-3 items-center hover:bg-slate-300 bg-neutral-100 hover:cursor-pointer  border-gray-400`}>
        
        <img className='w-10 h-10 border-4 rounded-full object-cover' src={friendData?.avatar} alt="" />
       <div className='w-full justify-between flex items-center'>

        <div className='flex flex-col'>
        <span className='font-semibold text-sm'>{friendData && friendData?.userName }</span>
        <span className='text-xs text-gray-500'></span>
        </div>
        {/* {
         unreadCount > 0 && (
            <span className='text-[12px] text-white text-center h-5 flex items-center justify-center w-5  bg-green-900 rounded-full'> {unreadCount}</span>
          )
        } */}
       
       </div>

        </div>
       
      
    </div>
  )
}

export default Conversations