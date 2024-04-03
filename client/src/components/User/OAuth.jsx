import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app} from '../../firebase/firebase.js';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { signInSuccess } from '../../redux/user/userSlice.js'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


function OAuth() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async() => {
    try {
       const provider = new GoogleAuthProvider()
       const auth = getAuth(app)
       

       //pop up message
       const result  = await signInWithPopup(auth, provider)

       if(!result) return;

       const name = result.user.displayName;
       const email = result.user.email;
       const photoURL = result.user.photoURL;
       
       console.log(name,email,photoURL)
       
       console.log('before')
       const res = await axios.post('/api/auth/google' , {name , email , photoURL});
       console.log('res & res.data-------------------------------------------------------------')
       console.log(res)
        
       dispatch(signInSuccess(res.data));
      navigate('/');

        
    } catch (error) {
      console.log('entered error')
      console.log(error)
      if(error.response.status == 403){

        toast.error('Your account has been blocked by the admin !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    }
  }
  return (
    <button type='button' onClick={handleClick} className='bg-red-700 p-3 rounded-lg text-white uppercase hover:opacity-90'>Continue with google</button>
  )
}

export default OAuth