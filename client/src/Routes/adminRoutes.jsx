import { Route } from "react-router-dom";

import AdminLayout from "../Layouts/AdminLayout";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AdminUsersList from "../pages/AdminPages/AdminUsersList";
import AdminUserListings from "../pages/AdminPages/AdminUserListings";
import AdminApproveListings from "../pages/AdminPages/AdminApproveListings";
import AdminPropertyViewPage from "../pages/AdminPages/AdminPropertyViewPage";



const adminRoutes = (
    <Route path="/" element={<AdminLayout/>}>

        <Route path="/admin/dashboard"  element={<AdminDashboard/>}/>
        <Route path="/admin/usersList"  element={<AdminUsersList/>}/>
        <Route path="/admin/listings"  element={<AdminUserListings/>}/>
        <Route path="/admin/approveListings"  element={<AdminApproveListings/>}/>
        <Route path="/admin/propertyDetailsPage/:id"  element={<AdminPropertyViewPage/>}/>
    </Route>
)

export default adminRoutes