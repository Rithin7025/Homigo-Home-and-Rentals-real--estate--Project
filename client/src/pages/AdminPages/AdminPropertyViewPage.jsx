import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminPropertyViewPage() {
   const {id} = useParams();
   const navigate = useNavigate()
   const [error,setError] = useState(false)
   const [propertyDetails, setPropertyDetails]  = useState({}); 
   

   useEffect(()=>{
    if(!id){
        setError('Cannot find Id')
        return 
    }
    const fetchData = async(id) =>{
        console.log(id,'here is the id from frontEnd')
        console.log('before')
        const res = await axios.get(`/api/listing/getUserListing/${id}`)
        setPropertyDetails(res.data)
    }

    fetchData(id)   
   },[id])
   

   const handleSubmit = () => {
      if(!id){
        setError('please provide Id')
      }
      const  updateStatus = async() => {
        const res = await axios.post(`/api/admin/verifyListing/${id}`);
        console.log(res.data)
      } 
      updateStatus();
     navigate('/admin/approveListings')
   }
  return (
    <div>

   
    <section> 
  <div className="container mx-auto px-4">
   

    <div className=" lg:col-gap-10 xl:col-gap-12  grid grid-cols-1  lg:grid-cols-5 md:gap-9">
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-3">
            {/**cover image */}
            <div className="max-w-xl overflow-hidden rounded-lg">
              {propertyDetails && propertyDetails.imageUrls && propertyDetails.imageUrls[0] && (
  <img className="h-full w-full object-cover" src={propertyDetails.imageUrls[0]} alt="#no pic" />
)}
            </div>
          </div>

          <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
            <div className="flex flex-row items-start lg:flex-col">
              <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
              {propertyDetails && propertyDetails.imageUrls && propertyDetails.imageUrls[1] && (
  <img className="h-full w-full object-cover" src={propertyDetails.imageUrls[1]} alt="no pic" />
)}
              </button>
              <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
                {propertyDetails && propertyDetails.imageUrls && propertyDetails.imageUrls[2] && (  <img className="h-full w-full object-cover" src={propertyDetails.imageUrls[2]} alt="no pic" />
)}
              </button> 
              <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
               {propertyDetails && propertyDetails.imageUrls && propertyDetails.imageUrls[3] && (  <img className="h-full w-full object-cover" src={propertyDetails.imageUrls[3]} alt="" />
)}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='h-[160px] w-full mb-6 flex gap-6 '>
          {propertyDetails && propertyDetails.documentUrls && propertyDetails.documentUrls[0] && (
          <img className="h-[140px] w-full object-cover mb-6" src={propertyDetails.documentUrls[0]} alt="no pic" />

          )}
          {propertyDetails && propertyDetails.documentUrls && propertyDetails.documentUrls[1] && (
          <img className="h-[140px] w-full object-cover mb-6" src={propertyDetails.documentUrls[1]} alt="no pic" />

          )}
          {propertyDetails && propertyDetails.documentUrls && propertyDetails.documentUrls[2] && (
          <img className="h-[140px] w-full object-cover mb-6" src={propertyDetails.documentUrls[2]} alt="no pic" />

          )}

      </div>
 
      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{propertyDetails.name}</h1>
          <h2 className='font-semibold text-slate-500 mt-3'>type of property : <span className='text-red-700'>{propertyDetails.type}</span> </h2>
        

       

        <div className=" flow-root sm:mt-12 bg-slate-200">
          <p className="mt-4">{propertyDetails.description}</p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-end">
            {
                propertyDetails.discountedPrice > 0 ? <h1 className="text-3xl font-bold">₹{propertyDetails.discountedPrice}</h1> : <h1 className="text-3xl font-bold">₹{propertyDetails.regularPrice}</h1>
            }
            
            {
                propertyDetails.type === 'rent' && <span className="text-base">/month</span>
            }
          </div>
           
          <button type="button" onClick={handleSubmit} className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
           
            Verify Property
          </button>
        </div>

         
        <ul className="mt-8 space-y-2">
          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
            </svg>
            Homigo homes and rentals
          </li>
        </ul>

      </div>
       
    </div>
  </div>
</section>
    
       
</div>
  )
}
