import React, { useEffect, useState } from 'react'
import {KeyboardArrowUp} from '@mui/icons-material'
import {Person3Outlined} from '@mui/icons-material'
import {MoneySharp} from '@mui/icons-material'
import {AttachMoneyRounded} from '@mui/icons-material'
import {useSelector} from 'react-redux'

import {House} from '@mui/icons-material'
import { Link } from 'react-router-dom';
import axios from 'axios'

function Widget({ type }) {
  const {admin} = useSelector((admin) => admin)
  console.log(admin)
  const [listing, setListing] = useState(null)
  const [users, setUsers] = useState(null)
  const [Rent, setRent] = useState(null)
  const [sale, setSale] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [amount, setAmount] = useState(null)
  const [error,setError] = useState(false)

  let data ; 
  //to fetch listings
    useEffect(()=>{
      const fetchListings = async()=>{
        try {
          const res = await axios.get('/api/listing/getEveryListings')
          if(res){
            setListing(res.data.length)
            console.log(listing)
          }
        } catch (error) {
          console.log(error)
        }

      }
      fetchListings()
    },[admin])
    // to fetch users
    useEffect(()=>{
      const fetchUsers = async()=>{
        try {
          const response = await axios.get('/api/admin/listUsers')
          if(response){
            setUsers(response.data.length)
            console.log(users)
          }
        } catch (error) {
          console.log(error)
        }

      }
      fetchUsers()
    },[admin])

    //to fetch total rent
    useEffect(()=>{
      const fetchRent = async()=>{
        try {
          const response = await axios.get('/api/listing/getRentListings')
          if(response){
            setRent(response.data.length)
            console.log(Rent)
          }
        } catch (error) {
          console.log(error)
          if(error){
            
          }
        }

      }
      fetchRent()
    },[admin])

    //to fetch total Sale
    useEffect(()=>{
      const fetchSales = async()=>{
        try {
          const response = await axios.get('/api/listing/getSaleListings')
          if(response){
            setSale(response.data.length)

          }
        } catch (error) {
          console.log(error)
          if(error){
            
          }
        }

      }
      fetchSales()
    },[admin])

    //to fetch total amount and transactions
    
    useEffect(()=>{
      const fetchTransactionsAndAmount = async()=>{
       try {
        const res = await axios.get('/api/token/getTransationAmountAndToken')
        console.log(res.data)
        if(res){
          setTransactions(res.data.length)
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
        setAmount(totalAmount)
      }



      fetchTransactionsAndAmount()


      


       
    
    },[admin])




  //switch case to define different data according to the props
  switch (type){
    case 'users' : 
    data = {
      title : "Users",
      linkPath : '/admin/usersList',
      link : "see all users",
      listing : false,
      sale : false,
      users,
      transaction : false,
      icon : (   <Person3Outlined className='ml-7 bg-blue-400 text-blue-900 rounded-lg'/>
      )
    }
    break;
    case 'Listings' : 
    data = {
      title : "Listings",
      link : 'see all listings',
      linkPath : '/admin/listings',
      listing,
     
     sale : false,
      users : false,
      transaction : false,
      icon : (   <House className='ml-7 bg-yellow-500 text-orange-900 rounded-lg'/>
      )
    }
    break;
    case 'sale' : 
    data = {
      title : "Sales",
      link : false,
      listing : false,
      users : false,
      sale : {
        rent : Rent,
        sales : sale
      },
      transaction : false,
      icon : (   <AttachMoneyRounded className='ml-7 bg-green-300 text-green-800 rounded-lg'/>
      )
    }
    break;
    case 'transactions' : 
    data = {
      title : "Token Transactions",
      linkPath : '#endOfDiv',
      link : false,
      listing : false,
      sale : false,
      users : false,
      transaction : {
        transactions,
        amount
      },
      icon : (   <MoneySharp className='ml-7 bg-orange-300 text-orange-800 rounded-lg'/>
      )
    }
    break;
  }

 


  return (
    <div className='flex w-[250px]  border-l-green-400 border-4  bg-gray-200 h-[120px] justify-between shadow-xl p-2 hover:bg-white'>
        <div className="flex flex-col justify-between">
            <span className='text-lg font-semibold text-gray-500'>{data?.title}</span>
            {
              data?.listing && (

                <p className='text-sm font-semibold'>{data.listing && data.listing}</p>
              )
            }
            {
              data?.users && (

                <p className='text-sm font-semibold'>{data.users && data.users}</p>
              )
            }
            {
              data?.sale && (
                <>
                <p className='text-sm font-semibold'>For Rent : {data.sale.rent && data.sale.rent}</p>
                <p className='text-sm font-semibold'>For Sale : {data.sale.sales && data.sale.sales}</p>
                </>
              )
            }
            {
              data?.transaction && (
                <>
              
                <p className='text-sm font-semibold'>Token Transactions : {data?.transaction && data?.transaction.transactions}</p>
                <p className='text-sm font-semibold'>Total Amount  : {data?.transaction && data?.transaction.amount}</p>
                </>
              )
            }

            {
              data?.link && (
                <Link to={data?.linkPath} className='text-green-600 text-xs   font-semibold cursor-pointer hover:text-purple-400 underline '>
                  {data?.link}
                </Link>
              )
            }
            <span className=''></span>
        </div>
        <div className="flex flex-col justify-between">
            <div className="">

            <KeyboardArrowUp className=' bg-emerald-500' />
            
            <span className='text-green-600'> 20%</span>  
            </div>
            <div className="">
            {/* <Person3Outlined className='ml-7 bg-blue-500 rounded-lg'/> */}
            {
              data.icon
            }
            </div>
        </div>
    </div>
  )
}

export default Widget