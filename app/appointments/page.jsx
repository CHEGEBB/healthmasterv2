import React from 'react'
import "../../sass/Appointments.scss"
import Sidebar from "../../components/layout/sidebar"
import Header from '../../components/layout/header'

function page() {
  return (
    <div className="min-h-screen container-appointment ">
    <div className="header-cont">
        <Header/> 
        </div>
        <div className="container-full">
        <div className="sidebar-cont">
        <Sidebar/>
      </div>
      <div className="main-cont">
      </div>
        </div>
     
        
    </div>
  )
}

export default page