import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link,useNavigate} from 'react-router-dom' ; //to navigate route
import { useSelector } from 'react-redux';
export default function Header() {
  const  {currentUser} = useSelector((state) => state.user);
  const [searchTerm,setSearchTerm] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    //to get url params
    const urlparams = new URLSearchParams(window.location.search);
    //setting the search term
    urlparams.set('searchTerm',searchTerm)
    //navigate user to this url 
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`);

  }


  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between max-w-6xl mx-auto p-3 '>
        <Link to='/'>

        <h1 className='font-bold text-sm sm:text-xl flex'>
            <span className='text-slate-500'>Homi</span>
            <span className='text-slate-700'>go</span>
        </h1>
        </Link>

        <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-full flex items-center'>
            <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='   search ...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
          <button>

           <FaSearch className='text-slate-600 '  />
          </button>
        </form>
        <ul className='flex gap-4 '>
            {
            currentUser ? 
            <Link to='/token'>
            <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>Tokens</li>
            </Link> : ''
            }
            <Link to='/'>

            <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (<img className='rounded-full h-7 w-7 object-cover'  src={currentUser.avatar} alt='profile'/>) : <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>Sign in</li>
 }
            </Link>
        </ul>
        </div>
    </header>
  )
}
