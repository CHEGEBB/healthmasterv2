import React from 'react'
import "../../sass/schedule.scss"
import { ArrowRight, CalendarDays, MessageCircle, MessageCircleMore, PhoneCall } from 'lucide-react'
import Image from 'next/image'

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
    <div className="schedule-data">
        <div className="schedule-item">
            <div className="doctor-info">
                <div className="doc-image">
                    <Image
                    src="/assets/images/1.png"
                    alt="Doctor"
                    width={100}
                    height={100}
                    />
                </div>
                <div className="doc-profile">
                    <h3>Dr Emily Johnson</h3>
                    <p>Pediatrician</p>
                </div>
            </div>
            <div className="access">
                <div className="call">
                    <PhoneCall size={24} />
                </div>
                <div className="message">
                    <MessageCircleMore size={24} />
                </div>
            </div>
        </div>
    </div>

    </div>
    </div>
  )
}

export default Schedule