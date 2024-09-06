import React, { useState } from 'react';
import { Clock, Plus, Volume2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import "../../sass/myAlarms.scss";

const alarmTones = [
  { id: 1, name: 'Digital', src: '/sounds/digital.mp3' },
  { id: 2, name: 'Gentle Chime', src: '/sounds/chime.mp3' },
  { id: 3, name: 'Nature', src: '/sounds/nature.mp3' },
];

function MyAlarms() {
  const [alarms, setAlarms] = useState([
    { id: 1, time: '08:00', label: 'Morning Medication', medication: '/assets/images/pill-1.png', tone: alarmTones[0] },
    { id: 2, time: '13:00', label: 'Afternoon Medication', medication: '/assets/images/pill-2.png', tone: alarmTones[1] },
    { id: 3, time: '18:00', label: 'Evening Medication', medication: '/assets/images/pill-3.png', tone: alarmTones[2] },
    { id: 4, time: '23:00', label: 'Bedtime Medication', medication: '/assets/images/pill-4.png', tone: alarmTones[1] },
  ]);

  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [newAlarm, setNewAlarm] = useState({ time: '', label: '', medication: '', tone: alarmTones[0] });

  const handleAddAlarm = () => {
    if (newAlarm.time && newAlarm.label) {
      setAlarms([...alarms, { ...newAlarm, id: Date.now() }]);
      setNewAlarm({ time: '', label: '', medication: '', tone: alarmTones[0] });
      setShowAddAlarm(false);
    }
  };

  const handleDeleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const playAlarmTone = (src) => {
    const audio = new Audio(src);
    audio.onloadeddata = () => {
      audio.play().catch((error) => {
        console.error("Error playing the alarm tone:", error);
      });
    };
  };

  return (
    <div className="container-alarm">
      <h1 className="alarm-title">My Alarms</h1>
      <div className="alarms-list">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="alarm-item">
            <div className="alarm-info">
              <Clock size={24} />
              <span className="alarm-time">{alarm.time}</span>
              <span className="alarm-label">{alarm.label}</span>
            </div>
            <div className="alarm-actions">
              {alarm.medication && (
                <Image src={alarm.medication} alt="Medication" width={30} height={30} className="medication-image" />
              )}
              <button className="play-tone" onClick={() => playAlarmTone(alarm.tone.src)}>
                <Volume2 size={20} />
              </button>
              <button className="delete-alarm" onClick={() => handleDeleteAlarm(alarm.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAddAlarm ? (
        <div className="add-alarm-form">
          <input
            type="time"
            value={newAlarm.time}
            onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Alarm label"
            value={newAlarm.label}
            onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
          />
          <select
            value={newAlarm.tone.id}
            onChange={(e) => setNewAlarm({ ...newAlarm, tone: alarmTones.find(tone => tone.id === parseInt(e.target.value)) })}
          >
            {alarmTones.map((tone) => (
              <option key={tone.id} value={tone.id}>{tone.name}</option>
            ))}
          </select>
          <button onClick={handleAddAlarm}>Add Alarm</button>
        </div>
      ) : (
        <button className="add-alarm-btn" onClick={() => setShowAddAlarm(true)}>
          <Plus size={24} />
          Add Alarm
        </button>
      )}
    </div>
  );
}

export default MyAlarms;
