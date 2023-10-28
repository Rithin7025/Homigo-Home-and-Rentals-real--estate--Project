import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegIdBadge } from "react-icons/fa";



function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {


    if(Object.keys(formError) > 0){
      return ;
    }
    e.preventDefault();
    setFormError(validateForm(formData));
    setIsSubmit(true);
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/signup", formData);

      const data = res.data;
      console.log(data);

      if (data.status === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      if(data.message){
        setError(data.message)
        setLoading(false);
        return
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      console.log(error);

      if(error.response && error.response.status === 409){
        setError('A user with this mail/userName Already exist')
      }else {
        setError(error.message);
        // setError('An error occured')
      }
      setLoading(false);
    }
  };
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
    }else if(formData.phone.length != 10){
      errors.phone = "Mobile number must be 10"
    }

    if (!formData.password) {
      errors.password = "Password required";
    }else if(formData.password < 4){
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
      <h1 className="text-center text-3xl  font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="  Name"
          id="userName"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />

        <p className="text-red-600">{formError.userName}</p>

        <input
          type="email"
          placeholder="  Email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        <p className="text-red-600">{formError.email}</p>

        <input
          type="number"
          placeholder="  Mobile Number"
          id="phone"
          className="border rounded-lg p-3 focus:outline-none appearance-none"
          onChange={handleChange}
        />
        <p className="text-red-600">{formError.phone}</p>

        <input
          type="password"
          placeholder="  Password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        <p className="text-red-600">{formError.password}</p>

        {/**using button inside a form type will be submit by default  */}

        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 ml-1">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      <div>{error && <p className="text-red-600">{error}</p>}</div>
    </div>
  );
}

export default SignUp;
