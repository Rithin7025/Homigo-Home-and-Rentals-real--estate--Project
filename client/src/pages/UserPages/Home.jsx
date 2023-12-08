import axios from 'axios';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../../components/User/ListingItem'
function Home() {
  const [offerListings,setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);
  SwiperCore.use([Navigation])
  console.log(offerListings)

  useEffect(()=>{
    const fetchOfferListings =async () => {
      try {
        const res = await axios.get('/api/listing/getlistings?offer=true&limit=3')
        console.log(res)
        console.log(res.data.length)
        setOfferListings(res.data)
        fetchRentListings()
        
      } catch (error) {
        console.log(error)
      }
    } 

    const fetchRentListings = async() => {
     try {
      const res = await axios.get('/api/listing/getlistings?type=rent&limit=3')
      console.log(res.data)
      console.log(res.data.length)
      setRentListings(res.data)
      fetchSaleListings()
     } catch (error) {
      console.log(error)
     }
    }

    const fetchSaleListings = async()=> {
    try {
      const res= await axios.get('/api/listing/getlistings?type=sale&limit=3');
      console.log(res.data)
      console.log(res.data.length)
    setSaleListings(res.data)
    } catch (error) {
      console.log(error)
    }
  }

    fetchOfferListings() 
    console.log(offerListings,'this was offer--------------------',rentListings,'this was ren-----------------',saleListings,'this was salw-------------------------')
  },[])
  return (
    <div>
      {/**top */}

        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
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
      <Swiper navigation>
        
      {
        offerListings && offerListings.length > 0 && (
          offerListings.map((listing)=>(
            <SwiperSlide>

              <div style={{background : `url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:"cover"}} className='h-[500px]' key={listing._id}>

              </div>
            </SwiperSlide>
          ))
        )
      }
      </Swiper>
      

      {/**listing for offer,rent and sale*/}
      <div className=" max-w-6xl mx-auto p-3 flex flex-col gap-10 my-10 ">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-700 font-semibold'>Recent Offers</h2>
                <Link className='text-sm text-blue-700 hover:underline' to={`/search?offer=true`}>
                  show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {
                  offerListings.map((listing)=> (
                     <ListingItem  listing={listing} key={listing._id}/>
                  ))  
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-700 font-semibold'>Recent places for sale</h2>
                <Link className='text-sm text-blue-700 hover:underline' to={`/search?type=sale`}>
                  show more 
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {
                  saleListings.map((listing)=> (
                     <ListingItem  listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-700 font-semibold'>Recent places for rent</h2>
                <Link className='text-sm text-blue-700 hover:underline' to={`/search?type=rent`}>
                  show more 
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">

                {
                 rentListings.map((listing)=> (
                     <ListingItem  listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home