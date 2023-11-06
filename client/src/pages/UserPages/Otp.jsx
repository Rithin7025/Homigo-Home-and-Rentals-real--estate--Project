import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Initialize with empty strings
  const [loading , setLoading] = useState(null);
  const [error,setError] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const newValue = e.target.value;
	//regex to check the string only have digits
    if (/^\d*$/.test(newValue) && newValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = newValue;
      setOtp(newOtp);
      if (index < 3 && newValue !== '') {
        // Move focus to the next input
        document.getElementById(`otpInput-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     
     //check if there any empty values
     if(otp.includes('')){
      
      toast.warn('Please enter the 4 digit otp', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setError(true);
      return;
     }

    try {
      const otpFromForm = otp.join('')
    const integerOtp = Number(otpFromForm);
    
     

    setLoading(true)
    //passing the Otp to the server as a json object
    console.log('first')
    const res =await axios.post('/api/auth/otp', {otp : integerOtp});
     console.log(res)
     
    
    
     setError(false)
     setLoading(false)
     toast.success('Your account has been verified', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
     navigate('/login')
    } catch (error) {
      setLoading(false)
      if(error.response.status === 404){
        toast.error('User not found! Try sign in', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }

      if(error.response.status === 401){
        toast.error(`The otp you entered doesn't match`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }

      if(error.response.status === 403){
        toast.info('Oops otp expired , click resend otp to verify !', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      console.log(error);

    }

    // Do something with the OTP (otp array) here
  };

  const handleResendOtp = async() => {
    const res = await axios.post('/api/auth/resendOtp')
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-5">OTP Verification</h1>
      <div className='opacity-50 h-10  md:w-23 border-2 flex items-center justify-center text-center sm:h-9 sm:w-full'>
  <p className='text-green-950 font-semibold p-6'>
    An OTP has been sent to your mail.{}
  </p>
</div>

      <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
      <div>
        
      </div>
        
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otpInput-${index}`}
              className={`border rounded-lg p-3 focus:outline-none w-16 text-center mx-auto  ${error ? 'border-red-600' : ''}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
            />

          ))}
        </div>
        <button disabled = {loading} className="bg-slate-700 p-3 text-white rounded-lg uppercase my-4 disabled:opacity-80"  >
         {loading ? 'loading..' :  'Verify OTP'}
        </button>
      </form>
      <div className='flex'>
      <p>Didn't have an otp ?</p>
     <button onClick={handleResendOtp}> <span className='text-blue-700 font-semibold mx-2 '>Resend Otp</span></button>
      </div>
    </div>
  );
};

export default OtpVerification;



