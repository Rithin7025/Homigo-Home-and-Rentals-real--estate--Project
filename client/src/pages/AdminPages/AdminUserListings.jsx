import {useState,useEffect} from 'react'
import axios from 'axios'

export default function AdminUserListings() {

  const [userListing,setUserListing] = useState([]);
  const [load,setLoad] = useState(false)

  useEffect(()=>{
    const fetchData = async() => {
        
      const res = await axios.get('/api/admin/listUsers');
      setUserListing(res.data);
    }
    fetchData();
  },[load])

  const handleBlockUser = async(userId) => {

    try {
        console.log(userId)
        const res = await axios.post(`/api/admin/blockUser/${userId}`);
        console.log(res.data)
        setLoad(prev => !prev)
        
    } catch (error) { 
        
    }
  }

  const handleUnblockUser = async(userId) => { 
    
    try {
        const res = await axios.post(`/api/admin/unblockUser/${userId}`);
        console.log(res.data)
        setLoad(prev => !prev)

    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{

  },[load])

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className= " bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3 text-justify text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
            </th>
           
            <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {
          userListing.map((user) => (
            <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex  items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
            </td>
          
            <td className="px-6 py-4  whitespace-nowrap">

              {
                user.isVerified ? (  <span className="ml-9 px-4 py-2 items-center inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                verified
            </span>) : ( <span className="px-4 py-2 items-center inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">
                    unverified
                </span>)
              }
              
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.phone ? user.phone  : 'not provided'}  
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">

               {
                user.isBlocked ? (<button onClick={() => handleUnblockUser(user._id)} className="ml-2 text-red-600 hover:text-red-900">unblock</button>
                ) : (           <button onClick={()=>handleBlockUser(user._id)} className="text-indigo-600 hover:text-indigo-900 ">block</button>        
                )
               }

            </td>
        </tr>
          ))
        }
    </tbody>
</table>
    </div>
  )
}
