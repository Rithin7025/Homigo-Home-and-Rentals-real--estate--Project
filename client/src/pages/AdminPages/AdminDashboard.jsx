import {useState,useEffect} from 'react'
import Widget from '../../components/admin/Widget'
import Featured from '../../components/admin/Featured'
import Charts from '../../components/admin/Charts'
import { useSelector } from 'react-redux';
import axios from 'axios'

function AdminDashboard() {
    const [transaction,setTransaction] = useState(null);

    const {admin} = useSelector((admin) => admin)
    console.log(admin)



    useEffect(()=>{
        const fetchTransactionsAndAmount = async()=>{
         try {
          const res = await axios.get('/api/token/getTransationAmountAndToken')
          console.log(res.data)
          console.log('------------------------------')
          if(res){
            setTransaction(res.data)
            console.log(transaction)
          }
         } catch (error) {
            console.log(error)
         }
        }
  
        fetchTransactionsAndAmount()
  
      },[])

     

  return (
    <div className='overflow-scroll h-screen'>
      <div className="flex gap-5 p-3 flex-wrap justify-between  ">

      <Widget type='users'/>
      <Widget type='Listings'/>
      <Widget type='sale'/>
      <Widget type='transactions'/>
      </div>
      {/**charts */}
      <div className='flex flex-1 w-full gap-4 overflow-y-auto '>
      <Featured/>
      <Charts/> 
      </div>
      {/**div after both charts */}
      <div>
       <h1 className=' p-3 mt-3 mb-3 font-bold  bg-zinc-300'>Latest Transactions : </h1>
        
          
       

<div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 h-[500px] overflow-scroll overflow-y-hidden">
    <table className="w-full text-sm text-left  rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-100  uppercase bg-black dark:bg-gray-700 dark:text-gray-10">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Token id
                </th>
                <th scope="col" className="px-6 py-3">
                    Property name
                </th>
                <th scope="col" className="px-6 py-3">
                    Buyer Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Seller Name
                </th>
                <th scope="col" className="px-6 py-3">
                   Price
                </th>
            </tr>
        </thead>
        <tbody>

            {
                transaction &&  transaction.map((item)=>(
                    
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item && item?._id}
                </th>
                <td className="px-6 py-4">
                    {item && item?.propertyId?.name}
                </td>
                <td className="px-6 py-4">
                {item && item?.buyerUserId?.userName}
                </td>
                <td className="px-6 py-4">
                {item && item?.sellerUserId?.userName}
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">₹ {item && item?.totalPrice}</a>
                </td>
            </tr>
                )
            
                )
            }
           
           
        </tbody>
    </table>
</div>

      </div>
    </div>
  )
}

export default AdminDashboard