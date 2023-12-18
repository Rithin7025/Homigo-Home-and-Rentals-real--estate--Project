import { Route } from 'react-router-dom'
import BaseLayout from '../Layouts/BaseLayout';
import Home from '../pages/UserPages/Home';
import Profile from '../pages/UserPages/Profile'
import PrivateRoute from '../components/User/PrivateRoute';
import About from '../pages/UserPages/About';
import CreateListing from '../pages/UserPages/CreateListing';
import NotificationPage from '../pages/UserPages/NotificationPage';
import ShowListingsPage from '../pages/UserPages/ShowListingsPage';
import UpdateListingPage from '../pages/UserPages/UpdateListingPage';
import ListingPage from '../pages/UserPages/ListingPage';
import Search from '../pages/UserPages/Search';
import Tokens from '../pages/UserPages/Tokens';

const userRoutes = (

    <Route path='/' element={<BaseLayout/>}>
        <Route index element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='listing/:listingId' element={<ListingPage/>} />
        <Route path='search' element={<Search/>} />
        
        {/**Protecting the private route */}
        <Route element={<PrivateRoute/>}>   

        <Route path='profile' element={<Profile/>} />
        <Route path ='createListing' element={<CreateListing/>}/>
        <Route path='notification' element={<NotificationPage/>}/> 
        <Route path='showListings' element={<ShowListingsPage/>}/> 
        <Route path='updateListing/:listingId' element={<UpdateListingPage/>}/> 
        <Route path='token' element={<Tokens/>}/> 
        
        </Route>
    </Route>

)

export default userRoutes