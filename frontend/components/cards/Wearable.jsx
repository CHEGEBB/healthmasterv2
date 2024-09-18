import React, { useState } from 'react';
import "../../sass/wearable.scss";
import Image from 'next/image';

function Wearable() {
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [mainWatchImage, setMainWatchImage] = useState('/assets/images/apple.png');

  const smartwatches = [
    { id: 1, name: 'Apple Watch Series 7', provider: 'Apple', img: '/assets/images/apple.png' },
    { id: 2, name: 'Samsung Galaxy Watch 4', provider: 'Samsung', img: '/assets/images/samsung.png' },
    { id: 3, name: 'Fitbit Sense', provider: 'Fitbit', img: '/assets/images/fitbit.png' },
    { id: 4, name: 'Garmin Forerunner 945', provider: 'Garmin', img: '/assets/images/garmin.png' },
  ];
  

  const handleConnectClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsLoading(false);
    if (!isConnected) {
      setSelectedWatch(null);
      setMainWatchImage('/assets/images/apple.png');
    }
  };

  const handleWatchSelect = (watch) => {
    setSelectedWatch(watch);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      setShowModal(false);
      setMainWatchImage(watch.img);
    }, 3000);
  };

  return (
    <div className="wearable-container">
      <div className="smartwatch">
        <Image
          src={mainWatchImage}
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
                <div key={watch.id} className="watch-item" onClick={() => handleWatchSelect(watch)}>
                  <Image
                    src={watch.img}
                    alt={watch.name}
                    width={500}
                    height={500}
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

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-icon"></div>
            <p>Connecting to {selectedWatch.name}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wearable;