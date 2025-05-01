import React from 'react';
import useSound from 'use-sound';
import './Admin.css';
import buzzerSound from '../assets/buzzer.wav';

const socket = io('https://latent-5t7k.onrender.com');

const AdminPanel = ({ rejectedAdmins, setRejectedAdmins, handleBuzzClick, socket }) => {
  const [playBeep] = useSound(buzzerSound);

  const handleToggleRejection = (admin) => {
    if (!rejectedAdmins.includes(admin.id)) {
      playBeep();
      socket.emit('rejected', { adminId: admin.id });  // Emit rejection event
    } else {
      socket.emit('unreject', { adminId: admin.id });  // Emit unrejection event
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
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
      <button onClick={handleBuzzClick}>Buzz</button>
    </div>
  );
};

export default AdminPanel;
