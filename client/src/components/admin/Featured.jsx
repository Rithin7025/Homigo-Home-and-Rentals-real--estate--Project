import { MoreVert } from '@mui/icons-material'
import {useEffect, useState} from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
import { useSelector } from 'react-redux';

function Featured() {

    const [rentPercentage ,setRentPercentage] = useState(0);

    const [salePercentage ,setSalePercentage] = useState(0);

    const [totalAmount,setTotalAmount] = useState(null);

    const [todaySaleAmount ,setTodaySaleAmount] = useState(null)

    const {admin} = useSelector((admin)=> admin)

   

    useEffect(()=>{
      const fetchSalesOfThisMonthRent = async()=>{
        try {
          const res = await axios.get('/api/token/getSalesOfTokenThisMonth');
          console.log(res.data)
          setRentPercentage(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchSalesOfThisMonthRent()
    },[])

    useEffect(()=>{
      const fetchTransactionsAndAmount = async()=>{
       try {
        const res = await axios.get('/api/token/getTransationAmountAndToken')
        console.log(res.data)
        if(res){
          
          processTransactions(res.data)
          
        }

        
       } catch (error) {
        console.log(error)
       }
      }

      const processTransactions = (transactionsData)=>{
        console.log(transactionsData)
        const totalAmount = transactionsData.reduce((sum, transaction) => sum + transaction.totalPrice,0)
        console.log(totalAmount)
        setTotalAmount(totalAmount)
      }



      fetchTransactionsAndAmount()


      


       
    
    },[admin])


    //to find the total sale in this month 

    useEffect(()=>{ 
     try {
      const fetchTotalSalesInThisMonth = async()=>{
        const res = await axios.get('/api/token/getTotalSalesInThisMonth')
        console.log(res.data)
        setTotalAmount(res.data.totalSales)
       
      }

      fetchTotalSalesInThisMonth()
     } catch (error) {
      console.log(error)
     }
    },[admin])

    //to find the total sale today
    useEffect(()=>{
      const fetchTodaySales = async() => {
        try {
          console.log('----------------')
          const res = await axios.get('/api/token/getTodaySales')
          console.log(res.data[0]?.totalSales)

          if(res){
            setTodaySaleAmount(res.data[0]?.totalSales)
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchTodaySales()
    },[admin])

    const RentPercentage = 56;
    const SalePercentage = 46;

  return (

    <div className='w-5/12 bg-gray-100 gap-2 shadow-xl'>
        <div className="flex justify-between p-2 items-center ">
            <h1 className='font-semibold text-lg p-2 text-center text-slate-600 '>Total Revenue of This Month</h1>
            <MoreVert className='text-slate-600'/>   
        </div>
 <div className="flex flex-col  justify-center items-center ">
            <div className='w-[320px] flex flex-col gap-4'>
              <div className='flex justify-between'>

              <h1 className='font-semibold underline pl-12 '>Rent</h1>
              <h1 className='pr-14 font-semibold underline '>Sale</h1>
                
              </div> 
              <div className='flex gap-10'>

<CircularProgressbar
  value={RentPercentage}
  text={`${RentPercentage}%`}
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
    pathColor: `rgba(62, 152, 199, ${RentPercentage / 100})`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
    

  })}
/>
<CircularProgressbar
  value={SalePercentage}
  text={`${SalePercentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '22px',

    // How long animation takes to go from one SalePercentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(62, 152, 199, ${SalePercentage / 100})`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}
/>
              </div>
            </div>
            <p className='font-semibold text-slate-400'></p>
            <p className='text-[30px] font-bold mb-2'>₹{totalAmount && totalAmount} </p>

            < div className='mx-auto items-center justify-center w-4/6 '>

            <p className='text-center text-gray-500 mb-8 '>previous transactions in processing 
              Last payments May not be included </p>
            </div>

            <div className='flex w-full justify-between px-6 py-4 '>
                <div className='flex flex-col items-center'>
                    <p className='font-semibold text-slate-700'>Today</p>
                    <p className='text-green-700 font-bold'>₹ {todaySaleAmount && todaySaleAmount}</p>
                    
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