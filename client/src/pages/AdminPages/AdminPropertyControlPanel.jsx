import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper,SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import Leaflet from "../../components/User/Leaflet.jsx";
import { format, render, cancel, register } from 'timeago.js';



function AdminPropertyControlPanel() {
    const {propertyId} = useParams()
    const [property,setProperty] = useState(null)
    const [user,setUser] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const [load,setLoad] = useState(false)
    SwiperCore.use([Navigation])
    

    const handleBlockPropertyClick = async() =>{
      console.log('clicked')
      try {
        if(propertyId){
          setLoading(true)
          const res = await axios.patch(`/api/listing/blockProperty/${propertyId}`) 
          setLoad(prev=> !prev)
          setError(null)
          setLoading(false)
        }
      } catch (error) {
        if(error.response.status === 401){
          setError('no valid id')
        }else{
          setError(error.message)
        }
        
      }

    }
    
    const handleUnblockPropertyClick = async() =>{
      console.log('clicked')
      try {
        
        if(propertyId){
          setLoading(true)
          const res = await axios.patch(`/api/listing/unblockProperty/${propertyId}`) 
          setLoad(prev=> !prev)
          setError(null)
          setLoading(false)
        }
      } catch (error) {
        if(error.response.status === 401){
          setError('no valid id')
        }else{
          setError(error.message)
        }
        
      }

    }
    

    useEffect(() => {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/listing/getUserListing/${propertyId}`);
          if (res && res.data) {
            setProperty(res.data);
    
            // Check if property.userRef is available before calling fetchUser
            if (res.data.userRef) {
              await fetchUser(res.data.userRef);
            }
          }
          setError(null)
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
    
      const fetchUser = async (userRef) => {
        try {
          const userRes = await axios.get(`/api/user/getUser/${userRef}`);
          console.log(userRes.data);
          setUser(userRes.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchProperty();
    }, [propertyId,load]);
    
    
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
          error && (
            <div className='flex items-center justify-center w-full'>
         

              <h1 className='text-center gap-2 bg-red-700 p-3 pl-9 w-[200px] flex text-white font-semibold rounded-lg'>     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>no valid id</h1>
            </div>

          )
        }

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
        <div className='w-[340px]  h-[250px] mt-6 ml-10 flex flex-col '>
            {/**top div */}
            <div className='h-1/2 border rounded-lg border-l-4 bg-slate-300 border-blue-600 w-full flex items-center p-3 gap-3'>

            {
              user && !loading && (
                <>
                
                  {/**left */}
                  <div className=' h-[110px] w-[110px]'>
                   <img src={user.avatar} alt="" className='h-full w-full rounded-full'/>
                  </div>
                  {/**right div */}
                  <div className='0 w-[190px] h-full '>
                    {/**top div in right div */}
                    <div className=' h-1/2 w-full '>
                      <p className='font-semibold underline pb-1 text-white uppercase'>Owner info</p>
                      <div className='flex mb-1'>
                      <p className=' text-slate-600 text-sm'>name :</p>
                      <p className=' font-semibold ml-2 text-sm'>{user.userName}</p>
                      </div>
                    </div>
                    {/**bottom div in right div */}
                    <div className='h-1/2 w-full flex flex-col '>
                      
                      <p className='mb-2 text-sm max-w-[30px] font-semibold'>{user.email}</p>
                      <div className=''>
                        <p className='text-sm font-semibold'>{user.isBlocked ? <p className=' bg-red-800 text-center justify-center text-white  w-[90px] h-6 rounded-lg'>blocked</p> : <p className=' bg-green-700 text-center justify-center text-white  w-[90px] h-6 rounded-lg'>unblocked </p>}</p>
                      </div>
       
                    </div>
            
                  </div>
                  </>
              )
            }

            </div>
            {/**bottom div */}
            <div className=' h-1/2 border border-red-600 rounded-lg mt-1 border-l-4 w-full'>
              <div className='flex'>
                <p className='text-gray-500 p-3 text-sm'>property id: </p>
                <p className=' pr-3 pt-3 font-mono text-sm'>{property._id} </p>
              </div>
              <div className='flex'>
                <p className='text-gray-500 text-sm pl-3'>Created at  : </p>
                <p className=' pl-3 pr-3 font-mono text-sm'>{format(property.createdAt)} </p>
              </div>

              <div className='flex justify-center'>
                <p></p>
                {
                  property.isBlocked ? (<button onClick={handleUnblockPropertyClick} className='p-2  text-white font-semibold uppercase rounded-xl w-[180px] h-9 mt-2 flex items-center justify-center bg-green-700 hover:bg-green-950 transition ease-in-out delay-150 hover:scale-105 duration-300 shadow-xl'>Unblock property</button>) : (<button onClick={handleBlockPropertyClick} className='p-2 ml-4 text-white font-semibold uppercase rounded-xl w-[180px] h-9 mt-2 flex items-center justify-center bg-red-700 hover:bg-red-600 transition ease-in-out delay-150 hover:scale-105 duration-300 shadow-xl'> Block property</button>)
                }         
              </div>
              
              
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
            <div className='p-2 w-[400px] bg-blue-600 '>
            <Leaflet 
              address={property.address}
              city={property.city}
              district={property.district}
              country={"India"}
              listPage={true}
            />

               </div>
             
        </div>
        </>
            )
         }

         {
          loading && (
            <div>
              <div class="flex items-center justify-center w-screen h-screen border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>
            </div>
          )
         }
    </div>
  )
}

export default AdminPropertyControlPanel