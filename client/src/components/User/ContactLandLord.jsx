import  { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function ContactLandLord({listing}) {
    const [landLord , setLandlord] = useState(null);
    const [message ,setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const fetchData = async() => {
            console.log(listing.userRef)
            const res = await axios.get( `/api/user/${listing.userRef}`) 
            setLandlord(res.data)
        }
        fetchData()
    },[listing.userRef])
  return (
    <>
     {landLord && (
        <div className='flex flex-col gap-4'> 
          <p>Contact  <span className='font-semibold'>{landLord.userName}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>  
          <textarea className='w-full rounded-lg p-3 border' placeholder='Enter your message' name="message" id="message" rows="2" value={message} onChange={handleChange}></textarea>
          {/**mailto will activate the mail in your system */}
         <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name} &body=${message}`} className='bg-slate-700 text-center rounded-lg uppercase text-white hover:opacity-95 p-3 '>
         Send message
         </Link>
        </div>
     )}
    </>
  )
}
