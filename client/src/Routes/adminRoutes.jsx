import { Route } from "react-router-dom";

import AdminLayout from "../Layouts/AdminLayout";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AdminUsersList from "../pages/AdminPages/AdminUsersList";
import AdminUserListings from "../pages/AdminPages/AdminUserListings";
import AdminApproveListings from "../pages/AdminPages/AdminApproveListings";
import AdminPropertyViewPage from "../pages/AdminPages/AdminPropertyViewPage";
import AdminPrivateRoute from "../components/User/AdminPrivateRoute";
import AdminViewAllListings from "../pages/AdminPages/AdminViewAllListings";
import AdminPropertyControlPanel from "../pages/AdminPages/AdminPropertyControlPanel";

const adminRoutes = (
    <Route path="/" element={<AdminLayout/>}>
        <Route element={<AdminPrivateRoute/>}>
        <Route path="/admin/dashboard"  element={<AdminDashboard/>}/>
        <Route path="/admin/usersList"  element={<AdminUserListings/>}/>
        <Route path="/admin/listings"  element={<AdminViewAllListings/>}/>  {/**listing page on progression */}
        <Route path="/admin/approveListings"  element={<AdminApproveListings/>}/>
        <Route path="/admin/propertyDetailsPage/:id"  element={<AdminPropertyViewPage/>}/>
        <Route path="/admin/propertyDetailViewOfAdmin/:propertyId"  element={<AdminPropertyControlPanel/>}/>
        </Route>

     
    </Route>

)

export default adminRoutes