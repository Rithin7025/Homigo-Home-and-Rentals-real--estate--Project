import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app} from '../../firebase/firebase.js';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { signInSuccess } from '../../redux/user/userSlice.js'
import {useNavigate} from 'react-router-dom'


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
       

       const res = await axios.post('/api/auth/google' , {name , email , photoURL});
       
       console.log(res)
       console.log(res.data)
       dispatch(signInSuccess(res.data));
      navigate('/');

        
    } catch (error) {
      
    }
  }
  return (
    <button type='button' onClick={handleClick} className='bg-red-700 p-3 rounded-lg text-white uppercase hover:opacity-90'>Continue with google</button>
  )
}

export default OAuth