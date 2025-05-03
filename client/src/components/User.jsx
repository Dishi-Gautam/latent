import React, { useEffect } from 'react';
import './User.css';
import useSound from 'use-sound';
import buzzSound from '../assets/buzzer.wav';

const admins = [
  { id: 1, name: 'Shantanu' },
  { id: 2, name: 'Vaibhav' },
  { id: 3, name: 'Yash' },
  { id: 4, name: 'Surprise !!' },
];

const User = ({ rejectedAdmins = [] }) => {
  const [playBeep] = useSound(buzzSound);

  useEffect(() => {
    if (rejectedAdmins.length > 0) playBeep();
  }, [rejectedAdmins]);

  return (
    <div className="user-profile">
      <h1 className="user-heading">Live Rejection Panel</h1>
      <div className="crosses-container">
        {admins.map(({ id, name }) => (
          <div key={id} className="cross-wrapper">
            <div className={`cross ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>✖</div>
            <div className={`admin ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
