import axios from "axios";
import React,{useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";


function AdminLogin() {

  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);({})
  const [formErrors,setFormErrors] = useState({})
  const [errors,setError] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) =>{
    
    setFormData({
      ...formData,
      [e.target.id] : e.target.value 
    })
  }
  console.log(formData)
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      setFormErrors(validateForm(formData));

    if(Object.keys(formData).length !== 2)   return;

    const res = await axios.post('/api/admin/adminLogin',formData);
    navigate('/admin/home')
     
    
    } catch (error) {

      console.log(error)
      if(error.response.status === 404){
        toast.error(`couldn't find admin with this credentials!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
      }

      if(error.response.status === 401){
        toast.error('Wrong credentials ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }
  }


  const validateForm = (formData) => {
     const errors = {}; 
     const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
 


     if (!formData.email) {
      errors.email = "Email required";
    }
     if(!regex.test(formData.email)){
      errors.email = "Please enter a valid email";
    }

    if(!formData.password){
      errors.password = 'Password is required'
    }
  
    return errors; 

  }

  useEffect(()=>{
   console.log(formErrors,'<<======== errors')
   
  },[formErrors])
  return (
    <div className="bg-indigo-500  h-screen">
      <div className="p-3 max-w-lg mx-auto">
        <form className="flex flex-col gap-4 my-auto mt-14" onSubmit={handleSubmit}>
        <h1 className="font-extrabold text-center lg:text-5xl sm:text-5xl mt-6 py-4">
          <span className="text-white">Homi</span>
          <span>go</span>
        </h1>
          
          <input type="email" id="email" className="border rounded-lg p-3 focus:outline-none shadow-md" placeholder="email" onChange={handleChange}/>
          {formErrors.email && (<p className="text-white">{formErrors.email}</p>)}
          <input type="password" id="password" className="border rounded-lg p-3 focus:outline-none shadow-md" placeholder="password" onChange={handleChange}/>
          {formErrors.password && (<p className="text-white">{formErrors.password}</p>)}

          <button className="p-3 bg-blue-950 rounded-lg font-semibold text-white">Sign in</button>
        </form>
       
      </div>
    </div>
  );
}

export default AdminLogin;
