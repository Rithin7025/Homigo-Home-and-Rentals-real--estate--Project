import { Route } from "react-router-dom";

import UserAuthLayout from "../Layouts/UserAuthLayout.jsx";
import SignUp from "../pages/UserPages/SignUp.jsx";
import SignIn from "../pages/UserPages/SignIn.jsx";
import Otp from "../pages/UserPages/Otp.jsx";

//layout for sign in and sign up , with just headers 

const commonRoutes = (
  
  <Route path="/" element={<UserAuthLayout />}>
    {/**Public route : Login page is accessible to those */}
    <Route path="login" element={<SignIn />} />
    <Route path="register" element={<SignUp />} />
    <Route path="otpverification" element={<Otp />}/>

  </Route>
);
export default commonRoutes;