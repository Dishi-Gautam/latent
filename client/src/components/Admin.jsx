import React from 'react';
import useSound from 'use-sound';
import './Admin.css';
import buzzerSound from '../assets/buzzer.wav';

const admins = [
  { id: 1, name: 'Shantanu' },
  { id: 2, name: 'Sai' },
  { id: 3, name: 'Aryan' },
  { id: 4, name: 'Adarsh' },
];

const Admin = ({ rejectedAdmins, socket }) => {
  const [playBeep] = useSound(buzzerSound);

  const handleClick = (adminId) => {
    if (rejectedAdmins.includes(adminId)) {
      socket.emit('unreject', { adminId });
    } else {
      playBeep();
      socket.emit('rejected', { adminId });
    }
  };

  return (
    <div className="admin-panel">
      <div className='admin-heading'>
        <h1>JSCOP 7.0</h1>
        <h2>Jaypee's Got Talent 2.0</h2>
      </div>
      <div className="admins-container">
        {admins.map((admin) => {
          const isRejected = rejectedAdmins.includes(admin.id);
          return (
            <div key={admin.id} className={`admin-card ${isRejected ? 'rejected' : ''}`}>
              <h3>{admin.name}</h3>
              <button onClick={() => handleClick(admin.id)}>
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
