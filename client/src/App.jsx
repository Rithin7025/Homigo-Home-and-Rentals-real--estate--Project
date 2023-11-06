import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import router from "./Routes/router.jsx"

function App() {
  return (
    <>

      <ToastContainer/>

      <RouterProvider router={router} />  
      

      

    </>
  )
}

export default App