import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import {useSelector} from 'react-redux'
import ContactLandLord from '../../components/User/ContactLandLord'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
 
export default function ListingPage() {
  const {currentUser}  = useSelector((state) => state.user);
  const [contact,setContact] = useState(false)
    SwiperCore.use([Navigation])
    const params = useParams();
    const listingId = params.listingId;
    const [copied, setCopied] = useState(false);
 
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
            
            setLoading(true)
            const res = await axios.get(`/api/listing/getListing/${listingId}`)
            console.log(res.data)
  
            
            const data = res.data
            setListing(data)
            setLoading(false)   
            setError(false)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        } 
        fetchData()
    },[listingId])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}    
        {error && <p>Something went wrong!!</p>}

        {listing && !loading && !error && (
            <div>

            <Swiper navigation>
                {
                    listing.imageUrls.map((url)=> (
                        <SwiperSlide  key={url}>
                            <div className='h-[450px]' style={{background : `url(${url}) center no-repeat`,backgroundSize : 'cover'}}>

                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000)
              }}
            />
          </div>

          {/**some content here */}
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
            {listing.name} -₹{' '}
            {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
                </p>
                <p className='flex  items-center mt-6 gap-2 text-slate-600 text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
              {listing.district}         {listing.city}     {listing.address}
                </p>
                <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ₹{+listing.regularPrice - +listing.discountedPrice} OFF
                </p>
              )}
            </div>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description - {' '}</span>

            {listing.description}
          </p>
          <ul className='text-green-900 font-semibold text-sm gap-4 sm:gap-6 flex flex-wrap items-center'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms}bed`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaBath className='text-lg'/>
                {listing.bathrooms > 1 ? `${listing.bedrooms} baths` : `${listing.bathrooms}bath`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaParking className='text-lg'/>
                {listing.parking  ? `Parking spot` : `No parking`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaChair className='text-lg'/>
                {listing.furnished  ? `Furnished` : `Not furnished`}
            </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact && (          <button onClick={()=> setContact(true)} className='p-3 bg-slate-700 uppercase font-semibold  rounded-lg text-white hover:opacity-90'>contact landlord</button>)}
          {contact && (<ContactLandLord listing={listing}/>)}
          </div>
        </div>
            
        )}

        </main>
  )
}
