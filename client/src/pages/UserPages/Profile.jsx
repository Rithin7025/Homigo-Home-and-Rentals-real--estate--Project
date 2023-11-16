import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase/firebase';
import axios from '../../config/axiosConfig.js'
import {updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserFailure, deleteUserSuccess} from '../../redux/user/userSlice.js'
import {useDispatch} from 'react-redux'
//firebase storage 


// allow read;
// // allow write : if
// // request.resource.size < 2 * 1024 &&
// // request.resource.contentType.matches('image/.*')


function Profile() {
  const fileref = useRef(null);
  const {currentUser , loading } = useSelector((state)=> state.user);
  const [file,setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isHovered , setIsHovered] = useState(false);
  const [error,setError] = useState(null);
  const dispatch = useDispatch();
  const [messageForImageUpload, setMessageForImageUpload] = useState('Image uplaoded successfully! click update')
  const [successMessage , setSuccessMessage ] = useState(false);
  
  //useEffect which will run if the file is uploaded 
  useEffect(()=>{
    if(file){
      handleFileChange(file);
    }
  },[file]) //this will run when ever a file is changed/uploaded 
  




  const handleFileChange = (file) => {

    //firebase will remember which storage we wanna store by passing the app
    const storage =  getStorage(app); 

    
    //to get the current date and time in the computer , so the file will be unique
    const fileName = new Date().getTime() + file.name;
    
    const storageref = ref(storage , fileName);
    //to get the percentage of uploaded image
    const uploadTask = uploadBytesResumable(storageref , file);


    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setFileUploadPercentage(Math.round(progress))

    },
    (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadUrl) => setFormData({
        ...formData,
        avatar : downloadUrl
      }))
    })

  }


  //========================== handle change ===========================================
    const handleChange =  (e) => {
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })
   }
  
  //======================================================================================
  
  
  //=================================handle submit =======================================

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       dispatch(updateUserStart())
        const res = await axios.post(`/api/user/updateUser/${currentUser._id}`, formData);
      dispatch(updateUserSuccess(res.data))
      setSuccessMessage(true)
      setMessageForImageUpload('')
      
      
      
    } catch (error) {
      setMessageForImageUpload('')
      if(error.response.status === 404 ) {
        setError('Not authorised, please login again')
        dispatch(updateUserFailure())
      }
      if(error.response.status === 401) {
        setError('Wrong user input provided, please try again')
        dispatch(updateUserFailure())
      }
    }
  }
  //======================================================================================

  const handleClickForDeleteAccount = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/deleteUser/${currentUser._id}`);
      dispatch(deleteUserSuccess());
      
    } catch (error) {
      dispatch(deleteUserFailure())
      if(error.response.status === 401){
        setError('Not Authorised, try again')
      }
    }
    
  }  

  return (
    <div className='p-3 max-w-lg mx-auto'>
     
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0]) }  ref={fileref}/>
        <p className='text-sm self-center mt-3'>
          {
            fileUploadError ? (<span className='text-red-700'>Error uploading Image (image should be less than 2 mb)</span>) 
            : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (<span className='text-slate-700'>{`Uploading image ${fileUploadPercentage} %`}</span>) : fileUploadPercentage === 100 ? (<span className='text-green-600'>{messageForImageUpload}</span>) : ''
          }
        </p> 
        <div className='self-center' style={{ position: 'relative', display: 'inline-block' }}  >
      <img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`self-center rounded-full h-24 w-24 object-cover hover:cursor-pointer hover:scale-110 duration-700 ${isHovered ? 'opacity-40' : 'opacity-100'}`}
        onClick={() => fileref.current.click()}
        src={formData.avatar  ||  currentUser.avatar }

        alt="#Profile"
      />
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            
            
          }}
        >
          <svg  
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-wait"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </div>
      )}
    </div>     
    <h1 className='font-bold text-lg text-slate-700 text-center'>{currentUser.userName}</h1>

        
        <input type="text" placeholder='username' defaultValue={currentUser.userName}  id='userName' className='rounded-lg border p-3 outline-none' onChange={handleChange}/>
        <input type="email" placeholder='email' id='email' defaultValue={currentUser.email} className='rounded-lg border p-3 outline-none' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='rounded-lg border p-3 outline-none' onChange={handleChange}/>
        <button  className='bg-gray-700 hover:opacity-95 text-white uppercase p-3 font-semibold  rounded-lg disabled:opacity-80 outline-none' >{loading ? 'loading. . .' : 'update'}</button>
        {/* <button  className='bg-indigo-600 text-white uppercase p-3 font-semibold  rounded-lg'>Create listing</button> */}
      </form>
      <div className='py-3 flex justify-between'>
        <span className='text-black-700 font-medium cursor-pointer ml-1' onClick={handleClickForDeleteAccount} >Delete Account ?</span>
        <span className='text-black-700  font-medium mr-1 cursor-pointer'>Sign out</span>
      </div>
      <p  className='text-red-700 font-normal p-1 text-center'>{error ? error : ''}</p>
      {successMessage && (<p className='text-green-700 font-normal text-center'>Profile updated successfully</p>)}
    </div>  
  )
}

export default Profile