import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MessageCircle, MessageCircleMore, PhoneCall, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import "@/sass/schedule.scss"

function Schedule() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    { id: 1, name: "Dr Emily Johnson", specialty: "Pediatrician", image: "/assets/images/1.png" },
    { id: 2, name: "Dr Michael Smith", specialty: "Cardiologist", image: "/assets/images/2.png" },
    { id: 3, name: "Dr Sarah Brown", specialty: "Dermatologist", image: "/assets/images/3.png" },
  ];

  const handleContactClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="schedule-container">
      <div className="schedule">
        <div className=" header-schedule">
          <h1>My Schedule</h1>
        </div>
        <div className="title">
          <div className="calendar">
            <CalendarDays size={24} />
          </div>
          <div className="info">
            <h1>Next Check Up</h1>
            <p>Fri, 23rd November 2024</p>
          </div>
          <Link href="/appointments" passHref>
            <div className="arrow">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>
        <div className="schedule-data">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="schedule-item">
              <div className="doctor-info">
                <div className="doc-image">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="doc-profile">
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                </div>
              </div>
              <div className="access">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="call" onClick={() => handleContactClick(doctor)}>
                      <PhoneCall size={24} />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {doctor.name}</DialogTitle>
                    </DialogHeader>
                    <p>Doctor is currently available</p>
                    <div className="modal-buttons">
                      <Button onClick={() => alert('Calling...')}>Call</Button>
                      <Button onClick={() => alert('Sending message...')}>Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="message" onClick={() => handleContactClick(doctor)}>
                      <MessageCircleMore size={24} />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {doctor.name}</DialogTitle>
                    </DialogHeader>
                    <p>Doctor is currently available</p>
                    <div className="modal-buttons">
                      <Button onClick={() => alert('Calling...')}>Call</Button>
                      <Button onClick={() => alert('Sending message...')}>Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
        <Link href="/appointments" passHref>
          <div className="add-appointment">
            <Plus size={24} />
            <span>Add Appointment</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Schedule;