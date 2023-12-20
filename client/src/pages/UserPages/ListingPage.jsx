import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import {useSelector} from 'react-redux'
import ContactLandLord from '../../components/User/ContactLandLord'
import Leaflet from "../../components/User/Leaflet.jsx";
import Popover from '@idui/react-popover'




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
  console.log(currentUser)
  const [contact,setContact] = useState(false)
    SwiperCore.use([Navigation])
    const params = useParams();
    const listingId = params.listingId;
    const [copied, setCopied] = useState(false);
    
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [ownerId,setOwnerId] = useState(null)
    // const [booked,setBooked] = useState(null)
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
            
            setLoading(true)
            const res = await axios.get(`/api/listing/getListing/${listingId}`);
            console.log(res.data)
            const data = res.data
            setListing(data)
            setOwnerId(res.data.userRef)
            setLoading(false)   
            setError(false)

            } catch (error) {
                setLoading(false)
                setError(true)
            }
        } 
        fetchData()
    },[listingId])

    // useEffect(()=>{
    //    const fetchDataBooking = async() => {
    //     try {
    //       console.log('starated fetching token')
    //       console.log(listingId)
    //     const response = await axios.get(`/api/listing/getIsBookedDetails/${listingId}`);

        
    //     setBooked(response.data)
    //     } catch (error) {
    //       console.log(error)
    //       setBooked(null)
    //     }

    //    }
    //    fetchDataBooking()
    // },[])

    const displayRazorpay = async()=> {
      console.log('display razorpay called')
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log(res)

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
     const tokenAmount =(2/100) * listing.regularPrice 
    // creating a new order
    const result = await axios.post("/api/listing/tokenBooking",{amount : tokenAmount});
    console.log(result,'here is the result')

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id : order_id, currency } = result.data;
    console.log(amount,currency,order_id)
    console.log(import.meta.env.VITE_RAZORPAY_ID)
    const options = {
        key: import.meta.env.VITE_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Homigo homes and rentals",
        description: "Test Transaction",
        // image: ,
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                listing,
                userId : currentUser._id,
                amount

            };
            console.log(data,'the data')
            console.log('before getting result')
            const result = await axios.post("/api/listing/success", data)
            console.log('after getting result')
     
            alert(result.data.msg);
        },
        prefill: {
            name: "Homigo Homes and Rentals",
            email: "homigo@gmail.com",
            contact: "9999999999",
        },
        notes: {
            address: "Hoimgo Corporate Office",
        },
        theme: {
            color: "#0d2b15",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    }


    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
}

  
   

  


      return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}    
        {error && <p>Something went wrong!!</p>}

        {listing && !loading && !error && (
            <div>

            <Swiper navigation>
                {
                    listing.imageUrls.map((url)=> (
                        <SwiperSlide  key={url} > 
                            <div className='h-[450px]' style={{background : `url(${url}) center  no-repeat`,backgroundSize : 'cover'}}>

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
<div className='sm:flex-row md:flex justify-between'>
      
          <div className='flex flex-col md:w-1/2 sm:w-full md:ml-8 p-3 mt-7 gap-4'>
            <p className='text-2xl font-semibold'>
            {listing.name} -₹{' '}
            {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
                </p>
           <Popover className='max-w-xs' content="Book with 2% down payment!! Secure property for 3 months.">
                          <button disabled={currentUser._id === listing.userRef || listing.isBooked} onClick={displayRazorpay} type="button" className="disabled:opacity-80 text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 md:w-[200px] dark:focus:ring-blue-800">
           <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
          </svg>
                {currentUser._id  === listing.userRef  ? 'your listing' : listing.isBooked ? 'Booked' : 'Book a token'}
           </button>
            </Popover>  
              <p className='flex  items-center gap-2 text-slate-600 text-sm'>
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
          
          {currentUser && listing.userRef !== currentUser._id && !contact && (   <button onClick={()=> setContact(true)} className='p-3 bg-slate-700 uppercase font-semibold  rounded-lg text-white hover:opacity-90'>contact landlord</button>)}
          {contact && (<ContactLandLord listing={listing}/>)}
          
          { currentUser && listing.userRef === currentUser._id  ? ( <button disabled={currentUser._id  === listing.userRef} className='p-3 bg-green-900 text-white uppercase rounded-lg font-semibold items-center flex justify-center disabled:opacity-80'><span className='mr-3'>
          
           Chat with owner 
           </span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
 </svg>
 </button>
 ) :
 
 (
          <Link  className='p-3 bg-green-900 text-white uppercase rounded-lg font-semibold items-center  justify-center ' to={`/message/${ownerId}`}>
   <div className='flex justify-center'>
    <span className='mr-3'> Chat with owner  </span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  </div>
    </Link>

)
 }
          {/* <button disabled={currentUser._id  === listing.userRef} className='p-3 bg-green-900 text-white uppercase rounded-lg font-semibold items-center flex justify-center disabled:opacity-80'><span className='mr-3'>
          
          Chat with owner 
          </span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
</button> */}
          </div>
          <div className=' mt-2 md:w-1/2 sm:w-full sm:p-5'>

          <Leaflet 
              address={listing.address}
              city={listing.city}
              district={listing.district}
              country={"India"}
              listPage={true}
            />

          </div>
</div>
        </div>
            
        )}

        </main>
  )
}


