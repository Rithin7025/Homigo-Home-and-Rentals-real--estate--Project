import {useState,useEffect} from 'react'
import {  useSelector } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Tokens() {
  const {currentUser} = useSelector((state) => state.user)
  const [token,setToken] = useState([]);
  


  useEffect(()=>{
    const fetchData = async() => {
        console.log(currentUser._id)
      const res = await axios.get(`/api/listing/getToken/${currentUser._id}`)
      console.log(res.data)
      setToken(res.data)
    }
    fetchData();
  },[])

  const handleClick = async(propertyId) => {
    console.log(propertyId)
  }

  return (
    <div className='h-screen'>
        <h1 className='font-semibold text-lg p-6 md:pl-15'>Your tokens : </h1>
        <div className='max-w-6xl mx-auto'>
            

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 bg-gray-400 dark:bg-gray-800">
                    Property name
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-400 ">
                    Token Id 
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-400 dark:bg-gray-800">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-400 dark:bg-gray-800">
                    Price
                </th>
            </tr>

        </thead>
        
        <tbody>
            
            {
                token && token.length > 0 && token.map((token)=> (
                     
                    <tr   className="border-b border-gray-200 dark:border-gray-700 hover:cursor-pointer hover:bg-dark">
                 <td className="px-6 py-4 bg-gray-200">
                <Link to={`/listing/${String(token.propertyId._id)}`} className="text-blue-500 hover:underline">
                    {token.propertyId.name}
                </Link>
            </td>
                <td className="px-6 py-4">
                    {token._id}
                </td>
                <td className="px-6 py-4 bg-gray-200 dark:bg-gray-800">
                    {token.propertyId.type}
                </td>
                <td className="px-6 py-4">
                    {token.totalPrice}
                </td>
                        
            </tr>
                ))
            }
          
        </tbody>
    </table>
</div>

        </div>
    </div>
  )
}
