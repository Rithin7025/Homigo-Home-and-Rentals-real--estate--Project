import { Route } from "react-router-dom";

import UserAuthLayout from "../Layouts/UserAuthLayout.jsx";
import SignUp from "../pages/UserPages/SignUp.jsx";
import SignIn from "../pages/UserPages/SignIn.jsx";
import Otp from "../pages/UserPages/Otp.jsx";
import PrivateRoute from '../components/User/PrivateRoute';
import Messenger from '../components/User/Messenger';

//layout for sign in and sign up , with just headers 

const commonRoutes = (
  
  <Route path="/" element={<UserAuthLayout />}>
    {/**Public route : Login page is accessible to those */}
    <Route path="login" element={<SignIn />} />
    <Route path="register" element={<SignUp />} />
    <Route path="otpverification" element={<Otp />}/>
     <Route element={<PrivateRoute/>}>
     <Route path='message/:ownerId' element={<Messenger/>}/> 
     </Route>
  </Route>
);
export default commonRoutes;