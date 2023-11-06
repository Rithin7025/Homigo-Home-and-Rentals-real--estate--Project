import { Route } from "react-router-dom";

import AdminLogin from "../pages/AdminPages/AdminLogin"; 
import AdminHome from "../pages/AdminPages/AdminHome";
 
const noHeaderFile = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />  
    <Route path="/admin/home" element={<AdminHome />} />  
  </>
);

export default noHeaderFile;