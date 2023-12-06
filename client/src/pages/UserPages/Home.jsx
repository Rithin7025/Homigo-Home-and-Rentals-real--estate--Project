import axios from 'axios';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'

function Home() {
  const [offerListings,setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);

  useEffect(()=>{
    const fetchOfferListings =async () => {
      try {
        const res = await axios.get('/api/listing/getlistings?offer=true&limit=4');
        console.log(res.data.length)
        setOfferListings(res.data)
        fetchRentListings()
        
      } catch (error) {
        console.log(error)
      }
    } 

    const fetchRentListings = async() => {
     try {
      const res = await axios.get('/api/listing/getlistings?type=rent&limit=4')
      setRentListings(res.data)
      fetchSaleListings()
     } catch (error) {
      
     }
    }

    const fetchSaleListings = async()=> {
    try {
      const res= await axios.get('/api/listing/getlistings?type=sale&limit=4');
    setSaleListings(res.data)
    } catch (error) {
      
    }
  }

    fetchOfferListings() 
    console.log(offerListings,'this was offer--------------------',rentListings,'this was ren-----------------',saleListings,'this was salw-------------------------')
  },[])
  return (
    <div>
      {/**top */}

        <div className='flex flex-col h-screen gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect </span><br />
           place with ease</h1>
           <div className='text-gray-400 text-xs sm:text-sm'>
            Homigo helps you find the best choice with your desired budget
            <br />
            we have a wide range of properties to chose from
           </div>

           <div>
            <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's Homigo . . .
            </Link>
           </div>
        </div>
      {/**swiper */}
      <Swiper>
        
      </Swiper>
      

      {/**listings */}
    </div>
  )
}

export default Home