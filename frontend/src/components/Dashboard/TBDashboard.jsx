import React from 'react';
import { ProgressBar } from '@/components/ProgressBar';

const TBDashboard = ({ userData }) => {
  // Mock data for treatment progress
  const treatmentProgress = 65; // This would typically come from an API

  return (
    <div>
      <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500" role="alert">
        <p className="font-bold">Treatment Reminder</p>
        <p>Your next TB check-up is on {userData.nextAppointment}</p>
      </div>

      <div className="p-4 mb-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">Treatment Progress</h3>
        <ProgressBar progress={treatmentProgress} />
        <p className="mt-2">You are {treatmentProgress}% through your treatment. Keep it up!</p>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">TB Management Tips</h3>
        <ul className="pl-5 list-disc">
          <li>Take all your medicines as prescribed</li>
          <li>Keep all your medical appointments</li>
          <li>Always cover your mouth when coughing</li>
          <li>Ventilate your room regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default TBDashboard;