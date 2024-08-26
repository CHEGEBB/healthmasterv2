import React from 'react'
import PersonalInfo from '../../components/forms/PersonalInfo'

export default function page() {
  return (
 <div className="flex-col bg-black info-container">
  <h2>Welcome 👋</h2>
  <p>
  Hello and welcome to health master, help us know about you by filling out the form below
  </p>
  <div className="personal-info">
    <h2>
      Personal Information
    </h2>
    <p>
      Please fill out your personal information below
    </p>
    <PersonalInfo/>
  </div>
 </div>
  )
}
