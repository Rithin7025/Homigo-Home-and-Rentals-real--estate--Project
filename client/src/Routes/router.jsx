import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";

  import Root from "../Layouts/Root";
  //Routes
  
import commonRoutes from "./commonRoutes.jsx";
import noHeaderFile from "./noHeaderFile";
import userRoutes from './userRoutes.jsx'
 
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {commonRoutes} 
        {noHeaderFile}  
        {userRoutes}
      </Route>
    )
  );
  
  export default router;