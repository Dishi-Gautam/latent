import React from 'react';
import useSound from 'use-sound';
import './Admin.css';

// Import the local sound file from the correct path
import buzzerSound from '../assets/buzzer.wav';

const admins = [
  { id: 1, name: 'Shantanu' },
  { id: 2, name: 'Sai' },
  { id: 3, name: 'Aryan' },
  { id: 4, name: 'Adarsh' },
];

const Admin = ({ rejectedAdmins, setRejectedAdmins }) => {
  // Use the local sound file
  const [playBeep] = useSound(buzzerSound);
  
  const handleToggleRejection = (admin) => {
    if (!rejectedAdmins.includes(admin.id)) {
      playBeep();
    }
    if (rejectedAdmins.includes(admin.id)) {
      setRejectedAdmins(prev => prev.filter(id => id !== admin.id));
    } else {
      setRejectedAdmins(prev => [...prev, admin.id]);
    }
  };
  
  return (
    <div className="admin-panel">
      <h1>Admin Rejection Panel</h1>
      <div className="admins-container">
        {admins.map((admin) => {
          const isRejected = rejectedAdmins.includes(admin.id);
          return (
            <div key={admin.id} className={`admin-card ${isRejected ? 'rejected' : ''}`}>
              <h3>{admin.name}</h3>
              <button onClick={() => handleToggleRejection(admin)}>
                {isRejected ? 'Cancel Rejection' : 'Reject User'}
              </button>
              {isRejected && <div className="rejection-cross">✖</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;