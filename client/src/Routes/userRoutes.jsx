import { Route } from 'react-router-dom'
import BaseLayout from '../Layouts/BaseLayout';
import Home from '../pages/UserPages/Home';
import Profile from '../pages/UserPages/Profile'
import PrivateRoute from '../components/User/PrivateRoute';

const userRoutes = (

    <Route path='/' element={<BaseLayout/>}>
        <Route index element={<Home/>} />
        
        {/**Protecting the private route */}
        <Route element={<PrivateRoute/>}>

        <Route path='profile' element={<Profile/>} />

        </Route>
    </Route>

)

export default userRoutes