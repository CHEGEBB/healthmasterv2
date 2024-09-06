import React from 'react'
import "../../sass/schedule.scss"
import { ArrowRight, CalendarDays } from 'lucide-react'

function Schedule() {
  return (
    <div className="schedule-container">
    <div className="schedule">
    <div className="title">
    <div className="calendar">
    <CalendarDays size={24} />
    </div>
    <div className="info">
        <h1>Next Check Up</h1>
        <p>Fri, 23rd November 2024</p>
    </div>
    <div className="arrow">
        <ArrowRight size={24} />
    </div>
    </div>

    </div>
    </div>
  )
}

export default Schedule