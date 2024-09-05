import Image from 'next/image'
import React from 'react'
import "../../sass/healthprofile.scss"

function HealthProfile() {
  return (
    <div className="health-container">
    <div className="user">
    <div className="personal-details">
      <div className="name">
        <h2>Sarah Ruth</h2>
      </div>
      <div className="dob">
        23 May, 1990
      </div>
    </div>
    <div className="profile-image">
    <Image src="/assets/images/3.jpg" width={100} height={100} alt="User Avatar" className="avatar" />
    </div>
    </div>
    <div className="health-stats">
    <div className="heart">
      <div className="status">
        <h2>Health</h2>
        <p>Good</p>
      </div>
      <div className="heart-image">
        <Image src="/assets/icons/heart.svg" width={40} height={40} alt="Heart" />
      </div>
    </div>
    <div className="kidney">
      <div className="status">
        <h2>Kidney</h2>
        <p>Good</p>
      </div>
      <div className="kidney-image">
        <Image src="/assets/icons/kidney.svg" width={40} height={40} alt="Kidney" />
      </div>
    </div>
    <div className="liver">
      <div className="status">
        <h2>Liver</h2>
        <p>Good</p>
      </div>
      <div className="liver-image">
        <Image src="/assets/icons/liver.svg" width={40} height={40} alt="Liver" />
      </div>
      </div>
      <div className="brain">
      <div className="status">
        <h2>Brain</h2>
        <p>Good</p>
        </div>
        <div className="brain-image">
        <Image src="/assets/icons/brain.svg" width={40} height={40} alt="Brain" />
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default HealthProfile