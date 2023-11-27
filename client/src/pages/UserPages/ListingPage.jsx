import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';

 
export default function ListingPage() {
    SwiperCore.use([Navigation])
    const params = useParams();
    const listingId = params.listingId;
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    console.log(listingId,'id-----------------------from listing>')
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/listing/getListing/${listingId}`);
            console.log(res.data)
            const data = res.data;
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
            <>
            <Swiper navigation>
                {
                    listing.imageUrls.map((url)=> (
                        <SwiperSlide  key={url}>
                            <div className='h-[550px]' style={{background : `url(${url}) center no-repeat`,backgroundSize : 'cover'}}>

                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
            </>
        )}

        </main>
  )
}
