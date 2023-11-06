import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";



function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

   {/**the handle submit which checks every validations and sends only to the backend if every condition is satisfied */}

  const handleSubmit = async(e)=> {
   try {
    e.preventDefault();

    setFormError(validateForm(formData));

    if(Object.keys(formData).length !== 4)   return;
    if(Object.keys(formError).length > 0) return ;

    
    setIsSubmit(true);
    

     setLoading(true)
    
    const res = await axios.post('/api/auth/signup', formData);
    const data = res.data;
   

    setLoading(false)
    navigate('/otpverification');
    

  }catch(error){
    setLoading(false)
      console.log(error)
      
      if(error.response.data.errorType === 'duplicateEmail'){
        setError('User with the same Email exist, try a new one')
        setLoading(false)
      }

      if(error.response.data.errorType === 'duplicateName'){
        setError('User with the same Username exist, try a new one')
      }
    
  }

  }

 

  //validating function to check the form
  const validateForm = (formData) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!formData.userName) {
      errors.userName = "User Name is required";
    }

    if (!formData.email) {
      errors.email = "Email required";
    }else if(!regex.test(formData.email)){
      errors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      errors.phone = "Mobile number is required";
      
    }else if(formData.phone.length !== 10){
      console.log('entered')
      errors.phone = "Mobile number must be 10";
    }

    if (!formData.password) {
      errors.password = "Password required";
    }else if(formData.password.length < 4){
      errors.password = "Password must be more than 4 characters";
    }
    console.log(errors)
    return errors;
  };
  
  useEffect(() => {

    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formData);
    
    }

  }, [formError]);

  return (
    <div className="p-3 max-w-lg mx-auto">

      <h1 className="text-center text-3xl  font-semibold my-5">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          id="userName"
          className={`border rounded-lg p-3 focus:outline-none ${formError.userName ? 'border-red-500' : ''}`}
          onChange={handleChange} 
        />
        
        {/* <p className="text-red-600">{formError.userName}</p> */}
        {formError.userName && (<p className="text-red-600">{formError.userName}</p>)}
        <input
          type="email"
          placeholder="  Email"
          id="email"
          className={`border rounded-lg p-3 focus:outline-none ${formError.email ? 'border-red-500' : '' }`}
          onChange={handleChange}
        />
        {formError.email && (<p className="text-red-600">{formError.email}</p>)}

        <input
          type="number"
          placeholder="  Mobile Number"
          id="phone"
          className={`border rounded-lg p-3 focus:outline-none ${formError.phone ? 'border-red-500' : ''}`}
          onChange={handleChange}
        />
        {formError.phone && (<p className="text-red-600">{formError.phone}</p>)}

        <input
          type="password"
          placeholder="  Password"
          id="password"
          className={`border rounded-lg p-3 focus:outline-none ${formError.password ? 'border-red-500' : ''}`}
          onChange={handleChange}
        />

        {formError.password && (<p className="text-red-600">{formError.password}</p>)}
    
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >

          {loading ? "Loading.." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 ml-1">
        <p>Already have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Sign in</span>
        </Link>

      </div>
      <div>{error && <p className="text-red-600">{error}</p>}</div>
    </div>
  );
}

export default SignUp;
