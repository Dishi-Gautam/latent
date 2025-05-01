import React from 'react';
import './User.css';

const admins = [
  { id: 1, name: 'Shantanu' },
  { id: 2, name: 'Sai' },
  { id: 3, name: 'Aryan' },
  { id: 4, name: 'Adarsh' },
];

const User = ({ rejectedAdmins = [] }) => {
  return (
    <div className="user-profile">
      <div className="crosses-container">
        {admins.map(({ id, name }) => (
          <div key={id} className="cross-wrapper">
            <div className={`cross ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>✖</div>
            <div className={`admin ${rejectedAdmins.includes(id) ? 'rejected' : ''}`} >
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
