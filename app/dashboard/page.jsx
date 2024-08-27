import React from 'react'
import "../../sass/dashboard.scss"
import Sidenav from '../../components/layout/sidebar';


export default function page() {
  return (
<div className="container bg-[#083A3C] !important">
<div className="w-20 sidenav">
  <Sidenav/>
</div>
<div className="min-h-screen container-fluid">
<h>
  content will go here
</h>
  
</div>
      
    </div>
  )
}
