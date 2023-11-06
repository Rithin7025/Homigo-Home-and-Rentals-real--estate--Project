import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'



function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  
  const   handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

 
  
  const handleSubmit = async(e)=> {
    try {
     e.preventDefault();
 
     setFormError(validateForm(formData));
     {/**return the reques if any of the feild of formData is empty */}
     if(Object.keys(formData).length !== 2)   return;
     {/**return the reques if formData contains any errors */}
     if(Object.keys(formError).length > 0) return ;
     setIsSubmit(true);
    setLoading(true)
     const res = await axios.post('/api/auth/login', formData);
     const data = res.data;
    
 
    setLoading(false)
     navigate('/')
     
 
   }catch(error){
     setLoading(false)
       if(error.response.status === 404){
          setError('incorrect username or password, please try again')
       }

       if(error.response.status === 401){
        setError('Incorrect password, please try again')
     }

     if(error.response.status === 403){

      toast.info('Account not verified,please verify', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        navigate('/otpverification')
   }

     


       
     
   }
 
   }
  
  
  
  
  //validating function to check the form
  const validateForm = (formData) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 

  
    if (!formData.email) {
      errors.email = "Email required";
    }else if(!regex.test(formData.email)){
      errors.email = "Please enter a valid email";
    }

   
    if (!formData.password) {
      errors.password = "Password required";
    }else if(formData.password.length < 4){
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError) === 0 && isSubmit) {

      console.log(formData);

    }
  }, [formError]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl  font-semibold my-5">Sign In</h1>
      <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
        

        <input
          type="email"
          placeholder=" Email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        {formError.email && (<p className="text-red-600">{formError.email}</p>)}

       
        <input
          type="password"
          placeholder="  Password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        {formError.password && (<p className="text-red-600">{formError.password}</p>)}

        {/**using button inside a form type will be submit by default  */}

        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
      </form>

      <div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="flex gap-2 mt-5 ml-1">
        
        <p>Do not have an account?</p>
        <Link to={"/register "}>
          <span className="text-blue-700">Sign up</span>
        </Link>

      </div>
    </div>
  );
}

export default SignIn;
