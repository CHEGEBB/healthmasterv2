import React, { useState } from 'react';
import "../../sass/wearable.scss";
import Image from 'next/image';

function Wearable() {
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Sample data for supported smartwatches (replace this with API data later)
  const smartwatches = [
    { id: 1, name: 'Apple Watch Series 7', provider: 'Apple', img: '/assets/images/apple-watch.png' },
    { id: 2, name: 'Samsung Galaxy Watch 4', provider: 'Samsung', img: '/assets/images/samsung-watch.png' },
    { id: 3, name: 'Fitbit Sense', provider: 'Fitbit', img: '/assets/images/fitbit-sense.png' },
  ];

  const handleConnectClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="wearable-container">
      <div className="smartwatch">
        <Image
          src="/assets/images/smart.png"
          width={150}
          height={150}
          alt="Smartwatch"
          className="smartwatch-image"
        />
        <button className={`connect-button ${isConnected ? 'connected' : ''}`} onClick={handleConnectClick}>
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>

      <div className="slogan">
        <h2>Wear the Future</h2>
        <p>Stay connected, stay ahead</p>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Select Your Smartwatch</h2>
            <div className="smartwatch-options">
              {smartwatches.map((watch) => (
                <div key={watch.id} className="watch-item">
                  <Image
                    src={watch.img}
                    alt={watch.name}
                    width={100}
                    height={100}
                    className="watch-image"
                  />
                  <div className="watch-info">
                    <h4>{watch.name}</h4>
                    <p>{watch.provider}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wearable;
