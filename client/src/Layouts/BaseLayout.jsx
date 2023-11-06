import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../components/User/Header'
import Footer from '../components/User/Footer'

function BaseLayout() {
  return (
    <>
        <Header/>
       <Outlet/>
       <Footer/>
    </>
  )
}

export default BaseLayout