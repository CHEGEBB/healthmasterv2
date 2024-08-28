import React from 'react'
import "../../sass/dashboard.scss"
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header"


export default function page() {
  return (
<div className="container bg-[#083A3C] !important">
<div className="w-20 sidenav">
  <Sidenav/>
</div>
<div className="content">
<div className="header">
  <Header/>
</div>
<div className="min-h-screen container-fluid">
<h>
  content will go here
</h>
  
</div>
</div>
      
    </div>
  )
}
