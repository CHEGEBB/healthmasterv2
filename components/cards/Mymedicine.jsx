import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import "../../sass/Mymedicine.scss"

function Mymedicine() {
  return (
    <div className="medicine-container">
    <div className="medication-row-one">
        <div className="med-1">
            <div className="med-image">
                <Image
                   src="/assets/images/med1.png" 
                     width={100}
                        height={100}
                        alt="medicine"
                />
            </div>
            <div className="med-details">
            <div className="med-det1">
            <div className="med-name">
                <h2>Verapamil</h2>
            </div>
            <div className="med-time">
                <h3>8:00 AM</h3>
            </div>
            <div className="med-dose">
                <h3>1 shot</h3>
            </div>
            </div>
            <div className="med-det2">
            <div className="med-quantity">
                <h3>10mg</h3>
            </div>
            <div className="med-refill">
            <div className="med-notes">
            <FontAwesomeIcon icon={faEye}/>
                <h3>View</h3>
            </div>
            </div>
            </div>
            
                
            </div>
        </div>
    </div>
    <div className="medication-row-two"></div>
    <div className="medication-row-three"></div>
        
    </div>
  )
}

export default Mymedicine