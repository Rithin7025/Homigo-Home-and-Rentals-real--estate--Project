import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/User/Sidebar'
import AdminHeader from '../components/User/AdminHeader'

export default function AdminLayout() {
  return (

    <div className='flex flex-row overflow-hidden bg-neutral-100 h-screen w-screen'>
        <Sidebar/>
        <div className='flex-1'>

        <AdminHeader/>
        <div>{<Outlet/>} </div>
        </div>

    </div>
  )
}

 