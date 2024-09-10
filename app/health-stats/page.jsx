"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../components/layout/header';
import Sidebar from '../../components/layout/sidebar';
import { Heart, Brain, Activity, Apple, Dumbbell, Thermometer, Moon, Sandwich, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import confetti from 'canvas-confetti';
import "../../sass/stats.scss"

const AnimatedHeart = () => (
  <div className="animated-heart">
    <Image src="/assets/images/heart.png" alt="Animated Heart" width={300} height={300} />
  </div>
);

const HealthMetricCard = ({ title, value, icon, description }) => (
  <div className="health-metric-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p className="value">{value}</p>
    <p className="description">{description}</p>
  </div>
);

const ScrollableImageList = ({ images }) => (
  <div className="scrollable-image-list">
    {images.map((img, index) => (
      <Image key={index} src={img} alt={`Image ${index + 1}`} width={100} height={100} />
    ))}
  </div>
);

const HealthGoal = ({ goal, onComplete }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(true);
    onComplete(goal);
  };

  return (
    <div className="health-goal">
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <span>{goal}</span>
    </div>
  );
};

export default function HealthDashboard() {
  const [userData, setUserData] = useState({
    name: 'Sarah Ruth',
    age: 35,
    height: 180,
    weight: 75,
    bmi: 23.1,
    bloodType: 'A+',
    image: '/assets/images/3.jpg',
    medicalHistory: [
      { date: '2023-01-15', event: 'Annual check-up' },
      { date: '2022-06-20', event: 'Flu shot' },
      { date: '2021-11-05', event: 'Broke arm' },
    ]
  });

  const [healthMetrics, setHealthMetrics] = useState([
    { title: 'Heart Health', value: '85%', icon: <Heart size={24} />, description: 'Your heart is functioning well. Keep up the good work!' },
    { title: 'Lung Function', value: '78%', icon: <FontAwesomeIcon icon={faLungs} />, description: 'Your lung capacity is good. Consider adding more cardio to your routine.' },
    { title: 'Brain Health', value: '92%', icon: <Brain size={24} />, description: 'Excellent cognitive function. Keep challenging your mind with puzzles and new skills.' },
    { title: 'Digestive Health', value: '88%', icon: <Sandwich size={24} />, description: 'Your digestive system is in good shape. Remember to stay hydrated and eat fiber-rich foods.' }
  ]);

  const [weightData, setWeightData] = useState([
    { month: 'Jan', weight: 78 },
    { month: 'Feb', weight: 71 },
    { month: 'Mar', weight: 60 },
    { month: 'Apr', weight: 15 },
    { month: 'May', weight: 85 },
  ]);

  const [exerciseData, setExerciseData] = useState([
    { activity: 'Running', duration: 30, image: '/api/placeholder/100/100' },
    { activity: 'Yoga', duration: 45, image: '/api/placeholder/100/100' },
    { activity: 'Weightlifting', duration: 60, image: '/api/placeholder/100/100' },
    { activity: 'Swimming', duration: 40, image: '/api/placeholder/100/100' },
  ]);

  const [sleepData, setSleepData] = useState([
    { date: '2023-05-01', hours: 7.5 },
    { date: '2023-05-02', hours: 8 },
    { date: '2023-05-03', hours: 6.5 },
    { date: '2023-05-04', hours: 7 },
    { date: '2023-05-05', hours: 8.5 },
  ]);

  const [recommendations, setRecommendations] = useState([
    { text: 'Increase daily water intake to 8 glasses', image: '/api/placeholder/100/100' },
    { text: 'Add 30 minutes of moderate exercise to your routine', image: '/api/placeholder/100/100' },
    { text: 'Incorporate more leafy greens into your diet', image: '/api/placeholder/100/100' },
  ]);

  const [healthGoals, setHealthGoals] = useState([
    'Exercise for 30 minutes daily',
    'Eat 5 servings of vegetables',
    'Get 8 hours of sleep',
    'Meditate for 10 minutes',
  ]);

  const [glucoseData, setGlucoseData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completedGoal, setCompletedGoal] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setGlucoseData(prevData => {
        const newData = [...prevData, { value: Math.random() * 50 + 70 }];
        return newData.slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGoalComplete = (goal) => {
    setCompletedGoal(goal);
    setModalIsOpen(true);
    confetti();
  };

  return (
    <div className="health-dashboard">
      <Header />
      <div className="dashboard-content-stats">
      <div className="side-health-stats">
      <Sidebar />
      </div>
      <div className="main-health-stats">
          <h1 className="welcome-message">Your Health Journey Starts Here!</h1>
          
          <div className="dashboard-grid">
            <div className="profile-card">
              <Image src={userData.image} alt={userData.name} width={100} height={100} className="profile-image" />
              <h2>{userData.name}</h2>
              <p>Age: {userData.age} | Height: {userData.height}cm | Weight: {userData.weight}kg</p>
              <p>BMI: {userData.bmi} | Blood Type: {userData.bloodType}</p>
              <h3>Medical History</h3>
              <ul className="medical-history">
                {userData.medicalHistory.map((event, index) => (
                  <li key={index}>{event.date}: {event.event}</li>
                ))}
              </ul>
            </div>

            <div className="heart-status">
              <AnimatedHeart />
              <div className="heart-pointers">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className={`pointer pointer-${index}`}>
                    <HealthMetricCard {...metric} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glucose-levels">
              <h2>Real-time Glucose Levels</h2>
              <LineChart width={300} height={200} data={glucoseData}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
              </LineChart>
            </div>

            <div className="weight-trend">
              <h2>Weight Trend</h2>
              <AreaChart width={300} height={200} data={weightData}>
                <Area type="monotone" dataKey="weight" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </div>

            <div className="exercise-data">
              <h2>Exercise Data</h2>
              <ScrollableImageList images={exerciseData.map(d => d.image)} />
              <BarChart width={300} height={200} data={exerciseData}>
                <Bar dataKey="duration" fill="#82ca9d" />
              </BarChart>
            </div>

            <div className="sleep-trends">
              <h2>Sleep Trends</h2>
              <Calendar
                value={new Date()}
                tileContent={({ date, view }) => {
                  if (view === 'month') {
                    const sleepEntry = sleepData.find(d => d.date === date.toISOString().split('T')[0]);
                    return sleepEntry ? <p className="sleep-hours">{sleepEntry.hours}h</p> : null;
                  }
                }}
              />
            </div>

            <div className="health-recommendations">
              <h2>Health Recommendations</h2>
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>
                    <Image src={rec.image} alt={rec.text} width={50} height={50} />
                    {rec.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="health-goals">
              <h2>Health Goals</h2>
              {healthGoals.map((goal, index) => (
                <HealthGoal key={index} goal={goal} onComplete={handleGoalComplete} />
              ))}
            </div>
          </div>
          </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Goal Completed"
        className="goal-modal"
      >
        <h2>Congratulations!</h2>
        <p>You have completed your goal: {completedGoal}</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}