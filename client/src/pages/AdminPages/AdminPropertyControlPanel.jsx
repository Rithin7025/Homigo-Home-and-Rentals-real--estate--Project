import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper,SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'

function AdminPropertyControlPanel() {
    const {propertyId} = useParams()
    const [property,setProperty] = useState(null)
    const [user,setUser] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    SwiperCore.use([Navigation])


    useEffect(()=>{
        const fetchProperty = async()=>{
           try{
            setLoading(true)
            const res = await axios.get(`/api/listing/getUserListing/${propertyId}`)
            if(res){
            const fetchUser = async()=>{
                    const res = await axios.get(`/api/user/getUser/${property.userRef}`)
                    console.log(res.data)
                    setUser(res.data)
                    
                }
                fetchUser()
            }

            
            setLoading(false)
           }catch(error){
            setLoading(false)
            console.log(error)
           }
        }
        fetchProperty();


    },[])

    //to find user 

    
  return (
    <div>
        <div className='flex items-center '>
        <Link to={'/admin/listings'}>
        <h1 className='mt-2 ml-6 text-base font-semibold text-slate-700 hover:text-slate-700'>listings</h1>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mt-3 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
</svg>
 

        <h1 className='mt-3 ml-2 text-base text-slate-400 font-semibold'>Property Management page </h1>

        </div>
         {
            property && !error && !loading && (
                <>
        <div className='flex'>
        {/**left side div */}
        <div className='w-[700px] flex h-[250px] mt-4   ml-6'>
            {/**left side main div */}
            <div className='w-8/12 h-full'>
                <Swiper navigation>
                {
                    property.imageUrls.map((image)=>(
                        console.log(image),
                        <SwiperSlide key={image} >
                            <div className='h-[250px]' style={{background : `url(${image}) center  no-repeat`,backgroundSize : 'cover'}}>
                            
                            </div>
                        </SwiperSlide>
                    ))
                }

                </Swiper>
                

            </div>

            <div className= 'w-4/12 h-full flex flex-col ml-5'>
                    {/**top div */}
                    <div className=' h-1/2 '>
                        <img src={property.imageUrls[1]} alt="no image"  className='h-[120px] w-full rounded-lg border border-blue-400'/>

                    </div>
                    {/**botto, div */}
                    <div className=' h-1/2 '>
                    <img src={property.imageUrls[2]} alt="no image"  className='rounded-lg border border-blue-400 h-[120px] mt-1 w-full'/>

                    </div>
            </div>

        </div>
        {/**right div */}
        <div className='w-[340px] bg-green-800 h-[250px] mt-6 ml-10 flex flex-col'>
            {/**top div */}
            <div className='h-1/2 bg-blue-600 w-full'>

            </div>
            {/**bottom div */}
            <div className=' h-1/2 bg-red-600 w-full'>

            </div>
        <div>

        </div>
         
        </div>
    </div>
        <div className=' h-[210px]  flex mt-4 ml-6'>
            {/**left div */}
            <div className=' h-full   w-[700px] flex flex-col'>

                
                <div className='h-full  w-full'>
                <div className='sm:flex-row md:flex justify-between'>
      
          <div className='flex flex-col  h-[180px] sm:w-full  gap-3'>
            <p className='text-xl font-semibold'>
            {property.name} -₹{' '}
            {property.offer
                ? property.discountedPrice.toLocaleString('en-US')
                : property.regularPrice.toLocaleString('en-US')}
              {property.type === 'rent' && ' / month'}
                </p>
          
              <p className='flex  items-center  text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
            {property.district}     ,    {property.city}    , {property.address}
              </p>

                <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[130px] text-white text-center p-1 rounded-md'>
                {property.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p> 
              {property.offer && (
                <p className='bg-green-900 w-full max-w-[130px] text-white text-center p-1 rounded-md'>
                  ₹{+property.regularPrice - +property.discountedPrice} OFF
                </p>
              )}
            </div>
          <p className='text-slate-600 text-sm'>
            <span className='font-semibold text-black'>Description - {' '}</span>
            {property.description}
          </p>
          <ul className='text-green-900 font-semibold text-sm gap-4 sm:gap-6 flex flex-wrap items-center'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {property.bedrooms > 1 ? `${property.bedrooms} beds` : `${property.bedrooms}bed`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaBath className='text-lg'/>
                {property.bathrooms > 1 ? `${property.bedrooms} baths` : `${property.bathrooms}bath`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaParking className='text-lg'/>
                {property.parking  ? `Parking spot` : `No parking`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm'>
                <FaChair className='text-lg'/>
                {property.furnished  ? `Furnished` : `Not furnished`}
            </li>
          </ul>
          
       
        
          </div>
         
</div>
                </div>











                <div>

                </div>
                

            </div>


            {/**right div */}
            <div className=' h-full w-[410px] bg-blue-600 '>


               </div>
             
        </div>
        </>
            )
         }
    </div>
  )
}

export default AdminPropertyControlPanel