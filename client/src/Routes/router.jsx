import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import Root from "../Layouts/Root";
  //Routes
  
  import commonRoutes from "./commonRoutes.jsx";
import noHeaderFile from "./noHeaderFile";
  // import userRoutes from "./userRoutes.jsx";
  // import adminRoutes from "./adminRoutes.jsx";
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {commonRoutes}
        {noHeaderFile}
      </Route>
    )
  );
  
  export default router;