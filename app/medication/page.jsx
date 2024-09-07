import React from 'react'
import Header from '../../components/layout/header'
import Sidebar from '../../components/layout/sidebar'
import "../../sass/medications.scss"

function page() {
  return (
    <div className="medications-page">
    <div className="header-cont-med">
      <Header />
    </div>
    <div className="content-wrapper-med">
      <div className="sidebar-cont-med">
        <Sidebar />
      </div>
      <div className="main-content-med">
      main
      </div>
    </div>
    </div>
    
  )
}

export default page