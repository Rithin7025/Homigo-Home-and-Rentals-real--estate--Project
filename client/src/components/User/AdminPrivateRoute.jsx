import {useSelector} from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';



export default function AdminPrivateRoute(){
    const { admin } = useSelector((state)=> state.admin);

    return admin ? <Outlet/> : <Navigate to={'/admin/login'}/>

}